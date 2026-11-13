import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export type FilterType = 'all' | 'group' | 'stranger';

interface ConversationFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onMarkAllRead?: () => void;
  badges?: Partial<Record<FilterType, number>>;
}

/** Bộ lọc danh sách hội thoại */
export const ConversationFilters: React.FC<ConversationFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onMarkAllRead,
  badges = {},
}) => {
  const filters: { id: FilterType; label: string; badge?: number }[] = [
    { id: 'all', label: 'Tất cả', badge: badges.all },
    { id: 'group', label: 'Nhóm', badge: badges.group },
    { id: 'stranger', label: 'Người lạ', badge: badges.stranger },
  ];

  return (
    <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 border-b border-line-soft bg-surface">
      <div className="flex items-center flex-1 p-[3px] rounded-control bg-surface-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center justify-center gap-1.5 flex-1 px-2 py-1.5 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all duration-200 outline-none
              ${isActive ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink-2'}`}
            >
              {filter.label}
              {filter.badge != null && filter.badge > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center leading-none tnum
                ${isActive ? 'bg-accent text-on-accent' : 'bg-danger text-on-danger'}`}
                >
                  {filter.badge > 99 ? '99+' : filter.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {onMarkAllRead && (
        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-control text-ink-3 hover:text-accent hover:bg-surface-2 transition-all duration-200 outline-none"
          title="Đánh dấu tất cả đã đọc"
          aria-label="Đánh dấu tất cả đã đọc"
        >
          <CheckCircle2 size={16} />
        </button>
      )}
    </div>
  );
};
