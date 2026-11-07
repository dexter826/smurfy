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
import { appNavItems, AppSidebar } from './AppSidebar';
import { BottomNav } from './BottomNav';
import { MobileTopBar } from './MobileTopBar';
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
    if (!user || useAuthStore.getState().isBanned) return;
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

  const isAdmin = user?.role === 'admin';
  const isChatRoom = location.pathname === '/' && !!selectedConversationId;
  const navItems = appNavItems(isAdmin, {
    unread: totalUnread,
    requests: receivedRequests.length,
    notifications: unreadNotifications,
  });

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden transition-theme">
      <AppSidebar variant="app" items={navItems} onLogout={() => setShowLogoutConfirm(true)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!isChatRoom && <MobileTopBar />}

        <main
          className={`flex-1 relative flex flex-col overflow-hidden ${isChatRoom ? '' : 'lg:pb-0 pb-[calc(3.5rem+env(safe-area-inset-bottom))]'}`}
        >
          <React.Suspense fallback={<Loading variant="page" />}>
            <Outlet />
          </React.Suspense>
        </main>

        {!isChatRoom && (
          <BottomNav
            unread={totalUnread}
            unreadNotifications={unreadNotifications}
            newRequests={receivedRequests.length}
          />
        )}
      </div>

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
