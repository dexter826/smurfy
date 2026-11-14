# Chat details — panel 360 + modals restyle

Type: task
Status: resolved
Blocked by: 03

## Scope (tầng 2 — chỉ restyle, không đổi bố cục)
- `src/features/chat/components/chat/details/*` (ChatDetailsPanel, Header, MemberList, Media, Search, Actions, PendingMembersModal)
- `src/features/chat/components/chat/ChatModals.tsx`, `modals/*` (CreateGroup, EditGroup, AddMember, Forward, JoinGroup, QRCode, TransferAdmin)
- `src/features/chat/components/JoinGroupPage.tsx`

## Việc làm
1. ChatDetailsPanel: panel 360 `surface` viền trái `line`; tabs icon `Thông tin · Thành viên · Media · Tìm` với gạch chân accent; group card + quick actions (ô `surface-2`); member list; media grid 3 cột bo `control`; hành động đáy (Ghim/Lưu trữ/Rời nhóm = `danger`).
2. Desktop 1024–1279: panel trở thành drawer trượt phải (dùng Modal/sheet mới từ ticket 02) — kiểm tra `useMediaQuery` hiện có.
3. Mobile: sheet trượt từ dưới với tay cầm.
4. Các modal chat đổi sang primitive mới (đã restyle ở 02); QRCodeModal giữ nền trắng QR nhưng khung token.
5. JoinGroupPage: card giữa `surface` bo `card` trên `canvas` + `bg` pattern bỏ.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-chat cột phải (tabs, group card, media, actions).
- Quản trị nhóm (thêm/xoá thành viên, thăng cấp, phê duyệt, chuyển quyền) hoạt động như cũ.

## Answer

**Đủ 5 mục:**
1. Details panel restyle token: header/tab viền `line-soft`, tab kích hoạt `accent-strong` + gạch chân `accent` 2px; quick-action tile `rounded-control bg-surface-2` (frame `.quick`), member/media/search rows `rounded-card`, media grid 3 cột `rounded-control` gap 6px (frame `.media-strip`), pending banner `bg-accent/5 border-accent/10`, action đáy `text-danger hover:bg-danger/5` (frame `.action-row.danger`), quick-action danger `hover:bg-danger hover:text-on-danger`, switch thumb `bg-surface`; copy/QR/reset buttons thêm `aria-label`.
2. Ba mode theo `useMediaQuery` (hook hiện có — đổi sang lazy init `matchMedia` + listener `change` để hết nháy layout lần render đầu): **≥1280** panel inline `w-[360px]` bo `card` viền `line` `shadow-card` — flex child thứ ba của ChatPage, cách thread gap 12 frame; **1024–1279** drawer trượt phải `animate-slide-in-right` + backdrop `overlay`, có `role="dialog" aria-modal` + Escape + autofocus (focus trap đầy đủ theo §7 chưa trọn — Radix hoá drawer nếu owner muốn); **<1024** `SlideUpSheet` (ticket 02) full màn với tay cầm.
3. Mobile sheet = SlideUpSheet `showHandle` (mục 2 nêu "dùng Modal/sheet mới từ ticket 02").
4. Các modal chat đã dùng primitive `Modal`/`Button`/`Input` restyle ở ticket 02 nên hưởng visual mới tự động; QRCodeModal giữ `bg-white` cho vùng QR + `#ffffff` trong canvas paint (đều chức năng quét mã — invariant 2 cần owner phê duyệt ngoại lệ) nhưng khung `rounded-card border-line`.
5. JoinGroupPage: nền `bg-canvas`, card giữa surface bo card, header viền `line`, badge trạng thái token-soft, `shadow-card` thay `shadow-lg shadow-primary/20`.

**Chấp nhận:** tab label `text-[10px]` đúng số frame `.tab` (10px, metadata vi mô — cần owner phê chuẩn ngoại lệ §3); `ForwardModal` search pill bo `full` (search-field).

**Verify:** CI 3 pass; grep scope (details/*, ChatModals, modals/*, JoinGroupPage) = 0 alias / 0 class chết; hex duy nhất = QR white (chức năng); `contrast_check.py` PASS; khớp frame c-chat cột phải (tabs gạch chân, group card, quick actions, media grid).
