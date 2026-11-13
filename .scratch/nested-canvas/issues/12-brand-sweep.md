# Brand asset + quét toàn bộ token

Type: task
Status: ready-for-agent
Blocked by: 04,05,06,07,08,09,10,11

## Scope
- Logo + PWA + OG asset (qua skill `/logo-design`)
- Quét toàn repo; cập nhật `COPY.md` cho nhãn bị IA tác động

## Việc làm
1. **Logo (checkpoint bắt buộc trước khi build kit):** 3 khái niệm — (1) refresh mặt smurf trên tile: sửa 195 anchor → khoét lỗ thật (fill-rule evenodd), bản 1 màu; (2) wordmark dẫn dắt; (3) abstract/negative-space. Xuất concept sheet PNG, trình chủ repo chọn. Sau khi chọn: kit đầy đủ + variants.
2. Xuất asset: `favicon.ico`, `logo192.png`, `pwa-192x192.png`, `pwa-512x512.png` (maskable), `apple-touch-icon.png`, `masked-icon.svg`, `logo.svg`, `logo_text_*.png`, `og-image.png`, `twitter-image.png`; cập nhật `theme-color`/`background_color` trong `index.html` + `vite.config.ts` nếu palette đổi.
3. Splash: thay `public/static/animations/splash.json` (Lottie) bằng CSS thuần ở SplashScreen (đã làm 02) — xoá file lottie + dependency `lottie-react` nếu không còn dùng.
4. **Quét toàn repo:** grep mọi `*.tsx`: 0 class không tồn tại (đối chiếu token v2), 0 hex ngoài `styles/index.css` + SVG symbol; xoá alias di trú ở ticket 01; xoá class chết (`scroll-hide` giờ đã định nghĩa, giữ).
5. Cập nhật `COPY.md` chỉ cho nhãn bị IA tác động: "Hoạt động", sheet avatar, tab bar 4 mục; giữ toàn bộ phần còn lại.
6. `npm run format:check` toàn repo; chạy `npm run build`; xoá dead code (`MobileMenuPage`, import mồ côi).
7. Ghi nhận: xoá `.scratch/nested-canvas/` KHÔNG làm trong ticket này — thực hiện bằng commit riêng trên `main` sau khi PR merge (xem spec.md → "Dọn dẹp sau khi triển khai xong").

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep toàn src 0 hex ngoài ngoại lệ; alias token đã gỡ.
- Asset mới render đúng ở 16/32/192/512; manifest PWA hợp lệ; splash chạy không phụ thuộc Lottie.
- COPY.md diff chỉ chứa các nhãn liên quan IA.

## Comments
