# 10: Admin suite — dashboard, reports, users, moderation

**What to build:** AdminDashboardPage, AdminReportsPage, AdminUsersPage, AdminModerationPage + ModerationView (712 — file lớn nhất) + ReportDetailModal (568) về design mới: cùng ngôn ngữ kit, density chuẩn dashboard, bảng dữ liệu KHÔNG dùng `back.out` stagger (anti-pattern MASTER.md). Giữ `requireAdmin` + subscriptions.

**Blocked by:** 09

**Status:** ready-for-agent

- [ ] 4 page + 2 modal lớn mới; bảng/moderation dùng token, contrast 4.5:1
- [ ] `requireAdmin` + mọi subscription admin hoạt động như trước
- [ ] 7 trục: ModerationView 712 + ReportDetailModal 568 tách theo trách nhiệm rõ ràng
- [ ] `tsc --noEmit` + `vite build` xanh

