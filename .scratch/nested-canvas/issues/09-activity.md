# Hoạt động — gộp thông báo + lời mời kết bạn

Type: task
Status: ready-for-agent
Blocked by: 03

## Scope
- `src/features/notification/components/NotificationsPage.tsx`, `notifications/*` (NotificationList, NotificationItem, NotificationSkeleton)
- `src/features/notification/components/notifications/NotificationDropdown.tsx` (xoá sau khi rail badge dùng)
- `src/features/friend/components/contacts/RequestsListSection.tsx` (tái sử dụng dữ liệu)
- Router: `/activity` thay `/notifications`; redirect `/notifications` → `/activity`.

## Việc làm
1. Trang `/activity`: header `Hoạt động` (display-lg) + nút "Đọc tất cả"; segmented `Tất cả · Lời mời kết bạn`; card `post-card` chứa danh sách (frame c-activity).
2. Item thông báo: avatar 32 + nội dung (tên đậm) + thời gian `caption` + chấm chưa đọc `accent`; loại `friend_request` có nút Chấp nhận/Từ chối inline (dữ liệu từ `contactStore.receivedRequests` — KHÔNG đổi store, chỉ ghép view).
3. Hai nguồn hiển thị chung một danh sách sắp theo thời gian giảm dần; badge rail = `unreadNotifications + receivedRequests.length`.
4. Xoá NotificationDropdown khỏi shell (rail badge đã đảm nhiệm); giữ `markAllAsRead`, `clearAll`, `loadMore` hiện có.
5. Mobile: cùng trang, segmented + danh sách + tab bar (frame c-m-activity).
6. Deep link: notification item vẫn điều hướng đúng (chat/feed/profile) như cũ.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; `/notifications` redirect `/activity`; badge tổng đúng.
- Khớp frame c-activity + c-m-activity.
- Chấp nhận/từ chối lời mời từ trang Hoạt động hoạt động; thông báo đọc/chưa đọc đúng.

## Answer

**Đủ 6 mục:**
1. `ActivityPage.tsx` mới thay NotificationsPage: header "Hoạt động" (`text-2xl font-extrabold` = display-lg) + nút "Đọc tất cả" (`accent-strong`, gọi `markAllAsRead` hiện có); segmented `Tất cả · Lời mời kết bạn` kiểu seg (track `surface-2`, active `surface + shadow-card`); danh sách trong card `rounded-card border-line shadow-card`.
2. Hai nguồn ghép view, sort thời gian giảm dần: notification rows render bằng `NotificationItem` giữ deep-link; request rows render inline (avatar + tên đậm + "đã gửi lời mời kết bạn" + số bạn chung + nút **Chấp nhận** primary/**Từ chối** secondary gọi `friendService` trực tiếp — KHÔNG đổi contactStore; handledIds local để ẩn sau khi xử lý).
3. Badge rail = `unreadNotifications + receivedRequests.length` (đã làm ở ticket 03 trong AppLayout) — không đổi.
4. **Xoá** `NotificationDropdown.tsx` + `NotificationsPage.tsx`; `markAllAsRead`/`clearAllNotifications`/`loadMore` trong store giữ nguyên.
5. Mobile: cùng trang (header 56 + segmented + card + tab bar shell).
6. Deep link: NotificationItem `handleClick` giữ nguyên; case SYSTEM đổi `/notifications` → `/activity`.

**Router:** `/activity` → ActivityPage (lazy); `/notifications` → `Navigate to="/activity"`; TODO(ticket-09) gỡ.

**Chấp nhận:** requests render inline thay vì tái dùng `FriendRequestItem` (component đó thuộc ticket 10 restyle cho contacts page — tránh ghép chéo); thời gian request/notification lấy `toMillis` của Timestamp Firestore.

**Verify:** CI 3 pass; grep 0 stale reference NotificationsPage/NotificationDropdown/`/notifications` navigate; badge tổng đúng từ store; `contrast_check.py` PASS; khớp frame c-activity + c-m-activity.
