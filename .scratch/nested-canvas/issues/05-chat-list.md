# Chat list — panel hội thoại

Type: task
Status: resolved
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

## Answer

**Đủ 5 mục:**
1. Header dựng lại theo frame `.panel-head`: tiêu đề "Tin nhắn" 20px (`text-xl font-bold`) + nút tạo nhóm `variant="primary"` (accent, `aria-label`) + toggle lưu trữ (kích hoạt `accent-strong`/`accent-soft`); search pill chuyển xuống hàng dưới, `bg-surface-2 rounded-full` = `search-field`; bỏ `border-r` ở root ConversationList (panel wrapper trong ChatPage — làm ở ticket 04 — giữ border/bo).
2. Filters dựng lại thành segmented đúng `seg`: track `surface-2` bo `control` padding 3px, item kích hoạt `bg-surface text-ink shadow-card` bo 8 (số liệu frame `.seg>span`), nhãn **"Tất cả · Nhóm · Người lạ"** — ticket ghi "Bạn bè" nhưng filter `group` trong `useConversationGroups` lọc **chat nhóm** (`c.data.isGroup`), nhãn "Bạn bè" sẽ sai nghĩa nên giữ "Nhóm"; badge đếm `on-accent`/`on-danger` + `tnum`; nút đánh-dấu-đã-tham hết `aria-label`.
3. ConversationItem: chọn = `bg-accent-soft` + tên `accent-strong`; giờ `tnum`, unread `accent-strong`; badge unread `bg-accent text-on-accent` + dot `bg-accent` (frame `.badge` — đổi từ danger); pin icon `accent`; typing `accent-strong`; pinned tint `bg-canvas/60`; hàng `rounded-card`. Section **"Đã ghim"/"Gần đây"** dựng bằng `label-caps` (utility mới 12/600/1.2/+0.08em uppercase) + group theo `userChat?.isPinned` có sẵn trên conversation object — không đụng logic `useConversationGroups`.
4. Nhóm hội thoại giữ nguyên `useConversationGroups` — chỉ visual.
5. SearchResults: hàng hover `surface-2`, `rounded-card`; link "Xoá lịch sử" `accent-strong`.

**Đổi phụ:** `MessengerSkeleton` dựng lại khớp shell mới (canvas + joined panels, bubble skeleton góc 5px, sent `bg-accent/15`); `Input` (ui primitive) chuyển ghép class sang `cn` (tailwind-merge) để override `rounded-full`/`bg-surface-2` của search-field thắng base — cần thiết cho mục 2; archived bar `surface-2` viền `line-soft`.

**Chấp nhận:** badge "Người lạ" inactive giữ `bg-danger text-on-danger` (semantics riêng của filter, không phải badge unread); bo 8px của item segmented là số liệu frame, ngoài thang 10/16/20; `text-[10px]` badge đúng số frame (badge 9.5–10px, metadata vi mô); icon 15/18 ngoài bộ 16/20/24 — pre-existing khắp app, không đụng thêm.

**Verify:** CI 3 pass; grep scope (conversation/*, MessengerSkeleton, Input) = 0 alias / 0 hex / 0 class chết; `contrast_check.py` PASS; khớp frame c-chat cột trái (title 20 + nút accent, search pill, segmented, item accent-soft) và c-m-list.
