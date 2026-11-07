import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToastStore, ToastType } from '@/store/toastStore';
import { IconButton } from './IconButton';
import { cn } from '@/lib/cn';

const toastConfig: Record<ToastType, { icon: React.ReactNode; bar: string }> = {
  success: {
    icon: <CheckCircle className="text-success" size={18} aria-hidden="true" />,
    bar: 'bg-success',
  },
  error: {
    icon: <AlertCircle className="text-danger" size={18} aria-hidden="true" />,
    bar: 'bg-danger',
  },
  info: {
    icon: <Info className="text-info" size={18} aria-hidden="true" />,
    bar: 'bg-info',
  },
  warning: {
    icon: <AlertTriangle className="text-warning" size={18} aria-hidden="true" />,
    bar: 'bg-warning',
  },
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed left-1/2 top-6 z-toast flex w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center gap-2.5 px-4 sm:max-w-md"
    >
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        return (
          <div
            key={toast.id}
            className="pointer-events-auto relative flex w-full max-w-md items-center gap-3 overflow-hidden rounded-md border border-border bg-surface-elevated py-3 pl-6 pr-3 shadow-lg animate-fade-in transition-theme"
            role="alert"
          >
            <div
              className={cn(
                'absolute bottom-3 left-1.5 top-3 w-1 rounded-full opacity-60',
                config.bar,
              )}
              aria-hidden="true"
            />
            <div className="shrink-0">{config.icon}</div>
            <p className="flex-1 text-sm font-medium text-foreground">{toast.message}</p>
            <IconButton
              onClick={() => removeToast(toast.id)}
              className="shrink-0"
              icon={<X size={15} />}
              size="sm"
              aria-label="Đóng thông báo"
            />
          </div>
        );
      })}
    </div>
  );
};
