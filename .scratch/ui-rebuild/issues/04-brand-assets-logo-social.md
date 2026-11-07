# 04: Brand assets — logo system + social images

**What to build:** Thiết kế bộ nhận diện mới cho Smurfy theo workflow Design mode của skill `logo-design` (script tại `.agents/skills/logo-design/scripts/`). Brief đã có sẵn: tên Smurfy, mascot smurf xanh, adjectives friendly/playful/modern, brand color `#4C9EEB` + `on-primary` `#0B1220` (DESIGN.md §1-2). Quy trình: research clichés category social/chat → 8-12 concept một câu → chọn 3 concept khác nhau nhất → build SVG đen trước → `svg_audit` + `preview_sheet` (ít nhất 2 vòng refine) → **checkpoint: trình concept sheet cho user duyệt** → sau duyệt build kit: symbol + wordmark (lockup ngang + xếp chồng), favicon.ico, app-icon 192/512 + masked-icon.svg, og-image 1200×630, twitter-image, logo_text_white/blue, default cover-image.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] 3 concept SVG đen, audit sạch (không live text, không raster, không filter), đọc được ở 16px
- [ ] Concept checkpoint: sheet + một dòng ý tưởng mỗi concept + recommendation trình user, chờ duyệt trước khi build kit
- [ ] Kit sau duyệt đủ: symbol, wordmark, lockups, favicon.ico, icon 192/512, masked-icon.svg, og-image 1200×630, twitter-image, logo_text variants, default cover
- [ ] File name khớp reference hiện có trong `index.html`/manifest (`logo_text_white.png`, `logo.svg`, `og-image.png`, `twitter-image.png`…) hoặc cập nhật reference cùng commit
- [ ] `export_variants.py --web-icons` chạy được; hướng dẫn dùng 1 trang (clear space, min size, misuse)
- [ ] Một màu khi in đơn sắc vẫn đọc được (black/white/brand-mono variants)

