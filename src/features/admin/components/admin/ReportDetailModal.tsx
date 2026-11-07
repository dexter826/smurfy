import React, { useState, useEffect, useCallback } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import {
  Report,
  ReportType,
  User,
  UserStatus,
  Post,
  Comment,
  PostStatus,
  CommentStatus,
  PostType,
} from '@shared/types';
import { reportService } from '../../services/reportService';
import { userService } from '@/services/userService';
import { postService } from '@/features/feed';
import { commentService } from '@/features/comment';
import { Skeleton, IconButton, AlertDialog, MediaViewer } from '@/components/ui';
import { TOAST_MESSAGES } from '@/constants';
import { formatDateTime } from '@/utils/dateUtils';
import { toast } from '@/store/toastStore';
import { useAuthStore } from '@/features/auth';
import {
  ActionType,
  ViewerState,
  VIEWER_CLOSED,
  ACTION_CONFIRM,
  StatusBadge,
  ReportContentSection,
  ReportMetadataSection,
} from './reportDetail';

interface ReportDetailModalProps {
  reportId: string;
  onOpenChange: () => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ reportId, onOpenChange }) => {
  const { user: currentUser } = useAuthStore();
  const [report, setReport] = useState<Report | null>(null);
  const [reporter, setReporter] = useState<User | null>(null);
  const [targetOwner, setTargetOwner] = useState<User | null>(null);
  const [content, setContent] = useState<Post | Comment | null>(null);
  const [resolver, setResolver] = useState<User | null>(null);
  const [, setDeleter] = useState<User | null>(null);
  const [viewer, setViewer] = useState<ViewerState>(VIEWER_CLOSED);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await reportService.getReportById(reportId);
        if (!data) {
          toast.error(TOAST_MESSAGES.REPORT.NOT_FOUND);
          onOpenChange();
          return;
        }
        setReport(data);

        const [rep, owner, res] = await Promise.all([
          userService.getUserById(data.reporterId),
          userService.getUserById(data.targetOwnerId),
          data.resolvedBy ? userService.getUserById(data.resolvedBy) : Promise.resolve(null),
        ]);
        setReporter(rep);
        setTargetOwner(owner);
        if (res) setResolver(res);

        if (data.targetType === ReportType.POST) {
          const post = await postService.getPostByIdForAdmin(data.targetId);
          setContent(post);
          if (post?.status === PostStatus.DELETED && post.deletedBy) {
            userService.getUserById(post.deletedBy).then(setDeleter);
          }
        } else if (data.targetType === ReportType.COMMENT) {
          const comment = await commentService.getCommentById(data.targetId, true);
          setContent(comment);
          if (comment?.status === CommentStatus.DELETED && comment.deletedBy) {
            userService.getUserById(comment.deletedBy).then(setDeleter);
          }
        }
      } catch {
        toast.error(TOAST_MESSAGES.REPORT.LOAD_DETAIL_FAILED);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [reportId, onOpenChange]);

  const isProfileUpdate =
    report?.targetType === ReportType.POST &&
    content &&
    'type' in content &&
    (content.type === PostType.AVATAR_UPDATE || content.type === PostType.COVER_UPDATE);

  const handleAction = useCallback(async () => {
    if (!report || !pendingAction || !currentUser || isProcessing) return;
    setIsProcessing(true);
    try {
      if (pendingAction === 'resolve') {
        await reportService.resolveReport(report.id, 'Đã xử lý xóa nội dung', 'delete_content');
        toast.success(TOAST_MESSAGES.REPORT.RESOLVE_SUCCESS);

        if (isProfileUpdate && targetOwner) {
          const field = (content as Post).type === PostType.AVATAR_UPDATE ? 'avatar' : 'cover';
          setTargetOwner({
            ...targetOwner,
            [field]: { url: '', fileName: '', mimeType: '', size: 0, isSensitive: false },
          });
        }
        if (content) {
          setContent({ ...content, status: 'deleted' } as any);
        }
      } else if (pendingAction === 'warn') {
        await reportService.resolveReport(report.id, 'Đã gửi cảnh báo', 'warn_user');
        toast.success(TOAST_MESSAGES.REPORT.WARN_SUCCESS);
      } else if (pendingAction === 'ban') {
        await reportService.resolveReport(report.id, 'Đã khóa tài khoản', 'ban_user');
        toast.success(TOAST_MESSAGES.REPORT.BAN_SUCCESS);
        if (targetOwner) {
          setTargetOwner({ ...targetOwner, status: UserStatus.BANNED });
        }
      } else if (pendingAction === 'reject') {
        await reportService.rejectReport(report.id);
        toast.success(TOAST_MESSAGES.REPORT.REJECT_SUCCESS);
      }

      const updatedReport = await reportService.getReportById(report.id);
      if (updatedReport) setReport(updatedReport);
    } catch {
      toast.error(TOAST_MESSAGES.REPORT.PROCESS_FAILED);
    } finally {
      setIsProcessing(false);
      setPendingAction(null);
    }
  }, [report, pendingAction, currentUser, isProcessing, isProfileUpdate, targetOwner, content]);

  const openViewer = useCallback((media: ViewerState['media'], index = 0) => {
    setViewer({ open: true, media, index });
  }, []);

  if (!report && !isLoading) return null;
  if (!currentUser) return null;

  const getConfirmMessage = () => {
    if (!pendingAction) return '';
    if (pendingAction === 'resolve' && isProfileUpdate) {
      return 'Xác nhận xóa nội dung vi phạm. Hành động này cũng sẽ gỡ bỏ ảnh hiện tại khỏi hồ sơ người dùng (về trạng thái chưa có ảnh).';
    }
    return ACTION_CONFIRM[pendingAction].message;
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        style={{ zIndex: 'var(--z-modal)' }}
        onClick={onOpenChange}
      >
        <div
          className="bg-surface w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-xl border border-border flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger/10 rounded-xl flex items-center justify-center text-danger flex-shrink-0 border border-danger/20">
                <ShieldAlert size={18} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground leading-tight">Chi tiết báo cáo</h2>
                {isLoading ? (
                  <Skeleton className="h-3 w-28 mt-1" />
                ) : (
                  <p className="text-xs text-muted mt-0.5">
                    {report ? formatDateTime(report.createdAt) : ''}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isLoading && report && <StatusBadge status={report.status} />}
              <IconButton icon={<X size={18} />} onClick={onOpenChange} variant="ghost" size="sm" />
            </div>
          </div>

          {/* Body Two Columns */}
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0">
            <ReportContentSection
              report={report}
              targetOwner={targetOwner}
              content={content}
              isLoading={isLoading}
              onOpenViewer={openViewer}
            />

            <ReportMetadataSection
              report={report}
              reporter={reporter}
              targetOwner={targetOwner}
              resolver={resolver}
              isLoading={isLoading}
              isProcessing={isProcessing}
              onSetPendingAction={setPendingAction}
              onClose={onOpenChange}
            />
          </div>
        </div>
      </div>

      {pendingAction && (
        <AlertDialog
          open
          onOpenChange={() => setPendingAction(null)}
          onConfirm={handleAction}
          title={ACTION_CONFIRM[pendingAction].title}
          message={getConfirmMessage()}
          variant={ACTION_CONFIRM[pendingAction].variant}
        />
      )}

      <MediaViewer
        media={viewer.media}
        initialIndex={viewer.index}
        open={viewer.open}
        onOpenChange={() => setViewer(VIEWER_CLOSED)}
      />
    </>
  );
};
