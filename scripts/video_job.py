"""One-shot OpenRouter image-to-video job for KLCC. Never batch or retry submissions."""
import argparse
import base64
import hashlib
import json
import pathlib
import ssl
import time
import urllib.error
import urllib.request

import certifi

ROOT = pathlib.Path(__file__).resolve().parents[1]
FRAME = ROOT / "assets/worship.jpg"
PROMPT = (ROOT / "production/hero-motion-prompt.txt").read_text().strip()
MODEL = "google/veo-3.1-fast"
DURATION = 8
RESOLUTION = "1080p"
ASPECT = "16:9"
OUT = ROOT / "assets/hero-film.mp4"
RECORD = ROOT / "production/video-job.json"
BASE = "https://openrouter.ai/api/v1"
CTX = ssl.create_default_context(cafile=certifi.where())


def key():
    env = pathlib.Path.home() / ".zilla/.env"
    for line in env.read_text().splitlines():
        if line.strip().startswith("OPENROUTER_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"\'')
    raise RuntimeError("OPENROUTER_API_KEY is unavailable")


def api(url, secret, data=None):
    req = urllib.request.Request(
        url if url.startswith("https://") else BASE + url,
        data=json.dumps(data).encode() if data is not None else None,
        headers={"Authorization": "Bearer " + secret, "Content-Type": "application/json"},
        method="POST" if data is not None else "GET",
    )
    with urllib.request.urlopen(req, timeout=60, context=CTX) as response:
        return json.load(response)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--submit", action="store_true")
    parser.add_argument("--max-clips", type=int, default=1)
    args = parser.parse_args()
    if args.max_clips != 1 or args.dry_run == args.submit:
        parser.error("choose exactly one of --dry-run or --submit, with --max-clips 1")
    secret = key()
    models = {m["id"]: m for m in api("/videos/models", secret)["data"]}
    model = models[MODEL]
    for field, val in [("supported_durations", DURATION), ("supported_resolutions", RESOLUTION), ("supported_aspect_ratios", ASPECT)]:
        if val not in model[field]:
            raise RuntimeError(f"Unsupported {field}: {val}")
    if "first_frame" not in model.get("supported_frame_images", []):
        raise RuntimeError("First-frame image input is unsupported")
    photo = FRAME.read_bytes()
    frame_url = "data:image/jpeg;base64," + base64.b64encode(photo).decode()
    payload = {
        "model": MODEL,
        "prompt": PROMPT,
        "duration": DURATION,
        "resolution": RESOLUTION,
        "aspect_ratio": ASPECT,
        "generate_audio": False,
        "frame_images": [{"type": "image_url", "image_url": {"url": frame_url}, "frame_type": "first_frame"}],
    }
    cost = float(model["pricing_skus"]["duration_seconds_without_audio"]) * DURATION
    shown = dict(payload)
    shown["frame_images"] = [{"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,<redacted; {len(photo)} bytes; sha256 {hashlib.sha256(photo).hexdigest()}>"}, "frame_type": "first_frame"}]
    print(json.dumps({"payload": shown, "estimated_cost_usd": cost}, indent=2))
    if args.dry_run:
        print("DRY RUN — nothing submitted or charged")
        return
    if RECORD.exists() or OUT.exists():
        raise RuntimeError("Existing job/output present; refusing a second submission")
    job = api("/videos", secret, payload)  # The only submission call.
    RECORD.write_text(json.dumps({"id": job["id"], "model": MODEL, "status": job.get("status")}, indent=2))
    print("Submitted one clip; job ID:", job["id"])
    while True:
        result = api(job.get("polling_url") or f"/videos/{job['id']}", secret)
        status = result.get("status")
        RECORD.write_text(json.dumps({"id": job["id"], "model": MODEL, "status": status, "usage": result.get("usage")}, indent=2))
        if status == "completed":
            break
        if status in ("failed", "cancelled", "expired"):
            print("Job ended:", status, "— no resubmission")
            return
        print("Status:", status)
        time.sleep(15)
    req = urllib.request.Request(result["unsigned_urls"][0], headers={"Authorization": "Bearer " + secret})
    with urllib.request.urlopen(req, timeout=300, context=CTX) as response:
        OUT.write_bytes(response.read())
    print("Saved:", OUT, "cost_usd:", result.get("usage", {}).get("cost"))


if __name__ == "__main__":
    main()
