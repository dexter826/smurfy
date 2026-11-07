import React from 'react';
import { UserPlus, Ban, MessageCircle, UserCheck, UserX, X } from 'lucide-react';
import { Button } from '@/components/ui';

type FriendRequestStatus = 'none' | 'sent' | 'received';

interface MessageRequestBannerProps {
  partnerName: string;
  friendRequestStatus?: FriendRequestStatus;
  onAddFriend: () => void;
  onAcceptFriend?: () => void;
  onDeclineFriend?: () => void;
  onCancelFriend?: () => void;
  onBlock: () => void;
}

/** Banner thông báo tin nhắn từ người lạ */
export const MessageRequestBanner: React.FC<MessageRequestBannerProps> = ({
  partnerName,
  friendRequestStatus = 'none',
  onAddFriend,
  onAcceptFriend,
  onDeclineFriend,
  onCancelFriend,
  onBlock,
}) => {
  const getMessage = () => {
    switch (friendRequestStatus) {
      case 'sent':
        return `Đang chờ ${partnerName} chấp nhận kết bạn`;
      case 'received':
        return `${partnerName} đã gửi lời mời kết bạn`;
      default:
        return `${partnerName} chưa có trong danh sách bạn bè`;
    }
  };

  const renderActions = () => {
    switch (friendRequestStatus) {
      case 'sent':
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={onCancelFriend}
              variant="ghost"
              size="sm"
              icon={<X size={15} />}
              className="text-secondary hover:text-foreground hover:bg-background"
            >
              Hủy lời mời
            </Button>
            <Button
              onClick={onBlock}
              variant="ghost"
              size="sm"
              icon={<Ban size={15} />}
              className="text-secondary hover:text-danger hover:bg-danger/10"
            >
              Chặn
            </Button>
          </div>
        );
      case 'received':
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={onAcceptFriend} size="sm" icon={<UserCheck size={15} />}>
              Chấp nhận
            </Button>
            <Button
              onClick={onDeclineFriend}
              variant="ghost"
              size="sm"
              icon={<UserX size={15} />}
              className="text-secondary hover:text-foreground hover:bg-background"
            >
              Từ chối
            </Button>
            <Button
              onClick={onBlock}
              variant="ghost"
              size="sm"
              icon={<Ban size={15} />}
              className="text-secondary hover:text-danger hover:bg-danger/10"
            >
              Chặn
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button onClick={onAddFriend} size="sm" icon={<UserPlus size={15} />}>
              Kết bạn
            </Button>
            <Button
              onClick={onBlock}
              variant="ghost"
              size="sm"
              icon={<Ban size={15} />}
              className="text-secondary hover:text-danger hover:bg-danger/10"
            >
              Chặn
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex-shrink-0 bg-surface border-b border-border/50 px-4 py-2.5 transition-theme animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">Tin nhắn từ người lạ</p>
          <p className="text-xs text-secondary truncate">{getMessage()}</p>
        </div>
        {renderActions()}
      </div>
    </div>
  );
};
