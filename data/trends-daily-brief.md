# Big Tech consolidated the horizontal agent layer in ten days — Google, Notion, and OpenAI all shipped, and the only indie wedges left are vertical, regulated, or underneath

*Daily Trend Brief · Tuesday, May 26, 2026*

*Pipeline note: the Cowork → workspace mount is still flaky — the trend-detector pipeline cannot execute (every script-file read from the sandbox returns errno -35 / "Resource deadlock avoided"). Last clean ingest was May 21. The hard quant below — Companion/Romance 483 posts/day, etc. — is the May 21 reading, now 5 days stale. The narrative is from live web research (Google I/O recaps, TechCrunch, the PA AG action, a16z's consumer-AI list, Pew). Today's run publishes the brief but does **not** refresh `trends-latest.json` (the source data did not move). A human needs to reset the workspace mount before the data layer can update again.*

## TL;DR

- **The single biggest move of the past 10 days isn't a model — it's three platforms eating the horizontal-agent layer in the same week.** Google shipped Gemini Spark + Antigravity 2.0 at I/O (May 19), Notion turned its workspace into an agent hub (May 13), and OpenAI stood up DeployCo as a $4B enterprise-AI consulting subsidiary (anchored by acquiring Tomoro's 150 engineers). The thesis "build a generic agent builder for normal users" was already crowded; it is now distribution-locked. Indie wedges must be vertical, regulated, or *under* the layer.
- **The consumer companion thesis didn't crack — it got harder to ignore.** Pew (Feb '26) has 30% of US Gen Z talking to an AI friend or partner monthly, 14% across all adults. The category has 128 active apps in distribution vs. 16 three years ago. MIT Tech Review named AI companions one of its 10 Breakthrough Technologies of 2026. The May 21 quant — Companion/Romance #1 by 13:1 over Code — sits on a much bigger real-world denominator than the brief originally credited.
- **What's noise this week:** Recursive Superintelligence coming out of stealth at $650M (cool, zero indie build surface). Anthropic + xAI/SpaceX's Colossus 1 compute deal and Anthropic's $200B+ cloud-chip commitment (infrastructure, not opportunity). Gemini Omni video gen (Runway/Sora-class — same competitive dynamic, no indie wedge).

## Top 3 buildable opportunities

The standing three. Google I/O didn't change the *kind* of opportunity Kyle should build — it widened the gap between the consolidated layer and what is still ownable.

### 1. The Character.AI off-ramp — persona portability at peak intent

- **What / stage** — static "Leaving Character.AI?" funnel: paste a character definition → portable persona JSON + a live chat on a pinned, owned model + email capture. Consumer AI companion / portability. Exodus is live; no incumbent owns the off-ramp.
- **Velocity / cross-validation** — May 21 quant: Companion/Romance 483 posts/day, #1 by 13:1 over Code/Development. New macro layer: Pew's 30% Gen-Z monthly-companion-usage number says the Reddit signal is *understating* the pool, not over-fitting it. Google's Spark and Notion's agent platform are racing in the *productivity* lane, not companions — meaning the companion category is being vacated by serious capital, not contested.
- **Hypothesis** — users bond to a specific model's behavior; C.AI deletes and rewrites that behavior on its own cadence; no incumbent can structurally promise permanence. Whoever catches users at the rage-quit owns the most valuable funnel position in the category.
- **MVP** — single static page: paste-a-character → persona JSON + pinned open-model chat + "one-click import coming" capture. One day to build.
- **Why now** — the Pennsylvania "Emilie the psychiatrist" lawsuit is the kind of evidence that makes C.AI's product team gun-shy about every behavior tweak. That means *more* user-visible churn over the next quarter, not less.
- **Confidence: 4/5.**

### 2. Companion-app compliance SDK — sell shovels to a regulated gold rush

- **What / stage** — drop-in middleware for any companion or character-chatbot app: age verification, mandatory "I am not a licensed professional" disclosure, crisis-language detection + hand-off, audit log. Builder infrastructure / regtech. The market was created in the last ~60 days.
- **Velocity / cross-validation** — PA's Character.AI suit is in active discovery; the PA Department of State stood up a 12-member AI task force evaluating other companion apps for "unlicensed practice." Shapiro's 26-27 budget specifically calls for age-verification + parental-consent legislation. New York's safeguards are live; Washington's companion-chatbot law carries a private right of action. Layered on the GUARD Act sitting 22-0 out of Senate Judiciary. With 128 active companion apps in distribution, the TAM is now calculable, not hypothetical.
- **Hypothesis** — regulation turned a feature nobody wanted into a non-negotiable, and a state-by-state patchwork makes a single integration the dominant value. First credible "Stripe for companion-app compliance" sets the integration standard.
- **MVP** — npm package: `ageGate()`, `disclosure()`, `crisisDetect()` over an open classifier + hosted audit endpoint. Ship age-gate + disclosure first — that pair has statutory teeth and the PA "fake-license" angle makes disclosure the urgent one.
- **Why now** — PA's task force will publish more enforcement actions inside Q3 and every companion startup knows the next one might be them.
- **Confidence: 3/5.**

### 3. Agent-skill distribution registry — the layer under the platform pile-up

- **What / stage** — provider-neutral package registry for agent skills: `publish` + `install` + a discoverable index. Builder infrastructure. The in-flight `publish-skill` thesis.
- **Velocity / cross-validation** — this week is the cross-validation. Google launched Antigravity 2.0 (agent coding) and Gemini Spark (agent-as-product) at I/O. Notion shipped its own agent platform with external-agent connectors. OpenAI DeployCo opened to industrialize enterprise agent deployments. Each one owns its own skill format. A skill written for Gemini Spark won't move to Notion's agent layer and won't move to a DeployCo deployment. The interop-layer TAM just grew by however many enterprises the three of them touch.
- **Hypothesis** — the durable value isn't another harness or another builder UI — those just got commoditized by three different giants in 10 days. The value is the `npm`-equivalent underneath them all. First credible registry sets the standard.
- **MVP** — `npx publish-skill <dir>` + a one-page index. Already in flight.
- **Why now** — the fragmentation gap widens every week the platform count climbs. This week the count jumped by three.
- **Confidence: 3/5.**

## Consumer pulse

Caveat first: the consumer feeds — Google Trends, YouTube, Instagram, TikTok, X — were last cleanly pulled May 21. The one live AI-specific consumer signal then and now is Reddit use-case data: 483 Companion/Romance posts against 37 Code/Development, Creative Writing distant second at 208. What changed this week is the *macro* layer — Pew's 30% Gen-Z / 14% all-adult companion-usage number means the Reddit Companion signal is *understating* the real-world category, not the other way around. The builder ecosystem spent the same week absorbing the I/O agentic blitz: every Twitter timeline is wall-to-wall Antigravity 2.0 demos and Gemini Spark walkthroughs. The arbitrage holds — and got cleaner: the platforms are racing to own the productivity agent layer for enterprises; consumers are still buying companions; regulators are forcing structure on the consumer category. That intersection is the durable indie space.

## MFM angle

Working from the May 21 guest-affinity data (today's `match-guests` step did not run): **Greg Isenberg** stays the sharpest voice on the top trend — 0.78 affinity on AI-companions, and his "loneliness economy" thesis is exactly what Pew's 30% Gen-Z number quantifies. He's the right person to pressure-test whether the off-ramp is a product or a feature. For opportunity 3, **Dharmesh Shah** (0.90 affinity on agent tooling) just had three new harnesses launched into his thesis in ten days — he should have the loudest take on whether a neutral skill registry is now P0 rather than P1. Footnote: the Google I/O barrage is core MFM-host territory — Sam Parr and Shaan Puri will riff on Gemini Spark for a month — but the riff *is* the noise. The vertical wedges below are the build.

## Kill list

- **A horizontal no-code agent builder.** Category is now Google (Spark + Antigravity 2.0) + Notion + OpenAI DeployCo on top of Zapier Central, Airtable Omni, MindStudio, Glean Agent Builder, Crossnode. Three additional credible owners shipped this week alone. A horizontal no-code agent builder is now a free *feature* of every company with distribution on earth. Go down a layer (opportunity 3) or go vertical.
- **Another AI video-gen wrapper.** Gemini Omni is generally available with text→video→edit. Runway is at $5.3B valuation and added $40M ARR in Q2. Kling, Hailuo, Pixverse have real Chinese-traction. Wrapper economics are dead for video this week.

## This week's ship

**Ship the "Leaving Character.AI?" off-ramp landing page and have it live by Wednesday 5/28** — unchanged from the May 23 and 24 briefs, because nothing in three more days of platform shipping changed the indie thesis: vertical, regulated, or underneath. Static page: paste-a-character → persona JSON + pinned-model chat + email capture. One day of build. Point a single Reddit comment at it from a live r/CharacterAI thread and let the email list measure real volume within 72 hours. In parallel, if `publish-skill` v0.1 is out, its only job this week is measurement — ≥20 stars in 72h or a maintainer inbound from the Spark / Notion / DeployCo crowd. One build, one measurement. Do not let a still-dark pipeline turn into a fourth research week.
