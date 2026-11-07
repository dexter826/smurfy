# 01: Foundation — Tailwind v4 + token semantic + font Nunito

**What to build:** Nền cho toàn bộ rebuild. Migrate Tailwind 3.4 → v4 (`@tailwindcss/vite`, xoá config JS, `@theme` CSS-first trong `src/styles/index.css`, `@custom-variant dark`). Port toàn bộ token sang semantic theo DESIGN.md §2 (light + dark). Font Nunito (heading) + Nunito Sans (body). Theme system-first: `themeStore` default = hệ điều hành, user đổi mới lưu — giữ key `smurf_social_theme` cho FOUC script. Không đụng component/page nào.

**Blocked by:** None

**Status:** done

- [ ] `@tailwindcss/vite` thay PostCSS config; `tailwind.config.js` xoá, mọi theme về `@theme` trong CSS
- [ ] Đầy đủ token light + dark theo bảng DESIGN.md §2, không còn token rose/`#0068FF`
- [ ] Nunito + Nunito Sans load đúng subset `vietnamese`; heading dùng Nunito, body dùng Nunito Sans
- [ ] `prefers-color-scheme` mặc định; đổi thủ công vẫn persist; FOUC script giữ key `smurf_social_theme`
- [ ] Keyframes/animations hiện có (9 cái) port hết sang v4
- [ ] Sweep rename utility cũ sang token semantic toàn repo theo mapping spec; grep còn 0 class cũ
- [ ] Không comment trong code mới; Prettier cài kèm config + script `format`
- [ ] `tsc --noEmit` + `vite build` xanh

