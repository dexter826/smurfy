# Shell — rail + tab bar 4 mục, xoá MobileMenuPage

Type: task
Status: resolved
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

## Answer

**Đủ 6 mục:**
1. `Rail.tsx` mới (desktop `lg+`, 72px): logo tile 40 (`rounded-control bg-accent` + chữ "S" `on-accent` — asset logo thật đanh ở ticket 12), 4 nav `appNavItems` (icon 21 + badge đếm `tabular-nums`, viền 2px `canvas`), đáy Cài đặt + avatar. Nút rail 42×42 bo 14 qua token `radius-nav` (`bg-surface border-line` — số 14 đúng `rail-button` trong DESIGN.md frontmatter); kích hoạt `accent-strong` + ring 3px `accent-soft` + viền `accent/40` (khớp frame c-chat `.rail-btn.on`); mọi nút rail/tab có focus ring 2px `focus` (tab dùng outline inset vì ring ngoài bị clip đáy màn).
2. Avatar mở `Dropdown` popover: Hồ sơ · Cài đặt · Giao diện (toggle theme, icon Moon/Sun) · Đăng xuất (danger) — nhãn theo spec #19.
3. `BottomNav` 4 tab (bỏ Menu), icon 21 + nhãn `caption` + badge `text-[10px]` khớp số liệu frame, safe-area đáy, 56px, viền `line`.
4. `navItems.ts` thành mảng chung `appNavItems` cho cả rail + tab bar; badge: `unread` / `requests` / `activity = unreadNotifications + receivedRequests.length` (spec #14 "badge tổng") tính trong AppLayout từ store hiện có, kích hoạt qua `NavLink`.
5. Xoá `AppTopBar.tsx` + `MobileMenuPage.tsx` (0 tham chiếu còn lại); theme toggle + logout vào menu avatar; Cài đặt thành item rail.
6. Giữ `isChatRoom` ẩn tab bar (AppLayout giữ logic nguyên).

**Router:** `/activity` → NotificationsPage tạm (`TODO(ticket-09)`), `/notifications` → `Navigate to="/activity" replace`, xoá `/menu` + lazy import. NotFound restyle nhẹ: bỏ `bg-app-pattern`, `text-accent-strong` cho số 404, token swap.

**Đổi phụ/giải trình:**
- AppLayout chuyển `flex-col` → `flex` row (rail trái), nền `bg-canvas`; mobile không còn header toàn app — theo frame mobile, mhead 56px thuộc từng màn (Nhật ký 21px có avatar cuối header, xem `build_mobile.py`) nên điểm vào avatar/sheet mobile sẽ dựng ở ticket 07/09/10 khi restyle từng màn. Khoảng trống tạm thời trên mobile: Hồ sơ/Cài đặt chỉ tới bằng URL (đã ghi để phase checkpoint biết).
- `NotificationDropdown` (feature notification) giờ 0 consumer — không xoá (ngoài scope file), ticket 09 quyết định số phận.
- `GlobalModals.tsx` + `useShellEffects.ts` nằm trong scope nhưng không có class/token nào cần đổi — không đụng.
- Badge trên tab bar viền không cần (nền tab bar là surface, badge nổi trên icon).
- `text-[19px]` (chữ logo) và `text-[10px]` (badge) ngoài thang chữ §3 — đúng số liệu frame (rail-logo 19px, badge 9.5px); badge chip Rail 16px vs BottomNav 18px giữ khác nhau theo viền nền khác nhau.
- Guard `if (!user) return null` trong Rail theo idiom hiện có của AppLayout (user được ProtectedRoute bảo đảm).
- Xung đột doc: spec bất biến #4 ghi bo "8/12/16/full", DESIGN §7 quy định rail button bo 14 — theo DESIGN (chuẩn đích).

**Verify:** CI 3 pass; grep 0 `AppTopBar|MobileMenuPage`; 0 `/menu`; redirect có mặt; 0 alias class ở layout/pages/router; contrast Rail: accent-strong/surface 6.83, on-accent/accent 6.60, ink-2/surface 7.58 — `contrast_check.py` PASS.
