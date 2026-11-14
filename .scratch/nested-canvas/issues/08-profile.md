# Hồ sơ — header + 2 cột Nested Canvas

Type: task
Status: resolved
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

## Answer

**Đủ 6 mục (1 mục thiếu dữ liệu — ghi rõ):**
1. Root `bg-canvas`; cover + header = panel `bg-surface rounded-card border-line shadow-card overflow-hidden` nổi trên canvas (mx/mt theo frame); cover fallback gradient chết → `bg-surface-3`; cover edit pill bo `control` (media chrome black/white giữ).
2. Tên + **pill trạng thái "Đang hoạt động"** (`accent-soft` + chấm `success`, từ `user.status` — §7 status pill) cạnh tên; nút hành động đúng variant (Nhắn tin primary, Chỉnh sửa secondary, more **ghost** + `aria-label`); "Bạn bè" button chip `accent-soft + accent-strong`. **Thiếu: @handle + số bạn bè** — `User` type không có trường hiển thị; thêm dữ liệu nằm ngoài "chỉ restyle", cần owner quyết định.
3. Tabs gạch chân accent 2px giữ; thân 2 cột: sidebar **340** (`md:w-[340px]` — đúng ticket, bỏ 320/360 cũ) + bài viết; 1 cột mobile.
4. ProfileAboutCard: card `rounded-card shadow-card`, hàng icon `bg-surface-2 rounded-control`; ProfileMediaPreview: grid 3 cột thumbs `rounded-control`, link "Xem tất cả" `accent-strong`.
5. PhotosTab: grid 3 cột thumbnail `rounded-control` nền `surface-2`; skeleton khớp.
6. EditProfileModal dùng primitive Modal (hưởng visual 02); ProfilePrivacySelector track `surface-2` item `rounded-control`.

**Lệch đã ghi:** avatar dùng `size="xl"` (96px) — thang Avatar component không có bậc 104 (frame `.av.xl{104px}`), 96 là bậc gần nhất; muốn đúng 104 cần thêm bậc size vào Avatar (ticket 12 có thể làm kèm brand).

**Verify (sau code-review):** CI 3 pass; grep scope = 0 alias / 0 hex / 0 class chết; panel dùng đúng `bg-surface` (lỗi bg-canvas đã sửa) + root `bg-canvas`; chips `accent-soft + accent-strong`; EditProfileModal field `rounded-control bg-surface-2`; counter `tnum`; skeleton khớp 340 + rounded-b-card; `contrast_check.py` PASS.
