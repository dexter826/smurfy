import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/cn';

type AuthBannerVariant = 'info' | 'success' | 'error';

interface AuthBannerProps {
  variant: AuthBannerVariant;
  children: React.ReactNode;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const config: Record<
  AuthBannerVariant,
  { container: string; icon: React.ReactNode; text: string }
> = {
  info: {
    container: 'bg-accent-soft border-l-4 border-l-accent',
    icon: <Info size={17} className="text-accent-strong" aria-hidden="true" />,
    text: 'text-accent-strong',
  },
  success: {
    container: 'bg-success-soft border-l-4 border-l-success',
    icon: <CheckCircle size={17} className="text-success" aria-hidden="true" />,
    text: 'text-success',
  },
  error: {
    container: 'bg-danger-soft border-l-4 border-l-danger',
    icon: <AlertCircle size={17} className="text-danger" aria-hidden="true" />,
    text: 'text-danger',
  },
};

export const AuthBanner: React.FC<AuthBannerProps> = ({ variant, children, action, className }) => {
  const c = config[variant];
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3.5 rounded-control animate-fade-in',
        c.container,
        className,
      )}
      role="alert"
    >
      <span className="shrink-0 mt-0.5">{c.icon}</span>
      <div className="min-w-0 space-y-1.5 text-caption font-medium leading-relaxed">
        <div className={c.text}>{children}</div>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={cn(
              'font-bold underline underline-offset-2 hover:opacity-80 transition-opacity',
              c.text,
            )}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};
