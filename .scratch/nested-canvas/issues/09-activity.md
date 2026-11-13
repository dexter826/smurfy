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

## Comments
