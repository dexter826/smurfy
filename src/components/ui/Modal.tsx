import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { X, AlertTriangle, Info } from 'lucide-react';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { cn } from '@/lib/cn';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  showHeader?: boolean;
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
  fullScreen?: boolean | 'mobile';
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingClasses: Record<NonNullable<ModalProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  size = 'md',
  padding = 'lg',
  showHeader = true,
  showCloseButton = true,
  className = '',
  bodyClassName = '',
  fullScreen = false,
}) => {
  const isFullAlways = fullScreen === true;
  const isFullMobile = fullScreen === 'mobile';

  const positionClasses = isFullAlways
    ? 'inset-0 h-full max-h-full w-full max-w-full rounded-none'
    : isFullMobile
      ? 'max-md:inset-0 max-md:h-full max-md:max-h-full max-md:rounded-none max-md:animate-slide-in-right md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-auto md:max-h-[90dvh] md:rounded-dialog md:animate-fade-in duration-slow'
      : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90dvh] rounded-dialog animate-fade-in duration-base';

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-modal bg-overlay backdrop-blur-sm animate-fade-in" />
        <DialogPrimitive.Content
          className={cn(
            'fixed z-modal flex w-full flex-col overflow-hidden bg-surface shadow-float outline-none',
            positionClasses,
            sizeClasses[size],
            className,
          )}
        >
          {showHeader ? (
            <div className="flex flex-shrink-0 items-center justify-between border-b border-line px-5 py-4">
              <DialogPrimitive.Title className="text-base font-bold text-ink">
                {title || ''}
              </DialogPrimitive.Title>
              {showCloseButton && (
                <DialogPrimitive.Close asChild>
                  <IconButton
                    icon={<X size={20} aria-hidden="true" />}
                    size="md"
                    aria-label="Đóng"
                  />
                </DialogPrimitive.Close>
              )}
            </div>
          ) : (
            <DialogPrimitive.Title className="sr-only">
              {title || 'Hộp thoại'}
            </DialogPrimitive.Title>
          )}
          <DialogPrimitive.Description className="sr-only">
            {title || 'Hộp thoại'}
          </DialogPrimitive.Description>

          <div
            className={cn('min-h-0 flex-1 overflow-y-auto', paddingClasses[padding], bodyClassName)}
          >
            {children}
          </div>

          {footer && (
            <div className="flex flex-shrink-0 justify-end gap-3 border-t border-line bg-canvas/30 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] md:px-5 md:py-4 md:pb-4">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger';
  onConfirm?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title = 'Xác nhận',
  message,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  variant = 'primary',
  onConfirm,
}) => (
  <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 z-dialog bg-overlay backdrop-blur-sm animate-fade-in" />
      <AlertDialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-dialog w-full max-w-[320px] -translate-x-1/2 -translate-y-1/2',
          'rounded-dialog border border-line bg-surface p-5 shadow-float outline-none animate-fade-in',
        )}
      >
        <div className="mb-5 flex flex-col items-center text-center">
          {variant === 'danger' ? (
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
              <AlertTriangle size={22} aria-hidden="true" />
            </div>
          ) : (
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
              <Info size={22} aria-hidden="true" />
            </div>
          )}
          <AlertDialogPrimitive.Title className="mb-2 text-base font-bold text-ink">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-sm leading-relaxed text-ink-2">
            {message}
          </AlertDialogPrimitive.Description>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <AlertDialogPrimitive.Cancel asChild>
            <Button variant="secondary" className="w-full">
              {cancelLabel}
            </Button>
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action asChild onClick={onConfirm}>
            <Button variant={variant} className="w-full font-bold">
              {confirmLabel}
            </Button>
          </AlertDialogPrimitive.Action>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  </AlertDialogPrimitive.Root>
);
