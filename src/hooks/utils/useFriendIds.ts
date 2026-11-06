import { useMemo } from 'react';
import { useContactStore } from '@/features/friend';

/**
 * Lấy danh sách ID bạn bè
 */
export const useFriendIds = () => {
  const friends = useContactStore(state => state.friends);
  return useMemo(() => friends.map(f => f.id), [friends]);
};
