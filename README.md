<div align="center">

<img src="public/logo_text_blue.png" alt="Smurfy Social Logo" width="320" />

# Smurfy Social

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-10.13-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)

**Ứng dụng mạng xã hội thời gian thực, tập trung vào trải nghiệm kết nối bạn bè, chia sẻ trạng thái và trò chuyện trực tiếp.**

</div>

---

## Mục lục

- [Bối cảnh](#bối-cảnh)
- [Tính năng](#tính-năng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cài đặt](#cài-đặt)
- [Cấu hình](#cấu-hình)
- [Sử dụng](#sử-dụng)
- [Giấy phép](#giấy-phép)

---

## Bối cảnh

Smurfy Social là nền tảng mạng xã hội kết hợp giữa bảng tin chia sẻ nội dung và hệ thống nhắn tin tức thời. Ứng dụng hướng đến việc tối ưu trải nghiệm tương tác trực tuyến liền mạch: từ việc cập nhật tin tức của bạn bè, bình luận trao đổi, đến trò chuyện cá nhân và hội nhóm với tốc độ phản hồi theo thời gian thực.

---

## Tính năng

### Tài khoản & Hồ sơ
- **Đăng ký và xác thực**: Tạo tài khoản bằng email, xác minh tài khoản và hoàn thiện thông tin cá nhân ban đầu.
- **Trang cá nhân**: Tùy biến ảnh đại diện, ảnh bìa, tiểu sử và thông tin giới thiệu.
- **Quyền riêng tư**: Quản lý mức độ hiển thị thông tin và danh sách chặn người dùng.

### Bảng tin & Tương tác
- **Đăng tải bài viết**: Chia sẻ trạng thái bằng văn bản, hình ảnh hoặc liên kết có xem trước nội dung.
- **Cảm xúc đa dạng**: Thả biểu cảm với 6 loại cảm xúc phổ biến trên từng bài viết.
- **Bình luận phân luồng**: Trao đổi và trả lời trực tiếp từng bình luận trong luồng thảo luận.
- **Chia sẻ & Nhắc hẹn**: Chia sẻ lại bài viết lên dòng thời gian và theo dõi lịch sinh nhật của bạn bè.

### Trò chuyện thời gian thực
- **Tin nhắn cá nhân & Nhóm**: Trò chuyện trực tiếp 1-1 hoặc tạo nhóm trò chuyện không giới hạn thành viên.
- **Nội dung phong phú**: Gửi tin nhắn văn bản, hình ảnh, ảnh động GIF, tệp đính kèm và tin nhắn thoại.
- **Tương tác nhóm**: Mời thành viên qua liên kết, phê duyệt người tham gia và phân quyền quản trị nhóm.
- **Trạng thái trực tiếp**: Hiển thị người dùng đang nhập tin nhắn và trạng thái đang hoạt động.

### Kết nối bạn bè
- **Lời mời kết bạn**: Gửi, nhận, chấp nhận hoặc từ chối lời mời kết nối.
- **Gợi ý kết bạn**: Tự động gợi ý người dùng dựa trên mạng lưới bạn chung.
- **Quản lý quan hệ**: Xem danh sách bạn bè, hủy kết bạn và chặn khi cần thiết.

---

## Cấu trúc thư mục

```text
smurfy/
├── public/                 # Tài nguyên tĩnh (logo, biểu tượng, âm thanh thông báo)
├── shared/                 # Định nghĩa kiểu dữ liệu dùng chung (TypeScript types)
├── src/
│   ├── app/                # Thiết lập gốc, layout giao diện và định tuyến (routing)
│   ├── components/         # Các UI component dùng chung
│   ├── constants/          # Hằng số cấu hình toàn cục
│   ├── features/           # Các module tính năng (auth, chat, feed, friend, profile...)
│   ├── hooks/              # Custom React hooks tái sử dụng
│   ├── lib/                # Cấu hình SDK Firebase (Auth, Firestore, RTDB)
│   ├── services/           # Dịch vụ tích hợp bên ngoài và xử lý dữ liệu
│   ├── store/              # Quản lý trạng thái ứng dụng (Zustand stores)
│   └── utils/              # Các hàm tiện ích hỗ trợ
├── database.rules.json     # Quy tắc bảo mật Firebase Realtime Database
├── firestore.rules         # Quy tắc bảo mật dữ liệu Cloud Firestore
└── firebase.json           # Cấu hình Firebase Hosting, Database và Emulator
```

---

## Cài đặt

### Yêu cầu môi trường

- **Node.js**: Phiên bản 18 trở lên.
- **npm** (hoặc **pnpm** / **yarn**).

### Các bước cài đặt

1. Sao chép mã nguồn về máy:
   ```bash
   git clone https://github.com/your-username/smurfy.git
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

Cập nhật các thông số cần thiết trong tệp `.env`:
- Thông tin cấu hình dự án Firebase (API Key, Project ID, Database URL...).
- Khóa API cho các dịch vụ mở rộng (lưu trữ ảnh, tìm kiếm GIF, xem trước liên kết).

---

## Sử dụng

Khởi chạy máy chủ phát triển cục bộ:

```bash
npm run dev
```

Biên dịch ứng dụng cho môi trường chạy chính thức:

```bash
npm run build
```

Xem trước bản đóng gói tại máy cục bộ:

```bash
npm run preview
```

---

## Giấy phép

Dự án được phân phối dưới giấy phép [MIT](LICENSE).
