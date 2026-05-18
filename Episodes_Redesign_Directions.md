---
title: MFM Episodes Page — Redesign Directions
slug: episodes-redesign-directions
status: brainstorm
last_updated: 2026-05-17
related:
  - ../entrepreneurial-os/projects/mfm-service/design-directions.md (v2 canonical)
  - ../entrepreneurial-os/projects/mfm-service/commenter-profile.md
  - poc-walkable-world/ (interactive-world POC)
  - MFM_Universe_Web/ (3D scene)
  - MFM_RPG_V2.html (pixel RPG)
---

# MFM Episodes Page — Redesign Directions

## Current state (the problem)

`MFM_Episodes.html` is the most "encyclopedia" surface in the universe. Dark cosmic palette (held over from v1), gold/purple cards, search + filter chips, click-to-modal. It works as a database. It does not match the v2 brand (light-blue, screenshotable, theme-park-not-website). It is the *flattest* page in an otherwise interactive world.

The redesign goal: bring it into the v2 language and give the audience a reason to *play* with it — not just look something up.

## Constraints from v2 design-directions

- Light cream-blue palette (`#f7fafd / #4a9fff / #0d4a8c`), pixel art only where it adds personality
- "Optimize for the screenshot, not the session" — every fold produces a copy-paste-able artifact
- "Insider identity, not learner identity" — backstage > tutorial
- Self-disclosure rituals — badges, decks, taste profiles
- Reuses existing mechanics: 3-way vote, card collection, weekly challenge, Sam/Shaan mascots

## Six directions

Two axes: **UI** (how it looks / spatial metaphor) and **UX** (what you can do with it). Most strong redesigns combine one of each.

---

### UI option 1 — Trading-card grid (TCG aesthetic)

Each episode is rendered as a **Pokémon-style card**:

- Episode # as set-number ("S08/#807")
- Pixel portrait of the guest (or Sam+Shaan crest for solos)
- Title in deep-blue display type
- 3 "key idea" bullets shown as ability lines
- Stat block — Sam-rating / Shaan-rating / Length / Year (JetBrains Mono, bro-data-porn vibe)
- Rarity badge for `classic: true` episodes (foil treatment, sparkle)
- Topic chips as type icons
- Hover = card tilts and lifts; click = flips to back showing quotes + listen links

Why it works: directly extends Mechanic #2 (Pokey deck for guests) to episodes themselves. The episode page becomes the *master collection*. Already screenshotable.

**Complexity:** Medium. Mostly CSS + a card template. Reuses the v2 palette.

---

### UI option 2 — The Newsstand rack (matches v2 metaphor literally)

Episodes laid out as a horizontal newspaper rack — front pages tilted at 15°, peeking out of stacks, with a pixel newsstand awning at the top. Scroll horizontally past the rack; click a paper to pull it out and "read."

- Latest issue is the headline-up-top broadsheet
- Older issues are tucked behind, only the masthead + cover headline visible
- Classic episodes get a "BEST OF" sticker
- Sam pixel sprite at the corner of the rack, occasionally rearranging

Why it works: this is the **literal** instantiation of "The Cosmic Newsstand" brand. Every other v2 surface implies the metaphor; this one *is* it.

**Complexity:** Medium-high. Custom layout, horizontal-scroll snapping, but no new mechanics.

---

### UI option 3 — Subway map / network graph

Episodes as a force-directed graph:

- Nodes sized by classic-ness, colored by year
- Edges connect episodes that share a guest, topic, or callback ("Shaan referenced ep 401 in ep 754")
- Pinch-zoom, drag, click a node to focus and pin a detail panel
- Topic filter highlights a subgraph; year filter dims the rest
- Path-finder: pick two episodes, get the "MFM lineage" between them

Why it works: gives the parasocial superfan a **map of the canon they can claim mastery over**. "I've heard everything in the Hampton cluster" is a flex. Plus it surfaces hidden relationships nothing else does.

**Complexity:** High. d3-force or cytoscape, plus the data wiring for edges. But it's a *huge* one-screen wow.

---

### UX layer A — Tinder for the canon ("rate the canon")

Stack interaction. Each episode card pops up center-screen and you swipe / tap one of three:

- **Classic** (left) — adds it to your "best of" deck
- **Mid** (down) — silent
- **Overrated** (right) — public hot-take

After voting, see the community tally and which guests/topics correlate with your rating pattern. Build a "taste profile" badge: *Kyle's MFM Taste — 64% Operator-leaning, hates AI panels.* Tweetable.

Why it works: extends Mechanic #1 to episodes. Solves the "I've heard 800 episodes, which were the best?" problem socially. Cheap dopamine loop. Generates a leaderboard ("most-classic ranked episodes" → editorial gold).

**Complexity:** Low. Same Supabase votes table the idea vote uses.

---

### UX layer B — Listen-checking + Spotify-Wrapped profile

Add a checkbox to every card. Mark the eps you've heard. Site computes:

- "You've heard 247 / 800. Top 8% of listeners."
- Top guest you keep returning to
- Topic histogram (your "MFM taste DNA")
- Streak: "Listened every Friday for 14 weeks"
- Sharable PNG card with your stats — *the artifact*

Why it works: turns passive consumption into identity. The comment data showed obsessive self-disclosure ("top 1% listener", "Joined on Ep 824") — give them the actual measurement. Pairs with the deck.

**Complexity:** Medium. Needs auth + a `listens` table. The PNG generator is reusable from the badge mint.

---

### UX layer C — Sam & Shaan react to your cursor

Two pixel sprites in the footer that **comment on whatever you hover**:

- Hover an AI episode → "Shaan: I had a take but it left my brain"
- Hover a DHH episode → "Sam: gonna build my next thing in Rails just to piss DHH off"
- Hover a Hampton-era episode → both look at each other
- Idle for 30s → they bicker

A CSV of `{episode_id | sam_line | shaan_line}` powered by a one-time Claude pass (~30 min). The page feels alive without being noisy.

Why it works: directly serves the comment-data finding that the audience cares about the hosts more than the business content. Free background entertainment. Costs nothing once seeded.

**Complexity:** Low.

---

### UX layer D — "What's your mood?" entry

Replace dry filter chips with a single hero question on load:

> **What do you need right now?**
> · Kick in the ass (motivation/agency solos)
> · A billionaire's playbook (wealth eps)
> · Something to steal (idea-of-the-week eps)
> · Make me feel something (Sam/Shaan personal)
> · Surprise me (random)

Click → grid re-renders pre-filtered, with an episode-of-the-day slot machine front and center: 3 reels (year × type × topic) spin once a day, give you a curated single pick.

Why it works: solves the "800 episodes, which one tonight?" problem in the *bro-warm* tone. Voice match for the brand. Daily-pull mechanic = retention.

**Complexity:** Low-medium.

---

## Recommended combo

Pick UI option 1 (**TCG card grid**) + UX layer A (**rate-the-canon swipe**) + UX layer C (**reactive Sam/Shaan**) + UX layer D (**mood-based entry**).

Reasoning:
- Card UI ties directly into the deck mechanic from v2 — episodes and guests live in the same visual language
- Rate-the-canon reuses the vote infrastructure, generates a taste-profile artifact, fixes the "what's worth listening to" problem
- Reactive mascots cost ~$0 and serve the parasocial demand the comment data found
- Mood entry replaces the boring filter row with something on-brand at zero cost
- Skips the high-complexity options (subway map, listen-tracking auth) for v1 — both are obvious v2 extensions later
- Skips the newsstand metaphor at the *episodes* level because the landing page already uses it; doubling up flattens the visual hierarchy

Defer to a later cut:
- Subway map → ship as a `/canon-map` standalone page once there's voting data to weight edges
- Listen-checking → after Supabase auth is wired for the deck anyway, this is a 2-hour add
- Newsstand rack → could replace the *landing* page episode tease, not this page

## Ship cost (rough)

| Block | Time |
|---|---|
| Repalette current page to v2 light-blue | 0.5 hr |
| Rebuild card markup as TCG (front + flip-back) | 2 hr |
| Pixel guest-portrait placeholders (10 cards now, manual; rest auto-later) | 1.5 hr |
| Mood entry + slot-machine daily pick | 1 hr |
| Rate-the-canon swipe modal + Supabase votes | 1.5 hr |
| Reactive Sam/Shaan footer + 50-line CSV (Claude-generated) | 1 hr |
| Polish + share-PNG for taste profile | 1 hr |

~8.5 hours. Fits in one Saturday.

## Open questions

1. Card aspect — TCG-vertical (63×88mm ratio) or square (Spotify-Wrapped feel)? Vertical screenshots better on phones; square crops cleaner for Twitter.
2. Do classics get a *foil* treatment (animated holographic CSS) or just a sticker? Foil is the wow, but +1 hr.
3. Do we want listening-progress bars on each card from day 1 (if so, need auth) or just the social vote layer?
4. Subway-map page — is that a v2 candidate worth committing to a separate weekend, or does it die quietly?
