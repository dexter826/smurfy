import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogOut, AlertCircle, ShieldOff } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { Button } from '@/components/ui';
import { notificationService } from '@/features/notification';

const BannedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [banReason, setBanReason] = useState<string>('');

  useEffect(() => {
    const fetchBanReason = async () => {
      const userId = user?.id;
      if (!userId) return;
      try {
        const notifications = await notificationService.getLatestSystemNotifications(userId);
        const banNotification = notifications.find((n) =>
          (n.data?.contentSnippet ?? '').includes('bị khóa'),
        );
        setBanReason(
          banNotification?.data?.contentSnippet ??
            'Tài khoản của bạn đã bị khóa do vi phạm quy định cộng đồng.',
        );
      } catch {
        setBanReason('Tài khoản của bạn đã bị khóa do vi phạm quy định cộng đồng.');
      }
    };
    fetchBanReason();
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-[100dvh] bg-background bg-app-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="bg-surface rounded-md border border-border shadow-lg overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-danger" />

          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="relative w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center border border-danger/20">
                  <ShieldOff size={36} className="text-danger" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-foreground mb-1.5">Tài khoản đã bị khóa</h1>
              <p className="text-sm text-secondary">
                Ban quản trị đã tạm ngưng tài khoản của bạn.
              </p>
            </div>

            {/* Ban reason */}
            {banReason && (
              <div className="bg-danger-soft border border-danger/15 rounded-md p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-danger mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-danger uppercase tracking-wide mb-1">
                      Lý do vi phạm
                    </p>
                    <p className="text-sm text-secondary leading-relaxed">{banReason}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-border my-5" />

            {/* Appeal section */}
            <div className="bg-background rounded-md p-4 mb-6 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-sm bg-primary-soft flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">Khiếu nại quyết định</h3>
              </div>
              <p className="text-xs text-muted mb-3 leading-relaxed">
                Nếu bạn cho rằng đây là một sự nhầm lẫn, hãy liên hệ ban quản trị để được xem xét
                lại.
              </p>
              <a
                href="mailto:support@smurfy.com"
                className="group inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <Lock size={13} className="text-muted group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  support@smurfy.com
                </span>
              </a>
            </div>

            {/* Logout */}
            <Button
              variant="danger"
              fullWidth
              size="lg"
              icon={<LogOut size={17} />}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted mt-4">© {new Date().getFullYear()} Smurfy</p>
      </div>
    </div>
  );
};

export default BannedPage;
