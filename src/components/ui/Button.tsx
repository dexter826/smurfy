import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors duration-200 outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ' +
    'disabled:opacity-50 disabled:cursor-not-allowed ' +
    'active:brightness-95',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent border border-accent-edge hover:bg-accent-edge',
        secondary: 'bg-surface hover:bg-surface-2 active:bg-surface-3 text-ink border border-line',
        ghost:
          'hover:bg-surface-2 active:bg-surface-3 text-ink-2 hover:text-ink border border-transparent',
        danger:
          'bg-danger text-on-danger hover:bg-danger/90 active:bg-danger/80 border border-transparent',
      },
      size: {
        sm: 'min-h-[36px] px-3 text-sm gap-2 rounded-control',
        md: 'min-h-[44px] px-4 text-sm gap-2 rounded-control',
        lg: 'min-h-[48px] px-6 text-base gap-3 rounded-control',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

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
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

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
