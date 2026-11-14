"""Sinh HTML frame mobile 390×844 cho 3 hướng × 6 màn.

Chạy: python .scratch/nested-canvas/frames/build_mobile.py
"""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from styles import DIRECTIONS, css_for  # noqa: E402
from build_frames import AV, FW, FONT, ICONS, av, icon  # noqa: E402

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")
W, H = 390, 844


def chrome(cls: str = "", extra: str = "") -> str:
    return (
        "<!doctype html><html lang='vi'><head><meta charset='utf-8'>"
        f"{FONT}<style>html,body{{margin:0;overflow:hidden}}"
        f".screen{{--fw-display:{FW[cls]}}}"
        f"{css_for(cls)}"
        ".phone{border-radius:0;border:0;width:390px;height:844px;background:var(--bg);display:flex;"
        "flex-direction:column}"
        f"{extra}"
        "</style></head><body>"
    )


def statusbar() -> str:
    return (
        '<div class="statusbar" style="background:var(--surface)"><span>9:41</span>'
        '<span class="sig"><i style="height:5px;background:currentColor"></i>'
        '<i style="height:7px;background:currentColor"></i>'
        '<i style="height:9px;background:currentColor"></i>'
        '<i style="height:11px;background:currentColor"></i>'
        '<span style="margin-left:5px;font-size:10.5px">5G</span>'
        '<span style="margin-left:6px;font-size:10.5px">82%</span></span></div>'
    )


def tabbar(direction: str, active: str) -> str:
    items = [("chat", "Tin nhắn"), ("grid", "Nhật ký"), ("users", "Bạn bè"), ("bell", "Hoạt động")]
    out = ['<div class="tabbar">']
    for ic, label in items:
        on = " on" if label == active else ""
        badge = ""
        if label == "Tin nhắn":
            badge = '<span class="tb-badge">7</span>'
        if label == "Hoạt động":
            badge = '<span class="tb-badge">9</span>'
        out.append(f'<div class="{on.strip()}">{icon(ic, 21)}{badge}<span>{label}</span></div>')
    out.append("</div>")
    return "".join(out)

def phone(inner: str, dark: bool = False) -> str:
    cls = "phone dark" if dark else "phone"
    return f'<div class="{cls}">{statusbar()}{inner}</div>'


# ─────────────────────────────────────────────── chat thread
def m_chat(direction: str) -> str:
    bubbles = [
        (2, "TL", "Trúc Ly", "Mai họp nhóm lúc 8h ở thư viện nhé.", False, "08:07"),
        (5, "DH", "Đức Huy", "Mình gửi lại file báo cáo, mọi người xem phần 3 giúp mình với.", False, "08:12"),
        (None, "", "", "Đã nhận, để mình sửa lại phần biểu đồ.", True, "08:14"),
        (None, "", "", "Phần 3 mình đang viết lại mục 3.2, chiều nay sẽ xong.", True, "08:15"),
        (2, "TL", "Trúc Ly", "Vậy 8h30 mình bắt đầu, đúng chứ?", False, "08:17"),
        (5, "DH", "Đức Huy", "Đúng rồi. Mình đặt phòng B2-305 từ 8h15.", False, "08:18"),
        (None, "", "", "Ok, mình tới sớm 10 phút để mở máy chiếu.", True, "08:19"),
    ]
    rows = []
    for i, (ai, ini, name, text, me, t) in enumerate(bubbles):
        sender = f'<div class="sender">{name}</div>' if name else ""
        cls = "msg me" if me else "msg"
        avatar = "" if me else av(ai, ini, "sm")
        rows.append(
            f'<div class="{cls}" style="margin-bottom:8px">{avatar}'
            f'<div class="msg-col"><div class="bubble">{sender}{text}'
            f'<span class="time">{t}</span></div></div></div>'
        )
    inner = (
        '<div class="mhead">'
        f'<span class="icon-btn">{icon("chevron", 21)}</span>'
        f'{av(4, "DA", "sm")}'
        '<div style="flex:1;min-width:0"><div class="mtitle" style="font-size:14px">Nhóm Đồ án CNTT</div>'
        '<div class="thread-sub">5 thành viên · 3 đang hoạt động</div></div>'
        f'<span class="icon-btn">{icon("search", 19)}</span>'
        f'<span class="icon-btn">{icon("info", 19)}</span>'
        "</div>"
        '<div class="mbody" style="display:flex;flex-direction:column;justify-content:flex-end;'
        'padding:14px 12px 6px;background:var(--thread-bg)">'
        + "".join(rows)
        + "</div>"
        '<div class="mcomposer">'
        '<div class="reply-bar"><span><b>Trả lời Đức Huy</b> · Đúng rồi. Mình đặt phòng B2-305</span></div>'
        '<div class="composer-row">'
        f'<span class="icon-btn">{icon("plus", 19)}</span>'
        '<div class="composer-input" style="height:38px">Tin nhắn…</div>'
        f'<span class="icon-btn">{icon("smile", 19)}</span>'
        f'<span class="send-btn" style="width:36px;height:36px">{icon("send", 17)}</span>'
        "</div></div>"
    )
    return phone(inner)


# ─────────────────────────────────────────────── chat list
def m_list(direction: str) -> str:
    rows = []
    data = [
        ("MA", "Minh Anh", "Mai họp nhóm lúc 8h ở thư viện nhé.", "2 phút", 2, True),
        ("DA", "Nhóm Đồ án CNTT", "Đức Huy: Mình gửi lại file báo cáo.", "18 phút", 5, False),
        ("TL", "Trúc Ly", "Bạn xem giúp mình phần mở đầu được không?", "1 giờ", 0, True),
        ("HB", "Hội bạn cấp 3", "Ảnh: 4", "3 giờ", 0, False),
        ("DH", "Đức Huy", "Cảm ơn bạn, mình xem ngay.", "Hôm qua", 0, False),
        ("KT", "Lớp KTPM K18", "Thông báo lịch thi giữa kỳ đã cập nhật.", "Hôm qua", 0, False),
        ("NM", "Ngọc Mai", "Mình gửi lại ảnh hôm đi Cần Giờ.", "T2", 0, False),
    ]
    for i, (ini, name, prev, t, unread, online) in enumerate(data):
        badge = f'<span class="badge">{unread}</span>' if unread else ""
        rows.append(
            f'<div class="conv" style="border-bottom:1px solid var(--line-soft)">{av(i, ini, online=online)}'
            '<div class="conv-body"><div class="conv-top"><span class="conv-name">'
            f'{name}</span><span class="conv-time">{t}</span></div>'
            f'<div class="conv-prev">{prev}</div></div>{badge}</div>'
        )
    inner = (
        '<div class="mhead" style="height:56px;flex-basis:56px">'
        '<div class="panel-title" style="flex:1;font-size:22px">Tin nhắn</div>'
        f'<span class="icon-btn">{icon("search", 19)}</span>'
        f'<span class="icon-btn accent">{icon("plus", 18)}</span></div>'
        f'<div class="search" style="margin:0 12px 8px">{icon("search", 16)}'
        "<span>Tìm người hoặc hội thoại</span></div>"
        '<div class="seg" style="margin:0 12px 8px"><span class="on">Tất cả<span class="cnt">8</span></span>'
        '<span>Bạn bè</span><span>Lạ<span class="cnt">3</span></span></div>'
        '<div class="section-label">Đã ghim</div>'
        + "".join(rows[:2])
        + '<div class="section-label">Gần đây</div>'
        + "".join(rows[2:])
        + "</div>"
    )
    return phone('<div class="mbody" style="overflow:hidden">' + inner + "</div>" + tabbar(direction, "Tin nhắn"))


# ─────────────────────────────────────────────── feed
def m_feed(direction: str) -> str:
    post1 = (
        '<div class="card" style="border-radius:0;border-left:0;border-right:0;margin-bottom:10px">'
        f'<div class="post-head">{av(2, "TL", "md")}<div style="flex:1">'
        '<div class="post-name">Trúc Ly</div>'
        '<div class="post-meta">2 giờ trước · Công khai</div></div>'
        f'<span class="icon-btn">{icon("more", 18)}</span></div>'
        '<div class="post-text">Vừa hoàn thành xong chương 3 của báo cáo. '
        "Cuối tuần này nhóm mình họp để rà lại toàn bộ nhé.</div>"
        '<div class="media-2"><div class="media">' + icon("image", 26) + "</div>"
        '<div class="media">' + icon("image", 26) + "</div></div>"
        '<div class="post-reacts"><span class="rc">+</span><span class="rc alt">♥</span>'
        "<span style='margin-left:4px'>12 người khác</span>"
        "<span style='margin-left:auto'>4 bình luận</span></div>"
        '<div class="post-actions">'
        f'<span class="post-action">{icon("heart", 17)}Thích</span>'
        f'<span class="post-action">{icon("chat", 17)}Bình luận</span>'
        f'<span class="post-action">{icon("send", 17)}Chia sẻ</span></div></div>'
    )
    post2 = (
        '<div class="card" style="border-radius:0;border-left:0;border-right:0;margin-bottom:10px">'
        f'<div class="post-head">{av(5, "DH", "md")}<div style="flex:1">'
        '<div class="post-name">Đức Huy</div>'
        '<div class="post-meta">4 giờ trước · Bạn bè</div></div>'
        f'<span class="icon-btn">{icon("more", 18)}</span></div>'
        '<div class="post-text">Ảnh chụp buổi họp nhóm sáng nay. Cảm ơn mọi người đã đến đúng giờ.</div>'
        "</div>"
    )
    inner = (
        '<div class="mhead" style="height:56px;flex-basis:56px">'
        '<div class="mtitle" style="flex:1;font-size:21px;letter-spacing:-.02em">Nhật ký</div>'
        f'<span class="icon-btn">{icon("search", 19)}</span>'
        f'<span class="icon-btn">{icon("bell", 19)}</span></div>'
        '<div class="mbody" style="overflow:hidden;padding-top:10px">'
        '<div class="composer-card" style="background:var(--surface);border-bottom:1px solid var(--line-soft);'
        'margin-bottom:10px">'
        + av(6, "MA", "sm")
        + '<div class="composer-fake" style="height:38px">Bạn đang nghĩ gì?</div>'
        + f'<span class="icon-btn">{icon("image", 19)}</span></div>'
        + post1
        + post2
        + "</div></div>"
    )
    return phone(inner + tabbar(direction, "Nhật ký"))


# ─────────────────────────────────────────────── activity
def m_activity(direction: str) -> str:
    data = [
        (1, "NA", "<b>Ngọc Anh</b> đã gửi lời mời kết bạn.", "5 phút trước", True, True),
        (2, "TL", "<b>Trúc Ly</b> đã bình luận về bài viết của bạn: “Mình xem rồi, ổn đó.”", "20 phút trước", False, True),
        (4, "DH", "<b>Đức Huy</b> đã thích bài viết của bạn.", "1 giờ trước", False, True),
        (5, "HB", "<b>Hồng Bích</b> đã chấp nhận lời mời kết bạn của bạn.", "3 giờ trước", False, False),
        (2, "KT", "<b>Lớp KTPM K18</b> có 3 tin nhắn mới trong nhóm.", "Hôm qua", False, False),
        (3, "QB", "<b>Quốc Bảo</b> đã nhắc đến bạn trong một bình luận.", "Hôm qua", False, False),
    ]
    rows = []
    for i, ini, text, t, is_req, unread in data:
        actions = (
            '<div class="act-actions"><span class="btn sm primary">Chấp nhận</span>'
            '<span class="btn sm">Từ chối</span></div>'
            if is_req
            else ""
        )
        dot = '<span class="unread-dot"></span>' if unread else '<span style="width:7px;flex:0 0 auto"></span>'
        rows.append(
            f'<div class="act-row">{av(i, ini, "sm")}<div class="act-text">{text}'
            f'<div class="act-time">{t}</div>{actions}</div>{dot}</div>'
        )
    inner = (
        '<div class="mhead" style="height:56px;flex-basis:56px">'
        '<div class="mtitle" style="flex:1;font-size:21px;letter-spacing:-.02em">Hoạt động</div>'
        '<span class="btn ghost sm">Đọc tất cả</span></div>'
        '<div class="mbody" style="overflow:hidden;padding:10px 12px">'
        '<div class="seg" style="margin:0 0 10px"><span class="on">Tất cả<span class="cnt">9</span></span>'
        '<span>Lời mời<span class="cnt">2</span></span></div>'
        '<div class="card">' + "".join(rows) + "</div></div>"
    )
    return phone(inner + tabbar(direction, "Hoạt động"))


# ─────────────────────────────────────────────── profile
def m_profile(direction: str) -> str:
    info = [
        ("calendar", "Sinh ngày 14/03/2004"),
        ("globe", "Đến từ TP. Hồ Chí Minh"),
        ("clock", "Tham gia tháng 9, 2026"),
    ]
    info_html = "".join(
        f'<div class="info-row">{icon(ic, 16)}<span>{label}</span></div>' for ic, label in info
    )
    inner = (
        '<div class="mbody" style="overflow:hidden">'
        '<div class="cover" style="height:120px;border-radius:0;margin:0;border:0">'
        '<div class="cover-tag">' + icon("image", 14) + "Ảnh bìa</div></div>"
        '<div class="profile-head" style="margin:0;border-radius:0;border:0;padding:0 16px">'
        '<div class="profile-id" style="margin-top:-38px;align-items:flex-end;gap:12px">'
        f'<div class="profile-av">{av(6, "MA", "xl")}</div>'
        '<div class="profile-names" style="padding-bottom:6px">'
        '<div class="profile-name" style="font-size:20px">Minh Anh</div>'
        '<div class="profile-sub" style="font-size:11.5px">128 bạn bè · @minhanh</div></div>'
        "</div>"
        '<div style="display:flex;gap:8px;margin-top:12px">'
        '<span class="btn" style="flex:1">Chỉnh sửa</span>'
        '<span class="btn primary" style="flex:1">' + icon("chat", 15) + "Nhắn tin</span>"
        f'<span class="btn ghost">{icon("more", 18)}</span></div>'
        '<div class="profile-tabs" style="margin-top:12px"><span class="ptab on">Bài viết</span>'
        '<span class="ptab">Ảnh</span><span class="ptab">Bạn bè</span></div>'
        "</div>"
        '<div class="profile-body" style="margin:0;border:0;border-radius:0;padding:14px 16px;display:block">'
        '<div class="card" style="padding:14px;margin-bottom:12px">'
        '<div class="mini-label" style="margin-bottom:6px">Giới thiệu</div>'
        '<div style="font-size:12.5px;line-height:1.55;color:var(--ink2)">'
        "Sinh viên KTPM, thích chụp ảnh và làm đồ án nhóm.</div>"
        + info_html
        + "</div>"
        '<div class="card" style="padding:14px">'
        '<div class="mini-label" style="margin-bottom:8px">Ảnh gần đây<span>Xem tất cả</span></div>'
        '<div class="media-strip">'
        + "".join(f'<div class="media sq">{icon("image", 15)}</div>' for _ in range(6))
        + "</div></div></div></div>"
    )
    return phone(inner + tabbar(direction, "Bạn bè"))


# ─────────────────────────────────────────────── dark sample
def m_dark(direction: str) -> str:
    rows = []
    data = [
        ("MA", "Minh Anh", "Mai họp nhóm lúc 8h ở thư viện nhé.", "2 phút", 2, True),
        ("DA", "Nhóm Đồ án CNTT", "Đức Huy: Mình gửi lại file báo cáo.", "18 phút", 5, False),
        ("TL", "Trúc Ly", "Bạn xem giúp mình phần mở đầu được không?", "1 giờ", 0, True),
        ("HB", "Hội bạn cấp 3", "Ảnh: 4", "3 giờ", 0, False),
    ]
    for i, (ini, name, prev, t, unread, online) in enumerate(data):
        badge = f'<span class="badge">{unread}</span>' if unread else ""
        rows.append(
            f'<div class="conv" style="border-bottom:1px solid var(--line-soft)">{av(i, ini, online=online)}'
            '<div class="conv-body"><div class="conv-top"><span class="conv-name">'
            f'{name}</span><span class="conv-time">{t}</span></div>'
            f'<div class="conv-prev">{prev}</div></div>{badge}</div>'
        )
    inner = (
        '<div class="mhead" style="height:56px;flex-basis:56px">'
        '<div class="panel-title" style="flex:1;font-size:22px">Tin nhắn</div>'
        f'<span class="icon-btn">{icon("search", 19)}</span>'
        f'<span class="icon-btn accent">{icon("plus", 18)}</span></div>'
        f'<div class="search" style="margin:0 12px 8px">{icon("search", 16)}'
        "<span>Tìm người hoặc hội thoại</span></div>"
        '<div class="seg" style="margin:0 12px 8px"><span class="on">Tất cả<span class="cnt">8</span></span>'
        '<span>Bạn bè</span><span>Lạ<span class="cnt">3</span></span></div>'
        '<div class="section-label">Đã ghim</div>'
        + "".join(rows[:2])
        + '<div class="section-label">Gần đây</div>'
        + "".join(rows[2:])
        + "</div>"
    )
    mk = (
        '<div class="chat-hint" style="margin:14px 16px;display:flex;gap:8px;align-items:center;'
        'background:var(--surface2);border:1px solid var(--line-soft);border-radius:12px;padding:10px 12px;'
        'font-size:11.5px;color:var(--ink2)">'
        + icon("info", 16)
        + "Dark: bubble nhận dùng surface2, bubble gửi vẫn #4C9EEB với chữ #0B1220.</div>"
    )
    return phone(
        '<div class="mbody" style="overflow:hidden">' + inner + mk + "</div>" + tabbar(direction, "Tin nhắn"),
        dark=True,
    )


# ─────────────────────────────────────────────── auth
def m_auth(direction: str) -> str:
    inner = (
        '<div class="mbody" style="overflow:hidden;background:var(--surface);display:flex;'
        'flex-direction:column;padding:0 22px">'
        '<div style="display:flex;align-items:center;gap:10px;padding:14px 0 22px">'
        '<div class="rail-logo" style="margin:0;width:38px;height:38px;font-size:18px">S</div>'
        '<div class="wordmark" style="font-size:20px">Smurfy</div></div>'
        '<div class="form-title" style="font-size:24px">Chào mừng trở lại</div>'
        '<div class="form-sub" style="margin-top:4px">Đăng nhập để tiếp tục với Smurfy.</div>'
        '<div class="auth-tabs" style="margin-top:18px"><span class="on">Đăng nhập</span>'
        "<span>Đăng ký</span></div>"
        '<div class="field" style="margin-top:14px"><span class="label">Địa chỉ email</span>'
        f'<div class="input focus">{icon("mail", 17)}<span>minhanh@smurfy.vn</span></div></div>'
        '<div class="field" style="margin-top:12px"><span class="label">Mật khẩu</span>'
        f'<div class="input">{icon("lock", 17)}<span>••••••••••</span></div></div>'
        '<div class="row-between" style="margin-top:14px">'
        '<span class="check"><span class="box on">' + icon("check", 11) + "</span>Ghi nhớ</span>"
        '<span class="link">Quên mật khẩu?</span></div>'
        '<span class="btn primary" style="height:46px;margin-top:16px;font-size:13.5px">Đăng nhập</span>'
        '<div class="divider" style="margin-top:16px">hoặc</div>'
        '<span class="btn" style="height:46px;margin-top:16px">Tiếp tục với Google</span>'
        '<div class="form-foot" style="margin-top:auto;margin-bottom:24px">'
        'Chưa có tài khoản? <span class="link">Tạo tài khoản</span></div>'
        "</div>"
    )
    return phone(inner)


SCREENS = {
    "chat": m_chat,
    "list": m_list,
    "feed": m_feed,
    "activity": m_activity,
    "profile": m_profile,
    "auth": m_auth,
    "dark": m_dark,
}


def build() -> list[str]:
    written = []
    for d in DIRECTIONS:
        for name, fn in SCREENS.items():
            path = os.path.join(OUT, f"{d}-m-{name}.html")
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(chrome(d) + fn(d) + "</body></html>")
            written.append(path)
    return written


if __name__ == "__main__":
    for p in build():
        print(p)
