# 11: features/call (tách khỏi chat)

**What to build:** Domain call (Zego) thành feature độc lập: call components (call window…), call manager hook, call sounds hook, RTDB call service, call store về `features/call/` với public API. Chat khởi gọi call qua public API — call không còn là nhánh con của chat. Chạy sau ticket chat vì cùng khu vực components/services cũ.

**Blocked by:** 10

**Status:** done

- [x] Call components + hooks + service + store nằm trong `features/call/`
- [x] Không còn folder call trong khu chat; chat consume qua public API
- [x] Public API `index.ts`; importer cũ (layout toàn cục, chat) cập nhật xong
- [x] Mọi move dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
