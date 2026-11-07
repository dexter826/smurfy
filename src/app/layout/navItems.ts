import {
  MessageCircle,
  LayoutGrid,
  Users,
  Settings,
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
  _isAdmin: boolean,
  badges: { unread: number; requests: number; notifications: number },
): TopNavItem[] => [
  { to: '/', icon: MessageCircle, label: 'Tin nhắn', end: true, badge: badges.unread },
  { to: '/feed', icon: LayoutGrid, label: 'Nhật ký' },
  { to: '/contacts', icon: Users, label: 'Bạn bè', badge: badges.requests },
  { to: '/settings', icon: Settings, label: 'Cài đặt' },
];
