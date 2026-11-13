import React, { useState } from 'react';
import { X, Info, Users, Image, Search } from 'lucide-react';
import { RtdbConversation, RtdbMessage, RtdbUserChat, User } from '@shared/types';
import { IconButton, SlideUpSheet } from '@/components/ui';
import { ChatDetailsHeader } from './ChatDetailsHeader';
import { ChatDetailsMemberList } from './ChatDetailsMemberList';
import { ChatDetailsMedia } from './ChatDetailsMedia';
import { ChatDetailsSearch } from './ChatDetailsSearch';
import { ChatDetailsActions } from './ChatDetailsActions';
import { useConversationParticipants } from '@/features/chat';
import { useMediaQuery } from '@/hooks/utils/useMediaQuery';

interface ChatDetailsPanelProps {
  conversation: { id: string; data: RtdbConversation; userChat: RtdbUserChat };
  messages: Array<{ id: string; data: RtdbMessage }>;
  currentUserId: string;
  usersMap: Record<string, User>;
  open: boolean;
  isBlocked?: boolean;
  onOpenChange: () => void;
  onToggleMute?: () => void;
  onTogglePin?: () => void;
  onToggleBlock?: () => void;
  onToggleArchive?: () => void;
  onToggleMarkUnread?: () => void;
  onDelete?: () => void;
  onMemberClick?: (userId: string) => void;
  onMessageClick?: (messageId: string) => void;
  onLeaveGroup?: () => void;
  onSetTab?: (tabId: TabId) => void;
  onEditGroup?: () => void;
  onAddMember?: () => void;
  onRemoveMember?: (userId: string) => void;
  onPromoteToAdmin?: (userId: string) => void;
  onDemoteFromAdmin?: (userId: string) => void;
  onApproveMembers?: (uids: string[]) => Promise<void>;
  onRejectMembers?: (uids: string[]) => Promise<void>;
  onToggleApprovalMode?: (enabled: boolean) => Promise<void>;
  onTransferCreator?: () => void;
  onCopyInviteLink?: () => Promise<void>;
  onResetInviteLink?: () => Promise<void>;
}

type TabId = 'info' | 'members' | 'media' | 'search';

/** Bảng thông tin chi tiết hội thoại. */
export const ChatDetailsPanel: React.FC<ChatDetailsPanelProps> = ({
  conversation,
  messages,
  currentUserId,
  usersMap,
  open,
  isBlocked,
  onOpenChange,
  onToggleMute,
  onTogglePin,
  onToggleBlock,
  onToggleArchive,
  onToggleMarkUnread,
  onDelete,
  onMemberClick,
  onMessageClick,
  onLeaveGroup,
  onEditGroup,
  onAddMember,
  onRemoveMember,
  onPromoteToAdmin,
  onDemoteFromAdmin,
  onApproveMembers,
  onRejectMembers,
  onToggleApprovalMode,
  onTransferCreator,
  onCopyInviteLink,
  onResetInviteLink,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('info');

  const participantIds = Object.keys(conversation.data.members);
  const participants = useConversationParticipants(participantIds);
  const partnerId = conversation.data.isGroup
    ? null
    : participantIds.find((id) => id !== currentUserId);
  const partner = partnerId ? usersMap[partnerId] : null;

  const tabs: { id: TabId; icon: React.ReactNode; label: string; showFor?: 'group' | 'all' }[] = [
    { id: 'info', icon: <Info size={17} />, label: 'Thông tin', showFor: 'all' },
    { id: 'members', icon: <Users size={17} />, label: 'Thành viên', showFor: 'group' },
    { id: 'media', icon: <Image size={17} />, label: 'Media', showFor: 'all' },
    { id: 'search', icon: <Search size={17} />, label: 'Tìm kiếm', showFor: 'all' },
  ];

  const visibleTabs = tabs.filter(
    (t) => t.showFor === 'all' || (t.showFor === 'group' && conversation.data.isGroup),
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <>
            <ChatDetailsHeader
              conversation={conversation}
              currentUserId={currentUserId}
              participants={participants}
              partner={partner || undefined}
            />
            <ChatDetailsActions
              conversation={conversation}
              currentUserId={currentUserId}
              partner={partner || undefined}
              isBlocked={isBlocked}
              onToggleMute={onToggleMute}
              onTogglePin={onTogglePin}
              onToggleBlock={onToggleBlock}
              onToggleArchive={onToggleArchive}
              onDelete={onDelete}
              onLeaveGroup={onLeaveGroup}
              onEditGroup={onEditGroup}
              onViewProfile={() => partner && onMemberClick?.(partner.id)}
              onToggleApprovalMode={onToggleApprovalMode}
              onTransferCreator={onTransferCreator}
              onCopyInviteLink={onCopyInviteLink}
              onResetInviteLink={onResetInviteLink}
              onSetTab={setActiveTab}
            />
          </>
        );
      case 'members':
        return (
          <ChatDetailsMemberList
            conversation={conversation}
            currentUserId={currentUserId}
            participants={participants}
            usersMap={usersMap}
            onMemberClick={onMemberClick}
            onAddMember={onAddMember}
            onRemoveMember={onRemoveMember}
            onPromoteToAdmin={onPromoteToAdmin}
            onDemoteFromAdmin={onDemoteFromAdmin}
            onApproveMembers={onApproveMembers}
            onRejectMembers={onRejectMembers}
          />
        );
      case 'media':
        return <ChatDetailsMedia messages={messages} onMessageClick={onMessageClick} />;
      case 'search':
        return (
          <ChatDetailsSearch
            messages={messages}
            usersMap={usersMap}
            onMessageClick={onMessageClick}
          />
        );
      default:
        return null;
    }
  };

  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isLarge = useMediaQuery('(min-width: 1024px)');

  if (!open) return null;

  const panelHeader = (
    <div className="flex items-center justify-between px-4 h-14 border-b border-line-soft flex-shrink-0">
      <h2 className="text-sm font-semibold text-ink">Chi tiết</h2>
      <IconButton
        onClick={onOpenChange}
        icon={<X size={18} />}
        size="md"
        aria-label="Đóng chi tiết"
      />
    </div>
  );

  const tabHeader = (
    <div className="flex border-b border-line-soft flex-shrink-0">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200 relative outline-none
            ${activeTab === tab.id ? 'text-accent-strong' : 'text-ink-3 hover:text-ink-2'}`}
        >
          {tab.icon}
          <span className="text-[10px] font-medium">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
          )}
        </button>
      ))}
    </div>
  );

  const tabContent = (
    <div
      className={`flex-1 min-h-0 flex flex-col ${activeTab === 'media' ? 'overflow-hidden' : 'overflow-y-auto scroll-hide pb-safe'}`}
    >
      {renderTabContent()}
    </div>
  );

  // ≥1280: panel inline 360 — flex child thứ ba của ChatPage
  if (isDesktop) {
    return (
      <aside className="hidden xl:flex w-[360px] flex-shrink-0 flex-col bg-surface rounded-card border border-line shadow-card overflow-hidden">
        {panelHeader}
        {tabHeader}
        {tabContent}
      </aside>
    );
  }

  // 1024–1279: drawer trượt phải
  if (isLarge) {
    return (
      <>
        <div
          onClick={onOpenChange}
          className="fixed inset-0 bg-overlay backdrop-blur-sm animate-fade-in"
          style={{ zIndex: 'var(--z-overlay)' }}
        />
        <aside
          className="fixed right-0 top-0 h-full w-[360px] bg-surface border-l border-line shadow-float flex flex-col animate-slide-in-right"
          style={{ zIndex: 'var(--z-modal)' }}
        >
          {panelHeader}
          {tabHeader}
          {tabContent}
        </aside>
      </>
    );
  }

  // Mobile: sheet trượt từ dưới (SlideUpSheet, ticket 02)
  return (
    <SlideUpSheet
      open={open}
      onOpenChange={() => onOpenChange()}
      title="Chi tiết"
      size="lg"
      showHandle
      bodyClassName="!p-0"
    >
      {tabHeader}
      {tabContent}
    </SlideUpSheet>
  );
};
