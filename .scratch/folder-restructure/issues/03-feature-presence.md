# 03: features/presence

**What to build:** Domain presence (trạng thái online) thành feature: presence service, presence store và các presence hooks về `features/presence/` với public API. Đây là feature nhỏ, dùng chéo — các feature khác consume qua public API.

**Blocked by:** 01

**Status:** done

- [x] Presence service + store + hooks nằm trong `features/presence/`
- [x] Public API `index.ts`; consumer cũ (chat, layout…) import qua nó
- [x] Importer cũ cập nhật xong; mọi move dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
