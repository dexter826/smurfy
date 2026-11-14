<div align="center">

<img src="public/logo_text_blue.png" alt="Smurfy Social Logo" width="320" />

# Smurfy Social

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-10.13-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)

**Mạng xã hội thời gian thực: bảng tin chia sẻ, trò chuyện cá nhân và hội nhóm, quản lý quan hệ bạn bè.**

</div>

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Thiết kế giao diện](#thiết-kế-giao-diện)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cài đặt](#cài-đặt)
- [Cấu hình](#cấu-hình)
- [Lệnh chạy](#lệnh-chạy)
- [Giấy phép](#giấy-phép)

---

## Giới thiệu

Smurfy Social là mạng xã hội kết hợp bảng tin chia sẻ nội dung và hệ thống nhắn tin tức thời, xây dựng trên Firebase (Auth, Cloud Firestore, Realtime Database). Frontend dùng React 19 + TypeScript + Vite, giao diện theo ngôn ngữ thiết kế **Nested Canvas** được đặc tả trong [DESIGN.md](DESIGN.md).

---

## Tính năng

### Tài khoản & Hồ sơ

- **Đăng ký hai bước**: tạo tài khoản bằng email, xác minh email qua link, hoàn thiện hồ sơ (tỉnh thành, sở thích) qua màn onboarding.
- **Trang cá nhân**: thay đổi ảnh đại diện, ảnh bìa (có crop), tiểu sử và thông tin giới thiệu.
- **Quyền riêng tư**: chọn mức hiển thị bài viết (Công khai / Bạn bè / Chỉ mình tôi) và quản lý danh sách chặn với 3 mức hạn chế riêng biệt.

### Trò chuyện thời gian thực

- **Tin nhắn cá nhân & Nhóm**: trò chuyện trực tiếp 1-1 hoặc hội nhóm; gửi văn bản và hình ảnh.
- **Tương tác tin nhắn**: trả lời, chỉnh sửa, thu hồi, chuyển tiếp, ghim, thả cảm xúc và nhắc tên thành viên.
- **Quản lý hội thoại**: ghim, tắt thông báo, lưu trữ, đánh dấu chưa đọc, tìm kiếm lịch sử tin nhắn.
- **Quản trị nhóm**: mời thành viên qua link, phê duyệt người tham gia, thăng/hạ quyền admin, giải tán nhóm.
- **Trạng thái trực tiếp**: hiển thị đang nhập tin nhắn và trạng thái hoạt động qua Firebase Realtime Database.

### Bảng tin

- **Đăng bài**: chia sẻ bài viết dạng văn bản hoặc hình ảnh, kèm bài viết hệ thống khi đổi avatar/ảnh bìa.
- **Cảm xúc**: thả 6 loại cảm xúc trên từng bài viết.
- **Bình luận phân luồng**: trả lời trực tiếp từng bình luận trong luồng thảo luận.
- **Chia sẻ**: đăng lại bài viết của người khác lên dòng thời gian.

### Hoạt động

- **Gộp thông báo & lời mời**: một trang duy nhất hiển thị thông báo tương tác và lời mời kết bạn, lọc theo tab `Tất cả / Lời mời kết bạn`.
- **Hành động trực tiếp**: chấp nhận hoặc từ chối lời mời kết bạn ngay trong danh sách.

### Bạn bè

- **Quản lý quan hệ**: gửi, nhận, chấp nhận, từ chối, huỷ kết bạn và chặn người dùng.
- **Gợi ý kết bạn**: đề xuất dựa trên số bạn chung, kèm nút làm mới danh sách.
- **Tìm kiếm**: tìm bạn bè, lời mời và gợi ý theo tên.

---

## Thiết kế giao diện

Ngôn ngữ thiết kế **Nested Canvas** được đặc tả trong [DESIGN.md](DESIGN.md): canvas xám lạnh làm nền, panel trắng nổi bo góc 16px với viền mảnh, một accent cornflower `#4C9EEB` duy nhất đi kèm chữ tối. Typography dùng Be Vietnam Pro, dark mode full parity. Toàn bộ nội dung chữ trên giao diện tuân theo [COPY.md](COPY.md).

---

## Cấu trúc thư mục

```text
smurfy/
├── public/                 # Tài nguyên tĩnh (logo, biểu tượng PWA, ảnh chia sẻ mạng xã hội)
├── shared/                 # Định nghĩa kiểu dữ liệu dùng chung (TypeScript types)
├── src/
│   ├── app/                # Layout giao diện, định tuyến (routing) và shell ứng dụng
│   ├── components/         # Các UI component dùng chung
│   ├── constants/          # Hằng số cấu hình toàn cục
│   ├── features/           # Module tính năng (auth, chat, comment, feed, friend,
│   │                       #   notification, presence, profile, settings)
│   ├── hooks/              # Custom React hooks tái sử dụng
│   ├── lib/                # Cấu hình SDK Firebase (Auth, Firestore, RTDB)
│   ├── services/           # Dịch vụ tích hợp bên ngoài và xử lý dữ liệu
│   ├── store/              # Quản lý trạng thái ứng dụng (Zustand stores)
│   ├── styles/             # Token thiết kế và styles toàn cục (Tailwind CSS v4)
│   └── utils/              # Các hàm tiện ích hỗ trợ
├── database.rules.json     # Quy tắc bảo mật Firebase Realtime Database
├── firestore.rules         # Quy tắc bảo mật dữ liệu Cloud Firestore
└── firebase.json           # Cấu hình Firebase Hosting, Database, Emulator
```

---

## Cài đặt

### Yêu cầu môi trường

- **Node.js** 18 trở lên.
- **npm**.

### Các bước cài đặt

1. Sao chép mã nguồn về máy:

   ```bash
   git clone https://github.com/dexter826/smurfy.git
   cd smurfy
   ```

2. Cài đặt các gói phụ thuộc:

   ```bash
   npm install
   ```

---

## Cấu hình

Tạo tệp `.env` tại thư mục gốc dựa trên tệp mẫu `.env.example`:

```bash
cp .env.example .env
```

Điền các thông số sau:

| Biến môi trường | Mục đích |
| :--- | :--- |
| `VITE_FIREBASE_*` | Thông số dự án Firebase (API Key, Project ID, Database URL...) |
| `VITE_PROVINCES_API_URL` | Địa chỉ API danh sách tỉnh thành cho onboarding |
| `VITE_IMGBB_API_KEY` | Khóa API dịch vụ tải ảnh ImgBB |
| `VITE_USE_FIREBASE_EMULATOR` | Bật kết nối Firebase Emulator khi chạy phát triển cục bộ |

---

## Lệnh chạy

| Lệnh | Mục đích |
| :--- | :--- |
| `npm run dev` | Khởi chạy máy chủ phát triển cục bộ |
| `npm run build` | Biên dịch ứng dụng cho môi trường chính thức (kèm sinh PWA service worker) |
| `npm run preview` | Xem trước bản đóng gói tại máy cục bộ |
| `npm run typecheck` | Kiểm tra kiểu TypeScript |
| `npm run format:check` | Kiểm tra định dạng code (Prettier) |

GitHub Actions tự chạy typecheck, format check và build trên mỗi pull request hướng tới `main`.

---

## Giấy phép

Dự án được phân phối dưới giấy phép [MIT](LICENSE).
