import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { useSelfPresence } from '@/features/presence';
import { ConnectionStatus, ErrorBoundary, ToastContainer } from '@/components/ui';
import { ReportModal } from '@/components/ui/ReportModal';

/** Quản lý trạng thái hiện diện. */
const GlobalPresenceManager: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useSelfPresence(user, isAdminRoute);

  return null;
};

/** Vỏ provider toàn cục bao quanh cây route. */
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <BrowserRouter>
      <GlobalPresenceManager />
      {children}
      <ConnectionStatus />
      <ToastContainer />
      <ReportModal />
    </BrowserRouter>
  </ErrorBoundary>
);

export default AppProviders;
