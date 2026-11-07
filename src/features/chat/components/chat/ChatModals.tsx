import React, { useState } from 'react';
import { User } from '@shared/types';
import { useAuthStore } from '@/features/auth';
import { useChat } from '@/hooks';
import {
  AddMemberModal,
  CreateGroupModal,
  EditGroupModal,
  ForwardModal,
  TransferAdminModal,
} from './index';
import { BlockOptionsModal } from '@/components/ui';

type ChatBundle = ReturnType<typeof useChat>;
type SelectedConversation = NonNullable<ChatBundle['selectedConversation']>;

export interface ChatModalState {
  showCreateGroup: boolean;
  setShowCreateGroup: (v: boolean) => void;
  showAddMember: boolean;
  setShowAddMember: (v: boolean) => void;
  showEditGroup: boolean;
  setShowEditGroup: (v: boolean) => void;
  showAssignAdmin: boolean;
  setShowAssignAdmin: (v: boolean) => void;
  showTransferCreator: boolean;
  setShowTransferCreator: (v: boolean) => void;
  isBlockModalOpen: boolean;
  blockTarget: { id: string; name: string } | null;
  openBlockModal: (partnerId?: string, partnerName?: string) => void;
  closeBlockModal: () => void;
}

export const useChatModalState = (): ChatModalState => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [showAssignAdmin, setShowAssignAdmin] = useState(false);
  const [showTransferCreator, setShowTransferCreator] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockTarget, setBlockTarget] = useState<{ id: string; name: string } | null>(null);

  const openBlockModal = (partnerId?: string, partnerName?: string) => {
    if (partnerId && partnerName) {
      setBlockTarget({ id: partnerId, name: partnerName });
    }
    setIsBlockModalOpen(true);
  };

  const closeBlockModal = () => {
    setIsBlockModalOpen(false);
    setBlockTarget(null);
  };

  return {
    showCreateGroup,
    setShowCreateGroup,
    showAddMember,
    setShowAddMember,
    showEditGroup,
    setShowEditGroup,
    showAssignAdmin,
    setShowAssignAdmin,
    showTransferCreator,
    setShowTransferCreator,
    isBlockModalOpen,
    blockTarget,
    openBlockModal,
    closeBlockModal,
  };
};

interface ChatModalsProps {
  modal: ChatModalState;
  chat: ChatBundle;
  selectedConversation: SelectedConversation;
  currentUserId: string;
  partner: User | null;
  myBlockOptions: ChatBundle['myBlockOptions'];
}

export const ChatModals: React.FC<ChatModalsProps> = ({
  modal,
  chat,
  selectedConversation,
  currentUserId,
  partner,
  myBlockOptions,
}) => {
  const confirmUnblock = async () => {
    await chat.handleUnblock(modal.blockTarget?.id);
    modal.closeBlockModal();
  };

  return (
    <>
      <CreateGroupModal
        open={modal.showCreateGroup}
        currentUserId={currentUserId}
        onOpenChange={() => modal.setShowCreateGroup(false)}
        onCreateGroup={chat.handleCreateGroup}
      />

      {selectedConversation && (
        <AddMemberModal
          open={modal.showAddMember}
          conversation={selectedConversation}
          currentUserId={currentUserId}
          onOpenChange={() => modal.setShowAddMember(false)}
          onAddMembers={chat.handleInviteMembers}
        />
      )}

      {selectedConversation?.data.isGroup && (
        <EditGroupModal
          open={modal.showEditGroup}
          conversation={selectedConversation}
          currentUserId={currentUserId}
          onOpenChange={() => modal.setShowEditGroup(false)}
          onSave={chat.handleEditGroup}
        />
      )}

      {selectedConversation?.data.isGroup && (
        <TransferAdminModal
          open={modal.showAssignAdmin}
          mode="transfer_and_leave"
          conversation={selectedConversation}
          currentUserId={currentUserId}
          onOpenChange={() => modal.setShowAssignAdmin(false)}
          onConfirm={chat.handleAssignAdminAndLeave}
        />
      )}

      {selectedConversation?.data.isGroup && (
        <TransferAdminModal
          open={modal.showTransferCreator}
          mode="transfer_only"
          conversation={selectedConversation}
          currentUserId={currentUserId}
          onOpenChange={() => modal.setShowTransferCreator(false)}
          onConfirm={chat.handleTransferCreator}
        />
      )}

      <ForwardModal
        open={!!chat.forwardingMessage}
        onOpenChange={() => chat.setForwardingMessage(null)}
        message={chat.forwardingMessage}
        currentUserId={currentUserId}
      />

      {(partner || modal.blockTarget) && (
        <BlockOptionsModal
          open={modal.isBlockModalOpen}
          targetId={modal.blockTarget?.id ?? partner?.id ?? ''}
          targetName={modal.blockTarget?.name ?? partner?.fullName ?? ''}
          initialOptions={
            modal.blockTarget
              ? useAuthStore.getState().blockedUsers[modal.blockTarget.id]
              : myBlockOptions
          }
          onApply={async (opts) => {
            await chat.handleApplyBlock(opts, modal.blockTarget?.id);
            modal.closeBlockModal();
          }}
          onUnblock={confirmUnblock}
          onOpenChange={modal.closeBlockModal}
        />
      )}
    </>
  );
};
