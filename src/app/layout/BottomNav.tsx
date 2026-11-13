import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, LayoutGrid, Users, Bell, Menu } from 'lucide-react';

interface BottomNavProps {
  unread: number;
  unreadNotifications: number;
  newRequests: number;
}

const tabs = [
  { to: '/', icon: MessageCircle, label: 'Tin nhắn', end: true, badgeKey: 'unread' as const },
  { to: '/feed', icon: LayoutGrid, label: 'Nhật ký' },
  { to: '/contacts', icon: Users, label: 'Bạn bè', badgeKey: 'requests' as const },
  { to: '/notifications', icon: Bell, label: 'Thông báo', badgeKey: 'notifications' as const },
  { to: '/menu', icon: Menu, label: 'Menu' },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  unread,
  unreadNotifications,
  newRequests,
}) => {
  const badgeValues: Record<string, number> = {
    unread,
    requests: newRequests,
    notifications: unreadNotifications,
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-modal bg-surface border-t border-border flex justify-around items-stretch"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {tabs.map(({ to, icon: Icon, label, end, badgeKey }) => {
        const badge = badgeKey ? badgeValues[badgeKey] : 0;
        return (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full min-h-[56px] py-2 gap-1 transition-colors duration-200
              ${isActive ? 'text-primary-strong' : 'text-muted hover:text-secondary active:text-primary-strong'}`
            }
          >
            <span className="relative">
              <Icon size={22} aria-hidden="true" />
              {badge > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-caption font-bold flex items-center justify-center tabular-nums">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </span>
            <span className="text-xs font-medium leading-none whitespace-nowrap">{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
