import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';
import { cn } from '@/lib/cn';

interface SlideUpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  showHandle?: boolean;
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
}

const sizeClasses: Record<NonNullable<SlideUpSheetProps['size']>, string> = {
  sm: 'lg:max-w-sm',
  md: 'lg:max-w-md',
  lg: 'lg:max-w-lg',
  xl: 'lg:max-w-xl',
  '2xl': 'lg:max-w-2xl',
};

const paddingClasses: Record<NonNullable<SlideUpSheetProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

/**
 * Sheet trượt từ đáy trên mobile (bo 2 góc trên `dialog`, tay cầm, `slideInUp` 300ms);
 * từ `lg` trở lên hiển thị như dialog giữa màn.
 */
export const SlideUpSheet: React.FC<SlideUpSheetProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  size = 'md',
  padding = 'none',
  showHandle = true,
  showCloseButton = true,
  className = '',
  bodyClassName = '',
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-overlay backdrop-blur-sm animate-fade-in" />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-modal flex w-full flex-col overflow-hidden bg-surface shadow-float outline-none',
          // Mobile: sheet toàn màn trượt từ đáy, bo 2 góc trên
          'inset-x-0 bottom-0 h-full max-h-full rounded-t-dialog animate-slide-in-up duration-slow',
          // ≥lg: dialog giữa màn
          'lg:inset-x-auto lg:bottom-auto lg:h-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:max-h-[90dvh] lg:rounded-dialog lg:animate-fade-in lg:duration-base',
          sizeClasses[size],
          className,
        )}
      >
        {showHandle && (
          <div className="flex flex-shrink-0 justify-center pt-2 lg:hidden" aria-hidden="true">
            <div className="h-1 w-10 rounded-full bg-line-strong" />
          </div>
        )}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-line px-5 py-3">
          <DialogPrimitive.Title className="text-base font-bold text-ink">
            {title || ''}
          </DialogPrimitive.Title>
          {showCloseButton && (
            <DialogPrimitive.Close asChild>
              <IconButton icon={<X size={20} aria-hidden="true" />} size="md" aria-label="Đóng" />
            </DialogPrimitive.Close>
          )}
        </div>
        <DialogPrimitive.Description className="sr-only">
          {title || 'Hộp thoại'}
        </DialogPrimitive.Description>

        <div
          className={cn('min-h-0 flex-1 overflow-y-auto', paddingClasses[padding], bodyClassName)}
        >
          {children}
        </div>

        {footer && (
          <div className="flex flex-shrink-0 justify-end gap-3 border-t border-line bg-canvas/30 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] lg:px-5 lg:py-4 lg:pb-4">
            {footer}
          </div>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);
