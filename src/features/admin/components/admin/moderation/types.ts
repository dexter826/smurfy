import { Post, Comment, Report, UserStatus } from '@shared/types';

export const VIOLATION_WINDOW_DAYS = 7;
export const BAN_THRESHOLD = 3;

export const AI_MODERATION_LABELS: Record<string, string> = {
  sexual: 'Nội dung nhạy cảm / 18+',
  violence: 'Nội dung bạo lực / Máu me',
  harassment: 'Quấy rối / Độc hại',
  hate: 'Kích động thù hận',
  hate_speech: 'Kích động thù hận',
};

export const getAIModerationLabel = (reason?: string) => {
  if (!reason) return 'Nội dung không phù hợp';
  return AI_MODERATION_LABELS[reason.toLowerCase()] || reason;
};

export interface UserViolationSummary {
  userId: string;
  fullName: string;
  avatarUrl?: string;
  email: string;
  status: UserStatus;
  strikes: number;
  posts: Post[];
  comments: Comment[];
  reports: Report[];
}
