# 02: Kit Radix nhóm 1 — controls nền

**What to build:** Cài deps Radix + pattern shadcn (`@radix-ui/react-{slot,tooltip,switch,checkbox,avatar}`, `clsx`, `tailwind-merge`, `class-variance-authority`, helper `cn()`). Viết lại primitives nhóm control trong `src/components/ui/` theo API mới, call-site đổi cùng ticket: Button (4 variant + primary mới `#4C9EEB` chữ tối + edge `#2E7CC4`), IconButton, Input, TextArea, Checkbox, Switch, Badge, Avatar, Tooltip, Loading, Skeleton(+Provider), ProgressBar, CircularProgress, EmptyState. Icon duy nhất lucide-react stroke 2.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Deps cài đúng danh sách trên; `cn()` dùng được; không còn primitive nào set màu hex raw
- [ ] Mỗi control: focus ring 2px `--color-ring` visible, keyboard, touch ≥44×44, dark parity, transition 150–300ms
- [ ] Call-site đổi cùng ticket sang API mới; không giữ API cũ hay adapter
- [ ] `tsc --noEmit` + `vite build` xanh

