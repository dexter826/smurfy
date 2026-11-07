import React from 'react';
import { UserAvatar, Button, SensitiveMediaGuard } from '@/components/ui';
import { formatRelativeTime } from '@/utils/dateUtils';
import { UserViolationSummary, getAIModerationLabel } from './types';
import { ReportEvidenceCard } from './ReportEvidenceCard';

interface ModerationMobileSheetProps {
  selectedSummary: UserViolationSummary | null;
  onClose: () => void;
  onOpenConfirmBan: () => void;
  onOpenMedia: (mediaList: any[], index?: number) => void;
}

export const ModerationMobileSheet: React.FC<ModerationMobileSheetProps> = ({
  selectedSummary,
  onClose,
  onOpenConfirmBan,
  onOpenMedia,
}) => {
  if (!selectedSummary) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-surface flex flex-col animate-slide-in-right">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0 bg-surface">
        <button
          onClick={onClose}
          className="text-sm font-semibold text-secondary hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-hover active:bg-active transition-colors"
        >
          Quay lại
        </button>
        <h3 className="text-sm font-bold text-foreground">
          Chi tiết bằng chứng
        </h3>
        <Button
          variant="danger"
          size="sm"
          onClick={onOpenConfirmBan}
        >
          Khóa
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-sunken/20">
        <div className="bg-surface p-4 rounded-2xl border border-border flex items-center gap-3 shadow-xs">
          <UserAvatar
            userId={selectedSummary.userId}
            src={selectedSummary.avatarUrl}
            name={selectedSummary.fullName}
            size="md"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-foreground truncate">{selectedSummary.fullName}</h4>
            <p className="text-xs text-muted truncate">{selectedSummary.email}</p>
          </div>
        </div>

        {/* AI Flags */}
        {(selectedSummary.posts.length > 0 || selectedSummary.comments.length > 0) && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">
              Nội dung bị gắn cờ
            </h4>
            {selectedSummary.posts.map((post) => (
              <div
                key={post.id}
                className="bg-surface p-3.5 rounded-xl border border-border space-y-2 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-danger uppercase">
                    Bài viết — {getAIModerationLabel(post.moderationReason)}
                  </span>
                  <p className="text-[10px] text-muted">{formatRelativeTime(post.createdAt)}</p>
                </div>
                {post.content && (
                  <p className="text-xs text-foreground leading-relaxed">{post.content}</p>
                )}
                {post.media && post.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5 max-w-xs mt-1">
                    {post.media.map((med, idx) => (
                      <SensitiveMediaGuard
                        key={idx}
                        isSensitive={true}
                        size="sm"
                        className="aspect-video rounded-lg border border-border overflow-hidden"
                      >
                        <img
                          src={med.url}
                          alt="Bằng chứng"
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => onOpenMedia(post.media, idx)}
                        />
                      </SensitiveMediaGuard>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {selectedSummary.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-surface p-3.5 rounded-xl border border-border space-y-2 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-warning uppercase">
                    Bình luận — {getAIModerationLabel(comment.moderationReason)}
                  </span>
                  <p className="text-[10px] text-muted">{formatRelativeTime(comment.createdAt)}</p>
                </div>
                {comment.content && (
                  <p className="text-xs text-foreground leading-relaxed">{comment.content}</p>
                )}
                {comment.image && (
                  <div className="max-w-[150px] mt-1">
                    <SensitiveMediaGuard
                      isSensitive={true}
                      size="sm"
                      className="aspect-video rounded-lg border border-border overflow-hidden"
                    >
                      <img
                        src={comment.image.url}
                        alt="Bằng chứng bình luận"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onOpenMedia([comment.image])}
                      />
                    </SensitiveMediaGuard>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Community Reports */}
        {selectedSummary.reports.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">
              Báo cáo đã xử lý
            </h4>
            {selectedSummary.reports.map((report) => (
              <ReportEvidenceCard
                key={report.id}
                report={report}
                onOpenMedia={onOpenMedia}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
