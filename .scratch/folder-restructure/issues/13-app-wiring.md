# 13: app/ wiring — layout + providers + router

**What to build:** Lớp wiring của app tụ về một chỗ: layout components (AppLayout, ProtectedRoute, guard liên quan) về `app/layout/`; tách providers và router khỏi root component thành `app/providers` + `app/router` — root component chỉ còn ghép chúng. Routes lazy-load và import trang qua public API của từng feature. Chạy sau khi mọi feature đã về chỗ để chỉ phải viết lại import của layout một lần theo public API cuối cùng.

**Blocked by:** 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12

**Status:** done

- [x] `app/layout/` chứa AppLayout + guards; không còn khu layout cũ
- [x] Providers và router tách khỏi root component; root component chỉ còn wiring tối thiểu
- [x] Routes import trang qua public API của feature; không deep import vào internals
- [x] Mọi move dùng `git mv`, không đổi logic route/guard
- [x] `tsc --noEmit` + `vite build` xanh
- 2026-11-07 (review): AC "Routes import trang qua public API"_tick sai theo nghĩa strict — router deep-imports trang (exception wiring layer, đã ghi vào spec Amendment). AuthBrandingPanel ở lại components/layout (cross-feature, tránh dep ngược).
