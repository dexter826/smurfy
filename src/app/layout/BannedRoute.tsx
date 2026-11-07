import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { UserStatus } from '@shared/types';
import { Loading } from '@/components/ui';
import BannedPage from '../pages/BannedPage';

/** Bảo vệ route khi tài khoản bị khóa. */
const BannedRoute: React.FC = () => {
  const { user, isBanned, isInitialized } = useAuthStore();
  if (!isInitialized) return <Loading variant="page" />;
  if (!isBanned && user?.status !== UserStatus.BANNED) {
    return <Navigate to={user ? '/' : '/login'} replace />;
  }
  return <BannedPage />;
};

export default BannedRoute;
