import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth';
import { SplashScreen } from '@/components/ui';
import { useNotifications } from '@/features/notification';
import AppProviders from './app/providers';
import AppRoutes from './app/router';

/** Gốc ứng dụng điều phối Splash và cây route. */
const App: React.FC = () => {
  const { isInitialized } = useAuthStore();
  const initializeAuth = useAuthStore(state => state.initialize);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = initializeAuth();

    if (typeof window !== 'undefined') {
      import('@/features/feed/components/FeedPage').catch(() => {});
      import('@/features/profile/components/ProfilePage').catch(() => {});
      import('@/features/friend/components/ContactsPage').catch(() => {});
    }

    return () => unsubscribeAuth();
  }, [initializeAuth]);

  useNotifications();

  if (showSplash) {
    return <SplashScreen isReady={isInitialized} onFinish={() => setShowSplash(false)} />;
  }

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
