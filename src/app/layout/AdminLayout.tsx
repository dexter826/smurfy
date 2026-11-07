import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Moon, Sun, ChevronLeft, Shield } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useThemeStore, useResolvedTheme } from '../../store/themeStore';
import { AlertDialog } from '@/components/ui';
import { useLogout } from '../../hooks/utils/useLogout';
import { adminNavItems, AppSidebar } from './AppSidebar';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const mode = useResolvedTheme();
  const handleConfirmLogout = useLogout();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden transition-theme">
      <AppSidebar
        variant="admin"
        items={adminNavItems}
        onLogout={() => setShowLogoutConfirm(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden h-14 flex-shrink-0 bg-surface border-b border-default flex items-center justify-between px-4">
          <button
            onClick={() => navigate('/')}
            aria-label="Quay lại App"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 rounded-sm hover:bg-hover"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-primary-soft flex items-center justify-center">
              <Shield size={14} className="text-primary-strong" />
            </div>
            <span className="font-display font-extrabold text-sm text-foreground">Admin Panel</span>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={mode === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 rounded-sm hover:bg-hover"
          >
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        <nav className="lg:hidden flex overflow-x-auto border-b border-default bg-surface px-3 py-2 gap-1.5 scroll-hide flex-shrink-0">
          {adminNavItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex-shrink-0 flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-sm text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary-soft text-primary-strong'
                    : 'text-secondary hover:bg-hover hover:text-foreground active:bg-active'
                }`
              }
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 overflow-hidden relative">
          <Outlet />
        </main>
      </div>

      <AlertDialog
        open={showLogoutConfirm}
        onOpenChange={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
        title="Đăng xuất Admin"
        message="Bạn có chắc chắn muốn thoát khỏi phiên làm việc quản trị?"
        confirmLabel="Đăng xuất"
      />
    </div>
  );
};
