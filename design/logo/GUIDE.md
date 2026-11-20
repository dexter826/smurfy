# Smurfy — Chung vòng

Hai người cùng tạo một vòng ôm, khoảng trống giữa họ cũng là một nụ cười.
Hướng đã chốt ngày 21/11/2026.

## Các tệp chính

- `logo-symbol.svg` là biểu tượng màu xanh.
- `logo-symbol-dark.svg` dùng trên nền xanh.
- `logo-symbol-white.svg` dùng trên nền tối.
- `logo-horizontal.svg` và `logo-stacked.svg` là hai bố cục kèm tên.
- `logo-symbol-small.svg` dùng ở 16–24 px, căn nét theo lưới pixel.
- `app-icon.svg` và `app-icon-maskable.svg` là nguồn icon ứng dụng.
- `public/` chứa các bản xuất dùng trong app, gồm SVG, PNG và ICO.

## Màu và khoảng cách

Màu xanh #4C9EEB, RGB 76/158/235. Màu mực #0B1220, RGB 11/18/32.
Bản trắng dùng #FFFFFF. Các bản xuất dành cho màn hình, hệ màu RGB.

Giữ khoảng trống ngoài hình bằng ít nhất bán kính đầu người, tức 25 đơn vị trên lưới 256.
Dùng biểu tượng nhỏ ở 16–24 px. Logo kèm tên nên rộng từ 128 px.

Giữ nguyên tỉ lệ, vị trí hai đầu người và đường cong liên kết khi sử dụng.
Chọn cặp nền và màu như bản xem trước trong `index.html`.

Wordmark dùng Be Vietnam Pro ExtraBold, đã chuyển thành path trong SVG.
Font nhúng trong trang OG đi kèm giấy phép tại `public/og-image/OFL.txt`.

## Ảnh chia sẻ

Trang nguồn `public/og-image/index.html` có kích thước 1200×630 và tự chứa font, hình ảnh.
URL xem trên dev server là `http://localhost:3000/og-image/`.

`build_assets.py` xuất asset từ các SVG nguồn, dùng Pillow và Chromium cục bộ.
`build_og.py` chụp trang OG và tạo cả `og-image.png` lẫn `twitter-image.png`.

Meta ảnh có tham số `v=chung-vong` để đổi URL cache khi thay logo.
Sau khi deploy, có thể làm mới bản chia sẻ cũ bằng [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) hoặc [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
