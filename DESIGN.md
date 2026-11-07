---
version: 1
name: Smurfy — Cornflower Social
description: Mạng xã hội Việt chat-first. Giao diện thân thiện với bo tròn mềm trên nền trung tính; một màu primary cornflower sáng với chữ tối trên nền màu là chữ ký nhận diện duy nhất.
colors:
  background: '#f7f9fc'
  surface: '#ffffff'
  surface-elevated: '#ffffff'
  surface-sunken: '#eaf0f7'
  hover: '#eef3f9'
  active: '#e4ecf5'
  overlay: 'rgb(2 6 23 / 0.5)'
  chat: '#f5f7f9'
  message-sent: '#4c9eeb'
  message-received: '#ffffff'
  primary: '#4c9eeb'
  primary-hover: '#3d8be0'
  primary-strong: '#2367a8'
  primary-soft: 'rgb(76 158 235 / 0.12)'
  primary-edge: '#2e7cc4'
  on-primary: '#0b1220'
  text-primary: '#0f172a'
  text-secondary: '#475569'
  text-muted: '#64748b'
  text-faint: '#7d8da3'
  border: '#dce5ef'
  border-default: '#e6ecf4'
  border-strong: '#c9d7e7'
  focus: '#4c9eeb'
  success: '#15803d'
  on-success: '#ffffff'
  warning: '#b45309'
  on-warning: '#ffffff'
  danger: '#dc2626'
  on-danger: '#ffffff'
  info: '#0369a1'
  on-info: '#ffffff'
  success-soft: 'rgb(21 128 61 / 0.12)'
  warning-soft: 'rgb(180 83 9 / 0.12)'
  danger-soft: 'rgb(220 38 38 / 0.12)'
  info-soft: 'rgb(3 105 161 / 0.12)'
  skeleton: 'color-mix(in srgb, {colors.text-primary} 8%, {colors.surface})'
themes:
  dark:
    colors:
      background: '#12161f'
      surface: '#1a2230'
      surface-elevated: '#232d3d'
      surface-sunken: '#1e2530'
      hover: '#202836'
      active: '#283242'
      overlay: 'rgb(2 6 23 / 0.7)'
      chat: '#090c10'
      message-sent: '#4c9eeb'
      message-received: '#1e242d'
      primary: '#4c9eeb'
      primary-hover: '#3d8be0'
      primary-strong: '#7fb6ef'
      primary-soft: 'rgb(76 158 235 / 0.2)'
      primary-edge: '#2e7cc4'
      on-primary: '#0b1220'
      text-primary: '#e8eef6'
      text-secondary: '#a9b8cb'
      text-muted: '#8ca0b8'
      text-faint: '#64748b'
      border: '#2a3446'
      border-default: '#1e2530'
      border-strong: '#384457'
      focus: '#4c9eeb'
      success: '#4ade80'
      on-success: '#0b1220'
      warning: '#fbbf24'
      on-warning: '#0b1220'
      danger: '#f87171'
      on-danger: '#0b1220'
      info: '#38bdf8'
      on-info: '#0b1220'
      success-soft: 'rgb(74 222 128 / 0.12)'
      warning-soft: 'rgb(251 191 36 / 0.12)'
      danger-soft: 'rgb(248 113 113 / 0.12)'
      info-soft: 'rgb(56 189 248 / 0.12)'
      skeleton: 'color-mix(in srgb, {colors.text-primary} 8%, {colors.surface})'
typography:
  display-brand:
    fontFamily: Nunito
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: 0
  display-xl:
    fontFamily: Nunito
    fontSize: 30px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: 0
  display-lg:
    fontFamily: Nunito
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: 0
  title-lg:
    fontFamily: Nunito
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: Nunito
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: 0
  body:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  label-caps:
    fontFamily: Nunito Sans
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
    textTransform: uppercase
rounded:
  control: 8px
  card: 12px
  dialog: 16px
  full: 9999px
spacing:
  micro-1: 2px
  micro-2: 6px
  micro-3: 10px
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
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    border: '{colors.primary-edge}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.primary-strong}'
    border: '{colors.primary-edge}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.control}'
  button-ghost:
    backgroundColor: transparent
    textColor: '{colors.text-secondary}'
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
    gap: '{spacing.micro-2}'
  button-size-md:
    padding: 10px 16px
    typography: '{typography.body-sm}'
    gap: '{spacing.xs}'
  button-size-lg:
    padding: 12px 24px
    typography: '{typography.body}'
    gap: '{spacing.xs}'
  icon-button-sm:
    width: 36px
    height: 36px
    rounded: '{rounded.control}'
  icon-button-md:
    width: 44px
    height: 44px
    rounded: '{rounded.control}'
  icon-button-lg:
    width: 48px
    height: 48px
    rounded: '{rounded.card}'
  text-field:
    height: 44px
    typography: '{typography.body}'
    textColor: '{colors.text-primary}'
    placeholderColor: '{colors.text-muted}'
    rounded: '{rounded.control}'
    border: '{colors.border}'
  search-field:
    height: 44px
    padding: 0 36px 0 40px
    typography: '{typography.body}'
    rounded: '{rounded.full}'
    backgroundColor: '{colors.surface-sunken}'
  chip-primary:
    backgroundColor: '{colors.primary-soft}'
    textColor: '{colors.primary-strong}'
    typography: '{typography.caption}'
    rounded: '{rounded.full}'
    padding: 2px 8px
  chip-success:
    backgroundColor: '{colors.success}'
    textColor: '{colors.on-success}'
    typography: '{typography.caption}'
    rounded: '{rounded.full}'
  chip-neutral:
    backgroundColor: 'rgb(0 0 0 / 0.6)'
    textColor: '#ffffff'
    typography: '{typography.caption}'
    rounded: '{rounded.full}'
  chip-muted:
    backgroundColor: '{colors.surface-sunken}'
    textColor: '{colors.text-secondary}'
    typography: '{typography.caption}'
    rounded: '{rounded.full}'
  dropdown-trigger:
    height: 44px
    padding: 0 16px
    rounded: '{rounded.control}'
    border: '{colors.border}'
    typography: '{typography.body}'
  dropdown-panel:
    backgroundColor: '{colors.surface-elevated}'
    border: '{colors.border}'
    rounded: '{rounded.card}'
    padding: '{spacing.xs}'
    maxHeight: 280px
  dialog-overlay:
    backgroundColor: 'rgb(0 0 0 / 0.5)'
  dialog-panel:
    backgroundColor: '{colors.surface-elevated}'
    rounded: '{rounded.dialog}'
    maxHeight: 90dvh
  dialog-header:
    padding: 12px 16px
    borderBottom: '{colors.border-default}'
  dialog-footer:
    padding: 12px 16px
    borderTop: '{colors.border-default}'
    safeArea: bottom
  toast:
    backgroundColor: '{colors.surface-elevated}'
    border: '{colors.border}'
    rounded: '{rounded.card}'
    padding: 12px 14px
    typography: '{typography.body-sm}'
  skeleton:
    backgroundColor: '{colors.skeleton}'
    rounded: '{rounded.control}'
  avatar:
    rounded: '{rounded.full}'
  message-bubble-sent:
    backgroundColor: '{colors.message-sent}'
    textColor: '{colors.on-primary}'
    typography: '{typography.body}'
    rounded: '{rounded.card}'
    borderBottomRightRadius: 4px
  message-bubble-received:
    backgroundColor: '{colors.message-received}'
    textColor: '{colors.text-primary}'
    typography: '{typography.body}'
    rounded: '{rounded.card}'
    borderBottomLeftRadius: 4px
  post-card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.card}'
    border: '{colors.border-default}'
  bottom-nav:
    height: 56px
    backgroundColor: '{colors.surface}'
    borderTop: '{colors.border}'
    safeArea: bottom
  sidebar:
    width: 264px
    backgroundColor: '{colors.surface}'
    borderRight: '{colors.border-default}'
  side-panel:
    width: 320px
    backgroundColor: '{colors.surface}'
    borderLeft: '{colors.border-default}'
---

## 1. Overview

Smurfy là mạng xã hội tiếng Việt hướng chat-first: trò chuyện trực tiếp, nhóm, bảng tin (feed) và quản lý quan hệ bạn bè. Ngôn ngữ thiết kế lấy cảm hứng từ hình tượng loài smurf — thân thiện, tròn trịa, năng động — thể hiện qua hệ bo góc mềm, phông chữ Nunito có đầu nét bo tròn, và một màu nhấn cornflower sáng duy nhất.

### Đặc tính cốt lõi

- **Chữ ký nhận diện:** Màu `primary` cornflower sáng `#4c9eeb` luôn đi kèm văn bản màu tối `on-primary` trên nền màu đặc — một xử lý màu hiếm gặp trong nhóm ứng dụng chat, tạo bản sắc riêng thay vì bám theo các mạng xã hội phổ biến.
- **Chế độ hiển thị:** Chủ đề sáng là chuẩn gốc; chủ đề tối đồng bộ đầy đủ (full parity). Lần truy cập đầu theo tuỳ chọn hệ điều hành (`prefers-color-scheme`), lựa chọn thủ công của người dùng được ghi nhớ.
- **Kiểu chữ:** Nunito dùng cho tiêu đề và chữ hiển thị; Nunito Sans dùng cho toàn bộ nội dung đọc, biểu mẫu và nhãn giao diện. Cả hai hỗ trợ đầy đủ dấu tiếng Việt.
- **Cấu trúc hình học:** Khối bố cục rõ ràng (block-based) có kỷ luật; bo tròn thân thiện nhưng phẳng — không mô phỏng khối đất sét (claymorphism), không bóng đổ 3D, không gradient trang trí.
- **Nền tảng:** Tối ưu trước cho thiết bị di động (mobile-first), vận hành dạng PWA, bản địa hóa tiếng Việt toàn bộ giao diện.
- **Tin nhắn:** Bong bóng tin nhắn phân cực rõ — phía người gửi dùng nền `primary` với chữ `on-primary`, phía người nhận dùng nền `surface` với chữ `text-primary`.

---

## 2. Colors

Hệ thống màu tuân thủ độ tương phản tiếp cận WCAG AA trên cả hai chủ đề. Mọi thành phần giao diện bắt buộc tham chiếu qua token ngữ nghĩa; không định nghĩa mã màu trực tiếp trong mã nguồn giao diện.

| Token              | Light                    | Dark                      | Vai trò ngữ nghĩa                                              |
| :----------------- | :----------------------- | :------------------------ | :------------------------------------------------------------- |
| `background`       | `#f7f9fc`                | `#12161f`                 | Nền canvas chính của ứng dụng                                  |
| `surface`          | `#ffffff`                | `#1a2230`                 | Bề mặt phân cấp cấp 1 (card, panel, sidebar)                   |
| `surface-elevated` | `#ffffff`                | `#232d3d`                 | Bề mặt nổi (dialog, dropdown, toast, popover)                  |
| `surface-sunken`   | `#eaf0f7`                | `#1e2530`                 | Bề mặt lún (ô tìm kiếm, khối phụ)                              |
| `hover`            | `#eef3f9`                | `#202836`                 | Nền hover tĩnh của mục danh sách và control                    |
| `active`           | `#e4ecf5`                | `#283242`                 | Nền trạng thái nhấn hoặc đã chọn tĩnh                          |
| `overlay`          | `rgb(2 6 23 / 0.5)`      | `rgb(2 6 23 / 0.7)`       | Lớp phủ hộp thoại và ngăn kéo                                  |
| `chat`             | `#f5f7f9`                | `#090c10`                 | Nền khu vực luồng tin nhắn                                     |
| `message-sent`     | `#4c9eeb`                | `#4c9eeb`                 | Nền bong bóng tin nhắn phía người gửi                          |
| `message-received` | `#ffffff`                | `#1e242d`                 | Nền bong bóng tin nhắn phía người nhận                         |
| `primary`          | `#4c9eeb`                | `#4c9eeb`                 | Màu nhấn duy nhất: nút chính, trạng thái kích hoạt, nhấn mạnh  |
| `primary-hover`    | `#3d8be0`                | `#3d8be0`                 | Trạng thái hover của màu nhấn                                  |
| `primary-strong`   | `#2367a8`                | `#7fb6ef`                 | Liên kết văn bản và nhấn mạnh chữ đạt AA trên nền đọc          |
| `primary-soft`     | `rgb(76 158 235 / 0.12)` | `rgb(76 158 235 / 0.2)`   | Nền màu nhấn loãng (chip, mục điều hướng kích hoạt, highlight) |
| `primary-edge`     | `#2e7cc4`                | `#2e7cc4`                 | Viền định hình nút primary đạt ngưỡng non-text 3:1             |
| `on-primary`       | `#0b1220`                | `#0b1220`                 | Văn bản và biểu tượng trên nền primary đặc                     |
| `text-primary`     | `#0f172a`                | `#e8eef6`                 | Mực chính cho tiêu đề và nội dung đọc                          |
| `text-secondary`   | `#475569`                | `#a9b8cb`                 | Mực phụ cho mô tả và nhãn (đạt chuẩn AA)                       |
| `text-muted`       | `#64748b`                | `#8ca0b8`                 | Văn bản gợi ý (placeholder, hint, siêu dữ liệu)                |
| `text-faint`       | `#7d8da3`                | `#64748b`                 | Chữ cỡ lớn hoặc thành phần trang trí (tỷ lệ 3:1)               |
| `border`           | `#dce5ef`                | `#2a3446`                 | Viền điều khiển (input, control)                               |
| `border-default`   | `#e6ecf4`                | `#1e2530`                 | Đường phân cách danh mục, cấu trúc và thẻ                      |
| `border-strong`    | `#c9d7e7`                | `#384457`                 | Viền nhấn mạnh, thanh cuộn, phân cách cần rõ hơn               |
| `focus`            | `#4c9eeb`                | `#4c9eeb`                 | Đường viền chỉ thị focus bàn phím                              |
| `success`          | `#15803d`                | `#4ade80`                 | Chỉ thị trạng thái thành công                                  |
| `on-success`       | `#ffffff`                | `#0b1220`                 | Văn bản trên nền trạng thái thành công                         |
| `warning`          | `#b45309`                | `#fbbf24`                 | Chỉ thị cảnh báo hoặc lưu ý                                    |
| `on-warning`       | `#ffffff`                | `#0b1220`                 | Văn bản trên nền trạng thái cảnh báo                           |
| `danger`           | `#dc2626`                | `#f87171`                 | Chỉ thị lỗi hoặc hành động phá hủy dữ liệu                     |
| `on-danger`        | `#ffffff`                | `#0b1220`                 | Văn bản trên nền trạng thái lỗi                                |
| `info`             | `#0369a1`                | `#38bdf8`                 | Chỉ thị thông tin hướng dẫn                                    |
| `on-info`          | `#ffffff`                | `#0b1220`                 | Văn bản trên nền trạng thái thông tin                          |
| `success-soft`     | `rgb(21 128 61 / 0.12)`  | `rgb(74 222 128 / 0.12)`  | Nền nhạt cho trạng thái thành công                             |
| `warning-soft`     | `rgb(180 83 9 / 0.12)`   | `rgb(251 191 36 / 0.12)`  | Nền nhạt cho trạng thái cảnh báo                               |
| `danger-soft`      | `rgb(220 38 38 / 0.12)`  | `rgb(248 113 113 / 0.12)` | Nền nhạt cho trạng thái lỗi                                    |
| `info-soft`        | `rgb(3 105 161 / 0.12)`  | `rgb(56 189 248 / 0.12)`  | Nền nhạt cho trạng thái thông tin                              |
| `skeleton`         | computed                 | computed                  | Màu nền khung chờ nội dung                                     |

### Nguyên tắc sử dụng màu

1. **Màu nhấn duy nhất:** Token `primary` là điểm nhấn duy nhất của giao diện. Signature của thương hiệu là nền `primary` sáng kết hợp chữ `on-primary` tối — không thay chữ trắng lên nền primary.
2. **Liên kết khác nút:** Liên kết văn bản dùng `primary-strong`; nút bấm dùng nền `primary`. Nút primary trên chủ đề sáng giữ viền `primary-edge` để đạt ngưỡng tương phản non-text 3:1 so với nền sáng.
3. **Ngữ cảnh màu trạng thái:** Các token `success`, `warning`, `danger`, `info` chỉ dùng để truyền tải trạng thái nghiệp vụ, không dùng trang trí thuần túy.
4. **Độ tương phản:** Văn bản nội dung tối thiểu 4.5:1; phần tử phi văn bản (viền, icon phân biệt) tối thiểu 3:1. Mọi màu mới bổ sung phải kiểm chứng trước khi vào token.
5. **Ngoại lệ mã màu:** Mã màu trực tiếp chỉ cho phép đối với tài nguyên thương hiệu bên thứ ba và giá trị fallback trong SVG symbol.

---

## 3. Typography

Hệ thống kiểu chữ gồm hai phông chữ chuyên biệt: **Nunito** (rounded sans) tạo dấu ấn thân thiện, tròn trịa cho tiêu đề và chữ hiển thị; **Nunito Sans** bảo đảm khả năng đọc tiếng Việt ở mọi cấp độ nội dung. Cả hai đều có bộ ký tự tiếng Việt đầy đủ.

| Cấp bậc         | Phông chữ   | Cỡ chữ | Trọng số | Độ cao dòng | Khoảng cách chữ    |
| :-------------- | :---------- | :----- | :------- | :---------- | :----------------- |
| `display-brand` | Nunito      | 36px   | 800      | 1.0         | 0                  |
| `display-xl`    | Nunito      | 30px   | 800      | 1.1         | 0                  |
| `display-lg`    | Nunito      | 24px   | 800      | 1.15        | 0                  |
| `title-lg`      | Nunito      | 20px   | 700      | 1.3         | 0                  |
| `title-md`      | Nunito      | 18px   | 700      | 1.35        | 0                  |
| `body`          | Nunito Sans | 16px   | 400      | 1.5         | 0                  |
| `body-sm`       | Nunito Sans | 14px   | 400      | 1.5         | 0                  |
| `caption`       | Nunito Sans | 12px   | 500      | 1.4         | 0                  |
| `label-caps`    | Nunito Sans | 11px   | 600      | 1.2         | 0.08em (Uppercase) |

### Nguyên tắc định dạng chữ

1. **Phân cấp chức năng:** Nunito chỉ dùng cho điểm neo thị giác (tiêu đề cấp cao, wordmark, trạng thái rỗng). Toàn bộ nội dung văn bản dài, biểu mẫu, tin nhắn và danh sách dùng Nunito Sans.
2. **Kích thước cố định:** Cỡ chữ chỉ tham chiếu từ bảng phân cấp; không dùng thang cỡ chữ mặc định ngoài token. Văn bản nội dung không dưới 12px; `label-caps` 11px chỉ dùng cho nhãn ngắn viết hoa.
3. **Hiển thị số:** Chỉ số đo lường, số lượng chưa đọc, thời lượng và ngày tháng kích hoạt `tabular-nums` để thẳng hàng trong danh sách.

---

## 4. Layout

Hệ thống bố cục theo tỷ lệ chuẩn 4px/8px kết hợp micro-spacing phục vụ căn chỉnh chi tiết. Ứng dụng chạy trong khung màn hình cố định (`100dvh`, `overflow-hidden`) với khoảng an toàn thiết bị (safe-area insets).

### Thang khoảng cách (Spacing Scale)

- **Micro Spacing:** `micro-1` (2px), `micro-2` (6px), `micro-3` (10px) — dùng cho khoảng cách giữa biểu tượng và văn bản, điều chỉnh tinh.
- **Layout Spacing:** `xxs` (4px), `xs` (8px), `sm` (12px), `md` (16px), `lg` (20px), `xl` (24px), `xxl` (32px), `xxxl` (40px), `huge` (48px), `section` (64px).

### Lưới hiển thị và Điểm ngắt (Responsive Breakpoints)

| Breakpoint | Chiều rộng | Bố cục và Hành vi hiển thị                                                                                          |
| :--------- | :--------- | :------------------------------------------------------------------------------------------------------------------ |
| **Mobile** | < 1024px   | Top bar gọn 56px; thanh điều hướng đáy (Bottom Navigation) tối đa 5 mục; hộp thoại mở rộng toàn màn hình.           |
| **lg**     | ≥ 1024px   | Thanh điều hướng ngang phía trên khung nội dung trung tâm; bottom nav ẩn.                                           |
| **xl**     | ≥ 1280px   | Panel phải 320px (danh bạ, chi tiết tuỳ trang) hiện ở các trang cần; nội dung trung tâm giới hạn chiều rộng tối đa. |

Bảng tin và luồng chat giới hạn chiều rộng khung đọc; đoạn văn dài không vượt 80 ký tự mỗi dòng. Không xuất hiện thanh cuộn ngang ở bất kỳ điểm ngắt nào.

---

## 5. Elevation & Depth

Phân tầng thị giác ưu tiên bề mặt màu và đường viền; bóng đổ chỉ dùng ở chủ đề sáng.

1. **Lớp nền (Base Plane):** Token `background` là bề mặt sâu nhất; khu vực chat dùng token `chat` riêng.
2. **Lớp thành phần (Component Plane):** Token `surface` cho thẻ, panel, sidebar.
3. **Lớp nổi (Floating Plane):** Token `surface-elevated` cho hộp thoại, menu thả xuống, thông báo nổi.
4. **Chủ đề sáng:** Thang bóng `shadow-xs` → `shadow-xl` nâng dần theo mức nổi; thành phần nổi dùng bóng rõ hơn nền.
5. **Chủ đề tối:** Phân tầng bằng bước màu bề mặt (`#12161f` → `#1a2230` → `#232d3d`) kết hợp viền `border`; bóng đổ hạn chế.
6. **Lớp phủ (Overlay):** Hộp thoại dùng lớp phủ `rgb(0 0 0 / 0.5)`; thứ tự xếp lớp theo thang `--z-header` … `--z-toast`.

---

## 6. Shapes

Hệ thống hình học duy trì bo góc mềm, thân thiện theo tính cách mascot nhưng phẳng và có kiểm soát.

| Token             | Giá trị | Phạm vi áp dụng                                                |
| :---------------- | :------ | :------------------------------------------------------------- |
| `rounded.control` | 8px     | Nút bấm, ô nhập liệu, icon button, khung chuyển đổi trạng thái |
| `rounded.card`    | 12px    | Thẻ bài viết, panel, bong bóng tin nhắn, dropdown, toast       |
| `rounded.dialog`  | 16px    | Hộp thoại trung tâm và bảng trượt (sheet)                      |
| `rounded.full`    | 9999px  | Ảnh đại diện, chip, thanh ray, nút công tắc, ô tìm kiếm        |

### Quy tắc định hình

- Không sử dụng giá trị bo góc nằm ngoài bảng định nghĩa.
- Không kết hợp dáng mô phỏng khối đất sét (claymorphism), bóng 3D hoặc gradient trang trí vào hình khối.
- Biểu tượng dùng một bộ duy nhất (Lucide), nét 2px, kích thước 16/20/24px; không dùng emoji làm biểu tượng.

---

## 7. Components

Mỗi thành phần là một hợp đồng giao diện chuẩn. Nội dung chữ hiển thị trong các thành phần bắt buộc tuân theo tài liệu `COPY.md`.

### Button & IconButton

- **Phân loại biến thể:** `button-primary` (hành động chính), `button-secondary` (viền, hành động phụ), `button-ghost` (không viền, emphasis thấp), `button-danger` (hành động phá hủy dữ liệu).
- **Quy chuẩn tương tác:** Trạng thái xử lý hiển thị con quay 16px tại chỗ, giữ nguyên kích thước nút, kèm `aria-busy="true"`. Icon button không chứa chữ bắt buộc có `aria-label`. Vùng chạm tối thiểu 44×44px. Hành động tại chỗ dùng `<button>`; điều hướng trang dùng `<a>`/`<Link>`.

### TextField & SearchField

- `text-field` cao 44px, viền `border`, bo góc `control`; `search-field` bo tròn hoàn toàn trên nền `surface-sunken`.
- Nhãn hiển thị luôn hiện; thông báo lỗi xuất hiện ngay dưới ô nhập liệu với màu `danger`, liên kết qua `aria-invalid` và `aria-describedby`. Placeholder không thay thế nhãn.

### Chip

- `chip-primary` (nhấn mạnh/kích hoạt, nền `primary-soft`), `chip-success` (trạng thái), `chip-neutral` (nằm trên ảnh), `chip-muted` (phụ trợ).
- Chip hiển thị trạng thái hoặc phân loại, không đóng vai trò nút bấm chính.

### Dropdown, Select & DatePicker

- Bảng chọn (`dropdown-panel`) xuất hiện/biến mất 120–200ms, đóng khi nhấn Escape hoặc click ngoài, hoàn trả tiêu điểm về nút kích hoạt.
- Điều hướng bàn phím đầy đủ (mũi tên, Enter, Space, Escape); mục chọn hiện trạng thái kích hoạt bằng nền `primary-soft`.

### Dialog & AlertDialog

- Lớp phủ `dialog-overlay` tối 50%; hộp thoại khóa tiêu điểm bên trong (focus trap), đóng bằng Escape, hoàn trả tiêu điểm ban đầu.
- Hộp thoại xác nhận hành động nguy hiểm đặt tiêu điểm mặc định vào hành động an toàn; nút xác nhận dùng `button-danger`.

### Toast

- Thông báo nổi trên `surface-elevated`, dùng `aria-live` phù hợp; không chặn tương tác nền; xếp lớp dưới cùng theo thang z-index.

### MessageBubble

- Bong bóng người gửi: nền `message-sent`, chữ `on-primary`, bo góc `card` với góc dưới-phải 4px.
- Bong bóng người nhận: nền `message-received`, chữ `text-primary`, bo góc `card` với góc dưới-trái 4px.
- Siêu dữ liệu (giờ, trạng thái đã xem) dùng `caption` với `text-muted`; số chưa đọc dùng `tabular-nums`.

### PostCard & Avatar

- Thẻ bài viết: nền `surface`, bo góc `card`, viền `border-default`; khoảng cách trong theo thang `xl`.
- Avatar bo tròn hoàn toàn, có vòng trạng thái trực tuyến dùng `success`/`text-faint`; kích thước chuẩn 32/40/56px.

### Skeleton & Loading

- Trạng thái chờ chỉ hiển thị sau ngưỡng 150ms và giữ tối thiểu 300ms khi đã xuất hiện.
- Khung xương mô phỏng chính xác lưới, tỷ lệ và số lượng phần tử nội dung thực; không dùng con quay thay thế cho toàn trang danh sách.

### BottomNav & Sidebar

- Bottom Navigation cao 56px, tối đa 5 mục, nền `surface`, viền trên `border`, bảo đảm safe-area đáy; mục kích hoạt dùng `primary-soft` + `primary-strong`.
- Sidebar desktop rộng 264px; mục điều hướng icon + nhãn; trạng thái kích hoạt dùng `primary-soft`; huy hiệu số dùng `chip-primary` với `tabular-nums`.

---

## 8. Do's and Don'ts

Bảng đối chiếu nguyên tắc đúng và sai trong toàn bộ hệ thống:

| Do                                                                              | Don't                                                                                |
| :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| Tham chiếu mọi màu và khoảng cách qua Design Token.                             | Không viết mã màu trực tiếp (hex/rgba) hoặc số đo tùy tiện trong mã nguồn component. |
| Dùng nền `primary` kết hợp chữ `on-primary` tối cho nút chính và bubble gửi.    | Không dùng chữ trắng trên nền primary.                                               |
| Duy trì `primary` là màu nhấn duy nhất trên toàn giao diện.                     | Không thêm màu nhấn thứ hai hay gradient blue làm trang trí.                         |
| Dùng `primary-strong` cho liên kết văn bản.                                     | Không dùng `primary` làm màu chữ liên kết trên nền đọc.                              |
| Duy trì viền focus rõ ràng (2px, màu `focus`) cho tiếp cận bàn phím.            | Không tắt outline focus hoặc chỉ dựa vào hiệu ứng hover.                             |
| Hiển thị nhãn form luôn hiện; lỗi ngay dưới ô nhập.                             | Không dùng placeholder thay nhãn; không gom lỗi về đầu form.                         |
| Giữ vùng chạm tối thiểu 44×44px cho mọi điều khiển.                             | Không dùng điều khiển icon-only thiếu `aria-label`.                                  |
| Chuyển trạng thái với thời lượng 150–300ms; tôn trọng `prefers-reduced-motion`. | Không đổi trạng thái tức thời (0ms) hay chạy hiệu ứng bắt buộc.                      |
| Dùng bo góc theo thang chuẩn (`control` 8, `card` 12, `dialog` 16, `full`).     | Không dùng giá trị bo góc ngoài bảng hay trộn dáng claymorphism/3D.                  |
| Khung xương tải mô phỏng đúng bố cục nội dung.                                  | Không hiển thị phần trăm giả lập hay con quay toàn trang thay cho danh sách.         |
| Cho phép thu phóng trình duyệt tự nhiên.                                        | Không vô hiệu hóa zoom (`maximum-scale=1`, `user-scalable=0`).                       |
| Đồng bộ trạng thái bộ lọc và tab hiển thị lên URL tham số.                      | Không ẩn trạng thái xem trong bộ nhớ cục bộ của component riêng lẻ.                  |
