# Feed — composer + post card + rail phải

Type: task
Status: ready-for-agent
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

## Comments
