import React from 'react';
import { User } from '@shared/types';
import { UserAvatar } from '@/components/ui';

interface MentionListProps {
  users: User[];
  selectedIndex: number;
  onSelect: (user: User) => void;
}

/** Danh sách gợi ý nhắc tên (mentions) */
export const MentionList: React.FC<MentionListProps> = ({ users, selectedIndex, onSelect }) => {
  if (users.length === 0) return null;

  return (
    <div
      className="absolute bottom-full left-4 mb-2 w-60 bg-surface border border-line rounded-card shadow-float overflow-hidden animate-fade-in"
      style={{ zIndex: 'var(--z-dropdown)' }}
    >
      <div className="max-h-48 overflow-y-auto scroll-hide py-1">
        {users.map((user, index) => (
          <button
            key={user.id}
            type="button"
            onClick={() => onSelect(user)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-200
              hover:bg-surface-2 active:bg-surface-3
              ${index === selectedIndex ? 'bg-accent-soft' : ''}`}
          >
            <UserAvatar
              userId={user.id}
              src={user.avatar?.url}
              initialStatus={user.status}
              size="xs"
            />
            <span
              className={`text-sm font-medium truncate ${index === selectedIndex ? 'text-accent-strong' : 'text-ink'}`}
            >
              {user.fullName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
