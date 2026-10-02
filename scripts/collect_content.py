"""Record public KLCC page content for the redesign migration audit."""
import json
import re
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://klcc.us"
OUT = Path(__file__).resolve().parents[1] / "content.json"
session = requests.Session()
tree = ET.fromstring(session.get(BASE + "/sitemap.xml", timeout=20).text)
paths = [urlparse(node.findtext("{*}loc")).path for node in tree.findall("{*}url")]
paths = ["/"] + list(dict.fromkeys(paths))
pages = {}

for path in paths:
    response = session.get(BASE + path, timeout=20)
    soup = BeautifulSoup(response.text, "html.parser")
    main = soup.find("main", id="sp-content")
    if response.status_code != 200 or not main:
        pages[path] = {"status": response.status_code, "sections": []}
        continue
    sections = []
    for section in main.find_all("section", recursive=False):
        text = section.get_text(" ", strip=True)
        if not text or re.match(r"Your church for life", text, re.I):
            continue
        blocks = []
        for component in section.select(".sp-block"):
            kind = component.get("data-type", "")
            content = component.select_one(".sp-block-content") or component
            if kind == "heading":
                heading = content.find(["h1", "h2", "h3", "h4"])
                if heading:
                    value = " ".join(heading.get_text(" ", strip=True).split())
                    if value and (not blocks or blocks[-1]["text"] != value):
                        blocks.append({"type": heading.name, "text": value})
            elif kind == "text":
                # SnapPages often stores prose as bare text and <br>, not <p>.
                for part in re.split(r"\n\s*\n", content.get_text("\n", strip=True)):
                    value = " ".join(part.split())
                    if value and (not blocks or blocks[-1]["text"] != value):
                        blocks.append({"type": "p", "text": value})
        if not blocks and text:
            blocks = [{"type": "p", "text": " ".join(text.split())}]
        actions = []
        for a in section.find_all("a", href=True):
            label = " ".join(a.get_text(" ", strip=True).split())
            href = a.get("href", "")
            if label and href and not label.lower().startswith("back to home"):
                item = {"label": label, "href": href}
                if item not in actions:
                    actions.append(item)
        sections.append({"blocks": blocks, "actions": actions})
    title = next((b["text"] for s in sections for b in s["blocks"] if b["type"] in ("h1", "h2")), path.strip("/").replace("-", " ").title() or "Home")
    pages[path] = {"status": response.status_code, "source": BASE + path, "title": title, "sections": sections}

OUT.write_text(json.dumps({"retrieved": str(date.today()), "pages": pages}, ensure_ascii=False, indent=2))
print(f"Saved {len(pages)} routes to {OUT}")
