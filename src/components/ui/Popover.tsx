import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/cn';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  fullWidth?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  side = 'bottom',
  align = 'end',
  sideOffset = 8,
  className = '',
  contentClassName = '',
  open,
  onOpenChange,
  fullWidth = false,
}) => (
  <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <div
      className={cn('relative', fullWidth ? 'block w-full' : 'inline-block', className)}
      onClick={(e) => e.stopPropagation()}
    >
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
    </div>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={12}
        className={cn(
          'z-popover rounded-card border border-line bg-surface shadow-float',
          'outline-none animate-fade-in',
          contentClassName,
        )}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  </PopoverPrimitive.Root>
);
