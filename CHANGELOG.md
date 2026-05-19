# Changelog — mfmuniverse.com

All notable changes to the MFM Universe project. Mirrors the more strategic decision log in `entrepreneurial-os/manager/decision-log.md` and the project README at `entrepreneurial-os/projects/mfm-service/README.md`.

Format: each entry is dated, newest first. Same shape as Keep-a-Changelog but lighter.

---

## 2026-05-18 — Trends page redesign (absorbed into MFM Universe)

**Summary.** Brought the previously-external `trend-detector` deploy inside MFM Universe as a first-class page — `/trends`. Same data (Wikipedia velocity + TikTok + X + HF + GitHub), redesigned in the locked cream-blue v2 system used by Episodes and Guests (Fraunces / Inter / JetBrains Mono / Press Start 2P, light bg, primary-deep blue, tile accents, modal-for-detail). Home tile now points internally instead of out to `trend-detector-kappa.vercel.app`.

### Added
- `trends.html` — single static page. Renders triple-validated entities, TikTok/X-validated lanes, raw TikTok + X feeds, the AI builder ecosystem (HF + GitHub), buildable Wikipedia entities, and a compact "all Wikipedia trending" list. Source-filter pills (All / Wikipedia / TikTok / X / HF / GitHub) toggle section visibility. Entity click opens a modal with synthesis brief, velocity stats, pageview chart, startup angles, source posts, and a copy-to-clipboard brainstorm prompt for Claude.
- `data/trends-latest.json` — daily JSON snapshot, fetched by `trends.html` at runtime. Today's 5/18 snapshot is checked in (32 top entities, 13 buildable, 15 HF models, 8 HF datasets, 15 GitHub repos, 25 X trends, daily brief). Page renders with real content on first load; the refresh script keeps it fresh going forward.
- `data/trends-daily-brief.md` — daily morning brief markdown, fetched + rendered inline as a green-accent callout at the top of the page.
- `scripts/refresh-trends.sh` + `scripts/refresh-trends.js` — one-command refresh that reads `../trend-detector/data/processed/latest.json` + `daily-brief-latest.md`, trims, and writes to `data/`. The Node script trims pageview history to 14 days and sample_items to 5 per entity. Run after each trend-detector cron, then `git push` to redeploy.

### Changed
- `index.html` — Trend Detector tile now links internally to `/trends` (was external `trend-detector-kappa.vercel.app`). Arrow glyph switched from ↗ to →. Tile description and stats unchanged.
- `episodes.html`, `guests.html`, `app_pipeline.html` — added a "Trends" nav button to each page so navigation across the canon is symmetric.

### Notes for the operator
- `vercel.json`'s `cleanUrls: true` makes `/trends` resolve to `trends.html` with no extra config.
- Local preview note: the page uses `fetch('/data/trends-latest.json')` so opening via `file://` will show "no data loaded yet". Use `python3 -m http.server 8000` (or similar) from the repo root, then visit `http://localhost:8000/trends.html`. On Vercel it Just Works.
- Refresh cadence: trend-detector publishes data every morning at 7am ET. Running `bash scripts/refresh-trends.sh` is the only thing that updates the live page — there is no auto-pull. Hook into the trend-detector cron later if desired.

---

## 2026-05-18 — Launch instrumentation + newsletter signup

**Summary.** Launch day. The "newsletter coming soon" callout is now a real email-capture form, a modal popup catches engaged visitors at 60s or on exit-intent, and every page is wired to Vercel Web Analytics + Speed Insights with custom event tracking.

### Added
- `api/subscribe.js` — Vercel Serverless Function for newsletter signups. Validates email, forwards to beehiiv when `BEEHIIV_API_KEY` + `BEEHIIV_PUB_ID` env vars are set, falls back to a Resend notification (`RESEND_API_KEY` → email to OWNER_EMAIL), then to function-log capture so no submission is dropped while the provider is being wired.
- `assets/mfm-launch.css` — newsletter form + modal popup styles. Re-declares the locked v2 design tokens (cream-blue / deep-blue / white, Fraunces / Inter / JBM) under `--mfm-*` namespaces so it works on every page regardless of host token availability.
- `assets/mfm-launch.js` — analytics + popup + form layer:
  - Bootstraps `window.va`/`window.si` queues so events buffered before scripts load are not lost.
  - Exposes `window.mfm.track(name, props)` as the single chokepoint for custom events.
  - Auto-instruments **tile_click**, **outbound_click**, **scroll_depth** (25/50/75/100), and **page_view**. Form events: **newsletter_submit_attempt/success/error**. Popup events: **newsletter_popup_shown/dismissed** with trigger reason.
  - Injects the popup when the page opts in via `<body data-mfm-popup="newsletter">`. Triggers: 60s after pageload OR exit-intent (top-edge mouseout), whichever fires first. ESC + X + overlay click dismiss. 30-day localStorage suppression after dismiss; permanent after successful submit.

### Changed
- `index.html` — replaced the "Watch the repo →" placeholder CTA in the newsletter callout with a real `<form>` posting to `/api/subscribe`. Newsletter tile in the grid now smooth-scrolls to the form and focuses the input. Header stripe updated: "1 launching W19" → "1 newsletter (signup open)". Added Vercel Analytics scripts in `<head>`.
- `MFM_Episodes.html`, `MFM_Guest_Profiles.html` — wired Vercel Analytics + the launch asset bundle in `<head>`; opted into the popup via `<body data-mfm-popup="newsletter">`. Both already use the locked cream-blue v2 design system so the popup matches.
- `App_Pipeline.html` — wired Vercel Analytics only (popup deferred — this page still uses the older dark theme and is excluded until it's migrated to v2).

### Notes for the operator
- Vercel Analytics is cookieless, so no consent banner is required.
- Set `BEEHIIV_API_KEY` and `BEEHIIV_PUB_ID` as Vercel project env vars to start forwarding signups to beehiiv automatically — the client form does not need to change.
- Interim path: set `RESEND_API_KEY` (+ optional `OWNER_EMAIL`, `FROM_EMAIL`) to receive every submission as an email until beehiiv is configured.

---

---

## 2026-05-16 — Consolidation: v1.0

**Summary.** Merged the standalone `mfm-guest-tracker` repo into this one, archived all RPG/game/3D/intro work into `archive/`, deployed the site behind the custom domain `mfmuniverse.com` (DNS flip pending), and elevated this repo to be the public hub for the active MFM Service workstream against the secondary goal in `manager/contract.md`.

### Added
- `archive/rpg/` — preserves MFM_RPG.html, MFM_RPG_V2.html, MFM_Universe_Game.html (Three.js walker) so the RPG work isn't lost
- `archive/intros/` — preserves mfm_intro.html, silicon_valley_intro.html, GEMINI_VIDEO_PROMPT.md, Hero_Shots_Veo3_Prompts.md
- `archive/drafts/` — earlier draft of the hub (MFM_Universe_Web_index.html)
- `archive/_notes/EXCLUDED_BINARIES.md` — documents host-only files (4 MB mp4, blender_mcp_addon.py, mfm_universe_3d.html, silicon_valley_video.py)
- `logos/` — 10 brand SVGs (HubSpot, The Hustle, Got Junk, Morning Brew, RXBAR, Bebo, Milk Road, Hampton, beehiiv, Marquis Jet)
- `CHANGELOG.md` — this file

### Changed
- `index.html` — replaced the "MFM RPG" tile with a "Newsletter (coming W19)" placeholder + a "Coming soon" callout section. Tile grid is now 5 tiles where the 5th is the W19 ship target rather than an archived game.
- `MFM_Guest_Profiles.html` — removed the "🎮 PLAY RPG" header link (RPG moved to archive). Header subtitle date updated to "May 2026."
- `MFM_Episodes.html`, `Starter_Story.html`, `App_Pipeline.html` — removed the RPG nav-button.
- `README.md` — rewritten to reflect the consolidated scope and the active MFM Service workstream.

### Removed (from production paths — preserved in `archive/`)
- `MFM_RPG.html` (moved to `archive/rpg/MFM_RPG.html`)

### Deprecated
- The standalone `kylenzhong/mfm-guest-tracker` GitHub repo is now superseded by this repo. Its sole content (`index.html`, the 44-guest database) is functionally identical to `MFM_Guest_Profiles.html` here. Plan: mark the standalone repo archived on GitHub; leave the existing `mfm-guest-tracker.vercel.app` Vercel deploy running until Q3 review when redirect can be configured.

### Deployment
- Vercel project: `mfm-universe` (id `prj_HDR1PUpoZwkH9cItUXUb1GGiUkaF`, team `kylenzhongs-projects`)
- Production URL: https://mfm-universe.vercel.app
- Custom domain (Vercel-verified): `mfmuniverse.com`, `www.mfmuniverse.com`
- DNS at registrar (GoDaddy): pending. Need apex A record → `76.76.21.21`, www CNAME → `cname.vercel-dns.com`. Until flipped, the apex serves GoDaddy's parking page.

### Tracked in entrepreneurial-os
- Project README: `projects/mfm-service/README.md`
- Decision log: `manager/decision-log.md` 2026-05-16 entry
- Metrics proposal: `manager/reviews/2026-05-16-metrics-proposal-mfm-service.md`
- Journal: `manager/journal/2026-05-16.md`
- Source episode: MFM ep. 824 "A look inside how we actually run My First Million" — https://www.youtube.com/watch?v=D8pkn3dRO34

---

## Before 2026-05-16

Predecessor: the standalone `kylenzhong/mfm-guest-tracker` repo (Apr 2026) and an earlier `kylenzhong/mfm-universe` repo with an RPG-centric hub. Both folded into the consolidation above. See git history before commit `bc58162` for the pre-consolidation state.
