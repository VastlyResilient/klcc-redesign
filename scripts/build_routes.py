"""Generate direct-loadable static routes for GitHub Pages."""
import json
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
PAGES = json.loads((ROOT / "content.json").read_text())["pages"]
for path, page in PAGES.items():
    if path == "/":
        continue
    slug = path.strip("/")
    dest = ROOT / slug
    dest.mkdir(exist_ok=True)
    title = escape(page.get("title") or slug.replace("-", " ").title())
    (dest / "index.html").write_text(f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#17112e"><meta name="description" content="Explore {title} at Kingdom Life Christian Church in Milford, Connecticut."><link rel="icon" href="../assets/logo.png" type="image/png"><title>{title} | Kingdom Life Christian Church</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../styles.css"></head><body data-depth="1" data-page="/{slug}"><div id="app"></div><script defer src="../app.js"></script></body></html>''')
print(f"Built {len(PAGES)-1} deep routes")
