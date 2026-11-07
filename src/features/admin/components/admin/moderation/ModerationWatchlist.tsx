import React from 'react';
import { ChevronRight } from 'lucide-react';
import { UserAvatar, Skeleton } from '@/components/ui';
import { UserViolationSummary } from './types';

interface ModerationWatchlistProps {
  isLoading: boolean;
  summaries: UserViolationSummary[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export const ModerationWatchlist: React.FC<ModerationWatchlistProps> = ({
  isLoading,
  summaries,
  selectedUserId,
  onSelectUser,
}) => {
  return (
    <div className="w-full md:w-[350px] border-r border-border flex flex-col bg-surface flex-shrink-0">
      <div className="p-3.5 border-b border-border bg-surface-sunken/40 flex-shrink-0">
        <h2 className="text-xs font-bold text-secondary uppercase tracking-wider">
          Tài khoản cần xử lý ({summaries.length})
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto scroll-hide">
        {isLoading ? (
          <div className="p-3 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-surface-sunken/50 rounded-xl">
                <Skeleton variant="circle" width={36} height={36} />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : summaries.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted">Danh sách theo dõi trống</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {summaries.map((summary) => {
              const isSelected = selectedUserId === summary.userId;
              return (
                <button
                  key={summary.userId}
                  onClick={() => onSelectUser(summary.userId)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors duration-150 text-left outline-none
                    ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-semibold ring-1 ring-inset ring-primary/20'
                        : 'hover:bg-hover active:bg-active text-foreground'
                    }`}
                >
                  <UserAvatar
                    userId={summary.userId}
                    src={summary.avatarUrl}
                    name={summary.fullName}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate leading-none mb-1 text-foreground">
                      {summary.fullName}
                    </p>
                    <p className="text-xs text-muted truncate leading-none">
                      {summary.email}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-danger/15 text-danger border border-danger/20 tabular-nums">
                    {summary.strikes} vi phạm
                  </span>
                  <ChevronRight size={14} className="text-muted shrink-0 ml-1" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
