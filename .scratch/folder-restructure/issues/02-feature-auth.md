# 02: features/auth

**What to build:** Domain auth thành một feature hoàn chỉnh: auth store, auth service và cả 3 trang auth (Login, Email Verification, Onboarding) về `features/auth/`, có public API `index.ts`. Router root import trang qua public API của feature.

**Blocked by:** 01

**Status:** done

- [x] Toàn bộ code auth (store, service, components, các trang thuộc auth) nằm trong `features/auth/`
- [x] Public API `index.ts` export đúng surface mà bên ngoài cần; import chéo vào feature chỉ qua nó
- [x] Toàn bộ importer cũ cập nhật xong (router, guards…)
- [x] Mọi di chuyển dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
