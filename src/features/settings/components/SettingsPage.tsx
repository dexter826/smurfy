import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Ban, Shield, Eye, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { useUserCache } from '@/store/userCacheStore';
import { useLoadingStore } from '@/store/loadingStore';
import { BlockOptions } from '@shared/types';
import { usePostStore } from '@/store';
import { AlertDialog } from '@/components/ui';
import { CONFIRM_MESSAGES } from '@/constants';
import { userService } from '@/services/userService';
import { toast } from '@/store/toastStore';
import { TOAST_MESSAGES } from '@/constants';
import PrivacySection from './settings/PrivacySection';
import SecuritySection from './settings/SecuritySection';
import BlockedUsersSection, { BlockedUserWithOptions } from './settings/BlockedUsersSection';
import ChangePasswordModal from './settings/ChangePasswordModal';
import { BlockOptionsModal } from '@/components/ui/BlockOptionsModal';

type SettingSection = 'privacy' | 'security' | 'blocked';

const MENU_ITEMS: { id: SettingSection; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'privacy', label: 'Quyền riêng tư', icon: <Eye size={18} />, desc: 'Trạng thái, bài viết, tin nhắn' },
  { id: 'security', label: 'Bảo mật', icon: <Shield size={18} />, desc: 'Mật khẩu và xác thực' },
  { id: 'blocked', label: 'Người dùng đã chặn', icon: <Ban size={18} />, desc: 'Quản lý danh sách chặn' },
];

const SettingsPage: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const { fetchUsers } = useUserCache();
  const setLoading = useLoadingStore(state => state.setLoading);
  const isLoading = useLoadingStore(state => state.loadingStates['settings']);

  const [activeSection, setActiveSection] = useState<SettingSection | null>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'privacy' : null
  );
  const [blockedList, setBlockedList] = useState<BlockedUserWithOptions[]>([]);
  const [unblockUserId, setUnblockUserId] = useState<string | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [manageBlockTarget, setManageBlockTarget] = useState<BlockedUserWithOptions | null>(null);

  const loadBlockedUsers = useCallback(async () => {
    if (!currentUser) return;
    setLoading('settings', true);
    try {
      const blockedMap = await userService.getBlockedUsers(currentUser.id);
      const ids = Object.keys(blockedMap);
      if (ids.length === 0) { setBlockedList([]); return; }
      await fetchUsers(ids);
      const cache = useUserCache.getState().users;
      setBlockedList(
        ids
          .map(id => cache[id] ? { user: cache[id], options: blockedMap[id] } : null)
          .filter((item): item is BlockedUserWithOptions => !!item)
      );
    } finally {
      setLoading('settings', false);
    }
  }, [currentUser?.id, fetchUsers, setLoading]);

  useEffect(() => { loadBlockedUsers(); }, [currentUser?.id]);

  const handleUnblock = useCallback(async () => {
    if (!unblockUserId || !currentUser) return;
    try {
      await useAuthStore.getState().updateBlockEntry('remove', unblockUserId);
      setBlockedList(prev => prev.filter(item => item.user.id !== unblockUserId));
      usePostStore.getState().refreshFeed(currentUser.id);
      toast.success(TOAST_MESSAGES.BLOCK.UNBLOCK_SUCCESS);
    } catch {
      toast.error(TOAST_MESSAGES.BLOCK.UNBLOCK_FAILED);
    } finally {
      setUnblockUserId(null);
    }
  }, [unblockUserId, currentUser]);

  const handleUpdateBlockOptions = useCallback(async (options: BlockOptions) => {
    if (!manageBlockTarget || !currentUser) return;
    const targetId = manageBlockTarget.user.id;

    const hasAnyOption = options.blockMessages || options.blockCalls
      || options.blockViewMyActivity || options.hideTheirActivity;
    if (!hasAnyOption) {
      setManageBlockTarget(null);
      try {
        await useAuthStore.getState().updateBlockEntry('remove', targetId);
        setBlockedList(prev => prev.filter(item => item.user.id !== targetId));
        usePostStore.getState().refreshFeed(currentUser.id);
        toast.success(TOAST_MESSAGES.BLOCK.UNBLOCK_SUCCESS);
      } catch {
        toast.error(TOAST_MESSAGES.BLOCK.UNBLOCK_FAILED);
      }
      return;
    }

    try {
      await useAuthStore.getState().updateBlockEntry('add', targetId, options);
      if (options.hideTheirActivity) usePostStore.getState().filterPostsByAuthor(targetId);

      setBlockedList(prev =>
        prev.map(item =>
          item.user.id === targetId ? { ...item, options: { ...item.options, ...options } } : item
        )
      );
      toast.success(TOAST_MESSAGES.BLOCK.BLOCK_SUCCESS);
    } catch {
      toast.error(TOAST_MESSAGES.BLOCK.BLOCK_FAILED);
    } finally {
      setManageBlockTarget(null);
    }
  }, [manageBlockTarget, currentUser]);

  const currentLabel = useMemo(
    () => MENU_ITEMS.find(m => m.id === activeSection)?.label ?? 'Cài đặt',
    [activeSection]
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'privacy': return <PrivacySection />;
      case 'security': return <SecuritySection onOpenChangePassword={() => setIsChangePasswordOpen(true)} />;
      case 'blocked': return <BlockedUsersSection isLoading={!!isLoading} blockedList={blockedList} onManageBlock={setManageBlockTarget} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col w-[280px] lg:w-[320px] border-r border-border bg-surface flex-shrink-0">
        <div className="h-16 px-5 border-b border-border flex items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 btn-gradient rounded-xl flex items-center justify-center shadow-accent flex-shrink-0">
              <Settings size={16} className="text-white" />
            </div>
            <h1 className="text-base font-semibold text-foreground">Cài đặt</h1>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {MENU_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl transition-all duration-200 text-sm font-medium text-left
                ${activeSection === id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-secondary hover:bg-hover hover:text-foreground active:bg-active'
                }`}
            >
              <span className={`flex-shrink-0 ${activeSection === id ? 'text-primary' : 'text-muted'}`}>
                {icon}
              </span>
              <span className="flex-1">{label}</span>

            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex-col h-full min-w-0 flex">

        {/* Header */}
        <div
          className="flex-shrink-0 h-16 px-4 border-b border-border bg-surface flex items-center gap-2 sticky top-0"
          style={{ zIndex: 'var(--z-sticky)' }}
        >
          {activeSection && (
            <button
              onClick={() => setActiveSection(null)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-hover text-secondary transition-colors duration-200 -ml-1 flex-shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <h2 className="text-sm font-semibold text-foreground">{currentLabel}</h2>
        </div>

        <div className="flex-1 overflow-y-auto scroll-hide">
          {/* Mobile menu list */}
          {!activeSection && (
            <div className="p-4 space-y-2 animate-fade-in md:hidden">
              <p className="px-1 pb-1 text-xs font-semibold text-muted uppercase tracking-widest">
                Danh mục cài đặt
              </p>
              {MENU_ITEMS.map(({ id, label, icon, desc }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className="w-full flex items-center justify-between p-4 bg-surface rounded-2xl border border-border hover:bg-hover active:bg-active transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      {icon}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="text-xs text-muted mt-0.5">{desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {/* Section content */}
          <div className={`p-4 md:p-6 max-w-2xl mx-auto w-full ${!activeSection ? 'hidden md:block' : ''}`}>
            {renderContent()}
          </div>
        </div>
      </div>

      {/* ── Dialogs ── */}
      <AlertDialog
        open={!!unblockUserId}
        onOpenChange={() => setUnblockUserId(null)}
        onConfirm={handleUnblock}
        title={CONFIRM_MESSAGES.FRIEND.UNBLOCK.TITLE}
        message={CONFIRM_MESSAGES.FRIEND.UNBLOCK.MESSAGE(
          blockedList.find(item => item.user.id === unblockUserId)?.user.fullName ?? 'người này'
        )}
        confirmLabel={CONFIRM_MESSAGES.FRIEND.UNBLOCK.CONFIRM}
      />

      {manageBlockTarget && (
        <BlockOptionsModal
          open
          targetId={manageBlockTarget.user.id}
          targetName={manageBlockTarget.user.fullName}
          initialOptions={manageBlockTarget.options}
          onApply={handleUpdateBlockOptions}
          onUnblock={() => handleUpdateBlockOptions({ blockMessages: false, blockCalls: false, blockViewMyActivity: false, hideTheirActivity: false })}
          onOpenChange={() => setManageBlockTarget(null)}
        />
      )}

      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
};

export default SettingsPage;
