"""
MFM Universe — Portrait Generator
Generates illustrated-pixel portraits for the deck-card mechanic.

Backend: evalstate/flux1_schnell on Hugging Face (free, no auth) via direct Gradio REST.
Reads portraits.csv, generates one image per row to test-portraits/<slug>.png.

Run: python3 scripts/gen_portraits.py
Verify: ls test-portraits/

Designed to be re-runnable — skips slugs that already exist.
Swap BACKEND constant to retarget Replicate / Retro Diffusion / OpenAI / etc.
"""
import csv, json, os, sys, time, urllib.request, urllib.error
from pathlib import Path

# ─── Config ─────────────────────────────────────────────────────────────────
BACKEND = os.environ.get("GEN_BACKEND", "hf_flux_schnell")
SCRIPT_DIR = Path(__file__).resolve().parent
ROOT = SCRIPT_DIR.parent
CSV_PATH = Path(os.environ.get("PORTRAITS_CSV", ROOT / "data" / "portraits.csv"))
OUT_DIR = Path(os.environ.get("PORTRAITS_OUT", ROOT / "portraits"))
OUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE_PREFIX = (
    "Pixel art portrait card, GBA-era JRPG character portrait style, "
    "limited 16-color palette, soft cream-blue background, "
    "clean 1px black outline, professional but warm expression, "
    "three-quarter front-facing angle, no text, no logos. Subject: "
)

# ─── Backend: HF Flux Schnell (free, via direct Gradio REST) ────────────────
def gen_hf_flux_schnell(prompt: str, seed: int, out_path: Path) -> bool:
    """Submit + poll evalstate/flux1_schnell via /gradio_api/call/infer."""
    space = "https://evalstate-flux1-schnell.hf.space"
    submit_url = f"{space}/gradio_api/call/infer"
    body = json.dumps({"data": [prompt, seed, False, 512, 512, 4]}).encode()
    req = urllib.request.Request(
        submit_url, data=body, headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            event_id = json.loads(resp.read()).get("event_id")
    except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError) as e:
        print(f"  submit failed: {e}")
        return False
    if not event_id:
        print(f"  no event_id returned")
        return False
    # Poll the SSE stream
    poll_url = f"{space}/gradio_api/call/infer/{event_id}"
    try:
        with urllib.request.urlopen(poll_url, timeout=60) as resp:
            raw = resp.read().decode()
    except (urllib.error.URLError, urllib.error.HTTPError) as e:
        print(f"  poll failed: {e}")
        return False
    # Parse the SSE — find the last data: line under event: complete
    image_url = None
    in_complete = False
    for line in raw.split("\n"):
        if line.startswith("event: complete"):
            in_complete = True
        elif in_complete and line.startswith("data:"):
            try:
                payload = json.loads(line[5:].strip())
                # payload = [{"path":..., "url":..., ...}, "Seed used..."]
                image_url = payload[0].get("url")
                break
            except (json.JSONDecodeError, IndexError, KeyError):
                continue
    if not image_url:
        print(f"  no image url in SSE: {raw[:200]}")
        return False
    # Download
    try:
        webp_bytes = urllib.request.urlopen(image_url, timeout=30).read()
    except (urllib.error.URLError, urllib.error.HTTPError) as e:
        print(f"  download failed: {e}")
        return False
    tmp = out_path.with_suffix(".webp")
    tmp.write_bytes(webp_bytes)
    # Convert webp → png
    try:
        from PIL import Image
        Image.open(tmp).convert("RGB").save(out_path)
        tmp.unlink()
    except Exception as e:
        print(f"  conversion failed: {e}")
        return False
    return True


# ─── Backend: Pollinations Flux (free, no auth) ─────────────────────────────
def gen_pollinations(prompt: str, seed: int, out_path: Path) -> bool:
    """GET https://image.pollinations.ai/prompt/<urlencoded>?... returns JPEG bytes."""
    import urllib.parse
    encoded = urllib.parse.quote(prompt)
    url = (f"https://image.pollinations.ai/prompt/{encoded}"
           f"?width=512&height=512&model=flux&nologo=true&seed={seed}")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (curl) MFM-Universe portrait-gen/1.0"
    })
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
    except (urllib.error.URLError, urllib.error.HTTPError) as e:
        print(f"  fetch failed: {e}")
        return False
    # Pollinations sometimes returns JSON errors when rate-limited
    if data[:1] == b"{":
        msg = data[:200].decode("utf-8", errors="replace")
        print(f"  pollinations error: {msg[:120]}")
        return False
    # Save as PNG (Pollinations sends JPEG but PIL can re-save)
    tmp = out_path.with_suffix(".jpg")
    tmp.write_bytes(data)
    try:
        from PIL import Image
        Image.open(tmp).convert("RGB").save(out_path)
        tmp.unlink()
    except Exception as e:
        print(f"  conversion failed: {e}")
        return False
    return True


# ─── Backend: Replicate (Flux Schnell — paid, ~$0.003/image) ────────────────
def gen_replicate(prompt: str, seed: int, out_path: Path) -> bool:
    """POST to api.replicate.com using black-forest-labs/flux-schnell.
    Requires REPLICATE_API_TOKEN env var. Returns URL → downloads → saves PNG."""
    token = os.environ.get("REPLICATE_API_TOKEN")
    if not token:
        print("  REPLICATE_API_TOKEN not set")
        return False
    # Use the `Prefer: wait` header for synchronous-ish behavior (up to 60s)
    body = json.dumps({
        "input": {
            "prompt": prompt,
            "aspect_ratio": "1:1",
            "num_outputs": 1,
            "output_format": "png",
            "output_quality": 90,
            "num_inference_steps": 4,
            "go_fast": True,
            "megapixels": "0.25",  # ~512x512
            "seed": seed,
        }
    }).encode()
    # Submit with 429 retry. Free-tier limit under $5 credit is 6 req/min,
    # burst-of-1 — so a single concurrent burst will 429. Retry with the
    # Retry-After header if present, else fall back to a 60s wait.
    max_retries = int(os.environ.get("REPLICATE_MAX_RETRIES", "4"))
    result = None
    for attempt in range(max_retries + 1):
        req = urllib.request.Request(
            "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
            data=body,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "Prefer": "wait=55",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read())
            break  # success
        except urllib.error.HTTPError as e:
            err_body = e.read()[:200].decode()
            if e.code == 429 and attempt < max_retries:
                # Parse Retry-After (seconds) — Replicate sends it on 429
                try:
                    retry_after = int(e.headers.get("Retry-After", "60"))
                except (TypeError, ValueError):
                    retry_after = 60
                retry_after = max(10, min(retry_after, 120))  # clamp 10–120s
                print(f"  HTTP 429 throttled — waiting {retry_after}s "
                      f"(retry {attempt + 1}/{max_retries})")
                time.sleep(retry_after)
                continue
            print(f"  submit HTTP {e.code}: {err_body}")
            return False
        except (urllib.error.URLError, json.JSONDecodeError) as e:
            print(f"  submit failed: {e}")
            return False
    if result is None:
        print(f"  submit failed after {max_retries} retries")
        return False
    # Poll if not yet ready (with Prefer: wait, usually we get output in the first response)
    pred_id = result.get("id")
    status = result.get("status")
    output = result.get("output")
    if status not in ("succeeded", "failed", "canceled") and pred_id:
        # Poll up to 30s more
        for _ in range(15):
            time.sleep(2)
            poll_req = urllib.request.Request(
                f"https://api.replicate.com/v1/predictions/{pred_id}",
                headers={"Authorization": f"Bearer {token}"},
            )
            try:
                with urllib.request.urlopen(poll_req, timeout=10) as r:
                    result = json.loads(r.read())
                status = result.get("status")
                output = result.get("output")
                if status in ("succeeded", "failed", "canceled"):
                    break
            except Exception as e:
                print(f"  poll err: {e}")
                continue
    if status != "succeeded":
        err = result.get("error") or "unknown"
        print(f"  prediction status={status} err={err}")
        return False
    # Output is either a single URL string or a list
    image_url = output if isinstance(output, str) else (output[0] if output else None)
    if not image_url:
        print(f"  no output URL in result")
        return False
    try:
        png_bytes = urllib.request.urlopen(image_url, timeout=30).read()
    except Exception as e:
        print(f"  download failed: {e}")
        return False
    out_path.write_bytes(png_bytes)
    return True


# ─── Backends registry ──────────────────────────────────────────────────────
BACKENDS = {
    "pollinations":    gen_pollinations,
    "hf_flux_schnell": gen_hf_flux_schnell,
    "replicate":       gen_replicate,
    # "retro_diffusion": gen_rd,    # stub: needs RETRODIFFUSION_API_KEY
    # "openai": gen_openai,         # stub: needs OPENAI_API_KEY
}

# Per-backend pacing (seconds between requests in the main loop).
# Replicate free tier under $5 credit = 6 req/min with burst-of-1 → ≥10s.
# Default 12s leaves a safety margin. Override with RATE_DELAY env var.
DEFAULT_DELAYS = {
    "pollinations":    2,
    "hf_flux_schnell": 2,
    "replicate":       12,
}


# ─── Main loop ──────────────────────────────────────────────────────────────
def main():
    if not CSV_PATH.exists():
        print(f"ERROR: {CSV_PATH} not found")
        sys.exit(1)
    if BACKEND not in BACKENDS:
        print(f"ERROR: unknown backend '{BACKEND}'. Choices: {list(BACKENDS)}")
        sys.exit(1)
    gen = BACKENDS[BACKEND]

    rows = list(csv.DictReader(CSV_PATH.open()))
    print(f"Loaded {len(rows)} rows from {CSV_PATH.name}")
    print(f"Backend: {BACKEND}")
    print(f"Output: {OUT_DIR}")
    print()

    successes, skips, failures = 0, 0, 0
    limit = int(os.environ.get("PORTRAITS_LIMIT", "0"))  # 0 = no limit
    delay = int(os.environ.get("RATE_DELAY", DEFAULT_DELAYS.get(BACKEND, 2)))
    print(f"Pacing: {delay}s between requests (set RATE_DELAY to override)")
    print()
    for i, row in enumerate(rows, 1):
        if limit and successes >= limit:
            print(f"Hit limit={limit}, stopping early")
            break
        slug = row["slug"]
        name = row["name"]
        descriptor = row["descriptor"]
        out_path = OUT_DIR / f"{slug}.png"
        if out_path.exists():
            print(f"[{i}/{len(rows)}] {slug}: SKIP (already exists)")
            skips += 1
            continue
        prompt = f"{STYLE_PREFIX}{name}, {descriptor}."
        seed = 42 + i  # deterministic per-row variation
        print(f"[{i}/{len(rows)}] {slug}: generating ({len(prompt)} chars)...")
        t0 = time.time()
        ok = gen(prompt, seed, out_path)
        dt = time.time() - t0
        if ok:
            print(f"  → done in {dt:.1f}s")
            successes += 1
        else:
            print(f"  → FAILED after {dt:.1f}s")
            failures += 1
        # Pace per backend (see DEFAULT_DELAYS). Skip the wait after the
        # last row so we don't add a pointless tail.
        if i < len(rows) and (not limit or successes < limit):
            time.sleep(delay)

    print()
    print(f"Complete: {successes} new · {skips} skipped · {failures} failed")
    print(f"Total in {OUT_DIR}: {len(list(OUT_DIR.glob('*.png')))} portraits")


if __name__ == "__main__":
    main()
