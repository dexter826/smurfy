import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  Shield,
  MessageCircle,
  LayoutGrid,
  LayoutDashboard,
  Users,
  Bell,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useThemeStore, useResolvedTheme } from '../../store/themeStore';
import { UserAvatar } from '@/components/ui';
import { useUserCache } from '../../store/userCacheStore';

export interface SidebarNavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
  badge?: number;
}

interface AppSidebarProps {
  variant: 'app' | 'admin';
  items: SidebarNavItem[];
  onLogout: () => void;
  className?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  variant,
  items,
  onLogout,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const mode = useResolvedTheme();
  const cachedUser = useUserCache((s) => (user ? s.users[user.id] : undefined));
  const displayName = user?.fullName || cachedUser?.fullName || '';

  const brandIcon =
    variant === 'admin' ? (
      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
        <Shield size={18} className="text-primary" />
      </div>
    ) : (
      <img src="/logo.svg" alt="" className="h-9 w-9 object-contain flex-shrink-0" />
    );

  return (
    <aside
      className={`hidden lg:flex flex-col w-[264px] bg-surface border-r border-default flex-shrink-0 ${className}`}
    >
      <div className="px-5 py-4 flex items-center gap-3 border-b border-default flex-shrink-0">
        {brandIcon}
        <span className="font-display font-extrabold text-lg text-foreground tracking-tight">
          {variant === 'admin' ? 'Admin Panel' : 'Smurfy'}
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {variant === 'admin' && (
          <button
            onClick={() => navigate('/')}
            className="w-full min-h-[44px] flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-secondary hover:bg-hover hover:text-foreground active:bg-active rounded-sm transition-all duration-200 mb-2"
          >
            <ChevronLeft size={18} />
            Quay lại App
          </button>
        )}
        {items.map(({ to, icon: Icon, label, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-sm transition-all duration-200 text-sm font-medium
              ${
                isActive
                  ? 'bg-primary-soft text-primary-strong font-semibold'
                  : 'text-secondary hover:bg-hover hover:text-foreground active:bg-active'
              }`
            }
          >
            <span className="relative flex-shrink-0">
              <Icon size={20} aria-hidden="true" />
              {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-caption font-bold flex items-center justify-center tabular-nums">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </span>
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-default space-y-1 flex-shrink-0">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] text-sm font-medium text-secondary hover:bg-hover hover:text-foreground active:bg-active rounded-sm transition-all duration-200"
        >
          {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {mode === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] text-sm font-medium text-danger hover:bg-danger-soft rounded-sm transition-all duration-200"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>

        {user && (
          <NavLink
            to={variant === 'admin' ? `/profile/${user.id}` : `/profile/${user.id}`}
            className="flex items-center gap-3 px-3 py-3 mt-1 rounded-md bg-surface-sunken hover:bg-hover transition-colors duration-200"
          >
            <UserAvatar
              userId={user.id}
              src={user.avatar?.url}
              name={user.fullName}
              size="sm"
              initialStatus={user.status}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">{displayName}</span>
              <span className="text-caption text-muted truncate">
                {variant === 'admin' ? 'Administrator' : 'Xem trang cá nhân'}
              </span>
            </div>
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export const appNavItems = (
  isAdmin: boolean,
  badges: { unread: number; requests: number; notifications: number },
): SidebarNavItem[] => [
  { to: '/', icon: MessageCircle, label: 'Tin nhắn', end: true, badge: badges.unread },
  { to: '/feed', icon: LayoutGrid, label: 'Nhật ký' },
  { to: '/contacts', icon: Users, label: 'Bạn bè', badge: badges.requests },
  { to: '/notifications', icon: Bell, label: 'Thông báo', badge: badges.notifications },
  { to: '/settings', icon: Settings, label: 'Cài đặt' },
  ...(isAdmin ? [{ to: '/admin', icon: Shield, label: 'Quản trị' }] : []),
];

export const adminNavItems: SidebarNavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tổng quan', end: true },
  { to: '/admin/reports', icon: Shield, label: 'Quản lý báo cáo' },
  { to: '/admin/users', icon: Users, label: 'Quản lý người dùng' },
  { to: '/admin/moderation', icon: Shield, label: 'Quản lý vi phạm' },
];
