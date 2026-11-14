import React, { useMemo } from 'react';
import { ChevronLeft, CheckCheck, UserPlus, BellOff, UserCheck, UserX, Trash2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotificationStore } from '../store/notificationStore';
import { useContactStore } from '@/features/friend';
import { useAuthStore } from '@/features/auth';
import { useUserCache } from '@/store/userCacheStore';
import { NotificationItem } from './notifications/NotificationItem';
import { EmptyState } from '@/components/ui';
import { FriendRequest, Notification, NotificationType } from '@shared/types';

interface RequestRow {
  kind: 'request';
  request: FriendRequest;
  time: number;
}

interface NotificationRow {
  kind: 'notification';
  notification: Notification;
  friendRequest?: FriendRequest;
  time: number;
}

type ActivityFilter = 'all' | 'requests';

type ActivityRow = RequestRow | NotificationRow;

const toMillis = (value: unknown): number => {
  const ts = value as { toMillis?: () => number; seconds?: number } | undefined;
  if (ts?.toMillis) return ts.toMillis();
  if (ts?.seconds) return ts.seconds * 1000;
  return 0;
};

/** Trang Hoạt động — gộp thông báo + lời mời kết bạn (spec #9, #14). */
export const ActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearAllNotifications,
    currentLimit,
    loadMore,
  } = useNotificationStore();
  const { receivedRequests, acceptFriendRequest, rejectFriendRequest } = useContactStore();
  const { getUser, fetchUsers } = useUserCache();

  const filter: ActivityFilter = searchParams.get('tab') === 'requests' ? 'requests' : 'all';
  const setFilter = (next: ActivityFilter) => {
    setSearchParams(next === 'all' ? {} : { tab: next }, { replace: true });
  };

  // Fetch sender cho lời mời (chỉ đọc cache, không đổi store)
  useMemo(() => {
    const missing = receivedRequests.map((r) => r.senderId).filter((id) => !getUser(id));
    if (missing.length > 0) fetchUsers(missing);
  }, [receivedRequests, getUser, fetchUsers]);

  const rows = useMemo<ActivityRow[]>(() => {
    // Lời mời đã có notification FRIEND_REQUEST → gắn nút inline vào đúng notification đó,
    // tránh hiện trùng hai dòng cho cùng một sự kiện
    const requestBySender = new Map(receivedRequests.map((r) => [r.senderId, r]));
    const consumed = new Set<string>();

    const notificationRows: NotificationRow[] = notifications.map((n) => {
      if (n.type === NotificationType.FRIEND_REQUEST) {
        const request = requestBySender.get(n.actorId);
        if (request) {
          consumed.add(request.id);
          return {
            kind: 'notification',
            notification: n,
            friendRequest: request,
            time: toMillis(n.createdAt),
          };
        }
      }
      return { kind: 'notification', notification: n, time: toMillis(n.createdAt) };
    });

    const requestRows: RequestRow[] = receivedRequests
      .filter((r) => !consumed.has(r.id))
      .map((r) => ({ kind: 'request', request: r, time: toMillis(r.updatedAt) }));

    const merged = [...notificationRows, ...requestRows].sort((a, b) => b.time - a.time);
    return filter === 'requests'
      ? merged.filter((r) => r.kind === 'request').sort((a, b) => b.time - a.time)
      : merged;
  }, [notifications, receivedRequests, filter]);

  const handleAccept = async (request: FriendRequest) => {
    await acceptFriendRequest(request.id, request.senderId, user?.id ?? '');
  };

  const handleReject = async (request: FriendRequest) => {
    await rejectFriendRequest(request.id);
  };

  const renderRequestActions = (request: FriendRequest) => (
    <div className="flex items-center gap-2 mt-2.5">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAccept(request);
        }}
        className="inline-flex items-center gap-1.5 px-3 min-h-[36px] rounded-control bg-accent text-on-accent text-xs font-semibold border border-accent-edge hover:bg-accent-edge transition-colors"
      >
        <UserCheck size={14} aria-hidden="true" />
        Chấp nhận
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleReject(request);
        }}
        className="inline-flex items-center gap-1.5 px-3 min-h-[36px] rounded-control bg-surface text-ink text-xs font-semibold border border-line hover:bg-surface-2 transition-colors"
      >
        <UserX size={14} aria-hidden="true" />
        Từ chối
      </button>
    </div>
  );

  const renderRequestBody = (senderId: string, withActions: boolean, request?: FriendRequest) => {
    const sender = getUser(senderId);
    const mutualCount = user?.suggestedFriends?.find((s) => s.id === senderId)?.mutualCount;
    return (
      <>
        <div className="flex-shrink-0 relative">
          {sender ? (
            <img
              src={sender.avatar?.url || '/blank-avatar.png'}
              alt=""
              className="w-10 h-10 rounded-full object-cover bg-surface-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface-3" />
          )}
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-surface" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm leading-relaxed break-words text-ink">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${senderId}`);
              }}
              className="font-bold mr-1.5 hover:text-accent-strong transition-colors duration-200"
            >
              {sender?.fullName ?? 'Người dùng'}
            </button>
            đã gửi lời mời kết bạn
          </p>
          {typeof mutualCount === 'number' && mutualCount > 0 && (
            <p className="mt-1 text-caption text-ink-3 tnum">{mutualCount} bạn chung</p>
          )}
          {withActions && request && renderRequestActions(request)}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Header ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 h-14 border-b border-line-soft bg-surface">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            aria-label="Quay lại"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-control text-ink-2 hover:bg-surface-2 transition-colors -ml-2"
          >
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Hoạt động</h1>
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={() => user && markAllAsRead(user.id)}
              aria-label="Đọc tất cả hoạt động"
              className="flex items-center gap-1.5 px-3 min-h-[36px] rounded-control text-xs font-semibold text-accent-strong hover:bg-accent-soft transition-colors duration-200"
            >
              <CheckCheck size={15} />
              <span className="hidden sm:inline">Đọc tất cả</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={() => user && clearAllNotifications(user.id)}
              aria-label="Xóa tất cả thông báo"
              className="flex items-center gap-1.5 px-3 min-h-[36px] rounded-control text-xs font-semibold text-ink-3 hover:text-danger hover:bg-danger/10 transition-colors duration-200"
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline">Xóa tất cả</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Segmented ── */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-line-soft bg-surface">
        <div className="flex items-center max-w-2xl mx-auto p-[3px] rounded-control bg-surface-2">
          {(
            [
              { id: 'all', label: 'Tất cả' },
              { id: 'requests', label: 'Lời mời kết bạn' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-1 py-2 rounded-[8px] text-xs font-semibold text-center transition-all duration-200 outline-none ${
                filter === tab.id
                  ? 'bg-surface text-ink shadow-card'
                  : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto scroll-hide">
        <div className="max-w-2xl mx-auto md:py-5 md:px-4">
          <div className="bg-surface md:rounded-card md:border md:border-line md:shadow-card overflow-hidden p-2">
            {rows.length === 0 ? (
              filter === 'requests' ? (
                <EmptyState
                  icon={UserPlus}
                  title="Không có lời mời kết bạn"
                  description="Lời mời kết bạn mới sẽ xuất hiện ở đây."
                  size="sm"
                  className="py-16"
                />
              ) : (
                <EmptyState
                  icon={BellOff}
                  title="Không có hoạt động"
                  description="Thông báo và lời mời sẽ xuất hiện ở đây."
                  size="sm"
                  className="py-16"
                />
              )
            ) : (
              <div className="flex flex-col gap-1.5">
                {rows.map((row) =>
                  row.kind === 'request' ? (
                    <div
                      key={`req-${row.request.id}`}
                      className="group relative flex items-start gap-3.5 px-4 py-3.5 rounded-card border border-accent/10 bg-accent/[0.04] transition-all duration-200 outline-none"
                    >
                      {renderRequestBody(row.request.senderId, true, row.request)}
                    </div>
                  ) : row.friendRequest ? (
                    <div
                      key={`notif-req-${row.notification.id}`}
                      className="group relative flex items-start gap-3.5 px-4 py-3.5 rounded-card border border-accent/10 bg-accent/[0.04] transition-all duration-200 outline-none"
                    >
                      {renderRequestBody(row.notification.actorId, true, row.friendRequest)}
                    </div>
                  ) : (
                    <NotificationItem key={row.notification.id} notification={row.notification} />
                  ),
                )}
              </div>
            )}

            {notifications.length >= currentLimit && (
              <div className="px-4 py-3 border-t border-line-soft flex justify-center">
                <button
                  onClick={() => user && loadMore(user.id)}
                  className="text-xs font-semibold text-accent-strong hover:underline transition-colors duration-200"
                >
                  Xem thêm hoạt động cũ hơn
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityPage;
