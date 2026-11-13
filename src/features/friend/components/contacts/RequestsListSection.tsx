import React from 'react';
import { Bell, UserPlus } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { FriendRequest, User } from '@shared/types';
import { FriendRequestItem } from '../FriendRequestItem';

interface RequestsListSectionProps {
  type: 'received' | 'sent';
  isLoading: boolean;
  requests: FriendRequest[];
  userCache: Record<string, User>;
  searchTerm: string;
  selectedUserId?: string | null;
  onSelectUser?: (user: User) => void;
  onAccept?: (requestId: string, friendId: string) => void;
  onReject?: (requestId: string) => void;
  onCancel?: (requestId: string) => void;
}

export const RequestsListSection: React.FC<RequestsListSectionProps> = ({
  type,
  isLoading,
  requests,
  userCache,
  searchTerm,
  selectedUserId,
  onSelectUser,
  onAccept,
  onReject,
  onCancel,
}) => {
  const isReceived = type === 'received';

  if (isLoading) {
    return (
      <div className="bg-surface rounded-card border border-line overflow-hidden shadow-card divide-y divide-line/60">
        {[...Array(3)].map((_, i) => (
          <FriendRequestItem.Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={isReceived ? Bell : UserPlus}
        title={isReceived ? 'Không có lời mời nào' : 'Danh sách lời mời đã gửi trống'}
        description={
          searchTerm
            ? 'Không tìm thấy lời mời nào khớp với từ khóa tìm kiếm.'
            : isReceived
              ? 'Hiện tại bạn không có lời mời kết bạn mới nào.'
              : 'Bạn chưa gửi lời mời kết bạn nào.'
        }
        className="py-20"
      />
    );
  }

  return (
    <div className="bg-surface rounded-card border border-line overflow-hidden shadow-card divide-y divide-line/60">
      {requests.map((request) => {
        const userId = isReceived ? request.senderId : request.receiverId;
        const targetUser = userCache[userId];
        if (!targetUser) return null;

        return (
          <div
            key={request.id}
            onClick={() => onSelectUser?.(targetUser)}
            className={`transition-colors ${selectedUserId === targetUser.id ? 'bg-accent/5 ring-1 ring-inset ring-primary/20' : ''}`}
          >
            <FriendRequestItem
              request={request}
              user={targetUser}
              type={type}
              onAccept={onAccept}
              onReject={onReject}
              onCancel={onCancel}
            />
          </div>
        );
      })}
    </div>
  );
};
