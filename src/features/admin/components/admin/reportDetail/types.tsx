import React from 'react';
import { FileText, MessageSquare, User as UserIcon } from 'lucide-react';
import { ReportType } from '@shared/types';
import { CONFIRM_MESSAGES } from '@/constants';

export type ActionType = 'resolve' | 'reject' | 'warn' | 'ban';

export interface ViewerState {
  open: boolean;
  media: { type: 'image' | 'video'; url: string }[];
  index: number;
}

export const VIEWER_CLOSED: ViewerState = { open: false, media: [], index: 0 };

export const TYPE_CONFIG: Record<ReportType, { label: string; icon: React.ReactNode; color: string }> = {
  [ReportType.POST]: { label: 'Bài viết', icon: <FileText size={13} />, color: 'bg-info/10 text-info' },
  [ReportType.COMMENT]: { label: 'Bình luận', icon: <MessageSquare size={13} />, color: 'bg-warning/10 text-warning' },
  [ReportType.USER]: { label: 'Người dùng', icon: <UserIcon size={13} />, color: 'bg-danger/10 text-danger' },
};

export const ACTION_CONFIRM: Record<ActionType, { title: string; message: string; variant: 'danger' | 'primary' }> = {
  resolve: {
    title: CONFIRM_MESSAGES.ADMIN.RESOLVE_REPORT.TITLE,
    message: CONFIRM_MESSAGES.ADMIN.RESOLVE_REPORT.MESSAGE,
    variant: 'danger',
  },
  reject: {
    title: CONFIRM_MESSAGES.ADMIN.REJECT_REPORT.TITLE,
    message: CONFIRM_MESSAGES.ADMIN.REJECT_REPORT.MESSAGE,
    variant: 'primary',
  },
  warn: {
    title: CONFIRM_MESSAGES.ADMIN.WARN_USER.TITLE,
    message: CONFIRM_MESSAGES.ADMIN.WARN_USER.MESSAGE,
    variant: 'primary',
  },
  ban: {
    title: CONFIRM_MESSAGES.ADMIN.BAN_USER.TITLE,
    message: CONFIRM_MESSAGES.ADMIN.BAN_USER.MESSAGE,
    variant: 'danger',
  },
};
