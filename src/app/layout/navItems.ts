import React from 'react';
import {
  MessageCircle,
  LayoutGrid,
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  Shield,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TopNavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
  badge?: number;
}

export const appNavItems = (
  isAdmin: boolean,
  badges: { unread: number; requests: number; notifications: number },
): TopNavItem[] => [
  { to: '/', icon: MessageCircle, label: 'Tin nhắn', end: true, badge: badges.unread },
  { to: '/feed', icon: LayoutGrid, label: 'Nhật ký' },
  { to: '/contacts', icon: Users, label: 'Bạn bè', badge: badges.requests },
  { to: '/settings', icon: Settings, label: 'Cài đặt' },
  ...(isAdmin ? [{ to: '/admin', icon: Shield, label: 'Quản trị' }] : []),
];

export const adminNavItems: TopNavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tổng quan', end: true },
  { to: '/admin/reports', icon: Shield, label: 'Quản lý báo cáo' },
  { to: '/admin/users', icon: Users, label: 'Quản lý người dùng' },
  { to: '/admin/moderation', icon: Shield, label: 'Quản lý vi phạm' },
];
