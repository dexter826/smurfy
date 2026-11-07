import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Report, ReportStatus, ReportType, User, UserStatus } from '@shared/types';
import { Button, UserAvatar } from '@/components/ui';
import { formatRelativeTime } from '@/utils/dateUtils';
import { UserRow } from './StatusBadge';
import { ActionType } from './types';

interface ReportMetadataSectionProps {
  report: Report | null;
  reporter: User | null;
  targetOwner: User | null;
  resolver: User | null;
  isLoading: boolean;
  isProcessing: boolean;
  onSetPendingAction: (action: ActionType) => void;
  onClose: () => void;
}

export const ReportMetadataSection: React.FC<ReportMetadataSectionProps> = ({
  report,
  reporter,
  targetOwner,
  resolver,
  isLoading,
  isProcessing,
  onSetPendingAction,
  onClose,
}) => {
  const isPending = report?.status === ReportStatus.PENDING;
  const isContentReport = report?.targetType !== ReportType.USER;

  return (
    <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col overflow-y-auto scroll-hide border-t lg:border-t-0 border-border">
      <div className="p-5 space-y-4 flex-1">
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-muted uppercase tracking-widest">Người báo cáo</p>
          <UserRow user={reporter} isLoading={isLoading} />
        </div>

        {isContentReport && (
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">Chủ nội dung</p>
            <UserRow user={targetOwner} isLoading={isLoading} />
          </div>
        )}

        {/* Resolution Result */}
        {!isLoading && report && !isPending && (
          <div
            className={`p-3.5 rounded-xl border space-y-2.5
              ${
                report.status === ReportStatus.RESOLVED
                  ? 'bg-success/5 border-success/20'
                  : 'bg-surface-sunken/40 border-border'
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {report.status === ReportStatus.RESOLVED ? (
                  <CheckCircle size={15} className="text-success" />
                ) : (
                  <XCircle size={15} className="text-secondary" />
                )}
                <span
                  className={`text-sm font-semibold ${
                    report.status === ReportStatus.RESOLVED ? 'text-success' : 'text-secondary'
                  }`}
                >
                  {report.status === ReportStatus.RESOLVED ? 'Đã xử lý' : 'Đã từ chối'}
                </span>
              </div>
              {report.resolvedAt && (
                <span className="text-xs text-muted">
                  {formatRelativeTime(report.resolvedAt)}
                </span>
              )}
            </div>

            {resolver && (
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <span className="text-xs text-muted font-medium">Xử lý bởi:</span>
                <UserAvatar
                  userId={resolver.id}
                  src={resolver.avatar?.url}
                  name={resolver.fullName}
                  size="xs"
                />
                <span className="text-xs font-semibold text-foreground truncate">
                  {resolver.fullName}
                </span>
              </div>
            )}

            {report.resolution && (
              <p className="text-xs text-secondary italic bg-surface/50 px-3 py-2 rounded-lg border border-border/40">
                "{report.resolution}"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      {!isLoading && (
        <div className="p-4 border-t border-border bg-surface-sunken/20 space-y-2">
          {isPending ? (
            <>
              <Button
                variant="secondary"
                fullWidth
                disabled={isProcessing}
                onClick={() => onSetPendingAction('reject')}
              >
                Bỏ qua báo cáo
              </Button>
              <div className="flex gap-2">
                {report?.targetType === ReportType.USER ? (
                  targetOwner?.status === UserStatus.BANNED ? (
                    <div className="flex-1 px-3 py-2 bg-danger/5 text-danger rounded-xl border border-danger/20 text-xs font-semibold text-center">
                      Tài khoản đã bị khóa
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        className="flex-1 border-warning/30 text-warning hover:bg-warning/10"
                        disabled={isProcessing}
                        onClick={() => onSetPendingAction('warn')}
                      >
                        Cảnh báo
                      </Button>
                      <Button
                        variant="danger"
                        className="flex-1"
                        isLoading={isProcessing}
                        onClick={() => onSetPendingAction('ban')}
                      >
                        Khóa TK
                      </Button>
                    </>
                  )
                ) : (
                  <Button
                    variant="danger"
                    fullWidth
                    isLoading={isProcessing}
                    onClick={() => onSetPendingAction('resolve')}
                  >
                    Xóa nội dung vi phạm
                  </Button>
                )}
              </div>
            </>
          ) : (
            <Button variant="secondary" fullWidth onClick={onClose}>
              Đóng
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
