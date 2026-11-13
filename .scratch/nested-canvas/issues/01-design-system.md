# Design system — token v2 trong styles/index.css

Type: task
Status: resolved
Blocked by: —

## Scope
- `src/styles/index.css` (ghi đè hoàn toàn)
- `index.html` (font link Be Vietnam Pro, theme-color giữ `#4C9EEB` cho đến ticket 12)

## Việc làm
1. Dựng `@theme` theo `DESIGN.md` v2: màu `canvas/surface/surface-2/surface-3/line/line-soft/line-strong/ink/ink-2/ink-3/accent/on-accent/accent-strong/accent-soft/accent-edge/focus/overlay` + status `*-soft` + `skeleton` + `shadow-card`/`shadow-float`; thang chữ 12/14/16/20/24/32/40 (Be Vietnam Pro); bo `control 10/card 16/dialog 20/full`.
2. Dark theme qua selector `.dark` với bảng dark của DESIGN.md; giữ cơ chế `themeStore` (class trên `<html>`) như hiện tại.
3. `@utility scroll-hide` (ẩn scrollbar: `&::-webkit-scrollbar{display:none}; scrollbar-width:none`), `duration-fast/base/slow`, `transition-theme`, `tabular-nums` class `tnum`.
4. **Alias di trú (tạm, gỡ ở ticket 12):** giữ tên token cũ trỏ sang giá trị mới để màn chưa migrate không vỡ: `primary→accent`, `primary-hover→accent`, `primary-strong→accent-strong`, `primary-soft→accent-soft`, `primary-edge→accent-edge`, `on-primary→on-accent`, `background→canvas`, `foreground→ink`, `secondary→ink-2`, `muted→ink-3`, `faint→ink-3`, `border→line`, `border-default→line`, `border-strong→line-strong`, `hover→surface-2`, `active→surface-3`, `chat→surface-2`, `message-sent→accent`, `message-received→surface-2`, `surface-sunken→surface-2`, `surface-elevated→surface`, `text-*` giữ nguyên tên class.
5. **Xoá:** `btn-gradient`, `gradient-border`, `screen-loader-cube`, `bg-app-pattern`, `--gradient-primary*`, animation `cubePulse`/`rotateLoader` (splash mới là CSS thuần), shadow `--shadow-accent*`.
6. Định nghĩa `scroll-hide` và thang shadow chuẩn `shadow-card/shadow-float` + `shadow-xs…xl` giữ lại nếu còn dùng.
7. Keyframes giữ tối giản: `fadeIn`, `fadeInUp`, `slideInRight`, `slideInUp` (mới, cho sheet), `shimmer`, `pulseDot`; tôn trọng `prefers-reduced-motion` qua media query tắt tất cả.
8. Reset scrollbar 6px theo `line-strong`.

## Tiêu chí nghiệm thu
- `npm run typecheck` + `npm run build` + `npm run format:check` pass.
- `grep -r 'border-default' src --include='*.tsx'` = 0 (đã chuyển hết sang alias `border-border` hợp lệ).
- `.dark` chứa đủ token; mở dev thấy màn cũ không vỡ (alias).
- Frame tham chiếu: `.scratch/nested-canvas/frames/png/c-chat.png` về màu nền/bubble.

## Comments

- 2026-11-13 — code-review bù cho commit `1df5146` (2 sub-agent song song: Standards + Spec, fixed point `7a11b79`).
  - **Fix:** spinner đang gửi trong ChatInput vẫn `border-white/40 border-t-white` trên nền accent (`canSend` không chứa `!isSending`) — vi phạm bất biến 3 → `border-on-accent/40 border-t-on-accent`.
  - **Fix:** thêm comment đánh dấu legacy ở block radius snap + `text-lg` trong index.css (đọc đủ biết cái nào gỡ ở ticket 12).
  - **Fix:** tạo `.scratch/nested-canvas/contrast_check.py` (24 cặp, light+dark, UTF-8 console) — tiêu chí nghiệm thu "Script contrast_check pass" giờ đo được: RESULT PASS, 1 WARN là ngoại lệ contract (ink-3/surface 4.37, DESIGN không claim AA cho ink-3).
  - **Chấp nhận nguyên trạng (có lý do):** alias `--color-border-default`/`--color-faint` đã 0 consumer nhưng giữ theo ticket mục 4, gỡ ở ticket 12; `text-lg` ≡ `text-xl` giữ vì cả hai còn dùng trong tsx; `bg-app-pattern` biến mất ở 3 màn chưa migrate là chủ đích (pattern bị cấm ở v2, không phải vỡ); smoke "mở dev" là phần chủ repo xem theo quyết định #7.
  - Ghi nhận cho ticket 02+: `primary-hover→accent` làm hover cũ phẳng — hover thật sẽ dựng ở primitives.

## Answer

Đã triển khai xong (commit `feat(nested-canvas)`).

**Làm theo ticket:**
- `@theme` v2 đủ 17 màu `canvas…overlay/accent…focus` + status `on-*`/`*-soft` + `skeleton`; thang chữ 12/14/16/20/24/32/40 (Be Vietnam Pro, kèm `--line-height`/`--letter-spacing` theo bảng typography); bo `control 10/card 16/dialog 20/full`; shadow `card/float` + `xs…xl`.
- Dark qua `.dark` với đúng bảng dark của DESIGN.md (cơ chế `themeStore` giữ nguyên).
- Alias di trú đủ danh sách mục 4, trỏ bằng `var()` nên tự theo dark theme. Đã smoke-test build CSS: `bg-background` → `var(--color-background)` → `var(--color-canvas)`.
- Xoá: `btn-gradient`, `gradient-border`, `screen-loader-cube`, `bg-app-pattern`, `--gradient-*`, keyframes `cubePulse`/`rotateLoader`/`highlightFade`/`float`, `--shadow-accent*`.
- Thêm `@utility scroll-hide`, `@utility tnum`, `slideInUp` (cho sheet), `prefers-reduced-motion` tắt toàn bộ animation/transition, scrollbar 6px theo `line-strong`.
- `index.html`: font link → Be Vietnam Pro 400;500;600;700;800. `theme-color` giữ `#4C9EEB` cho ticket 12.

**Mở rộng ngoài scope 2 file (bắt buộc bởi tiêu chí nghiệm thu, chỉ đổi class không đổi logic):**
1. Sweep 14 chỗ `border-default` ở 12 file tsx → `border-border`/`bg-border`/`ring-border` (tiêu chí grep = 0; chữa viền top bar/bottom nav/auth header không render).
2. 6 file còn dùng `btn-gradient` chuyển sang `bg-primary text-on-primary` (thay nền gradient bằng accent đặc + chữ tối = chữ ký mới, đồng thời khử `text-white` trên accent): ChatInput, CommentInput, ErrorBoundary, AddMemberModal, EditGroupModal, CreateGroupModal (2 chỗ); `shadow-accent` → `shadow-xs`.
3. `Loading.tsx` variant cube/page: lưới 4 khối `screen-loader-cube` xoay → spinner `Loader2` có sẵn (splash thuần CSS sẽ làm ở ticket 12).

**Quyết định interpretive (đều nhằm "màn cũ không vỡ" + bám DESIGN.md):**
- Giữ tên radius legacy làm alias_snap lên thang mới: `sm/md→10`, `lg→16`, `xl/2xl→20`, `full` — màn chưa migrate không thành góc vuông; gỡ ở ticket 12.
- `text-lg` snap 18→20px (thang mới không có 18); giữ `--text-caption`.
- Shadow ở dark = `0 0 #0000` hết theo DESIGN §5.4 (dark phân tầng bằng surface + line, không bóng).
- `primary-hover→accent` (đúng ticket mục 4) khiến hover cũ phẳng — chấp nhận, ticket 02 làm hover thật.

**Contrast (tính WCAG):** mọi cặp chính PASS — on-accent/accent 6.60, ink/canvas 15.74, ink-2/surface 7.58, accent-strong/surface 6.83, accent-strong/accent-soft 6.07, accent-edge/surface 4.38 (non-text), status đủ 4.8+, dark full pass. Hai cặp borderline là sẵn của contract DESIGN.md, không phải lỗi thêm: `ink-3/surface` 4.37:1 (role chữ gợi ý/meta, DESIGN không claim AA cho ink-3) và `accent/surface` 2.84:1 non-text (lý do `accent-edge` tồn tại; nút primary luôn có viền edge).

**Còn lại (cố ý không đụng — ngoài ticket này):** `bg-app-pattern` chết ở 3 file chưa migrate (ChatBox, NotFoundPage, ContactsPage → ticket 04/07/10); scrim `bg-gradient-to-b from-black/60` trong MediaViewer (ticket 07/08); `to-primary-active` chết từ trước ở ProfileHeader (ticket 08); `center-flex`/`text-ellipsis` dead từ trước (nêu ra, không xoá).

**Verify:** `typecheck` + `build` + `format:check` pass; grep `border-default` tsx = 0; grep class đã xoá = 0; 0 hex trong file tsx đã sửa; 0 "gradient" trong index.css; build CSS có đủ alias + `.dark` + `scroll-hide`/`tnum`/reduced-motion; token khớp frame c-chat (canvas `#EDF1F6`, bubble nhận `#F6F8FB`, bubble gửi accent + `on-accent`).
