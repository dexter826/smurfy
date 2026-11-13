# Chat list — panel hội thoại

Type: task
Status: ready-for-agent
Blocked by: 03

## Scope
- `src/features/chat/components/chat/conversation/ConversationList.tsx`, `ConversationItem.tsx`, `ConversationHeader.tsx`, `ConversationFilters.tsx`, `SearchResults.tsx`, `MessengerSkeleton.tsx`
- Phần list trong `ChatPage.tsx` (chiều rộng 320, ẩn/hiện theo breakpoint hiện có).

## Việc làm
1. List panel 320 `surface` viền phải `line`; header tiêu đề 20 + nút tạo mới `accent`.
2. Search pill `search-field`; segmented filter `Tất cả · Bạn bè · Người lạ` kiểu `seg` (track `surface-2`, item kích hoạt `surface` + shadow-card).
3. ConversationItem: mục chọn nền `accent-soft` + tên `accent-strong`; section "Đã ghim"/"Gần đây" nhãn `label-caps`; badge đếm `accent`/`on-accent`; giờ `tabular-nums`; avatar kèm status dot.
4. Nhóm hội thoại (bạn bè / lời mời / người lạ) giữ nguyên logic `useConversationGroups`, chỉ đổi visual.
5. SearchResults + lịch sử tìm kiếm: list item hover `surface-2`.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-chat (cột trái) và c-m-list (danh sách + segmented).
- Pin/unpin, mute, archive, mark-unread, xoá hội thoại vẫn hoạt động.

## Comments
