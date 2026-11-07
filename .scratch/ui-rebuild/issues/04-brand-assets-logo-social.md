# 04: Brand assets — chuẩn hóa logo hiện tại thành bộ kit

**What to build:** Chuẩn hóa logo hiện tại của app thành bộ kit đầy đủ theo design system mới (Assets mode của skill `logo-design`). Phân tích design gốc: hai đầu smurf vẽ tay doodle nét trắng dày (round caps) trên tile bo góc + wordmark "Smurfy" bold sans — cặp "quirky mark + neutral type" chuẩn theo mark-types §10. Giữ nguyên artwork gốc, chuẩn hóa vào hệ màu mới. Không design mới từ đầu (quyết định user sau 3 vòng concept không đạt).

**Blocked by:** 01

**Status:** done

- [x] Symbol master: `smurfy-symbol-tile.svg` — tile `#4C9EEB` rx 54 + doodle gốc giữ nguyên (render khớp design cũ, interior path đổi sang màu tile thay vì `#0269FE` cũ)
- [x] Symbol mono variants: tile đen (`#0B1220`) + tile trắng cho dark/print
- [x] Wordmark Nunito 800: trắng (dark bg) + `#2367A8` primary-strong (light bg) + `#0B1220` — 955×240 khớp kích thước file cũ
- [x] Lockup horizontal (symbol tile + wordmark) SVG + PNG
- [x] favicon.ico (16/32/48) + apple-touch-icon 180 + logo192
- [x] Bổ sung PWA icons bị thiếu: `pwa-192x192.png` + `pwa-512x512.png` (vite.config đã reference từ trước nhưng file không tồn tại) + `masked-icon.svg` maskable (full-bleed tile, doodle scale 0.72 safe-zone)
- [x] og-image + twitter-image 1200×630: dark card (#12161F) — symbol tile + wordmark Nunito 800 trắng + tagline "Nhắn tin. Kết bạn. Chia sẻ." (#7FB6EF), decor circles cornflower opacity thấp. Chỉ dùng primitives + text (không doodle path trên nền khác tile — tránh gãy nét), thiết kế lại toàn bộ theo chỉ đạo user
- [x] Tất cả file name giữ nguyên reference hiện có (`logo.svg`, `favicon.ico`, `logo_text_white.png`, `logo_text_blue.png`, `logo192.png`, `og-image.png`, `twitter-image.png`, `apple-touch-icon.png`) — không cần sửa app code
- [x] Doodle căn giữa chính xác theo ink bounds đo bằng `svg_audit` (center 256.2, 255.7): `logo.svg` dùng tile inset margin 36 (đúng tỷ lệ gốc), PWA/maskable dùng full-bleed với doodle scale quanh đúng tâm
- [x] File rác quá trình tạo kit đã xoá sạch khỏi `.scratch/`
