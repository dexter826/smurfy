import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Settings, Moon, Sun, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useThemeStore, useResolvedTheme } from '@/store/themeStore';
import { UserAvatar, AlertDialog } from '@/components/ui';
import { useLogout } from '@/hooks/utils/useLogout';

export const MobileMenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const mode = useResolvedTheme();
  const handleConfirmLogout = useLogout();
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full bg-background">

      {/* ── Profile Header ── */}
      <div
        className="bg-surface border-b border-border px-4 py-4 flex-shrink-0"
      >
        <div className="flex items-center gap-3.5">
          {user && (
            <UserAvatar
              userId={user.id}
              src={user.avatar?.url}
              size="lg"
              initialStatus={user.status}
            />
          )}
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base text-foreground truncate">{user?.fullName}</h2>
            <p className="text-sm text-muted truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* ── Menu Items ── */}
      <div className="flex-1 p-3 space-y-1.5">

        <MenuItem
          icon={<UserIcon size={20} />}
          iconBg="bg-surface-sunken text-secondary"
          label="Xem hồ sơ"
          description="Trang cá nhân của bạn"
          onClick={() => navigate(`/profile/${user?.id}`)}
        />

        <MenuItem
          icon={<Settings size={20} />}
          iconBg="bg-surface-sunken text-secondary"
          label="Cài đặt"
          description="Bảo mật, quyền riêng tư"
          onClick={() => navigate('/settings')}
        />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3.5 p-3.5 min-h-[64px] rounded-xl bg-surface hover:bg-hover active:bg-active transition-all duration-200 border border-border"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-sunken text-secondary flex-shrink-0">
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="font-semibold text-sm text-foreground">Chế độ tối</p>
            <p className="text-xs text-muted mt-0.5">{mode === 'dark' ? 'Đang bật' : 'Đang tắt'}</p>
          </div>
          <div className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 flex-shrink-0 ${mode === 'dark' ? 'btn-gradient' : 'bg-surface-sunken'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${mode === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
        </button>

        {isAdmin && (
          <MenuItem
            icon={<Shield size={20} />}
            iconBg="bg-warning/10 text-warning"
            label="Quản trị"
            description="Quản lý hệ thống, người dùng..."
            onClick={() => navigate('/admin')}
          />
        )}

        <div className="h-2" />

        {/* Logout */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center gap-3.5 p-3.5 min-h-[64px] rounded-xl bg-surface hover:bg-danger/5 active:bg-danger/10 transition-all duration-200 border border-border group"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-danger/10 text-danger flex-shrink-0 group-hover:bg-danger/20 transition-colors duration-200">
            <LogOut size={20} />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="font-semibold text-sm text-danger">Đăng xuất</p>
            <p className="text-xs text-muted mt-0.5">Rời khỏi phiên làm việc</p>
          </div>
          <ChevronRight size={18} className="text-muted flex-shrink-0" />
        </button>
      </div>

      <AlertDialog
        open={showLogoutConfirm}
        onOpenChange={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn rời khỏi phiên làm việc này?"
        confirmLabel="Đăng xuất"
      />
    </div>
  );
};

/* ── Reusable menu row ── */
interface MenuItemProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, iconBg, label, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3.5 p-3.5 min-h-[64px] rounded-xl bg-surface hover:bg-hover active:bg-active transition-all duration-200 border border-border group"
  >
    <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${iconBg}`}>
      {icon}
    </div>
    <div className="flex-1 text-left min-w-0">
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted mt-0.5">{description}</p>
    </div>
    <ChevronRight size={18} className="text-muted flex-shrink-0" />
  </button>
);

export default MobileMenuPage;
