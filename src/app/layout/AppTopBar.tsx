import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Moon, Sun, Settings } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useThemeStore, useResolvedTheme } from '../../store/themeStore';
import { UserAvatar, IconButton } from '@/components/ui';
import { NotificationDropdown } from '@/features/notification';
import type { TopNavItem } from './navItems';

interface AppTopBarProps {
  items: TopNavItem[];
  onLogout: () => void;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({ items, onLogout }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const mode = useResolvedTheme();

  return (
    <header className="h-16 flex-shrink-0 bg-surface border-b border-border flex items-center px-4 lg:px-6 gap-4">
      <button
        onClick={() => navigate('/feed')}
        className="flex items-center gap-2.5 flex-shrink-0"
        aria-label="Về bảng tin"
      >
        <img src="/logo.svg" alt="" className="h-9 w-9 object-contain" />
        <span className="font-display font-extrabold text-lg text-foreground tracking-tight">
          Smurfy
        </span>
      </button>

      <nav className="hidden lg:flex items-center gap-1 mx-auto" aria-label="Điều hướng chính">
        {items.map(({ to, icon: Icon, label, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex items-center gap-2 px-3.5 min-h-[44px] rounded-sm text-sm font-semibold transition-all duration-200
              ${
                isActive
                  ? 'bg-primary-soft text-primary-strong'
                  : 'text-secondary hover:bg-hover hover:text-foreground active:bg-active'
              }`
            }
          >
            <span className="relative">
              <Icon size={20} aria-hidden="true" />
              {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-caption font-bold flex items-center justify-center tabular-nums">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-1 ml-auto lg:ml-0">
        <NotificationDropdown />

        <IconButton
          onClick={toggleTheme}
          icon={mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          title={mode === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
          variant="ghost"
        />

        {user && (
          <NavLink
            to="/settings"
            title="Cài đặt"
            className={({ isActive }) =>
              `hidden lg:flex w-11 h-11 items-center justify-center rounded-sm transition-all duration-200
              ${isActive ? 'bg-primary-soft text-primary-strong' : 'text-secondary hover:bg-hover hover:text-foreground active:bg-active'}`
            }
          >
            <Settings size={20} aria-hidden="true" />
          </NavLink>
        )}

        {user && (
          <NavLink
            to={`/profile/${user.id}`}
            title="Trang cá nhân"
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 outline-none
              ${
                isActive
                  ? 'ring-2 ring-focus ring-offset-2 ring-offset-background'
                  : 'hover:ring-2 hover:ring-focus/40 hover:ring-offset-2 hover:ring-offset-background'
              }`
            }
          >
            <UserAvatar
              userId={user.id}
              src={user.avatar?.url}
              size="sm"
              showBorder={false}
              initialStatus={user.status}
            />
          </NavLink>
        )}

        <IconButton
          onClick={onLogout}
          icon={<LogOut size={20} />}
          title="Đăng xuất"
          variant="ghost"
          className="hidden lg:inline-flex text-danger hover:bg-danger-soft"
        />
      </div>
    </header>
  );
};
