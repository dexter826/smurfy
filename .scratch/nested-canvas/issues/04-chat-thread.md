# Chat thread — bố cục Nested Canvas

Type: task
Status: resolved
Blocked by: 03

## Scope
- `src/features/chat/components/chat/ChatBox.tsx`, `ChatBoxHeader.tsx`, `ChatBoxSkeleton.tsx`, `MessageList.tsx`, `message/MessageBubble.tsx`, `message/MessageContent.tsx`, `message/MessageActions.tsx`, `message/MessageReplyPreview.tsx`, `message/MessageStatus.tsx`, `message/MessageRequestBanner.tsx`, `message/PinnedMessageBanner.tsx`, `message/content/*`, `TypingIndicator.tsx`, `input/ChatInput.tsx`, `input/FilePreview.tsx`, `input/MentionList.tsx`, `DragDropZone.tsx`, `ChatPage.tsx` (phần thread).

## Việc làm
1. Thread: nền `canvas`, khung chat là panel `surface` bo `card` trên canvas (theo frame c-chat); header 60px; khu tin nhắn nền `surface-2`.
2. Bubble: gửi = `accent`+`on-accent`, bo `card` + góc dưới phải 5px; nhận = `surface-2`+`ink`, góc dưới trái 5px; avatar lề 32px; tin liên tiếp ẩn avatar; tên gửi `accent-strong` (nhóm); reply preview viền trái 2px; giờ `caption` `ink-3` tabular.
3. Composer: panel `surface` đáy, input pill `surface-2` bo `control`, nút gửi `accent`; reply/edit bar viền trái accent; mention list nổi `shadow-float`.
4. DragDropZone: overlay `surface` + viền dashed `accent` (bo `card`), theo frame hiện có nhưng token mới.
5. Banner (block, pin, request): `accent-soft`/`warning-soft` tương ứng, bo `control`.
6. ChatBoxSkeleton theo lưới mới.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep trong scope 0 hex/0 class chết.
- Đối chiếu frame c-chat: vị trí header, bubble, composer, panel lồng khớp; lệch ghi lý do vào ticket.
- Nhắn thử 1-1/nhóm: reply, edit, recall, forward, reaction, typing hoạt động như cũ.

## Answer

**Đủ 6 mục:**
1. Thread panel hoá: `ChatPage` root `md:gap-3 md:p-3` (12px theo frame c-chat `.app{padding:12px;gap:12px}` — lệch §4 spacing.md 16px, lý do: frame đã duyệt); khung chat = `bg-surface md:border md:border-line md:border-l-0 md:rounded-r-card md:shadow-card`, list wrapper `md:-mr-3` huỷ gap để list+thread nối thành một card liền (khớp `.panel{margin-right:-12px}` của frame), seam = border phải của list; khu tin nhắn `bg-surface-2`; header 60px viền `line-soft` (frame extra `.thread-head{height:60px}`); composer viền trên `line-soft` (đồng bộ cả state loading/blocked). Mobile giữ full-bleed không bo (`md:` prefix).
2. Bubble: gửi `bg-accent text-on-accent border-accent-edge rounded-card rounded-br-[5px]`; nhận `bg-surface-2 text-ink border-line rounded-card rounded-bl-[5px]`; tên gửi group `text-accent-strong` (§7); reply preview viền trái **2px currentColor** (§7 "cùng màu chữ" — bỏ border-accent/40 cứng, để kế thừa màu chữ từng nhánh); giờ `caption`/`ink-3` + `tnum`; giữ nguyên cấu trúc grid 32px + ẩn avatar tin liên tiếp.
3. Composer: input pill `rounded-control bg-surface-2`; nút gửi `bg-accent text-on-accent` (spinner `on-accent`); reply/edit bar viền trái accent 4px trên `surface-2`; MentionList nổi `rounded-card shadow-float` với mục chọn `accent-soft` + `accent-strong` (§7 dropdown).
4. DragDropZone: overlay `bg-surface/60 backdrop-blur-sm rounded-card border-2 dashed border-accent/50`.
5. Banner: request = `accent-soft rounded-control` (nội dung pill trên surface), pin = `warning-soft rounded-control` (mx/my trong panel), block bar giữ `bg-danger/10`.
6. ChatBoxSkeleton: bubble skeleton `rounded-card` + góc 5px, sent skeleton `bg-accent/15`.

**Đổi phụ:** `ChatPage` list wrapper 300/360 → **320** cố định + panel classes (phần layout của ticket 05 làm luôn tại đây để khỏi đụng ChatPage hai lần — ticket 05 chỉ còn restyleConversationList/Item/Filters/SearchResults bên trong); scroll-to-bottom badge `text-white`→`text-on-accent`; hover icon action → `accent`/`accent-strong` theo vai trò (icon=accent, text link=accent-strong); `bg-app-pattern` bỏ ở thread.

**Chấp nhận (media chrome):** `bg-black/40 text-white` timestamp trên ảnh, `bg-black/5 dark:bg-white/5` tint shared-post/reply-preview, `text-white` icon trên image placeholder — màu chức năng trên nội dung media, không hex, không phải brand UI.

**Verify:** CI 3 pass; grep scope (ChatBox, header, skeleton, MessageList, message/*, content/*, TypingIndicator, input/*, DragDropZone, ChatPage) = 0 alias / 0 hex / 0 class chết; `contrast_check.py` PASS; bubble khớp frame c-chat (accent + on-accent + góc 5px, nhận surface-2, thread surface-2, panel bo card).
