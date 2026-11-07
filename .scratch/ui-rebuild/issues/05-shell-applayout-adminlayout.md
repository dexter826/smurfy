# 05: Shell mới — AppLayout + AdminLayout + splash

**What to build:** Đập AppLayout (541 dòng) dựng lại: desktop ≥`lg` sidebar trái (nav chính icon + label: Chat, Feed, Contacts, Profile, Notifications, Settings, Admin nếu role) + khung content + panel phải tuỳ trang; mobile: header gọn + bottom nav ≤5 tab (Chat, Feed, Contacts, Profile, Menu) có safe-area. Giữ nguyên mọi hợp đồng chức năng: global modals (PostViewModal, PostModal, SharePostModal, call dialogs, JoinGroupModal, ConfirmDialogs), click interceptor `/join/`, deep-link sync `?conv=/?post=/?joinToken=`, `document.title` unread, ConnectionStatus, sound unlock gesture đầu. AdminLayout về cùng ngôn ngữ. SplashScreen redesign treatment (Lottie giữ, khung + brand moment mới).

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Desktop: sidebar + panel phải đúng DESIGN.md §4; mobile bottom nav ≤5 tab, không che content
- [ ] Toàn bộ hợp đồng chức năng liệt kê trên vẫn hoạt động (đi qua từng cái một)
- [ ] Bottom nav item active state dùng primary mới; touch target ≥44×44
- [ ] Header/splash dùng logo kit từ ticket 04 (không còn logo cũ)
- [ ] Routes/deep links không đổi; guards (`ProtectedRoute`, `BannedRoute`, `requireAdmin`) nguyên vị trí
- [ ] 7 trục: AppLayout 541 dòng tách theo trách nhiệm (nav shell / global-modals seater / deep-link sync), mỗi module một trách nhiệm; import cập nhật sạch
- [ ] `tsc --noEmit` + `vite build` xanh

