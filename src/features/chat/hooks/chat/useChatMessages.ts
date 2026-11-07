import { useCallback } from 'react';
import { useRtdbChatStore } from '@/store';

interface UseChatMessagesProps {
  selectedConversationId: string | null;
  currentUserId: string | null;
}

/** Gửi và quản lý các loại tin nhắn trong hội thoại */
export const useChatMessages = ({
  selectedConversationId,
  currentUserId,
}: UseChatMessagesProps) => {
  const {
    sendTextMessage,
    sendImageMessage,
    recallMessage,
    deleteMessageForMe,
    editMessage,
    forwardMessage: storeForwardMessage,
    pinMessage,
    unpinMessage,
  } = useRtdbChatStore();

  const handleSendText = useCallback(
    async (text: string, mentions?: string[], replyToId?: string) => {
      if (!selectedConversationId || !currentUserId) return;
      await sendTextMessage(selectedConversationId, currentUserId, text, mentions, replyToId);
    },
    [selectedConversationId, currentUserId, sendTextMessage],
  );

  const handleSendImage = useCallback(
    async (
      files: File[],
      options?: { content?: string; mentions?: string[]; replyToId?: string },
    ) => {
      if (!selectedConversationId || !currentUserId) return;
      await sendImageMessage(selectedConversationId, currentUserId, files, options);
    },
    [selectedConversationId, currentUserId, sendImageMessage],
  );

  const handleEditMessage = useCallback(
    async (messageId: string, newContent: string) => {
      if (!selectedConversationId) return;
      await editMessage(selectedConversationId, messageId, newContent);
    },
    [selectedConversationId, editMessage],
  );

  const handleRecallMessage = useCallback(
    async (messageId: string) => {
      if (!selectedConversationId) return;
      await recallMessage(selectedConversationId, messageId);
    },
    [selectedConversationId, recallMessage],
  );

  const handleDeleteForMe = useCallback(
    async (messageId: string) => {
      if (!selectedConversationId || !currentUserId) return;
      await deleteMessageForMe(selectedConversationId, messageId, currentUserId);
    },
    [selectedConversationId, currentUserId, deleteMessageForMe],
  );

  const forwardMessage = useCallback(
    async (conversationId: string, message: any) => {
      if (!currentUserId) return;
      await storeForwardMessage(conversationId, currentUserId, message);
    },
    [currentUserId, storeForwardMessage],
  );

  const replyToMessage = useCallback(
    async (text: string, replyToId: string) => {
      if (!selectedConversationId || !currentUserId) return;
      await sendTextMessage(selectedConversationId, currentUserId, text, undefined, replyToId);
    },
    [selectedConversationId, currentUserId, sendTextMessage],
  );

  const handlePinMessage = useCallback(
    async (messageId: string) => {
      if (!selectedConversationId) return;
      await pinMessage(selectedConversationId, messageId);
    },
    [selectedConversationId, pinMessage],
  );

  const handleUnpinMessage = useCallback(
    async (messageId: string) => {
      if (!selectedConversationId) return;
      await unpinMessage(selectedConversationId, messageId);
    },
    [selectedConversationId, unpinMessage],
  );

  return {
    handleSendText,
    handleSendImage,
    handleEditMessage,
    handleRecallMessage,
    handleDeleteForMe,
    forwardMessage,
    replyToMessage,
    handlePinMessage,
    handleUnpinMessage,
  };
};
