# Spec: UI Rebuild — đập toàn bộ giao diện Smurfy

**Status:** ready-for-agent

## Bối cảnh

UI hiện tại là Facebook clone (primary `#0068FF`, chrome xanh đặc, gradient blue), 33 primitives hand-rolled a11y yếu (~30 aria attr toàn repo), Tailwind 3.4, shell mobile-first thiếu tận dụng desktop. Mục tiêu: đập toàn bộ IA + shell + components + style, giữ nguyên logic layer.

## Quyết định đã khóa

1. **Phạm vi**: đập cả IA + shell + components + style. Giữ logic layer, routes, deep links (`?conv=`, `?post=`, `?joinToken=`, `/join/:token`), guards, PWA.
2. **Visual**: Blue Smurf hiện đại — primary cornflower `#4C9EEB` + chữ tối trên primary. Anti-Facebook-clone, anti-template pass theo skill `frontend-design`.
3. **Shell mới**: desktop = sidebar trái + content + panel phải (tuỳ trang); mobile = bottom nav ≤5 tab. Admin giữ layout riêng.
4. **Kit**: Radix UI headless + pattern shadcn (thêm deps radix + `clsx` + `tailwind-merge` + `class-variance-authority`).
5. **Tailwind v4**: `@theme` CSS-first, `@custom-variant dark`, token theo DESIGN.md §2.
6. **Font**: Nunito (heading 700/800/900) + Nunito Sans (body) — cả hai hỗ trợ đầy đủ tiếng Việt (verify METADATA.pb; DM Sans bị loại vì thiếu subset).
7. **Theme**: theo `prefers-color-scheme` lần đầu; user đổi thì lưu `themeStore` (key `smurf_social_theme` — FOUC script phụ thuộc).
8. **Dials**: variance 5, motion 6, density 5.
9. **Admin**: trong phạm vi, dựng sau user-facing.
10. **Copy**: tiếng Việt theo `COPY.md`.
11. **Kèm theo**: bỏ disable-zoom, dọn 2 nguồn manifest PWA + theme-color lệch, xoá dead deps (`styled-components`, `dexie`), splash giữ nhưng redesign.
12. **Logo & social assets**: bộ nhận diện mới (logo symbol + wordmark, favicon, PWA icons, og-image, twitter-image, default cover) thiết kế theo skill `logo-design`, có checkpoint duyệt concept bắt buộc trước khi build kit (ticket 04).
13. **Không legacy/backward**: không giữ API cũ, không adapter, không tên gọi cũ. Kit mới + tên token semantic mới áp dụng trực tiếp; call-site đổi trong cùng ticket.
14. **Verify tĩnh**: chỉ `tsc --noEmit` + `vite build`; không chạy browser test trong quy trình agent, kiểm tra trực quan do user thực hiện.
15. **Văn bản chuẩn hóa**: không comment trong code; tài liệu/ticket chỉ nội dung chuẩn hóa, không ghi chú cá nhân hay hành trình cập nhật.
16. **Commit theo đợt triển khai**, luôn xin xác nhận trước khi commit (kể cả tài liệu). Cài Prettier cho repo.

## Chuẩn áp dụng

- `DESIGN.md` (gốc) — hợp đồng kiểu dáng; mâu thuẫn thì DESIGN.md thắng.
- `design-system/smurfy/MASTER.md` — token chi tiết, spacing, motion, anti-patterns.
- `COPY.md` — mọi câu chữ.
- Skill `code-refactor` — 7 trục (naming, kích thước & trách nhiệm, DRY có chừng mực, xử lý lỗi, cấu trúc & phụ thuộc, bảo mật & dữ liệu cá nhân, khả năng test) làm chuẩn độ sâu khi dựng lại từng vùng UI (xem section Strategy).

## Strategy: rebuild thẳng, không compat + refactor sâu theo 7 trục

Kit mới và tên token semantic mới áp dụng trực tiếp lên call-site trong cùng ticket — không giai đoạn chuyển tiếp, không lớp adapter. Sweep đổi tên utility cũ (`bg-bg-*` → `bg-surface`/`bg-background`, `text-text-*` → `text-foreground`/`text-secondary`/`text-muted`, `border-border-*` → `border-border`/`border-border-default`/`border-border-strong`, `error` → `danger`, `*-light` → `*-soft`, `divider`/`status-*` → token semantic) chạy ở ticket 01 trên toàn repo.

### Refactor sâu theo 7 trục

Rebuild không dừng ở chuẩn hóa token. Mỗi ticket khi dựng lại vùng UI của mình chạy đồng thời pass 7 trục theo skill `code-refactor`, được phép **tách file, gộp file, di chuyển, rename** (cập nhật toàn bộ import kèm theo):

- **Trục 2 (kích thước & trách nhiệm) là mục tiêu chính** — tách theo ranh giới trách nhiệm: AppLayout 541 dòng (ticket 05), LoginPage 398 (06), ChatPage 410 + MessageBubble 433 (07), PostViewModal 499 + PostModal 442 (08), ContactsPage 407 (09), ModerationView 712 + ReportDetailModal 568 (10). Dấu hiệu tách: hàm/component >~300 dòng, comment chia đoạn bên trong, props boolean điều khiển hai nhánh hành vi.
- **Trục 1 (naming), trục 4 (lỗi bị nuốt), trục 5 (logic nghiệp vụ lẫn tầng UI)** — sửa tại chỗ trong cùng ticket.
- **Trục 3 (DRY có chừng mực)** — gom khi lặp ≥3 lần hoặc logic nghiệp vụ dễ đổi đồng thời; không trừu tượng hóa sớm cho code dùng một chỗ.
- **Giữ nguyên hành vi là điều kiện bắt buộc.** Bug phát hiện khi refactor tách riêng báo cáo trong ticket, không sửa lẫn vào diff cấu trúc.
- **Phạm vi 7 trục = lớp UI** (components, hooks, pages, feature UI code). Logic layer (stores, services, Firebase/RTDB subscriptions) giữ nguyên theo quyết định số 1; phát hiện vấn đề trục 5/7 ở logic layer thì ghi follow-up ticket trình user, không sửa lẫn vào.

## Phạm vi out

- Không đổi logic: stores, Firebase/RTDB subscriptions, call manager, sound manager, upload pipeline.
- Không thêm test suite (giữ hiện trạng repo); verify tĩnh theo protocol dưới.
- Không đổi routes/path.

## Verify protocol chung (mọi ticket)

1. `tsc --noEmit` xanh.
2. `vite build` xanh (PWA generate).
3. Chỉ kiểm tra tĩnh; kiểm tra trực quan do user thực hiện khi chạy app.
4. Contrast theo DESIGN.md §2 (text 4.5:1, non-text 3:1) — kiểm chứng bằng tính toán khi thêm/sửa token.
5. Commit theo đợt, xin xác nhận user trước mỗi commit.

## Rủi ro

- Tailwind v4 đổi build pipeline (PostCSS → `@tailwindcss/vite`): ticket 01 phải giữ `vite build` xanh trước khi làm gì khác.
- Radix Dialog vs Modal portal hiện có: focus-trap/scroll-lock khác nhau — kiểm kỹ chat input, media viewer.
- `manualChunks` trong `vite.config.ts` hardcode `/src/services/`, `/src/store/` — không đụng nên giữ nguyên.
- Sweep rename ~2.100 class usages: chạy bằng script với mapping cố định, kiểm đếm trước/sau bằng grep.
