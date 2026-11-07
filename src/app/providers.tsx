import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { useSelfPresence } from '@/features/presence';
import {
  ConnectionStatus,
  ErrorBoundary,
  ToastContainer,
  ReportModal,
  TooltipProvider,
} from '@/components/ui';

const GlobalPresenceManager: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useSelfPresence(user, isAdminRoute);

  return null;
};

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <TooltipProvider>
      <BrowserRouter>
        <GlobalPresenceManager />
        {children}
        <ConnectionStatus />
        <ToastContainer />
        <ReportModal />
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default AppProviders;
