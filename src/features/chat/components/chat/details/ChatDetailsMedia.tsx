import React, { useState, useMemo } from 'react';
import { RtdbMessage, MediaObject, MessageType } from '@shared/types';
import { Image, Link2, ExternalLink } from 'lucide-react';
import { LazyImage, MediaViewer, EmptyState } from '@/components/ui';

interface ChatDetailsMediaProps {
  messages: Array<{ id: string; data: RtdbMessage }>;
  onMessageClick?: (messageId: string) => void;
}

type MediaTab = 'images' | 'links';

interface MediaViewerState {
  open: boolean;
  index: number;
  items: { type: 'image'; url: string }[];
}

/** Hiển thị hình ảnh và liên kết trong hội thoại */
const ChatDetailsMediaInner: React.FC<ChatDetailsMediaProps> = ({ messages, onMessageClick }) => {
  const [activeTab, setActiveTab] = useState<MediaTab>('images');
  const [viewer, setViewer] = useState<MediaViewerState>({ open: false, index: 0, items: [] });

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => b.data.createdAt - a.data.createdAt),
    [messages],
  );

  const mediaItems = useMemo(() => {
    const images: Array<{ key: string; msgId: string; media: MediaObject }> = [];
    const links: Array<{ key: string; msgId: string; url: string; title?: string }> = [];

    const URL_REGEX = /(https?:\/\/[^\s]+)/g;

    sortedMessages.forEach((msg) => {
      // Trích xuất links từ tin nhắn văn bản
      if (msg.data.type === MessageType.TEXT && msg.data.content) {
        const matches = msg.data.content.match(URL_REGEX);
        if (matches) {
          matches.forEach((url, i) => {
            links.push({
              key: `${msg.id}_${i}`,
              msgId: msg.id,
              url,
            });
          });
        }
      }

      // Trích xuất links từ tin nhắn share post
      if (msg.data.type === MessageType.SHARE_POST && msg.data.content) {
        try {
          const payload = JSON.parse(msg.data.content);
          if (payload.postId) {
            links.push({
              key: msg.id,
              msgId: msg.id,
              url: `${window.location.origin}/post/${payload.postId}`,
              title: payload.authorName ? `Bài viết của ${payload.authorName}` : 'Bài viết chia sẻ',
            });
          }
        } catch {
          // Bỏ qua nếu lỗi parse
        }
      }

      if (!msg.data.media || msg.data.media.length === 0) return;
      msg.data.media.forEach((media, i) => {
        const entry = { key: `${msg.id}_${i}`, msgId: msg.id, media };
        if (media.url) {
          images.push(entry);
        }
      });
    });

    return { images, links };
  }, [sortedMessages]);

  const imageViewerItems = useMemo(
    () => mediaItems.images.map((i) => ({ type: 'image' as const, url: i.media.url })),
    [mediaItems.images],
  );

  const tabs: { id: MediaTab; label: string; icon: React.ReactNode }[] = [
    { id: 'images', label: 'Ảnh', icon: <Image size={14} /> },
    { id: 'links', label: 'Link', icon: <Link2 size={14} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'images':
        if (mediaItems.images.length === 0)
          return (
            <EmptyState
              title="Chưa có ảnh"
              description="Chưa có ảnh nào được chia sẻ"
              size="sm"
              className="py-12"
            />
          );
        return (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {mediaItems.images.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setViewer({ open: true, index, items: imageViewerItems })}
                className="aspect-square overflow-hidden hover:opacity-85 active:opacity-70 transition-opacity duration-200 group relative"
              >
                <LazyImage
                  src={item.media.url || ''}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  wrapperClassName="w-full h-full"
                />
              </button>
            ))}
          </div>
        );

      case 'links':
        if (mediaItems.links.length === 0)
          return (
            <EmptyState
              title="Chưa có liên kết"
              description="Chưa có liên kết nào được chia sẻ"
              size="sm"
              className="py-12"
            />
          );
        return (
          <div className="space-y-0.5 p-2">
            {mediaItems.links.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-hover transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => onMessageClick?.(item.msgId)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Link2 size={17} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.title || 'Liên kết'}
                    </p>
                    <p className="text-xs text-muted truncate max-w-[200px]">{item.url}</p>
                  </div>
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-active text-muted hover:text-primary transition-all duration-200 flex-shrink-0"
                  title="Mở liên kết"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Sub Tab Bar */}
      <div className="flex border-b border-border flex-shrink-0 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 relative outline-none
              ${activeTab === tab.id ? 'text-primary' : 'text-muted hover:text-secondary'}`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scroll-hide min-h-0">{renderContent()}</div>

      <MediaViewer
        media={viewer.items}
        initialIndex={viewer.index}
        open={viewer.open}
        onOpenChange={() => setViewer((v) => ({ ...v, open: false }))}
      />
    </div>
  );
};

export const ChatDetailsMedia = React.memo(ChatDetailsMediaInner);
