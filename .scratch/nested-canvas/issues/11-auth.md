# Auth — split brand field + form, onboarding/verify/join

Type: task
Status: ready-for-agent
Blocked by: 02

## Scope
- `src/features/auth/components/LoginPage.tsx`, `AuthBanner.tsx`, `OnboardingPage.tsx`, `EmailVerificationPage.tsx`
- `src/features/chat/components/JoinGroupPage.tsx` (nếu chưa xong ở 06)

## Việc làm
1. Login desktop: split 52/48 — trái brand field `accent` với wordmark Smurfy + headline display-brand + 3 điểm giá trị + rings trang trí (chữ tối trên accent, không ảnh); phải form card (frame c-auth).
2. Tabs Đăng nhập/Đăng ký dạng `seg`; form 2 bước đăng ký giữ nguyên luồng + stepper 2 chấm; quên mật khẩu là view thứ 3.
3. Input/auth banner theo primitive mới (AuthBanner: info/success/error với `*-soft` + viền trái).
4. OnboardingPage: giữ task-screen, đổi header/token; chips sở thích `chip-primary`.
5. EmailVerificationPage: card giữa `surface` bo `card` trên `canvas`.
6. Mobile: form đầy đủ + wordmark đầu trang (frame c-m-auth); brand field rút thành dải trên.

## Tiêu chí nghiệm thu
- 3 lệnh CI pass; grep scope 0 hex/0 class chết.
- Khớp frame c-auth + c-m-auth.
- Đăng nhập/đăng ký/quên mật khẩu/xác minh email/onboarding hoạt động như cũ (không đổi authStore).

## Comments
