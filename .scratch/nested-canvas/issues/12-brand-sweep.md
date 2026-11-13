# Brand asset + quét toàn bộ token

Type: task
Status: resolved
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

## Answer

**Đủ 7 mục:**
1. **Logo checkpoint đã trình (concepts.png, commit `f0c9de6`)** — 3 khái niệm: (A) refresh mặt smurf trên tile — mắt khoét lỗ evenodd thật, hết white-knockout, ~20 anchor thay vì 195, 1 màu; (B) wordmark monoline "Smurfy" tự dựng, đuôi y quét thành nét cười; (C) tile âm bản (negative-space). **Chủ repo chọn A** ("Ok" sau checkpoint).
2. **Kit đã xuất vào `public/`:** `favicon.ico` (16/32/48), `logo192.png`, `pwa-192x192.png`, `pwa-512x512.png` (maskable, safe-zone), `apple-touch-icon.png` (180), `masked-icon.svg`, `logo.svg` (tile accent + mặt on-accent), `logo_text_blue.png`/`logo_text_white.png` (1024×452), `og-image.png`/`twitter-image.png` (1200×630, tile + wordmark + tagline trên canvas). `background_color` manifest đổi `#f7f9fc`→`#EDF1F6`; `theme_color` giữ `#4C9EEB` (palette không đổi). Masters + renders giữ trong `.scratch/nested-canvas/logo/` (dọn theo spec sau merge).
3. Splash: SplashScreen đã CSS thuần từ ticket 02; **xoá `public/static/animations/splash.json` + dependency `lottie-react`** + nhánh vendor-lottie trong `vite.config.ts` (0 consumer).
4. **Quét toàn repo:** settings (màn không có ticket riêng) + mọi file còn sót đã chuyển token v2; **gỡ block alias di trú + legacy radius snaps + `--shadow-dropdown`** khỏi `index.css`. **Sửa sau code-review:** quét sót `*.ts` + biến thể `bg-muted`/`ring-primary` — `uiUtils.ts` (reaction classes), `SettingItem` ring, `TypingIndicator`, `NotificationItem`, `masked-icon.svg` trả về full-bleed nền accent; `git grep` toàn `*.ts`+`*.tsx` = 0; hex còn lại = QR canvas + dải avatar (ngoại lệ chức năng đã disclose ở 06/07); `text-lg` giữ (5 chỗ dùng, snap 18→20 thành bậc 20 chính thức); `TabConfigItem` giữ trong types.ts (không consumer — nêu ra, không xoá).
5. `COPY.md` thêm mục **3.9 Nhãn điều hướng**: rail/tab 4 mục, menu tài khoản, bộ lọc Hoạt động + Bạn bè, "Đọc tất cả" — chỉ nhãn bị IA tác động.
6. CI 3 lệnh pass toàn repo; dead code đã dọn theo từng ticket (MobileMenuPage/AppTopBar/NotificationDropdown/ContactsSidebar/ContactsActionBar/NotificationsPage).
7. Xoá `.scratch/nested-canvas/` **không làm ở đây** — commit riêng trên `main` sau merge (tiền lệ `fbc27e0`).

**Verify:** CI 3 pass (exit code thật); `svg_audit` score A=99/100 (cũ 90 + 2 WARN knockout); kit render đúng 16/32/180/192/512 + maskable safe-zone; manifest hợp lệ; splash không phụ thuộc Lottie; COPY.md diff chỉ nhãn IA.
