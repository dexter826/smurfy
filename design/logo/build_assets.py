"""Export the approved Chung vong masters to app assets with local Chromium."""
from pathlib import Path
import base64
import re
import shutil
import subprocess
import xml.etree.ElementTree as ET
from PIL import Image

ROOT=Path(__file__).resolve().parent
PUBLIC=ROOT.parent.parent/"public"
EXPORTS=ROOT/"exports"
NS="{http://www.w3.org/2000/svg}"
BLUE="#4C9EEB"
INK="#0B1220"

def contents(path):
    element=ET.parse(path).getroot()
    markup="".join(ET.tostring(child,encoding="unicode") for child in element if child.tag != NS+"title")
    markup=re.sub(r"ns\d+:","",markup)
    return re.sub(r' xmlns:ns\d+="[^"]+"',"",markup)

def svg(title,body,width=256,height=256):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title"><title id="title">{title}</title>{body}</svg>'

def save(name,markup):
    (ROOT/name).write_text(markup,encoding="utf-8")
    return ROOT/name

def recolor(markup,color):
    return markup.replace(BLUE,color).replace(INK,color)

def data(path):
    return "data:image/svg+xml;base64,"+base64.b64encode(path.read_bytes()).decode("ascii")

def chrome_path():
    choices=[
        Path.home()/"AppData/Local/ms-playwright/chromium_headless_shell-1194/chrome-win/headless_shell.exe",
        Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
        Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
    ]
    return next(path for path in choices if path.is_file())

def main():
    EXPORTS.mkdir(exist_ok=True)
    symbol=contents(ROOT/"logo-symbol.svg")
    small=contents(ROOT/"logo-symbol-small.svg")
    word=contents(ROOT/"logo-wordmark.svg")
    ink_symbol=recolor(symbol,INK)
    save("logo-symbol-dark.svg",svg("Smurfy Chung vòng",ink_symbol))
    save("logo-symbol-black.svg",svg("Smurfy Chung vòng",recolor(symbol,"#000000")))
    save("logo-symbol-white.svg",svg("Smurfy Chung vòng",recolor(symbol,"#FFFFFF")))
    horizontal=symbol+'<g transform="translate(266 0)">'+word+"</g>"
    save("logo-horizontal.svg",svg("Smurfy Chung vòng",horizontal,900,256))
    save("logo-horizontal-white.svg",svg("Smurfy Chung vòng",recolor(horizontal,"#FFFFFF"),900,256))
    stacked='<g transform="translate(192 0)">'+symbol+'</g><g transform="translate(0 244)">'+word+"</g>"
    save("logo-stacked.svg",svg("Smurfy Chung vòng",stacked,640,500))
    tile=f'<rect width="512" height="512" rx="112" fill="{BLUE}"/><g transform="translate(51.2 51.2) scale(1.6)">{ink_symbol}</g>'
    save("app-icon.svg",svg("Smurfy app icon",tile,512,512))
    mask=f'<path fill="{BLUE}" d="M0 0H512V512H0Z"/><g transform="translate(87 87) scale(1.32)">{ink_symbol}</g>'
    save("app-icon-maskable.svg",svg("Smurfy maskable icon",mask,512,512))
    favicon=f'<rect width="16" height="16" rx="3.5" fill="{BLUE}"/>'+recolor(small,INK)
    save("favicon.svg",svg("Smurfy favicon",favicon,16,16))

    # Fixed-size transparent atlas. Every export is rendered at its native size.
    jobs=[
        ("favicon-16.png","favicon.svg",16,16,0,0),
        ("favicon-32.png","favicon.svg",32,32,32,0),
        ("favicon-48.png","favicon.svg",48,48,80,0),
        ("apple-touch-icon.png","app-icon-maskable.svg",180,180,144,0),
        ("app-icon-192.png","app-icon.svg",192,192,336,0),
        ("app-icon-512.png","app-icon.svg",512,512,544,0),
        ("app-icon-maskable-512.png","app-icon-maskable.svg",512,512,1072,0),
    ]
    html='<html><head><style>html,body{margin:0;background:transparent;width:2048px;height:1280px}img{display:block;position:absolute}</style></head><body>'
    for name,source,w,h,x,y in jobs:
        html+=f'<img src="{data(ROOT/source)}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px">'
    html+="</body></html>"
    page=ROOT/"raster-atlas.html"
    page.write_text(html,encoding="utf-8")
    atlas=ROOT/"raster-atlas.png"
    subprocess.run([str(chrome_path()),"--no-sandbox","--disable-gpu","--hide-scrollbars","--default-background-color=00000000","--window-size=2048,1280",f"--screenshot={atlas}",page.as_uri()],check=True)
    with Image.open(atlas) as image:
        for name,source,w,h,x,y in jobs:
            image.crop((x,y,x+w,y+h)).save(EXPORTS/name)
    with Image.open(EXPORTS/"favicon-48.png") as image:
        image.save(EXPORTS/"favicon.ico",format="ICO",sizes=[(16,16),(32,32),(48,48)])
    svg_exports={
        "logo-symbol.svg":"logo-symbol.svg",
        "logo-symbol-dark.svg":"logo-symbol-dark.svg",
        "logo-symbol-white.svg":"logo-symbol-white.svg",
        "logo-horizontal.svg":"logo-horizontal.svg",
        "logo-horizontal-white.svg":"logo-horizontal-white.svg",
        "favicon.svg":"favicon.svg",
    }
    for destination,source in svg_exports.items():
        shutil.copyfile(ROOT/source,EXPORTS/destination)
    exported=list(EXPORTS.iterdir())
    for path in exported:
        shutil.copyfile(path,PUBLIC/path.name)
    for path in exported:
        path.unlink()
    EXPORTS.rmdir()
    atlas.unlink()
    page.unlink()
    print(f"Exported {len(exported)} approved brand assets.")

if __name__=="__main__":
    main()
