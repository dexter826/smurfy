import React from 'react';
import { Users, ShieldCheck, Clock } from 'lucide-react';
import { MediaObject } from '@shared/types';
import { Modal, Button, Avatar } from '@/components/ui';

interface JoinGroupModalProps {
  open: boolean;
  onOpenChange: () => void;
  onJoin: () => void;
  isLoading?: boolean;
  groupInfo: {
    name: string;
    avatar?: MediaObject;
    members?: any[];
    memberCount: number;
    isMember?: boolean;
    isPending?: boolean;
    joinApprovalMode?: boolean;
  } | null;
}

/**
 * Modal hiển thị thông tin chi tiết của nhóm trước khi người dùng xác nhận tham gia
 */
export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({
  open,
  onOpenChange,
  onJoin,
  isLoading,
  groupInfo,
}) => {
  if (!groupInfo) return null;

  const { name, avatar, members, memberCount, isMember, isPending, joinApprovalMode } = groupInfo;

  const renderFooter = (
    <div className="flex gap-3 w-full">
      <Button variant="secondary" onClick={onOpenChange} className="flex-1">
        Bỏ qua
      </Button>
      {!isMember && !isPending && (
        <Button onClick={onJoin} isLoading={isLoading} className="flex-1">
          {joinApprovalMode ? 'Gửi yêu cầu' : 'Tham gia ngay'}
        </Button>
      )}
      {isMember && (
        <Button onClick={onJoin} className="flex-1">
          Vào trò chuyện
        </Button>
      )}
      {isPending && (
        <Button disabled className="flex-1 bg-surface-2 text-ink-3 border-none">
          Đang chờ duyệt
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Tham gia nhóm"
      size="sm"
      footer={renderFooter}
    >
      <div className="flex flex-col items-center py-4 space-y-6">
        {/* Group Avatar */}
        <Avatar
          src={avatar}
          name={name}
          size="xl"
          isGroup={true}
          members={members}
          className="relative z-10"
        />

        {/* Group Info */}
        <div className="text-center space-y-2 relative z-10 w-full px-2">
          <h2 className="text-xl font-bold text-ink line-clamp-2">{name}</h2>

          <div className="flex items-center justify-center gap-4 text-sm text-ink-2">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-accent" />
              <span>{memberCount} thành viên</span>
            </div>

            {joinApprovalMode ? (
              <div className="flex items-center gap-1.5 text-warning">
                <Clock size={14} />
                <span>Cần duyệt</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-success">
                <ShieldCheck size={14} />
                <span>Tham gia ngay</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {isMember && (
          <div className="px-3 py-1 bg-success-soft text-success text-caption font-semibold rounded-full border border-success/20">
            Bạn đã là thành viên
          </div>
        )}
        {isPending && (
          <div className="px-3 py-1 bg-warning-soft text-warning text-caption font-semibold rounded-full border border-warning/20">
            Yêu cầu đang chờ phê duyệt
          </div>
        )}

        {/* Description/Note */}
        {!isMember && !isPending && (
          <p className="text-xs text-ink-3 text-center leading-relaxed max-w-[280px]">
            {joinApprovalMode
              ? 'Yêu cầu tham gia của bạn sẽ được Quản trị viên xem xét trước khi vào nhóm.'
              : 'Bạn có thể bắt đầu trò chuyện ngay sau khi nhấn nút tham gia.'}
          </p>
        )}
      </div>
    </Modal>
  );
};
