# 07: Chat — ChatPage + bubble + input + join

**What to build:** ChatPage (410 dòng) + MessageBubble (433) + chat input + FilePreview/FileMessage + JoinGroupPage về design mới: density chuẩn, nền chat dark `#090C10`, bubble mới (primary cho mình, card cho người khác), khối raw palette classes trong FilePreview (×14) + FileMessage (×10) thay bằng token. Giữ nguyên 40+ handler props qua `useChat()`, subscriptions, typing indicator, reaction picker.

**Blocked by:** 05

**Status:** ready-for-agent

- [ ] Không còn raw palette class (bg-red-500…) trong feature chat — hết bằng token
- [ ] Bubble contrast đúng 4.5:1 cả light/dark; timestamp/meta dùng muted-foreground
- [ ] Mọi handler/subscription hoạt động như trước (gửi, nhận realtime, reaction, file)
- [ ] Input mobile: keyboard không che, safe-area đúng
- [ ] 7 trục: ChatPage 410 + MessageBubble 433 tách theo trách nhiệm (bubble variants, media parts, meta row); hợp đồng handler qua `useChat()` giữ nguyên
- [ ] `tsc --noEmit` + `vite build` xanh

