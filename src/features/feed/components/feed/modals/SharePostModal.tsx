import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Modal, Input, Button, UserAvatar, EmptyState } from '@/components/ui';
import { Post, Visibility } from '@shared/types';
import { useRtdbChatStore } from '@/store';
import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants/toastMessages';
import {
  buildSharedPostPayload,
  getPostSnippet,
  getPreviewMedia,
} from '../../../utils/postShareMessage';
import { useShareTargets } from '@/features/chat';
import { ShareTargetItem } from './ShareTargetItem';

interface SharePostModalProps {
  open: boolean;
  onOpenChange: () => void;
  post: Post | null;
  authorName: string;
  currentUserId: string;
}

/** Modal chia sẻ bài viết vào tin nhắn chat */
export const SharePostModal: React.FC<SharePostModalProps> = ({
  open,
  onOpenChange,
  post,
  authorName,
  currentUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversationIds, setSelectedConversationIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSharedPostMessage = useRtdbChatStore((state) => state.sendSharedPostMessage);
  const { filteredItems, recentItems, friendItems, usersMap } = useShareTargets(
    currentUserId,
    searchTerm,
    open,
  );

  useEffect(() => {
    if (!open) {
      setSearchTerm('');
      setSelectedConversationIds(new Set());
      setIsSubmitting(false);
    }
  }, [open]);

  const isPrivatePost = post?.visibility === Visibility.PRIVATE;
  const canSubmit = selectedConversationIds.size > 0 && !!post && !isPrivatePost && !isSubmitting;

  const handleToggleConversation = (conversationId: string) => {
    setSelectedConversationIds((prev) => {
      const next = new Set(prev);
      if (next.has(conversationId)) {
        next.delete(conversationId);
      } else {
        next.add(conversationId);
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!post || !canSubmit) return;

    const payload = buildSharedPostPayload(post, authorName);
    const targetIds = Array.from(selectedConversationIds);
    setIsSubmitting(true);

    try {
      const results = await Promise.allSettled(
        targetIds.map((conversationId) =>
          sendSharedPostMessage(conversationId, currentUserId, payload),
        ),
      );

      const hasSuccess = results.some((result) => result.status === 'fulfilled');
      if (hasSuccess) {
        setSelectedConversationIds(new Set());
        onOpenChange();
      } else {
        toast.error(TOAST_MESSAGES.CHAT.SHARE_POST_FAILED);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Chia sẻ vào tin nhắn"
      size="sm"
      footer={
        <div className="flex gap-2 w-full">
          <Button variant="secondary" fullWidth onClick={onOpenChange} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button fullWidth onClick={handleSubmit} disabled={!canSubmit}>
            {isSubmitting ? 'Đang gửi...' : `Gửi (${selectedConversationIds.size})`}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6 min-h-0 px-1 py-1">
        {isPrivatePost ? (
          <div className="rounded-2xl border border-warning/30 bg-warning/5 px-4 py-3 text-sm text-warning font-medium">
            Bài viết riêng tư không thể chia sẻ.
          </div>
        ) : (
          <div className="flex bg-background/50 rounded-2xl border border-border/50 overflow-hidden backdrop-blur-sm">
            {/* Media Preview */}
            {(() => {
              const media = post ? getPreviewMedia(post) : {};
              if (!media.url) return null;
              return (
                <div className="relative w-24 h-24 shrink-0 bg-surface-sunken overflow-hidden border-r border-border/50">
                  <img src={media.url} alt="" className="w-full h-full object-cover" />
                </div>
              );
            })()}

            {/* Content Info */}
            <div className="p-4 min-w-0 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <UserAvatar
                  userId={post?.authorId || ''}
                  name={authorName}
                  size="2xs"
                  showStatus={false}
                  className="ring-1 ring-border"
                />
                <span className="text-xs font-black text-foreground truncate">{authorName}</span>
              </div>
              <p className="text-[11px] text-secondary line-clamp-2 leading-relaxed break-all italic font-medium">
                {post ? getPostSnippet(post) : ''}
              </p>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative group">
          <Input
            icon={
              <Search
                size={16}
                className="text-muted group-focus-within:text-primary transition-colors"
              />
            }
            placeholder="Tìm kiếm người dùng hoặc nhóm..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="bg-background/50 border-border/50 focus:border-primary/50 transition-all rounded-2xl"
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-col min-h-0 max-h-[420px]">
          {!searchTerm ? (
            <div className="flex flex-col gap-5 overflow-y-auto scroll-hide pr-1">
              {recentItems.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-80 px-1">
                    Trò chuyện gần đây
                  </span>
                  <div className="flex overflow-x-auto gap-3 pb-1 px-1 scroll-hide">
                    {recentItems.map((entry) => (
                      <ShareTargetItem
                        key={entry.id}
                        entry={entry}
                        variant="horizontal"
                        currentUserId={currentUserId}
                        usersMap={usersMap}
                        selected={selectedConversationIds.has(entry.id)}
                        onToggle={() => handleToggleConversation(entry.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-80 px-1">
                  Danh sách bạn bè
                </span>
                <div className="space-y-1">
                  {friendItems.length > 0 ? (
                    friendItems.map((entry) => (
                      <ShareTargetItem
                        key={entry.id}
                        entry={entry}
                        currentUserId={currentUserId}
                        usersMap={usersMap}
                        selected={selectedConversationIds.has(entry.id)}
                        onToggle={() => handleToggleConversation(entry.id)}
                      />
                    ))
                  ) : (
                    <EmptyState
                      title="Trống"
                      description="Chưa có bạn bè trong danh sách"
                      size="sm"
                      className="py-6"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="flex flex-col gap-3.5 overflow-y-auto scroll-hide min-h-0">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-80 px-1">
                Kết quả tìm kiếm
              </span>
              <div className="space-y-1.5">
                {filteredItems.length > 0 ? (
                  filteredItems.map((entry) => (
                    <ShareTargetItem
                      key={entry.id}
                      entry={entry}
                      currentUserId={currentUserId}
                      usersMap={usersMap}
                      selected={selectedConversationIds.has(entry.id)}
                      onToggle={() => handleToggleConversation(entry.id)}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={Search}
                    title="Không tìm thấy kết quả"
                    size="sm"
                    className="py-12"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
