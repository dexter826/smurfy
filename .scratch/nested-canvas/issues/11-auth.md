# Auth — split brand field + form, onboarding/verify/join

Type: task
Status: resolved
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

## Answer

**Đủ 6 mục:**
1. Login split 52/48 theo frame c-auth: aside trái `bg-accent text-on-accent w-[52%]` (logo tile `bg-on-accent text-accent` + wordmark + headline 42px `-0.03em` + sub + 3 điểm giá trị + 2 rings `border-on-accent/20` — chữ tối trên accent); phải form card `rounded-card shadow-card` max-w-440.
2. Tabs Đăng nhập/Đăng ký = seg (track `surface-2` p-3px, active `surface + shadow-card` bo 8 frame); stepper 2 chấm `bg-accent`/`accent-soft`; quên mật khẩu là view thứ 3 (giữ nguyên luồng).
3. AuthBanner: `bg-{info/success/danger}-soft + border-l-4 border-l-{tên màu}` rounded-control; info dùng accent-soft (tone thương hiệu).
4. OnboardingPage: giữ task-screen; chips sở thích `bg-accent text-on-accent` (chip-primary), hover `on-accent/10`.
5. EmailVerificationPage: card giữa surface bo card trên canvas (header viền line từ ticket 01).
6. Mobile: brand field rút thành dải trên (chỉ logo tile + wordmark; headline/rings `hidden lg:block`); form đầy đủ + logo giữa form.

**Ghi chú:** headline/sub/marks là copy mới (COPY.md chưa có phần auth) — cần owner duyệt qua COPY.md nếu muốn chuẩn hoá; `JoinGroupPage` đã xong ở ticket 06.
**Sửa sau code-review:** headline 40px (`text-4xl` display-brand — frame 42 lệch, theo DESIGN); tile `rounded-control` + kích thước responsive 38/44 theo c-m-auth/c-auth; wordmark 20/24; stepper thành **2 chấm** (`w-2 h-2 rounded-full`); chips sở thích đổi sang **`chip-primary`** (`accent-soft + accent-strong` + X có `aria-label`); EmailVerificationPage bọc **card `bg-surface rounded-card border-line shadow-card`** giữa canvas; roots `bg-canvas`; info banner giữ accent-soft (đã disclose — nếu owner muốn tone info riêng thì đổi `info-soft`).

**Verify:** CI 3 pass (exit code thật); grep scope (auth/components) = 0 alias / 0 hex / 0 class chết; `contrast_check.py` PASS; khớp frame c-auth (split 52/48, logo tile, seg) + c-m-auth (dải trên + form).
