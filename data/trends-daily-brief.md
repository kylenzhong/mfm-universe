# The harness standings barely moved again — but NVIDIA's grounding model quietly added ~134K downloads overnight, and that click layer is the only thing in the whole stack still accelerating

*Daily Trend Brief · Thursday, June 25, 2026*

## TL;DR

- **Most interesting movement:** `nvidia/LocateAnything-3B` (image + instruction → coordinates) jumped from **274,025 downloads to 407,838 in a day — +133,813, roughly +49%** — while holding a top-of-board likes slot (2,353). Nothing else in the stack is moving like that. The agent-harness leaderboard above it is, for the third day running, a standings table grinding up a few hundred stars: `affaan-m/ECC` **221,402** (+573, its slowest day yet), `NousResearch/hermes-agent` **202,518** (+1,108), `AutoGPT` 185,158, `ollama` 174,883. The model slot beside it churns point-releases — `zai-org/GLM-5.2` just took the **#1-liked** throne on day-one-ish (2,392 likes, 67k dl). But the *grounding* primitive is the one asset that is simultaneously stable, top-liked, AND now downloading at a breakout rate. The thesis stopped being a guess and printed a number.
- **Consumer-side:** Total decoupling from AI, again — but today the Google feed swung from hard-news back to **evergreen category demand**: `sports`, `movies`, `car insurance`, `hotels`, `flights`, `fortnite server status`, `disneyland ticket prices`, plus a `Marvel Avengers: Endgame re-release` query. Not one AI term in the top ten. Where the builder feeds argue about which click-model to bolt on, consumers are pricing flights and Disneyland tickets.
- **What's noise:** X, TikTok, TikTok-v2 and Instagram are all dark. Apify has been 403'ing on the monthly hard limit for ~two weeks, and today YouTube's actor 403'd on the same cap — so `youtube_top` (The Boys teaser, KAROL G, brainrot) and `x_top` (Knicks/Spurs/NBA Finals) are **prior-day fallback, ~13 days stale**. Weight them at zero. The cross-source "leaderboard" is again exactly one real entity — **ChatGPT (29.1)** — then Wikipedia pageview sludge (`Voicemails for Isabelle` ×47, `Toy Story 5`, FIFA goalscorers, `House of the Dragon`). The board is not the story.

## Top 3 buildable opportunities

### 1. On-device "see-and-act" grounding API wrapping LocateAnything-3B
- **Category / stage:** Developer infrastructure / nascent — and now the single fastest-moving asset in the whole AI stack.
- **Velocity / cross-validation:** `nvidia/LocateAnything-3B` went **274,025 → 407,838 downloads overnight (+49%)** while holding 2,353 likes near the top of the Hub. Look at the contrast: the harness layer above it is frozen (ECC +573, its weakest delta yet), the base-model layer beside it is a revolving door (`GLM-5.2` taking the likes crown, `gemma-4-12B` GGUFs at 496k dl). Grounding is the only thing that's stable *and* breaking out. It's the motor every harness needs to actually click a pixel.
- **Hypothesis:** Computer-use agents bolt on a slow, cloud-round-tripping vision step to decide where to click — expensive, latency-bound, screen-leaking. A local 3B grounding model behind a clean `locate(image, instruction) → point` API kills the round-trip and the privacy problem at once, and it's harness-agnostic: it sells to *all* the frozen leaders (ECC, hermes, AutoGPT, ollama-stack), not one.
- **MVP (≤1 week):** Wrap `LocateAnything-3B` in a local HTTP server + a thin SDK; one demo driving a real desktop app fully offline, no cloud vision call.
- **Why now:** Yesterday this was the "stable but unproven" pick. Today it added 134k downloads in 24 hours. The market is voting on the click layer in real time — get the DX wrapper out before NVIDIA or a harness ships its own.
- **Confidence: 4/5.**

### 2. A live "model-menu router" — track the backend churn so builders don't have to
- **Category / stage:** Developer tooling / nascent. The overnight point-release churn *is* the opening.
- **Velocity / cross-validation:** The tell today: `ollama` (174,883 stars) still names *"Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek"* in its own description, while the Hub's top-liked model is already **`GLM-5.2` (2,392 likes, 67k dl)** with a `GLM-5.2-GGUF` quant (88k dl) right behind it. The bundled runtime advertises predecessors; the Hub has moved a point-release on. Guests: **Dharmesh Shah (0.90, strong-tag)** and **Greg Isenberg (0.80, strong-tag)** on agent tooling.
- **Hypothesis:** A team adopting agents hard-codes a model on vibes, then it's stale in a week. A shadow-running router that tracks the live Hub menu, scores task classes across the current top backends, and routes to the cheapest passing one — auto-upgrading as GLM-5.1→5.2 and K2.6→K2.7 land — is pure margin and pure lock-in.
- **MVP (≤1 week):** A thin proxy that tags incoming tasks by class, shadow-runs them across the two freshest backends on ollama, records pass-rate + tokens, and emits a routing table that refreshes when the menu does.
- **Why now:** The model layer churns overnight (GLM-5.2 dethroning yesterday's leaders) while runtimes lag a release — "which backend, today" is a real, recurring, expensive question.
- **Confidence: 3/5.**

### 3. A "bring-your-own-model" local companion runtime — uncensored, offline, un-deplatformable
- **Category / stage:** Consumer AI / nascent. Carryover — now visibly cooling, but still the loudest single consumer download signal.
- **Velocity / cross-validation:** `HauhauCS/Qwen3.6-35B-A3B-Uncensored` sits at **3,520,206 downloads** — still the biggest consumer-AI number on the board, but **down from ~3.95M, the second straight day of decline** (now ~–11%). The consumer-AI scrape is again 100% companion/romance (14 posts, all r/AICompanions): hosted-platform fatigue, churn toward local. Guests: **Greg Isenberg (0.78 companions, strong-tag)**, **Pieter Levels (0.88 local LLMs)**.
- **Hypothesis:** Hosted companion apps keep changing the rules — filters, price hikes, model swaps, deplatforming — and the most-attached users are the most-burned. Nobody has packaged "your companion, your model, on your machine, forever." Millions did the manual ollama dance to get there.
- **MVP (≤1 week):** One-command app that pulls the uncensored A3B model via ollama, wraps it in a persistent-memory chat UI (local SQLite + a simple long-term-memory layer), runs fully offline. Installer + one screen-recorded demo.
- **Why now:** This is a "ride it before it breaks" play, not a "screaming acceleration" one — the download curve is rolling over. The packaging gap is still open, but the window is narrowing, not widening.
- **Confidence: 3/5.**

## Consumer pulse

The two ecosystems stayed fully decoupled, and today they didn't even rhyme. The **builder** side is loud but internal and increasingly *settled at the top*: the GitHub harness standings are the same five names grinding half a percent a day, and the genuine motion has dropped two layers down — the base-model slot cycling point-releases (`GLM-5.2` taking the likes crown) and, the real story, the **grounding/click model surging +49% in downloads in a single day**. The **consumer** side went the opposite direction from yesterday's news desk straight to the mall: `sports`, `movies`, `car insurance`, `hotels`, `flights`, Disneyland ticket prices, an Avengers re-release — evergreen category demand, zero AI. The social feeds (X/YouTube/TikTok/Instagram) are Apify-dark and ~13 days stale — weight them at zero. Net: ~100% of today's buildable signal is in the AI infrastructure layer, and the actionable edge moved from *which harness wins* (decided) to *who owns the click* (just broke out).

## MFM angle

Today's top trend — grounding/click models and the agent-tooling layer — lands hardest with two guests by affinity. **Dharmesh Shah (0.90, strong-tag on agent tooling)** is the sharpest take: he's built HubSpot's agent surface and is loud on the "thin wrapper around a fast-commoditizing model is a trap unless you own a primitive" thesis — LocateAnything is exactly that primitive. **Greg Isenberg (0.80 agent tooling; 0.78 companions)** is the distribution read: he packages developer-infra stories into builder-audience demand better than anyone, and he'd frame the grounding API as the "boring infra play that prints" while everyone chases harnesses. On the local-model thread, **Pieter Levels (0.88)** remains the patron saint of the ship-it-solo, offline, un-deplatformable build.

## Kill list

- **The harness leaderboard itself.** ECC/hermes/AutoGPT are a frozen standings table grinding a few hundred stars a day. Building "another harness" now is showing up to a knife-fight that already ended. Own a layer underneath instead.
- **Chasing GLM-5.2 / the base-model point-releases.** The likes crown changes hands overnight; whatever you wrap today is dethroned by Friday. Route across the menu (Opp #2), don't bet the company on one model name.

## This week's ship

**Ship the `locate(image, instruction) → point` local grounding server by Friday** — wrap `nvidia/LocateAnything-3B` in an HTTP endpoint + a 30-line SDK, and record one demo driving a real desktop app fully offline. Why: it's the only asset on the board that's both top-liked *and* accelerating (+49% downloads in 24h), it's harness-agnostic so it sells to every frozen leader at once, and the window between "obvious" and "NVIDIA/a harness ships the wrapper themselves" is measured in weeks, not months.
