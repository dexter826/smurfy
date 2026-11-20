"""Render the self-contained /og-image/ page at the sharing-card size."""
from pathlib import Path
import shutil
import subprocess
from PIL import Image
import sys
sys.dont_write_bytecode = True
from build_assets import chrome_path

ROOT=Path(__file__).resolve().parent
PUBLIC=ROOT.parent.parent/"public"
page=PUBLIC/"og-image/index.html"
output=PUBLIC/"og-image.png"
subprocess.run([
    str(chrome_path()),"--no-sandbox","--disable-gpu","--hide-scrollbars",
    "--run-all-compositor-stages-before-draw","--virtual-time-budget=1500",
    "--window-size=1200,630",f"--screenshot={output}",page.as_uri()
],check=True)
with Image.open(output) as image:
    assert image.size == (1200,630),image.size
    image.convert("RGB").save(output)
shutil.copyfile(output,PUBLIC/"twitter-image.png")
print("OG and Twitter images rendered at 1200 x 630.")
