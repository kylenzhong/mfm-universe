---
title: MFM Universe — Graphics Pipeline
slug: graphics-pipeline
status: planning
last_updated: 2026-05-17
related:
  - Episodes_Redesign_Directions.md
  - ../entrepreneurial-os/projects/mfm-service/design-directions.md (v2 canonical)
  - poc-walkable-world/ (existing sprites — style anchor)
  - silicon_valley_video.py (existing code-driven graphic pipeline)
---

# MFM Universe — Graphics Pipeline

## Why this doc

Coding the episodes redesign is one Saturday. Producing the *art* to fill it — and the rest of the universe — is the actual bottleneck. This doc inventories every asset class across the project, estimates the manual cost, and lays out the API-driven alternatives so the production model is sustainable for one person.

## Full asset inventory

Grouped by surface. "Hero" = irreplaceable, must be on-brand. "Volume" = many copies, style consistency matters but quality bar is lower. "Chrome" = UI elements that should be code-generated, not drawn.

### A. Hero characters (Sam & Shaan)

| Asset | Count | Manual cost | Sustainability |
|---|---|---|---|
| Idle sprite | 2 | 1 hr | One-time |
| Walk cycle (4 frames each) | 8 | 4 hr | One-time |
| Reaction poses (clap, shrug, tipping-hat, laughing, eye-roll, thinking) | 12 | 4 hr | One-time, add later as needed |
| Speech-bubble template | 1 | 0.5 hr | One-time |

Subtotal: ~9.5 hr. **One-time cost.** Sam (`char_sam.png`) and Shaan (`char_shaan.png`) idle sprites already exist in `poc-walkable-world/public/assets/sprites/` — use those as the style anchor for everything else.

### B. Guest portraits (the deck)

| Asset | Count | Manual cost | Sustainability |
|---|---|---|---|
| Pixel portrait, ~96×96, consistent style | 30+ over the summer | 60 min each = 30+ hr | Recurring — 1-2 new portraits per week forever |

This is the asset class that **kills the manual approach**. 30 hr upfront + ~1 hr/wk recurring isn't sustainable solo. This is where the API pipeline matters.

Names already pending from the episode database: DHH, Bill Gurley, Steve Manning, Zach Yadegari, Sheel Mohnot, Pat Walls, Scott Galloway, MrBeast, Scooter Braun, Tyler Denk, Morgan Housel, Demis Hassabis, Jesse Itzler, Cathie Wood, Robert Greene, George Mack, Nick Mowbray, Brian Halligan, Amjad Masad. Plus ~15 more from earlier eps.

### C. Episode-card chrome (CSS, mostly code)

| Asset | Count | Manual cost | Sustainability |
|---|---|---|---|
| Card frame variants (solo / guest / classic-foil) | 3 | 2 hr total | One-time CSS |
| Topic chips, vote buttons, foil animation | many | 1 hr | One-time |

**This should be 100% code. No drawn art.** Holographic-foil = CSS gradient + mix-blend-mode.

### D. Founder-class signup badges

| Asset | Count | Manual cost | Sustainability |
|---|---|---|---|
| Founder-class portraits (Wantrepreneur, Indie Hacker, Operator × 2M + 2F) | 12 | 60 min each = 12 hr | One-time |
| Badge template with serial slot | 1 | 2 hr | One-time |
| PNG mint generator (HTML → PNG via Satori) | 1 | 2 hr | One-time, infinitely reusable |

API pipeline candidate for the 12 portraits.

### E. Newsstand / landing-page hero animation

| Asset | Count | Manual cost | Sustainability |
|---|---|---|---|
| Pixel bike (4-frame loop) | 1 | 1.5 hr | One-time |
| Newspaper (folded + unfurled) | 2 | 1 hr | One-time |
| Awning + rack | 1 | 1.5 hr | One-time |
| Robot mailman in mech-suit (weekly animation) | 1 | 3 hr | One-time, rotates contents |

### F. Walkable town (poc-walkable-world)

Already done — Kenney pack (free, public domain) + a handful of custom sprites already in `public/assets/sprites/`. Buildings, ground tiles, props all exist. New buildings (newsroom, satellite-base) can be code-drawn or AI-gen.

### G. 3D scene (MFM_Universe_Web)

Already done — `MFM_Universe_Web.glb` exists. New props can be generated on-demand via the **Blender MCP** (already loaded in this session) using Hunyuan3D or Hyper3D text-to-3D or image-to-3D. Zero manual modeling.

### H. Share PNGs (the virality wedge)

| Asset | Count | Manual cost | Sustainability |
|---|---|---|---|
| Founder badge PNG | template | 2 hr | One-time, generated per user |
| Taste-profile PNG (Wrapped-style) | template | 3 hr | One-time, generated per user |
| "I claimed Idea #N" tweet card | template | 1 hr | One-time |

**Code-driven via Satori or html-to-image.** Vercel's `@vercel/og` is the canonical stack. No drawn art needed.

### I. Cinematics

Existing `silicon_valley_intro.mp4` was generated via Python+PIL+ffmpeg (see `silicon_valley_video.py`). Same code-driven approach for any future intro. Veo3 / Gemini-video accessible via API if you want photorealistic.

## Manual-only total

Adding everything that can't be code-generated:

| Bucket | Hours |
|---|---|
| A. Sam+Shaan hero | 9.5 |
| B. 30 guest portraits | 30+ |
| D. 12 founder portraits | 12 |
| E. Newsstand hero animation | 7 |
| **Total v1** | **~58 hr** |
| **Recurring** | **~1 hr/wk** for new guest cards |

Not solo-sustainable. 58 hr = 8 working days. Plus the recurring 1 hr every Friday for the rest of the year.

## API options for prompt-driven generation

I checked the realistic landscape. Ranked by fit for this project:

### 1. Retro Diffusion — **best for pixel art specifically**

- Purpose-built pixel-art diffusion model
- REST API, ~$0.01 per image, pixel-perfect grid snap
- Style consistency via reference image upload
- Endpoint: `https://api.retrodiffusion.ai/v1/inferences`
- Pricing: 1,000 credits/$5 = ~$0.005/image

**Best fit for:** B (30 guest portraits), D (12 founder portraits), F (custom buildings)
**Cost for v1:** 42 images × $0.005 = **$0.21 total**, then ~$0.01/wk forever

### 2. Scenario.gg — **best for style consistency across many assets**

- Train a custom model on 10-20 reference sprites (your hero art)
- Generate 30+ portraits in *exactly* your style
- REST API + web UI
- ~$30/mo subscription + ~$0.01/generation
- 1-2 day style training upfront

**Best fit for:** when you need rigorous visual consistency across the full deck. Worth it once you've validated the deck mechanic.

### 3. OpenAI Images (gpt-image-1)

- Most accessible API (most people have an OpenAI key)
- ~$0.04 per HD image (1024×1024)
- Mediocre at true pixel art — better at "illustrated portrait" with pixel-y filter
- Style consistency: ok but drifts

**Best fit for:** prototyping. Use Retro Diffusion for production.

### 4. Replicate

- Hosts every open-source image model under one API
- Flux + pixel LoRA, Stable Diffusion XL + pixel-art-xl LoRA
- ~$0.003-0.01 per image
- Most flexible — can switch models mid-pipeline

**Best fit for:** advanced users who want to A/B different models. More setup.

### 5. Fal.ai

- Fastest inference (~1 sec)
- Same model selection as Replicate
- ~$0.005-0.01 per image
- Good for real-time / interactive generation

**Best fit for:** if you ever want generation triggered by user action (e.g., "generate my MFM avatar live").

### 6. Blender MCP (already loaded here)

- Hunyuan3D and Hyper3D text-to-3D + image-to-3D
- Direct call from this Cowork session — no key needed
- Output: GLB models for the 3D universe scene

**Best fit for:** any 3D asset, like new MFM-HQ buildings for the Three.js scene.

### 7. Hugging Face MCP (already loaded here)

- `mcp__e98da2ff__dynamic_space` can call any HF Space with model inference
- Several pixel-art spaces exist (`fffiloni/sd-pixel-art`, etc.)
- Free for low-volume use
- Direct call from this Cowork session — no key needed

**Best fit for:** zero-cost testing of pixel-art models before committing to a paid API.

## What I can do directly in this session

Without any new credentials:

- **Generate 3D models via Blender MCP** — buildings, props, scene additions
- **Call Hugging Face Spaces** — run pixel-art models from HF for free at low volume
- **Generate procedural art via Python + PIL** — the silicon_valley_video.py pattern
- **Generate UI chrome via CSS / SVG / Canvas** — all card frames, badges, vote buttons, share PNGs

With one new credential added to `~/Documents/Claude/Projects/.env`:

- **Retro Diffusion API key** (`RETRODIFFUSION_API_KEY=...`) → I run a batch script for all 30 portraits in ~5 min, ~$0.30
- **Replicate API token** (`REPLICATE_API_TOKEN=...`) → same, ~$0.10
- **OpenAI API key** (already likely in `.env`) → easy fallback for prototype quality

## Recommended hybrid pipeline

Three tiers by sustainability and quality requirements.

### Tier 1 — Hero art: manual, one-time

Sam + Shaan sprites with reactions. Either:
- **DIY in Aseprite** one Saturday (~10 hr) — you control the style
- **Outsource on Fiverr** ($150-300 for a complete sprite set) — faster, fixed cost
- **Generate, then hand-clean** with Retro Diffusion + 2 hr of polish

The two existing characters (`char_sam.png`, `char_shaan.png`) become the *style reference* for everything else.

### Tier 2 — Volume art: API-driven, scripted

30+ guest portraits + 12 founder portraits via **Retro Diffusion** or **Scenario**.

Write one script — `scripts/gen-portraits.js` — that:
1. Reads a CSV: `slug, name, prompt_extras, output_path`
2. Builds the full prompt with a locked style prefix (referencing the Sam/Shaan style)
3. Posts to whichever API backend is selected (swappable constant)
4. Saves to `public/assets/portraits/<slug>.png`

Total runtime: ~5 min for 42 portraits. Recurring: 1 new portrait per Friday = run the script with one new row.

### Tier 3 — Chrome: code-generated, no art needed

Card frames, badges, foil treatment, vote buttons, share PNGs — all CSS / SVG / Satori. The taste-profile share PNG is generated server-side per user via Vercel's `@vercel/og`. No drawn assets.

### Tier 4 — 3D + procedural: free MCPs

Buildings / props for the 3D scene: Blender MCP. Procedural backgrounds, animated intros: Python + PIL (the silicon_valley_video.py pattern).

## The portability principle

**Don't lock into one API.** Write the generation script with a swappable backend:

```js
// scripts/gen-portraits.js
const BACKEND = process.env.GEN_BACKEND || 'retro_diffusion';

const BACKENDS = {
  retro_diffusion: async (prompt, output) => { /* POST to RD */ },
  replicate:       async (prompt, output) => { /* POST to Replicate */ },
  openai:          async (prompt, output) => { /* POST to OpenAI Images */ },
  hf_space:        async (prompt, output) => { /* call HF Space via gradio */ },
};

for (const row of csv) {
  await BACKENDS[BACKEND](buildPrompt(row), row.output_path);
}
```

When Retro Diffusion gets worse or pricier, change one env var to switch backends. The CSV and prompt template don't move.

## Style-lock prompt template (draft)

The single most important thing for consistency. Locked prefix every portrait inherits:

```
A 96x96 pixel art portrait, front-facing, three-quarter angle, 16-color limited palette, hand-drawn in the style of GBA-era RPG character portraits, soft cream-blue background (#f7fafd), clean black 1px outline. Subject: <NAME>, <DESCRIPTOR>. Casual confident expression, professional but warm, no logos, no text.
```

Then per-subject extras: e.g. "DHH = bald, glasses, dark beard, Rails-orange t-shirt, late 40s." Stored in the CSV.

## What I'd do next if you greenlight

1. Write `scripts/gen-portraits.js` with the swappable-backend pattern + Retro Diffusion as default + the CSV format
2. Populate `data/portraits.csv` with all ~30 known guests + their descriptors
3. Run the script using whichever backend you have a key for (or hand off the script for you to run locally)
4. In parallel: build the episodes redesign in pure code with placeholder portrait boxes — the moment portraits land, swap them in

That gives you a sustainable production model for the rest of the year before we ship a single new card.

## HF Space direct-call bypass (2026-05-17)

**The MCP-level `invoke` is disabled (gradio=none) but you don't need it.** Every public HF Space exposes a Gradio REST API at `https://<owner>-<space>.hf.space/gradio_api/call/<fn>`. From the bash sandbox:

```bash
# Step 1: queue
RESP=$(curl -s -X POST "https://evalstate-flux1-schnell.hf.space/gradio_api/call/infer" \
  -H "Content-Type: application/json" \
  -d '{"data":["<prompt>", 99, false, 512, 512, 4]}')
EVENT_ID=$(echo "$RESP" | jq -r .event_id)

# Step 2: poll
curl -s "https://evalstate-flux1-schnell.hf.space/gradio_api/call/infer/$EVENT_ID"
```

Returns an SSE stream ending with `event: complete` + a URL to the generated image. **Total cost: $0. No auth.** Works for any public HF Space. This is the production-viable free path for v1.

Caveats:
- HF Spaces sleep on idle — first call has ~30s cold start
- ZeroGPU spaces are first-come first-served, can queue when busy
- Rate limits apply but are generous (single user load is fine)

## Side-by-side test (DHH)

Two tracks generated from one Flux call + post-processing:

| File | Style | How |
|---|---|---|
| `test-portraits/dhh_illustrated.png` | Illustrated pixel (TCG-card look) | Direct Flux Schnell output, 512×512 |
| `test-portraits/dhh_true_pixel.png` | True low-bit (chibi-matching) | Same Flux output → Pillow nearest-downscale to 96×96 → 16-color palette quantize → nearest-upscale to 512 |

Same source image, two visual languages. The post-process pipeline is 8 lines of Pillow — same script handles every portrait. **You don't need a separate pixel-art model.** Generate once at high resolution, branch into both tracks downstream.

## De-risk experiment (2026-05-17) — verdict

Ran one Pollinations Flux generation from the bash sandbox with the locked style prompt for Cathie Wood. Sample saved at `test-portraits/cathie-wood.png`. Two other attempts (DHH, Bill Gurley) failed to the free-tier queue limit (Pollinations is pivoting paid).

**Findings:**

1. The pipeline pattern (locked style prefix + per-subject descriptor + Flux) works. Output is recognizable, on-palette, low-cost.
2. The style that came back is **illustrated pixel-style portrait**, NOT the chibi 32×32 RPG sprite style of `char_sam.png`. Verdict: this is *better* for trading-card portraits — real TCG cards have detailed portraits, not chibi sprites. So we run two distinct style tracks:
   - **Track 1 — Chibi sprites** (Sam, Shaan, walkable-world NPCs): manual or Retro Diffusion with pixel-perfect grid snap. Style anchor = existing `char_sam.png`.
   - **Track 2 — Card portraits** (30+ guest deck cards, founder-class cards): illustrated pixel via Flux-class model. Style anchor = `test-portraits/cathie-wood.png`.
3. Free public endpoints will rate-limit you. Production path needs a key. Cheapest viable: Retro Diffusion ($0.005/img) or Replicate ($0.003-0.01/img). Full 42-portrait batch ≈ $0.30.

## Paid API access paths (when free isn't enough)

You may not need a paid API for v1 — the free HF Space direct-call path generated the DHH portrait above for $0. But if you hit limits, want speed, or want pixel-perfect grid snap, here are the concrete paths.

### Already likely wired in `~/Documents/Claude/Projects/.env`

Check first — Kyle's other projects may have already added one or more of these. If yes, the gen script just uses what's there.

- `OPENAI_API_KEY` — gpt-image-1, $0.04/HD image. Mediocre at pixel art, great at illustrated. ~$1.20 for 30 portraits.
- `GEMINI_API_KEY` / `GOOGLE_API_KEY` — used by silicon_valley_video.py? Worth checking. Imagen 4 = $0.02-0.04/image.
- `REPLICATE_API_TOKEN` — if Kyle has run any Replicate work before. ~$0.003-0.01/image, every Flux/SDXL model available.

### New keys, ranked by fit

| Provider | Sign-up | Cost/image | Pixel-art fit | Why pick |
|---|---|---|---|---|
| Replicate | replicate.com, credit card | $0.003-0.01 | Excellent (Flux + pixel LoRA) | Most flexible, can run any model |
| Retro Diffusion | retrodiffusion.ai, credit card | $0.005 | **Best** — purpose-built, grid-snap | True low-bit native, no post-process |
| Fal.ai | fal.ai, credit card | $0.005-0.01 | Excellent | Fastest (<1s), good for interactive gen |
| OpenAI Images | platform.openai.com | $0.04 | Mediocre | Easiest if you already have a key |
| Recraft | recraft.ai | $0.04 | Good (has pixel mode) | Cleanest pixel mode of the easy ones |
| Scenario.gg | scenario.gg, $30/mo | $0.01 + sub | Excellent + style-trainable | When you need rigorous style consistency across 30+ assets |

### What I'd recommend in order

1. **First** — check `.env` for existing keys. If `REPLICATE_API_TOKEN` exists, use it. Done.
2. **Otherwise** — sign up Replicate ($10 deposit lasts forever at this scale). Cheapest, most flexible.
3. **For Sam/Shaan extension sprites only** (when you DIY the base set and want auto-generated reactions later) — Retro Diffusion. Its pixel-grid snap is unmatched.
4. **Skip OpenAI Images** unless that's the only key you have. $0.04/image × 42 portraits = $1.68, vs Replicate at $0.13. 13× cost difference for the same job.

### Where the key goes

```bash
# ~/Documents/Claude/Projects/.env
REPLICATE_API_TOKEN=r8_...
# or
RETRODIFFUSION_API_KEY=rd_...
```

The gen script (`scripts/gen-portraits.js`, to be written) reads `process.env.GEN_BACKEND` to pick which one to call. Switch backends by changing one env var.

### Blender MCP (already loaded, currently dormant)

For 3D assets in `MFM_Universe_Web/`: open Blender locally, activate the MCP addon, and I can drive Hunyuan3D / Hyper3D text-to-3D from inside this session. Both require their own API keys (Hyper3D Rodin and Hunyuan3D both bill per generation, similar pricing to Replicate). Not relevant to the 2D portrait pipeline; useful if you ever want to add new buildings or props to the 3D scene.

## Open decisions (post-experiment)

1. Two style tracks confirmed (chibi for sprites, illustrated for cards). Sign off?
2. Production API for card portraits: Retro Diffusion (best pixel fidelity), Replicate (most flexible), or a Flux Schnell key via Replicate/Fal (matches the de-risk output)?
3. Hero sprite plan = **DIY Aseprite, one Saturday** (already confirmed). Style sheet ready when Kyle is.
4. Founder-class portraits — 12 distinct, or 4 base + recolor? Recommend 4 base + recolor for tighter consistency.
