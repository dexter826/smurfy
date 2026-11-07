# 09: Profile + settings + notifications + contacts

**What to build:** ProfilePage (+EditProfileModal, cover/avatar), SettingsPage (+ChangePasswordModal), NotificationsPage, ContactsPage (407), MobileMenuPage về design mới. Panel phải của shell (contacts/chi tiết desktop) gắn vào đây theo DESIGN.md §4.

**Blocked by:** 07

**Status:** done

- [x] 4 trang + modals con mới; panel phải desktop hoạt động (contacts `ContactsDetailPanel` 320px trên màn hình desktop xl)
- [x] MobileMenuPage còn dùng được cho bottom-nav tab "Menu" (route `/menu` giữ, dọn `btn-gradient` sang `bg-primary`)
- [x] Forms trong settings/profile: label visible, error cạnh field (EditProfileModal, ChangePasswordModal)
- [x] 7 trục: ContactsPage 407 tách thành `ContactsSidebar`, `ContactsActionBar`, `FriendsListSection`, `RequestsListSection`, `SuggestionsListSection`, `ContactsDetailPanel`
- [x] `tsc --noEmit` + `vite build` xanh
