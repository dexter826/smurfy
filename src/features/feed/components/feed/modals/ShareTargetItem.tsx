import React from 'react';
import { Check } from 'lucide-react';
import { UserAvatar } from '@/components/ui';
import { User, UserStatus } from '@shared/types';
import { useConversationParticipants } from '@/features/chat';
import { ShareableEntry } from '@/features/chat';

interface ShareTargetItemProps {
  entry: ShareableEntry;
  currentUserId: string;
  usersMap: Record<string, User>;
  selected: boolean;
  onToggle: () => void;
  variant?: 'vertical' | 'horizontal';
}

/** Item hiển thị đích đến (người dùng/nhóm) khi chia sẻ */
export const ShareTargetItem: React.FC<ShareTargetItemProps> = ({
  entry,
  currentUserId,
  usersMap,
  selected,
  onToggle,
  variant = 'vertical',
}) => {
  const isGroup = entry.type === 'conversation' && entry.item.data.isGroup;

  let partner: User | undefined;
  let title = '';
  let avatarUrl = '';

  if (entry.type === 'conversation') {
    const conv = entry.item.data;
    const partnerId = Object.keys(conv.members).find((uid) => uid !== currentUserId) || '';
    partner = usersMap[partnerId];
    title = (isGroup ? conv.name : partner?.fullName) || (isGroup ? 'Nhóm' : 'Người dùng');
    avatarUrl = (isGroup ? conv.avatar?.url : partner?.avatar?.url) || '';
  } else {
    partner = entry.item;
    title = partner.fullName || 'Người dùng';
    avatarUrl = partner.avatar?.url || '';
  }

  const participantIds =
    isGroup && entry.type === 'conversation' ? Object.keys(entry.item.data.members) : [];
  const groupParticipants = useConversationParticipants(participantIds);

  if (variant === 'horizontal') {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="flex flex-col items-center gap-2 w-16 shrink-0 group relative outline-none"
      >
        <div className="relative w-11 h-11 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              selected
                ? 'border-[2px] border-accent scale-100 opacity-100'
                : 'border-transparent scale-90 opacity-0'
            }`}
          />

          <UserAvatar
            userId={isGroup ? '' : partner?.id || ''}
            src={avatarUrl}
            name={title}
            size="md"
            isGroup={isGroup}
            members={groupParticipants}
            showBorder={false}
            className={`transition-all duration-300 z-10 ${
              selected ? 'scale-[0.82]' : 'group-hover:scale-105'
            }`}
          />

          {/* Badge Check Indicator */}
          {selected && (
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-accent text-on-accent border-2 border-surface flex items-center justify-center shadow-md z-20 animate-in zoom-in-50 duration-300">
              <Check size={8} strokeWidth={5} />
            </div>
          )}
        </div>
        <span
          className={`text-[10px] font-bold truncate w-full text-center transition-colors px-1 ${
            selected ? 'text-accent-strong' : 'text-ink-2 group-hover:text-ink'
          }`}
        >
          {title.split(' ')[title.split(' ').length - 1]}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-card border transition-all duration-200 group ${
        selected
          ? 'border-accent/40 bg-accent/5 shadow-sm'
          : 'border-transparent hover:bg-surface-2/50'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
        <UserAvatar
          userId={isGroup ? '' : partner?.id || ''}
          src={avatarUrl}
          name={title}
          size="sm"
          isGroup={isGroup}
          members={groupParticipants}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-ink truncate transition-colors">{title}</span>
          {isGroup && entry.type === 'conversation' && (
            <span className="text-[11px] text-ink-3 truncate">
              Nhóm • {Object.keys(entry.item.data.members).length} thành viên
            </span>
          )}
          {entry.type === 'friend' && (
            <span className="text-[11px] text-ink-3 truncate">Bạn bè</span>
          )}
        </div>
      </div>

      <div
        className={`w-5 h-5 shrink-0 rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
          selected
            ? 'border-accent bg-accent text-on-accent'
            : 'border-line bg-surface group-hover:border-accent/50'
        }`}
      >
        {selected && (
          <Check size={13} strokeWidth={3} className="animate-in zoom-in-50 duration-200" />
        )}
      </div>
    </button>
  );
};
