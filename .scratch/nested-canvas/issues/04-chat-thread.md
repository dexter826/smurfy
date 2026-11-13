# Chat thread — bố cục Nested Canvas

Type: task
Status: ready-for-agent
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

## Comments
