"""Sinh HTML cho 6 màn × 3 hướng. Chạy: python .scratch/nested-canvas/frames/build_frames.py

Không phụ thuộc gì ngoài stdlib + Pillow (chỉ dùng khi ghép contact sheet ở render_frames.py).
"""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from styles import DIRECTIONS, css_for  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
FONT = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" '
    'rel="stylesheet">'
)

FW = {"c": "800"}

ICONS = {
    "chat": '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.2-.6L3 21l1.7-4.6A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z"/>',
    "grid": '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>'
    '<rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    "users": '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2"/>'
    '<path d="M16 5.4a3.2 3.2 0 0 1 0 5.6"/><path d="M18 20c0-2.4-1-4.1-2.6-5"/>',
    "bell": '<path d="M18 8.8a6 6 0 1 0-12 0c0 5-2 6.2-2 6.2h16s-2-1.2-2-6.2Z"/><path d="M10.3 19a2 2 0 0 0 3.4 0"/>',
    "settings": '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M4.5 7.5l2 1.2M17.5 15.3l2 1.2'
    'M4.5 16.5l2-1.2M17.5 8.7l2-1.2"/>',
    "search": '<circle cx="11" cy="11" r="6.4"/><path d="M15.8 15.8 20.5 20.5"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "more": '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
    "send": '<path d="M4.5 12 20 4.5 14.5 20l-3-6-7-2Z"/>',
    "attach": '<path d="M20 11.5 12 19.5a4.6 4.6 0 0 1-6.5-6.5l8.4-8.4a3.1 3.1 0 0 1 4.4 4.4L10 17.4a1.6 1.6 0 0 1-2.2-2.2l7.6-7.6"/>',
    "smile": '<circle cx="12" cy="12" r="8.6"/><path d="M8.6 14.2a4.2 4.2 0 0 0 6.8 0"/><circle cx="9.4" cy="9.6" r=".9"/><circle cx="14.6" cy="9.6" r=".9"/>',
    "info": '<circle cx="12" cy="12" r="8.6"/><path d="M12 11v5.4M12 7.8v.6"/>',
    "image": '<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.4"/><circle cx="8.6" cy="9.6" r="1.5"/>'
    '<path d="m4 17 5-4.6 4 3.4 3.2-2.8L20 17"/>',
    "pin": '<path d="M9 3.6h6l-.8 5 3.4 3.4H6.4L9.8 8.6 9 3.6Z"/><path d="M12 12v8.4"/>',
    "check": '<path d="m4.6 12.4 4.6 4.6 10-10"/>',
    "archive": '<rect x="3.4" y="4.4" width="17.2" height="4.2" rx="1.4"/><path d="M5 8.6V19a.9.9 0 0 0 .9.9h12.2a.9.9 0 0 0 .9-.9V8.6"/><path d="M9.8 13h4.4"/>',
    "chevron": '<path d="m14.5 5.5-6 6.5 6 6.5"/>',
    "moon": '<path d="M20 14.4A8.6 8.6 0 0 1 9.6 4a8.6 8.6 0 1 0 10.4 10.4Z"/>',
    "logout": '<path d="M14.5 4.5H6.4a1.9 1.9 0 0 0-1.9 1.9v11.2a1.9 1.9 0 0 0 1.9 1.9h8.1"/>'
    '<path d="M17.5 12H9.4M17.5 12l-3.4-3.4M17.5 12l-3.4 3.4"/>',
    "user": '<circle cx="12" cy="8.4" r="3.6"/><path d="M4.6 20.4c0-3.6 3.3-6 7.4-6s7.4 2.4 7.4 6"/>',
    "calendar": '<rect x="3.6" y="5.4" width="16.8" height="15" rx="2.2"/><path d="M3.6 10h16.8M8.4 3v4M15.6 3v4"/>',
    "globe": '<circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8"/><path d="M12 3.6c2.4 2.6 2.4 14.2 0 16.8-2.4-2.6-2.4-14.2 0-16.8Z"/>',
    "lock": '<rect x="4.6" y="10.4" width="14.8" height="10" rx="2.2"/><path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4"/>',
    "mail": '<rect x="3.4" y="5.4" width="17.2" height="13.2" rx="2.4"/><path d="m4.4 7.4 7.6 5.6 7.6-5.6"/>',
    "clock": '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.2 2"/>',
    "heart": '<path d="M12 20s-7.6-4.4-7.6-9.4A4.3 4.3 0 0 1 12 8.2a4.3 4.3 0 0 1 7.6 2.4C19.6 15.6 12 20 12 20Z"/>',
}


def icon(name: str, size: int = 20, cls: str = "", sw: float = 1.7) -> str:
    return (
        f'<svg class="{cls}" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" '
        f'stroke="currentColor" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" '
        f'aria-hidden="true">{ICONS[name]}</svg>'
    )


AV = ["#6E8CAE", "#7C8FA6", "#8A94A6", "#6F8299", "#8C97A8", "#75869B", "#68798F"]


def av(i: int, initials: str, size: str = "", online: bool = False) -> str:
    cls = f"av {size}".strip()
    dot = '<span class="dot"></span>' if online else ""
    return f'<div class="{cls}" style="--av:{AV[i % len(AV)]}">{initials}{dot}</div>'


def rail(active: str, badges: dict | None = None) -> str:
    badges = badges or {}
    items = [
        ("chat", "chat"),
        ("grid", "grid"),
        ("users", "users"),
        ("bell", "bell"),
    ]
    out = ['<div class="rail">', '<div class="rail-logo">S</div>']
    for ic, key in items:
        on = " on" if key == active else ""
        b = badges.get(key)
        badge = f'<span class="rail-badge">{b}</span>' if b else ""
        out.append(f'<div class="rail-btn{on}">{icon(ic, 21)}{badge}</div>')
    out += [
        '<div class="rail-spacer"></div>',
        f'<div class="rail-btn">{icon("settings", 21)}</div>',
        '<div class="rail-av">MA</div>',
        "</div>",
    ]
    return "".join(out)


def page(body: str, direction: str, width: int = 1440, height: int = 900, dark: bool = False) -> str:
    cls = "screen dark" if dark else "screen"
    return (
        "<!doctype html><html lang='vi'><head><meta charset='utf-8'>"
        f"{FONT}<style>html,body{{overflow:hidden;margin:0}}"
        f".screen{{--fw-display:{FW[direction]}}}"
        f"{css_for(direction)}</style></head>"
        f"<body><div class='{cls}' style='width:{width}px;height:{height}px'>{body}</div></body></html>"
    )


# ─────────────────────────────────────────────────────────────── chat
CONVS = [
    ("MA", "Minh Anh", "Mai họp nhóm lúc 8h ở thư viện nhé.", "2 phút", 2, True, True),
    ("DA", "Nhóm Đồ án CNTT", "Đức Huy: Mình gửi lại file báo cáo.", "18 phút", 5, False, True),
    ("TL", "Trúc Ly", "Bạn xem giúp mình phần mở đầu được không?", "1 giờ", 0, True, False),
    ("HB", "Hội bạn cấp 3", "Ảnh: 4", "3 giờ", 0, False, False),
    ("DH", "Đức Huy", "Cảm ơn bạn, mình xem ngay.", "Hôm qua", 0, False, False),
    ("KT", "Lớp KTPM K18", "Thông báo lịch thi giữa kỳ đã cập nhật.", "Hôm qua", 0, False, False),
    ("NM", "Ngọc Mai", "Mình gửi lại ảnh hôm đi Cần Giờ.", "T2", 0, False, False),
    ("QB", "Quốc Bảo", "Ok bạn, hẹn gặp cuối tuần.", "T2", 0, False, False),
]


def screen_chat(direction: str) -> str:
    convs = []
    for i, (ini, name, prev, t, unread, online, pinned) in enumerate(CONVS):
        on = " on" if i == 0 else ""
        badge = f'<span class="badge">{unread}</span>' if unread else ""
        online_mark = ""
        convs.append(
            f'<div class="conv{on}">'
            f'{av(i, ini, online=online)}'
            '<div class="conv-body">'
            f'<div class="conv-top"><span class="conv-name">{name}</span>'
            f'<span class="conv-time">{t}</span></div>'
            f'<div class="conv-prev">{prev}</div>'
            "</div>"
            f'<div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex:0 0 auto">'
            f"{badge}{online_mark}</div>"
            "</div>"
        )
    panel = (
        '<div class="panel">'
        '<div class="panel-head"><div class="panel-title">Tin nhắn</div>'
        f'<div style="display:flex;gap:2px">{icon("search", 19)}'
        f'<span class="icon-btn accent">{icon("plus", 18)}</span></div></div>'
        f'<div class="search">{icon("search", 16)}<span>Tìm người hoặc hội thoại</span></div>'
        '<div class="seg"><span class="on">Tất cả<span class="cnt">8</span></span>'
        '<span>Bạn bè</span><span>Người lạ<span class="cnt">3</span></span></div>'
        '<div class="section-label">Đã ghim</div>'
        + "".join(convs[:2])
        + '<div class="section-label">Gần đây</div>'
        + "".join(convs[2:])
        + "</div>"
    )

    thread = (
        '<div class="main">'
        '<div class="thread-head">'
        f'{av(4, "DA", "md")}'
        '<div><div class="thread-name">Nhóm Đồ án CNTT</div>'
        '<div class="thread-sub">5 thành viên · 3 đang hoạt động</div></div>'
        f'<div class="thread-actions">{icon("search", 19)}{icon("pin", 19)}{icon("info", 19)}</div>'
        "</div>"
        '<div class="msgs">'
        '<div class="date-chip">Hôm nay, 13 tháng 11</div>'
        f'<div class="msg">{av(2, "TL", "sm")}<div class="msg-col"><div class="bubble">'
        '<div class="sender">Trúc Ly</div>Mai họp nhóm lúc 8h ở thư viện nhé.</div></div></div>'
        f'<div class="msg">{av(5, "DH", "sm")}<div class="msg-col"><div class="bubble">'
        '<div class="sender">Đức Huy</div>Mình gửi lại file báo cáo, mọi người xem phần 3 giúp mình với.'
        '<span class="time">08:12</span></div></div></div>'
        '<div class="msg me"><div class="msg-col"><div class="bubble">Đã nhận, để mình sửa lại phần biểu đồ.'
        '<span class="time">08:14</span></div></div></div>'
        '<div class="msg me"><div class="msg-col"><div class="bubble">'
        '<span class="quote">Mình gửi lại file báo cáo, mọi người xem phần 3</span>'
        'Phần 3 mình đang viết lại mục 3.2, chiều nay sẽ xong.<span class="time">08:15</span></div></div></div>'
        f'<div class="msg">{av(2, "TL", "sm")}<div class="msg-col"><div class="bubble">'
        'Vậy 8h30 mình bắt đầu, đúng chứ?</div></div></div>'
        f'<div class="msg">{av(5, "DH", "sm")}<div class="msg-col"><div class="bubble">'
        'Đúng rồi. Mình đặt phòng B2-305 từ 8h15.<span class="time">08:18</span></div></div></div>'
        '<div class="msg me"><div class="msg-col"><div class="bubble">'
        'Ok, mình tới sớm 10 phút để mở máy chiếu.<span class="time">08:19</span></div></div></div>'
        f'<div class="msg">{av(1, "NA", "sm")}<div class="msg-col"><div class="bubble">'
        '<div class="sender">Ngọc Anh</div>Mình mang theo bản in chương 3 cho cả nhóm nhé.'
        '<span class="time">08:21</span></div></div></div>'
        '<div class="msg me"><div class="msg-col"><div class="bubble">Cảm ơn Ngọc Anh! '
        'Mọi người nhớ đọc lại mục 3.1 trước khi họp.<span class="time">08:22</span></div></div></div>'
        '<div class="msg cont"><div class="typing"><i></i><i></i><i></i></div></div>'
        "</div>"
        '<div class="composer">'
        '<div class="reply-bar"><span><b>Trả lời Trúc Ly</b> · Vậy 8h30 mình bắt đầu, đúng chứ?</span></div>'
        '<div class="composer-row">'
        f'<span class="icon-btn">{icon("plus", 19)}</span>'
        f'<span class="icon-btn">{icon("image", 19)}</span>'
        f'<div class="composer-input">Viết tin nhắn cho nhóm…</div>'
        f'<span class="icon-btn">{icon("smile", 19)}</span>'
        f'<span class="send-btn">{icon("send", 18)}</span>'
        "</div></div></div>"
    )

    members = [
        ("NA", "Ngọc Anh", "Quản trị"),
        ("TL", "Trúc Ly", "Thành viên"),
        ("DH", "Đức Huy", "Thành viên"),
    ]
    member_html = "".join(
        f'<div class="member">{av(i + 3, ini)}<span class="name">{name}</span>'
        f'<span class="role">{role}</span></div>'
        for i, (ini, name, role) in enumerate(members)
    )
    aux = (
        '<div class="aux">'
        '<div class="aux-head"><span class="aux-title">Chi tiết</span>'
        f'<span class="icon-btn">{icon("more", 18)}</span></div>'
        '<div class="tabs">'
        f'<span class="tab on">{icon("info", 17)}Thông tin</span>'
        f'<span class="tab">{icon("users", 17)}Thành viên</span>'
        f'<span class="tab">{icon("image", 17)}Media</span>'
        f'<span class="tab">{icon("search", 17)}Tìm</span>'
        "</div>"
        '<div class="aux-body">'
        '<div class="group-card">'
        f'{av(4, "DA", "md")}'
        '<div class="group-name">Nhóm Đồ án CNTT</div>'
        '<div class="group-sub">5 thành viên · Tạo 12/09/2026</div>'
        '<div class="quick">'
        f'<div>{icon("search", 17)}Tìm tin</div>'
        f'<div>{icon("image", 17)}Ảnh</div>'
        f'<div>{icon("bell", 17)}Tắt tiếng</div>'
        "</div></div>"
        '<div><div class="mini-label">Thành viên<span>4</span></div>'
        + member_html
        + "</div>"
        '<div><div class="mini-label">Media gần đây<span>Xem tất cả</span></div>'
        '<div class="media-strip" style="margin-top:8px">'
        + "".join(f'<div class="media sq">{icon("image", 16)}</div>' for _ in range(6))
        + "</div></div>"
        '<div style="margin-top:auto">'
        f'<div class="action-row">{icon("pin", 17)}Ghim hội thoại<span class="right">{icon("chevron", 15)}</span></div>'
        f'<div class="action-row">{icon("archive", 17)}Lưu trữ<span class="right">{icon("chevron", 15)}</span></div>'
        f'<div class="action-row danger">{icon("logout", 17)}Rời nhóm</div>'
        "</div></div></div>"
    )

    body = (
        f'<div class="app">{rail("chat", {"chat": 7, "bell": 3})}{panel}{thread}{aux}</div>'
    )
    return page(body, direction)


# ─────────────────────────────────────────────────────────────── feed
def post(direction: str, i: int, ini: str, name: str, meta: str, text: str, media: int = 0) -> str:
    media_html = ""
    if media == 2:
        media_html = (
            '<div class="media-2">'
            f'<div class="media">{icon("image", 26)}</div>'
            f'<div class="media">{icon("image", 26)}</div>'
            "</div>"
        )
    elif media == 1:
        media_html = (
            f'<div style="padding:0 14px 12px"><div class="media" style="aspect-ratio:16/9">'
            f'{icon("image", 30)}</div></div>'
        )
    return (
        '<div class="card">'
        f'<div class="post-head">{av(i, ini, "md")}'
        f'<div style="flex:1"><div class="post-name">{name}</div>'
        f'<div class="post-meta">{meta}</div></div>'
        f'<span class="icon-btn">{icon("more", 18)}</span></div>'
        f'<div class="post-text">{text}</div>'
        f"{media_html}"
        '<div class="post-reacts"><span class="rc">+</span><span class="rc alt">♥</span>'
        "<span style='margin-left:4px'>Minh Anh và 12 người khác</span>"
        "<span style='margin-left:auto'>4 bình luận</span></div>"
        '<div class="post-actions">'
        f'<span class="post-action">{icon("heart", 17)}Thích</span>'
        f'<span class="post-action">{icon("chat", 17)}Bình luận</span>'
        f'<span class="post-action">{icon("send", 17)}Chia sẻ</span>'
        "</div></div>"
    )


def screen_feed(direction: str) -> str:
    suggestions = [
        ("HB", "Hồng Bích", "6 bạn chung"),
        ("TN", "Tiến Nam", "3 bạn chung"),
        ("LP", "Lan Phương", "Bạn của Trúc Ly"),
    ]
    sug = "".join(
        f'<div class="mini-row">{av(i + 2, ini, "sm")}'
        f'<div style="flex:1;min-width:0"><div class="name">{name}</div><div class="meta">{meta}</div></div>'
        f'<span class="btn sm">Kết bạn</span></div>'
        for i, (ini, name, meta) in enumerate(suggestions)
    )
    birthdays = (
        '<div class="card"><div class="card-head">Sinh nhật hôm nay<span class="count">2</span></div>'
        '<div class="mini-row" style="padding-top:12px">' + av(1, "NA", "sm") +
        '<div style="flex:1"><div class="name">Ngọc Anh</div><div class="meta">Hôm nay</div></div>'
        '<span class="btn sm primary">Gửi lời chúc</span></div>'
        '<div class="mini-row" style="padding-bottom:12px">' + av(4, "QB", "sm") +
        '<div style="flex:1"><div class="name">Quốc Bảo</div><div class="meta">Hôm nay</div></div>'
        '<span class="pill">Đã chúc</span></div></div>'
    )
    right = (
        '<div class="rail-right">'
        + '<div class="card"><div class="card-head">Gợi ý kết bạn</div>' + sug + "</div>"
        + birthdays
        + '<div class="card" style="padding:14px"><div class="mini-label" style="margin-bottom:8px">Hoạt động của bạn</div>'
        '<div class="kv">Bài viết tuần này<b>3</b></div>'
        '<div class="kv">Bình luận<b>12</b></div>'
        '<div class="kv">Lời mời đã gửi<b>2</b></div></div>'
        "</div>"
    )
    feed = (
        '<div class="feed-wrap">'
        '<div class="feed-col">'
        '<div class="page-title">Nhật ký</div>'
        '<div class="card composer-card">'
        + av(6, "MA", "sm")
        + '<div class="composer-fake">Bạn đang nghĩ gì?</div>'
        + f'<span class="icon-btn">{icon("image", 19)}</span>'
        + '<span class="btn primary sm">Đăng</span>'
        "</div>"
        + post(
            direction,
            2,
            "TL",
            "Trúc Ly",
            "2 giờ trước · Công khai",
            "Vừa hoàn thành xong chương 3 của báo cáo. Cuối tuần này nhóm mình họp để rà lại toàn bộ nhé.",
            2,
        )
        + post(
            direction,
            4,
            "DH",
            "Đức Huy",
            "4 giờ trước · Bạn bè",
            "Ảnh chụp buổi họp nhóm sáng nay. Cảm ơn mọi người đã đến đúng giờ.",
            1,
        )
        + "</div>"
        + right
        + "</div>"
    )
    return page(f'<div class="app">{rail("grid", {"chat": 7, "bell": 3})}{feed}</div>', direction)


# ─────────────────────────────────────────────────────────────── profile
def screen_profile(direction: str) -> str:
    info = [
        ("calendar", "Sinh ngày 14/03/2004", ""),
        ("user", "Giới tính", "Nam"),
        ("globe", "Đến từ", "TP. Hồ Chí Minh"),
        ("mail", "Email", "minhanh@smurfy.vn"),
        ("clock", "Tham gia", "Tháng 9, 2026"),
    ]
    info_html = "".join(
        f'<div class="info-row">{icon(ic, 17)}<span>{label}{(" · <b>" + val + "</b>") if val else ""}</span></div>'
        for ic, label, val in info
    )
    about = (
        '<div class="card" style="padding:16px">'
        '<div class="mini-label" style="margin-bottom:8px">Giới thiệu</div>'
        '<div class="post-text" style="padding:0 0 10px;font-size:13px;line-height:1.6">'
        "Sinh viên KTPM, thích chụp ảnh và làm đồ án nhóm. Đang tìm người cùng học Firebase.</div>"
        + info_html
        + "</div>"
        '<div class="card" style="padding:16px"><div class="mini-label" style="margin-bottom:10px">'
        'Ảnh gần đây<span>Xem tất cả</span></div>'
        '<div class="media-strip">'
        + "".join(f'<div class="media sq">{icon("image", 18)}</div>' for _ in range(6))
        + "</div></div>"
    )
    body = (
        '<div class="profile-wrap">'
        '<div class="cover"><div class="cover-tag">'
        + icon("image", 15)
        + "Ảnh bìa</div></div>"
        '<div class="profile-head">'
        '<div class="profile-id">'
        f'<div class="profile-av">{av(6, "MA", "xl")}</div>'
        '<div class="profile-names"><div class="profile-name">Minh Anh</div>'
        '<div class="profile-sub"><span>@minhanh</span><span>·</span><span>128 bạn bè</span>'
        '<span>·</span><span class="pill accent">Đang hoạt động</span></div></div>'
        '<div class="profile-actions">'
        '<span class="btn">Chỉnh sửa hồ sơ</span>'
        '<span class="btn primary">' + icon("chat", 16) + "Nhắn tin</span>"
        f'<span class="btn ghost">{icon("more", 18)}</span>'
        "</div></div>"
        '<div class="profile-tabs"><span class="ptab on">Bài viết</span>'
        '<span class="ptab">Ảnh</span><span class="ptab">Bạn bè</span></div>'
        "</div>"
        '<div class="profile-body">'
        f'<div class="about-col">{about}</div>'
        '<div class="posts-col">'
        + post(
            direction,
            6,
            "MA",
            "Minh Anh",
            "Hôm qua · Công khai",
            "Cuối tuần rảnh, mình định đi chụp ảnh ở Thảo Cầm Viên. Ai đi cùng không?",
            2,
        )
        + "</div></div></div>"
    )
    return page(f'<div class="app">{rail("users", {"chat": 7, "bell": 3})}{body}</div>', direction)


# ─────────────────────────────────────────────────────────────── activity
def screen_activity(direction: str) -> str:
    items = [
        (1, "NA", "<b>Ngọc Anh</b> đã gửi lời mời kết bạn.", "5 phút trước", "request", True),
        (2, "TL", "<b>Trúc Ly</b> đã bình luận về bài viết của bạn: “Mình xem rồi, ổn đó.”",
         "20 phút trước", "comment", True),
        (4, "DH", "<b>Đức Huy</b> đã thích bài viết của bạn.", "1 giờ trước", "like", True),
        (5, "HB", "<b>Hồng Bích</b> đã chấp nhận lời mời kết bạn của bạn.", "3 giờ trước", "accept", False),
        (2, "KT", "<b>Lớp KTPM K18</b> có 3 tin nhắn mới trong nhóm.", "Hôm qua", "message", False),
        (3, "QB", "<b>Quốc Bảo</b> đã nhắc đến bạn trong một bình luận.", "Hôm qua", "mention", False),
    ]
    rows = []
    for i, ini, text, t, kind, unread in items:
        actions = ""
        if kind == "request":
            actions = (
                '<div class="act-actions"><span class="btn sm primary">Chấp nhận</span>'
                '<span class="btn sm">Từ chối</span></div>'
            )
        dot = '<span class="unread-dot"></span>' if unread else '<span style="width:7px;flex:0 0 auto"></span>'
        rows.append(
            f'<div class="act-row">{av(i, ini, "sm")}<div class="act-text">{text}'
            f'<div class="act-time">{t}</div>{actions}</div>{dot}</div>'
        )
    body = (
        '<div class="center-col"><div class="center-inner">'
        '<div style="display:flex;align-items:center;justify-content:space-between">'
        '<div class="page-title">Hoạt động</div>'
        '<span class="btn ghost">Đọc tất cả</span></div>'
        '<div class="seg" style="margin:0"><span class="on">Tất cả<span class="cnt">9</span></span>'
        '<span>Lời mời kết bạn<span class="cnt">2</span></span></div>'
        '<div class="card">' + "".join(rows) + "</div>"
        '<div class="c-empty">Bạn đã xem hết hoạt động trong 7 ngày gần đây.</div>'
        "</div></div>"
    )
    return page(f'<div class="app">{rail("bell", {"chat": 7, "bell": 9})}{body}</div>', direction)


# ─────────────────────────────────────────────────────────────── contacts
def screen_contacts(direction: str) -> str:
    groups = [
        ("A", [("NA", "Ngọc Anh", "Hoạt động 2 phút trước"), ("AM", "An Minh", "Hoạt động hôm qua")]),
        ("Đ", [("ĐH", "Đức Huy", "Hoạt động 1 giờ trước"), ("ĐL", "Đức Long", "Hoạt động T2")]),
    ]
    list_html = ""
    for letter, people in groups:
        list_html += f'<div class="letter">{letter}</div>'
        for ini, name, meta in people:
            list_html += (
                f'<div class="person-row">{av(len(name), ini)}'
                f'<div style="flex:1;min-width:0"><div class="person-name">{name}</div>'
                f'<div class="person-meta">{meta}</div></div>'
                f'<span class="icon-btn">{icon("chat", 18)}</span>'
                f'<span class="icon-btn">{icon("more", 18)}</span></div>'
            )
    detail = (
        '<div class="detail-panel">'
        '<div class="detail-center">'
        f'{av(3, "ĐH", "xl")}'
        '<div class="detail-name">Đức Huy</div>'
        '<div class="detail-meta">Bạn bè · 12 bạn chung</div>'
        '<div style="display:flex;gap:8px;margin-top:10px">'
        '<span class="btn primary">' + icon("chat", 16) + "Nhắn tin</span>"
        '<span class="btn">Xem hồ sơ</span></div></div>'
        '<div><div class="mini-label" style="margin-bottom:6px">Thông tin</div>'
        '<div class="kv">Trường<b>ĐH CNTT</b></div>'
        '<div class="kv">Khoa<b>KTPM</b></div>'
        '<div class="kv">Kết bạn từ<b>09/2026</b></div></div>'
        '<div style="margin-top:auto;border-top:1px solid var(--line-soft);padding-top:8px">'
        f'<div class="action-row" style="border:0">{icon("pin", 17)}Ghim<span class="right">{icon("chevron", 15)}</span></div>'
        f'<div class="action-row" style="border:0;color:#C0342B">{icon("logout", 17)}Hủy kết bạn</div>'
        "</div></div>"
    )
    body = (
        '<div class="center-col" style="padding:20px 24px 20px 24px">'
        '<div class="center-inner" style="max-width:none">'
        '<div style="display:flex;align-items:center;gap:12px">'
        '<div class="page-title" style="flex:1">Bạn bè</div>'
        '<span class="btn">' + icon("user", 16) + "Lời mời<span class='badge' style='margin-left:6px'>2</span></span>"
        '<span class="btn primary">' + icon("plus", 16) + "Thêm bạn</span></div>"
        '<div class="seg" style="margin:0"><span class="on">Tất cả<span class="cnt">128</span></span>'
        '<span>Gợi ý<span class="cnt">12</span></span><span>Đã gửi<span class="cnt">4</span></span></div>'
        '<div class="search" style="margin:0;height:38px">' + icon("search", 16)
        + "<span>Tìm bạn bè theo tên</span></div>"
        '<div class="card">' + list_html + "</div>"
        "</div></div>" + detail
    )
    return page(f'<div class="app">{rail("users", {"chat": 7, "bell": 3})}{body}</div>', direction)


# ─────────────────────────────────────────────────────────────── auth
def screen_auth(direction: str) -> str:
    body = (
        '<div class="auth">'
        '<div class="auth-brand">'
        '<div class="auth-logo"><div class="tile">S</div><div class="wordmark">Smurfy</div></div>'
        "<div>"
        '<div class="auth-head">Nơi bạn bè<br>luôn ở gần.</div>'
        '<div class="auth-sub">Nhắn tin tức thời, chia sẻ khoảnh khắc và giữ liên lạc với những người quan trọng.</div>'
        "</div>"
        '<div class="auth-marks"><span>Tin nhắn thời gian thực</span><span>Nhóm không giới hạn</span>'
        "<span>Miễn phí</span></div>"
        '<div class="auth-rings"></div>'
        "</div>"
        '<div class="auth-form">'
        '<div class="form-card">'
        '<div class="auth-tabs"><span class="on">Đăng nhập</span><span>Đăng ký</span></div>'
        '<div class="form-title">Chào mừng trở lại</div>'
        '<div class="form-sub">Đăng nhập để tiếp tục với Smurfy.</div>'
        '<div class="field"><span class="label">Địa chỉ email</span>'
        f'<div class="input focus">{icon("mail", 17)}<span>minhanh@smurfy.vn</span></div></div>'
        '<div class="field"><span class="label">Mật khẩu</span>'
        f'<div class="input">{icon("lock", 17)}<span>••••••••••</span>'
        '<span style="margin-left:auto;color:var(--ink3)">'
        + icon("info", 16)
        + "</span></div>"
        '<span class="hint">Mật khẩu cần tối thiểu 8 ký tự, bao gồm chữ và số.</span></div>'
        '<div class="row-between"><span class="check"><span class="box on">'
        + icon("check", 11)
        + "</span>Ghi nhớ đăng nhập</span>"
        '<span class="link">Quên mật khẩu?</span></div>'
        '<span class="btn primary" style="height:44px;font-size:13.5px">Đăng nhập</span>'
        '<div class="divider">hoặc</div>'
        '<span class="btn" style="height:44px">Tiếp tục với Google</span>'
        '<div class="form-foot">Chưa có tài khoản? <span class="link">Tạo tài khoản</span></div>'
        "</div></div></div>"
    )
    return page(body, direction)


SCREENS = {
    "chat": screen_chat,
    "feed": screen_feed,
    "profile": screen_profile,
    "activity": screen_activity,
    "contacts": screen_contacts,
    "auth": screen_auth,
}


def build() -> list[str]:
    os.makedirs(OUT, exist_ok=True)
    written = []
    for d in DIRECTIONS:
        for name, fn in SCREENS.items():
            path = os.path.join(OUT, f"{d}-{name}.html")
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(fn(d))
            written.append(path)
    return written


if __name__ == "__main__":
    for p in build():
        print(p)
