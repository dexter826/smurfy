# 06: Auth surfaces — login, onboarding, verify, banned

**What to build:** Redesign layout toàn bộ 5 trang auth theo ui-ux-pro-max (priority 5 layout, 8 forms/progressive disclosure) + COPY.md/vietnamizer cho wording. Không phải token pass — bố cục sắp lại từ đầu.

**Blocked by:** 05

**Status:** done

- [x] Login/Register: layout mới **card nổi trên brand field** — nền `bg-primary` full-bleed, card surface max-w-440 (tile logo trong card, tabs, form), không còn split 50/50 marketing panel; text chỉ nằm trên surface ⇒ hết loạn đen/trắng trên nền brand
- [x] Register chia **2 bước** (progressive disclosure, không scroll): bước 1 Email/Họ tên/Ngày sinh → bước 2 Mật khẩu/Xác nhận; indicator "Bước n của 2" + progress bar; `registerForm.trigger` theo từng bước; back giữa 2 bước
- [x] Onboarding + EmailVerification + JoinGroupPage: bỏ marketing panel, chuyển **task screen** — brand bar gọn (tile + wordmark) + 1 cột max-w-480 tập trung form
- [x] `AuthBrandingPanel` xoá (không còn import — dead code removed); `AuthBanner` mới gom 3 pattern banner lặp (trục 3)
- [x] `Popover` thêm prop `fullWidth` — DatePicker + SearchableSelect full-width theo field (fix field "Ngày sinh" bị co)
- [x] Copy chuẩn hóa theo COPY.md + vietnamizer: bỏ "mạng xã hội thế hệ mới", "tâm đầu ý hợp", "Mọi nơi."…; pills = feature thật; BannedPage chủ động (`Ban quản trị đã tạm ngưng…`); NotFound 3 phần gọn; bỏ "Smurfy Social" sai brand
- [x] BannedPage/NotFound: bỏ gradient bar + glow blur + gradient-text 404 (thay `text-primary` font-display); radius về thang
- [x] Card login: không dính đáy khi viewport thấp (`my-auto` thay `justify-center`), canh giữa 2 chiều
- [x] `tsc --noEmit` + `vite build` xanh
