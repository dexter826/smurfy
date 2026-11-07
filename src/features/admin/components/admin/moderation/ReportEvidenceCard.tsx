import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Report, REPORT_REASON_LABELS } from '@shared/types';
import { Skeleton, SensitiveMediaGuard } from '@/components/ui';
import { formatRelativeTime } from '@/utils/dateUtils';
import { postService } from '@/features/feed';
import { commentService } from '@/features/comment';

interface ReportEvidenceCardProps {
  report: Report;
  onOpenMedia: (mediaList: any[], index?: number) => void;
}

export const ReportEvidenceCard: React.FC<ReportEvidenceCardProps> = ({ report, onOpenMedia }) => {
  const [content, setContent] = useState<string | null>(null);
  const [media, setMedia] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (report.targetType === 'user') return;

    const fetchContent = async () => {
      setIsLoading(true);
      try {
        if (report.targetType === 'post') {
          const post = await postService.getPostByIdForAdmin(report.targetId);
          if (post) {
            setContent(post.content || '(Không có nội dung văn bản)');
            setMedia(post.media || null);
          } else {
            setContent('(Nội dung không còn tồn tại)');
          }
        } else if (report.targetType === 'comment') {
          const comment = await commentService.getCommentById(report.targetId, true);
          if (comment) {
            setContent(comment.content || '(Không có nội dung văn bản)');
            if (comment.image) {
              setMedia([comment.image]);
            }
          } else {
            setContent('(Nội dung không còn tồn tại)');
          }
        }
      } catch (err: any) {
        console.error('Lỗi tải nội dung bị báo cáo:', err);
        setContent(`(Không thể tải nội dung gốc: ${err.message || err})`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [report]);

  const isLongText = content ? content.length > 180 : false;
  const displayText = content
    ? isLongText && !isExpanded
      ? `${content.slice(0, 180)}...`
      : content
    : '';

  return (
    <div className="bg-surface p-4 rounded-2xl border border-border space-y-3 shadow-xs transition-theme">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-danger/10 text-danger uppercase border border-danger/20">
          {REPORT_REASON_LABELS[report.reason] || 'Báo cáo vi phạm'}
        </span>
        <span className="text-xs text-muted">
          {formatRelativeTime(report.createdAt)}
        </span>
      </div>

      {report.targetType !== 'user' && (
        <div className="p-3 bg-surface-sunken/60 rounded-xl border border-border/40 space-y-2">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">
            Nội dung gốc bị báo cáo:
          </p>
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <>
              {content && (
                <div className="space-y-1">
                  <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                    {displayText}
                  </p>
                  {isLongText && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-[10px] font-bold text-primary hover:underline"
                    >
                      {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                  )}
                </div>
              )}
              {media && media.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 max-w-xs mt-1.5">
                  {media.map((med, idx) => (
                    <SensitiveMediaGuard
                      key={idx}
                      isSensitive={true}
                      size="xs"
                      className="aspect-video rounded-lg border border-border overflow-hidden"
                    >
                      <img
                        src={med.url}
                        alt="Bằng chứng gốc"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onOpenMedia(media, idx)}
                      />
                    </SensitiveMediaGuard>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {report.description && (
        <div className="bg-surface-sunken/40 p-3 rounded-xl border border-border/50">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
            Mô tả lý do từ người báo cáo:
          </p>
          <p className="text-sm text-secondary italic">
            "{report.description}"
          </p>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-xs text-success font-semibold mt-1">
        <CheckCircle2 size={13} className="text-success" />
        <span>Quyết định xử lý: {report.resolution || 'Xác nhận vi phạm'}</span>
      </div>
    </div>
  );
};
