# 03: Kit Radix nhóm 2 — overlay + select

**What to build:** Overlay primitives sang Radix trực tiếp, call-site đổi cùng ticket: Modal (portal, `maxWidth`/`fullScreen`) → Radix Dialog với API mới; thêm AlertDialog (confirm); DropdownMenu thay Dropdown; Select + SearchableSelect; Popover; DatePicker (restyle, giữ logic chọn ngày); Toast(+Container) giữ zustand toastStore, bên trong Radix Toast hoặc restyle chuẩn a11y. Focus trap + scroll lock Radix thay portal manual hiện có.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Mọi modal/dropdown/select hiện có mở/đóng đúng qua Radix: Esc, click-outside, focus trap, focus return
- [ ] Chat input + MediaViewer không bị scroll-lock lệch khi modal mở
- [ ] Call-site Modal/Dropdown/Select đổi cùng ticket sang API Radix mới
- [ ] Toast: aria-live đúng, không chặn click, stack ≤ giới hạn hiện có
- [ ] `tsc --noEmit` + `vite build` xanh

