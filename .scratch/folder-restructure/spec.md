# Spec: Reorganize client folder structure — feature-first

Status: ready-for-agent
Date: 2026-11-07
Source: grilling session 2026-11-07 (decision set settled qua 3 rounds AskUserQuestion; codebase map từ Explore agent)

## Problem Statement

Là người maintain smurfy, khi cần sửa một behavior của một domain (chat, call, post...) tôi phải mở code rải across 4–5 thư mục by-type (`components/<domain>`, `hooks/`, `services/`, `store/`) — và ở vài chỗ còn leo dốc import 3–4 cấp (`../../../../shared/types`). Cấu trúc không nói lên product có những gì; đọc GLOSSARY xong không đoán được đường dẫn. Khi giao việc cho AFK agent, agent phải map lại toàn bộ codebase mỗi lần để tìm đúng chỗ.

## Solution

Tổ chức lại toàn bộ client `src/` theo kiến trúc **feature-first (bulletproof-react)**: mỗi domain tự chứa toàn bộ code của nó trong `features/<domain>/` (components + hooks + services + stores), mọi Page về feature sở hữu nó, wiring (providers, router, layout, guards) về `app/`. Import chéo feature chỉ đi qua public API (`index.ts`) của feature; mọi import qua folder dùng alias `@/`; seam `shared/` giữa client và functions được chính thức hóa bằng alias `@shared/*`. Toàn bộ chuyển trong **một PR big-bang bằng `git mv`**, cho phép sửa nhẹ (đường dẫn, tách router), không đổi logic chạy.

## User Stories

1. Là developer, tôi muốn mọi code của một domain nằm trong một folder feature duy nhất, để sửa một behavior chỉ cần mở một nơi thay vì rải across nhiều folder by-type.
2. Là developer, tôi muốn import chéo feature chỉ đi qua public API của feature đó, để internals có thể đổi tự do mà không vỡ code bên ngoài.
3. Là developer, tôi muốn mọi import qua folder dùng alias `@/`, để không còn import leo dốc `../../../../` khó đọc, khó refactor.
4. Là developer, tôi muốn `@shared/*` trỏ tới `shared/` ở repo root, để client và functions dùng chung một nguồn types mà không ai import chéo lệch hướng vào thư mục của ai.
5. Là developer, tôi muốn router, providers, layout và guards nằm gọn ở một chỗ wiring, để hiểu luồng khởi động app trong một lần đọc.
6. Là developer, tôi muốn mỗi Page nằm trong feature sở hữu nó, để thêm một route không phải lùng file ở nhiều layer.
7. Là maintainer, tôi muốn tên feature folder khớp thuật ngữ GLOSSARY (`friend`, `call`, `comment`, `notification`...), để ngôn ngữ domain và tên code map một-một.
8. Là developer, tôi muốn call là feature độc lập, để lifecycle Zego (store, service, hooks riêng) không bị chat "sở hữu" dù chat chỉ là một nơi khởi gọi.
9. Là developer, tôi muốn group nằm trong feature chat, để khái niệm Group Chat (GLOSSARY: Member/Admin) không bị tách khỏi conversation.
10. Là developer, tôi muốn logic Block dùng chung (đang rải ở 6 chỗ) có một thư mục lib riêng, để có một nguồn tham chiếu duy nhất khi debug việc chặn.
11. Là developer, tôi muốn store và hooks chéo feature (toast, theme, loading, audio, userCache...) nằm ở gốc `src`, để không bị nhồi bừa vào một feature cụ thể.
12. Là reviewer, tôi muốn reorg đi trong một PR big-bang mà mọi move dùng `git mv`, để `git log --follow` theo được history từng file và diff có thể review theo move.
13. Là AFK agent, tôi muốn cấu trúc feature-first chuẩn, để khi nhận ticket tôi vào đúng feature folder ngay mà không phải map lại codebase.
14. Là maintainer, tôi muốn verify reorg bằng compiler + build thay vì viết test suite mới chỉ cho việc di chuyển, để chi phí verify bằng chính công cụ có sẵn.
15. Là new contributor, tôi muốn cây thư mục phản chiếu GLOSSARY, để đọc glossary xong là đoán được code nằm đâu.
16. Là developer, tôi muốn nội dung `shared/types` giữ nguyên, để phía functions không phải đụng tới trong reorg này.

## Implementation Decisions

- **Kiến trúc**: feature-first. Mỗi domain có `features/<domain>/` tự chứa components, hooks, services, stores của mình. Thư mục `pages/` tan vào feature sở hữu từng Page. Wiring về `app/`: providers (tách từ root component), router (tách danh sách route khỏi root component), `app/layout/` chứa AppLayout, ProtectedRoute và guard liên quan.
- **Danh sách feature**: auth; chat (chứa luôn group: service, slice, các modal nhóm); call (độc lập — Zego); feed (kèm Share Post flow: modal chia sẻ + store chia sẻ + system post service); comment (độc lập); friend (đổi tên từ contacts); profile; notification (số ít); admin; settings; presence.
- **Code chéo feature**: UI kit dùng chung giữ nguyên vị trí `components/ui`; store chéo (toast, theme, loading, audio, userCache) và hooks chung giữ ở gốc `src`; `lib/firebase` chứa init config và RTDB refs; `lib/block` chứa blockUtils + hook Blocked Users (logic Block đang dùng từ 6 chỗ).
- **Import policy**: alias `@/*` cho mọi import qua thư mục; `./` chỉ trong cùng thư mục; `@shared/*` cho seam chia sẻ; import chéo feature **chỉ** qua public API `index.ts` của feature, cấm với tay vào internals. Alias `@` đã cấu hình sẵn trong tsconfig và vite nhưng chưa từng được dùng — reorg bật nó cho toàn bộ codebase.
- **Seam shared/**: giữ nguyên ở repo root, **không đổi nội dung**; thêm alias để client import sạch. functions/ đứng nguyên hoàn toàn và tiếp tục re-export từ shared như cũ.
- **Naming**: feature folder số ít, theo thuật ngữ GLOSSARY.
- **Migration**: một PR duy nhất; mọi di chuyển file dùng `git mv` để giữ history; cho phép sửa nhẹ đi kèm (cập nhật import path, đổi deep import sang public API, tách router/providers khỏi root component); **không đổi logic chạy**. Verify bằng compiler và build (xem Testing Decisions) trước khi mở PR.
- **Vocabulary áp dụng khi làm**: mỗi feature là một deep module — interface nhỏ (index.ts) đứng trước implementation dày bên trong; khi phân vân một file thuộc feature nào, theo khái niệm GLOSSARY sở hữu nó.

## Testing Decisions

- Test tốt = kiểm chứng hành vi bên ngoài, không test chi tiết implementation. Với một reorg, "hành vi" là: type-check sạch, build thành công, git history còn nguyên — không phải vị trí file nội bộ.
- Bộ verify (seam đã chốt với user): (1) `tsc --noEmit` phía client — mọi import path sai đều đỏ; (2) `vite build` — bundle thật với alias + PWA plugin; (3) `tsc --noEmit` phía functions — kiểm chứng seam shared/ từ phía bên kia; (4) `git log --follow` trên mẫu file đã move — chứng minh history được giữ.
- Prior art: repo **không có test suite nào** (không file test, không config, không script) — đây là lý do bộ verify dựa trên compiler, và là ranh giới out-of-scope (không thêm test trong PR này).

## Out of Scope

- Reorganize `functions/`, các file rules, `public/` — functions đã có shape by-domain đúng cho backend.
- Refactor logic: gộp block logic từ 6 chỗ thành một implementation (reorg chỉ **dời** về lib/block), tách/sửa stores, hạ độ lớn của slice tin nhắn ~1.100 LOC, sửa ProfilePage query Firestore trực tiếp.
- Thêm test suite, lint config, CI.
- Thống nhất dual styling (Tailwind + styled-components).
- 6 câu glossary đang treo ở thread domain-modeling riêng.

## Further Notes

- Review và naming trong suốt PR dùng đúng phân biệt GLOSSARY: Ban vs Block, Member vs Admin, Message vs Comment, Recall vs per-user deletion.
- Mô tả PR cần có: cây thư mục trước/sau, bằng chứng chạy đủ 4 bước verify, và tuyên bố two-way door (revert được bằng revert PR).
- File-by-file mapping chi tiết không nằm ở spec này — nó là việc của tickets (mỗi ticket khai báo phạm vi move + import cần cập nhật của mình).

## Amendment (2026-11-07, sau code-review)

- **Ngoại lệ wiring layer**: `app/router.tsx` + `App.tsx` import trang deep (`@/features/<x>/components/<Page>`) — lớp wiring sở hữu routes; pages là public surface của feature cho routing. Đ широко hoá "chỉ qua index.ts" KHÔNG áp cho lớp app.
- **`components/layout/AuthBrandingPanel`** giữ lại (dùng chéo auth + chat; đưa vào app/ sẽ tạo dependency ngược từ features lên app). "Không còn khu layout cũ" hiểu là: các wiring components đã về app/layout.
- **Alias policy**: áp cho mọi cross-folder import; relative sâu **bên trong** một feature giữ nguyên chủ đích.
