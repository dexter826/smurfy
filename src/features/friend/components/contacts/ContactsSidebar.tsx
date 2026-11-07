import React from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui';
import { ContactsTab, TabConfigItem } from './types';

interface ContactsSidebarProps {
  activeTab: ContactsTab;
  onSelectTab: (tab: ContactsTab) => void;
  tabConfig: TabConfigItem[];
  onOpenAddModal: () => void;
}

export const ContactsSidebar: React.FC<ContactsSidebarProps> = ({
  activeTab,
  onSelectTab,
  tabConfig,
  onOpenAddModal,
}) => {
  return (
    <aside className="hidden md:flex flex-col w-[280px] lg:w-[320px] border-r border-border bg-surface flex-shrink-0">
      <div className="p-4 border-b border-border">
        <Button fullWidth icon={<UserPlus size={17} />} onClick={onOpenAddModal} variant="primary">
          Thêm bạn bè
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="px-3 pt-2 pb-2 text-[10px] font-bold text-muted uppercase tracking-[0.1em] opacity-80">
          Danh mục
        </p>
        {tabConfig.map(({ id, label, icon, count, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onSelectTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl transition-colors duration-200 text-sm font-medium
                ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-secondary hover:bg-hover hover:text-foreground'
                }`}
            >
              <span
                className={`flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-muted'}`}
              >
                {icon}
              </span>
              <span className="flex-1 text-left truncate">{label}</span>
              {badge ? (
                <span className="text-[10px] font-bold bg-danger text-on-danger px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-xs tabular-nums">
                  {count}
                </span>
              ) : count !== undefined && count > 0 ? (
                <span className="text-[10px] font-semibold text-muted bg-background px-1.5 py-0.5 rounded-full border border-border tabular-nums">
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
