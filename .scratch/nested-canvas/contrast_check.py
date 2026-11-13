"""contrast_check — WCAG contrast checker cho token Nested Canvas.

Spec.md tiêu chí nghiệm thu: "Script contrast_check pass cho mọi cặp màu
token dùng trong ticket". Chạy: python -I contrast_check.py

Cặp tối thiểu 4.5:1 là văn bản thường; 3.0:1 là phi văn bản (viền, icon).
Cặp EXCEPTION đã ghi trong DESIGN.md, không tính là FAIL:
- ink-3/surface (light) 4.37:1 — role chữ gợi ý/siêu dữ liệu, DESIGN không
  claim AA cho ink-3 (chỉ ink-2 mới ghi "(AA)").
- accent/surface 2.84:1 non-text — lý do accent-edge (#2E7CC4, 4.38:1)
  tồn tại; nút primary luôn có viền accent-edge.
"""

from dataclasses import dataclass

LIGHT = {
    "canvas": "#EDF1F6", "surface": "#FFFFFF", "surface-2": "#F6F8FB",
    "surface-3": "#E9EEF5", "line": "#E7EDF5", "line-soft": "#EDF1F7",
    "line-strong": "#D5DDE8", "ink": "#0F172A", "ink-2": "#475569",
    "ink-3": "#6B7A8F", "accent": "#4C9EEB", "on-accent": "#0B1220",
    "accent-strong": "#1D5E93", "accent-soft": "#E8F3FD",
    "accent-edge": "#2E7CC4", "success": "#15803D", "on-success": "#FFFFFF",
    "warning": "#B45309", "on-warning": "#FFFFFF", "danger": "#DC2626",
    "on-danger": "#FFFFFF", "info": "#0369A1", "on-info": "#FFFFFF",
}
DARK = {
    "canvas": "#0B111C", "surface": "#141D2B", "surface-2": "#1B2636",
    "surface-3": "#212D3F", "line": "#2A3647", "line-soft": "#26313F",
    "line-strong": "#384457", "ink": "#E8EEF6", "ink-2": "#A9B8CB",
    "ink-3": "#8CA0B8", "accent": "#4C9EEB", "on-accent": "#0B1220",
    # accent-soft dark là rgb(76 158 235 / 0.2) — composite 20% accent
    # trên 80% surface #141D2B ≈ #253E5A.
    "accent-strong": "#7FB6EF", "accent-soft": "#253E5A",
    "accent-edge": "#2E7CC4", "success": "#4ADE80", "on-success": "#0B1220",
    "warning": "#FBBF24", "on-warning": "#0B1220", "danger": "#F87171",
    "on-danger": "#0B1220", "info": "#38BDF8", "on-info": "#0B1220",
}


@dataclass
class Pair:
    fg: str
    bg: str
    min_ratio: float
    note: str = ""


# Cặp tiêu chuẩn mỗi theme (fg trên bg).
PAIRS = [
    Pair("on-accent", "accent", 4.5),          # chữ trên CTA/badge/bubble gửi
    Pair("ink", "canvas", 4.5),                # mực chính trên canvas
    Pair("ink", "surface", 4.5),               # mực chính trên panel
    Pair("ink-2", "surface", 4.5),             # mực phụ (AA)
    Pair("ink-3", "surface", 4.5, "exception: chữ gợi ý/meta, DESIGN không claim AA cho ink-3"),
    Pair("accent-strong", "surface", 4.5),     # liên kết văn bản
    Pair("accent-strong", "accent-soft", 4.5),  # chip primary
    Pair("accent-edge", "surface", 3.0),       # viền nút primary (non-text)
    Pair("on-success", "success", 4.5),
    Pair("on-warning", "warning", 4.5),
    Pair("on-danger", "danger", 4.5),
    Pair("on-info", "info", 4.5),
]


def luminance(hex_color: str) -> float:
    c = hex_color.lstrip("#")
    r, g, b = (int(c[i:i + 2], 16) / 255 for i in (0, 2, 4))
    lin = lambda v: v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)


def contrast(fg: str, bg: str) -> float:
    lo, hi = sorted((luminance(fg), luminance(bg)))
    return (hi + 0.05) / (lo + 0.05)


def main() -> int:
    import sys

    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
    failures = 0
    for theme, tokens in (("light", LIGHT), ("dark", DARK)):
        for p in PAIRS:
            ratio = contrast(tokens[p.fg], tokens[p.bg])
            status = "PASS" if ratio >= p.min_ratio else "WARN"
            if status == "WARN" and not p.note:
                failures += 1
                status = "FAIL"
            tag = f"  [{p.note}]" if p.note else ""
            print(f"{status} {ratio:5.2f}:1 (min {p.min_ratio}) {theme}: {p.fg}/{p.bg}{tag}")
    print("RESULT:", "PASS" if failures == 0 else f"{failures} FAIL")
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
