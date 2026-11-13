import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

export const iconSizes = { sm: 16, md: 18, lg: 20 } as const;

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const iconButtonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors duration-200 outline-none ' +
    'border border-transparent focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ' +
    'disabled:opacity-50 disabled:cursor-not-allowed active:brightness-95',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent border-accent-edge hover:bg-accent-edge',
        secondary: 'bg-surface text-ink border-line hover:bg-surface-2 active:bg-surface-3',
        ghost: 'text-ink-2 hover:bg-surface-2 hover:text-accent-strong active:bg-surface-3',
        danger: 'bg-danger text-on-danger hover:bg-danger/90 active:bg-danger/80',
      },
      size: {
        sm: 'w-9 h-9 rounded-control',
        md: 'w-11 h-11 rounded-control',
        lg: 'w-12 h-12 rounded-control',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
);

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps & VariantProps<typeof iconButtonVariants>
>(({ icon, variant = 'ghost', size = 'md', className = '', disabled, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(iconButtonVariants({ variant, size }), className)}
    disabled={disabled}
    {...props}
  >
    <span className="inline-flex pointer-events-none">{icon}</span>
  </button>
));

IconButton.displayName = 'IconButton';
