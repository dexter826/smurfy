import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Post, Comment, Report, UserStatus, PostStatus, CommentStatus, ReportStatus } from '@shared/types';
import { useUserCache } from '@/store/userCacheStore';
import { getSafeMillis } from '@/utils/timestampHelpers';
import { VIOLATION_WINDOW_DAYS, BAN_THRESHOLD, UserViolationSummary } from './types';

export const useModerationData = () => {
  const { users: userCache, fetchUsers } = useUserCache();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sevenDaysAgo = Date.now() - VIOLATION_WINDOW_DAYS * 24 * 60 * 60 * 1000;

    const qPosts = query(
      collection(db, 'posts'),
      where('status', '==', PostStatus.POLICY_VIOLATION),
    );
    const qComments = query(
      collection(db, 'comments'),
      where('status', '==', CommentStatus.POLICY_VIOLATION),
    );
    const qReports = query(
      collection(db, 'reports'),
      where('status', '==', ReportStatus.RESOLVED),
    );

    let unsubPosts = () => {};
    let unsubComments = () => {};
    let unsubReports = () => {};

    try {
      unsubPosts = onSnapshot(
        qPosts,
        (snap) => {
          const fetched = snap.docs
            .map((d) => ({ id: d.id, ...d.data() } as Post))
            .filter((p) => p.createdAt && getSafeMillis(p.createdAt) >= sevenDaysAgo);
          setPosts(fetched);
        },
        (err) => {
          console.error('Lỗi lắng nghe posts vi phạm:', err);
        },
      );

      unsubComments = onSnapshot(
        qComments,
        (snap) => {
          const fetched = snap.docs
            .map((d) => ({ id: d.id, ...d.data() } as Comment))
            .filter((c) => c.createdAt && getSafeMillis(c.createdAt) >= sevenDaysAgo);
          setComments(fetched);
        },
        (err) => {
          console.error('Lỗi lắng nghe comments vi phạm:', err);
        },
      );

      unsubReports = onSnapshot(
        qReports,
        (snap) => {
          const fetched = snap.docs
            .map((d) => ({ id: d.id, ...d.data() } as Report))
            .filter(
              (r) =>
                r.createdAt &&
                getSafeMillis(r.createdAt) >= sevenDaysAgo &&
                r.resolution !== 'rejected',
            );
          setReports(fetched);
        },
        (err) => {
          console.error('Lỗi lắng nghe reports đã xử lý:', err);
        },
      );
    } catch (e) {
      console.error('Lỗi thiết lập onSnapshot:', e);
    }

    const timer = setTimeout(() => setIsLoading(false), 800);

    return () => {
      unsubPosts();
      unsubComments();
      unsubReports();
      clearTimeout(timer);
    };
  }, []);

  const violationSummaries = useMemo((): UserViolationSummary[] => {
    const map = new Map<string, { posts: Post[]; comments: Comment[]; reports: Report[] }>();

    posts.forEach((p) => {
      if (!p.authorId) return;
      const exist = map.get(p.authorId) || { posts: [], comments: [], reports: [] };
      exist.posts.push(p);
      map.set(p.authorId, exist);
    });

    comments.forEach((c) => {
      if (!c.authorId) return;
      const exist = map.get(c.authorId) || { posts: [], comments: [], reports: [] };
      exist.comments.push(c);
      map.set(c.authorId, exist);
    });

    reports.forEach((r) => {
      if (!r.targetOwnerId) return;
      const exist = map.get(r.targetOwnerId) || { posts: [], comments: [], reports: [] };
      exist.reports.push(r);
      map.set(r.targetOwnerId, exist);
    });

    const list: UserViolationSummary[] = [];
    const targetUserIds: string[] = [];

    map.forEach((data, userId) => {
      const cached = userCache[userId];
      if (cached && cached.status === UserStatus.BANNED) {
        return;
      }

      const strikes = data.posts.length + data.comments.length + data.reports.length;
      if (strikes >= BAN_THRESHOLD) {
        list.push({
          userId,
          fullName: cached?.fullName || 'Người dùng',
          avatarUrl: cached?.avatar?.url,
          email: cached?.email || '',
          status: cached?.status || UserStatus.ACTIVE,
          strikes,
          posts: data.posts.sort((a, b) => getSafeMillis(b.createdAt) - getSafeMillis(a.createdAt)),
          comments: data.comments.sort((a, b) => getSafeMillis(b.createdAt) - getSafeMillis(a.createdAt)),
          reports: data.reports.sort((a, b) => getSafeMillis(b.createdAt) - getSafeMillis(a.createdAt)),
        });
        if (!cached) {
          targetUserIds.push(userId);
        }
      }
    });

    if (targetUserIds.length > 0) {
      fetchUsers(targetUserIds);
    }

    return list.sort((a, b) => b.strikes - a.strikes);
  }, [posts, comments, reports, userCache, fetchUsers]);

  return { violationSummaries, isLoading };
};
