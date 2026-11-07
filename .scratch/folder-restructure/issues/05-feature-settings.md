# 05: features/settings

**What to build:** Domain settings thành feature: components settings và trang Settings về `features/settings/` với public API. Phần UI liên quan Block tham chiếu `lib/block` (đã dời ở ticket 01), không nhúng logic Block vào feature.

**Blocked by:** 01

**Status:** done

- [x] Components settings + trang Settings nằm trong `features/settings/`
- [x] UI Block tham chiếu `lib/block`, không copy logic
- [x] Public API `index.ts`; importer cũ cập nhật xong
- [x] Mọi move dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
