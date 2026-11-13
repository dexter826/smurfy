# Primitives — components/ui theo Nested Canvas

Type: task
Status: ready-for-agent
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
