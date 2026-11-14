"""Ghép contact sheet mobile cho hướng C. Chạy sau render_frames / render tay."""

from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PNG = os.path.join(HERE, "png")
SHEETS = os.path.join(HERE, "sheets")

MSCREENS = ["list", "chat", "feed", "activity", "profile", "auth"]
MLABELS = {
    "list": "Tin nhắn — danh sách + segmented + tab bar",
    "chat": "Chat — thread toàn màn + composer",
    "feed": "Nhật ký — composer + post card",
    "activity": "Hoạt động — segmented + item",
    "profile": "Hồ sơ — cover + tabs + giới thiệu",
    "auth": "Đăng nhập — form đầy đủ",
}


def font(size: int, bold: bool = False):
    c = r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf"
    return ImageFont.truetype(c, size) if os.path.exists(c) else ImageFont.load_default()


def main() -> None:
    os.makedirs(SHEETS, exist_ok=True)
    scale = 0.86
    cell_w, cell_h = int(390 * scale), int(844 * scale)
    pad, head = 16, 70
    cols = 6
    W = cols * cell_w + pad * (cols + 1)
    H = head + cell_h + 44
    sheet = Image.new("RGB", (W, H), "#F4F6F9")
    dr = ImageDraw.Draw(sheet)
    dr.text((pad, 16), "C — Bề mặt lồng nhau · mobile 390×844", font=font(24, True), fill="#0F172A")
    dr.text(
        (pad, 46),
        "Tab bar 4 mục + Hoạt động · safe-area đáy · touch target ≥44px",
        font=font(13),
        fill="#64748B",
    )
    for i, s in enumerate(MSCREENS):
        x = pad + i * (cell_w + pad)
        y = head
        img = Image.open(os.path.join(PNG, f"c-m-{s}.png")).convert("RGB").resize(
            (cell_w, cell_h), Image.LANCZOS
        )
        sheet.paste(img, (x, y))
        dr.rectangle([x, y, x + cell_w - 1, y + cell_h - 1], outline="#D8DFE8")
        dr.text((x, y + cell_h + 8), MLABELS[s], font=font(11, True), fill="#334155")
    out = os.path.join(SHEETS, "mobile-c.png")
    sheet.save(out)
    print("sheet", out)


if __name__ == "__main__":
    main()
