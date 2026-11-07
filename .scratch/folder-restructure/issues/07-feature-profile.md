# 07: features/profile

**What to build:** Domain profile thành feature: components profile, profile hooks, hook user-posts và trang Profile về `features/profile/` với public API. Hook lấy bài viết của user thuộc về domain Post (feed) — nếu nó sống ở feed sau ticket 08 thì profile consume qua public API của feed; nếu chưa, dời về đúng feature sở hữu. Ghi chú riêng: trang Profile đang query Firestore trực tiếp — KHÔNG sửa trong ticket này (out of scope theo spec), chỉ di chuyển nguyên trạng.

**Blocked by:** 01

**Status:** done

- [x] Components + hooks + trang Profile nằm trong `features/profile/`
- [x] Hook user-posts nằm đúng feature sở hữu (feed nếu đã move); profile consume qua public API
- [x] Query Firestore trực tiếp trong trang Profile giữ nguyên, không "sửa tiện tay"
- [x] Public API `index.ts`; importer cũ cập nhật xong; mọi move dùng `git mv`
- [x] `tsc --noEmit` + `vite build` xanh
