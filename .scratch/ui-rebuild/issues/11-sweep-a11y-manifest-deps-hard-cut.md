# 11: Sweep — hard-cut API legacy, a11y, manifest, dead deps

**What to build:** Ticket cuối dọn toàn bộ phần còn lại: (1) hard-cut tên API/utility legacy còn sót — grep 0 legacy name toàn repo; (2) index.html bỏ `maximum-scale=1, user-scalable=0`; (3) dọn manifest PWA: bỏ `public/manifest.json` hoặc VitePWA manifest — về 1 nguồn trỏ bộ icon/og-image/twitter-image chuẩn từ ticket 04, theme-color khớp `#4C9EEB`, name "Smurfy"; (4) xoá dead deps `styled-components` + `dexie` (nêu rõ trong commit, không âm thầm); (5) quét sạch inline hex còn sót (call dialogs `#1a1f2e`, NotFound `#4D8AFF`…), raw palette classes còn lại; (6) a11y sweep theo checklist `web-design-guidelines` (fetch vercel-labs) + Pre-Delivery Checklist MASTER.md; (7) responsive pass 375/768/1024/1440 từng trang, light/dark.

**Blocked by:** 10

**Status:** ready-for-agent

- [ ] `grep` không còn hex raw ngoài token trong `src/`; raw palette class = 0
- [ ] Zoom không bị disable; meta theme-color = `#4C9EEB` khớp token; 1 manifest duy nhất trỏ đúng assets ticket 04
- [ ] `styled-components` + `dexie` khỏi package.json; `vite build` xanh sau xoá
- [ ] 7 trục sweep cuối: naming residue, code chết chỉ đánh dấu không tự xoá, hooks thuần tách khỏi JSX để test được
- [ ] Checklist web-design-guidelines chạy qua các trang chính, findings P1 xử lý xong
- [ ] PR tổng: mô tả thay đổi

