import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Sparkles, Bell, UserPlus } from 'lucide-react';
import { useContacts } from '../hooks/useContacts';
import { AlertDialog, BlockOptionsModal } from '@/components/ui';
import { CONFIRM_MESSAGES, TOAST_MESSAGES } from '@/constants';
import { AddFriendModal } from './AddFriendModal';
import { useAuthStore } from '@/features/auth';
import { toast } from '@/store/toastStore';
import { BlockOptions, User } from '@shared/types';
import {
  ContactsTab,
  TabConfigItem,
  ContactsSidebar,
  ContactsActionBar,
  FriendsListSection,
  RequestsListSection,
  SuggestionsListSection,
  ContactsDetailPanel,
} from './contacts';

const ContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    friends,
    receivedRequests,
    sentRequests,
    filteredReceivedRequests,
    filteredSentRequests,
    filteredSuggestions,
    groupedFriends,
    userCache,
    isLoading,
    isSuggestionsLoading,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    sortOrder,
    toggleSortOrder,
    handleAcceptRequest,
    handleRejectRequest,
    handleCancelRequest,
    handleUnfriend,
    handleMessage,
    handleAddFriend,
    handleDismissSuggestion,
    handleRefreshSuggestions,
    handleApplyBlock,
    handleUnblock,
  } = useContacts();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab as ContactsTab);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, setActiveTab, navigate, location.pathname]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [unfriendId, setUnfriendId] = useState<string | null>(null);
  const [blockTarget, setBlockTarget] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const blockedUsers = useAuthStore((state) => state.blockedUsers);
  const currentBlockOptions = blockTarget ? blockedUsers[blockTarget.id] : undefined;

  const onUnfriendConfirm = async () => {
    if (!unfriendId) return;
    await handleUnfriend(unfriendId);
    if (selectedUser?.id === unfriendId) {
      setSelectedUser(null);
    }
    setUnfriendId(null);
  };

  const onMessageClick = useCallback(
    async (friendId: string) => {
      const convId = await handleMessage(friendId);
      if (convId) navigate(`/?conv=${convId}`);
    },
    [handleMessage, navigate],
  );

  const onApplyBlock = async (options: BlockOptions) => {
    if (!blockTarget) return;
    try {
      await handleApplyBlock(blockTarget.id, options);
      toast.success(TOAST_MESSAGES.BLOCK.BLOCK_SUCCESS);
      setBlockTarget(null);
    } catch {
      toast.error(TOAST_MESSAGES.BLOCK.BLOCK_FAILED);
    }
  };

  const onUnblock = async () => {
    if (!blockTarget) return;
    try {
      await handleUnblock(blockTarget.id);
      toast.success(TOAST_MESSAGES.BLOCK.UNBLOCK_SUCCESS);
      setBlockTarget(null);
    } catch {
      toast.error(TOAST_MESSAGES.BLOCK.UNBLOCK_FAILED);
    }
  };

  const tabConfig = useMemo<TabConfigItem[]>(
    () => [
      {
        id: 'all',
        label: 'Tất cả bạn bè',
        mobileLabel: 'Bạn bè',
        icon: <Users size={18} />,
        count: friends.length,
      },
      {
        id: 'suggestions',
        label: 'Gợi ý kết bạn',
        mobileLabel: 'Gợi ý',
        icon: <Sparkles size={18} />,
        count: filteredSuggestions.length,
      },
      {
        id: 'requests',
        label: 'Lời mời kết bạn',
        mobileLabel: 'Lời mời',
        icon: <Bell size={18} />,
        count: receivedRequests.length,
        badge: receivedRequests.length > 0,
      },
      {
        id: 'sent',
        label: 'Lời mời đã gửi',
        mobileLabel: 'Đã gửi',
        icon: <UserPlus size={18} />,
        count: sentRequests.length,
      },
    ],
    [friends.length, filteredSuggestions.length, receivedRequests.length, sentRequests.length],
  );

  const isSelectedUserFriend = useMemo(
    () => (selectedUser ? friends.some((f) => f.id === selectedUser.id) : false),
    [selectedUser, friends],
  );

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* ── Left Sidebar (Desktop) ── */}
      <ContactsSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedUser(null);
        }}
        tabConfig={tabConfig}
        onOpenAddModal={() => setShowAddModal(true)}
      />

      {/* ── Center Content ── */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-surface bg-app-pattern">
        <ContactsActionBar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setSelectedUser(null);
          }}
          tabConfig={tabConfig}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onToggleSortOrder={toggleSortOrder}
          isSuggestionsLoading={isSuggestionsLoading}
          onRefreshSuggestions={handleRefreshSuggestions}
          onOpenAddModal={() => setShowAddModal(true)}
          friendsCount={friends.length}
          suggestionsCount={filteredSuggestions.length}
          receivedCount={receivedRequests.length}
          sentCount={sentRequests.length}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
          <div className="w-full">
            {activeTab === 'all' && (
              <FriendsListSection
                isLoading={isLoading}
                groupedFriends={groupedFriends}
                searchTerm={searchTerm}
                selectedUserId={selectedUser?.id}
                onSelectUser={setSelectedUser}
                onMessage={onMessageClick}
                onUnfriend={setUnfriendId}
                onBlock={setBlockTarget}
              />
            )}

            {activeTab === 'requests' && (
              <RequestsListSection
                type="received"
                isLoading={isLoading}
                requests={filteredReceivedRequests}
                userCache={userCache}
                searchTerm={searchTerm}
                selectedUserId={selectedUser?.id}
                onSelectUser={setSelectedUser}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            )}

            {activeTab === 'sent' && (
              <RequestsListSection
                type="sent"
                isLoading={isLoading}
                requests={filteredSentRequests}
                userCache={userCache}
                searchTerm={searchTerm}
                selectedUserId={selectedUser?.id}
                onSelectUser={setSelectedUser}
                onCancel={handleCancelRequest}
              />
            )}

            {activeTab === 'suggestions' && (
              <SuggestionsListSection
                isLoading={isSuggestionsLoading}
                suggestions={filteredSuggestions}
                searchTerm={searchTerm}
                selectedUserId={selectedUser?.id}
                onSelectUser={setSelectedUser}
                onAddFriend={handleAddFriend}
                onDismiss={handleDismissSuggestion}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Right Detail Panel (Desktop xl) ── */}
      <ContactsDetailPanel
        selectedUser={selectedUser}
        onClose={() => setSelectedUser(null)}
        onMessage={onMessageClick}
        onUnfriend={setUnfriendId}
        onBlock={setBlockTarget}
        isFriend={isSelectedUserFriend}
      />

      {/* ── Modals ── */}
      <AddFriendModal open={showAddModal} onOpenChange={() => setShowAddModal(false)} />

      <AlertDialog
        open={!!unfriendId}
        onOpenChange={() => setUnfriendId(null)}
        onConfirm={onUnfriendConfirm}
        title={CONFIRM_MESSAGES.FRIEND.UNFRIEND.TITLE}
        message={CONFIRM_MESSAGES.FRIEND.UNFRIEND.MESSAGE(
          userCache[unfriendId || '']?.fullName || 'người này',
        )}
        confirmLabel={CONFIRM_MESSAGES.FRIEND.UNFRIEND.CONFIRM}
        variant="danger"
      />

      {blockTarget && (
        <BlockOptionsModal
          open
          targetId={blockTarget.id}
          targetName={blockTarget.fullName}
          initialOptions={currentBlockOptions}
          onApply={onApplyBlock}
          onUnblock={onUnblock}
          onOpenChange={() => setBlockTarget(null)}
        />
      )}
    </div>
  );
};

export default ContactsPage;
