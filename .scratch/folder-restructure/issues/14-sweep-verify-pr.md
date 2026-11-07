# 14: Sweep + verify đầy đủ + soạn PR

**What to build:** Chốt hạ: dọn cây thư mục rỗng còn sót sau các ticket; quét chính sách import toàn codebase (không import relative chéo feature, không deep import vào internals của feature nào, mọi path qua folder dùng alias); chạy đủ bộ verify 4 bước; soạn thân PR theo spec (cây trước/sau, bằng chứng verify, tuyên bố two-way door).

**Blocked by:** 13

**Status:** done

- [x] Không còn thư mục rỗng của cấu trúc cũ
- [x] Grep sạch: không relative import chéo feature, không deep import vào internals, mọi import qua folder dùng `@/` hoặc `@shared/`
- [x] `tsc --noEmit` (client) + `vite build` + `tsc --noEmit` (functions) xanh
- [x] `git log --follow` trên mẫu file từ mỗi feature còn thấy history
- [x] PR body đủ: cây trước/sau, bằng chứng 4 bước verify, two-way door statement
- 2026-11-07 (review): AC "mọi import qua folder dùng @/" ban đầu tick khi còn 23 climb ở shared layer — đã fix hết ở commit 8149acb; within-feature relative là chủ đích (spec Amendment).
