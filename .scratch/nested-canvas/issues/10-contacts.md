# Bạn bè — 1 header segmented + search + panel chi tiết

Type: task
Status: resolved
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

## Answer

**Đủ 6 mục:**
1. Header gộp trong ContactsPage: tiêu đề "Bạn bè" (display-lg) + nút **"Lời mời"** (badge số lời mời; active = primary) + **"Thêm bạn"** primary + segmented `Tất cả · Gợi ý · Đã gửi` (track surface-2, active surface+shadow-card, bo 8 số frame) + search pill 40px + sort A-Z (tab Tất cả) / làm mới gợi ý. **Xoá ContactsSidebar.tsx + ContactsActionBar.tsx**; card chính `rounded-card border-line shadow-card` trên canvas (gap 12 frame).
2. FriendsListSection: letter header `label-caps text-ink-3`; nhóm giữ nguyên `groupedFriends`; hàng item `rounded-card`, chọn `accent-soft` (giữ hành vi cũ).
3. ContactsDetailPanel: **≥xl** panel phải inline 320; **<xl** SlideUpSheet (ticket 02) khi chọn người; bỏ gradient banner (vi phạm) — avatar + tên + trạng thái (UserStatusText) + nút Nhắn tin/Hồ sơ + khối thông tin + Hủy kết bạn/Quản lý chặn.
4. FriendRequestItem/SuggestionItem: card/token mới; nút Chấp nhận primary / Từ chối secondary / Kết bạn primary giữ nguyên variant.
5. AddFriendModal: primitive Modal + kết quả tìm kiếm token sạch.
6. `useContacts` giữ nguyên (sort, search, dismiss, refresh) — chỉ di chuyển chỗ render.

**Chấp nhận:** segmented item bo 8px số frame; `TabConfigItem` giữ trong types.ts (không còn consumer — gỡ kèm ticket 12 nếu owner muốn).

**Verify:** CI 3 pass (typecheck/build verify bằng exit code); grep scope = 0 alias / 0 hex / 0 class chết; 0 tham chiếu ContactsSidebar/ContactsActionBar; `contrast_check.py` PASS; khớp frame c-contacts.
