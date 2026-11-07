import React from 'react';
import { cn } from '@/lib/cn';

export const iconSizes = { sm: 16, md: 18, lg: 20 } as const;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const base =
  'inline-flex items-center justify-center font-semibold transition-colors duration-200 outline-none ' +
  'border border-transparent focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background ' +
  'disabled:opacity-50 disabled:cursor-not-allowed active:brightness-95';

const variants: Record<NonNullable<IconButtonProps['variant']>, string> = {
  primary: 'bg-primary text-on-primary border-primary-edge shadow-sm hover:bg-primary-hover',
  secondary: 'bg-surface text-foreground border-border hover:bg-hover active:bg-active',
  ghost: 'text-secondary hover:bg-hover hover:text-primary active:bg-active',
  danger: 'bg-danger text-on-danger hover:bg-danger/90 active:bg-danger/80 shadow-sm',
};

const sizes: Record<NonNullable<IconButtonProps['size']>, string> = {
  sm: 'w-9 h-9 rounded-sm',
  md: 'w-11 h-11 rounded-sm',
  lg: 'w-12 h-12 rounded-sm',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', className = '', disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      <span className="inline-flex pointer-events-none">{icon}</span>
    </button>
  ),
);

IconButton.displayName = 'IconButton';
