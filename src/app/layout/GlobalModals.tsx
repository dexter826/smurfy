import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog } from '@/components/ui';
import { ReactionType, MediaObject, Visibility } from '@shared/types';
import { useAuthStore } from '@/features/auth';
import { useContactStore } from '@/features/friend';
import { PostViewModal, PostModal } from '@/features/feed';
import { SharePostModal, JoinGroupModal } from '@/features/chat';
import { usePostStore, toast, useLoadingStore, useRtdbChatStore } from '../../store';
import { usePostNavigation } from '../../hooks/usePostNavigation';
import { useUserCache } from '../../store/userCacheStore';
import { useSharePostStore } from '@/features/feed';
import { TOAST_MESSAGES } from '../../constants';
import { useGroupInvite } from './hooks/useGroupInvite';

export const GlobalModals: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedPost,
    setSelectedPost,
    reactToPost,
    fetchPostById,
    posts,
    updatePost,
    deletePost,
  } = usePostStore();
  const isModalLoading = useLoadingStore((state) => state.loadingStates['post.detail']);
  const { users: usersMap, fetchUsers } = useUserCache();
  const { closePost } = usePostNavigation();
  const { friends } = useContactStore((s) => ({ friends: s.friends }));
  const {
    post: postToShare,
    authorName: shareAuthorName,
    openSharePost,
    closeSharePost,
  } = useSharePostStore();
  const { handleGlobalJoinConfirm } = useRtdbChatStore();

  const [showEditModal, setShowEditModal] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const friendIds = friends.map((f) => f.id);

  const handleEditPost = async (
    content: string,
    media: MediaObject[],
    visibility: Visibility,
    pendingFiles?: File[],
  ) => {
    if (!showEditModal) return;
    await updatePost(showEditModal, content, media, visibility, pendingFiles);
    setShowEditModal(null);
  };

  const handleDeletePost = async () => {
    if (!postToDelete || !user) return;
    await deletePost(postToDelete, user.id);
    if (selectedPost?.id === postToDelete) {
      closePost();
    }
    setPostToDelete(null);
  };

  const handlePostReact = async (targetId: string, reaction: ReactionType | 'REMOVE') => {
    if (user) await reactToPost(targetId, user.id, reaction);
  };

  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('post');

  useEffect(() => {
    if (postId && user) {
      fetchPostById(postId, user.id, friendIds);
    } else if (!postId && selectedPost) {
      setSelectedPost(null);
    }
  }, [postId, user?.id, selectedPost?.id, friendIds, fetchPostById, setSelectedPost]);

  useEffect(() => {
    if (selectedPost && !usersMap[selectedPost.authorId]) {
      fetchUsers([selectedPost.authorId]);
    }
  }, [selectedPost, usersMap, fetchUsers]);

  const { invite, closeInvite } = useGroupInvite();

  const handleJoin = async () => {
    try {
      const result: any = await handleGlobalJoinConfirm();
      if (result.status === 'joined') {
        toast.success(TOAST_MESSAGES.GROUP.JOIN_SUCCESS(invite.info?.name || ''));
        navigate(`/?conv=${result.convId}`);
      } else if (result.status === 'already_member') {
        toast.info(TOAST_MESSAGES.GROUP.ALREADY_MEMBER);
        navigate(`/?conv=${result.convId}`);
      } else if (result.status === 'pending') {
        toast.info(TOAST_MESSAGES.GROUP.PENDING_APPROVAL);
      }
    } catch {
      toast.error(TOAST_MESSAGES.GROUP.JOIN_FAILED);
    }
  };

  return (
    <>
      {user && (
        <PostViewModal
          open={!!postId}
          onOpenChange={closePost}
          post={selectedPost}
          author={selectedPost ? usersMap[selectedPost.authorId] : null}
          currentUser={user}
          onReact={handlePostReact}
          isLoading={isModalLoading}
          onEdit={(id) => setShowEditModal(id)}
          onDelete={(id) => setPostToDelete(id)}
          onShare={openSharePost}
        />
      )}

      {user && (
        <SharePostModal
          open={!!postToShare}
          onOpenChange={closeSharePost}
          post={postToShare}
          authorName={shareAuthorName}
          currentUserId={user.id}
        />
      )}

      {user && (
        <PostModal
          open={!!showEditModal}
          onOpenChange={() => setShowEditModal(null)}
          currentUser={user}
          initialPost={posts.find((p) => p.id === showEditModal) || selectedPost || undefined}
          onSubmit={handleEditPost}
        />
      )}

      <AlertDialog
        open={!!postToDelete}
        onOpenChange={() => setPostToDelete(null)}
        onConfirm={handleDeletePost}
        title="Xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
        confirmLabel="Xóa ngay"
        variant="danger"
      />

      {user && (
        <JoinGroupModal
          open={!!invite.info}
          onOpenChange={closeInvite}
          onJoin={handleJoin}
          isLoading={invite.isJoining}
          groupInfo={invite.info}
        />
      )}
    </>
  );
};
