import React from 'react';
import { cn } from '@/lib/cn';

interface ProgressBarProps {
  progress: number;
  status?: 'loading' | 'error' | 'success';
  label?: string;
  metadata?: string;
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status = 'loading',
  label,
  metadata,
  className = '',
  showPercentage = false,
}) => {
  const pct = Math.min(Math.max(0, Math.round(progress)), 100);
  const isComplete = pct >= 100 || status === 'success';
  const isError = status === 'error';

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {(label || showPercentage || metadata) && (
        <div className="flex items-center justify-between gap-2 px-0.5">
          {label && (
            <span className="text-caption font-semibold text-secondary truncate">{label}</span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {metadata && (
              <span className="text-caption font-bold text-muted uppercase tracking-tight">
                {metadata}
              </span>
            )}
            {showPercentage && (
              <span
                className={cn(
                  'text-caption font-bold',
                  isError ? 'text-danger' : isComplete ? 'text-success' : 'text-primary',
                )}
              >
                {isError ? 'Lỗi' : isComplete ? 'Hoàn tất' : `${pct}%`}
              </span>
            )}
          </div>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        className="w-full h-1.5 bg-surface-sunken rounded-full overflow-hidden shadow-inner"
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-base',
            isError ? 'bg-danger' : isComplete ? 'bg-success' : 'bg-primary',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
