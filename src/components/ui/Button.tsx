import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const base =
  'inline-flex items-center justify-center font-semibold transition-colors duration-200 outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  'active:brightness-95';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-on-primary border border-primary-edge shadow-sm hover:bg-primary-hover',
  secondary: 'bg-surface hover:bg-hover active:bg-active text-foreground border border-border',
  ghost:
    'hover:bg-hover active:bg-active text-secondary hover:text-foreground border border-transparent',
  danger:
    'bg-danger text-on-danger shadow-sm hover:bg-danger/90 active:bg-danger/80 border border-transparent',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-[36px] px-3 text-sm gap-2 rounded-sm',
  md: 'min-h-[44px] px-4 text-sm gap-2 rounded-sm',
  lg: 'min-h-[48px] px-6 text-base gap-3 rounded-sm',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading,
  children,
  icon,
  fullWidth = false,
  asChild = false,
  disabled,
  ...props
}) => {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    );
  }

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <Loader2 className="animate-spin shrink-0" size={iconSize} aria-hidden="true" />
      )}
      {!isLoading && icon && <span className="shrink-0">{icon}</span>}
      {!isLoading && children && <span className="truncate">{children}</span>}
    </button>
  );
};
