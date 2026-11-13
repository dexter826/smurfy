import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { User } from '@shared/types';
import { useChat } from '@/hooks';
import { useLoadingStore } from '@/store/loadingStore';
import { useAuthStore } from '@/features/auth';
import { useFriendIds, useBlockedUsers } from '@/hooks';
import { friendService } from '@/features/friend';
import { useConversationMemberSettings } from '@/features/chat';
import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';
import {
  ConversationList,
  ChatBox,
  ChatInput,
  ChatDetailsPanel,
  MessengerSkeleton,
  DragDropZone,
  ChatModals,
  useChatModalState,
} from '../components/chat';

import { scrollToMessage } from '@/utils';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const chat = useChat();
  const {
    currentUser,
    conversations,
    filteredConversations,
    selectedConversationId,
    selectedConversation,
    currentMessages,
    currentTypingUsers,
    isLoading,
    viewMode,
    setViewMode,
    isSearchFocused,
    setSearchFocused,
    searchResults,
    searchHistory,
    archivedCount,
    usersMap,
    isBlocked,
    isBlockedByMe,
    partnerStatus,
    blockedMessage,
    forwardingMessage,
    setForwardingMessage,
    replyingTo,
    setReplyingTo,
    editingMessage,
    setEditingMessage,
    handleSelectConversation,
    handleSendText,
    handleEditMessage,
    handleRecallMessage,
    handleDeleteForMe,
    handleForwardMessage,
    handleSendImage,
    handleTyping,
    handleSearch,
    handlePin,
    handleMute,
    handleArchive,
    handleMarkUnread,
    handleDelete,
    handleMarkAllRead,
    shouldShowBlockBanner,
    myBlockOptions,
    addToSearchHistory,
    removeFromSearchHistory,
    clearSearchHistory,
    getOrCreateConversation,
    setIsChatVisible,
    isLoadingMore,
    hasMoreMessages,
    handleLoadMoreMessages,
    friendRequestStatus,
    receivedRequests,
    sentRequests,
    participants,
    handleMarkAsRead,
    isLoadingSettings,
  } = chat;

  const isSearching = useLoadingStore((state) => state.loadingStates['contacts.search']);
  const friendIds = useFriendIds();
  const selectedMemberSettings = useConversationMemberSettings(
    selectedConversationId || '',
    currentUser?.id || '',
  );
  const modal = useChatModalState();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setIsChatVisible(true);
    return () => {
      setIsChatVisible(false);
      handleSelectConversation(null);
    };
  }, [setIsChatVisible, handleSelectConversation]);

  const [searchParams] = useSearchParams();
  const convIdFromUrl = searchParams.get('conv');

  useEffect(() => {
    if (!convIdFromUrl) return;
    handleSelectConversation(convIdFromUrl);
    navigate('/', { replace: true });
  }, [convIdFromUrl, handleSelectConversation, navigate]);

  const handleSelectUserFromSearch = (user: User, bypassSettingsCheck: boolean = false) => {
    if (!currentUser) return;

    addToSearchHistory(user);
    getOrCreateConversation(currentUser.id, user.id);
    setSearchFocused(false);
  };

  const confirmUnblockPartner = async () => {
    await chat.handleUnblock(modal.blockTarget?.id);
    modal.closeBlockModal();
  };

  if (!currentUser) return <MessengerSkeleton />;

  const handleSendFriendRequest = async (userId: string) => {
    await friendService.sendFriendRequest(currentUser.id, userId);
  };

  const handleAcceptFriendRequest = async (userId: string) => {
    const request = receivedRequests.find((r) => r.senderId === userId);
    if (request)
      await friendService.acceptFriendRequest(request.id, request.senderId, currentUser.id);
  };

  const handleDeclineFriendRequest = async (userId: string) => {
    const request = receivedRequests.find((r) => r.senderId === userId);
    if (request) await friendService.rejectFriendRequest(request.id);
  };

  const handleCancelFriendRequest = async (userId: string) => {
    const request = sentRequests.find((r) => r.receiverId === userId);
    if (request) await friendService.cancelFriendRequest(request.id);
  };

  const handleBackToList = () => {
    handleSelectConversation(null);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex h-full w-full overflow-hidden md:gap-3 md:p-3">
      {/* ── Conversation list panel ── */}
      <div
        className={`${selectedConversationId ? 'hidden md:flex' : 'flex'} md:w-[320px] flex-shrink-0 w-full bg-surface md:rounded-l-card md:border md:border-line md:shadow-card`}
      >
        <ConversationList
          conversations={filteredConversations}
          selectedId={selectedConversationId}
          currentUserId={currentUser.id}
          currentUserFriendIds={friendIds}
          isLoading={isLoading}
          isSearching={isSearching}
          viewMode={viewMode}
          archivedCount={archivedCount}
          onViewModeChange={setViewMode}
          onBlock={modal.openBlockModal}
          isSearchFocused={isSearchFocused}
          onSearchFocus={setSearchFocused}
          searchResults={searchResults}
          searchHistory={searchHistory}
          onRemoveFromHistory={removeFromSearchHistory}
          onClearHistory={clearSearchHistory}
          onSelectUser={handleSelectUserFromSearch}
          onSelectConversation={(id) => {
            const conv = conversations.find((c) => c.id === id);
            if (conv) addToSearchHistory(conv);
            handleSelectConversation(id);
            setSearchFocused(false);
          }}
          onSearch={handleSearch}
          onPin={handlePin}
          onMute={handleMute}
          onArchive={handleArchive}
          onMarkUnread={handleMarkUnread}
          onDelete={handleDelete}
          onMarkAllRead={handleMarkAllRead}
          onNewGroup={() => modal.setShowCreateGroup(true)}
        />
      </div>

      {/* ── Chat area ── */}
      <div
        className={`flex-1 flex flex-col min-w-0 bg-surface md:border md:border-line md:border-l-0 md:rounded-r-card md:shadow-card ${selectedConversationId ? 'flex' : 'hidden md:flex'}`}
      >
        {selectedConversation ? (
          <DragDropZone disabled={!!blockedMessage || !!selectedConversation?.data.isDisbanded}>
            <ChatBox
              conversation={selectedConversation}
              messages={currentMessages}
              participants={participants}
              currentUserId={currentUser.id}
              currentUserFriendIds={friendIds}
              friendRequestStatus={friendRequestStatus}
              usersMap={usersMap}
              typingUsers={currentTypingUsers}
              onBack={handleBackToList}
              onInfoClick={() => setShowDetails(true)}
              onRecall={handleRecallMessage}
              onDeleteForMe={handleDeleteForMe}
              onForward={handleForwardMessage}
              onReply={(msg) => {
                setReplyingTo(msg);
                setEditingMessage(null);
              }}
              onEdit={(msg) => {
                setEditingMessage(msg);
                setReplyingTo(null);
              }}
              onAddFriend={handleSendFriendRequest}
              onAcceptFriend={handleAcceptFriendRequest}
              onDeclineFriend={handleDeclineFriendRequest}
              onCancelFriend={handleCancelFriendRequest}
              onBlock={modal.openBlockModal}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasMoreMessages={hasMoreMessages}
              onLoadMore={handleLoadMoreMessages}
              isBlocked={isBlocked}
              isBlockedByMe={isBlockedByMe}
              partnerStatus={partnerStatus}
              myBlockOptions={myBlockOptions}
              onUnblock={chat.handleUnblock}
              onManageBlock={modal.openBlockModal}
              shouldShowBlockBanner={shouldShowBlockBanner}
              handleMarkAsRead={handleMarkAsRead}
            />
            <ChatInput
              key={selectedConversationId}
              onSendText={handleSendText}
              onSendImages={handleSendImage}
              onTyping={handleTyping}
              blockedMessage={blockedMessage}
              onManageBlock={modal.openBlockModal}
              isBlockedByMe={isBlockedByMe}
              replyingTo={replyingTo}
              editingMessage={editingMessage}
              currentUserId={currentUser.id}
              usersMap={usersMap}
              participants={participants}
              isGroup={selectedConversation.data.isGroup}
              isDisbanded={selectedConversation.data.isDisbanded}
              onDeleteConversation={() => handleDelete(selectedConversation.id)}
              onCancelAction={() => {
                setReplyingTo(null);
                setEditingMessage(null);
              }}
              onEditMessage={
                editingMessage ? (text) => handleEditMessage(editingMessage.id, text) : undefined
              }
              conversationId={selectedConversationId}
              isLoadingSettings={isLoadingSettings}
            />
          </DragDropZone>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <EmptyState
              icon={MessageSquare}
              title="Tin nhắn của bạn"
              description="Chọn một cuộc trò chuyện để bắt đầu nhắn tin với bạn bè ngay bây giờ!"
              size="lg"
            />
          </div>
        )}
      </div>

      {/* ── Details panel ── */}
      {selectedConversation && (
        <ChatDetailsPanel
          conversation={selectedConversation}
          messages={currentMessages}
          currentUserId={currentUser.id}
          usersMap={usersMap}
          open={showDetails}
          isBlocked={isBlocked}
          onOpenChange={() => setShowDetails(false)}
          onToggleMute={() =>
            handleMute(selectedConversation.id, !(selectedMemberSettings?.isMuted || false))
          }
          onTogglePin={() =>
            handlePin(selectedConversation.id, !(selectedMemberSettings?.isPinned || false))
          }
          onToggleArchive={() =>
            handleArchive(selectedConversation.id, !(selectedMemberSettings?.isArchived || false))
          }
          onToggleMarkUnread={() => handleMarkUnread(selectedConversation.id, false)}
          onToggleBlock={modal.openBlockModal}
          onDelete={() => {
            if (
              selectedConversation.data.isGroup &&
              selectedConversation.data.creatorId === currentUser.id
            ) {
              chat.handleDisbandGroup();
            } else {
              handleDelete(selectedConversation.id);
            }
          }}
          onLeaveGroup={() => {
            const result = chat.handleLeaveGroup();
            if (result && 'then' in result) {
              (result as Promise<{ needAssignAdmin: boolean }>).then((res) => {
                if (res?.needAssignAdmin) modal.setShowAssignAdmin(true);
              });
            }
          }}
          onEditGroup={() => modal.setShowEditGroup(true)}
          onAddMember={() => modal.setShowAddMember(true)}
          onRemoveMember={chat.handleRemoveMember}
          onPromoteToAdmin={chat.handlePromoteToAdmin}
          onDemoteFromAdmin={chat.handleDemoteFromAdmin}
          onApproveMembers={chat.handleApproveMembers}
          onRejectMembers={chat.handleRejectMembers}
          onToggleApprovalMode={chat.handleToggleApprovalMode}
          onTransferCreator={() => modal.setShowTransferCreator(true)}
          onCopyInviteLink={chat.handleCopyInviteLink}
          onResetInviteLink={chat.handleResetInviteLink}
          onMemberClick={(userId) => navigate(`/profile/${userId}`)}
          onMessageClick={(messageId) => scrollToMessage(messageId)}
        />
      )}

      <ChatModals
        modal={modal}
        chat={chat}
        selectedConversation={selectedConversation ?? null}
        currentUserId={currentUser?.id ?? ''}
        partner={chat.partnerId ? (usersMap[chat.partnerId] ?? null) : null}
        myBlockOptions={myBlockOptions}
      />
    </div>
  );
};

export default ChatPage;
