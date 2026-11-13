import React from 'react';
import { Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/ui';
import { User } from '@shared/types';
import { SuggestionItem } from '../SuggestionItem';

interface SuggestionsListSectionProps {
  isLoading: boolean;
  suggestions: User[];
  searchTerm: string;
  selectedUserId?: string | null;
  onSelectUser?: (user: User) => void;
  onAddFriend: (userId: string) => void;
  onDismiss: (userId: string) => void;
}

export const SuggestionsListSection: React.FC<SuggestionsListSectionProps> = ({
  isLoading,
  suggestions,
  searchTerm,
  selectedUserId,
  onSelectUser,
  onAddFriend,
  onDismiss,
}) => {
  if (isLoading) {
    return (
      <div className="bg-surface rounded-card border border-line overflow-hidden shadow-card divide-y divide-line/60">
        {[...Array(5)].map((_, i) => (
          <SuggestionItem.Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title={searchTerm ? 'Không tìm thấy gợi ý phù hợp' : 'Chưa có gợi ý mới'}
        description={
          searchTerm
            ? 'Thử tìm kiếm với tên khác hoặc từ khóa khác.'
            : 'Những người bạn có thể quen biết sẽ hiển thị tại đây.'
        }
        className="py-20"
      />
    );
  }

  return (
    <div className="bg-surface rounded-card border border-line overflow-hidden shadow-card divide-y divide-line/60">
      {suggestions.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser?.(user)}
          className={`transition-colors ${selectedUserId === user.id ? 'bg-accent-soft ring-1 ring-inset ring-accent/20' : ''}`}
        >
          <SuggestionItem user={user} onAddFriend={onAddFriend} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};
