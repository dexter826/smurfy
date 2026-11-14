import React from 'react';
import { formatStatusTime } from '@/utils/dateUtils';
import { usePresence } from '@/features/presence';
import { useUserCache } from '@/store/userCacheStore';
import { useContactStore } from '@/features/friend';

interface UserStatusTextProps {
  userId: string;
  className?: string;
  initialStatus?: 'active';
  onlineText?: string;
  offlineText?: string;
}

export const UserStatusText: React.FC<UserStatusTextProps> = ({
  userId,
  className = '',
  initialStatus,
  onlineText = 'Đang hoạt động',
  offlineText = 'Không hoạt động',
}) => {
  const presence = usePresence(userId, initialStatus);
  const cachedUser = useUserCache((state) => state.users[userId]);
  const isFriend = useContactStore((state) => state.friends.some((f) => f.id === userId));

  if (!isFriend) return null;

  const isOnline = presence && 'isOnline' in presence && presence.isOnline;

  const statusText = isOnline
    ? onlineText
    : presence && 'lastSeen' in presence && presence.lastSeen
      ? formatStatusTime(new Date(presence.lastSeen))
      : offlineText;

  return (
    <span className={`${isOnline ? 'text-success font-medium' : 'text-ink-3'} ${className}`}>
      {statusText}
    </span>
  );
};
