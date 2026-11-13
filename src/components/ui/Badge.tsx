import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';

type BadgeVariant =
  'soft' | 'solid' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'muted';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants = cva(
  'inline-flex h-5 items-center gap-1 rounded-full px-2 font-semibold leading-none text-caption',
  {
    variants: {
      variant: {
        soft: 'bg-accent-soft text-accent-strong',
        solid: 'bg-accent text-on-accent',
        success: 'bg-success text-on-success',
        warning: 'bg-warning text-on-warning',
        danger: 'bg-danger text-on-danger',
        info: 'bg-info text-on-info',
        neutral: 'bg-surface-3 text-ink-2',
        muted: 'bg-surface-2 text-ink-2',
      },
    },
    defaultVariants: {
      variant: 'soft',
    },
  },
);

export const Badge: React.FC<BadgeProps> = ({ variant = 'soft', className, ...props }) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
