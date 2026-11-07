# 06: features/friend (đổi tên từ contacts)

**What to build:** Domain bạn bè thành feature với tên theo GLOSSARY: `features/friend/` (thay cho folder contacts cũ — cùng một khái niệm hai cái tên là lỗi naming). Gồm friend service, contacts store, contacts hooks và trang/các component liên quan, đổi tên thư mục cho khớp thuật ngữ Friend/FriendStatus/Unfriend. Chỉ đổi tên đường dẫn — không đổi tên symbol trong code.

**Blocked by:** 01

**Status:** done

- [x] Feature tên là `friend`, chứa service + store + hooks + components của domain bạn bè
- [x] Không đổi tên biến/hàm/export — chỉ di chuyển và cập nhật import
- [x] Public API `index.ts`; importer cũ cập nhật xong
- [x] Mọi move dùng `git mv`
- [x] `tsc --noEmit` + `vite build` xanh
