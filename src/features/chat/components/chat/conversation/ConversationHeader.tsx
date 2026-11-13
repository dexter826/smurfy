import React from 'react';
import { Search, X, Users, MoreVertical, Archive, CheckCircle2 } from 'lucide-react';
import { Input, IconButton, Dropdown, Button } from '@/components/ui';

interface ConversationHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  isSearchFocused: boolean;
  onSearchFocus: (focused: boolean) => void;
  onCancelSearch: () => void;
  onNewGroup?: () => void;
  onNewChat?: () => void;
  viewMode: 'normal' | 'archived';
  onViewModeChange?: (mode: 'normal' | 'archived') => void;
  archivedCount: number;
  onMarkAllRead?: () => void;
}

/** Header danh sách hội thoại */
export const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  isSearchFocused,
  onSearchFocus,
  onCancelSearch,
  onNewGroup,
  onNewChat,
  viewMode,
  onViewModeChange,
  archivedCount,
  onMarkAllRead,
}) => (
  <div className="flex-shrink-0 px-3 pt-3 pb-2 border-b border-line-soft bg-surface">
    {!isSearchFocused && !searchTerm && (
      /* Title Row */
      <div className="flex items-center justify-between h-10 mb-2">
        <h2 className="text-xl font-bold text-ink">Tin nhắn</h2>
        <div className="flex items-center gap-0.5">
          {onNewGroup && (
            <IconButton
              onClick={onNewGroup}
              variant="primary"
              size="sm"
              icon={<Users size={18} />}
              title="Tạo nhóm mới"
              aria-label="Tạo nhóm mới"
            />
          )}

          <IconButton
            onClick={() => onViewModeChange?.(viewMode === 'archived' ? 'normal' : 'archived')}
            icon={<Archive size={18} />}
            variant="ghost"
            title={viewMode === 'archived' ? 'Quay lại tin nhắn' : 'Tin nhắn đã lưu trữ'}
            aria-label={viewMode === 'archived' ? 'Quay lại tin nhắn' : 'Tin nhắn đã lưu trữ'}
            className={viewMode === 'archived' ? 'text-accent-strong bg-accent-soft' : 'text-ink-2'}
          />
        </div>
      </div>
    )}

    {/* Search Pill */}
    <div className="flex items-center gap-1.5">
      <div className="relative flex-1 flex items-center">
        <Input
          icon={<Search size={15} />}
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={onSearchChange}
          onFocus={() => onSearchFocus(true)}
          className="h-10 bg-surface-2 border-line-soft rounded-full text-sm"
          containerClassName="flex-1"
        />
        {searchTerm && (
          <IconButton
            onClick={onClearSearch}
            className="absolute right-2"
            icon={<X size={14} />}
            size="sm"
            aria-label="Xoá tìm kiếm"
          />
        )}
      </div>
      {isSearchFocused && (
        <Button
          onClick={onCancelSearch}
          variant="ghost"
          size="sm"
          className="text-accent-strong flex-shrink-0 font-semibold"
        >
          Hủy
        </Button>
      )}
    </div>
  </div>
);
