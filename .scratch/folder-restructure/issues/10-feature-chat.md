# 10: features/chat (+ group bên trong)

**What to build:** Domain chat — to nhất — thành feature: toàn bộ chat components (conversation, message, details, input, modals nhóm, reactions), chat hooks, chat services (RTDB conversation/group), các RTDB store slices + chat store, trang Chat và trang Join Group về `features/chat/` với public API. Group là một loại Conversation (GLOSSARY: Member/Admin) nên service/slice/modal nhóm nằm BÊN TRONG chat. Chạy sau ticket feed vì đã kéo Share Post modal ra khỏi khu chat/modals.

**Blocked by:** 08

**Status:** done

- [x] Chat components/hooks/services/slices + Chat + Join Group nằm trong `features/chat/`, group nằm bên trong
- [x] Không còn modal Share Post trong khu chat (đã về feed ở ticket 08)
- [x] Public API `index.ts`; consumer (layout, call sau này, admin nếu có) import qua nó
- [x] Importer cũ cập nhật xong; mọi move dùng `git mv`, không đổi logic
- [x] `tsc --noEmit` + `vite build` xanh
