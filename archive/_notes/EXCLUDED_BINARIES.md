# Files not committed — preserved on Kyle's host filesystem

The following files exist in the original `~/Documents/Claude/Projects/MFM Universe/`
working folder but are NOT committed to this repo. They are either too large for the
repo (4 MB video) or the bind-mount layer between the sandbox and Kyle's filesystem
refused reads on them during the 2026-05-16 consolidation run.

The originals are intact on Kyle's Mac. To complete the archive, run from a normal
terminal session on Kyle's machine:

```bash
cd ~/Documents/Claude/Projects/MFM Universe
REPO=~/path/to/mfm-universe   # the cloned repo
cp blender_mcp_addon.py        $REPO/archive/rpg/
cp mfm_universe_3d.html        $REPO/archive/rpg/
cp silicon_valley_video.py     $REPO/archive/intros/
# silicon_valley_intro.mp4 stays out — too big for git
cd $REPO
git add archive/rpg/blender_mcp_addon.py archive/rpg/mfm_universe_3d.html \
        archive/intros/silicon_valley_video.py
git commit -m "archive: add remaining files (Blender add-on, 3D scene, video generator script)"
git push
```

## Files not committed

| File | Size | Reason | Original path |
|---|---:|---|---|
| `silicon_valley_intro.mp4` | 4.0 MB | Too large for git; binary video output | `~/Documents/Claude/Projects/MFM Universe/silicon_valley_intro.mp4` |
| `blender_mcp_addon.py` | 112 KB | Bind-mount refused reads | `~/Documents/Claude/Projects/MFM Universe/blender_mcp_addon.py` |
| `mfm_universe_3d.html` | 36 KB | Bind-mount refused reads | `~/Documents/Claude/Projects/MFM Universe/mfm_universe_3d.html` |
| `silicon_valley_video.py` | 23 KB | Bind-mount refused reads | `~/Documents/Claude/Projects/MFM Universe/silicon_valley_video.py` |

## What WAS committed

- `archive/rpg/MFM_RPG.html` (82 KB) — pixel-art RPG, full version
- `archive/rpg/MFM_RPG_V2.html` (204 KB) — v2 pixel-art RPG with extended scenes
- `archive/rpg/MFM_Universe_Game.html` (22 KB) — Three.js first-person walk-around city
- `archive/intros/mfm_intro.html` (48 KB) — animated text intro
- `archive/intros/silicon_valley_intro.html` (22 KB) — HBO-style isometric city intro
- `archive/intros/GEMINI_VIDEO_PROMPT.md` (7 KB) — Veo3/Gemini generation prompts
- `archive/intros/Hero_Shots_Veo3_Prompts.md` (9 KB) — Hero shot prompts
- `archive/drafts/MFM_Universe_Web_index.html` (8 KB) — earlier draft of the hub
- `logos/*.svg` — 10 brand logos (HubSpot, The Hustle, Got Junk, Morning Brew, RXBAR, Bebo, Milk Road, Hampton, beehiiv, Marquis Jet)

If `blender_mcp_addon.py`, `mfm_universe_3d.html`, or `silicon_valley_video.py` are ever needed in a Cowork session, copy them manually using the snippet above and push — the bind-mount issue is intermittent and per-file.
