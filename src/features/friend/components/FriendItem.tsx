import React, { useCallback } from 'react';
import { MoreVertical, UserMinus, User as UserIcon, Lock, Ban } from 'lucide-react';
import {
  UserAvatar,
  UserStatusText,
  IconButton,
  Dropdown,
  DropdownItem,
  Skeleton,
} from '@/components/ui';
import { User, UserStatus } from '@shared/types';
import { useNavigate } from 'react-router-dom';

interface FriendItemProps {
  friend: User;
  onUnfriend?: (friendId: string) => void;
  onMessage?: (friendId: string) => void;
  onBlock?: (friendId: string) => void;
  isSelected?: boolean;
  onSelect?: (friend: User) => void;
}

const FriendItemInner: React.FC<FriendItemProps> = ({
  friend,
  onUnfriend,
  onMessage,
  onBlock,
  isSelected,
  onSelect,
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (onSelect) {
      onSelect(friend);
    } else if (onMessage) {
      onMessage(friend.id);
    } else {
      navigate('/');
    }
  }, [onSelect, onMessage, friend, navigate]);

  return (
    <div
      className={`relative flex items-center justify-between px-4 py-3 transition-colors duration-200 group
        border-b border-line/60 last:border-0
        hover:bg-surface-2 active:bg-surface-3 cursor-pointer
        ${isSelected ? 'bg-accent-soft' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <UserAvatar userId={friend.id} size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-semibold text-ink truncate">{friend.fullName}</h3>
          </div>
          <UserStatusText userId={friend.id} className="text-xs" initialStatus={friend.status} />
        </div>
      </div>

      {/* Context menu */}
      <div onClick={(e) => e.stopPropagation()} className="flex-shrink-0">
        <Dropdown
          trigger={
            <IconButton
              icon={<MoreVertical size={15} />}
              size="sm"
              className="opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-200"
            />
          }
        >
          <DropdownItem
            icon={<UserIcon size={14} />}
            label="Xem trang cá nhân"
            onClick={() => navigate(`/profile/${friend.id}`)}
          />
          <DropdownItem
            icon={<Ban size={14} />}
            label="Quản lý chặn"
            onClick={() => onBlock?.(friend.id)}
          />
          <DropdownItem
            icon={<UserMinus size={14} />}
            label="Hủy kết bạn"
            variant="danger"
            onClick={() => onUnfriend?.(friend.id)}
          />
        </Dropdown>
      </div>
    </div>
  );
};

const FriendItemSkeleton: React.FC = () => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-line/60 last:border-0">
    <div className="flex items-center gap-3 flex-1">
      <Skeleton variant="circle" width={40} height={40} />
      <div className="space-y-1.5">
        <Skeleton variant="line" width={120} height={13} />
        <Skeleton variant="line" width={75} height={11} className="opacity-60" />
      </div>
    </div>
    <Skeleton variant="rect" width={30} height={30} className="rounded-control opacity-40" />
  </div>
);

export const FriendItem = Object.assign(React.memo(FriendItemInner), {
  Skeleton: FriendItemSkeleton,
}) as React.FC<FriendItemProps> & { Skeleton: React.FC };
