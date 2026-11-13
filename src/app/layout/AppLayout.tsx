import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { useContactStore } from '@/features/friend';
import { useNotificationStore } from '@/features/notification';
import { useRtdbChatStore } from '../../store';
import { AlertDialog, Loading } from '@/components/ui';
import { useLogout } from '../../hooks/utils/useLogout';
import { CONFIRM_MESSAGES } from '../../constants';
import { useSoundUnlock, useDocumentTitle } from './hooks/useShellEffects';
import { Rail } from './Rail';
import { BottomNav } from './BottomNav';
import { GlobalModals } from './GlobalModals';

export const AppLayout: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const { subscribeToConversations, selectedConversationId } = useRtdbChatStore();
  const { receivedRequests, subscribeToRequests, subscribeToFriends } = useContactStore();
  const { initialize: initNotifications, unreadCount: unreadNotifications } =
    useNotificationStore();

  const handleConfirmLogout = useLogout();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useSoundUnlock();
  const totalUnread = useDocumentTitle();

  useEffect(() => {
    if (!user) return;
    const unsubChat = subscribeToConversations(user.id);
    const unsubRequests = subscribeToRequests(user.id);
    const unsubFriends = subscribeToFriends(user.id);
    const unsubNotifications = initNotifications(user.id);
    return () => {
      unsubChat();
      unsubRequests();
      unsubFriends();
      unsubNotifications();
    };
  }, [user, subscribeToConversations, subscribeToRequests, subscribeToFriends, initNotifications]);
  const isChatRoom = location.pathname === '/' && !!selectedConversationId;
  const badges = {
    unread: totalUnread,
    requests: receivedRequests.length,
    // Hoạt động = thông báo + lời mời kết bạn (spec #14)
    activity: unreadNotifications + receivedRequests.length,
  };

  return (
    <div className="flex h-[100dvh] w-full bg-canvas overflow-hidden transition-theme">
      <Rail badges={badges} onLogout={() => setShowLogoutConfirm(true)} />

      <main
        className={`flex-1 relative flex flex-col overflow-hidden ${
          isChatRoom ? '' : 'lg:pb-0 pb-[calc(3.5rem+env(safe-area-inset-bottom))]'
        }`}
      >
        <React.Suspense fallback={<Loading variant="page" />}>
          <Outlet />
        </React.Suspense>
      </main>

      {!isChatRoom && <BottomNav badges={badges} />}

      <AlertDialog
        open={showLogoutConfirm}
        onOpenChange={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
        title={CONFIRM_MESSAGES.AUTH.LOGOUT.TITLE}
        message={CONFIRM_MESSAGES.AUTH.LOGOUT.MESSAGE}
        confirmLabel={CONFIRM_MESSAGES.AUTH.LOGOUT.CONFIRM}
      />

      <GlobalModals />
    </div>
  );
};

export default AppLayout;
