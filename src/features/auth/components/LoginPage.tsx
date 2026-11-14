import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/features/auth';
import { useLoadingStore } from '@/store/loadingStore';
import { Button, Input, Checkbox, DatePicker } from '@/components/ui';
import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { AuthBanner } from './AuthBanner';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  LoginFormValues,
  RegisterFormValues,
  ForgotPasswordFormValues,
} from '@/utils/validation';
import { calculateGeneration } from '@/utils/userUtils';

type Tab = 'login' | 'register' | 'forgot';

const LoginPage: React.FC = () => {
  const { login, register, resetPassword, sendVerificationEmail } = useAuthStore();
  const isLoading = useLoadingStore(
    (state) =>
      state.loadingStates['auth.login'] ||
      state.loadingStates['auth.register'] ||
      state.loadingStates['auth'],
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [showResend, setShowResend] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', dob: undefined, password: '', confirmPassword: '' },
  });

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    const saved = localStorage.getItem('remembered_email');
    if (saved) {
      loginForm.setValue('email', saved);
      setRememberMe(true);
    }
  }, [loginForm]);

  useEffect(() => {
    const state = location.state as {
      reason?: string;
      source?: string;
      redirectTo?: string;
    } | null;
    if (!state) return;
    if (state.redirectTo) {
      setRedirectTo(state.redirectTo);
    }
    if (state.source === 'register') {
      setInfoMessage(TOAST_MESSAGES.AUTH.REGISTER_SUCCESS);
      setShowResend(true);
    }
    if (state.reason === 'verify_requires_login') {
      setInfoMessage(TOAST_MESSAGES.AUTH.ERRORS.EMAIL_NOT_VERIFIED);
      setShowResend(false);
    }
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const handleAuthError = (error: unknown) => {
    const err = error as { code?: string; message?: string };
    if (err.code === 'auth/email-not-verified') {
      setAuthError(null);
      setInfoMessage(TOAST_MESSAGES.AUTH.ERRORS.EMAIL_NOT_VERIFIED);
      setShowResend(true);
      return;
    }
    if (err.code === 'auth/user-disabled') {
      setAuthError(TOAST_MESSAGES.AUTH.ERRORS.USER_DISABLED);
      return;
    }

    const messages: Record<string, string> = {
      'auth/invalid-email': TOAST_MESSAGES.AUTH.ERRORS.INVALID_EMAIL,
      'auth/user-not-found': TOAST_MESSAGES.AUTH.ERRORS.USER_NOT_FOUND,
      'auth/wrong-password': TOAST_MESSAGES.AUTH.ERRORS.WRONG_PASSWORD,
      'auth/invalid-credential': TOAST_MESSAGES.AUTH.ERRORS.INVALID_CREDENTIAL,
      'auth/email-already-in-use': TOAST_MESSAGES.AUTH.ERRORS.EMAIL_ALREADY_IN_USE,
      'auth/weak-password': TOAST_MESSAGES.AUTH.ERRORS.WEAK_PASSWORD,
    };

    const message = (err.code && messages[err.code]) || err.message || TOAST_MESSAGES.COMMON.ERROR;
    setAuthError(message);
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      setAuthError(null);
      setInfoMessage(null);
      setShowResend(false);
      await login(data.email, data.password, rememberMe);
      if (rememberMe) localStorage.setItem('remembered_email', data.email);
      else localStorage.removeItem('remembered_email');
      navigate(redirectTo || '/');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      setAuthError(null);
      setInfoMessage(null);
      setShowResend(false);
      const gen = calculateGeneration(data.dob);
      await register(data.email, data.password, data.name, data.dob, gen);
      localStorage.setItem('remembered_email', data.email);
      toast.success(TOAST_MESSAGES.AUTH.REGISTER_SUCCESS);
      navigate('/verify-email', { state: { source: 'register' } });
    } catch (error) {
      handleAuthError(error);
    }
  };

  const onForgotSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setAuthError(null);
      setInfoMessage(null);
      setShowResend(false);
      await resetPassword(data.email);
      toast.success(TOAST_MESSAGES.AUTH.RESET_PASSWORD_SUCCESS);
      setVerificationSent(true);
    } catch (error: any) {
      toast.error(
        error.code === 'auth/user-not-found'
          ? TOAST_MESSAGES.AUTH.ERRORS.USER_NOT_FOUND
          : TOAST_MESSAGES.AUTH.SEND_EMAIL_FAILED,
      );
    }
  };

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      setAuthError(null);
      setInfoMessage(null);
      setShowResend(false);
      setVerificationSent(true);
      toast.success(TOAST_MESSAGES.AUTH.RESEND_VERIFY_SUCCESS);
    } catch {
      toast.error(TOAST_MESSAGES.AUTH.SEND_EMAIL_FAILED);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setRegisterStep(1);
    setAuthError(null);
    setInfoMessage(null);
    setShowResend(false);
    setVerificationSent(false);
  };

  const passwordToggle = (show: boolean, toggle: () => void) => (
    <button
      type="button"
      tabIndex={-1}
      onClick={toggle}
      aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
      className="p-2 text-ink-3 hover:text-ink-2 transition-colors"
    >
      {show ? <EyeOff size={17} /> : <Eye size={17} />}
    </button>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row lg:overflow-hidden bg-surface">
      {/* ── Brand field: dải trên (mobile) / 52% accent (desktop) — frame c-auth ── */}
      <aside className="relative flex-shrink-0 bg-accent text-on-accent overflow-hidden px-6 py-4 lg:px-16 lg:py-14 lg:w-[52%] flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="hidden lg:block absolute -right-36 -bottom-36 w-[460px] h-[460px] rounded-full border border-on-accent/20"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block absolute -right-24 -bottom-24 w-[320px] h-[320px] rounded-full border border-on-accent/15"
        />

        <div className="flex items-center gap-3 relative">
          <span className="h-[38px] w-[38px] lg:h-11 lg:w-11 rounded-control bg-on-accent flex items-center justify-center overflow-hidden">
            <img src="/smurfy-symbol.svg" alt="" className="h-full w-full p-1" />
          </span>
          <span className="font-display text-xl lg:text-2xl font-extrabold tracking-tight">
            Smurfy
          </span>
        </div>

        <div className="relative max-w-[520px] mt-10 lg:mt-0">
          <h2 className="hidden lg:block text-4xl leading-[1.1] font-extrabold tracking-[-0.02em]">
            Nơi kết nối cho cộng đồng Smurfy.
          </h2>
          <p className="hidden lg:block text-sm leading-relaxed max-w-[420px] opacity-85 mt-4">
            Nhắn tin, chia sẻ nhật ký và giữ liên lạc với bạn bè — trong một không gian riêng tư và
            an toàn.
          </p>
          <ul className="hidden lg:flex gap-6 text-xs font-semibold opacity-90 mt-8">
            <li>Nhắn tin thời gian thực</li>
            <li>Nhật ký riêng tư</li>
            <li>Hoàn toàn miễn phí</li>
          </ul>
        </div>
      </aside>

      {/* ── Form ── */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="my-auto w-full max-w-[440px] bg-surface rounded-card shadow-card p-6 sm:p-8">
          <img
            src="/logo.svg"
            alt="Smurfy"
            className="h-16 w-16 object-contain mx-auto mb-5 lg:hidden"
          />
          {activeTab !== 'forgot' && (
            <div className="flex bg-surface-2 rounded-control p-[3px] mb-6">
              {(['login', 'register'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-[8px] transition-all duration-200
                  ${activeTab === tab ? 'bg-surface text-ink shadow-card' : 'text-ink-3 hover:text-ink-2'}`}
                >
                  {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                </button>
              ))}
            </div>
          )}

          <div className="mb-5">
            {activeTab === 'forgot' ? (
              <>
                <h1 className="text-2xl font-bold text-ink mb-1">Khôi phục mật khẩu</h1>
                <p className="text-sm text-ink-2">Nhập email để nhận link đặt lại mật khẩu.</p>
              </>
            ) : activeTab === 'login' ? (
              <>
                <h1 className="text-2xl font-bold text-ink mb-1">Chào mừng trở lại</h1>
                <p className="text-sm text-ink-2">Đăng nhập để tiếp tục với Smurfy.</p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-ink mb-1">Tạo tài khoản</h1>
                <p className="text-sm text-ink-2">
                  {registerStep === 1
                    ? 'Bước 1 của 2 — Thông tin của bạn.'
                    : 'Bước 2 của 2 — Mật khẩu đăng nhập.'}
                </p>
                <div className="flex gap-1.5 mt-3" aria-hidden="true">
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      registerStep === 1 ? 'bg-accent' : 'bg-accent-soft'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      registerStep === 2 ? 'bg-accent' : 'bg-accent-soft'
                    }`}
                  />
                </div>
              </>
            )}
          </div>

          {activeTab === 'forgot' && (
            <form onSubmit={forgotForm.handleSubmit(onForgotSubmit)} className="space-y-4">
              {verificationSent && (
                <AuthBanner variant="success">Link đặt lại mật khẩu đã được gửi!</AuthBanner>
              )}
              <Input
                label="Địa chỉ email"
                icon={<Mail size={17} />}
                type="email"
                placeholder="Nhập địa chỉ email"
                {...forgotForm.register('email')}
                error={forgotForm.formState.errors.email?.message}
                autoComplete="email"
                size="lg"
              />
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
                Gửi mã khôi phục
              </Button>
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => handleTabChange('login')}
                  className="text-sm text-ink-2 hover:text-accent-strong font-medium transition-colors duration-200"
                >
                  ← Quay lại đăng nhập
                </button>
              </div>
            </form>
          )}

          {activeTab !== 'forgot' && (
            <form
              onSubmit={
                activeTab === 'login'
                  ? loginForm.handleSubmit(onLoginSubmit)
                  : registerForm.handleSubmit(onRegisterSubmit)
              }
              className="space-y-3.5"
            >
              {infoMessage && (
                <AuthBanner
                  variant="info"
                  action={
                    showResend
                      ? { label: 'Gửi lại email xác thực', onClick: handleResendEmail }
                      : undefined
                  }
                >
                  {infoMessage}
                </AuthBanner>
              )}

              {authError && <AuthBanner variant="error">{authError}</AuthBanner>}

              {verificationSent && !authError && activeTab === 'login' && (
                <AuthBanner variant="success">
                  Đã gửi link xác thực. Vui lòng kiểm tra email.
                </AuthBanner>
              )}

              <Input
                label="Email"
                icon={<Mail size={17} />}
                type="email"
                placeholder="Nhập địa chỉ email"
                {...(activeTab === 'login'
                  ? loginForm.register('email')
                  : registerForm.register('email'))}
                error={
                  activeTab === 'login'
                    ? loginForm.formState.errors.email?.message
                    : registerForm.formState.errors.email?.message
                }
                autoComplete="email"
                size="lg"
              />

              {activeTab === 'register' && registerStep === 1 && (
                <>
                  <Input
                    label="Họ tên"
                    icon={<User size={17} />}
                    placeholder="Nhập họ tên"
                    {...registerForm.register('name')}
                    error={registerForm.formState.errors.name?.message}
                    size="lg"
                  />
                  <DatePicker
                    label="Ngày sinh"
                    value={registerForm.watch('dob')}
                    onChange={(ts) => registerForm.setValue('dob', ts, { shouldValidate: true })}
                    placeholder="Chọn ngày sinh"
                    error={registerForm.formState.errors.dob?.message}
                    size="lg"
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mt-1"
                    onClick={async () => {
                      const ok = await registerForm.trigger(['name', 'email', 'dob']);
                      if (ok) setRegisterStep(2);
                    }}
                  >
                    Tiếp tục
                  </Button>
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => handleTabChange('login')}
                      className="text-sm text-ink-2 hover:text-accent-strong font-medium transition-colors duration-200"
                    >
                      ← Quay lại đăng nhập
                    </button>
                  </div>
                </>
              )}

              {(activeTab === 'login' || (activeTab === 'register' && registerStep === 2)) && (
                <>
                  {activeTab === 'register' && registerStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setRegisterStep(1)}
                      className="text-sm text-ink-2 hover:text-accent-strong font-medium transition-colors duration-200 self-start"
                    >
                      ← Quay lại bước trước
                    </button>
                  )}
                  <Input
                    label="Mật khẩu"
                    icon={<Lock size={17} />}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                    {...(activeTab === 'login'
                      ? loginForm.register('password')
                      : registerForm.register('password'))}
                    error={
                      activeTab === 'login'
                        ? loginForm.formState.errors.password?.message
                        : registerForm.formState.errors.password?.message
                    }
                    size="lg"
                    rightElement={passwordToggle(showPassword, () => setShowPassword((p) => !p))}
                  />

                  {activeTab === 'register' && (
                    <Input
                      label="Xác nhận mật khẩu"
                      icon={<Lock size={17} />}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Xác nhận mật khẩu"
                      autoComplete="new-password"
                      {...registerForm.register('confirmPassword')}
                      error={registerForm.formState.errors.confirmPassword?.message}
                      size="lg"
                      rightElement={passwordToggle(showConfirmPassword, () =>
                        setShowConfirmPassword((p) => !p),
                      )}
                    />
                  )}

                  {activeTab === 'login' && (
                    <div className="flex items-center justify-between mt-2.5">
                      <Checkbox
                        label="Ghi nhớ đăng nhập"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                      />
                      <button
                        type="button"
                        onClick={() => handleTabChange('forgot')}
                        className="text-caption text-accent-strong hover:underline font-semibold transition-colors"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    className="mt-1"
                  >
                    {activeTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                  </Button>
                </>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
