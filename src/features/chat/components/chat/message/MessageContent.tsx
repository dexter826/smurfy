import React from 'react';
import { RtdbMessage, MessageType } from '@shared/types';
import { parseSharedPostMessage } from '@/features/feed';
import { TextMessage, ImageMessage, RecalledMessage, SharedPostMessage } from './content';

interface MessageContentProps {
  message: { id: string; data: RtdbMessage };
  isMe: boolean;
  isGroup?: boolean;
  uploadProgress: Record<string, { progress: number; error?: boolean; localUrls?: string[] }>;
  onOpenImage: (index: number) => void;
  onLoad?: () => void;
}

/** Phân loại hiển thị nội dung theo MessageType */
const MessageContentInner: React.FC<MessageContentProps> = ({
  message,
  isMe,
  uploadProgress,
  onOpenImage,
  onLoad,
}) => {
  if (message.data.isRecalled) return <RecalledMessage isMe={isMe} />;

  const { type, content, isEdited, reactions } = message.data;
  const up = uploadProgress[message.id];

  switch (type) {
    case MessageType.TEXT:
      return <TextMessage message={message} isMe={isMe} />;

    case MessageType.SHARE_POST: {
      const payload = parseSharedPostMessage(content);
      if (!payload)
        return (
          <div className="text-xs italic opacity-50">Nội dung chia sẻ bài viết không hợp lệ</div>
        );

      const hasReactions = !!(reactions && Object.keys(reactions).length > 0);
      return (
        <SharedPostMessage
          payload={payload}
          isMe={isMe}
          isEdited={!!isEdited}
          hasReactions={hasReactions}
        />
      );
    }

    case MessageType.IMAGE:
      return (
        <ImageMessage
          message={message}
          isMe={isMe}
          uploadProgress={up}
          onOpenImage={onOpenImage}
          onLoad={onLoad}
        />
      );

    case MessageType.SYSTEM:
      return null;

    default:
      return (
        <div className="text-xs italic opacity-50">Loại tin nhắn chưa được hỗ trợ: {type}</div>
      );
  }
};

export const MessageContent = React.memo(MessageContentInner);
