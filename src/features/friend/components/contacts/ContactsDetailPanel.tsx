import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  ExternalLink,
  MapPin,
  GraduationCap,
  Cake,
  Users,
  UserX,
  Ban,
  X,
  Mail,
} from 'lucide-react';
import { User, Gender, GENDER_LABELS } from '@shared/types';
import { UserAvatar, UserStatusText, Button, IconButton, SlideUpSheet } from '@/components/ui';
import { toDate } from '@/utils/dateUtils';
import { useAuthStore } from '@/features/auth';
import { useMediaQuery } from '@/hooks/utils/useMediaQuery';

interface ContactsDetailPanelProps {
  selectedUser: User | null;
  onClose: () => void;
  onMessage: (userId: string) => void;
  onUnfriend: (userId: string) => void;
  onBlock: (user: User) => void;
  isFriend: boolean;
}

export const ContactsDetailPanel: React.FC<ContactsDetailPanelProps> = ({
  selectedUser,
  onClose,
  onMessage,
  onUnfriend,
  onBlock,
  isFriend,
}) => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (!selectedUser) {
    if (!isDesktop) return null;
    return (
      <aside className="flex flex-col w-[320px] border-l border-line bg-surface flex-shrink-0 h-full p-6 items-center justify-center text-center">
        <div className="w-14 h-14 rounded-card bg-surface-2 flex items-center justify-center text-ink-3 mb-4 border border-line">
          <Users size={26} />
        </div>
        <h3 className="text-sm font-semibold text-ink mb-1">Chi tiết liên hệ</h3>
        <p className="text-xs text-ink-3 leading-relaxed max-w-[220px]">
          Chọn một người dùng trong danh sách để xem thông tin chi tiết và thao tác nhanh.
        </p>
      </aside>
    );
  }

  const suggestion = currentUser?.suggestedFriends?.find((s) => s.id === selectedUser.id);
  const mutualCount = suggestion?.mutualCount || 0;

  const detailContent = (
    <div className="px-5 pb-5">
      <div className="relative inline-block mb-3 flex flex-col items-center">
        <div className="p-1 bg-surface rounded-full shadow-md">
          <UserAvatar
            userId={selectedUser.id}
            src={selectedUser.avatar?.url}
            name={selectedUser.fullName}
            size="xl"
          />
        </div>
      </div>

      <h3 className="text-base font-bold text-ink truncate text-center w-full">
        {selectedUser.fullName}
      </h3>
      <div className="mt-0.5 text-center">
        <UserStatusText userId={selectedUser.id} className="text-xs font-medium" />
      </div>

      {selectedUser.bio && (
        <p className="mt-3 text-xs text-ink-2 italic bg-surface-2 p-3 rounded-card border border-line leading-relaxed">
          "{selectedUser.bio}"
        </p>
      )}

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          size="sm"
          variant="primary"
          icon={<MessageCircle size={15} />}
          onClick={() => onMessage(selectedUser.id)}
          fullWidth
        >
          Nhắn tin
        </Button>
        <Button
          size="sm"
          variant="secondary"
          icon={<ExternalLink size={15} />}
          onClick={() => navigate(`/profile/${selectedUser.id}`)}
          fullWidth
        >
          Hồ sơ
        </Button>
      </div>

      {/* Details list */}
      <div className="mt-5 space-y-2.5 pt-4 border-t border-line">
        <p className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">Thông tin</p>

        {selectedUser.email && (
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <Mail size={14} className="text-ink-3 flex-shrink-0" />
            <span className="truncate">{selectedUser.email}</span>
          </div>
        )}

        {selectedUser.location && (
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <MapPin size={14} className="text-ink-3 flex-shrink-0" />
            <span className="truncate">{selectedUser.location}</span>
          </div>
        )}

        {selectedUser.school && (
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <GraduationCap size={14} className="text-ink-3 flex-shrink-0" />
            <span className="truncate">{selectedUser.school}</span>
          </div>
        )}

        {selectedUser.dob && (
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <Cake size={14} className="text-ink-3 flex-shrink-0" />
            <span>{toDate(selectedUser.dob)?.toLocaleDateString('vi-VN')}</span>
          </div>
        )}

        {selectedUser.gender && (
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <Users size={14} className="text-ink-3 flex-shrink-0" />
            <span>{GENDER_LABELS[selectedUser.gender as Gender] || selectedUser.gender}</span>
          </div>
        )}

        {mutualCount > 0 && (
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <Users size={14} className="text-accent flex-shrink-0" />
            <span className="font-medium text-ink">{mutualCount} bạn chung</span>
          </div>
        )}
      </div>

      {/* Destructive / secondary actions */}
      <div className="mt-6 pt-4 border-t border-line space-y-1">
        {isFriend && (
          <button
            onClick={() => onUnfriend(selectedUser.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/10 rounded-control transition-colors text-left"
          >
            <UserX size={15} />
            <span>Hủy kết bạn</span>
          </button>
        )}

        <button
          onClick={() => onBlock(selectedUser)}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-ink-2 hover:text-ink hover:bg-surface-2 rounded-control transition-colors text-left"
        >
          <Ban size={15} />
          <span>Quản lý chặn</span>
        </button>
      </div>
    </div>
  );

  // ≥1024: panel phải inline (DESIGN §4 — Bạn bè giữ panel phải từ 1024)
  if (isDesktop) {
    return (
      <aside className="flex flex-col w-[320px] border-l border-line bg-surface flex-shrink-0 h-full overflow-hidden">
        <div className="flex justify-end px-3 pt-3">
          <IconButton
            icon={<X size={16} />}
            size="sm"
            variant="secondary"
            onClick={onClose}
            aria-label="Đóng chi tiết"
          />
        </div>
        <div className="flex-1 overflow-y-auto scroll-hide">{detailContent}</div>
      </aside>
    );
  }

  // <1024: sheet trượt từ dưới
  return (
    <SlideUpSheet
      open={!!selectedUser}
      onOpenChange={onClose}
      title="Chi tiết liên hệ"
      size="lg"
      showHandle
    >
      {detailContent}
    </SlideUpSheet>
  );
};
