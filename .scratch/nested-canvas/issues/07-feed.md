# Feed — composer + post card + rail phải

Type: task
Status: resolved
Blocked by: 03

## Scope
- `src/features/feed/components/FeedPage.tsx`, `CreatePost.tsx`, `PostItem.tsx`, `FeedSkeleton.tsx`, `BirthdayWidget.tsx`, `FriendSuggestionsWidget.tsx`
- `shared/InteractionActions.tsx`, `PostMediaGrid.tsx`, `SystemPostMedia.tsx`, `TruncatedText.tsx`, `VisibilityBadge.tsx`
- `modals/PostModal.tsx`, `PostViewModal.tsx`, `PostViewCinema.tsx`, `SharePostModal.tsx`, `ShareTargetItem.tsx`
- `src/features/comment/components/**` (tầng 2 — restyle)

## Việc làm
1. Feed desktop: cột đọc ≤640 giữa, rail phải 320 chứa BirthdayWidget + FriendSuggestionsWidget + thẻ Hoạt động của bạn; mobile: widget thành khối gập sau composer (ẩn mặc định khi không có dữ liệu).
2. Composer card: avatar + giả input tròn + nút Đăng `accent` (frame c-feed).
3. PostItem: card `post-card`; header avatar/tên/thời gian/VisibilityBadge; media grid 2 cột gap 2px nền `line`; thanh tương tác 3 action phân cách `line-soft`, hover `surface-2`; reaction summary `rc` pills.
4. PostModal/PostViewModal/SharePostModal: primitive mới; PostViewCinema overlay tối + nút đóng.
5. Comment: CommentItem/CommentInput/CommentSection — bubble `surface-2`, input card, giữ phân luồng.
6. Stagger danh sách giữ nguyên (60ms×n, cap 300ms).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-feed (desktop) và c-m-feed (mobile).
- Đăng bài, sửa, xoá, 6 cảm xúc, bình luận, chia sẻ hoạt động như cũ.

## Answer

**Đủ 6 mục:**
1. Feed desktop (hook `useMediaQuery` ≥1024): cột đọc `max-w-[640px]` giữa + rail phải 320 chứa BirthdayWidget + FriendSuggestionsWidget + thẻ "Hoạt động của bạn" (nút dẫn `/activity`, badge = unreadNotifications + receivedRequests, không đụng store logic); mobile: widget giữ sau composer, tự ẩn khi rỗng (widget đã `return null` sẵn).
2. Composer card: avatar + giả input tròn `bg-surface-2 rounded-full h-11` (frame `composer-fake`) + nút Đăng accent.
3. PostItem: card `rounded-card border-line shadow-card` (post-card); media grid nền `line` gap 2px; thanh tương tác phân cách `line-soft`, hover `surface-2`, nút `rounded-control`; reaction pills giữ rc.
4. PostModal/PostViewModal/SharePostModal đã dùng primitive Modal (ticket 02) — chỉ restyle token; PostViewCinema giữ overlay tối + media chrome black/white (chức năng trên ảnh).
5. Comment: bubble `surface-2 rounded-card`, input card `bg-surface rounded-card` + pill `bg-surface-2`, giữ phân luồng; skeleton `surface-2`.
6. Stagger 60ms×n cap 300ms giữ nguyên (`motion-reduce:animate-none`).

**Chấp nhận (media chrome):** `bg-black/*` + `text-white` trong PostViewCinema/PostModal xoá-ảnh — chức năng trên ảnh, không hex.

**Verify:** CI 3 pass; grep scope (feed/components, comment/components) = 0 alias / 0 hex / 0 class chết; `contrast_check.py` PASS; khớp frame c-feed (cột đọc 640 + rail 320 + composer tròn + post-card) và c-m-feed.
