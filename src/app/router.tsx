import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loading } from '@/components/ui';
import { AppLayout } from './layout/AppLayout';
import { AdminLayout } from './layout/AdminLayout';
import { ProtectedRoute } from './layout/ProtectedRoute';
import BannedRoute from './layout/BannedRoute';
import LoginPage from '@/features/auth/components/LoginPage';
import ChatPage from '@/features/chat/components/ChatPage';

const FeedPage = React.lazy(() => import('@/features/feed/components/FeedPage'));
const ContactsPage = React.lazy(() => import('@/features/friend/components/ContactsPage'));
const ProfilePage = React.lazy(() => import('@/features/profile/components/ProfilePage'));
const SettingsPage = React.lazy(() => import('@/features/settings/components/SettingsPage'));
const NotificationsPage = React.lazy(() => import('@/features/notification/components/NotificationsPage'));
const BannedPage = React.lazy(() => import('./pages/BannedPage'));
const EmailVerificationPage = React.lazy(() => import('@/features/auth/components/EmailVerificationPage'));
const MobileMenuPage = React.lazy(() => import('./pages/MobileMenuPage'));
const AdminReportsPage = React.lazy(() => import('@/features/admin/components/AdminReportsPage'));
const AdminUsersPage = React.lazy(() => import('@/features/admin/components/AdminUsersPage'));
const AdminDashboardPage = React.lazy(() => import('@/features/admin/components/AdminDashboardPage'));
const AdminModerationPage = React.lazy(() => import('@/features/admin/components/AdminModerationPage'));
const OnboardingPage = React.lazy(() => import('@/features/auth/components/OnboardingPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const JoinGroupPage = React.lazy(() => import('@/features/chat/components/JoinGroupPage'));

/** Cây route của ứng dụng. */
const AppRoutes: React.FC = () => (
  <React.Suspense fallback={<Loading variant="page" />}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<ChatPage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="menu" element={<MobileMenuPage />} />
      </Route>

      <Route path="/admin" element={
        <ProtectedRoute requireAdmin>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboardPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="moderation" element={<AdminModerationPage />} />
      </Route>

      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/banned" element={<BannedRoute />} />
      <Route path="/join/:token" element={<JoinGroupPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </React.Suspense>
);

export default AppRoutes;
