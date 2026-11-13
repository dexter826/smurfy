# Hồ sơ — header + 2 cột Nested Canvas

Type: task
Status: ready-for-agent
Blocked by: 03

## Scope
- `src/features/profile/components/ProfilePage.tsx`, `profile/ProfileHeader.tsx`, `ProfileTabs.tsx`, `ProfileAboutCard.tsx`, `ProfileMediaPreview.tsx`, `PostsTab.tsx`, `PhotosTab.tsx`, `ProfilePrivacySelector.tsx`, `ProfileSkeleton.tsx`, `EditProfileModal.tsx`

## Việc làm
1. Layout: cover + header là panel `surface` bo `card` trên `canvas`; avatar 104 chồng lên cover với viền `surface` 4px (frame c-profile).
2. Tên + `@handle` + bạn bè + pill trạng thái; nút hành động (Nhắn tin = primary, Chỉnh sửa = secondary, more = ghost).
3. Tabs Bài viết · Ảnh: gạch chân accent 2px; thân trang 2 cột: Giới thiệu 340 + bài viết (desktop), 1 cột mobile.
4. ProfileAboutCard: card `post-card`, hàng icon `surface-2` bo `control`; ProfileMediaPreview: grid 3 cột.
5. PhotosTab: grid 3 cột gap 6, thumbnail bo `control`.
6. EditProfileModal: primitive mới; ProfilePrivacySelector giữ segmented style.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-profile và c-m-profile.
- Đổi avatar/cover (crop, upload progress), chỉnh hồ sơ, tab ảnh/bài viết hoạt động như cũ.

## Comments
