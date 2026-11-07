import React from 'react';
import { Search, ArrowUpDown, RefreshCw, UserPlus } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { ContactsTab, TabConfigItem } from './types';

interface ContactsActionBarProps {
  activeTab: ContactsTab;
  onSelectTab: (tab: ContactsTab) => void;
  tabConfig: TabConfigItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onToggleSortOrder: () => void;
  isSuggestionsLoading: boolean;
  onRefreshSuggestions: () => void;
  onOpenAddModal: () => void;
  friendsCount: number;
  suggestionsCount: number;
  receivedCount: number;
  sentCount: number;
}

export const ContactsActionBar: React.FC<ContactsActionBarProps> = ({
  activeTab,
  onSelectTab,
  tabConfig,
  searchTerm,
  onSearchChange,
  sortOrder,
  onToggleSortOrder,
  isSuggestionsLoading,
  onRefreshSuggestions,
  onOpenAddModal,
  friendsCount,
  suggestionsCount,
  receivedCount,
  sentCount,
}) => {
  const currentTabItem = tabConfig.find((t) => t.id === activeTab);

  return (
    <div
      className="flex-shrink-0 px-4 md:px-6 pt-4 pb-3 border-b border-border bg-surface/90 backdrop-blur-md sticky top-0"
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      {/* Mobile tab switcher */}
      <div className="flex md:hidden bg-background rounded-xl p-1 mb-4 border border-border">
        {tabConfig.map(({ id, mobileLabel, count, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onSelectTab(id)}
              className={`flex-1 relative py-2 min-h-[40px] text-[11px] font-bold rounded-lg transition-colors flex flex-col items-center justify-center gap-0.5
                ${
                  isActive
                    ? 'bg-surface text-primary shadow-xs ring-1 ring-border-default'
                    : 'text-muted hover:text-secondary'
                }`}
            >
              <span>{mobileLabel}</span>
              {count !== undefined && count > 0 && (
                <span
                  className={`text-[9px] tabular-nums ${badge ? 'text-danger font-bold' : 'text-muted opacity-80'}`}
                >
                  {count}
                </span>
              )}
              {badge && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full ring-2 ring-background" />
              )}
            </button>
          );
        })}
      </div>

      {/* Title row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            {currentTabItem?.label}
          </h2>
          <p className="text-xs text-muted font-medium mt-0.5">
            {activeTab === 'all' && `${friendsCount} người bạn`}
            {activeTab === 'suggestions' && `${suggestionsCount} gợi ý kết bạn`}
            {activeTab === 'requests' && `${receivedCount} lời mời chờ xác nhận`}
            {activeTab === 'sent' && `Đã gửi ${sentCount} lời mời kết bạn`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'suggestions' && (
            <Button
              variant="ghost"
              size="sm"
              icon={<RefreshCw size={14} className={isSuggestionsLoading ? 'animate-spin' : ''} />}
              onClick={onRefreshSuggestions}
              disabled={isSuggestionsLoading}
              className="text-primary hover:bg-primary/10 hidden md:flex"
            >
              Làm mới
            </Button>
          )}
          <Button
            size="sm"
            icon={<UserPlus size={15} />}
            onClick={onOpenAddModal}
            className="md:hidden"
            variant="primary"
          >
            Thêm
          </Button>
        </div>
      </div>

      {/* Action / Search row */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2">
          <Input
            placeholder={`Tìm kiếm trong ${currentTabItem?.mobileLabel.toLowerCase() || 'danh bạ'}...`}
            icon={<Search size={16} />}
            className="bg-background border-border-default"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            containerClassName="flex-1"
          />
          {activeTab === 'all' && (
            <Button
              variant="ghost"
              size="md"
              icon={<ArrowUpDown size={16} />}
              onClick={onToggleSortOrder}
              className="flex-shrink-0 text-secondary hover:text-primary hover:bg-primary/10"
              title="Sắp xếp thứ tự"
            >
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          )}
          {activeTab === 'suggestions' && (
            <Button
              variant="ghost"
              size="md"
              icon={<RefreshCw size={16} className={isSuggestionsLoading ? 'animate-spin' : ''} />}
              onClick={onRefreshSuggestions}
              disabled={isSuggestionsLoading}
              className="flex-shrink-0 text-secondary hover:text-primary hover:bg-primary/10 md:hidden"
              title="Làm mới gợi ý"
            />
          )}
        </div>
      </div>
    </div>
  );
};
