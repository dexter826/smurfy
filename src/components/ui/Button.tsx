import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center font-semibold transition-colors duration-200 outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  'active:brightness-95';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'btn-gradient text-on-primary shadow-sm hover:brightness-110 border border-transparent',
  secondary:
    'bg-background hover:bg-hover active:bg-active text-foreground border border-border',
  ghost:
    'hover:bg-hover active:bg-active text-secondary hover:text-foreground border border-transparent',
  danger:
    'bg-danger hover:bg-danger/90 active:bg-danger/80 text-on-primary shadow-sm border border-transparent',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-[36px] px-3 text-sm gap-2 rounded-lg',
  md: 'min-h-[44px] px-4 text-sm gap-2 rounded-xl',
  lg: 'min-h-[48px] px-6 text-base gap-3 rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading,
  children,
  icon,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin shrink-0" size={iconSize} />}
      {!isLoading && icon && <span className="shrink-0">{icon}</span>}
      {!isLoading && children && <span className="truncate">{children}</span>}
    </button>
  );
};
