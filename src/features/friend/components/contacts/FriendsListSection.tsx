import React from 'react';
import { Users } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { User } from '@shared/types';
import { FriendItem } from '../FriendItem';

interface FriendsListSectionProps {
  isLoading: boolean;
  groupedFriends: { letter: string; friends: User[] }[];
  searchTerm: string;
  selectedUserId?: string | null;
  onSelectUser: (user: User) => void;
  onMessage: (friendId: string) => void;
  onUnfriend: (friendId: string) => void;
  onBlock: (user: User) => void;
}

export const FriendsListSection: React.FC<FriendsListSectionProps> = ({
  isLoading,
  groupedFriends,
  searchTerm,
  selectedUserId,
  onSelectUser,
  onMessage,
  onUnfriend,
  onBlock,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i}>
            <div className="w-12 h-4 bg-surface-sunken rounded mb-3 mx-1 animate-pulse" />
            <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-xs">
              {[...Array(3)].map((_, j) => (
                <FriendItem.Skeleton key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (groupedFriends.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title={searchTerm ? 'Không tìm thấy kết quả' : 'Danh sách bạn bè trống'}
        description={
          searchTerm
            ? 'Thử tìm kiếm với tên khác hoặc từ khóa khác.'
            : 'Bắt đầu kết nối với mọi người để mở rộng vòng kết nối của bạn.'
        }
        className="py-20"
      />
    );
  }

  return (
    <div className="space-y-6">
      {groupedFriends.map((group) => (
        <div key={group.letter}>
          <p className="text-xs font-bold text-primary mb-2 px-2 uppercase tracking-widest opacity-80">
            {group.letter}
          </p>
          <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-xs divide-y divide-border/60">
            {group.friends.map((friend) => (
              <FriendItem
                key={friend.id}
                friend={friend}
                isSelected={selectedUserId === friend.id}
                onSelect={onSelectUser}
                onUnfriend={onUnfriend}
                onMessage={onMessage}
                onBlock={() => onBlock(friend)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
