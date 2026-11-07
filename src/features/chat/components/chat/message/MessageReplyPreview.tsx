import React from 'react';
import { User, RtdbMessage } from '@shared/types';
import { getMessageDisplayContent } from '@/utils/chatUtils';
import { scrollToMessage } from '@/utils';

interface MessageReplyPreviewProps {
  replyToMsg: { id: string; data: RtdbMessage } | undefined;
  replyAuthorName: string;
  isMe: boolean;
  shouldWrapBackground: boolean;
  message: { id: string; data: RtdbMessage };
}

export const MessageReplyPreview: React.FC<MessageReplyPreviewProps> = ({
  replyToMsg,
  replyAuthorName,
  isMe,
  shouldWrapBackground,
  message,
}) => (
  <div
    className={`
      mx-1 mt-1 mb-1 px-2.5 py-1.5 rounded-sm border-l-4 text-caption cursor-pointer
      transition-all duration-200 hover:brightness-95 active:scale-[0.98]
      ${
        isMe
          ? 'bg-on-primary/10 border-on-primary/40 text-on-primary/80'
          : 'bg-black/5 dark:bg-white/5 border-primary/40 text-secondary'
      }
      ${!shouldWrapBackground ? 'bg-black/40 backdrop-blur-md border-primary/60 text-white/90' : ''}
    `}
    onClick={() => replyToMsg && scrollToMessage(message.data.replyToId!)}
  >
    <div
      className={`font-bold mb-0.5 ${!shouldWrapBackground ? 'text-primary-strong' : isMe ? 'text-on-primary' : 'text-primary'}`}
    >
      {replyAuthorName}
    </div>
    <div className="truncate opacity-80 italic">
      {replyToMsg?.data.isRecalled
        ? 'Tin nhắn đã thu hồi'
        : getMessageDisplayContent(replyToMsg!.data)}
    </div>
  </div>
);
