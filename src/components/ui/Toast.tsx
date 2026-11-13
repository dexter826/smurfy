import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useToastStore, ToastType } from '@/store/toastStore';
import { IconButton } from './IconButton';
import { cn } from '@/lib/cn';

const barVariants = cva('absolute bottom-3 left-1.5 top-3 w-1 rounded-full opacity-60', {
  variants: {
    type: {
      success: 'bg-success',
      error: 'bg-danger',
      info: 'bg-info',
      warning: 'bg-warning',
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

const toastIcon: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="text-success" size={18} aria-hidden="true" />,
  error: <AlertCircle className="text-danger" size={18} aria-hidden="true" />,
  info: <Info className="text-info" size={18} aria-hidden="true" />,
  warning: <AlertTriangle className="text-warning" size={18} aria-hidden="true" />,
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed left-1/2 top-6 z-toast flex w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-col items-center gap-2.5 px-4 sm:max-w-md"
    >
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto relative flex w-full max-w-md items-center gap-3 overflow-hidden rounded-card border border-line bg-surface py-3 pl-6 pr-3 shadow-float animate-fade-in transition-theme"
            role="alert"
          >
            <div className={cn(barVariants({ type: toast.type }))} aria-hidden="true" />
            <div className="shrink-0">{toastIcon[toast.type]}</div>
            <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>
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
