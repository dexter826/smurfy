# Shell — rail + tab bar 4 mục, xoá MobileMenuPage

Type: task
Status: ready-for-agent
Blocked by: 02

## Scope
- `src/app/layout/AppLayout.tsx`, `AppTopBar.tsx` (thay bằng Rail), `BottomNav.tsx` (4 tab), `navItems.ts`, `GlobalModals.tsx`, `hooks/useShellEffects.ts`
- `src/app/pages/MobileMenuPage.tsx` (xoá), `src/app/router.tsx` (xoá route `/menu`, thêm `/activity`, redirect `/notifications` → `/activity`), `src/app/pages/NotFoundPage.tsx` (restyle nhẹ)

## Việc làm
1. Rail desktop 72px: logo tile 40, nav `Tin nhắn · Nhật ký · Bạn bè · Hoạt động` (icon 21 + badge đếm), đáy Cài đặt + avatar; mục kích hoạt `accent-strong` + ring `accent-soft`; theo frame c-chat.
2. Avatar bấm mở menu popover (desktop) chứa Hồ sơ · Cài đặt · Giao diện · Đăng xuất (chuyển nội dung từ MobileMenuPage).
3. BottomNav 4 tab (bỏ Menu), badge Tin nhắn/Hoạt động; safe-area đáy; theo frame c-m-list.
4. Trạng thái kích hoạt dùng `NavLink`; badge tính từ store hiện có (`totalUnread`, `unreadNotifications`, `receivedRequests`) — Hoạt động = notifications + requests.
5. Xoá `AppTopBar.tsx`, `MobileMenuPage.tsx`; theme toggle + logout chuyển vào menu avatar; Cài đặt thành item rail.
6. Giữ cơ chế ẩn tab bar khi đang trong phòng chat (`isChatRoom`).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; không còn import AppTopBar/MobileMenuPage ở đâu.
- `/menu` không còn trong router; `/notifications` redirect `/activity` (sau khi ticket 09 merge; tạm thời route trỏ component cũ — ghi TODO).
- Frame tham chiếu: c-chat (rail + list + details), c-m-list (tab bar), c-m-dark.

## Comments
