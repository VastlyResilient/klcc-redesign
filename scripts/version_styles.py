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
    page.write_text(updated)

print(f"Versioned {len(routes)} stylesheet links: {version}")
