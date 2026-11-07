# 01: Foundation — alias @shared + lib/firebase + lib/block

**What to build:** Mở đường cho toàn bộ reorg. Alias `@shared/*` hoạt động ở cả tsconfig lẫn vite resolve để client import seam chia sẻ sạch thay vì leo dốc nhiều cấp. Module init Firebase (config + RTDB refs) về `lib/firebase`. Logic Block dùng chung (block utils + hook Blocked Users — đang được tham chiếu từ 6 chỗ) về `lib/block`. Không đụng tới bất kỳ feature nào.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Alias `@shared/*` resolve được ở tsconfig paths + vite resolve.alias; phía functions không đổi gì
- [x] Client import shared types qua `@shared/*`; không còn import relative leo dốc tới shared (153 file đã chuyển)
- [x] `lib/firebase` và `lib/block` tồn tại; toàn bộ importer cũ đã được cập nhật (grep không còn đường cũ)
- [x] Mọi di chuyển dùng `git mv`; `git log --follow` còn thấy history (config.ts, blockUtils.ts)
- [x] `tsc --noEmit` (client) + `vite build` + `tsc --noEmit` (functions) đều xanh

## Comments

- 2026-11-07: commit `c997ee4` trên `refactor/feature-first-reorg`. Ghi chú thêm ngoài AC: root tsconfig thêm `"exclude": ["functions"]` — trước đó root tsc hút cả functions/ (chưa cài deps) nên luôn đỏ; functions có tsconfig riêng nên exclude là đúng chỗ. Verify thực tế: tsc client exit 0 (0 lỗi src), `vite build` ✓ 18.1s + PWA generateSW, tsc functions exit 0.
