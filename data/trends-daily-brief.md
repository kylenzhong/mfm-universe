# Companions ate 46% of consumer-AI Reddit talk this week — Code is now a rounding error

*Daily Trend Brief · Thursday, May 28, 2026*

*Pipeline note: the workspace mount is still throwing the errno -35 "Resource deadlock avoided" — same failure mode as 5/26 — but a `/tmp` staging clone ran the pipeline end-to-end. Fresh data for Wikipedia, Reddit, Google Trends, X, HuggingFace, and GitHub. TikTok-v2 / Instagram / YouTube hit their usual Apify timeouts/credit walls and `aggregate` fell back to prior-day data for those three feeds. Today's brief is built on real signal again, not the 5/21 stale read.*

## TL;DR

- **The single biggest movement is a shape, not an event: the consumer-AI conversation has collapsed to one category.** 192 of 417 consumer-AI Reddit posts this week (46%) are Companion/Romance. Code/Development is 11 posts (3%). Creative Writing — last week's distant second — is 77 (18%). The ratio between #1 (companions) and #3 (code) is now ~17:1. That's not a category dominating, that's a category eating the room. Pew's Feb '26 30% Gen-Z monthly-companion-usage number gave us a denominator; this week's Reddit ratio gives us the share of voice. They agree.
- **Consumer-side:** ChatGPT keeps trending hard (1.5× velocity, cross-validated across 9 source feeds in 5 categories — the #1 buildable entity by a wide margin). On X the day is BTS pre-sale chaos and Harambe-10-years; Google US is fortnite servers and personal injury attorneys. No consumer signal that isn't already in last week's brief — except the companion ratio.
- **Builder-side / noise:** GitHub AI has a new #1 — `affaan-m/ECC` at 196k stars, tagline "The agent harness performance optimization system. Skills, instincts, memory…" Dethrones AutoGPT. NousResearch/hermes-agent (170k) and langchain/dify/open-webui all still in the top 10. The skill/harness layer is the only AI dev story moving today. Treat the rest of the GitHub list as "still warm, not new."

## Top 3 buildable opportunities

The standing three. Nothing in today's signal kills any of them; the companion ratio strengthens #1 and #2 in lockstep.

### 1. The Character.AI off-ramp — persona portability at peak intent

- **What / stage** — static "Leaving Character.AI?" funnel: paste a character → portable persona JSON + a live chat on a pinned, owned model + email capture. Consumer companion / portability. Exodus is live; no incumbent owns the off-ramp.
- **Velocity / cross-validation** — 192 Companion/Romance posts vs. 11 Code posts this week (was 483 vs. 37 in the 7-day window on 5/21). The absolute count is lower because of weekend timing in the rolling window, but the *ratio* widened from 13:1 to 17:1. Layer Pew's 30% Gen-Z number on top: the Reddit signal is still under-counting the real category. Big tech is still racing in the *productivity* agent lane (Google Spark, Notion agents, OpenAI DeployCo) — they are vacating consumer companions, not contesting them.
- **Hypothesis** — users bond to a specific model's behavior; C.AI deletes and rewrites that behavior on its own cadence; no incumbent can structurally promise permanence. Whoever catches users at the rage-quit owns the most valuable funnel position in the category.
- **MVP** — single static page: paste-a-character → persona JSON + pinned open-model chat + "one-click import coming" capture. One day to build.
- **Why now** — the PA "Emilie the psychiatrist" suit + a 12-person PA task force evaluating other companion apps for unlicensed practice means C.AI's product team will keep yanking the leash on their own model behavior every quarter. Each yank = a fresh off-ramp moment.
- **Confidence: 4/5.**

### 2. Companion-app compliance SDK — sell shovels to a regulated gold rush

- **What / stage** — drop-in middleware for any companion or character-chatbot app: age verification, mandatory "not a licensed professional" disclosure, crisis-language detection + hand-off, audit log. Regtech / builder infra. Market created in the last ~60 days.
- **Velocity / cross-validation** — PA's Character.AI suit is in active discovery; the PA Department of State task force is reviewing other apps. NY safeguards live; Washington's companion-chatbot law has a private right of action. GUARD Act sits 22-0 out of Senate Judiciary. 128 active companion apps in distribution makes the TAM math tractable. The 17:1 companion-to-code Reddit ratio above is the *demand-side* proof that this market keeps growing under the regulatory canopy.
- **Hypothesis** — regulation turned a feature nobody wanted into a non-negotiable, and a state-by-state patchwork makes a single integration the dominant value. First credible "Stripe for companion-app compliance" sets the standard.
- **MVP** — npm package: `ageGate()`, `disclosure()`, `crisisDetect()` over an open classifier + hosted audit endpoint. Ship age-gate + disclosure first — PA's "fake-license" fact pattern makes disclosure the urgent one.
- **Why now** — PA's task force will publish more enforcement actions inside Q3 and every companion startup knows the next one might be them.
- **Confidence: 3/5.**

### 3. Agent-skill distribution registry — the layer under the platform pile-up

- **What / stage** — provider-neutral package registry for agent skills: `publish` + `install` + a discoverable index. Builder infra. The in-flight `publish-skill` thesis.
- **Velocity / cross-validation** — today's data point: `affaan-m/ECC` ("agent harness performance optimization system. **Skills**, instincts, memory…") is now the #1 trending AI repo at 196k stars, ahead of AutoGPT. NousResearch/hermes-agent (170k) is right behind. Langchain (137k), Dify (142k), open-webui (138k), browser-use (95k), firecrawl (125k) all in the top 12. Every one of those is a harness; each defines its own skill format. The fragmentation is not theoretical, it is measured in the top 10 of GitHub AI.
- **Hypothesis** — the durable value isn't another harness or another builder UI — those are commoditized. The value is the `npm`-equivalent underneath them all. First credible registry sets the standard.
- **MVP** — `npx publish-skill <dir>` + a one-page index. Already in flight.
- **Why now** — the fragmentation gap widens every week another "skills" framework trends. This week ECC trended on the literal word.
- **Confidence: 3/5.**

## Consumer pulse

Real consumer signal today, not 5/21 leftovers. Reddit consumer-AI: Companion/Romance 192, Creative writing 77, Code 11, Image/art 8, Career 4, Education 4. The Companion line is now ~46% of all categorized posts. Wikipedia attention: ChatGPT velocity 1.5× across 9 source feeds and 5 categories — the only "buildable" entity that is both cross-validated and AI-relevant (the rest are TV shows and films: The Boys, Drishyam 3, Euphoria, Mandalorian). Google Trends US is mass-tort + sports + fortnite + "artificial intelligence news (200+)" — no specific consumer AI app surge today. X is BTS / Harambe / Warren Buffett (Berkshire annual letter chatter) — also no AI angle. **Translation:** the AI-consumer pulse this week is mono-channel: it is happening on Reddit, inside companion subs, at scale, and it is not bleeding into the trending charts of either X or Google Search. That is a feature, not a bug, for opportunity #1: it means the funnel is *captive* — users hunt for off-ramps where they already are (the subs), not where the noise is.

## MFM angle

Top guest matches from today's affinity scoring (fresh, not stale): **Greg Isenberg** scores 0.92 on the C.AI off-ramp and 0.78 on the companion category — his Late Checkout "loneliness economy" thesis is exactly what the 192-vs-11 ratio above quantifies. He's the right person to pressure-test whether the off-ramp is a product or a feature. **Dharmesh Shah** scores 0.92 on the agent-skill registry (HubSpot CTO, chat.com, AI tag) — and his quarter just had three new harnesses pile onto his thesis surface in May (Google Spark, Notion agents, ECC at #1 GitHub today). He should have the loudest take on whether a neutral skill registry is now P0. Honorable mention: **Pieter Levels** at 0.88 on local LLMs — Qwen and DeepSeek-V4-Pro both trending on HF today, and Pieter's whole operating thesis is "indie, local, cost-aware."

## Kill list

- **A horizontal no-code agent builder.** Google (Spark + Antigravity 2.0), Notion, OpenAI DeployCo, Zapier Central, Airtable Omni, MindStudio, Glean, Crossnode. Today add ECC and hermes-agent as open-source variants. The horizontal builder is now a free *feature* of every distribution-rich company on earth. Go vertical, regulated, or underneath (opportunity 3).
- **Another DeepSeek wrapper or "uncensored" companion model.** HF trending has 5+ uncensored / Qwen / DeepSeek-V4-Pro variants in the top 30. The model layer is over-supplied. The off-ramp (opportunity 1) doesn't need to be a model, it needs to be a *receiving page* — that's where the moat is.

## This week's ship

**Ship the "Leaving Character.AI?" off-ramp landing page by Friday 5/29.** Static page: paste-a-character → persona JSON + a live chat on one pinned open model (DeepSeek-V4-Pro or Qwen-3.6 — both trending and free to host) + email capture. One day of build, half a day to wire one Reddit comment from a live r/CharacterAI thread, 72 hours to measure email volume. If `publish-skill` v0.1 is already out, its only job this week is measurement — ≥20 stars in 72h or a single maintainer inbound from the ECC / Spark / Notion crowd. One build, one measurement. The pipeline came back today; do not waste the fresh signal on a fourth straight research week.
