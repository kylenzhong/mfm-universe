# Backrooms didn't peak — week 2 daily Wikipedia traffic is *up* from opening weekend, and Kane Parsons is still a top-40 person globally; the creator-to-IP pipeline just stopped being a one-weekend story

*Daily Trend Brief · Monday, June 1, 2026*

*Pipeline note: SIXTH consecutive run with the workspace mount poisoned (EDEADLK on the virtiofs read path; every ESM module-load dies with `Unknown system error -35`). Only `wikipedia.mjs` completed today — and only because the script was lifted out of the mount into /tmp. `latest.json`, `ai-use-cases.json`, `mfm-guest-matches-latest.json`, and `headline-chart-data.json` are now **11 days stale** (frozen May 21). This brief layers today's fresh Wikipedia signal on the standing May 21 quant. The mount fix is no longer an aside — it's the only thing standing between this brief and an actual quantitative product. Six runs of "the data layer didn't run" is the de facto state, not an incident.*

## TL;DR

- **Backrooms didn't peak Sunday.** Wikipedia 7-day average just moved from 414K/day (yesterday's #3) to 460K/day (today's #3, velocity 10.8x). Kane Parsons himself is rank #39 with 75K/day and velocity 7.5x — the *person* is holding in his second week, not just the film. The creator-IP-to-theatrical pipeline now has the metric that actually matters: retention, not opening. A24's $10M / $90M opening is no longer a fluke worth a tweet — it's a reproducible pipeline worth a thesis.
- **PSG won the UEFA Champions League Saturday.** Iraola (rank 6, 255K, 6.2x), Luis Enrique (rank 11, 171K), 2026 UCL final (rank 27, 92K), List of UCL finals (rank 7, 219K) — five of today's top 12 are UCL fallout. Not MFM-actionable on its own. The useful read: event-driven consumer attention still flows to a 70-year-old sports format, and Backrooms is *still* outranking every single one of them on a non-tournament weekend. The creator wedge isn't losing share — it's holding above the loudest possible noise floor.
- **What's noise:** Claude Lemieux (rank 15, 401x velocity — almost certainly a death; sad, not a market signal). The UCL constellation in general (interesting for coffee, not for what to build). ChatGPT (#31, 84K, velocity 1.5x — flat for the fourth straight week; the consumer LLM brand isn't going anywhere but isn't surging either — useful baseline, not signal).

## Top 3 buildable opportunities

The three standing opportunities held through *six* broken-data runs in a row. Today's Backrooms week-2 retention sharpens the "creator → IP pipeline tooling" bench candidate (#4) one more notch, but it's not yet promoted. Two consecutive weeks of holding is a pattern; three is a category. Re-evaluate next Sunday.

### 1. The Character.AI off-ramp — persona portability at peak intent

- **What / stage** — static "Leaving Character.AI?" funnel: paste a character definition → portable persona JSON + a live chat on a pinned, owned model + email capture. Consumer AI companion / portability. Exodus is live; no incumbent owns the off-ramp.
- **Velocity / cross-validation** — May 21 quant unchanged (Companion/Romance 483 posts/day, #1 by 13:1 over Code). Last week's Anthropic + Google + Broadcom multi-gigawatt deal + Anthropic's $30B run-rate disclosure + the explicit ad-free recommitment are still the credibility floor. PA task force still in active discovery on the Emilie / unlicensed-medicine suit (filed May 5; preliminary injunction sought).
- **Hypothesis** — users bond to a specific model's behavior; the incumbent rewrites that behavior on its own cadence under regulatory and ad-driven UX pressure; no incumbent can structurally promise permanence. Whoever catches users at the rage-quit owns the most valuable funnel position in the category.
- **MVP** — single static page: paste-a-character → persona JSON + pinned Opus 4.8 chat (now backed by *Anthropic + Google + Broadcom multi-gigawatt compute*, which is the credibility line on the page) + "one-click import coming" capture. One day to build. **Sixth brief in a row recommending this.**
- **Why now** — six consecutive weeks of "the platforms ate everything" + Anthropic explicitly differentiating on permanence/ad-free. Today's brief adds nothing new to the why-now case except another week of nobody else doing it.
- **Confidence: 4/5.**

### 2. Companion-app compliance SDK — sell shovels to a regulated gold rush

- **What / stage** — drop-in middleware for any companion or character-chatbot app: age verification, mandatory "I am not a licensed professional" disclosure, crisis-language detection + hand-off, audit log. Builder infrastructure / regtech.
- **Velocity / cross-validation** — PA suit in discovery; 12-member AI task force still evaluating other companion apps for unlicensed-practice violations. NY safeguards live, WA companion-chatbot law (private right of action) live, GUARD Act 22-0 out of Senate Judiciary. 128 active companion apps. Last week's Harvey Contract Intelligence launch is still the strongest application-layer precedent — same pattern (vertical regulated AI tooling), different vertical.
- **Hypothesis** — regulation turned a feature nobody wanted into a non-negotiable. A 50-state patchwork makes a single integration the dominant value. First credible "Stripe for companion-app compliance" sets the integration standard.
- **MVP** — npm package: `ageGate()`, `disclosure()`, `crisisDetect()` over an open classifier + hosted audit endpoint. Ship age-gate + disclosure first.
- **Why now** — DeepSeek's 75% V4-Pro price cut last week confirms margins compress at the model layer; the durable economic value moves up to the workflow / compliance layer. Every companion app will rather pay $0.001/call to a compliance SDK than pay $1M to a settlement.
- **Confidence: 3/5.**

### 3. Agent-skill distribution registry — the layer under the platform pile-up

- **What / stage** — provider-neutral package registry for agent skills: `publish` + `install` + a discoverable index. Builder infrastructure. The in-flight `publish-skill` thesis.
- **Velocity / cross-validation** — Notion's developer platform (May 25) supports Claude Code, Cursor, Codex, Decagon as native external agents. Google retired Vertex AI in favor of Gemini Enterprise Agent Platform with ADK 1.0 + A2A v1.0. The Anthropic + Google + Broadcom compute tie-up means both major model providers behind the harness wars are now infrastructure-linked through Broadcom — harness fragmentation will compound, not consolidate.
- **Hypothesis** — every harness, every builder UI, every model is now controlled by a $50B+ org. The durable value is the npm-equivalent underneath them all. First credible registry sets the standard.
- **MVP** — `npx publish-skill <dir>` + a one-page index. Already in flight.
- **Why now** — platform count keeps climbing. Either A2A becomes the standard (registry maps onto it) or it doesn't (registry's value is sharper). Either way, ship and find out.
- **Confidence: 3/5.**

## Consumer pulse

Eleven days of frozen Google Trends / YouTube / Instagram / TikTok / X, so today's pulse is entirely Wikipedia. The story is consistent: **creator-driven IP and theatrical IP dominate, AI brand search is flat, sports owns the spike days.** Backrooms (#3, 460K) and Kane Parsons (#39, 75K, both holding from yesterday's surge) are the standing creator-IP story; The Mandalorian and Grogu (#36, 77K), Spider-Noir (#13, 153K), and Obsession (#5, 257K) round out the IP-driven entertainment surface. ChatGPT at #31 with velocity 1.5x is exactly where it's been for a month — neither dying nor breaking out. The PSG UCL win is the dominant consumer signal of the weekend (five of top 12 entries) and it didn't move the creator-IP entries down. The implication for AI builders is unchanged from yesterday and reinforced today: the next version of this pipeline is creators making the entire asset chain — script, animation, voice, edit — with AI tools. Whoever sells those creators picks-and-shovels at the moment they go from YouTube to a $10M deal is in the right place. **Promoting bench opp #4 (creator-IP tooling) to "watch hard" — one more week of retention data and it joins the top 3.**

## MFM angle

Working from the May 21 affinity table (today's `match-guests` step still can't run): **Greg Isenberg** (0.78 affinity on AI companions) remains the sharpest voice on opp 1 — the ad-free vs ad-funded model split now has a *very* tweetable framing. For the creator-IP story now holding into week 2: **MrBeast / Jimmy Donaldson** and **Logan Paul** are the obvious calls — both have moved creator IP into mainstream commercial assets at scale, and both would have a real take on a 20-year-old getting A24's biggest opening *and a sustained second week* from a phone-shot horror series. **Shaan Puri's** "creator IP is the new venture portfolio" framing from the back catalog is the right pull-quote for whatever ships against this. For opp 3 the standing call holds: **Dharmesh Shah** (0.90 affinity on agent tooling) is the right person to frame the Anthropic-Google-Broadcom infrastructure pact as "the harness layer just got more entrenched, not less."

## Kill list

- **Race-to-zero on AI API pricing.** DeepSeek's 75% V4-Pro cut last week + Anthropic / Google running multi-gigawatt build-outs that depreciate by the year = there is no indie business model that wins by being cheaper at the API layer. Compete on workflow, vertical, or trust — never on price-per-token. Unchanged.
- **A consumer AI hardware play.** Jony Ive + Sam Altman still six months from shipping. Apple, Meta, Samsung, Xreal all in. Zero indie distribution / capex / supply-chain story works here. Build software for whatever wins. Unchanged.

## This week's ship

**Ship the "Leaving Character.AI?" off-ramp landing page by Wednesday 6/3** — same call as the last five briefs, now sixth time. Not a fresh idea, just a *non-negotiable*. One day of build. The credibility line writes itself: pin to Claude Opus 4.8, cite Anthropic-ad-free + Anthropic-Google-Broadcom compute as "this will not move." Drop a single comment in a live r/CharacterAI thread; measure email list within 72h. In parallel: if `publish-skill` v0.1 is out, the only metric for it this week is inbound — ≥20 stars in 72h, or a maintainer reach-out from the Notion-external-agents or Gemini-ADK crowd. **And — the bigger ship, escalated again — fix the workspace mount Monday morning before this becomes the seventh failed-ingest day.** Six in a row is the steady state now, and the alibi ("layer fresh web research on the standing quant") gets thinner each Sunday. The data layer is the backbone for every brief and for `match-guests`, `headline-chart`, and the public TRENDS page's freshness signal. Reset the mount, re-run the full pipeline once manually, confirm `latest.json` updates, then resume schedule. If the mount can't be fixed by midweek, the brief needs a different backbone — probably running the pipeline entirely from /tmp with a write-back step at the end (today proved the wikipedia step survives that pattern).
