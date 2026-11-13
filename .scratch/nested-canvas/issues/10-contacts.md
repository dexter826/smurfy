# Bạn bè — 1 header segmented + search + panel chi tiết

Type: task
Status: ready-for-agent
Blocked by: 03

## Scope
- `src/features/friend/components/ContactsPage.tsx`, `contacts/ContactsActionBar.tsx` (gộp vào header), `contacts/ContactsSidebar.tsx` (xoá), `contacts/ContactsDetailPanel.tsx`, `contacts/FriendsListSection.tsx`, `contacts/SuggestionsListSection.tsx`
- `src/features/friend/components/FriendItem.tsx`, `FriendRequestItem.tsx`, `SuggestionItem.tsx`, `AddFriendModal.tsx`

## Việc làm
1. Gộp sidebar + action bar + 4 tab thành 1 header: tiêu đề "Bạn bè" + nút "Lời mời" (badge) + "Thêm bạn" (primary) + segmented `Tất cả · Gợi ý · Đã gửi` + search pill (frame c-contacts).
2. Danh sách bạn bè nhóm theo chữ cái (`letter` header `label-caps`), hàng avatar + tên + thời gian hoạt động + icon chat/more; mục chọn `accent-soft`.
3. Panel phải 320 (desktop): avatar lớn, tên, trạng thái bạn bè, nút Nhắn tin + Xem hồ sơ, khối thông tin, hành động Ghim/Hủy kết bạn; mobile: mở sheet (component từ ticket 02).
4. FriendRequestItem/SuggestionItem: card nhỏ gọn, nút Chấp nhận/Từ chối `primary`/`secondary`, Kết bạn `primary`.
5. AddFriendModal: primitive mới + kết quả tìm kiếm.
6. Giữ nguyên `useContacts` logic (sort, search, dismiss suggestion, refresh).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; xoá ContactsSidebar; grep scope 0 hex/0 class chết.
- Khớp frame c-contacts (desktop).
- Kết bạn/huỷ kết bạn/chặn (BlockOptionsModal) hoạt động; chọn người mở panel/sheet đúng breakpoint.

## Comments
