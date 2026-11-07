import React from 'react';
import { cn } from '@/lib/cn';

type BadgeVariant =
  'soft' | 'solid' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'muted';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  soft: 'bg-primary-soft text-primary-strong',
  solid: 'bg-primary text-on-primary',
  success: 'bg-success text-on-success',
  warning: 'bg-warning text-on-warning',
  danger: 'bg-danger text-on-danger',
  info: 'bg-info text-on-info',
  neutral: 'bg-overlay text-on-primary',
  muted: 'bg-surface-sunken text-secondary',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'soft', className, ...props }) => (
  <span
    className={cn(
      'inline-flex h-5 items-center gap-1 rounded-full px-2 font-semibold leading-none text-caption',
      variants[variant],
      className,
    )}
    {...props}
  />
);
