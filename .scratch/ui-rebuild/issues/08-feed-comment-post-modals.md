# 08: Feed + comment + post modals

**What to build:** FeedPage, PostModal, PostViewModal (499, có hex `#0a0c10` → token), SharePostModal, CommentInput, ReactionSelector/Display/DetailsModal, LinkPreviewCard, SensitiveMediaGuard về design mới. Stagger list 300–450ms cho feed grid (`back.out(1.4)`, `prefers-reduced-motion` tắt). Inline `style={{zIndex: 'var(--z-*)'}}` trong các file này giữ nguyên cơ chế.

**Blocked by:** 07

**Status:** ready-for-agent

- [ ] Feed render + interaction (post, like, comment, share, report) đúng như trước
- [ ] Stagger có reduced-motion fallback; không animate width/height
- [ ] Không còn hex raw trong surface feed/comment/post
- [ ] 7 trục: PostViewModal 499 + PostModal 442 tách (viewer / composer / share parts)
- [ ] `tsc --noEmit` + `vite build` xanh

