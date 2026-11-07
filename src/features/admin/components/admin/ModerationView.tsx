import React, { useState, useMemo, useCallback } from 'react';
import { ShieldAlert } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase/config';
import { AlertDialog, MediaViewer } from '@/components/ui';
import { toast } from '@/store/toastStore';
import {
  useModerationData,
  ModerationWatchlist,
  ModerationEvidencePanel,
  ModerationMobileSheet,
} from './moderation';

export const ModerationView: React.FC = () => {
  const { violationSummaries, isLoading } = useModerationData();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewerMedia, setViewerMedia] = useState<
    { type: 'image' | 'video'; url: string; isSensitive?: boolean }[]
  >([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openMediaViewer = useCallback((mediaList: any[], index: number = 0) => {
    const formatted = mediaList.map((m) => ({
      type: m.mimeType?.startsWith('video') ? ('video' as const) : ('image' as const),
      url: m.url,
      isSensitive: m.isSensitive ?? true,
    }));
    setViewerMedia(formatted);
    setViewerIndex(index);
    setIsViewerOpen(true);
  }, []);

  const selectedSummary = useMemo(() => {
    if (!selectedUserId) return null;
    return violationSummaries.find((s) => s.userId === selectedUserId) || null;
  }, [violationSummaries, selectedUserId]);

  const handleBanUser = useCallback(async () => {
    if (!selectedUserId || !selectedSummary || isProcessing) return;
    setIsProcessing(true);
    try {
      const reason = `Vi phạm tiêu chuẩn cộng đồng tích lũy: ${selectedSummary.strikes} lần vi phạm trong 7 ngày gần đây.`;
      await httpsCallable(
        functions,
        'banUser',
      )({
        userId: selectedUserId,
        action: 'ban',
        reason,
      });
      toast.success(`Đã đình chỉ hoạt động tài khoản ${selectedSummary.fullName}`);
      setSelectedUserId(null);
    } catch (err) {
      console.error('Lỗi khóa tài khoản:', err);
      toast.error('Không thể thực hiện hành động đình chỉ tài khoản');
    } finally {
      setIsProcessing(false);
      setIsConfirmOpen(false);
    }
  }, [selectedUserId, selectedSummary, isProcessing]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-surface px-4 md:px-6 py-4 border-b border-border flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-base font-bold text-foreground flex items-center gap-2">
            <ShieldAlert size={18} className="text-primary" />
            Quản lý vi phạm
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Giám sát và xử lý các tài khoản vi phạm tiêu chuẩn cộng đồng trong 7 ngày gần đây.
          </p>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden bg-background/30">
        <ModerationWatchlist
          isLoading={isLoading}
          summaries={violationSummaries}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />

        <ModerationEvidencePanel
          selectedSummary={selectedSummary}
          hasSummaries={violationSummaries.length > 0}
          onOpenConfirmBan={() => setIsConfirmOpen(true)}
          onOpenMedia={openMediaViewer}
        />

        <ModerationMobileSheet
          selectedSummary={selectedSummary}
          onClose={() => setSelectedUserId(null)}
          onOpenConfirmBan={() => setIsConfirmOpen(true)}
          onOpenMedia={openMediaViewer}
        />
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={isConfirmOpen}
        onOpenChange={() => setIsConfirmOpen(false)}
        onConfirm={handleBanUser}
        title="Xác nhận khóa tài khoản"
        message={
          selectedSummary
            ? `Tài khoản ${selectedSummary.fullName} sẽ bị đình chỉ hoạt động vĩnh viễn trên hệ thống.`
            : ''
        }
        confirmLabel="Đình chỉ"
        cancelLabel="Hủy"
        variant="danger"
      />

      {isViewerOpen && (
        <MediaViewer
          media={viewerMedia}
          initialIndex={viewerIndex}
          open={isViewerOpen}
          onOpenChange={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
};
