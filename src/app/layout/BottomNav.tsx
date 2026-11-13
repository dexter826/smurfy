import React from 'react';
import { NavLink } from 'react-router-dom';
import { appNavItems, type AppBadgeKey } from './navItems';

interface BottomNavProps {
  badges: Record<AppBadgeKey, number>;
}

/** Tab bar mobile 4 mục, 56px, safe-area đáy (spec #8, frame c-m-list). */
export const BottomNav: React.FC<BottomNavProps> = ({ badges }) => (
  <nav
    className="lg:hidden fixed bottom-0 left-0 right-0 z-modal flex justify-around items-stretch border-t border-line bg-surface"
    style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    aria-label="Điều hướng chính"
  >
    {appNavItems.map(({ to, icon: Icon, label, end, badgeKey }) => {
      const badge = badgeKey ? badges[badgeKey] : 0;
      return (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex min-h-[56px] w-full flex-col items-center justify-center gap-1 py-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-focus/60 ${
              isActive ? 'text-accent-strong' : 'text-ink-3 hover:text-ink-2'
            }`
          }
        >
          <span className="relative">
            <Icon size={21} aria-hidden="true" />
            {badge > 0 && (
              <span className="absolute -right-2 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-on-accent tabular-nums">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </span>
          <span className="text-caption font-medium leading-none whitespace-nowrap">{label}</span>
        </NavLink>
      );
    })}
  </nav>
);
