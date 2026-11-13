# Design system — token v2 trong styles/index.css

Type: task
Status: ready-for-agent
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
