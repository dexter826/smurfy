import React from 'react';
import SkeletonLib, {
  SkeletonProps as SkeletonLibProps,
  SkeletonTheme,
} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps extends SkeletonLibProps {
  className?: string;
  variant?: 'line' | 'circle' | 'rect';
}

export const SkeletonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SkeletonTheme baseColor="var(--color-skeleton)" highlightColor="var(--color-surface)">
    {children}
  </SkeletonTheme>
);

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  ...props
}) => <SkeletonLib circle={variant === 'circle'} className={className} {...props} />;
