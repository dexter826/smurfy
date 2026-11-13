import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/cn';

interface DropdownItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  label,
  onClick,
  variant = 'default',
  disabled,
  className = '',
}) => (
  <DropdownMenuPrimitive.Item
    disabled={disabled}
    onSelect={onClick}
    className={cn(
      'flex w-full cursor-pointer select-none items-center gap-3 px-4 py-2.5 text-left text-sm font-medium outline-none',
      'transition-colors duration-fast data-[highlighted]:bg-hover data-[highlighted]:text-foreground',
      variant === 'danger'
        ? 'text-danger data-[highlighted]:bg-danger-soft data-[highlighted]:text-danger'
        : 'text-foreground',
      className,
    )}
  >
    {icon && (
      <span
        className={cn('flex-shrink-0', variant === 'danger' ? 'text-danger' : 'text-secondary')}
      >
        {icon}
      </span>
    )}
    <span className="flex-1 truncate">{label}</span>
  </DropdownMenuPrimitive.Item>
);

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <DropdownMenuPrimitive.Separator className={cn('h-px bg-border', className)} />
);

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  menuClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  matchTriggerWidth?: boolean;
  sideOffset?: number;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'right',
  className = '',
  menuClassName = '',
  open,
  onOpenChange,
  matchTriggerWidth = false,
  sideOffset = 6,
}) => (
  <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <div className={cn('relative inline-block', className)} onClick={(e) => e.stopPropagation()}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
    </div>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align === 'right' ? 'end' : 'start'}
        sideOffset={sideOffset}
        collisionPadding={12}
        className={cn(
          'z-popover min-w-[180px] max-w-[calc(100vw-24px)] rounded-md border border-border',
          'bg-surface-elevated shadow-dropdown overflow-hidden animate-fade-in outline-none',
          menuClassName,
        )}
        style={
          matchTriggerWidth
            ? {
                width: 'var(--radix-dropdown-menu-trigger-width)',
                minWidth: 'var(--radix-dropdown-menu-trigger-width)',
              }
            : undefined
        }
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);
