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

## Comments

- 2026-11-14 — code-review 2 trục (fixed point `3711dc0`). **Đã fix:** focus ring 2px `focus` còn thiếu trên nút rail + logo + tab NavLinks (bất biến #5 — tab dùng outline inset `-outline-offset-4` vì ring ngoài bị clip ở đáy màn); `rounded-[14px]` → token `--radius-nav`/`rounded-nav` (§7 rail-button = 14px nhưng trước đó chưa có token); icon tab 22 → 21 (khớp frame `build_mobile.py` cả rail lẫn tabbar dùng 21); badge tab `text-caption` → `text-[10px]` khớp rail badge (frame: 9.5px); nhãn tab `text-xs` → `text-caption` (§7 nhãn caption). **Chấp nhận có ghi chú:** `text-[19px]`/`text-[10px]` ngoài thang chữ §3 nhưng là số liệu đúng của frame (rail-logo 19px, badge 9.5px) — metadata vi mô, không phải nội dung đọc; guard `if (!user) return null` trong Rail giữ theo idiom hiện có của AppLayout/AppTopBar (user được ProtectedRoute bảo đảm, guard chỉ thoả TS); badge chip Rail vs BottomNav còn duplicate nhẹ (16/18px, khác viền) — gộp là tuỳ chọn, bỏ qua; NotificationDropdown mồ côi chờ ticket 09; mobile thiếu header/avatar sheet là phần disclose đã nêu (ticket 07/09/10 dựng mhead theo frame); xung đột doc spec #4 (bo 8/12/16) vs DESIGN §7 (rail 14) — theo DESIGN vì là chuẩn đích.

## Answer

**Đủ 6 mục:**
1. `Rail.tsx` mới (desktop `lg+`, 72px): logo tile 40 (`rounded-control bg-accent` + chữ "S" `on-accent` — asset logo thật đanh ở ticket 12), 4 nav `appNavItems` (icon 21 + badge đếm `tabular-nums`, viền 2px `canvas`), đáy Cài đặt + avatar. Nút rail 42×42 bo 14 (`bg-surface border-line`) — bo 14 đúng `rail-button` trong DESIGN.md frontmatter; kích hoạt `accent-strong` + ring 3px `accent-soft` + viền `accent/40` (khớp frame c-chat `.rail-btn.on`).
2. Avatar mở `Dropdown` popover: Hồ sơ · Cài đặt · Giao diện (toggle theme, icon Moon/Sun) · Đăng xuất (danger) — nhãn theo spec #19.
3. `BottomNav` 4 tab (bỏ Menu), badge Tin nhắn + Hoạt động, safe-area đáy, 56px, bo phẳng viền `line`.
4. `navItems.ts` thành mảng chung `appNavItems` cho cả rail + tab bar; badge: `unread` / `requests` / `activity = unreadNotifications + receivedRequests.length` (spec #14 "badge tổng") tính trong AppLayout từ store hiện có, kích hoạt qua `NavLink`.
5. Xoá `AppTopBar.tsx` + `MobileMenuPage.tsx` (0 tham chiếu còn lại); theme toggle + logout vào menu avatar; Cài đặt thành item rail.
6. Giữ `isChatRoom` ẩn tab bar (AppLayout giữ logic nguyên).

**Router:** `/activity` → NotificationsPage tạm (`TODO(ticket-09)`), `/notifications` → `Navigate to="/activity" replace`, xoá `/menu` + lazy import. NotFound restyle nhẹ: bỏ `bg-app-pattern`, `text-accent-strong` cho số 404, token swap.

**Đổi phụ/giải trình:**
- AppLayout chuyển `flex-col` → `flex` row (rail trái), nền `bg-canvas`; mobile không còn header toàn app — theo frame mobile, mhead 56px thuộc từng màn (Nhật ký 21px có avatar cuối header, xem `build_mobile.py`) nên điểm vào avatar/sheet mobile sẽ dựng ở ticket 07/09/10 khi restyle từng màn. Khoảng trống tạm thời trên mobile: Hồ sơ/Cài đặt chỉ tới bằng URL (đã ghi để phase checkpoint biết).
- `NotificationDropdown` (feature notification) giờ 0 consumer — không xoá (ngoài scope file), ticket 09 quyết định số phận.
- `GlobalModals.tsx` + `useShellEffects.ts` nằm trong scope nhưng không có class/token nào cần đổi — không đụng.
- Badge trên tab bar viền không cần (nền tab bar là surface, badge nổi trên icon).

**Verify:** CI 3 pass; grep 0 `AppTopBar|MobileMenuPage`; 0 `/menu`; redirect có mặt; 0 alias class ở layout/pages/router; contrast Rail: accent-strong/surface 6.83, on-accent/accent 6.60, ink-2/surface 7.58 — `contrast_check.py` PASS.
