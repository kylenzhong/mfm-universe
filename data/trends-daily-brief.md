# The most-downloaded model on HuggingFace today isn't a frontier release — it's an uncensored 3B-active local MoE with 4 million pulls, and that's where companion demand is fleeing

*Daily Trend Brief · Monday, June 22, 2026*

## TL;DR

- **Most interesting movement:** The #1 model on the Hub by downloads today is **`HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive`** — **2,090 likes, 4,078,305 downloads**. That's roughly **10× the next-most-downloaded model** (`gemma-4-12B-coder-fable5...GGUF` at 414k, `Kimi-K2.7-Code` at 413k). It's a 35B Mixture-of-Experts with only ~3B active params — i.e. it runs on a consumer GPU or a beefy laptop — and it's an *uncensored* fine-tune. Four million people didn't pull that to write code. The signal: demand for a companion/chat model **nobody can deplatform or filter** is now the single loudest thing on the open-model Hub, by an order of magnitude.
- **Consumer-side:** Off the AI grid entirely again. Fresh Google Trends is local-news/weather sludge (`okc weather`, `news 9 okc`, `weather storms tornadoes`), one football tentpole (**2026 FIFA World Cup**), `zelda ocarina of time remake`, Hilary Duff — and one genuinely interesting commerce flicker: **`aldi blind boxes giveaway`** (Labubu-style blind-box mania has reached discount grocery). YouTube/X are prior-day fallback: trailers and brainrot.
- **What's noise:** X, TikTok, TikTok-v2 and Instagram are all dark today — Apify is over its **monthly hard limit**, so those four are fallback or empty. The cross-source leaderboard is again exactly one real entity — **ChatGPT (29.1)** — then Wikipedia pageview junk (a Natalie Duncan song, footballers, a kidnapping-case article). Skip the board; the story is on the Hub.

## Top 3 buildable opportunities

### 1. A "bring-your-own-model" local companion runtime — uncensored, offline, un-deplatformable
- **Category / stage:** Consumer AI / nascent, but the demand is screaming.
- **Velocity / cross-validation:** `Qwen3.6-35B-A3B-Uncensored` at **4.08M downloads** is the loudest open-model signal of the day, 10× anything else. It cross-validates against the consumer-AI scrape: r/AICompanions is full of hosted-platform fatigue — *"OpenClaw — the hype train has moved on,"* *"ive basically been scammed by perplexity"* — and, critically, *"I built an AI companion that runs fully offline on Android — looking for testers."* People are actively churning off hosted companions and toward local. Guest cluster: **Greg Isenberg (0.78 on AI companions/romance, strong-tag)**, **Pieter Levels (0.88 on local LLMs)**, Naval (0.56).
- **Hypothesis:** Hosted companion apps (Character/Replika-style) keep changing the rules — filters, price hikes, model swaps, deplatforming — and the users most attached to them are the ones most burned by it. There is no clean consumer product that says "your companion, your model, on your machine, forever." The 4M downloads prove people will do the painful manual ollama dance to get there; nobody has packaged it.
- **MVP (≤1 week):** A one-command local app that pulls `Qwen3.6-A3B-uncensored` via ollama, wraps it in a persistent-memory chat UI (local SQLite for history + a simple long-term-memory layer), runs **fully offline**. Ship the installer + one screen-recorded demo.
- **Why now:** The uncensored-local model just hit 4M downloads *this week*; the hosted-platform churn is happening *now*; the packaging gap is wide open.
- **Confidence: 4/5.**

### 2. On-device "see-and-act" vision-grounding API wrapping LocateAnything-3B
- **Category / stage:** Developer infrastructure / nascent. Carryover — and now overdue.
- **Velocity / cross-validation:** `nvidia/LocateAnything-3B` (image + instruction → coordinates) is still near the top of the Hub at **2,266 likes, 247,517 downloads** — up again from 241k yesterday. It's the missing primitive under every browser/computer-use harness on today's GitHub board (`ECC` 219k, `hermes-agent` 199k, `AutoGPT`, `browser-use` 100k, `dify`, `open-webui`, `langchain`, `firecrawl`). Guests: **Pieter Levels (0.88)**, Brett Adcock (0.82), Demis Hassabis (0.76) on on-device vision.
- **Hypothesis:** Computer-use agents bolt on a slow, cloud-round-tripping vision step to decide where to click — expensive, latency-bound, screen-leaking. A local 3B grounding model behind a clean `locate(image, instruction) → point` API kills the round-trip and the privacy problem at once.
- **MVP (≤1 week):** Wrap `LocateAnything-3B` in a local HTTP server + thin SDK; one demo driving a real desktop app fully offline.
- **Why now:** It's held at or near #1-most-liked for over a week while the harnesses that consume it consolidate. The primitive exists before a default packaging of it does.
- **Confidence: 4/5.**

### 3. A per-task model router — "which swappable backend actually wins this job"
- **Category / stage:** Developer tooling / nascent. Carryover; the signal held and widened.
- **Velocity / cross-validation:** The Hub keeps fattening the menu of interchangeable backends — **`zai-org/GLM-5.2`** (fresh today, 1,915 likes), `unsloth/GLM-5.2-GGUF`, `MiniMaxAI/MiniMax-M3` (120k dl), `moonshotai/Kimi-K2.7-Code` (413k dl), the `gemma-4-12B-coder-fable5` GGUF (415k dl), plus the new agentic `gemma-4-12B-agentic-fable5...tau2-GGUF`. `ollama` (174k stars) treats all of these as drop-in. The model slot is a config value; nobody on the GitHub board answers "which one, for *this* task, at *this* cost." Guest cross-validation: AI agent tooling is the top builder topic — **Dharmesh Shah (0.90)**, **Greg Isenberg (0.80)**, both strong-tag.
- **Hypothesis:** A team on ollama/dify has 5–10 swappable backends and zero principled way to assign one per task type. They hard-code a default, overpay on easy tasks, underperform on hard ones. A router that shadow-runs task classes and routes to the cheapest model clearing a pass-rate floor is pure margin.
- **MVP (≤1 week):** A thin proxy in front of ollama: tag incoming tasks by class, shadow-run 2–3 backends on a sample, record pass-rate + tokens, route live to the cheapest passing model. Ship the routing table as the artifact.
- **Why now:** Commoditization of the model slot is structural now, not a blip — GLM-5.2 landing as just another swappable GGUF this morning is the proof. The routing layer is the value commoditization creates.
- **Confidence: 3/5.**

## Consumer pulse

The two ecosystems are as far apart as ever. Consumer attention (fresh Google Trends) is local weather and news (`okc weather`, `news 9 okc`, `weather storms tornadoes`), the **2026 FIFA World Cup**, a `zelda ocarina of time remake` rumor, and Hilary Duff; YouTube/X are prior-day fallback (trailers, KAROL G, brainrot). The one consumer-commerce signal worth a glance is **`aldi blind boxes giveaway`** — blind-box/collectible mania crossing into discount grocery — but it's single-source and physical-goods. Against that, **100% of today's buildable signal is in the AI ecosystem**, and unusually it's not the builder side this time: the loudest data point is a *consumer* one wearing developer clothes — 4M people pulling an uncensored local model. Builders are still mining frontier traces (Fable 5 datasets remain the top of the dataset board); consumers, quietly, are downloading a model they can keep.

## MFM angle

**Greg Isenberg** (0.78 on AI companions/romance, strong-tag, tier-1) owns today's frame. His running thesis — there's a real, under-served business in building for loneliness and for the "AI relationship" market — lands exactly on the 4M-download uncensored model and the r/AICompanions churn: the demand is proven and it's actively fleeing the hosted incumbents. That's the clip. **Pieter Levels** (0.88 on local LLMs / on-device vision) is the complementary voice and the right lens on *how* to ship it — he's the archetype of wrapping a small local model into a one-person product, which is opportunity #1 (and #2) almost exactly.

## Kill list

- **Aldi / Labubu-style blind-box mania.** Real consumer heat, but it's a retail-promo and physical-goods play with no software edge and a single-source read. Leave it to the resellers.
- **Another vanilla fable5-distilled coder GGUF.** The board already has one at 415k downloads and a second agentic variant shipping. A seventh me-too distilled coder is racing a race that's already won in public — the open gap is packaging local models for *people* (opp #1), not another fine-tune for builders.

## This week's ship

Ship the **bring-your-own-model local companion runtime** by Friday — because the single loudest signal in the entire dataset this week is 4 million people pulling an uncensored local model, and the consumer-AI scrape independently shows users churning off hosted companions toward exactly this. One command → pull `Qwen3.6-A3B-uncensored` via ollama → persistent-memory chat UI → fully offline. It's finishable in a week and it rides the freshest demand on the board. If it slips, the **on-device vision-grounding API** (opp #2) is the overdue carryover to close instead — it's been #1-most-liked for a week and is the crispest pure-infra build on this list.

---

*Data note: X, TikTok, TikTok-v2 and Instagram are all over the Apify monthly hard limit today (X and YouTube errored on the same limit) — treat all consumer-social signal as prior-day fallback or empty. The consumer-AI use-case scrape was light again: 14 posts, one subreddit (r/AICompanions), and the categorizer dumped all 14 into Companion/Romance, so read that bucket as "a heartbeat from one room," not a measured distribution. Wikipedia, Google Trends, App Store, Hacker News, Reddit, HuggingFace and GitHub are all fresh as of this morning — and that's where today's story lives, so weight the AI-ecosystem read accordingly.*
