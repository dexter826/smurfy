import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { Loading } from '@/components/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isPendingVerification, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <Loading variant="page" />;
  }

  if (isPendingVerification) {
    return <Navigate to="/verify-email" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
