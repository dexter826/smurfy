---
version: 2
name: Smurfy — Nested Canvas
description: Mạng xã hội Việt chat-first. Bề mặt lồng nhau: canvas xám lạnh làm nền, panel trắng nổi bo 16px với viền mảnh và bóng nhẹ; một accent cornflower sáng với chữ tối là chữ ký duy nhất.
colors:
  canvas: '#EDF1F6'
  surface: '#FFFFFF'
  surface-2: '#F6F8FB'
  surface-3: '#E9EEF5'
  line: '#E7EDF5'
  line-soft: '#EDF1F7'
  line-strong: '#D5DDE8'
  ink: '#0F172A'
  ink-2: '#475569'
  ink-3: '#6B7A8F'
  overlay: 'rgb(15 23 42 / 0.5)'
  accent: '#4C9EEB'
  on-accent: '#0B1220'
  accent-strong: '#1D5E93'
  accent-soft: '#E8F3FD'
  accent-edge: '#2E7CC4'
  focus: '#4C9EEB'
  success: '#15803D'
  on-success: '#FFFFFF'
  warning: '#B45309'
  on-warning: '#FFFFFF'
  danger: '#DC2626'
  on-danger: '#FFFFFF'
  info: '#0369A1'
  on-info: '#FFFFFF'
  success-soft: 'rgb(21 128 61 / 0.12)'
  warning-soft: 'rgb(180 83 9 / 0.12)'
  danger-soft: 'rgb(220 38 38 / 0.12)'
  info-soft: 'rgb(3 105 161 / 0.12)'
  skeleton: 'color-mix(in srgb, {colors.ink} 8%, {colors.surface})'
  shadow-card: '0 1px 2px rgb(15 23 42 / 0.04)'
  shadow-float: '0 8px 24px rgb(15 23 42 / 0.12)'
themes:
  dark:
    colors:
      canvas: '#0B111C'
      surface: '#141D2B'
      surface-2: '#1B2636'
      surface-3: '#212D3F'
      line: '#2A3647'
      line-soft: '#26313F'
      line-strong: '#384457'
      ink: '#E8EEF6'
      ink-2: '#A9B8CB'
      ink-3: '#8CA0B8'
      overlay: 'rgb(2 6 23 / 0.7)'
      accent: '#4C9EEB'
      on-accent: '#0B1220'
      accent-strong: '#7FB6EF'
      accent-soft: 'rgb(76 158 235 / 0.2)'
      accent-edge: '#2E7CC4'
      focus: '#4C9EEB'
      success: '#4ADE80'
      on-success: '#0B1220'
      warning: '#FBBF24'
      on-warning: '#0B1220'
      danger: '#F87171'
      on-danger: '#0B1220'
      info: '#38BDF8'
      on-info: '#0B1220'
      success-soft: 'rgb(74 222 128 / 0.12)'
      warning-soft: 'rgb(251 191 36 / 0.12)'
      danger-soft: 'rgb(248 113 113 / 0.12)'
      info-soft: 'rgb(56 189 248 / 0.12)'
      skeleton: 'color-mix(in srgb, {colors.ink} 8%, {colors.surface})'
typography:
  display-brand:
    fontFamily: Be Vietnam Pro
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: '-0.03em'
  display-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  title-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: '-0.01em'
  title-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0
  body:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
rounded:
  control: 10px
  card: 16px
  dialog: 20px
  full: 9999px
spacing:
  micro-2: 2px
  micro-3: 6px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  huge: 48px
  section: 64px
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
    border: '{colors.accent-edge}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    border: '{colors.line}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.ink-2}'
    border: transparent
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
  button-danger:
    backgroundColor: '{colors.danger}'
    textColor: '{colors.on-danger}'
    border: transparent
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
  button-size-sm:
    padding: 6px 12px
    typography: '{typography.body-sm}'
  button-size-md:
    padding: 10px 16px
    typography: '{typography.body-sm}'
  button-size-lg:
    padding: 12px 24px
    typography: '{typography.body}'
  icon-button-md:
    width: 44px
    height: 44px
    rounded: '{rounded.control}'
  icon-button-lg:
    width: 48px
    height: 48px
    rounded: '{rounded.control}'
  text-field:
    height: 44px
    typography: '{typography.body}'
    textColor: '{colors.ink}'
    placeholderColor: '{colors.ink-3}'
    rounded: '{rounded.control}'
    border: '{colors.line}'
  search-field:
    height: 40px
    typography: '{typography.body-sm}'
    rounded: '{rounded.full}'
    backgroundColor: '{colors.surface-2}'
    border: '{colors.line-soft}'
  chip-primary:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent-strong}'
    typography: '{typography.caption}'
    rounded: '{rounded.full}'
    padding: 2px 8px
  chip-success:
    backgroundColor: '{colors.success}'
    textColor: '{colors.on-success}'
    typography: '{typography.caption}'
    rounded: '{rounded.full}'
  dropdown-panel:
    backgroundColor: '{colors.surface}'
    border: '{colors.line}'
    rounded: '{rounded.card}'
    shadow: '{colors.shadow-float}'
  dialog-overlay:
    backgroundColor: '{colors.overlay}'
  dialog-panel:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.dialog}'
    shadow: '{colors.shadow-float}'
    maxHeight: 90dvh
  toast:
    backgroundColor: '{colors.surface}'
    border: '{colors.line}'
    rounded: '{rounded.card}'
    shadow: '{colors.shadow-float}'
    typography: '{typography.body-sm}'
  skeleton:
    backgroundColor: '{colors.skeleton}'
    rounded: '{rounded.control}'
  avatar:
    rounded: '{rounded.full}'
  message-bubble-sent:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.card}'
    borderBottomRightRadius: 5px
  message-bubble-received:
    backgroundColor: '{colors.surface-2}'
    textColor: '{colors.ink}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.card}'
    borderBottomLeftRadius: 5px
  post-card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.card}'
    border: '{colors.line}'
    shadow: '{colors.shadow-card}'
  list-panel:
    width: 320px
    backgroundColor: '{colors.surface}'
    borderRight: '{colors.line}'
  detail-panel:
    width: 360px
    backgroundColor: '{colors.surface}'
    borderLeft: '{colors.line}'
  rail:
    width: 72px
    backgroundColor: transparent
  rail-button:
    width: 42px
    height: 42px
    rounded: 14px
    backgroundColor: '{colors.surface}'
    border: '{colors.line}'
  bottom-nav:
    height: 56px
    backgroundColor: '{colors.surface}'
    borderTop: '{colors.line}'
    safeArea: bottom
---

## 1. Overview

Smurfy là mạng xã hội tiếng Việt hướng chat-first. Ngôn ngữ thiết kế v2 **"Nested Canvas"** — bề mặt lồng nhau: mọi khối nội dung là một panel trắng bo 16px nổi trên canvas xám lạnh `#EDF1F6`, phân tầng bằng viền mảnh + bóng nhẹ thay vì đường kẻ đậm. Chữ ký nhận diện duy nhất: accent cornflower `#4C9EEB` luôn đi với chữ tối `#0B1220` trên nền màu đặc.

### Đặc tính cốt lõi

- **Chữ ký nhận diện:** nền `accent` + chữ `on-accent` tối (6.6:1). Nghiêm cấm chữ trắng trên `#4C9EEB` (2.84:1). Liên kết văn bản dùng `accent-strong`.
- **Phân tầng:** `canvas` → `surface` (panel, bo `card` 16px, viền `line` 1px, `shadow-card`) → lớp nổi (dropdown/dialog/toast, `shadow-float`). Không gradient, không bóng trang trí ở chủ đề tối.
- **Kiểu chữ:** Be Vietnam Pro toàn bộ — display 700/800 cho tiêu đề, 400/500 cho nội dung; đầy đủ dấu tiếng Việt. Số đếm/giờ dùng `tabular-nums`.
- **Chủ đề:** sáng là chuẩn gốc; tối full parity (bề mặt xanh-đen `#0B111C` → `#141D2B` → `#1B2636`, viền `#26313F`).
- **Shell:** desktop — rail icon 72px + list panel 320 + canvas + detail panel 360 (≥1280). Mobile — header 56 + nội dung + tab bar 4 mục + safe-area; sheet cho chi tiết.
- **Hình học:** bo góc đúng 3 bậc `control` 10, `card` 16, `dialog` 20 + `full`. Icon Lucide nét 1.7, cỡ 16/20/24.
- **Motion:** micro 150–200ms; panel/sheet trượt 300ms; stagger danh sách ≤300ms; tôn trọng `prefers-reduced-motion`.

---

## 2. Colors

Mọi thành phần tham chiếu qua token ngữ nghĩa; cấm mã màu trực tiếp trong component.

| Token          | Light                     | Dark                      | Vai trò                                                       |
| :------------- | :------------------------ | :------------------------ | :------------------------------------------------------------ |
| `canvas`       | `#EDF1F6`                 | `#0B111C`                 | Nền ứng dụng, chỗ các panel nổi lên                            |
| `surface`      | `#FFFFFF`                 | `#141D2B`                 | Panel, thẻ, list panel, detail panel                           |
| `surface-2`    | `#F6F8FB`                 | `#1B2636`                 | Ô tìm kiếm, track segmented, bubble nhận, nền lún              |
| `surface-3`    | `#E9EEF5`                 | `#212D3F`                 | Nền lún sâu hơn (fallback avatar, placeholder)                 |
| `line`         | `#E7EDF5`                 | `#2A3647`                 | Viền panel, card, control                                      |
| `line-soft`    | `#EDF1F7`                 | `#26313F`                 | Phân cách trong panel (header/footer, dòng chia)               |
| `line-strong`  | `#D5DDE8`                 | `#384457`                 | Viền nhấn mạnh, hover viền control                             |
| `ink`          | `#0F172A`                 | `#E8EEF6`                 | Mực chính: tiêu đề, nội dung                                   |
| `ink-2`        | `#475569`                 | `#A9B8CB`                 | Mực phụ: mô tả, nhãn (AA)                                      |
| `ink-3`        | `#6B7A8F`                 | `#8CA0B8`                 | Mực gợi ý: placeholder, siêu dữ liệu, thời gian                |
| `overlay`      | `rgb(15 23 42 / 0.5)`     | `rgb(2 6 23 / 0.7)`       | Lớp phủ dialog/sheet                                           |
| `accent`       | `#4C9EEB`                 | `#4C9EEB`                 | Màu nhấn duy nhất: CTA, kích hoạt, badge, bubble gửi           |
| `on-accent`    | `#0B1220`                 | `#0B1220`                 | Chữ/icon trên nền accent đặc (luôn tối)                        |
| `accent-strong`| `#1D5E93`                 | `#7FB6EF`                 | Liên kết văn bản, nhấn mạnh chữ trên nền đọc                   |
| `accent-soft`  | `#E8F3FD`                 | `rgb(76 158 235 / 0.2)`   | Nền kích hoạt (mục chọn, chip)                                 |
| `accent-edge`  | `#2E7CC4`                 | `#2E7CC4`                 | Viền định hình nút primary đạt 3:1 non-text                    |
| `focus`        | `#4C9EEB`                 | `#4C9EEB`                 | Vòng focus bàn phím 2px                                        |
| `success`      | `#15803D`                 | `#4ADE80`                 | Trạng thái thành công                                          |
| `on-success`   | `#FFFFFF`                 | `#0B1220`                 | Chữ trên nền success                                           |
| `warning`      | `#B45309`                 | `#FBBF24`                 | Cảnh báo                                                       |
| `on-warning`   | `#FFFFFF`                 | `#0B1220`                 | Chữ trên nền warning                                           |
| `danger`       | `#DC2626`                 | `#F87171`                 | Lỗi, hành động phá hủy                                         |
| `on-danger`    | `#FFFFFF`                 | `#0B1220`                 | Chữ trên nền danger                                            |
| `info`         | `#0369A1`                 | `#38BDF8`                 | Thông tin hướng dẫn                                            |
| `on-info`      | `#FFFFFF`                 | `#0B1220`                 | Chữ trên nền info                                              |
| `*-soft`       | `rgb(... / 0.12)`         | `rgb(... / 0.12)`         | Nền nhạt trạng thái                                            |
| `skeleton`     | computed                  | computed                  | Nền khung chờ                                                  |
| `shadow-card`  | `0 1px 2px rgb(15 23 42 / 0.04)`  | —                | Bóng panel/card (chỉ chủ đề sáng)                              |
| `shadow-float` | `0 8px 24px rgb(15 23 42 / 0.12)` | —               | Bóng lớp nổi: dropdown, dialog, toast (chỉ chủ đề sáng)        |

### Nguyên tắc sử dụng màu

1. **Accent duy nhất:** `accent` là hue duy nhất của UI. Màu trạng thái (`success/warning/danger/info`) chỉ truyền tải trạng thái nghiệp vụ, không trang trí. Màu avatar là trung tính xanh-xám (xem §6), không cạnh tranh accent.
2. **Chữ trên accent luôn tối:** mọi chữ/icon trên nền `accent` đặc dùng `on-accent` `#0B1220`. Không bao giờ chữ trắng trên `#4C9EEB`.
3. **Liên kết khác nút:** liên kết văn bản dùng `accent-strong`; nút dùng nền `accent` + viền `accent-edge`.
4. **Tương phản:** văn bản ≥4.5:1; phần tử phi văn bản ≥3:1. Cặp mới phải kiểm chứng bằng script trước khi vào token.
5. **Ngoại lệ mã màu:** chỉ cho tài nguyên thương hiệu bên thứ ba và giá trị fallback trong SVG symbol.

---

## 3. Typography

Một họ duy nhất: **Be Vietnam Pro** (Google Fonts), trọng số 400/500/600/700/800.

| Cấp bậc         | Cỡ   | Trọng số | Độ cao dòng | Khoảng cách chữ | Dùng cho                                             |
| :-------------- | :--- | :------- | :---------- | :-------------- | :--------------------------------------------------- |
| `display-brand` | 40px | 800      | 1.05        | −0.03em         | Splash, hero auth                                     |
| `display-xl`    | 32px | 800      | 1.1         | −0.02em         | Trạng thái rỗng lớn                                   |
| `display-lg`    | 24px | 800      | 1.15        | −0.02em         | Tiêu đề trang (Nhật ký, Hoạt động, Bạn bè)            |
| `title-lg`      | 20px | 700      | 1.25        | −0.01em         | Tiêu đề panel, tên hội thoại ở list                   |
| `title-md`      | 16px | 700      | 1.35        | 0               | Tiêu đề khối, tên người                               |
| `body`          | 16px | 400      | 1.5         | 0               | Nội dung đọc, input                                   |
| `body-sm`       | 14px | 400      | 1.5         | 0               | Nội dung danh sách, bubble, nút                       |
| `caption`       | 12px | 500      | 1.4         | 0               | Siêu dữ liệu, thời gian, đếm số                       |
| `label-caps`    | 12px | 600      | 1.2         | +0.08em         | Nhãn khối viết hoa (Đã ghim, Thành viên, Gần đây)     |

### Nguyên tắc định dạng chữ

1. **Một họ:** không dùng họ thứ hai. Nhấn mạnh bằng trọng số (700/800) và cỡ chữ, không bằng italic/uppercase tràn lan.
2. **Thang cố định:** chỉ dùng các bậc 12/14/16/20/24/32/40; không tự đặt cỡ ngoài bảng. Nội dung không dưới 12px.
3. **Số thẳng hàng:** mọi số đếm, giờ, ngày bật `tabular-nums`.
4. **Truncation:** tên dài một dòng có ellipsis; không xuống dòng trong list item.

---

## 4. Layout

Ứng dụng khung `100dvh` + `overflow-hidden`, tôn trọng safe-area. Bố cục lồng nhau: mỗi vùng là một panel `surface` bo `card` trên `canvas`, cách nhau `spacing.md` (16px) ở màn hình lớn.

### Shell

| Vùng      | Desktop ≥1280                          | Desktop 1024–1279                       | Mobile <1024                                |
| :-------- | :------------------------------------- | :-------------------------------------- | :------------------------------------------ |
| Rail      | 72px: logo + 4 nav (Tin nhắn · Nhật ký · Bạn bè · Hoạt động) + Cài đặt + avatar | như ≥1280 | Ẩn; thay bằng header 56 + tab bar |
| Chat      | list 320 + thread + details 360        | list 320 + thread; details = drawer     | list → thread toàn màn; details = sheet     |
| Feed      | rail + cột đọc (≤640) + rail phải 320  | rail + cột đọc                          | cuộn dọc một cột                            |
| Bạn bè    | rail + danh sách + panel phải 320      | như ≥1280, panel phải giữ               | một cột, chọn người mở sheet                |
| Hồ sơ     | rail + cover/header + 2 cột (giới thiệu 340 + bài viết) | như ≥1280, thu cột | một cột                                     |
| Cài đặt   | rail + sidebar 280 + nội dung          | như ≥1280                               | danh sách → chi tiết (back trong header)     |
| Auth      | split: brand field 52% + form          | như ≥1280                               | form đầy đủ + wordmark đầu trang            |

### Breakpoints

| Breakpoint | Chiều rộng | Vai trò                                                    |
| :--------- | :--------- | :--------------------------------------------------------- |
| `xs`       | 480px      | Tiện ích nhỏ                                               |
| mobile     | < 1024px   | Tab bar 4 mục; sheet thay drawer; dialog toàn màn dạng sheet |
| `lg`       | ≥ 1024px   | Rail xuất hiện, tab bar ẩn                                 |
| `xl`       | ≥ 1280px   | Panel phải 360 và rail phải 320 bật                        |

Không thanh cuộn ngang ở bất kỳ breakpoint nào. Đoạn đọc dài không quá 80 ký tự/dòng.

---

## 5. Elevation & Depth

Phân tầng bằng **bề mặt + viền + bóng nhẹ**; không dùng màu đậm để chia tầng.

1. **Canvas:** `canvas` `#EDF1F6` là nền sâu nhất; mọi panel nổi trên nó.
2. **Panel:** `surface` bo `card` 16px, viền `line` 1px, `shadow-card` (sáng). Panel có thể lồng panel (`surface-2` bên trong).
3. **Lớp nổi:** dropdown/dialog/toast = `surface` + `line` + `shadow-float`; dialog thêm `backdrop-blur-sm` trên overlay.
4. **Chủ đề tối:** phân tầng bằng bước màu bề mặt (`#0B111C` → `#141D2B` → `#1B2636`) + viền `line`; không dùng bóng.
5. **Thứ tự z:** `--z-header` 100 → `--z-sticky` 110 → `--z-dropdown` 500 → `--z-overlay` 600 → `--z-modal` 700 → `--z-popover` 800 → `--z-dialog` 900 → `--z-toast` 1000.

---

## 6. Shapes

| Token          | Giá trị | Phạm vi áp dụng                                              |
| :------------- | :------ | :----------------------------------------------------------- |
| `rounded.control` | 10px | Nút, input, icon button, segmented, chip tròn thành 9999     |
| `rounded.card`    | 16px | Panel, card bài viết, bubble, dropdown, toast, thumbnail     |
| `rounded.dialog`  | 20px | Dialog trung tâm và sheet (chỉ bo 2 góc trên khi là sheet)   |
| `rounded.full`    | 9999px | Avatar, status dot, badge đếm, ô tìm kiếm                    |

### Quy tắc định hình

- Không dùng bo góc ngoài 4 giá trị trên; không bo góc lồi 0px cho card.
- Biểu tượng: Lucide duy nhất, nét 1.7px, cỡ 16/20/24; không emoji làm icon.
- Avatar: chữ cái đầu trên nền xanh-xám trung tính (dải `#6E8CAE`–`#8C97A8`), status dot `success`/`ink-3` có viền `surface` 2px.
- Không gradient, không claymorphism, không bóng 3D trang trí.

---

## 7. Components

Nội dung chữ trong component tuân theo `COPY.md`.

### Button & IconButton

- Variants: `primary` (nền `accent`, chữ `on-accent`, viền `accent-edge`), `secondary` (nền `surface`, viền `line`), `ghost`, `danger`. Variants khai báo bằng `cva`.
- Kích thước: `sm` 36px, `md` 44px, `lg` 48px; vùng chạm tối thiểu 44×44.
- Loading: spinner 16px tại chỗ + `aria-busy`, giữ nguyên kích thước.
- Icon button không chữ phải có `aria-label`. Focus ring 2px `focus` + offset 2px.
- Điều hướng trang dùng `<a>`/`<Link>`; hành động tại chỗ dùng `<button>`.

### Segmented control

- Track: `surface-2`, bo `control`, padding 3px. Mục kích hoạt: `surface` + `shadow-card`, chữ `ink`; mục thường `ink-3`.
- Dùng cho: bộ lọc hội thoại, tab Hoạt động (Tất cả · Lời mời kết bạn), tab Bạn bè (Tất cả · Gợi ý · Đã gửi), auth (Đăng nhập · Đăng ký).
- Không dùng segmented để điều hướng trang; điều hướng trang dùng tab chữ + gạch chân accent 2px (`ptab`).

### TextField, SearchField & TextArea

- `text-field` cao 44, viền `line`, bo `control`; focus: viền `accent` + ring `focus` 2px mờ.
- `search-field` bo `full`, nền `surface-2`, cao 40, icon tìm kiếm trái.
- Nhãn luôn hiển thị; lỗi ngay dưới ô với `danger` + `aria-invalid` + `aria-describedby`; placeholder không thay nhãn.

### Chip & Badge

- `chip-primary` (`accent-soft`/`accent-strong`) cho phân loại/kích hoạt; `chip-success` cho trạng thái.
- Badge đếm: nền `accent`, chữ `on-accent`, viền màu nền 2px khi đè lên avatar/rail; `tabular-nums`; >99 hiển thị `99+`.
- Status pill trực tuyến: `accent-soft` + chấm `success`.

### Dropdown, Select & DatePicker

- Panel `dropdown-panel` (bo `card`, `shadow-float`), mở/đóng 150–200ms, Escape/click ngoài đóng, trả focus về trigger.
- Mục chọn nền `accent-soft` + chữ `accent-strong`; keyboard nav đầy đủ (mũi tên, Enter, Space, Escape).

### Dialog & AlertDialog

- Overlay `overlay` + `backdrop-blur-sm`; panel bo `dialog`, `shadow-float`, focus trap.
- Mobile: dialog chuyển thành sheet toàn màn từ dưới, bo `dialog` cho 2 góc trên, có tay cầm kéo khi cần.
- Dialog xác nhận phá hủy: tiêu đề hỏi trực diện (`Xóa {đối tượng}?`), nút xác nhận `danger`, focus mặc định vào hành động an toàn.

### Toast

- `surface` + `line` + `shadow-float`, bo `card`, `aria-live`, không chặn tương tác, `--z-toast`.

### MessageBubble

- Gửi: nền `accent`, chữ `on-accent`, bo `card` với góc dưới-phải 5px.
- Nhận: nền `surface-2`, chữ `ink`, bo `card` với góc dưới-trái 5px; hiển thị tên gửi `accent-strong` trong nhóm.
- Reply preview: viền trái 2px cùng màu chữ, text ellipsis 1 dòng.
- Siêu dữ liệu (giờ, đã xem) `caption` `ink-3`; tin nhắn liên tiếp của cùng người gửi ẩn avatar, giữ lề.

### PostCard & Feed

- Card: `post-card` (bo `card`, viền `line`, `shadow-card`), header avatar + tên + thời gian + visibility, media grid 2 cột không gap với `line` làm nền.
- Thanh tương tác: 3 action (Thích · Bình luận · Chia sẻ) phân cách trên bằng `line-soft`, hover nền `surface-2`.
- Composer dạng giả input tròn `search-field` trên card; mở PostModal đầy đủ.

### Rail & BottomNav

- Rail 72px: logo tile 40 (bo `control`, nền `accent`, chữ `on-accent`), 4 nút nav 42×42 bo 14 (`surface` + viền `line`), mục kích hoạt: chữ `accent-strong` + ring `accent-soft` 3px; badge đếm trên nút. Đáy: Cài đặt + avatar (sheet khi bấm avatar).
- BottomNav 56px: 4 mục `Tin nhắn · Nhật ký · Bạn bè · Hoạt động`, icon + nhãn `caption`, mục kích hoạt `accent-strong`, badge `accent`; safe-area đáy.
- Avatar sheet (mobile) / menu (desktop): Hồ sơ · Cài đặt · Giao diện · Đăng xuất — sheet trượt từ dưới.

### Skeleton & Loading

- Chỉ hiển thị sau 150ms, giữ tối thiểu 300ms; mô phỏng đúng lưới thật của màn (panel, avatar, 2 dòng chữ); không spinner toàn trang cho danh sách.

---

## 8. Do's and Don'ts

| Do                                                                                    | Don't                                                                                          |
| :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| Mọi màu/khoảng cách/bo góc qua token; component dùng `cva` cho variants.              | Không hex/rgba trực tiếp trong component; không class không tồn tại.                           |
| Nền `accent` đi với chữ `on-accent` tối (nút chính, badge, bubble gửi).               | Không chữ trắng trên `#4C9EEB`; không gradient.                                                |
| `accent` là hue duy nhất; trạng thái chỉ dùng token success/warning/danger/info.      | Không thêm accent thứ hai; không dùng màu trạng thái trang trí.                                |
| Liên kết văn bản = `accent-strong`.                                                   | Không dùng `accent` làm màu chữ liên kết trên nền đọc.                                         |
| Panel lồng nhau: surface trên canvas, bo 16, viền 1px, bóng nhẹ.                     | Không đổ khối màu đậm làm panel; không bo 0px cho card.                                        |
| Focus ring 2px `focus` cho mọi control; aria-label cho icon button; touch ≥44px.      | Không tắt outline; không icon-only thiếu nhãn.                                                 |
| Nhãn form luôn hiển thị; lỗi ngay dưới ô nhập.                                       | Không placeholder thay nhãn; không gom lỗi về đầu form.                                        |
| Micro motion 150–200ms; stagger ≤300ms; `prefers-reduced-motion` tắt toàn bộ.         | Không đổi trạng thái 0ms; không animation bắt buộc khi user giảm chuyển động.                  |
| Số đếm/giờ `tabular-nums`; danh sách dài virtualize/giới hạn số lượng render.         | Không số nhảy hàng; không render toàn bộ lịch sử tin nhắn cùng lúc.                            |
| Bộ lọc/tab hiển thị đồng bộ URL tham số (deep link).                                  | Không giữ trạng thái xem trong state component riêng lẻ.                                       |
| `scroll-hide` cho vùng cuộn không cần scrollbar; scrollbar mỏng 6px nơi cần.          | Không để scrollbar mặc định thô trong panel.                                                   |
