import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './Button';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  variant?: 'default' | 'boxed' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const emptyStateVariants = cva(
  'flex flex-col items-center justify-center text-center animate-fade-in',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        boxed: 'bg-surface rounded-card border border-line p-8 md:p-12 shadow-card',
        error: 'bg-danger-soft rounded-card border border-danger/10 p-8',
      },
      size: {
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const sizeConfig = {
  sm: { icon: 20, title: 'text-sm', desc: 'text-xs', iconContainer: 'w-10 h-10' },
  md: { icon: 28, title: 'text-base', desc: 'text-sm', iconContainer: 'w-14 h-14' },
  lg: { icon: 40, title: 'text-lg', desc: 'text-sm', iconContainer: 'w-20 h-20' },
} as const;

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const config = sizeConfig[size];

  const iconColor = variant === 'error' ? 'text-danger' : 'text-ink-3';

  const renderIcon = () => {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
      return icon;
    }

    const IconComp = icon as any;
    return <IconComp size={config.icon} className={iconColor} strokeWidth={1.5} />;
  };

  return (
    <div className={cn(emptyStateVariants({ variant, size }), className)}>
      {icon && (
        <div
          className={`${config.iconContainer} rounded-full bg-surface-2 flex items-center justify-center border border-line-soft flex-shrink-0`}
        >
          {renderIcon()}
        </div>
      )}

      <div className="max-w-sm space-y-1">
        <h3 className={`${config.title} font-semibold text-ink`}>{title}</h3>
        {description && (
          <p className={`${config.desc} text-ink-3 leading-relaxed`}>{description}</p>
        )}
      </div>

      {action && (
        <Button
          onClick={action.onClick}
          variant={variant === 'error' ? 'danger' : 'secondary'}
          size="sm"
          icon={action.icon}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
