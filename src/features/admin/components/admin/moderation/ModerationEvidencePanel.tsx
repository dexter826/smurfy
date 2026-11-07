import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldOff,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { UserAvatar, Button, EmptyState, SensitiveMediaGuard } from '@/components/ui';
import { formatRelativeTime } from '@/utils/dateUtils';
import { UserViolationSummary, getAIModerationLabel } from './types';
import { ReportEvidenceCard } from './ReportEvidenceCard';

interface ModerationEvidencePanelProps {
  selectedSummary: UserViolationSummary | null;
  hasSummaries: boolean;
  onOpenConfirmBan: () => void;
  onOpenMedia: (mediaList: any[], index?: number) => void;
}

export const ModerationEvidencePanel: React.FC<ModerationEvidencePanelProps> = ({
  selectedSummary,
  hasSummaries,
  onOpenConfirmBan,
  onOpenMedia,
}) => {
  if (!selectedSummary) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-surface-sunken/20">
        {!hasSummaries ? (
          <EmptyState
            icon={ShieldAlert}
            title="Không có vi phạm"
            description="Không phát hiện tài khoản vi phạm chính sách cộng đồng."
            variant="boxed"
          />
        ) : (
          <EmptyState
            icon={FileText}
            title="Chưa chọn tài khoản"
            description="Chọn một tài khoản từ danh sách bên trái để xem chi tiết vi phạm."
            variant="boxed"
          />
        )}
      </div>
    );
  }

  const hasAIFlags = selectedSummary.posts.length > 0 || selectedSummary.comments.length > 0;
  const hasReports = selectedSummary.reports.length > 0;

  return (
    <div className="hidden md:flex flex-1 flex-col overflow-hidden bg-background/20">
      {/* Evidence Header */}
      <div className="bg-surface px-6 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar
            userId={selectedSummary.userId}
            src={selectedSummary.avatarUrl}
            name={selectedSummary.fullName}
            size="md"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate">
              {selectedSummary.fullName}
            </h3>
            <p className="text-xs text-muted truncate mt-0.5">
              {selectedSummary.email} • ID: {selectedSummary.userId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-danger/10 text-danger border border-danger/20 tabular-nums">
            <AlertTriangle size={13} /> Số lần vi phạm: {selectedSummary.strikes}
          </span>
          <Button
            variant="danger"
            size="sm"
            icon={<ShieldOff size={15} />}
            onClick={onOpenConfirmBan}
          >
            Khóa tài khoản
          </Button>
        </div>
      </div>

      {/* Evidence Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-sunken/15">
        {/* Section 1: AI Flags */}
        {hasAIFlags && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-primary" />
              Nội dung bị hệ thống kiểm duyệt
            </h4>

            <div className="space-y-3">
              {/* Posts */}
              {selectedSummary.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-surface p-4 rounded-2xl border border-border space-y-3 shadow-xs transition-theme"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase border border-primary/20">
                      <FileText size={10} /> Bài viết — Phát hiện: {getAIModerationLabel(post.moderationReason)}
                    </span>
                    <span className="text-xs text-muted">
                      {formatRelativeTime(post.createdAt)}
                    </span>
                  </div>

                  {post.content && (
                    <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>
                  )}

                  {post.media && post.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 max-w-md">
                      {post.media.map((med, idx) => (
                        <SensitiveMediaGuard
                          key={idx}
                          isSensitive={true}
                          size="sm"
                          className="aspect-video rounded-xl border border-border overflow-hidden"
                        >
                          <img
                            src={med.url}
                            alt="Bằng chứng bài viết"
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => onOpenMedia(post.media, idx)}
                          />
                        </SensitiveMediaGuard>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Comments */}
              {selectedSummary.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-surface p-4 rounded-2xl border border-border space-y-3 shadow-xs transition-theme"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-warning/10 text-warning uppercase border border-warning/20">
                      <MessageSquare size={10} /> Bình luận — Phát hiện: {getAIModerationLabel(comment.moderationReason)}
                    </span>
                    <span className="text-xs text-muted">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>

                  {comment.content && (
                    <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  )}

                  {comment.image && (
                    <div className="max-w-[200px]">
                      <SensitiveMediaGuard
                        isSensitive={true}
                        size="sm"
                        className="aspect-video rounded-xl border border-border overflow-hidden"
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
          </div>
        )}

        {/* Section 2: Reports */}
        {hasReports && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5 pt-2">
              <AlertTriangle size={14} className="text-danger" />
              Lịch sử bị cộng đồng báo cáo (Đã xử lý)
            </h4>

            <div className="space-y-3">
              {selectedSummary.reports.map((report) => (
                <ReportEvidenceCard
                  key={report.id}
                  report={report}
                  onOpenMedia={onOpenMedia}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
