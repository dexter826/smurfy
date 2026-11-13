# Chat details — panel 360 + modals restyle

Type: task
Status: ready-for-agent
Blocked by: 03

## Scope (tầng 2 — chỉ restyle, không đổi bố cục)
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
- Quản trị nhóm (thêm/xoá thành viên, thăng cấp, phê duyệt, chuyển quyền) hoạt động như cũ.

## Comments
