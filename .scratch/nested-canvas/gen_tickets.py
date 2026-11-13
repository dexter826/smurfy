"""Sinh 12 ticket cho nested-canvas theo quy ước docs/agents/issue-tracker.md."""

from __future__ import annotations

import os

HERE = os.path.dirname(os.path.abspath(__file__))
ISSUES = os.path.join(HERE, "issues")

TICKETS = [
    {
        "num": "01",
        "slug": "design-system",
        "title": "Design system — token v2 trong styles/index.css",
        "blocked": "",
        "body": """## Scope
- `src/styles/index.css` (ghi đè hoàn toàn)
- `index.html` (font link Be Vietnam Pro, theme-color giữ `#4C9EEB` cho đến ticket 12)

## Việc làm
1. Dựng `@theme` theo `DESIGN.md` v2: màu `canvas/surface/surface-2/surface-3/line/line-soft/line-strong/ink/ink-2/ink-3/accent/on-accent/accent-strong/accent-soft/accent-edge/focus/overlay` + status `*-soft` + `skeleton` + `shadow-card`/`shadow-float`; thang chữ 12/14/16/20/24/32/40 (Be Vietnam Pro); bo `control 10/card 16/dialog 20/full`.
2. Dark theme qua selector `.dark` với bảng dark của DESIGN.md; giữ cơ chế `themeStore` (class trên `<html>`) như hiện tại.
3. `@utility scroll-hide` (ẩn scrollbar: `&::-webkit-scrollbar{display:none}; scrollbar-width:none`), `duration-fast/base/slow`, `transition-theme`, `tabular-nums` class `tnum`.
4. **Alias di trú (tạm, gỡ ở ticket 12):** giữ tên token cũ trỏ sang giá trị mới để màn chưa migrate không vỡ: `primary→accent`, `primary-hover→accent`, `primary-strong→accent-strong`, `primary-soft→accent-soft`, `primary-edge→accent-edge`, `on-primary→on-accent`, `background→canvas`, `foreground→ink`, `secondary→ink-2`, `muted→ink-3`, `faint→ink-3`, `border→line`, `border-default→line`, `border-strong→line-strong`, `hover→surface-2`, `active→surface-3`, `chat→surface-2`, `message-sent→accent`, `message-received→surface-2`, `surface-sunken→surface-2`, `surface-elevated→surface`, `text-*` giữ nguyên tên class.
5. **Xoá:** `btn-gradient`, `gradient-border`, `screen-loader-cube`, `bg-app-pattern`, `--gradient-primary*`, animation `cubePulse`/`rotateLoader` (splash mới là CSS thuần), shadow `--shadow-accent*`.
6. Định nghĩa `scroll-hide` và thang shadow chuẩn `shadow-card/shadow-float` + `shadow-xs…xl` giữ lại nếu còn dùng.
7. Keyframes giữ tối giản: `fadeIn`, `fadeInUp`, `slideInRight`, `slideInUp` (mới, cho sheet), `shimmer`, `pulseDot`; tôn trọng `prefers-reduced-motion` qua media query tắt tất cả.
8. Reset scrollbar 6px theo `line-strong`.

## Tiêu chí nghiệm thu
- `npm run typecheck` + `npm run build` + `npm run format:check` pass.
- `grep -r 'border-default\b' src --include='*.tsx'` = 0 (đã chuyển hết sang alias `border-border` hợp lệ).
- `.dark` chứa đủ token; mở dev thấy màn cũ không vỡ (alias).
- Frame tham chiếu: `.scratch/nested-canvas/frames/png/c-chat.png` về màu nền/bubble.""",
    },
    {
        "num": "02",
        "slug": "primitives",
        "title": "Primitives — components/ui theo Nested Canvas",
        "blocked": "01",
        "body": """## Scope
- Toàn bộ `src/components/ui/` (41 file): Button, IconButton, Input, TextArea, Checkbox, Switch, Select, SearchableSelect, Dropdown, Popover, Tooltip, Badge, Avatar, Skeleton, Loading, EmptyState, Toast, Modal/AlertDialog, DatePicker, ProgressBar, CircularProgress, UploadProgress, ReactionSelector/Display, MediaViewer, ImageCropper, EmojiPicker, SplashScreen, ConnectionStatus, ErrorBoundary, BlockOptionsModal, ReactionDetailsModal.

## Việc làm
1. Chuyển variant sang `cva` (Button, Badge, EmptyState, Toast, Skeleton…) — gói `class-variance-authority` đã có sẵn trong deps.
2. Dựng lại visual theo DESIGN.md §7: bo `control` 10, viền `line`, focus ring 2px `focus`, nút primary = `accent`+`on-accent`+`accent-edge`; search-field tròn `surface-2`; dropdown/dialog/toast = `shadow-float`.
3. Thêm `SlideUpSheet` (biến thể Modal full màn mobile: bo 2 góc trên `dialog`, tay cầm, `slideInUp` 300ms) — dùng cho details chat, block options, reaction details trên mobile.
4. Đổi toàn bộ class cũ trong các file này sang token mới (không dùng alias).
5. SplashScreen: bỏ Lottie, dựng CSS thuần (logo tile + shimmer bar) theo frame c-auth; giữ timing 1800ms + fade 500ms.
6. Giữ nguyên API props (không đổi tên props) — chỉ đổi nội bộ styling; trừ những component cần thêm prop mới (Sheet cần `showHandle`).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep trong `src/components/ui` 0 hex, 0 class không tồn tại, 0 token alias.
- Bấm thử Modal/Select/Tooltip hoạt động đúng focus trap + Escape + trả focus.
- Frame tham chiếu: c-auth (input/nút), c-chat (dropdown, bubble không nằm đây), c-m-dark (toast/badge).""",
    },
    {
        "num": "03",
        "slug": "shell",
        "title": "Shell — rail + tab bar 4 mục, xoá MobileMenuPage",
        "blocked": "02",
        "body": """## Scope
- `src/app/layout/AppLayout.tsx`, `AppTopBar.tsx` (thay bằng Rail), `BottomNav.tsx` (4 tab), `navItems.ts`, `GlobalModals.tsx`, `hooks/useShellEffects.ts`
- `src/app/pages/MobileMenuPage.tsx` (xoá), `src/app/router.tsx` (xoá route `/menu`, thêm `/activity`, redirect `/notifications` → `/activity`), `src/app/pages/NotFoundPage.tsx` (restyle nhẹ)

## Việc làm
1. Rail desktop 72px: logo tile 40, nav `Tin nhắn · Nhật ký · Bạn bè · Hoạt động` (icon 21 + badge đếm), đáy Cài đặt + avatar; mục kích hoạt `accent-strong` + ring `accent-soft`; theo frame c-chat.
2. Avatar bấm mở menu popover (desktop) chứa Hồ sơ · Cài đặt · Giao diện · Đăng xuất (chuyển nội dung từ MobileMenuPage).
3. BottomNav 4 tab (bỏ Menu), badge Tin nhắn/Hoạt động; safe-area đáy; theo frame c-m-list.
4. Trạng thái kích hoạt dùng `NavLink`; badge tính từ store hiện có (`totalUnread`, `unreadNotifications`, `receivedRequests`) — Hoạt động = notifications + requests.
5. Xoá `AppTopBar.tsx`, `MobileMenuPage.tsx`; theme toggle + logout chuyển vào menu avatar; Cài đặt thành item rail.
6. Giữ cơ chế ẩn tab bar khi đang trong phòng chat (`isChatRoom`).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; không còn import AppTopBar/MobileMenuPage ở đâu.
- `/menu` không còn trong router; `/notifications` redirect `/activity` (sau khi ticket 09 merge; tạm thời route trỏ component cũ — ghi TODO).
- Frame tham chiếu: c-chat (rail + list + details), c-m-list (tab bar), c-m-dark.""",
    },
    {
        "num": "04",
        "slug": "chat-thread",
        "title": "Chat thread — bố cục Nested Canvas",
        "blocked": "03",
        "body": """## Scope
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
- Nhắn thử 1-1/nhóm: reply, edit, recall, forward, reaction, typing hoạt động như cũ.""",
    },
    {
        "num": "05",
        "slug": "chat-list",
        "title": "Chat list — panel hội thoại",
        "blocked": "03",
        "body": """## Scope
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
- Pin/unpin, mute, archive, mark-unread, xoá hội thoại vẫn hoạt động.""",
    },
    {
        "num": "06",
        "slug": "chat-details",
        "title": "Chat details — panel 360 + modals restyle",
        "blocked": "03",
        "body": """## Scope (tầng 2 — chỉ restyle, không đổi bố cục)
- `src/features/chat/components/chat/details/*` (ChatDetailsPanel, Header, MemberList, Media, Search, Actions, PendingMembersModal)
- `src/features/chat/components/chat/ChatModals.tsx`, `modals/*` (CreateGroup, EditGroup, AddMember, Forward, JoinGroup, QRCode, TransferAdmin)
- `src/features/chat/components/JoinGroupPage.tsx`

## Việc làm
1. ChatDetailsPanel: panel 360 `surface` viền trái `line`; tabs icon `Thông tin · Thành viên · Media · Tìm` với gạch chân accent; group card + quick actions (ô `surface-2`); member list; media grid 3 cột bo `control`; hành động đáy (Ghim/Lưu trữ/Rời nhóm = `danger`).
2. Desktop 1024–1279: panel trở thành drawer trượt phải (dùng Modal/sheet mới từ ticket 02) — kiểm tra `useMediaQuery` hiện có.
3. Mobile: sheet trượt từ dưới với tay cầm.
4. Các modal chat đổi sang primitive mới (đã restyle ở 02); QRCodeModal giữ nền trắng QR nhưng khung token.
5. JoinGroupPage: card giữa `surface` bo `card` trên `canvas` + `bg` pattern bỏ.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-chat cột phải (tabs, group card, media, actions).
- Quản trị nhóm (thêm/xoá thành viên, thăng cấp, phê duyệt, chuyển quyền) hoạt động như cũ.""",
    },
    {
        "num": "07",
        "slug": "feed",
        "title": "Feed — composer + post card + rail phải",
        "blocked": "03",
        "body": """## Scope
- `src/features/feed/components/FeedPage.tsx`, `CreatePost.tsx`, `PostItem.tsx`, `FeedSkeleton.tsx`, `BirthdayWidget.tsx`, `FriendSuggestionsWidget.tsx`
- `shared/InteractionActions.tsx`, `PostMediaGrid.tsx`, `SystemPostMedia.tsx`, `TruncatedText.tsx`, `VisibilityBadge.tsx`
- `modals/PostModal.tsx`, `PostViewModal.tsx`, `PostViewCinema.tsx`, `SharePostModal.tsx`, `ShareTargetItem.tsx`
- `src/features/comment/components/**` (tầng 2 — restyle)

## Việc làm
1. Feed desktop: cột đọc ≤640 giữa, rail phải 320 chứa BirthdayWidget + FriendSuggestionsWidget + thẻ Hoạt động của bạn; mobile: widget thành khối gập sau composer (ẩn mặc định khi không có dữ liệu).
2. Composer card: avatar + giả input tròn + nút Đăng `accent` (frame c-feed).
3. PostItem: card `post-card`; header avatar/tên/thời gian/VisibilityBadge; media grid 2 cột gap 2px nền `line`; thanh tương tác 3 action phân cách `line-soft`, hover `surface-2`; reaction summary `rc` pills.
4. PostModal/PostViewModal/SharePostModal: primitive mới; PostViewCinema overlay tối + nút đóng.
5. Comment: CommentItem/CommentInput/CommentSection — bubble `surface-2`, input card, giữ phân luồng.
6. Stagger danh sách giữ nguyên (60ms×n, cap 300ms).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-feed (desktop) và c-m-feed (mobile).
- Đăng bài, sửa, xoá, 6 cảm xúc, bình luận, chia sẻ hoạt động như cũ.""",
    },
    {
        "num": "08",
        "slug": "profile",
        "title": "Hồ sơ — header + 2 cột Nested Canvas",
        "blocked": "03",
        "body": """## Scope
- `src/features/profile/components/ProfilePage.tsx`, `profile/ProfileHeader.tsx`, `ProfileTabs.tsx`, `ProfileAboutCard.tsx`, `ProfileMediaPreview.tsx`, `PostsTab.tsx`, `PhotosTab.tsx`, `ProfilePrivacySelector.tsx`, `ProfileSkeleton.tsx`, `EditProfileModal.tsx`

## Việc làm
1. Layout: cover + header là panel `surface` bo `card` trên `canvas`; avatar 104 chồng lên cover với viền `surface` 4px (frame c-profile).
2. Tên + `@handle` + bạn bè + pill trạng thái; nút hành động (Nhắn tin = primary, Chỉnh sửa = secondary, more = ghost).
3. Tabs Bài viết · Ảnh: gạch chân accent 2px; thân trang 2 cột: Giới thiệu 340 + bài viết (desktop), 1 cột mobile.
4. ProfileAboutCard: card `post-card`, hàng icon `surface-2` bo `control`; ProfileMediaPreview: grid 3 cột.
5. PhotosTab: grid 3 cột gap 6, thumbnail bo `control`.
6. EditProfileModal: primitive mới; ProfilePrivacySelector giữ segmented style.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-profile và c-m-profile.
- Đổi avatar/cover (crop, upload progress), chỉnh hồ sơ, tab ảnh/bài viết hoạt động như cũ.""",
    },
    {
        "num": "09",
        "slug": "activity",
        "title": "Hoạt động — gộp thông báo + lời mời kết bạn",
        "blocked": "03",
        "body": """## Scope
- `src/features/notification/components/NotificationsPage.tsx`, `notifications/*` (NotificationList, NotificationItem, NotificationSkeleton)
- `src/features/notification/components/notifications/NotificationDropdown.tsx` (xoá sau khi rail badge dùng)
- `src/features/friend/components/contacts/RequestsListSection.tsx` (tái sử dụng dữ liệu)
- Router: `/activity` thay `/notifications`; redirect `/notifications` → `/activity`.

## Việc làm
1. Trang `/activity`: header `Hoạt động` (display-lg) + nút "Đọc tất cả"; segmented `Tất cả · Lời mời kết bạn`; card `post-card` chứa danh sách (frame c-activity).
2. Item thông báo: avatar 32 + nội dung (tên đậm) + thời gian `caption` + chấm chưa đọc `accent`; loại `friend_request` có nút Chấp nhận/Từ chối inline (dữ liệu từ `contactStore.receivedRequests` — KHÔNG đổi store, chỉ ghép view).
3. Hai nguồn hiển thị chung một danh sách sắp theo thời gian giảm dần; badge rail = `unreadNotifications + receivedRequests.length`.
4. Xoá NotificationDropdown khỏi shell (rail badge đã đảm nhiệm); giữ `markAllAsRead`, `clearAll`, `loadMore` hiện có.
5. Mobile: cùng trang, segmented + danh sách + tab bar (frame c-m-activity).
6. Deep link: notification item vẫn điều hướng đúng (chat/feed/profile) như cũ.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; `/notifications` redirect `/activity`; badge tổng đúng.
- Khớp frame c-activity + c-m-activity.
- Chấp nhận/từ chối lời mời từ trang Hoạt động hoạt động; thông báo đọc/chưa đọc đúng.""",
    },
    {
        "num": "10",
        "slug": "contacts",
        "title": "Bạn bè — 1 header segmented + search + panel chi tiết",
        "blocked": "03",
        "body": """## Scope
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
- Kết bạn/huỷ kết bạn/chặn (BlockOptionsModal) hoạt động; chọn người mở panel/sheet đúng breakpoint.""",
    },
    {
        "num": "11",
        "slug": "auth",
        "title": "Auth — split brand field + form, onboarding/verify/join",
        "blocked": "02",
        "body": """## Scope
- `src/features/auth/components/LoginPage.tsx`, `AuthBanner.tsx`, `OnboardingPage.tsx`, `EmailVerificationPage.tsx`
- `src/features/chat/components/JoinGroupPage.tsx` (nếu chưa xong ở 06)

## Việc làm
1. Login desktop: split 52/48 — trái brand field `accent` với wordmark Smurfy + headline display-brand + 3 điểm giá trị + rings trang trí (chữ tối trên accent, không ảnh); phải form card (frame c-auth).
2. Tabs Đăng nhập/Đăng ký dạng `seg`; form 2 bước đăng ký giữ nguyên luồng + stepper 2 chấm; quên mật khẩu là view thứ 3.
3. Input/auth banner theo primitive mới (AuthBanner: info/success/error với `*-soft` + viền trái).
4. OnboardingPage: giữ task-screen, đổi header/token; chips sở thích `chip-primary`.
5. EmailVerificationPage: card giữa `surface` bo `card` trên `canvas`.
6. Mobile: form đầy đủ + wordmark đầu trang (frame c-m-auth); brand field rút thành dải trên.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-auth + c-m-auth.
- Đăng nhập/đăng ký/quên mật khẩu/xác minh email/onboarding hoạt động như cũ (không đổi authStore).""",
    },
    {
        "num": "12",
        "slug": "brand-sweep",
        "title": "Brand asset + quét toàn bộ token",
        "blocked": "04,05,06,07,08,09,10,11",
        "body": """## Scope
- Logo + PWA + OG asset (qua skill `/logo-design`)
- Quét toàn repo; cập nhật `COPY.md` cho nhãn bị IA tác động

## Việc làm
1. **Logo (checkpoint bắt buộc trước khi build kit):** 3 khái niệm — (1) refresh mặt smurf trên tile: sửa 195 anchor → khoét lỗ thật (fill-rule evenodd), bản 1 màu; (2) wordmark dẫn dắt; (3) abstract/negative-space. Xuất concept sheet PNG, trình chủ repo chọn. Sau khi chọn: kit đầy đủ + variants.
2. Xuất asset: `favicon.ico`, `logo192.png`, `pwa-192x192.png`, `pwa-512x512.png` (maskable), `apple-touch-icon.png`, `masked-icon.svg`, `logo.svg`, `logo_text_*.png`, `og-image.png`, `twitter-image.png`; cập nhật `theme-color`/`background_color` trong `index.html` + `vite.config.ts` nếu palette đổi.
3. Splash: thay `public/static/animations/splash.json` (Lottie) bằng CSS thuần ở SplashScreen (đã làm 02) — xoá file lottie + dependency `lottie-react` nếu không còn dùng.
4. **Quét toàn repo:** grep mọi `*.tsx`: 0 class không tồn tại (đối chiếu token v2), 0 hex ngoài `styles/index.css` + SVG symbol; xoá alias di trú ở ticket 01; xoá class chết (`scroll-hide` giờ đã định nghĩa, giữ).
5. Cập nhật `COPY.md` chỉ cho nhãn bị IA tác động: "Hoạt động", sheet avatar, tab bar 4 mục; giữ toàn bộ phần còn lại.
6. `npm run format:check` toàn repo; chạy `npm run build`; xoá dead code (`MobileMenuPage`, import mồ côi).

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep toàn src 0 hex ngoài ngoại lệ; alias token đã gỡ.
- Asset mới render đúng ở 16/32/192/512; manifest PWA hợp lệ; splash chạy không phụ thuộc Lottie.
- COPY.md diff chỉ chứa các nhãn liên quan IA.""",
    },
]


def main() -> None:
    os.makedirs(ISSUES, exist_ok=True)
    for t in TICKETS:
        path = os.path.join(ISSUES, f"{t['num']}-{t['slug']}.md")
        blocked = f"Blocked by: {t['blocked']}\n" if t["blocked"] else ""
        content = (
            f"# {t['title']}\n\n"
            f"Type: task\n"
            f"Status: ready-for-agent\n"
            f"Blocked by: {t['blocked'] or '—'}\n\n"
            f"{t['body']}\n\n## Comments\n"
        )
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(content)
        print(path)


if __name__ == "__main__":
    main()
