import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowUpDown, RefreshCw, UserPlus, UserCheck } from 'lucide-react';
import { useContacts } from '../hooks/useContacts';
import { AlertDialog, BlockOptionsModal, Input, Button } from '@/components/ui';
import { CONFIRM_MESSAGES, TOAST_MESSAGES } from '@/constants';
import { AddFriendModal } from './AddFriendModal';
import { useAuthStore } from '@/features/auth';
import { toast } from '@/store/toastStore';
import { BlockOptions, User } from '@shared/types';
import {
  ContactsTab,
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

  const isSelectedUserFriend = useMemo(
    () => (selectedUser ? friends.some((f) => f.id === selectedUser.id) : false),
    [selectedUser, friends],
  );

  const selectTab = useCallback((tab: ContactsTab) => {
    setActiveTab(tab);
    setSelectedUser(null);
  }, []);

  const segments: { id: ContactsTab; label: string }[] = [
    { id: 'all', label: 'Tất cả' },
    { id: 'suggestions', label: 'Gợi ý' },
    { id: 'sent', label: 'Đã gửi' },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden bg-canvas md:gap-3 md:p-3">
      {/* ── Main card: header gộp + danh sách ── */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-surface md:rounded-card md:border md:border-line md:shadow-card overflow-hidden">
        {/* Header: tiêu đề + lời mời + thêm bạn */}
        <div className="flex-shrink-0 px-4 pt-4 bg-surface">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-extrabold text-ink tracking-tight">Bạn bè</h1>
            <div className="flex items-center gap-2">
              <Button
                variant={activeTab === 'requests' ? 'primary' : 'secondary'}
                size="sm"
                icon={<UserCheck size={15} />}
                onClick={() => selectTab('requests')}
              >
                Lời mời
                {receivedRequests.length > 0 && (
                  <span
                    className={`text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full inline-flex items-center justify-center tnum ${
                      activeTab === 'requests'
                        ? 'bg-surface text-accent-strong'
                        : 'bg-accent text-on-accent'
                    }`}
                  >
                    {receivedRequests.length > 99 ? '99+' : receivedRequests.length}
                  </span>
                )}
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<UserPlus size={15} />}
                onClick={() => setShowAddModal(true)}
              >
                Thêm bạn
              </Button>
            </div>
          </div>

          {/* Segmented */}
          <div className="flex p-[3px] rounded-control bg-surface-2 mb-3">
            {segments.map((seg) => {
              const isActive = activeTab === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => selectTab(seg.id)}
                  className={`flex-1 py-2 rounded-[8px] text-xs font-semibold text-center transition-all duration-200 outline-none ${
                    isActive ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink-2'
                  }`}
                >
                  {seg.label}
                </button>
              );
            })}
          </div>

          {/* Search pill + hành động theo tab */}
          <div className="flex items-center gap-2 pb-3">
            <Input
              placeholder={`Tìm kiếm trong ${
                activeTab === 'all'
                  ? 'bạn bè'
                  : activeTab === 'requests'
                    ? 'lời mời'
                    : activeTab === 'sent'
                      ? 'lời mời đã gửi'
                      : 'gợi ý'
              }...`}
              icon={<Search size={16} />}
              className="h-10 bg-surface-2 border-line-soft rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              containerClassName="flex-1"
            />
            {activeTab === 'all' && (
              <Button
                variant="ghost"
                size="md"
                icon={<ArrowUpDown size={16} />}
                onClick={toggleSortOrder}
                className="flex-shrink-0 text-ink-2 hover:text-accent-strong hover:bg-accent-soft"
                title="Sắp xếp thứ tự"
                aria-label="Sắp xếp thứ tự"
              >
                {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </Button>
            )}
            {activeTab === 'suggestions' && (
              <Button
                variant="ghost"
                size="md"
                icon={
                  <RefreshCw size={16} className={isSuggestionsLoading ? 'animate-spin' : ''} />
                }
                onClick={handleRefreshSuggestions}
                disabled={isSuggestionsLoading}
                className="flex-shrink-0 text-ink-2 hover:text-accent-strong hover:bg-accent-soft"
                title="Làm mới gợi ý"
                aria-label="Làm mới gợi ý"
              />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 md:p-4 scroll-smooth">
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
