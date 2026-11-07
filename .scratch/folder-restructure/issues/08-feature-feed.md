# 08: features/feed (+ tách Share Post flow khỏi chat)

**What to build:** Domain post/feed thành feature: components feed (trừ phần comment), post service, system post service, các posts store slices, trang Feed, và toàn bộ Share Post flow về `features/feed/`. Share Post là hành vi trên Post (GLOSSARY: Share Post) — kéo modal chia sẻ + share store ra khỏi khu chat/modals về đúng feature sở hữu Post; chat sau này consume qua public API. 

**Blocked by:** 01

**Status:** done

- [x] Feed components (trừ comment) + post/system-post service + posts slices + trang Feed nằm trong `features/feed/`
- [x] Share Post flow (modal, store, message util) về `features/feed/`, không còn trong khu chat
- [x] Public API `index.ts`; consumer cũ (layout, profile, chat) import qua nó
- [x] Importer cũ cập nhật xong; mọi move dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
