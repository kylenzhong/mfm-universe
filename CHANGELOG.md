# Changelog — mfmuniverse.com

All notable changes to the MFM Universe project. Mirrors the more strategic decision log in `entrepreneurial-os/manager/decision-log.md` and the project README at `entrepreneurial-os/projects/mfm-service/README.md`.

Format: each entry is dated, newest first. Same shape as Keep-a-Changelog but lighter.

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
