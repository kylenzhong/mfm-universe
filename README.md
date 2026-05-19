# MFM Universe

The public hub for the **MFM Service** workstream — useful tools and content for the *My First Million* podcast audience, built by a longtime listener.

**Live**: https://mfmuniverse.com (DNS flip pending) · https://mfm-universe.vercel.app

## What's here

A single static site hosting five complementary views over MFM and its sibling Starter Story:

| Page | What |
|---|---|
| [`index.html`](index.html) | The hub. Tiles routing to each tool. |
| [`episodes.html`](episodes.html) | Curated episode database. 39 episodes with key ideas, topics, guest tags. Search + filter. |
| [`guests.html`](guests.html) | 44 notable MFM guests. Net worth, companies founded, quotes, contrarian takes, episode appearances. The canonical guest database. |
| [`trends.html`](trends.html) | Daily multi-source trend signal — Wikipedia velocity cross-validated against TikTok, X, HuggingFace, GitHub. Data refreshes via `scripts/refresh-trends.sh`. |
| [`app_pipeline.html`](app_pipeline.html) | A 4-stage Source → Validate → Build → Launch framework with a worked example. |

Plus a "Newsletter (coming W19)" placeholder tile and signup section on `index.html` — the W19 ship target for the umbrella workstream.

## Why this exists

This repo is the public surface of an active workstream against the secondary goal in `entrepreneurial-os/manager/contract.md`: **strike a collaboration with a successful entrepreneur — ideally MFM-affiliated — by end of 2026**.

The contract was amended on 2026-05-16 to elevate MFM outreach from passive to active for Q3-Q4 2026, with verified newsletter subscribers as the north-star activity metric. The episode that triggered this — MFM ep. 824 "A look inside how we actually run My First Million" — explicitly named clipping, a newsletter, and live events as the three audience-building lanes the hosts want more of. This site is the surface that the newsletter sits on, the comments-outreach links to, and the future MFM-circle conversation can point at.

## Stack

Pure static HTML + CSS + JavaScript. No build step. No framework. Deploys via Vercel with `vercel.json` doing zero-config static hosting.

## Archive (`archive/`)

Earlier experiments preserved in git history but not served from production:

- `archive/rpg/` — MFM_RPG.html (pixel-art RPG), MFM_RPG_V2.html (extended version), MFM_Universe_Game.html (Three.js first-person walk-around city)
- `archive/intros/` — animated text/HBO-style intros + Veo3/Gemini video generation prompts
- `archive/drafts/` — earlier hub drafts
- `archive/_notes/EXCLUDED_BINARIES.md` — 4 files preserved on Kyle's host filesystem (the 4 MB mp4, plus a Blender add-on and two scripts the bind-mount layer wouldn't copy on 2026-05-16); restore instructions included

## Cross-references

- **Project tracking + decision history**: `entrepreneurial-os/projects/mfm-service/README.md`
- **Strategic context**: `entrepreneurial-os/manager/strategy.md` (Stream 4 — MFM outreach, active)
- **Contract**: `entrepreneurial-os/manager/contract.md` (last amended 2026-05-16, Q3-Q4 MFM focus)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

## Updating data

Each `.html` page has its data inline as a `const X = [...]` JavaScript array near the bottom. Add an entry, commit, push — Vercel rebuilds in ~30s. See the canonical field schemas:

- **Guests**: see `MFM_Guest_Profiles.html` — fields: `name, tagline, networth, tier, avatarColor, avatarText, tags, knownFor, bio, timeline, portfolio, quotes, episodes, contrarian, socials`
- **Episodes**: see `MFM_Episodes.html` — fields: `num, title, type, date, guests, topics, insight, keyIdeas`
- **Starter Story**: see `Starter_Story.html` — its own schema

## Local dev

```
open index.html
```

That's it. Open in browser. No tooling needed.

## License + relationship to MFM

Not affiliated with My First Million, Starter Story, Sam Parr, Shaan Puri, or Pat Walls — this is a fan project. Built for utility, in the open, with the explicit intention that the MFM team is welcome to use any of it however they want.
