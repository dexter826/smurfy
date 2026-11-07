# 09: features/comment (tách khỏi feed)

**What to build:** Comment là khái niệm hạng nhất trong GLOSSARY (Comment ≠ Message) — tách thành feature riêng: components comment, comment service, các comments store slices về `features/comment/` với public API. Feed consume comment qua public API của nó. Chạy sau ticket feed vì hai bên cùng khu vực components cũ.

**Blocked by:** 08

**Status:** done

- [x] Comment components + service + comments slices nằm trong `features/comment/`
- [x] Không còn folder comment trong khu feed; feed import qua public API của comment
- [x] Public API `index.ts`; importer cũ cập nhật xong
- [x] Mọi move dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
