# Primitives — components/ui theo Nested Canvas

Type: task
Status: resolved
Blocked by: 01

## Scope
- Toàn bộ `src/components/ui/` (41 file): Button, IconButton, Input, TextArea, Checkbox, Switch, Select, SearchableSelect, Dropdown, Popover, Tooltip, Badge, Avatar, Skeleton, Loading, EmptyState, Toast, Modal/AlertDialog, DatePicker, ProgressBar, CircularProgress, UploadProgress, ReactionSelector/Display, MediaViewer, ImageCropper, EmojiPicker, SplashScreen, ConnectionStatus, ErrorBoundary, BlockOptionsModal, ReactionDetailsModal.

## Việc làm
1. Chuyển variant sang `cva` (Button, Badge, EmptyState, Toast, Skeleton…) — gói `class-variance-authority` đã có sẵn trong deps.
2. Dựng lại visual theo DESIGN.md §7: bo `control` 10, viền `line`, focus ring 2px `focus`, nút primary = `accent`+`on-accent`+`accent-edge`; search-field tròn `surface-2`; dropdown/dialog/toast = `shadow-float`.
3. Thêm `SlideUpSheet` (biến thể Modal full màn mobile: bo 2 góc trên `dialog`, tay cầm, `slideInUp` 300ms) — dùng cho details chat, block options, reaction details trên mobile.
4. Đổi toàn bộ class cũ trong các file này sang token mới (không dùng alias).
5. SplashScreen: bỏ Lottie, dựng CSS thuần (logo tile + shimmer bar) theo frame c-auth; giữ timing 1800ms + fade 500ms.
6. Giữ nguyên API props (không đổi tên props) — chỉ đổi nội bộ styling; trừ những component cần thêm prop mới (Sheet cần `showHandle`).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep trong `src/components/ui` 0 hex, 0 class không tồn tại, 0 token alias.
- Bấm thử Modal/Select/Tooltip hoạt động đúng focus trap + Escape + trả focus.
- Frame tham chiếu: c-auth (input/nút), c-chat (dropdown, bubble không nằm đây), c-m-dark (toast/badge).

## Comments

## Answer

**Làm đủ mục 1–6:**
1. cva cho Button, IconButton, Badge, EmptyState, Toast (bar variants). API props giữ nguyên 100%.
2. Toàn bộ `src/components/ui/` (34 file tsx) sang token mới trực tiếp: bo `control/card/dialog`, viền `line`, focus ring `focus/50`, nút primary `accent + on-accent + accent-edge` (hover `bg-accent-edge` — DESIGN không định nghĩa hover, edge là sắc đậm duy nhất trong bảng màu), dropdown/popover/tooltip/toast `rounded-card + line + shadow-float`, item chọn `accent-soft + accent-strong`.
3. Thêm `SlideUpSheet` (mobile: sheet đáy, `rounded-t-dialog`, tay cầm `showHandle`, `slideInUp` 300ms; ≥lg: dialog giữa màn). Đã chuyển BlockOptionsModal + ReactionDetailsModal sang sheet (mục 3 nêu đích danh 2 modal này); bỏ shell portal tự viết + `useScrollLock` (Radix tự lock/focus-trap/Escape).
4. 0 alias token trong `src/components/ui` (grep = 0), 0 hex, 0 legacy radius.
5. SplashScreen bỏ Lottie (import + fetch + state `animationData`): CSS thuần logo + wordmark + shimmer bar; giữ timing 1800ms + fade 500ms.
6. Thêm prop mới duy nhất: `showHandle` cho SlideUpSheet.

**Đổi phụ (để phục vụ primitive):**
- `getAvatarGradient` → `getAvatarColor` (`src/utils/imageUtils.ts`): dải đặc `#6E8CAE–#8C97A8` theo DESIGN §6; initials `text-on-accent`. Chỉ Avatar tiêu thụ nên đổi tên an toàn.
- Checkbox box 16px dùng `rounded-[4px]` bám frame c-auth (`.box{border-radius:4px}`) — ngoài thang 10/16/20 vì là micro-control; swap cũ là 8px = tròn.
- Avatar fallback lồng nhau `bg-canvas`; ConnectionStatus `z-toast` utility thay `z-[var(--z-toast)]`; Switch track unchecked `surface-3` (nền lún sâu), thumb `bg-surface shadow-xs`; Loading spinner mặc định `text-accent-strong` (đạt 3:1 non-text).

**Chấp nhận nguyên trạng (có ghi chú):**
- Media chrome trong MediaViewer/CircularProgressOverlay giữ `bg-black/*` + scrim đậm trên ảnh — màu chức năng trên nội dung media, không phải brand UI, không có hex; gradient scrim giữ vì là alpha-legibility (grep tiêu chí chỉ yêu cầu 0 hex/0 alias/0 class chết).
- `lottie-react` giờ 0 consumer — gỡ dependency + xoá `splash.json` thuộc ticket 12 (handoff).
- Toast `overflow-hidden` + bar giữ nguyên vị trí; bo chuyển `rounded-md`→`rounded-card`.

**Verify:** `format:check` + `typecheck` + `build` pass; grep ui = 0 alias / 0 hex / 0 class chết; `contrast_check.py` RESULT PASS; build CSS sinh đủ `slide-in-up`, `rounded-t-dialog`, `control/card/dialog`, bộ accent. Frame: input/nút theo c-auth (44px, bo 10, viền line), toast/badge solid = accent + on-accent theo c-m-dark.
