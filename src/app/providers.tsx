import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { useSelfPresence } from '@/features/presence';
import { ConnectionStatus, ErrorBoundary, ToastContainer, TooltipProvider } from '@/components/ui';

const GlobalPresenceManager: React.FC = () => {
  const { user } = useAuthStore();
  useSelfPresence(user);
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
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default AppProviders;
