# 05: Shell mới — AppLayout + AdminLayout + splash

**What to build:** Đập AppLayout (541 dòng) dựng lại theo DESIGN.md §4: desktop ≥`lg` sidebar trái 264px (nav chính icon + label + badge số) + khung content; mobile: top bar 56px (logo kit + bell) + bottom nav ≤5 tab có safe-area. Giữ nguyên mọi hợp đồng chức năng: global modals (PostViewModal, PostModal, SharePostModal, call dialogs, JoinGroupModal, ConfirmDialogs), click interceptor `/join/`, deep-link sync `?conv=/?post=/?joinToken=`, `document.title` unread, sound unlock gesture đầu. AdminLayout về cùng ngôn ngữ (dùng chung AppSidebar). SplashScreen redesign: logo kit + shimmer (thay Lottie cũ màu brand cũ). Panel phải gắn ở page-level (ticket 09 — contacts).

**Blocked by:** 03

**Status:** done

- [x] Desktop ≥lg: sidebar 264px (brand + nav + badge số + footer theme/logout/user) theo DESIGN.md §4; mobile bottom nav ≤5 tab không che content
- [x] Hợp đồng chức năng giữ nguyên từng cái: subscriptions bootstrap, sound unlock, interceptor `/join/` + joinToken sync, `?post=` sync, `document.title`, call dialogs, JoinGroupModal, post modals, logout confirm
- [x] Bottom nav active = primary-soft/primary-strong; badge số tabular-nums; touch target ≥44×44 (sidebar item 44px, tab 56px)
- [x] Sidebar brand dùng `logo.svg` kit mới; splash mới: `logo.svg` + wordmark + shimmer bar (thay Lottie màu brand cũ)
- [x] Routes/deep links không đổi; guards nguyên vị trí (`ProtectedRoute`, `BannedRoute`, `requireAdmin` không đụng)
- [x] 7 trục: AppLayout 541 → ~90 dòng composition; tách `AppSidebar` (dùng chung app/admin), `BottomNav`, `MobileTopBar`, `GlobalModals` (modals seater), `hooks/useGroupInvite` (interceptor + token sync), `hooks/useShellEffects` (sound unlock + document title)
- [x] `tsc --noEmit` + `vite build` xanh

## Panel phải (xl)

Panel phải (contacts/chi tiết) là layout của từng trang — gắn ở ticket 09 (ContactsPage) theo DESIGN.md §4.
