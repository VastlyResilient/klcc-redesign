"""Give every published route a content-based stylesheet URL after CSS changes."""

import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
version = hashlib.sha256((root / "styles.css").read_bytes()).hexdigest()[:12]
routes = json.loads((root / "content.json").read_text())["pages"]

for route in routes:
    page = root / ("index.html" if route == "/" else f"{route.strip('/')}/index.html")
    html = page.read_text()
    prefix = "" if route == "/" else "../"
    updated, count = re.subn(
        rf'href="{re.escape(prefix)}styles\.css(?:\?v=[^\"]+)?"',
        f'href="{prefix}styles.css?v={version}"',
        html,
    )
    if count != 1:
        raise RuntimeError(f"Expected one stylesheet link in {page}, found {count}")
    for filename,attribute in [('experience.css','href'),('inner-pages.css','href'),('inner-pages.js','src'),('app.js','src')]:
        fingerprint=hashlib.sha256((root/filename).read_bytes()).hexdigest()[:12]
        updated,n=re.subn(rf'{attribute}="{re.escape(prefix)}{re.escape(filename)}(?:\?v=[^\"]+)?"', f'{attribute}="{prefix}{filename}?v={fingerprint}"',updated)
        if n!=1: raise RuntimeError(f"Expected one {filename} reference in {page}, found {n}")
    updated=updated.replace('#17112e','#14212b')
    page.write_text(updated)

print(f"Versioned {len(routes)} stylesheet links: {version}")
