# 07: Chat — ChatPage + bubble + input + join

**What to build:** ChatPage + MessageBubble + chat input + FilePreview/FileMessage + JoinGroupPage/JoinGroupModal về design mới theo DESIGN.md §7 (bubble gửi = `message-sent` + chữ tối on-primary; nhận = `message-received` + foreground; radius card 12px + đuôi 8px; meta caption). Giữ nguyên 40+ handler props qua `useChat()`, subscriptions, typing indicator, reaction picker.

**Blocked by:** 05

**Status:** done

- [x] Raw palette = 0 trong toàn bộ feature chat (grep verify): FileMessage, CallMessage, FilePreview, JoinGroupModal, JoinGroupPage → token semantic (danger/info/success/warning-soft, primary-soft/edge)
- [x] Bubble contrast: gửi dùng `text-on-primary` (trước là `text-foreground` — dark mode foreground sáng trên nền cornflower = 2.9:1 fail, giờ on-primary 6.6:1 cả 2 mode); timestamp/meta `text-caption`; gửi = `text-on-primary/70`
- [x] Radius bubble về thang DESIGN (card 12px `rounded-md` + đuôi 8px `rounded-sm`); reply preview gửi dùng on-primary tones; bỏ dead class `animate-in fade-in`
- [x] 7 trục: cụm 7 modal (CreateGroup/AddMember/EditGroup/Transfer×2/Forward/BlockOptions) tách thành `ChatModals` seater + `useChatModalState()`; MessageReplyPreview tách riêng; ChatPage truyền bundle `useChat()` nguyên trạng — hợp đồng handler giữ nguyên
- [x] Chat area dùng token `bg-chat` (light #F5F7F9 / dark #090C10 theo DESIGN §2)
- [x] Input mobile: `pb-safe` safe-area đã có sẵn ở 3 variant (giữ nguyên); keyboard không che (viewport dvh shell từ ticket 05)
- [x] `tsc --noEmit` + `vite build` xanh
