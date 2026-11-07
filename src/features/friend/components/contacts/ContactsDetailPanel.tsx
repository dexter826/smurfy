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
import { UserAvatar, UserStatusText, Button, IconButton } from '@/components/ui';
import { toDate } from '@/utils/dateUtils';
import { useAuthStore } from '@/features/auth';

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

  if (!selectedUser) {
    return (
      <aside className="hidden xl:flex flex-col w-[320px] border-l border-border bg-surface flex-shrink-0 h-full p-6 items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-surface-sunken flex items-center justify-center text-muted mb-4 border border-border">
          <Users size={26} />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Chi tiết liên hệ</h3>
        <p className="text-xs text-muted leading-relaxed max-w-[220px]">
          Chọn một người dùng trong danh sách để xem thông tin chi tiết và thao tác nhanh.
        </p>
      </aside>
    );
  }

  const suggestion = currentUser?.suggestedFriends?.find((s) => s.id === selectedUser.id);
  const mutualCount = suggestion?.mutualCount || 0;

  return (
    <aside className="hidden xl:flex flex-col w-[320px] border-l border-border bg-surface flex-shrink-0 h-full overflow-hidden">
      {/* Header with close button */}
      <div className="relative h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-background flex-shrink-0">
        <div className="absolute top-3 right-3" style={{ zIndex: 'var(--z-sticky)' }}>
          <IconButton
            icon={<X size={16} />}
            size="sm"
            variant="secondary"
            onClick={onClose}
            aria-label="Đóng chi tiết"
          />
        </div>
      </div>

      {/* Avatar & Basic Info */}
      <div className="px-5 pb-5 -mt-12 flex-1 overflow-y-auto scroll-hide">
        <div className="relative inline-block mb-3">
          <div className="p-1 bg-surface rounded-full shadow-md">
            <UserAvatar
              userId={selectedUser.id}
              src={selectedUser.avatar?.url}
              name={selectedUser.fullName}
              size="xl"
            />
          </div>
        </div>

        <h3 className="text-base font-bold text-foreground truncate">{selectedUser.fullName}</h3>
        <div className="mt-0.5">
          <UserStatusText userId={selectedUser.id} className="text-xs font-medium" />
        </div>

        {selectedUser.bio && (
          <p className="mt-3 text-xs text-secondary italic bg-background p-3 rounded-xl border border-border leading-relaxed">
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
        <div className="mt-5 space-y-2.5 pt-4 border-t border-border">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Thông tin</p>

          {selectedUser.email && (
            <div className="flex items-center gap-2.5 text-xs text-secondary">
              <Mail size={14} className="text-muted flex-shrink-0" />
              <span className="truncate">{selectedUser.email}</span>
            </div>
          )}

          {selectedUser.location && (
            <div className="flex items-center gap-2.5 text-xs text-secondary">
              <MapPin size={14} className="text-muted flex-shrink-0" />
              <span className="truncate">{selectedUser.location}</span>
            </div>
          )}

          {selectedUser.school && (
            <div className="flex items-center gap-2.5 text-xs text-secondary">
              <GraduationCap size={14} className="text-muted flex-shrink-0" />
              <span className="truncate">{selectedUser.school}</span>
            </div>
          )}

          {selectedUser.dob && (
            <div className="flex items-center gap-2.5 text-xs text-secondary">
              <Cake size={14} className="text-muted flex-shrink-0" />
              <span>{toDate(selectedUser.dob)?.toLocaleDateString('vi-VN')}</span>
            </div>
          )}

          {selectedUser.gender && (
            <div className="flex items-center gap-2.5 text-xs text-secondary">
              <Users size={14} className="text-muted flex-shrink-0" />
              <span>{GENDER_LABELS[selectedUser.gender as Gender] || selectedUser.gender}</span>
            </div>
          )}

          {mutualCount > 0 && (
            <div className="flex items-center gap-2.5 text-xs text-secondary">
              <Users size={14} className="text-primary flex-shrink-0" />
              <span className="font-medium text-foreground">{mutualCount} bạn chung</span>
            </div>
          )}
        </div>

        {/* Destructive / secondary actions */}
        <div className="mt-6 pt-4 border-t border-border space-y-1">
          {isFriend && (
            <button
              onClick={() => onUnfriend(selectedUser.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/10 rounded-xl transition-colors text-left"
            >
              <UserX size={15} />
              <span>Hủy kết bạn</span>
            </button>
          )}

          <button
            onClick={() => onBlock(selectedUser)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-secondary hover:text-foreground hover:bg-hover rounded-xl transition-colors text-left"
          >
            <Ban size={15} />
            <span>Quản lý chặn</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
