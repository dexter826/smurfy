import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';
import { Popover } from './Popover';
import { cn } from '@/lib/cn';

export interface SearchableOption {
  value: string;
  label: string;
  code?: string;
}

interface SearchableSelectProps {
  label?: string;
  options: SearchableOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  allowCustomValue?: boolean;
}

const sizeClasses: Record<NonNullable<SearchableSelectProps['size']>, string> = {
  sm: 'min-h-[36px] px-3 text-sm',
  md: 'min-h-[44px] px-4 text-base',
  lg: 'min-h-[48px] px-6 text-base',
};

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = 'Chọn một tùy chọn',
  searchPlaceholder = 'Tìm kiếm...',
  disabled = false,
  className = '',
  size = 'md',
  allowCustomValue = false,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    if (!query.trim()) return options.slice(0, 50);
    const q = query.toLowerCase().trim();
    return options
      .filter(
        (o) => o.label.toLowerCase().includes(q) || (o.code && o.code.toLowerCase().includes(q)),
      )
      .slice(0, 50);
  }, [query, options]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
    setQuery('');
  }, [open]);

  const handleSelect = (option: SearchableOption) => {
    onChange(option.value);
    setOpen(false);
    setQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && allowCustomValue && query) {
      onChange(query);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      align="start"
      fullWidth
      contentClassName="w-[var(--radix-popover-trigger-width)] min-w-[200px] max-w-[calc(100vw-24px)] p-0 flex flex-col"
      className={className}
      trigger={
        <div className="relative w-full">
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex w-full items-center justify-between rounded-sm bg-surface border font-normal outline-none',
              'transition-all duration-200 cursor-pointer text-left',
              'border-border hover:border-border-strong',
              'focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:border-primary',
              'data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-focus/50',
              error && 'border-danger ring-2 ring-danger/50',
              disabled && 'cursor-not-allowed opacity-50 bg-background',
              sizeClasses[size],
            )}
          >
            <span
              className={cn(
                'flex-1 truncate',
                !selectedOption && !value ? 'text-muted' : 'text-foreground',
              )}
            >
              {selectedOption ? selectedOption.label : value || placeholder}
            </span>
            <ChevronDown
              size={size === 'sm' ? 14 : 18}
              className={cn(
                'ml-2 flex-shrink-0 text-muted transition-transform duration-200',
                open && 'rotate-180',
              )}
            />
          </button>
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
              aria-label="Xóa"
            >
              <X size={14} />
            </button>
          )}
        </div>
      }
    >
      <div className="flex flex-col" onKeyDown={handleInputKeyDown}>
        <div className="flex-shrink-0 border-b border-border p-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-sm border-none bg-background py-1.5 pl-7 pr-3 text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto scroll-hide">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-center text-sm text-muted">Không tìm thấy kết quả</div>
          ) : (
            filtered.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm outline-none',
                  'transition-colors duration-fast hover:bg-hover active:bg-active',
                  option.value === value
                    ? 'bg-primary-soft font-medium text-primary'
                    : 'font-normal text-foreground',
                )}
              >
                <span className="truncate">{option.label}</span>
                {option.value === value && (
                  <Check size={15} className="flex-shrink-0 text-primary" aria-hidden="true" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </Popover>
  );
};
