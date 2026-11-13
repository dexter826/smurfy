# Spec — nested-canvas (Smurfy)

Đập bỏ toàn bộ thiết kế giao diện hiện tại, xây lại theo hướng **C — Bề mặt lồng nhau**.
Frame tham chiếu: `.scratch/nested-canvas/frames/` (đã duyệt hướng C, 2026-11-13).

## Quyết định đã chốt (ghi chép từ buổi grilling)

| # | Chủ đề | Quyết định |
|---|--------|------------|
| 1 | Chẩn đoán | Cả 5 bệnh: thiếu bản sắc, signature rời rạc, shell không đặc trưng, token lệch spec, thiếu chiều sâu |
| 2 | Độ sâu | C — đổi cả luồng UX (IA có thể đổi), giữ nguyên logic Firebase/store/hooks |
| 3 | Thương hiệu | B — giữ hình logo, đổi palette/typography/wordmark; regenerate qua /logo-design |
| 4 | Hướng thẩm mỹ | **C — Bề mặt lồng nhau** (canvas xám, panel nổi bo 16, viền mảnh, bóng nhẹ) |
| 5 | Dark mode | Giữ parity sáng/tối đầy đủ |
| 6 | Typography | Be Vietnam Pro toàn bộ (display 700/800, body 400/500), bỏ Nunito/Nunito Sans |
| 7 | Kiểm chứng | B — typecheck/build/format + frame tĩnh; dev chạy thật do chủ repo xem |
| 8 | Shell | A — rail 72 + list 320 + canvas + panel phải 360 (≥1280); mobile 4 tab + avatar sheet |
| 9 | Cắt IA | Xoá MobileMenuPage; gộp Thông báo + Lời mời thành "Hoạt động"; gộp nav Contacts; widget feed ra rail phải |
| 10 | Nhân cách brand | A — mascot ở logo, UI người lớn |
| 11 | Màu | Cornflower #4C9EEB accent duy nhất, giữ chữ tối trên accent (6.6:1), bỏ mọi gradient |
| 12 | Logo | 3 khái niệm (1 refresh + 2 mới), checkpoint trước khi build kit |
| 13 | Chat layout | ≥1280: list 320 + thread + details 360; 1024–1279: details drawer; mobile: thread full, details sheet |
| 14 | Hoạt động | Một mặt `/activity`, segmented `Tất cả · Lời mời kết bạn`, badge tổng |
| 15 | Frame | 6 màn × 375/1440, light + dark mẫu |
| 16 | Motion | Micro 150–200ms + stagger + slide panel, tôn trọng prefers-reduced-motion |
| 17 | Công nghệ | Custom-on-Radix, thêm cva cho variants; không cài shadcn, không thêm dependency visual mới |
| 18 | Quy trình | Nhánh feat/nested-canvas, 12 ticket, PR một lần cuối, không feature flag |
| 19 | Nhãn | Rail: Tin nhắn · Nhật ký · Bạn bè · Hoạt động; avatar sheet: Hồ sơ · Cài đặt · Giao diện · Đăng xuất |
| 20 | Tài liệu | Viết lại DESIGN.md v2; COPY.md chỉ sửa nhãn bị IA tác động |

## Nguyên tắc bất biến

1. Không đổi logic Firebase/Firestore/RTDB/store/hooks — chỉ chạm `*.tsx` + CSS + asset.
2. Mọi màu qua token; cấm hex ngoài `src/styles/index.css` và SVG symbol.
3. Chữ trắng trên `#4C9EEB` bị cấm (2.84:1). Chữ trên accent luôn là `#0B1220`.
4. Không gradient, không emoji làm icon, bo góc chỉ 8/12/16/full.
5. Touch target ≥44px; focus ring 2px `focus`; aria-label cho icon button.
6. URL công khai phải giữ: `/join/:token`; route cũ `/notifications` phải redirect sang `/activity`.

## Cây tính năng hiện có (phải giữ 100% chức năng)

- Chat: tin nhắn 1-1/nhóm, ảnh, reply, edit, recall, forward, ghim, mute, lưu trữ, đánh dấu chưa đọc, tìm kiếm + lịch sử, mention, reaction, trạng thái đang nhập, hiện diện, mời qua link, phê duyệt thành viên, chuyển quyền admin, QR, tan rã nhóm, block.
- Feed: đăng text/ảnh, 6 cảm xúc, bình luận phân luồng, chia sẻ bài viết, quyền riêng tư, system post (avatar/cover), widget sinh nhật + gợi ý.
- Bạn bè: gửi/chấp nhận/từ chối/huỷ lời mời, gợi ý, hủy kết bạn, chặn (3 tuỳ chọn block).
- Hồ sơ: cover/avatar, giới thiệu, tabs bài viết/ảnh, chỉnh sửa, privacy selector.
- Cài đặt: quyền riêng tư, bảo mật, đổi mật khẩu, danh sách chặn.
- Auth: đăng nhập/đăng ký 2 bước/quên mật khẩu, xác minh email, onboarding (tỉnh + sở thích).
- PWA: manifest, service worker, splash, offline runtime cache.

## Tiêu chí nghiệm thu mỗi ticket

- `npm run typecheck` + `npm run build` + `npm run format:check` pass.
- Grep file đã sửa: 0 class không tồn tại (so danh sách từ `styles/index.css`), 0 hex ngoài token.
- Script `contrast_check` pass cho mọi cặp màu token dùng trong ticket.
- Khớp frame tham chiếu `.scratch/nested-canvas/frames/png/c-*.png`; lệch phải ghi lý do trong ticket.
