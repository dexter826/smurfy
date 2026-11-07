import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { ReportStatus, User } from '@shared/types';
import { UserAvatar, Skeleton } from '@/components/ui';

export const StatusBadge: React.FC<{ status: ReportStatus }> = ({ status }) => {
  const map: Record<ReportStatus, { icon: React.ReactNode; label: string; cls: string }> = {
    [ReportStatus.PENDING]: {
      icon: <Clock size={11} />,
      label: 'Chờ xử lý',
      cls: 'bg-warning/10 text-warning border border-warning/20',
    },
    [ReportStatus.RESOLVED]: {
      icon: <CheckCircle size={11} />,
      label: 'Đã xử lý',
      cls: 'bg-success/10 text-success border border-success/20',
    },
    [ReportStatus.REJECTED]: {
      icon: <XCircle size={11} />,
      label: 'Đã từ chối',
      cls: 'bg-surface-sunken text-secondary border border-border',
    },
  };
  const { icon, label, cls } = map[status] || map[ReportStatus.PENDING];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {icon} {label}
    </span>
  );
};

export const UserRow: React.FC<{ user: User | null; isLoading: boolean }> = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-3 bg-surface-sunken/60 rounded-xl border border-border">
        <Skeleton variant="circle" width={32} height={32} />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 p-3 bg-surface-sunken/60 rounded-xl border border-border">
      <UserAvatar userId={user?.id ?? ''} src={user?.avatar?.url} name={user?.fullName} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground truncate">{user?.fullName}</p>
        <p className="text-xs text-muted truncate">{user?.email}</p>
      </div>
    </div>
  );
};
