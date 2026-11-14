import { Bell, LayoutGrid, MessageCircle, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AppBadgeKey = 'unread' | 'requests' | 'activity';

export interface AppNavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
  badgeKey?: AppBadgeKey;
}

/** 4 mục điều hướng dùng chung cho rail desktop và tab bar mobile (spec #19). */
export const appNavItems: AppNavItem[] = [
  { to: '/', icon: MessageCircle, label: 'Tin nhắn', end: true, badgeKey: 'unread' },
  { to: '/feed', icon: LayoutGrid, label: 'Nhật ký' },
  { to: '/contacts', icon: Users, label: 'Bạn bè', badgeKey: 'requests' },
  { to: '/activity', icon: Bell, label: 'Hoạt động', badgeKey: 'activity' },
];
