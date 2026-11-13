import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loading } from '@/components/ui';
import { AppLayout } from './layout/AppLayout';
import { ProtectedRoute } from './layout/ProtectedRoute';
import LoginPage from '@/features/auth/components/LoginPage';
import ChatPage from '@/features/chat/components/ChatPage';

const FeedPage = React.lazy(() => import('@/features/feed/components/FeedPage'));
const ContactsPage = React.lazy(() => import('@/features/friend/components/ContactsPage'));
const ProfilePage = React.lazy(() => import('@/features/profile/components/ProfilePage'));
const SettingsPage = React.lazy(() => import('@/features/settings/components/SettingsPage'));
const ActivityPage = React.lazy(() => import('@/features/notification/components/ActivityPage'));
const EmailVerificationPage = React.lazy(
  () => import('@/features/auth/components/EmailVerificationPage'),
);
const OnboardingPage = React.lazy(() => import('@/features/auth/components/OnboardingPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const JoinGroupPage = React.lazy(() => import('@/features/chat/components/JoinGroupPage'));

/** Cây route của ứng dụng. */
const AppRoutes: React.FC = () => (
  <React.Suspense fallback={<Loading variant="page" />}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ChatPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="notifications" element={<Navigate to="/activity" replace />} />
      </Route>

      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/join/:token" element={<JoinGroupPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </React.Suspense>
);

export default AppRoutes;
