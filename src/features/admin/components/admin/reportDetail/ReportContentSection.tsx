import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Report, ReportType, User, Post, Comment, PostType } from '@shared/types';
import { UserAvatar, Skeleton, EmptyState } from '@/components/ui';
import { PostMediaGrid } from '@/features/feed';
import { REPORT_CONFIG } from '@/constants';
import { TYPE_CONFIG, ViewerState } from './types';

interface ReportContentSectionProps {
  report: Report | null;
  targetOwner: User | null;
  content: Post | Comment | null;
  isLoading: boolean;
  onOpenViewer: (media: ViewerState['media'], index?: number) => void;
}

export const ReportContentSection: React.FC<ReportContentSectionProps> = ({
  report,
  targetOwner,
  content,
  isLoading,
  onOpenViewer,
}) => {
  const reasonConfig = report
    ? REPORT_CONFIG.REASONS[report.reason as keyof typeof REPORT_CONFIG.REASONS]
    : null;
  const typeConfig = report ? TYPE_CONFIG[report.targetType] : null;
  const isContentReport = report?.targetType !== ReportType.USER;
  const isDeleted = content && 'status' in content && content.status === 'deleted';

  const isProfileUpdate =
    report?.targetType === ReportType.POST &&
    content &&
    'type' in content &&
    (content.type === PostType.AVATAR_UPDATE || content.type === PostType.COVER_UPDATE);

  return (
    <div className="flex-1 overflow-y-auto scroll-hide p-5 space-y-5 lg:border-r border-border min-w-0">
      {/* Type And Reason */}
      {isLoading ? (
        <div className="space-y-2.5">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {typeConfig && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig.color}`}
              >
                {typeConfig.icon}{' '}
                {isProfileUpdate
                  ? (content as Post).type === PostType.AVATAR_UPDATE
                    ? 'Ảnh đại diện'
                    : 'Ảnh bìa'
                  : typeConfig.label}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-danger/10 text-danger border border-danger/20">
              <AlertTriangle size={11} /> {reasonConfig?.label || 'Báo cáo vi phạm'}
            </span>
          </div>
          {reasonConfig?.description && (
            <p className="text-sm text-secondary">{reasonConfig.description}</p>
          )}
          {report?.description && (
            <div className="p-3 bg-surface-sunken/60 rounded-xl border border-dashed border-border">
              <p className="text-sm text-secondary italic">"{report.description}"</p>
            </div>
          )}
        </div>
      )}

      {/* Reported Content Body */}
      {isLoading ? (
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      ) : isContentReport ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">
              Nội dung bị báo cáo
            </p>
            {isDeleted && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-danger/10 text-danger rounded-full text-[10px] font-bold uppercase border border-danger/20">
                <Trash2 size={9} /> Đã xóa
              </span>
            )}
          </div>

          {content ? (
            <div
              className={`bg-surface-sunken/40 p-4 rounded-xl border ${
                isDeleted ? 'border-danger/20' : 'border-border'
              }`}
            >
              {content.content ? (
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {content.content}
                </p>
              ) : (
                <p className="text-sm text-muted italic">(Không có nội dung văn bản)</p>
              )}

              {report?.targetType === ReportType.POST && (
                <div className="mt-4">
                  {isProfileUpdate && (content as Post).media?.[0] ? (
                    <button
                      type="button"
                      className="w-full aspect-video rounded-xl bg-black overflow-hidden cursor-pointer group relative outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      onClick={() =>
                        onOpenViewer([{ type: 'image', url: (content as Post).media![0].url }])
                      }
                    >
                      <img
                        src={(content as Post).media![0].url}
                        className="w-full h-full object-contain"
                        alt="Ảnh hồ sơ bị báo cáo"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
                        Xem cỡ lớn
                      </div>
                    </button>
                  ) : (
                    <PostMediaGrid
                      media={(content as Post).media ?? []}
                      onClick={() =>
                        onOpenViewer(
                          ((content as Post).media ?? []).map((m) => ({
                            type: m.mimeType.startsWith('video')
                              ? ('video' as const)
                              : ('image' as const),
                            url: m.url,
                          })),
                        )
                      }
                    />
                  )}
                </div>
              )}

              {report?.targetType === ReportType.COMMENT && (content as Comment).image && (
                <button
                  type="button"
                  className="mt-4 w-full aspect-video rounded-xl bg-black overflow-hidden cursor-pointer group relative outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  onClick={() =>
                    onOpenViewer([{ type: 'image', url: (content as Comment).image!.url }])
                  }
                >
                  <img
                    src={(content as Comment).image!.url}
                    className="w-full h-full object-contain"
                    alt="Ảnh bình luận bị báo cáo"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
                    Xem cỡ lớn
                  </div>
                </button>
              )}
            </div>
          ) : (
            <EmptyState
              icon={Trash2}
              title="Nội dung không tồn tại"
              description="Nội dung đã bị xóa hoặc không còn tồn tại trên hệ thống."
              size="sm"
              className="py-10 bg-surface-sunken/30 rounded-xl border border-dashed border-border"
            />
          )}
        </div>
      ) : (
        /* User Report */
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-muted uppercase tracking-widest">
            Tài khoản bị báo cáo
          </p>
          <div className="flex items-center gap-3.5 p-4 bg-surface-sunken/40 rounded-xl border border-border">
            <UserAvatar
              userId={targetOwner?.id ?? ''}
              src={targetOwner?.avatar?.url}
              name={targetOwner?.fullName}
              size="lg"
            />
            <div className="min-w-0">
              <p className="text-base font-semibold text-foreground truncate">
                {targetOwner?.fullName}
              </p>
              <p className="text-sm text-muted truncate">{targetOwner?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Images */}
      {!isLoading && report?.images && report.images.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-muted uppercase tracking-widest">
            Hình ảnh bằng chứng ({report.images.length})
          </p>
          <div className="grid grid-cols-3 gap-2">
            {report.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className="aspect-square rounded-xl overflow-hidden border border-border bg-background group cursor-pointer relative outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                onClick={() =>
                  onOpenViewer(
                    report.images!.map((m) => ({ type: 'image' as const, url: m.url })),
                    idx,
                  )
                }
              >
                <img
                  src={img.url}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={`Bằng chứng ${idx + 1}`}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wide">
                  Xem ảnh
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
