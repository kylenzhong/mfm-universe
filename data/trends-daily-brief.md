# The harness war stopped being a war and became a standings table — the only thing still moving is the model slot underneath it, where ollama still advertises Kimi-K2.6 while the Hub has already moved to K2.7

*Daily Trend Brief · Wednesday, June 24, 2026*

## TL;DR

- **Most interesting movement:** The agent-harness leaderboard froze. The same five names lead GitHub as yesterday — `affaan-m/ECC` (**220,829**, +716), `NousResearch/hermes-agent` (**201,410**, +1,105), `AutoGPT` (185,139), `ollama` (174,828), `dify`/`langchain`/`open-webui` behind — grinding up a few hundred stars a day. A week ago this was a knife-fight; today it's trench warfare. The real churn dropped one layer down, to the **model slot**: `ollama`'s own description still advertises *"Kimi-K2.6, GLM-5.1, MiniMax, DeepSeek, gpt-oss"* as drop-ins — but the Hub has already moved on. Today's hot list is **`Kimi-K2.7-Code` (447,920 downloads, new)** and **`zai-org/GLM-5.2` (#3 by likes on day one, 40k dl)**. The backends turn over point-releases overnight; the runtime that bundles them lags by a release. The menu is now refreshing faster than anything that consumes it can list it.
- **Consumer-side:** Total decoupling from AI. Fresh Google Trends is pure hard-news and sport: `primary elections`, `turquoise alert`, `amber alert`, `padres game today`, and World Cup group stage (`bosnia vs qatar`, `czechia vs mexico`), with `jodie foster` and `deep sea ghost shark costa rica` rounding it out. Yesterday people searched *definitions*; today they're searching *the news*. Not one AI query in the top ten.
- **What's noise:** X, TikTok, TikTok-v2 and Instagram are all dark — Apify has been 403'ing for ~two weeks (monthly hard limit), so `x_top` (Knicks/Spurs/NBA Finals) and `youtube_top` (The Boys teaser, KAROL G, brainrot) are **June-11 prior-day fallback**, ~13 days stale. Ignore them outright. The cross-source leaderboard is again exactly one real entity — **ChatGPT (29.1)** — then Wikipedia pageview sludge (`Voicemails for Isabelle`, `Toy Story 5`, FIFA goalscorers, `House of the Dragon`). The board is not the story two days running.

## Top 3 buildable opportunities

### 1. On-device "see-and-act" grounding API wrapping LocateAnything-3B
- **Category / stage:** Developer infrastructure / nascent — the one contested primitive in a layer that's otherwise either frozen or churning.
- **Velocity / cross-validation:** `nvidia/LocateAnything-3B` (image + instruction → coordinates) is the **#1 most-liked model on the Hub for the second day running (2,329 likes)**, holding 274,025 downloads. Look at what's *around* it: the harness layer above is frozen (same five GitHub leaders as yesterday), and the model layer beside it is a revolving door (`Kimi-K2.7-Code`, `GLM-5.2`, `MiniMax-M3` all moved overnight). Grounding is the only asset that's both stable *and* rising. It's the motor every harness needs to actually click.
- **Hypothesis:** Computer-use agents bolt on a slow, cloud-round-tripping vision step to decide where to click — expensive, latency-bound, screen-leaking. A local 3B grounding model behind a clean `locate(image, instruction) → point` API kills the round-trip and the privacy problem at once, and it's harness-agnostic — it sells to all five of the frozen leaders, not one.
- **MVP (≤1 week):** Wrap `LocateAnything-3B` in a local HTTP server + a thin SDK; one demo driving a real desktop app fully offline.
- **Why now:** It held the #1-liked slot through a day when everything above and beside it moved. The primitive is most valuable exactly when the harness layer commoditizes and the model layer won't sit still.
- **Confidence: 4/5.**

### 2. A live "model-menu router" — track the backend churn so builders don't have to
- **Category / stage:** Developer tooling / nascent. The point-release churn *is* the opening.
- **Velocity / cross-validation:** The concrete tell today: `ollama` (174,828 stars) ships with `Kimi-K2.6` and `GLM-5.1` named in its description, while the Hub's hot list is already `Kimi-K2.7-Code` (447,920 dl) and `GLM-5.2` (#3 by likes, born today). Add `MiniMax-M3` (131k) and the `gemma-4-12B` GGUFs (456k/96k) and the swappable menu is fattening and refreshing faster than any human — or any bundled runtime — can keep current. Guests: **Dharmesh Shah (0.92, strong-tag)**, **Greg Isenberg (0.80, strong-tag)** on agent tooling.
- **Hypothesis:** A team adopting agents hard-codes a model on vibes, then it's stale in a week. A shadow-running router that tracks the live Hub menu, scores task classes across the current top backends, and routes to the cheapest passing one — auto-upgrading as K2.6→K2.7→K2.8 lands — is pure margin and pure lock-in.
- **MVP (≤1 week):** A thin proxy that tags incoming tasks by class, shadow-runs them across the two freshest backends on ollama, records pass-rate + tokens, and emits a routing table that refreshes when the menu does.
- **Why now:** The model layer only just became fast-churning *enough* (overnight point releases, runtime lagging) for "which backend, today" to be a real, recurring, expensive question.
- **Confidence: 3/5.**

### 3. A "bring-your-own-model" local companion runtime — uncensored, offline, un-deplatformable
- **Category / stage:** Consumer AI / nascent. Carryover — cooling slightly, still the loudest consumer download signal by a mile.
- **Velocity / cross-validation:** `HauhauCS/Qwen3.6-35B-A3B-Uncensored` is **still #1 on the Hub by downloads at 3,955,016** — a 35B MoE with ~3B active params that runs on a laptop, ~9× the next model down. The consumer-AI scrape is again 100% companion/romance (14 posts, r/AICompanions): hosted-platform fatigue and churn toward local. Guests: **Greg Isenberg (0.78 companions, strong-tag)**, **Pieter Levels (0.88 local LLMs)**.
- **Hypothesis:** Hosted companion apps keep changing the rules — filters, price hikes, model swaps, deplatforming — and the most-attached users are the most-burned. Nobody has packaged "your companion, your model, on your machine, forever." ~4M people did the manual ollama dance to get there.
- **MVP (≤1 week):** One-command app that pulls the uncensored A3B model via ollama, wraps it in a persistent-memory chat UI (local SQLite + a simple long-term-memory layer), runs fully offline. Installer + one screen-recorded demo.
- **Why now:** The download signal is enormous but flat-to-cooling (~4.08M → 3.955M over recent days) — a "ride it before it breaks" play, not a "screaming acceleration" one. The packaging gap is still wide open.
- **Confidence: 3/5.**

## Consumer pulse

The two ecosystems have fully decoupled, and today they're not even looking in the same direction. The **builder** side is loud but internal and, increasingly, *settled*: the GitHub top is the same agent-harness standings table as yesterday, grinding up half a percent a day, while the only genuine motion is the model slot underneath quietly cycling point-releases (`Kimi-K2.7`, `GLM-5.2` landing the same day the runtime that bundles their predecessors sits unchanged). The **consumer** side went straight to the news desk: primary elections, amber and turquoise alerts, Padres games, World Cup group stage — concrete, time-stamped, zero AI. Where the builder feeds are arguing about *which backend to swap in today*, the consumer feeds are just tracking *what's happening in the world today*. The social feeds (X/YouTube/TikTok/Instagram) remain Apify-dark and ~13 days stale — weight them at zero. Net: ~100% of today's buildable signal is in the AI ecosystem, concentrated in the infrastructure layer, and the actionable edge is the *churn* between layers, not any single name.

## MFM angle

**Dharmesh Shah** (0.92 on agent tooling, strong-tag, tier-1) owns today's frame more than anyone in the roster. The story is a platform story: when the harness layer freezes into interchangeable commodities and the model layer turns over weekly, durable value slides to whoever sits *between* them — the routing/menu layer (opp #2). That's the agent.ai / "agents as a platform" thesis almost verbatim, and the clip writes itself: "stop betting on a model, own the swap." **Greg Isenberg** (0.80, strong-tag) is the complementary voice — he's the one who'll name the wrapper opportunity out loud, and opps #1 and #3 are exactly his "spot the boring infra/packaging gap and ship it solo" lens. **Pieter Levels** (0.88 on local LLMs) is the build-it proof for opp #1.

## Kill list

- **Don't build another agent harness.** The top five are frozen *and* interchangeable — entering that fight now means a commoditized knife-fight with no moat. The value already left this layer.
- **Don't build *on* this week's hot model.** `GLM-5.2` and `Kimi-K2.7` look irresistible today; they'll be superseded by next week's point release. Build the swap layer (opp #2), never the bet.

## This week's ship

**Ship the grounding API (opp #1) by Friday** — wrap `LocateAnything-3B` in a local `locate(image, instruction) → point` HTTP server + a one-screen offline desktop-automation demo. It's the single asset that held #1-by-likes through two days while the harness layer froze and the model layer churned underneath it; that stability *is* the signal. Build the one thing that isn't moving while everything around it does.
