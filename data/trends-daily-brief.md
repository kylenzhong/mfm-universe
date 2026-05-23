# The AI-companion exodus is now a three-front collapse — ads, a state lawsuit, and a federal age-gate

*Daily Trend Brief · Saturday, May 23, 2026*

*Pipeline note: today's automated ingest did not run — the workspace mount is throwing I/O errors and the trend-detector pipeline never executed. This brief is built on the last clean pipeline snapshot (May 21) plus live web research for May 23. Every hard number below is the May 21 reading, flagged as such — treat the quant as 48h stale. The narrative is current.*

## TL;DR

- **The companion story changed shape.** On May 21 this was a product revolt: Character.AI shipped full-screen in-chat ads and the PipSqueak 2 model swap, and r/CharacterAI turned into an obituary page. As of today it is a three-front collapse — product (ads + forced model migration), legal (Pennsylvania's AG sued C.AI in early May for chatbots impersonating licensed doctors; the teen-suicide suits already settled in January), and federal (the Senate Judiciary Committee *unanimously* advanced the GUARD Act, which age-gates any AI companion that simulates a human relationship). The exodus stopped being a mood. It's now structural and irreversible.
- **Consumer side: forced churn. Builder side: a no-code agent land-grab.** The May 21 snapshot had Companion/Romance as the runaway #1 consumer-AI category — 483 posts/day vs. 37 for Code/Development, a 13:1 gap. The builder ecosystem is looking elsewhere entirely: OpenAI Agent Builder, Google Opal + ADK, and Microsoft Copilot Studio all now ship visual no-code agent builders, with Gumloop and n8n the indie favorites. Two ecosystems, two unrelated worlds.
- **What's noise:** the generic "best AI agent builder 2026" listicle wave — that race is over the moment the three platform owners entered it. And the May 21 entertainment cross-validation cluster (movie trailers, NBA playoffs) is still the scorer being flattered by premieres. Zero build surface.

## Top 3 buildable opportunities

### 1. The Character.AI off-ramp — persona portability at peak intent

- **What** — a "Leaving Character.AI?" funnel: paste a C.AI character definition, get a portable persona JSON running on a pinned, owned model, plus email capture. Category: consumer AI companion / portability. Stage: exodus live, regulation accelerating it, no incumbent owns the off-ramp.
- **Velocity / cross-validation** — May 21 quant: Companion/Romance 421 → 483 posts/day (+15%), a two-day-confirmed climb across r/CharacterAI, r/Replika, r/myboyfriendisai. Today's web signal confirms the migration is now mainstream — Reddit threads, Discord servers and entire SEO content farms ("14 Character AI alternatives") have formed around the question "which alternative actually works."
- **Hypothesis** — millions formed attachments to a *specific model's behavior*. PipSqueak 2 deleted that behavior overnight; full-screen ads made staying intolerable; the GUARD Act will force age-gating that locks a chunk of the base out entirely. No incumbent can structurally promise permanence. Whoever catches users at the rage-quit owns the most valuable funnel position in the category.
- **MVP** — one static page: paste character → portable persona JSON + a live chat on a pinned open model + "we'll tell you when import is one-click" capture. One day to build.
- **Why now** — the window is the rage-quit, and three separate forces are widening it this month.
- **Confidence: 4/5.**

### 2. Companion-app compliance SDK — sell shovels to a regulated gold rush

- **What** — a drop-in middleware/SDK for any companion or character-chatbot app: age verification, mandatory "I am not a licensed professional" disclosure, crisis-language detection and hand-off, and an audit log. Category: AI builder infrastructure / regtech. Stage: emerging — the market was created in the last 30 days.
- **Velocity / cross-validation** — this is a *fresh* read, not in the May 21 pipeline. New York's AI-companion safeguards are now in effect; Washington State enacted a companion-chatbot law *with a private right of action*; eight states passed chatbot laws across 2023–25 and 2026 is adding more; the GUARD Act would federalize age-gating. Every companion startup now needs the same five compliance primitives and none of them want to build it.
- **Hypothesis** — regulation just turned a feature nobody wanted to build into a non-negotiable. A private right of action (WA) means non-compliance is now a litigation target, not a fine. The first credible "Stripe for companion-app compliance" sets the integration standard.
- **MVP** — an npm package: `age-gate()`, `disclosure()`, `crisis-detect()` wrapping an open classifier, plus a hosted audit endpoint. Ship the age-gate + disclosure pair first — that is the part with statutory teeth.
- **Why now** — the laws are landing *this quarter*; builders are exposed today and know it.
- **Confidence: 3/5.**

### 3. Agent-skill distribution layer — the registry beneath the harness pile-up

- **What** — a provider-neutral package/registry for agent skills: `publish` + `install` + a discoverable index. Category: AI builder infrastructure. Stage: emerging, fragmenting fast.
- **Velocity / cross-validation** — May 21 GitHub trending was wall-to-wall agent harnesses (AutoGPT, OpenHands, dify, hermes-agent). Today's signal sharpens it: OpenAI, Google and Microsoft all shipped agent builders this spring. The harness count is exploding *and* the platform owners are commoditizing the builder UI — which means the durable value moves down a layer, to the interop/distribution format every harness needs and none share.
- **Hypothesis** — a skill written for one harness can't move to another. The winner isn't another harness or another builder — it's the `npm`-equivalent underneath all of them. First credible registry sets the standard.
- **MVP** — `npx publish-skill <dir>` + a one-page index. This is the in-flight `publish-skill` deliverable; the platform land-grab is confirmation the thesis is aimed right, not refutation of it.
- **Why now** — the distribution gap widens every week the harness count climbs.
- **Confidence: 3/5.**

## Consumer pulse

Caveat first: the quant in this section is the May 21 snapshot — today's feeds (Google Trends, YouTube, Instagram, TikTok, X) were not pulled. On May 21 the consumer feeds were pure mainstream churn — movie trailers, NBA conference finals, the PGA Championship — useful only as a noise floor. The one live consumer-AI signal then was Reddit's use-case data, and it pointed hard in one direction: 483 Companion/Romance posts vs. 37 Code/Development. Today's web research says nothing has cooled that — if anything the regulatory news is pouring fuel on it, because age-gating and forced model swaps *manufacture* churn on a schedule. Meanwhile the builder ecosystem spent the same week absorbing three platform-grade agent-builder launches. The gap between what builders ship (agent orchestration for other builders) and what consumers are desperate for (their companion back, or a safe place to move it) has not closed. It's the most durable arbitrage in the dataset.

## MFM angle

Working from the May 21 guest-affinity data (today's `match-guests` step did not run): **Greg Isenberg** remains the sharpest voice on the top trend — affinity 0.78 on AI-companions, highest-coverage non-host guest. His "loneliness economy" thesis maps directly onto opportunity 1: the value was never the model, it's the relationship and its continuity, and he's the right person to pressure-test whether an off-ramp is a product or a feature. For opportunity 2, the framing is pure MFM house style — Sam Parr and Shaan Puri have hammered "sell picks and shovels into a gold rush" for years, and a compliance SDK is the literal picks-and-shovels play on the companion boom. Secondarily, **Dharmesh Shah** (0.90 affinity on agent tooling) is the relevant voice for opportunity 3 — he built agent.ai and has argued consistently that the agent layer needs shared infrastructure, not more frameworks.

## Kill list

- **Building another consumer AI companion.** With the GUARD Act through committee, NY safeguards live, and Washington's private right of action, shipping a relationship-simulating chatbot to consumers now means walking into a regulatory buzzsaw with personal-injury lawyers waiting. Build the off-ramp and the compliance layer around the churn — do not build the companion.
- **A general-purpose no-code agent builder.** OpenAI Agent Builder, Google Opal/ADK and Microsoft Copilot Studio all shipped this spring. A horizontal no-code agent builder is now a free feature owned by the three companies with the most distribution on earth. Skip it; go down a layer (opp 3) or go vertical.

## This week's ship

**Build the "Leaving Character.AI?" off-ramp landing page and have it live by Wednesday 5/28.** It is opportunity 1, it costs one day, and three independent forces — full-screen ads, the PipSqueak 2 swap, and the GUARD Act age-gate — are all widening the rage-quit window *right now*. Static page: paste-a-character → persona JSON + pinned-model chat + email capture. Ship it, point a single Reddit comment at it from one of the live r/CharacterAI obituary threads, and let the email list measure real exodus volume within 72 hours. Separately: if `publish-skill` v0.1 shipped Friday as planned, the only job this week is measurement — ≥20 stars in 72h or any maintainer inbound. Do not thrash it. One new build, one measurement. That's the week.
