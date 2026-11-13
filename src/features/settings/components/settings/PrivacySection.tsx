import React, { useCallback } from 'react';
import {
  Eye,
  MessageCircle,
  Users,
  Lock,
  ChevronDown,
  Globe,
  CheckCheck,
  MessageSquareQuote,
} from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { userService } from '@/services/userService';
import { presenceService } from '@/features/presence';
import { Visibility } from '@shared/types';
import { Skeleton, Dropdown, DropdownItem, Switch } from '@/components/ui';
import SettingItem from './SettingItem';

const PrivacySection: React.FC = () => {
  const { user: currentUser, settings, updateSettings } = useAuthStore();

  const handleToggleOnlineStatus = useCallback(async () => {
    if (!currentUser || !settings) return;
    const newValue = !settings.showOnlineStatus;
    updateSettings({ showOnlineStatus: newValue });
    await userService.updateUserSettings(currentUser.id, { showOnlineStatus: newValue });
    await presenceService.setOnline(currentUser.id).catch(console.error);
  }, [currentUser, settings, updateSettings]);

  const handleToggleReadReceipts = useCallback(async () => {
    if (!currentUser || !settings) return;
    const newValue = !settings.showReadReceipts;
    updateSettings({ showReadReceipts: newValue });
    await userService.updateUserSettings(currentUser.id, { showReadReceipts: newValue });
  }, [currentUser, settings, updateSettings]);

  const handleToggleAllowMessagesFromStrangers = useCallback(async () => {
    if (!currentUser || !settings) return;
    const newValue = !settings.allowMessagesFromStrangers;
    updateSettings({ allowMessagesFromStrangers: newValue });
    await userService.updateUserSettings(currentUser.id, { allowMessagesFromStrangers: newValue });
  }, [currentUser, settings, updateSettings]);

  const handleChangeVisibility = useCallback(
    async (visibility: Visibility) => {
      if (!currentUser) return;
      updateSettings({ defaultPostVisibility: visibility });
      await userService.updateUserSettings(currentUser.id, { defaultPostVisibility: visibility });
    },
    [currentUser, updateSettings],
  );

  if (!settings || !currentUser) return <Skeleton height={200} className="rounded-card" />;

  const visibilityMap: Record<Visibility, { label: string; Icon: typeof Users }> = {
    [Visibility.PUBLIC]: { label: 'Công khai', Icon: Globe },
    [Visibility.FRIENDS]: { label: 'Bạn bè', Icon: Users },
    [Visibility.PRIVATE]: { label: 'Chỉ mình tôi', Icon: Lock },
  };

  const { label: visibilityLabel, Icon: VisibilityIcon } =
    visibilityMap[settings.defaultPostVisibility] ?? visibilityMap[Visibility.FRIENDS];

  return (
    <div className="space-y-3 animate-fade-in">
      <SettingItem
        icon={<Eye size={18} />}
        title="Trạng thái online"
        description="Cho phép người khác thấy bạn đang hoạt động"
        action={
          <Switch
            checked={settings.showOnlineStatus}
            onCheckedChange={handleToggleOnlineStatus}
            aria-label="Trạng thái online"
          />
        }
      />

      <SettingItem
        icon={<CheckCheck size={18} />}
        title="Thông báo đã xem"
        description="Cho phép người khác biết khi bạn đã xem tin nhắn"
        action={
          <Switch
            checked={settings.showReadReceipts}
            onCheckedChange={handleToggleReadReceipts}
            aria-label="Thông báo đã xem"
          />
        }
      />

      <SettingItem
        icon={<MessageSquareQuote size={18} />}
        title="Tin nhắn từ người lạ"
        description="Cho phép người lạ khởi đầu cuộc trò chuyện với bạn"
        action={
          <Switch
            checked={settings.allowMessagesFromStrangers}
            onCheckedChange={handleToggleAllowMessagesFromStrangers}
            aria-label="Tin nhắn từ người lạ"
          />
        }
      />

      {/* Post visibility */}
      <div className="p-4 bg-surface rounded-card border border-line">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-9 h-9 bg-accent/10 rounded-control flex items-center justify-center text-accent flex-shrink-0">
            <Users size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">Quyền riêng tư bài viết mặc định</h3>
            <p className="text-xs text-ink-3 mt-0.5">Áp dụng cho các bài viết mới của bạn</p>
          </div>
        </div>

        <Dropdown
          align="left"
          className="w-full"
          matchTriggerWidth
          trigger={
            <div className="flex items-center justify-between w-full px-3.5 py-2.5 bg-canvas rounded-control border border-line hover:bg-surface-2 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <VisibilityIcon size={16} className="text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-ink">{visibilityLabel}</span>
              </div>
              <ChevronDown size={15} className="text-ink-3" />
            </div>
          }
        >
          <DropdownItem
            icon={<Globe size={15} />}
            label="Công khai"
            onClick={() => handleChangeVisibility(Visibility.PUBLIC)}
          />
          <DropdownItem
            icon={<Users size={15} />}
            label="Bạn bè"
            onClick={() => handleChangeVisibility(Visibility.FRIENDS)}
          />
          <DropdownItem
            icon={<Lock size={15} />}
            label="Chỉ mình tôi"
            onClick={() => handleChangeVisibility(Visibility.PRIVATE)}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default React.memo(PrivacySection);
