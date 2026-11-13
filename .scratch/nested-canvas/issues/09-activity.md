# Hoạt động — gộp thông báo + lời mời kết bạn

Type: task
Status: resolved
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
2. Hai nguồn ghép view, sort thời gian giảm dần: notification FRIEND_REQUEST có lời mời khớp (theo actorId) → render dạng row lời mời với nút **Chấp nhận** primary/**Từ chối** secondary **gọi method `contactStore.acceptFriendRequest/rejectFriendRequest`** (optimistic + rollback sẵn của store — không đổi store, không bypass); lời mời không có notification → row riêng; notifications khác render qua `NotificationItem`. Không còn hiện trùng hai dòng cho một sự kiện.
3. Badge rail = `unreadNotifications + receivedRequests.length` (đã làm ở ticket 03 trong AppLayout) — không đổi.
4. **Xoá** `NotificationDropdown.tsx` + `NotificationsPage.tsx`; `markAllAsRead`/`clearAllNotifications`/`loadMore` trong store giữ nguyên.
5. Mobile: cùng trang (header 56 + segmented + card + tab bar shell).
6. Deep link: NotificationItem `handleClick` giữ nguyên; case SYSTEM đổi `/notifications` → `/activity`.

**Router:** `/activity` → ActivityPage (lazy); `/notifications` → `Navigate to="/activity"`; TODO(ticket-09) gỡ.

**Chấp nhận:** requests render inline thay vì tái dùng `FriendRequestItem` (component đó thuộc ticket 10 restyle cho contacts page — tránh ghép chéo); thời gian request/notification lấy `toMillis` của Timestamp Firestore.

**Sửa sau code-review (một agent gộp 2 trục):** dùng store method thay gọi `friendService` trực tiếp (badge rail giờ tự giảm, không reset khi remount); khử trùng lặp FRIEND_REQUEST notification + request row; filter đồng bộ URL `?tab=` (§8); khôi phục nút "Xóa tất cả" (`clearAllNotifications`); aria-label cho "Đọc tất cả"/"Xóa tất cả"; touch target back 44px; `useMemo` fetch thay useEffect.
**Chấp nhận:** nút Chấp nhận/Từ chối `min-h-[36px]` = bậc sm của DESIGN §7 (tension nội bộ "≥44" đã ghi từ ticket 02); segmented item bo 8px số frame; filter thiếu deep-link cũ — giờ có `?tab=`.
**Verify:** CI 3 pass; grep 0 stale reference NotificationsPage/NotificationDropdown/`/notifications` navigate; badge tổng đúng từ store; `contrast_check.py` PASS; khớp frame c-activity + c-m-activity.
