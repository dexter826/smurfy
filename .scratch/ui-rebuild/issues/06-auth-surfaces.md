# 06: Auth surfaces — login, onboarding, verify, banned

**What to build:** LoginPage (398 dòng, kèm AuthBrandingPanel), OnboardingPage, EmailVerificationPage, BannedPage, NotFoundPage về treatment mới: hero brand moment (primary cornflower + chữ tối), bỏ glow/blur xanh kiểu cũ, form theo DESIGN.md §7 (label visible, error cạnh field, react-hook-form + zod giữ nguyên, copy theo COPY.md).

**Blocked by:** 05

**Status:** ready-for-agent

- [ ] 4 trang + NotFound mới; không còn gradient blue clone, không hex raw
- [ ] Form: label luôn visible, error ngay field, focus đúng thứ tự, keyboard submit được
- [ ] AuthBrandingPanel về cùng ngôn ngữ brand mới, dùng logo kit từ ticket 04
- [ ] 7 trục: LoginPage 398 dòng tách phần form riêng (schema + fields), hết component khổng lồ
- [ ] `tsc --noEmit` + `vite build` xanh

