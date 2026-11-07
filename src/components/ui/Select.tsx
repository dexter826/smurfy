import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<SelectProps['size']>, string> = {
  sm: 'min-h-[36px] px-3 text-sm',
  md: 'min-h-[44px] px-4 text-base',
  lg: 'min-h-[48px] px-6 text-base',
};

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = 'Chọn một tùy chọn',
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <SelectPrimitive.Root value={value || undefined} onValueChange={onChange} disabled={disabled}>
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label className="ml-1 cursor-pointer text-caption font-semibold text-secondary">
            {label}
          </label>
        )}

        <SelectPrimitive.Trigger
          className={cn(
            'flex w-full items-center justify-between rounded-sm font-normal outline-none',
            'transition-all duration-200',
            'bg-surface border data-[placeholder]:text-muted',
            'focus:ring-2 focus:ring-focus/50 focus:border-primary hover:border-border-strong',
            'border-border data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-focus/50',
            error && 'border-danger ring-2 ring-danger/50',
            disabled && 'cursor-not-allowed opacity-50 bg-background',
            !disabled && 'cursor-pointer',
            sizeClasses[size],
          )}
        >
          <span className="flex items-center gap-2 overflow-hidden">
            {selectedOption?.icon && (
              <span className="flex-shrink-0 text-secondary">{selectedOption.icon}</span>
            )}
            <SelectPrimitive.Value placeholder={placeholder} className="truncate" />
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              size={size === 'sm' ? 14 : 18}
              className="ml-2 flex-shrink-0 text-muted transition-transform duration-200 data-[state=open]:rotate-180"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            collisionPadding={12}
            className="z-popover max-h-60 w-[var(--radix-select-trigger-width)] min-w-[160px] max-w-[calc(100vw-24px)] overflow-hidden rounded-md border border-border bg-surface shadow-dropdown animate-fade-in"
          >
            <SelectPrimitive.Viewport className="max-h-60 overflow-y-auto scroll-hide p-0">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'flex w-full cursor-pointer select-none items-center justify-between px-4 py-2.5 text-left text-sm outline-none',
                    'transition-colors duration-fast',
                    'data-[highlighted]:bg-hover data-[highlighted]:text-foreground',
                    'data-[state=checked]:bg-primary-soft data-[state=checked]:font-medium data-[state=checked]:text-primary',
                  )}
                >
                  <span className="flex items-center gap-2 overflow-hidden">
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </span>
                  <SelectPrimitive.ItemIndicator>
                    <Check
                      size={16}
                      className="ml-2 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>

        {error && (
          <p className="mt-0.5 ml-1 animate-fade-in text-caption font-medium text-danger">
            {error}
          </p>
        )}
      </div>
    </SelectPrimitive.Root>
  );
};
