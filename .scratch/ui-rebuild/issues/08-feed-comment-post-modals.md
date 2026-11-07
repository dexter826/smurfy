# 08: Feed + comment + post modals

**What to build:** FeedPage, PostModal, PostViewModal, SharePostModal, CommentInput, ReactionSelector/Display/DetailsModal, LinkPreviewCard, SensitiveMediaGuard về design mới. Stagger feed + reduced-motion. Hex `#0a0c10` → token `bg-chat`.

**Blocked by:** 07

**Status:** done

- [x] PostViewModal: hex `#0a0c10` ×2 → token `bg-chat`; cinema media panel tách thành `PostViewCinema.tsx` (499 → 482 dòng, trục 2)
- [x] PostModal: `processFiles` (~75 dòng media validation/slot logic) tách thành `utils/postMedia.ts` thuần hàm (trục 2 + khả năng test); component chỉ còn wrapper set-state
- [x] Feed stagger: PostItem `animate-fade-in-up` + delay 60ms/bài cap 300ms + `motion-reduce:animate-none` (không animate width/height)
- [x] Comment/Reaction/SharePost/LinkPreviewCard: token sạch từ sweep trước; mọi interaction (post, like, comment, share, report) giữ nguyên logic
- [x] `tsc --noEmit` + `vite build` xanh
