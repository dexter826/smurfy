import React, { useCallback, useState, useMemo } from 'react';
import { Send, X, Edit2, Reply, Ban, Image as ImageIcon } from 'lucide-react';
import { EmojiPicker, Button, IconButton, TextArea, MediaViewer } from '@/components/ui';
import { MentionList } from './MentionList';
import { FilePreview } from './FilePreview';
import { useChatInput } from '@/features/chat';
import { insertTextAtCursor } from '@/utils';
import { VALIDATION } from '@/constants';
import { RtdbMessage, User } from '@shared/types';
import { getMessageDisplayContent } from '@/utils/chatUtils';

interface ChatInputProps {
  onSendText: (text: string, mentions?: string[], replyToId?: string) => void;
  onSendImages: (
    files: File[],
    options?: { content?: string; mentions?: string[]; replyToId?: string },
  ) => Promise<void>;
  onTyping: (isTyping: boolean) => void;
  disabled?: boolean;
  blockedMessage?: string;
  replyingTo?: { id: string; data: RtdbMessage };
  editingMessage: { id: string; data: RtdbMessage } | null;
  onCancelAction: () => void;
  onEditMessage?: (text: string) => Promise<void>;
  currentUserId: string;
  usersMap: Record<string, User>;
  participants?: User[];
  isGroup?: boolean;
  isDisbanded?: boolean;
  onDeleteConversation?: () => void;
  onManageBlock?: () => void;
  isBlockedByMe?: boolean;
  conversationId?: string;
  isLoadingSettings?: boolean;
}

/** Component nhập tin nhắn chat */
export const ChatInput: React.FC<ChatInputProps> = (props) => {
  const {
    disabled = false,
    blockedMessage,
    replyingTo,
    editingMessage,
    onCancelAction,
    currentUserId,
    usersMap,
    isDisbanded = false,
    onDeleteConversation,
    onManageBlock,
    isBlockedByMe = false,
    isLoadingSettings = false,
  } = props;

  const chatInputState = useChatInput(props);
  const {
    inputText,
    setInputText,
    selectedFiles,
    isSending,
    inputRef,
    fileInputRef,
    mentionsProps,
    onSelectMention,
    handleInputChange,
    handleKeyDown,
    handleFileSelect,
    handlePaste,
    handleSubmit,
    removeFile,
  } = chatInputState;

  const { showMentions, filteredParticipants, mentionIndex } = mentionsProps;

  const [previewMediaIndex, setPreviewMediaIndex] = useState<number | null>(null);

  const mediaPreviewItems = useMemo(() => {
    return selectedFiles
      .filter((item) => item.type === 'image' || item.type === 'video')
      .map((item) => ({
        type: item.type as 'image' | 'video',
        url: item.preview || '',
      }));
  }, [selectedFiles]);

  const handlePreviewMedia = useCallback(
    (selectedFileIndex: number) => {
      const selectedFile = selectedFiles[selectedFileIndex];
      if (!selectedFile) return;

      const filteredIndex = mediaPreviewItems.findIndex(
        (item) => item.url === selectedFile.preview,
      );

      if (filteredIndex !== -1) {
        setPreviewMediaIndex(filteredIndex);
      }
    },
    [selectedFiles, mediaPreviewItems],
  );

  const renderMentionOverlay = useCallback(
    (value: string) => (
      <>
        {value.split(/(@[^\n\u200B]+\u200B)/g).map((part, i) => {
          if (part.startsWith('@') && part.endsWith('\u200B')) {
            return (
              <span
                key={i}
                className="text-accent-strong bg-accent/10 rounded font-medium border-b border-accent/30"
              >
                {part.slice(0, -1)}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
        {value.endsWith('\n') && <br />}
      </>
    ),
    [],
  );

  const canSend = (inputText.trim() || selectedFiles.length > 0) && !blockedMessage;

  if (isLoadingSettings) {
    return (
      <div className="flex-shrink-0 border-t border-line bg-surface pb-safe h-[60px] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-accent/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (blockedMessage || isDisbanded) {
    return (
      <div
        className="flex-shrink-0 border-t border-line bg-surface pb-safe"
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
              <Ban size={15} className="text-danger" />
            </div>
            <span className="text-sm text-ink-2 font-medium truncate">
              {isDisbanded ? 'Nhóm này đã giải tán.' : blockedMessage}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isDisbanded && onDeleteConversation && (
              <Button onClick={onDeleteConversation} variant="danger" size="sm">
                Xóa hội thoại
              </Button>
            )}
            {!isDisbanded && onManageBlock && isBlockedByMe && (
              <Button onClick={onManageBlock} size="sm">
                Quản lý chặn
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-shrink-0 border-t border-line-soft bg-surface transition-theme pb-safe relative"
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      {/* File Previews */}
      <FilePreview
        files={selectedFiles}
        onRemove={removeFile}
        isSending={isSending}
        onPreviewMedia={handlePreviewMedia}
      />

      {/* Reply Or Edit Banner */}
      {(replyingTo || editingMessage) && (
        <div className="px-4 py-2 border-b border-line-soft bg-surface-2 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0 border-l-4 border-accent pl-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              {editingMessage ? (
                <Edit2 size={14} className="text-accent" />
              ) : (
                <Reply size={14} className="text-accent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-caption font-bold text-accent-strong leading-none mb-1">
                {editingMessage
                  ? 'Đang chỉnh sửa tin nhắn'
                  : replyingTo?.data.senderId === currentUserId
                    ? 'Trả lời chính bạn'
                    : `Trả lời ${usersMap[replyingTo?.data.senderId || '']?.fullName || ''}`}
              </p>
              <p className="text-[11px] text-ink-2 truncate opacity-80 italic">
                {editingMessage
                  ? editingMessage.data.content
                  : getMessageDisplayContent(replyingTo!.data)}
              </p>
            </div>
          </div>
          <IconButton
            onClick={onCancelAction}
            icon={<X size={14} />}
            size="sm"
            variant="ghost"
            className="flex-shrink-0"
          />
        </div>
      )}

      {/* Input Row */}
      <form onSubmit={handleSubmit} className="relative flex items-end gap-2 px-3 py-2.5">
        {/* Mention Dropdown */}
        {showMentions && filteredParticipants.length > 0 && (
          <MentionList
            users={filteredParticipants}
            selectedIndex={mentionIndex}
            onSelect={onSelectMention}
          />
        )}

        <IconButton
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Đính kèm ảnh"
          icon={<ImageIcon size={18} />}
          size="md"
          variant="ghost"
          disabled={disabled || isSending}
          className="flex-shrink-0"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        <TextArea
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="Nhập tin nhắn..."
          disabled={disabled || isSending}
          autoResize
          maxHeight={120}
          containerClassName="flex-1"
          className="rounded-control bg-surface-2"
          renderOverlay={renderMentionOverlay}
          rightElement={
            <div className="flex items-center">
              {inputText.length >= VALIDATION.MESSAGE_MAX_LENGTH * 0.8 && (
                <span
                  className={`text-[9px] font-bold mr-1 px-1 rounded ${inputText.length >= VALIDATION.MESSAGE_MAX_LENGTH ? 'text-danger bg-danger/10' : 'text-ink-3'}`}
                >
                  {inputText.length}/{VALIDATION.MESSAGE_MAX_LENGTH}
                </span>
              )}
              <EmojiPicker
                onEmojiSelect={(emoji) =>
                  insertTextAtCursor(inputRef, inputText, emoji, setInputText)
                }
                disabled={disabled || isSending}
                buttonClassName="p-1.5 text-ink-3 hover:text-accent transition-colors"
              />
            </div>
          }
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={
            disabled ||
            !!blockedMessage ||
            (!inputText.trim() && selectedFiles.length === 0) ||
            isSending
          }
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 active:brightness-95 ${canSend ? 'bg-accent text-on-accent shadow-xs hover:brightness-110' : 'bg-surface-2 text-ink-3 cursor-not-allowed'}`}
        >
          {isSending ? (
            <span className="w-4 h-4 border-2 border-on-accent/40 border-t-on-accent rounded-full animate-spin" />
          ) : (
            <Send size={16} className={canSend ? 'fill-current' : ''} />
          )}
        </button>
      </form>

      <MediaViewer
        media={mediaPreviewItems}
        initialIndex={previewMediaIndex ?? 0}
        open={previewMediaIndex !== null}
        onOpenChange={() => setPreviewMediaIndex(null)}
      />
    </div>
  );
};
