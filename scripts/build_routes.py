"""Generate direct-loadable static routes for GitHub Pages."""
import json
import hashlib
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
PAGES = json.loads((ROOT / "content.json").read_text())["pages"]
EXPERIENCE_VERSION = hashlib.sha256((ROOT / "experience.css").read_bytes()).hexdigest()[:12]
JS_VERSION = hashlib.sha256((ROOT / "app.js").read_bytes()).hexdigest()[:12]
CSS_VERSION = hashlib.sha256((ROOT / "styles.css").read_bytes()).hexdigest()[:12]
INNER_CSS_VERSION = hashlib.sha256((ROOT / "inner-pages.css").read_bytes()).hexdigest()[:12]
INNER_JS_VERSION = hashlib.sha256((ROOT / "inner-pages.js").read_bytes()).hexdigest()[:12]
for path, page in PAGES.items():
    if path == "/":
        continue
    slug = path.strip("/")
    dest = ROOT / slug
    dest.mkdir(exist_ok=True)
    title = escape(page.get("title") or slug.replace("-", " ").title())
    (dest / "index.html").write_text(f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#14212b"><meta name="description" content="Explore {title} at Kingdom Life Christian Church in Milford, Connecticut."><link rel="icon" href="../assets/logo.png" type="image/png"><title>{title} | Kingdom Life Christian Church</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;450;500;550;600;650;700;800&family=Archivo+Black&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../styles.css?v={CSS_VERSION}"><link rel="stylesheet" href="../experience.css?v={EXPERIENCE_VERSION}"><link rel="stylesheet" href="../inner-pages.css?v={INNER_CSS_VERSION}"><noscript><link rel="stylesheet" href="../nojs.css"></noscript></head><body class="experience-rebuild" data-depth="1" data-page="/{slug}"><div id="app"></div><script defer src="../inner-pages.js?v={INNER_JS_VERSION}"></script><script defer src="../app.js?v={JS_VERSION}"></script></body></html>''')
print(f"Built {len(PAGES)-1} deep routes")
