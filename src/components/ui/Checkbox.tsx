import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  name,
  id,
  label,
  className,
}) => {
  const autoId = React.useId();
  const checkboxId = id ?? autoId;

  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        name={name}
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-line bg-surface',
          'transition-colors duration-200 hover:border-accent/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:ring-offset-1 focus-visible:ring-offset-canvas',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent',
          className,
        )}
      >
        <CheckboxPrimitive.Indicator className="text-on-accent">
          <Check size={12} strokeWidth={3} aria-hidden="true" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className="select-none cursor-pointer text-sm font-medium text-ink-2 leading-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};
