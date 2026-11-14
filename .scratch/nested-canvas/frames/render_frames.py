"""Render toàn bộ frame HTML -> PNG và ghép contact sheet. Chạy:
python .scratch/nested-canvas/frames/render_frames.py
"""

from __future__ import annotations

import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
RENDER = os.path.join(ROOT, ".agents", "skills", "logo-design", "scripts", "render_png.py")
HTML = os.path.join(HERE, "html")
PNG = os.path.join(HERE, "png")
SHEETS = os.path.join(HERE, "sheets")

SCREENS = ["chat", "feed", "profile", "activity", "contacts", "auth"]
MSCREENS = ["chat", "list", "feed", "activity", "profile", "auth", "dark"]
LABELS = {
    "chat": "Chat — 3 cột (danh sách · luồng · chi tiết)",
    "feed": "Nhật ký — cột đọc + rail phải",
    "profile": "Hồ sơ — cover + tabs + cột giới thiệu",
    "activity": "Hoạt động — thông báo + lời mời",
    "contacts": "Bạn bè — danh sách + panel chi tiết",
    "auth": "Đăng nhập — brand field + form",
}
MLABELS = {
    "chat": "Chat — thread toàn màn",
    "list": "Tin nhắn — danh sách + tab bar",
    "feed": "Nhật ký — cuộn dọc",
    "activity": "Hoạt động — segmented + item",
    "profile": "Hồ sơ — cover + tabs",
    "auth": "Đăng nhập — form đầy đủ",
    "dark": "Dark — danh sách + segmented",
}
DIRS = {"c": "C — Bề mặt lồng nhau"}


def font(size: int, bold: bool = False):
    cands = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for c in cands:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def render_all() -> None:
    os.makedirs(PNG, exist_ok=True)
    for d in DIRS:
        for s in SCREENS:
            src = os.path.join(HTML, f"{d}-{s}.html")
            dst = os.path.join(PNG, f"{d}-{s}.png")
            subprocess.run(
                [sys.executable, RENDER, src, "-o", dst, "--width", "1440", "--height", "900"],
                check=True,
                stdout=subprocess.DEVNULL,
            )
            print("rendered", os.path.basename(dst))
        for s in MSCREENS:
            src = os.path.join(HTML, f"{d}-m-{s}.html")
            dst = os.path.join(PNG, f"{d}-m-{s}.png")
            subprocess.run(
                [sys.executable, RENDER, src, "-o", dst, "--width", "390", "--height", "844"],
                check=True,
                stdout=subprocess.DEVNULL,
            )
            print("rendered", os.path.basename(dst))


def sheet_for(direction: str) -> str:
    """Một ảnh 2 cột × 3 hàng cho mỗi hướng, mỗi ô 720×450."""
    os.makedirs(SHEETS, exist_ok=True)
    cell_w, cell_h = 720, 450
    pad, head = 16, 64
    cols, rows = 2, 3
    W = cols * cell_w + pad * (cols + 1)
    H = head + rows * (cell_h + 34) + pad * (rows + 1)
    sheet = Image.new("RGB", (W, H), "#F4F6F9")
    dr = ImageDraw.Draw(sheet)
    dr.text((pad, 18), f"{DIRS[direction]}", font=font(26, True), fill="#0F172A")
    dr.text(
        (pad, 48),
        "nested-canvas · frame tĩnh 1440×900 · Be Vietnam Pro · accent #4C9EEB",
        font=font(13),
        fill="#64748B",
    )
    for i, s in enumerate(SCREENS):
        r, c = divmod(i, cols)
        x = pad + c * (cell_w + pad)
        y = head + pad + r * (cell_h + 34 + pad)
        img = Image.open(os.path.join(PNG, f"{direction}-{s}.png")).convert("RGB")
        img = img.resize((cell_w, cell_h), Image.LANCZOS)
        sheet.paste(img, (x, y))
        dr.rectangle([x, y, x + cell_w - 1, y + cell_h - 1], outline="#D8DFE8")
        dr.text((x + 2, y + cell_h + 9), LABELS[s], font=font(13, True), fill="#334155")
    out = os.path.join(SHEETS, f"direction-{direction}.png")
    sheet.save(out)
    print("sheet", out)
    return out


def sheet_overview() -> str:
    """So sánh 3 hướng trên cùng một màn chat, cạnh nhau. (Đã chốt C — không dùng nữa.)"""
    raise NotImplementedError("hướng đã chốt là C; dùng sheet_for('c')")


if __name__ == "__main__":
    render_all()
    for d in DIRS:
        sheet_for(d)
