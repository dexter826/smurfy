import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Flag,
  Play,
  Pause,
  Maximize2,
  AlertCircle,
} from 'lucide-react';
import {
  UserAvatar,
  IconButton,
  Modal,
  Dropdown,
  DropdownItem,
  Skeleton,
  ReactionDetailsModal,
  MediaViewer,
} from '@/components/ui';
import { Post, User, ReactionType, PostType, Visibility, PostStatus } from '@shared/types';
import { CommentSection } from '@/features/comment';
import { formatRelativeTime, formatDateTime } from '@/utils/dateUtils';
import { useFriendIds, useFilteredReactions } from '@/hooks';
import {
  VisibilityBadge,
  TruncatedText,
  InteractionActions,
  PostMediaGrid,
  SystemPostMedia,
} from '../shared';
import { PostViewCinema } from './PostViewCinema';

interface PostViewModalProps {
  post: Post | null;
  author: User | null;
  currentUser: User;
  open: boolean;
  onOpenChange: () => void;
  onReact: (postId: string, reaction: ReactionType | 'REMOVE') => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onShare?: (post: Post, authorName: string) => void;
  isLoading?: boolean;
}

export const PostViewModal: React.FC<PostViewModalProps> = ({
  post,
  author,
  currentUser,
  open,
  onOpenChange,
  onReact,
  onEdit,
  onDelete,
  onShare,
  isLoading,
}) => {
  const navigate = useNavigate();
  const friendIds = useFriendIds();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [isReactionsModalOpen, setIsReactionsModalOpen] = useState(false);

  const { filteredSummary, filteredCount, currentUserReaction } = useFilteredReactions(
    post?.id || '',
    'post',
    post?.authorId || '',
    post?.reactionCount,
  );

  const handleProfileClick = useCallback(() => {
    if (author?.id) {
      onOpenChange();
      navigate(`/profile/${author.id}`);
    }
  }, [author?.id, onOpenChange, navigate]);

  useEffect(() => {
    if (open) {
      setActiveMediaIndex(0);
    }
  }, [open, post?.id]);

  useEffect(() => {}, [activeMediaIndex]);

  const allMedia = useMemo(() => {
    if (!post) return [];
    return (post.media || []).map((m) => ({
      url: m.url,
      type: 'image' as const,
    }));
  }, [post?.media]);

  const isOwner = post?.authorId === currentUser.id;
  const isSystemPost =
    post?.type === PostType.AVATAR_UPDATE || post?.type === PostType.COVER_UPDATE;
  const isFriend = (post && friendIds?.includes(post.authorId)) || false;
  const isDeleted = post?.status === PostStatus.DELETED;
  const canAccessByVisibility =
    !post ||
    isOwner ||
    post.visibility === Visibility.PUBLIC ||
    (post.visibility === Visibility.FRIENDS && isFriend);
  const canShare =
    !!post && !isDeleted && post.visibility !== Visibility.PRIVATE && canAccessByVisibility;
  const canShowInteractions = !post || !isSystemPost || (!isDeleted && canAccessByVisibility);

  const handleSharePost = useCallback(() => {
    if (!post) return;
    onShare?.(post, author?.fullName || 'Người dùng');
  }, [post, author?.fullName, onShare]);

  const readonlyMessage = useMemo(() => {
    if (!post) return undefined;

    if (isSystemPost) {
      if (!isOwner && !isFriend) return undefined;
      if (isDeleted) return '';
      if (post.visibility === Visibility.PRIVATE && isFriend) return '';
    }

    return undefined;
  }, [post, isSystemPost, isOwner, isFriend, isDeleted]);

  if (!open) return null;

  const shouldShowSkeleton = !!isLoading;
  const isCinema = post ? (post.media?.length ?? 0) > 0 : false;

  if ((!post || isDeleted) && !shouldShowSkeleton) {
    return (
      <Modal open={open} onOpenChange={onOpenChange} showHeader={false} size="md" padding="none">
        <div className="p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-surface-2 border border-line flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-ink-3" />
          </div>
          <h3 className="text-lg font-semibold text-ink mb-2">Không thể truy cập bài viết</h3>
          <p className="text-sm text-ink-2 leading-relaxed">
            Bài viết đã bị xóa hoặc bạn không còn quyền xem nội dung này.
          </p>
          <button
            type="button"
            onClick={onOpenChange}
            className="mt-5 px-4 py-2 rounded-control border border-line text-sm font-semibold text-ink hover:bg-surface-2 transition-colors"
          >
            Đóng
          </button>
        </div>
      </Modal>
    );
  }

  if (!post) return null;

  /* ── Loading skeleton ── */
  if (shouldShowSkeleton) {
    return (
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        showHeader={false}
        size={isCinema ? 'full' : '2xl'}
        padding="none"
        fullScreen={isCinema ? true : 'mobile'}
        bodyClassName={`overflow-hidden flex flex-col h-full ${isCinema ? 'lg:flex-row' : ''}`}
      >
        {isCinema && (
          <div className="hidden lg:flex flex-[1.6] bg-chat items-center justify-center border-r border-white/5 shrink-0">
            <Skeleton className="w-[80%] aspect-video rounded-card opacity-10" />
          </div>
        )}
        <div
          className={`flex flex-col bg-surface shrink-0 transition-theme ${isCinema ? 'h-full w-full lg:w-[460px] flex-1 lg:flex-none' : 'w-full h-auto'}`}
        >
          <div className="p-4 md:p-5 border-b border-line flex items-center gap-3 shrink-0">
            <Skeleton variant="circle" width={42} height={42} />
            <div className="space-y-1.5 flex-1">
              <Skeleton width={140} height={14} />
              <Skeleton width={80} height={11} />
            </div>
            <Skeleton variant="circle" width={32} height={32} />
            <Skeleton variant="circle" width={32} height={32} />
          </div>
          <div className="flex-1 p-5 space-y-3">
            <Skeleton width="100%" height={14} />
            <Skeleton width="85%" height={14} />
            <Skeleton width="60%" height={14} />
          </div>
        </div>
      </Modal>
    );
  }

  const hasMedia = allMedia.length > 0;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showHeader={false}
      size={hasMedia ? 'full' : '2xl'}
      padding="none"
      fullScreen={hasMedia ? true : 'mobile'}
      bodyClassName={`overflow-hidden flex flex-col ${hasMedia ? 'lg:flex-row h-full' : 'h-auto max-h-[90vh]'}`}
    >
      {/* ── Cinema media panel (desktop only) ── */}
      {hasMedia && (
        <PostViewCinema
          post={post}
          allMedia={allMedia}
          activeMediaIndex={activeMediaIndex}
          setActiveMediaIndex={setActiveMediaIndex}
          setIsMediaViewerOpen={setIsMediaViewerOpen}
        />
      )}

      {/* ── Content / comment panel ── */}
      <div
        className={`flex flex-col bg-surface transition-theme relative overflow-hidden
          ${hasMedia ? 'h-full w-full lg:w-[460px] flex-1 lg:flex-none' : 'w-full h-auto'}`}
        style={{ zIndex: 10 }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b border-line shrink-0 bg-surface"
          style={{ zIndex: 'var(--z-sticky)' }}
        >
          <UserAvatar
            userId={author?.id || post.authorId}
            src={author?.avatar?.url}
            name={author?.fullName}
            size="md"
            initialStatus={author?.status}
            onClick={handleProfileClick}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                className="font-semibold text-sm text-ink hover:text-accent-strong transition-colors duration-200 truncate"
                onClick={handleProfileClick}
              >
                {author?.fullName || 'Người dùng'}
              </button>
              {post.type === PostType.AVATAR_UPDATE && (
                <span className="text-sm text-ink-2 font-normal">vừa cập nhật ảnh đại diện.</span>
              )}
              {post.type === PostType.COVER_UPDATE && (
                <span className="text-sm text-ink-2 font-normal">vừa cập nhật ảnh bìa.</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-3 mt-0.5">
              <span title={formatDateTime(post.createdAt)}>
                {formatRelativeTime(post.createdAt)}
              </span>
              <span className="opacity-40">·</span>
              <VisibilityBadge visibility={post.visibility} size={11} />
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0 ml-auto">
            {isOwner && !isDeleted && (
              <Dropdown
                trigger={
                  <IconButton icon={<MoreHorizontal size={18} />} size="sm" variant="ghost" />
                }
              >
                <DropdownItem
                  icon={<Edit size={15} />}
                  label={isSystemPost ? 'Chỉnh sửa quyền riêng tư' : 'Chỉnh sửa bài viết'}
                  onClick={() => onEdit?.(post.id)}
                />
                <DropdownItem
                  icon={<Trash2 size={15} />}
                  label="Xóa bài viết"
                  variant="danger"
                  onClick={() => onDelete?.(post.id)}
                />
              </Dropdown>
            )}
            <IconButton icon={<X size={18} />} onClick={onOpenChange} variant="ghost" size="sm" />
          </div>
        </div>

        {/* Comment section with inline header content */}
        <CommentSection
          postId={post.id}
          currentUser={currentUser}
          variant="cinema"
          autoFocus={canShowInteractions}
          className="flex-1 min-h-0"
          onProfileClick={onOpenChange}
          postOwnerId={post.authorId}
          totalCommentCount={post.commentCount}
          readonly={!canShowInteractions}
          readonlyMessage={readonlyMessage}
          header={
            <div className="flex flex-col">
              {/* Post text (Displayed first on mobile) */}
              {!isSystemPost && post.content && (
                <div className="px-4 md:px-5 py-3 w-full">
                  <p className="text-ink whitespace-pre-line break-words text-sm leading-relaxed">
                    <TruncatedText content={post.content} threshold={300} />
                  </p>
                </div>
              )}

              {/* Mobile media grid - Displayed after text with "Full" style */}
              {hasMedia && (
                <div className="lg:hidden w-full relative bg-canvas/20">
                  {/* Mobile Fullscreen button - Glassmorphism style preserved */}
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={() => setIsMediaViewerOpen(true)}
                      className="w-9 h-9 flex items-center justify-center bg-black/20 hover:bg-black/30 active:scale-95 backdrop-blur-md text-white rounded-full border border-white/10 shadow-lg transition-all duration-150"
                      title="Xem toàn màn hình"
                    >
                      <Maximize2 size={18} strokeWidth={2} />
                    </button>
                  </div>

                  {!isSystemPost ? (
                    <div
                      className={`grid gap-1 w-full bg-canvas/10 ${allMedia.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
                    >
                      {allMedia.map((media, idx) => (
                        <div
                          key={idx}
                          className={`relative cursor-pointer group overflow-hidden bg-surface border border-line/30
                            ${allMedia.length > 2 && idx === 0 && allMedia.length % 2 !== 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                          onClick={() => {
                            setActiveMediaIndex(idx);
                            setIsMediaViewerOpen(true);
                          }}
                        >
                          <img
                            src={media.url}
                            alt=""
                            className="w-full h-full object-cover animate-fade-in"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <SystemPostMedia
                      type={post.type as PostType.AVATAR_UPDATE | PostType.COVER_UPDATE}
                      media={post.media || []}
                      variant="cinema"
                    />
                  )}
                </div>
              )}

              {/* Reaction actions */}
              {canShowInteractions && (
                <div>
                  <InteractionActions
                    reactionSummary={filteredSummary}
                    reactionCount={filteredCount}
                    myReaction={currentUserReaction}
                    commentCount={post.commentCount}
                    onReact={(type) => onReact(post.id, type)}
                    onShareClick={canShare ? handleSharePost : undefined}
                    onViewReactions={() => setIsReactionsModalOpen(true)}
                    statsClassName="px-4 md:px-5 py-2.5 flex justify-between items-center border-b border-line/50"
                    actionClassName="flex px-1 py-1 gap-0.5 border-b border-line"
                    selectorPosition="bottom"
                  />
                </div>
              )}
            </div>
          }
        />
      </div>

      <ReactionDetailsModal
        open={isReactionsModalOpen}
        onOpenChange={() => setIsReactionsModalOpen(false)}
        sourceId={post.id}
        sourceType="post"
        currentUserId={currentUser.id}
      />

      <MediaViewer
        media={allMedia}
        initialIndex={activeMediaIndex}
        open={isMediaViewerOpen}
        onOpenChange={() => setIsMediaViewerOpen(false)}
      />
    </Modal>
  );
};
