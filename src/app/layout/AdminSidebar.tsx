import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Moon, Sun, ChevronLeft, Shield, LayoutDashboard, Users } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useThemeStore, useResolvedTheme } from '../../store/themeStore';
import { UserAvatar } from '@/components/ui';

export interface AdminNavItem {
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  end?: boolean;
}

interface AdminSidebarProps {
  items: AdminNavItem[];
  onLogout: () => void;
  className?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ items, onLogout, className = '' }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const mode = useResolvedTheme();

  return (
    <aside
      className={`hidden lg:flex flex-col w-[264px] bg-surface border-r border-default flex-shrink-0 ${className}`}
    >
      <div className="px-5 py-4 flex items-center gap-3 border-b border-default flex-shrink-0">
        <div className="w-9 h-9 rounded-sm bg-primary-soft flex items-center justify-center flex-shrink-0">
          <Shield size={18} className="text-primary-strong" />
        </div>
        <span className="font-display font-extrabold text-lg text-foreground tracking-tight">
          Admin Panel
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <button
          onClick={() => navigate('/')}
          className="w-full min-h-[44px] flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-secondary hover:bg-hover hover:text-foreground active:bg-active rounded-sm transition-all duration-200 mb-2"
        >
          <ChevronLeft size={18} />
          Quay lại App
        </button>

        {items.map(({ to, icon: Icon, label, end }) => (
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
            <Icon size={20} aria-hidden="true" />
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
            to={`/profile/${user.id}`}
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
              <span className="text-sm font-semibold text-foreground truncate">
                {user.fullName}
              </span>
              <span className="text-caption text-muted truncate">Administrator</span>
            </div>
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export const adminNavItems: AdminNavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tổng quan', end: true },
  { to: '/admin/reports', icon: Shield, label: 'Quản lý báo cáo' },
  { to: '/admin/users', icon: Users, label: 'Quản lý người dùng' },
  { to: '/admin/moderation', icon: Shield, label: 'Quản lý vi phạm' },
];
