import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/features/auth';
import { useLoadingStore } from '@/store/loadingStore';
import { Button } from '@/components/ui';
import { RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '@/lib/firebase/config';

const EmailVerificationPage: React.FC = () => {
  const { checkVerificationStatus, sendVerificationEmail, logout } = useAuthStore();
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isLoading = useLoadingStore((state) => state.loadingStates['auth.verification']);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) return;
    if (!auth.currentUser) {
      navigate('/login', { replace: true, state: { reason: 'verify_requires_login' } });
    }
  }, [isInitialized, navigate]);

  useEffect(() => {
    const state = location.state as { source?: string } | null;
    if (state?.source === 'register') {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const handleCheckStatus = async () => {
    setIsChecking(true);
    try {
      await checkVerificationStatus();
      if (!useAuthStore.getState().isPendingVerification) {
        const email = auth.currentUser?.email;
        if (email) localStorage.setItem('remembered_email', email);
        toast.success(TOAST_MESSAGES.AUTH.VERIFY_EMAIL_SUCCESS);
        navigate('/onboarding');
      } else {
        toast.info(TOAST_MESSAGES.AUTH.VERIFY_EMAIL_PENDING);
      }
    } catch {
      toast.error(TOAST_MESSAGES.AUTH.CHECK_STATUS_FAILED);
    } finally {
      setIsChecking(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendVerificationEmail();
      toast.success(TOAST_MESSAGES.AUTH.RESEND_VERIFY_SUCCESS);
    } catch {
      toast.error(TOAST_MESSAGES.AUTH.SEND_EMAIL_FAILED);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-[100dvh] bg-background selection:bg-primary/20 flex flex-col">
      <header className="h-14 flex-shrink-0 bg-surface border-b border-border flex items-center px-4 gap-3">
        <img src="/logo.svg" alt="Smurfy" className="h-8 w-8 object-contain" />
        <span className="font-display font-extrabold text-foreground">Smurfy</span>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col animate-fade-in">
        <div className="w-full max-w-[480px] mx-auto flex flex-col flex-1 p-6">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-1">Xác thực email</h1>
            <p className="text-sm text-secondary leading-relaxed">
              Chúng tôi đã gửi link xác thực đến email của bạn. Vui lòng kiểm tra hộp thư để tiếp
              tục.
            </p>
          </div>

          {/* Steps hint */}
          <div className="bg-background rounded-md p-4 mb-6 border border-border space-y-3">
            {[
              { step: '1', text: 'Mở email từ Smurfy trong hộp thư của bạn' },
              { step: '2', text: 'Nhấn vào link xác thực trong email' },
              { step: '3', text: 'Quay lại đây và nhấn "Đã xác thực email"' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-soft text-primary-strong flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold">{step}</span>
                </div>
                <p className="text-sm text-secondary">{text}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              fullWidth
              size="lg"
              onClick={handleCheckStatus}
              isLoading={isChecking || isLoading}
              icon={<ShieldCheck size={18} />}
              className="mt-1"
            >
              Đã xác thực email
            </Button>

            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onClick={handleResend}
              disabled={isLoading}
              icon={<RefreshCw size={17} />}
            >
              Gửi lại email xác thực
            </Button>
          </div>

          {/* Back to login */}
          <div className="pt-6 mt-8 border-t border-border">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
              />
              Quay lại Đăng nhập
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailVerificationPage;
