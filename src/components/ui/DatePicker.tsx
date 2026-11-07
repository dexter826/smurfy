import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { IconButton } from './IconButton';
import { Popover } from './Popover';
import { cn } from '@/lib/cn';

interface DatePickerProps {
  label?: string;
  value?: number;
  onChange: (timestamp: number) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<DatePickerProps['size']>, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = 'Chọn ngày',
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());

  const navigate = (direction: 'next' | 'prev') => {
    if (view === 'days') {
      setCurrentMonth(
        direction === 'next' ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1),
      );
    } else if (view === 'years') {
      const d = new Date(currentMonth);
      d.setFullYear(d.getFullYear() + (direction === 'next' ? 12 : -12));
      setCurrentMonth(d);
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-1 text-sm font-bold text-foreground">
        {view === 'days' && (
          <>
            <button
              type="button"
              onClick={() => setView('months')}
              className="rounded-sm px-1 py-0.5 capitalize transition-colors duration-200 hover:bg-hover hover:text-primary"
            >
              {format(currentMonth, 'MMMM', { locale: vi })}
            </button>
            <button
              type="button"
              onClick={() => setView('years')}
              className="rounded-sm px-1 py-0.5 transition-colors duration-200 hover:bg-hover hover:text-primary"
            >
              {format(currentMonth, 'yyyy')}
            </button>
          </>
        )}
        {view === 'months' && (
          <button
            type="button"
            onClick={() => setView('years')}
            className="rounded-sm px-1 py-0.5 transition-colors duration-200 hover:bg-hover hover:text-primary"
          >
            Năm {format(currentMonth, 'yyyy')}
          </button>
        )}
        {view === 'years' && (
          <span>
            {currentMonth.getFullYear() - 5} - {currentMonth.getFullYear() + 6}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {(view === 'days' || view === 'years') && (
          <>
            <IconButton
              type="button"
              onClick={() => navigate('prev')}
              icon={<ChevronLeft size={18} />}
              size="sm"
              aria-label="Tháng trước"
            />
            <IconButton
              type="button"
              onClick={() => navigate('next')}
              icon={<ChevronRight size={18} />}
              size="sm"
              aria-label="Tháng sau"
            />
          </>
        )}
        {(view === 'years' || view === 'months') && (
          <button
            type="button"
            className="ml-1 rounded-sm px-2 py-1 text-caption font-semibold text-primary transition-colors duration-200 hover:bg-hover active:bg-active"
            onClick={() => setView('days')}
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  );

  const renderMonths = () => (
    <div className="grid grid-cols-3 gap-2 p-3">
      {Array.from({ length: 12 }, (_, i) => ({
        name: format(new Date(2024, i, 1), 'MMMM', { locale: vi }),
        index: i,
      })).map((m) => (
        <button
          key={m.index}
          type="button"
          onClick={() => {
            const d = new Date(currentMonth);
            d.setMonth(m.index);
            setCurrentMonth(d);
            setView('days');
          }}
          className={cn(
            'h-12 rounded-sm text-sm transition-all duration-200',
            currentMonth.getMonth() === m.index
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'text-foreground hover:bg-hover active:bg-active',
          )}
        >
          {m.name}
        </button>
      ))}
    </div>
  );

  const renderYears = () => {
    const center = currentMonth.getFullYear();
    return (
      <div className="grid grid-cols-3 gap-2 p-3">
        {Array.from({ length: 12 }, (_, i) => center - 5 + i).map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => {
              const d = new Date(currentMonth);
              d.setFullYear(y);
              setCurrentMonth(d);
              setView('months');
            }}
            className={cn(
              'h-12 rounded-sm text-sm transition-all duration-200',
              center === y
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'text-foreground hover:bg-hover active:bg-active',
            )}
          >
            {y}
          </button>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 });

    const rows: React.ReactNode[] = [];
    let days: React.ReactNode[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const d = day;
        const isSelected = !!value && isSameDay(d, new Date(value));
        const inMonth = isSameMonth(d, monthStart);
        days.push(
          <button
            key={d.toString()}
            type="button"
            onClick={() => {
              onChange(d.getTime());
              setOpen(false);
            }}
            aria-pressed={isSelected}
            className={cn(
              'relative flex h-10 w-full items-center justify-center rounded-sm text-sm transition-all duration-200',
              !inMonth ? 'text-muted opacity-40' : 'text-foreground',
              isSelected
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'hover:bg-hover active:bg-active',
              isToday(d) && !isSelected ? 'font-bold text-primary' : '',
            )}
          >
            {format(d, 'd')}
            {isToday(d) && !isSelected && (
              <div
                className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"
                aria-hidden="true"
              />
            )}
          </button>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }

    return (
      <div className="p-2">
        <div className="mb-2 grid grid-cols-7">
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
            <div key={d} className="py-2 text-center text-caption font-bold uppercase text-muted">
              {d}
            </div>
          ))}
        </div>
        <div className="px-1 pb-2">{rows}</div>
      </div>
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setView('days');
      }}
      align="start"
      className={className}
      contentClassName="w-[var(--radix-popover-trigger-width)] min-w-[288px] max-w-[calc(100vw-24px)] p-0 overflow-hidden"
      trigger={
        <div className="flex flex-col gap-1.5">
          {label && (
            <label className="ml-1 cursor-pointer text-caption font-semibold text-secondary">
              {label}
            </label>
          )}
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex w-full items-center justify-between rounded-sm border bg-surface outline-none',
              'transition-all duration-200',
              'border-border hover:border-border-strong',
              'focus-visible:ring-2 focus-visible:ring-focus/50 focus-visible:border-primary',
              'data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-focus/50',
              error && 'border-danger ring-2 ring-danger/50',
              disabled ? 'cursor-not-allowed opacity-50 bg-background' : 'cursor-pointer',
              sizeClasses[size],
            )}
          >
            <span className={cn('truncate', !value ? 'text-muted' : 'text-foreground')}>
              {value ? format(new Date(value), 'dd/MM/yyyy') : placeholder}
            </span>
            <CalendarIcon size={18} className="flex-shrink-0 text-muted" aria-hidden="true" />
          </button>
          {error && (
            <p className="ml-1 animate-fade-in text-caption font-medium text-danger">{error}</p>
          )}
        </div>
      }
    >
      {renderHeader()}
      {view === 'days' && renderDays()}
      {view === 'months' && renderMonths()}
      {view === 'years' && renderYears()}
    </Popover>
  );
};
