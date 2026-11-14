import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Moon, Settings, Sun, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { Dropdown, DropdownItem, DropdownSeparator, UserAvatar } from '@/components/ui';
import { useResolvedTheme, useThemeStore } from '../../store/themeStore';
import { appNavItems, type AppBadgeKey } from './navItems';

interface RailProps {
  badges: Record<AppBadgeKey, number>;
  onLogout: () => void;
}

const railButton =
  'relative flex h-[42px] w-[42px] items-center justify-center rounded-nav border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas';

const railButtonState = (isActive: boolean) =>
  isActive
    ? 'border-accent/40 bg-surface text-accent-strong ring-[3px] ring-accent-soft'
    : 'border-line bg-surface text-ink-2 hover:text-ink';

/** Rail desktop 72px: logo tile + 4 nav + Cài đặt + avatar (spec #8, frame c-chat). */
export const Rail: React.FC<RailProps> = ({ badges, onLogout }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const mode = useResolvedTheme();

  if (!user) return null;

  return (
    <aside
      className="hidden h-full w-[72px] flex-shrink-0 flex-col items-center gap-2 py-3 lg:flex"
      aria-label="Điều hướng chính"
    >
      <button
        onClick={() => navigate('/feed')}
        className="mb-2 rounded-control outline-none focus-visible:ring-2 focus-visible:ring-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        aria-label="Về bảng tin"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-control bg-accent">
          <img src="/smurfy-symbol.svg" alt="" className="h-full w-full p-1" />
        </span>
      </button>

      {appNavItems.map(({ to, icon: Icon, label, end, badgeKey }) => {
        const badge = badgeKey ? badges[badgeKey] : 0;
        return (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            aria-label={label}
            className={({ isActive }) => `${railButton} ${railButtonState(isActive)}`}
          >
            <Icon size={21} aria-hidden="true" />
            {badge > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-canvas bg-accent px-1 text-[10px] font-bold leading-none text-on-accent tabular-nums">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </NavLink>
        );
      })}

      <div className="flex-1" />

      <NavLink
        to="/settings"
        title="Cài đặt"
        aria-label="Cài đặt"
        className={({ isActive }) => `${railButton} ${railButtonState(isActive)}`}
      >
        <Settings size={21} aria-hidden="true" />
      </NavLink>

      <Dropdown
        align="right"
        menuClassName="w-52"
        trigger={
          <button
            className="mt-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            aria-label="Menu tài khoản"
          >
            <UserAvatar
              userId={user.id}
              src={user.avatar?.url}
              size="md"
              showBorder={false}
              initialStatus={user.status}
            />
          </button>
        }
      >
        <DropdownItem
          icon={<UserIcon size={18} />}
          label="Hồ sơ"
          onClick={() => navigate(`/profile/${user.id}`)}
        />
        <DropdownItem
          icon={<Settings size={18} />}
          label="Cài đặt"
          onClick={() => navigate('/settings')}
        />
        <DropdownItem
          icon={mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          label="Giao diện"
          onClick={toggleTheme}
        />
        <DropdownSeparator />
        <DropdownItem
          icon={<LogOut size={18} />}
          label="Đăng xuất"
          variant="danger"
          onClick={onLogout}
        />
      </Dropdown>
    </aside>
  );
};
