# GitHub's top is now a knife-fight between agent harnesses — and the one primitive all of them need just became the most-liked model on HuggingFace

*Daily Trend Brief · Tuesday, June 23, 2026*

## TL;DR

- **Most interesting movement:** The top of the GitHub trending board has turned into a harness war. **`affaan-m/ECC`** — described literally as "the agent harness performance optimization system" — sits at **220,113 stars**, with **`NousResearch/hermes-agent`** ("the agent that grows with you") right behind at **200,305**, both having vaulted past **AutoGPT (185,100)**. The whole top of the board is now agent infrastructure (`ollama` 174k — now bundling Kimi-K2.6 and GLM-5 as drop-ins — `dify`, `open-webui`, `langchain`, `firecrawl`); the agent-tooling cluster carries a trend score of **1.7M**, an order of magnitude above every other builder topic. Meanwhile the single primitive every one of those harnesses needs to *act* — on-device visual grounding — just became the **most-liked model on the Hub**: `nvidia/LocateAnything-3B` at **2,300 likes / 274,025 downloads**, up from 247k yesterday. The harnesses are commoditizing each other; the grounding layer underneath them is not.
- **Consumer-side:** Off the AI grid entirely, but the *texture* shifted today — fresh Google Trends is unusually explainer-shaped: **`what is a heat dome`**, **`what is a data breach`**, `cryptocurrency trading`, `latest iphone rumors`, `netflix top movies right now`, plus the usual `soccer highlights today` / `soccer world rankings` World Cup tentpole. People aren't searching brands today, they're searching *definitions*.
- **What's noise:** X, TikTok, TikTok-v2 and Instagram are all dark — Apify is over its **monthly hard limit** (YouTube and X both 403'd on it), so those four are prior-day fallback or empty. The cross-source leaderboard is, again, exactly one real entity — **ChatGPT (29.1)** — then Wikipedia pageview sludge (`Voicemails for Isabelle`, footballers, `Toy Story 5`, a 2026 film). Skip the board; today's story is on GitHub and the Hub.

## Top 3 buildable opportunities

### 1. On-device "see-and-act" vision-grounding API wrapping LocateAnything-3B
- **Category / stage:** Developer infrastructure / nascent — and now the contested primitive.
- **Velocity / cross-validation:** `LocateAnything-3B` (image + instruction → coordinates) is now the **#1 most-liked model on the Hub (2,300 likes)** and climbing on downloads (247k → **274k** overnight). It is the missing motor under every harness on today's GitHub board — `ECC` (220k), `hermes-agent` (200k), `AutoGPT` (185k), `dify`, `open-webui`, `langchain`, `firecrawl`. When the harness layer is fragmenting into a dozen interchangeable agents, the value migrates to the primitive they all consume. Guests: **Pieter Levels (0.88)**, **Brett Adcock (0.82)**, Demis Hassabis (0.76) on on-device vision.
- **Hypothesis:** Computer-use agents bolt on a slow, cloud-round-tripping vision step to decide where to click — expensive, latency-bound, screen-leaking. A local 3B grounding model behind a clean `locate(image, instruction) → point` API kills the round-trip and the privacy problem at once, and it's harness-agnostic — it sells to all of them.
- **MVP (≤1 week):** Wrap `LocateAnything-3B` in a local HTTP server + a thin SDK; one demo driving a real desktop app fully offline.
- **Why now:** It just took the #1-most-liked slot *the same week* the harnesses above it are knifing each other for share. The primitive becomes most valuable exactly when the layer above it commoditizes.
- **Confidence: 4/5.**

### 2. A harness-neutral evaluation + routing layer — "which agent harness actually wins this task, on which backend"
- **Category / stage:** Developer tooling / nascent. The harness war creates this slot.
- **Velocity / cross-validation:** Two facts collide today. (a) The harness layer fragmented overnight — `ECC`, `hermes-agent`, `AutoGPT`, `dify`, `langchain` are now five credible, interchangeable agent frameworks at the top of GitHub. (b) The model slot underneath is *already* commoditized — `ollama` (174k stars) bundles Kimi-K2.6 + GLM-5 as drop-ins, and the Hub keeps fattening the swappable menu (`GLM-5.2` fresh today, `MiniMax-M3` 131k dl, the `gemma-4-12B-coder/agentic-fable5` GGUFs at 456k/96k). Nobody answers "which harness × which backend wins *this* task class at *this* cost." Guests: **Dharmesh Shah (0.90)**, **Greg Isenberg (0.80)** on agent tooling, both strong-tag.
- **Hypothesis:** A team adopting agents now faces a two-axis choice — harness *and* model — and hard-codes both on vibes. A shadow-running eval/router that scores task classes across 2–3 harnesses and 2–3 backends and routes live to the cheapest passing combo is pure margin and pure lock-in.
- **MVP (≤1 week):** A thin proxy that tags incoming tasks by class, shadow-runs them across two harnesses on two ollama backends, records pass-rate + tokens, and emits the winning routing table as the artifact.
- **Why now:** The harness layer only just fragmented enough (today) for "which one" to be a real, expensive question. The router is the value that fragmentation creates.
- **Confidence: 3/5.**

### 3. A "bring-your-own-model" local companion runtime — uncensored, offline, un-deplatformable
- **Category / stage:** Consumer AI / nascent. Carryover — cooling slightly, still the loudest consumer download signal.
- **Velocity / cross-validation:** `HauhauCS/Qwen3.6-35B-A3B-Uncensored` is **still #1 on the Hub by downloads at 3,955,016** (off marginally from ~4.08M yesterday) — a 35B MoE with ~3B active params that runs on a laptop, ~9× the next model down. The consumer-AI scrape is again 100% companion/romance (r/AICompanions, 14 posts): hosted-platform fatigue and churn toward local. Guests: **Greg Isenberg (0.78 on companions/romance, strong-tag)**, Pieter Levels (0.88 on local LLMs), Naval (0.56).
- **Hypothesis:** Hosted companion apps keep changing the rules — filters, price hikes, model swaps, deplatforming — and the most-attached users are the most-burned. There's no clean consumer product that says "your companion, your model, on your machine, forever." 4M people did the manual ollama dance to get there; nobody has packaged it.
- **MVP (≤1 week):** One-command app that pulls the uncensored A3B model via ollama, wraps it in a persistent-memory chat UI (local SQLite history + simple long-term-memory layer), runs fully offline. Installer + one screen-recorded demo.
- **Why now:** The download signal is enormous but starting to plateau — package it before the wave breaks. The packaging gap is still wide open.
- **Confidence: 3/5.** *(Downgraded one notch from yesterday — the underlying download count ticked down, so this is now a "ride it before it cools" play, not a "screaming acceleration" one.)*

## Consumer pulse

The two ecosystems are as far apart as ever, but each moved a little today. The **builder** side is unusually loud and unusually *internal*: the entire top of GitHub is agents fighting to be *the* agent (`ECC`, `hermes-agent`, `AutoGPT`, `dify`, `langchain`), and the Hub's most-liked slot went to the grounding primitive that war is fought over (`LocateAnything-3B`). The **consumer** side, by contrast, went quiet and curious: no brand obsession, just explainer queries — `what is a heat dome`, `what is a data breach`, `latest iphone rumors`, `cryptocurrency trading` — against a World Cup sports backdrop. Where the builder feeds are arguing about *how to build agents*, the consumer feeds are just asking *what things are*. YouTube/X/TikTok/Instagram are prior-day fallback (trailers, KAROL G, brainrot), so weight all social-consumer signal lightly. Net: ~100% of today's buildable signal is in the AI ecosystem, and unusually it's concentrated in the *infrastructure* layer, not the application layer.

## MFM angle

**Dharmesh Shah** (0.90 on AI agent tooling, strong-tag, tier-1) owns today's frame. The harness war is a builder-platform story — interchangeable agent frameworks fighting for the developer, with the durable value sliding down to the primitive and the routing layer — and that's exactly the lens Dharmesh brings (the agent.ai / "agents as a platform" thesis). The clip writes itself: "when every harness is a commodity, own the layer underneath." **Pieter Levels** (0.88 on local LLMs / on-device vision) is the complementary voice and the right lens on *how* to ship opp #1 and #3 — he's the archetype of wrapping a small local model into a one-person product, which is opportunity #1 almost exactly.

## Kill list

- **Building "yet another agent harness."** The top of GitHub is now five of them knifing each other above 140k stars each. Entering that race today is racing a commoditization that's happening in public — go *under* it (the grounding primitive, opp #1) or *across* it (the router, opp #2), not into it.
- **A seventh fable5-distilled coder GGUF.** The board already has `gemma-4-12B-coder-fable5` at 456k downloads plus an agentic variant. Another me-too distilled coder for builders chases a won race; the open gap is packaging local models for *people* (opp #3), not another fine-tune.

## This week's ship

Ship the **on-device vision-grounding API** (opp #1) by Friday — because it just became the #1-most-liked model on the Hub *the same week* the harness layer above it fragmented into a five-way knife-fight, which is precisely when a harness-agnostic primitive is most valuable. Wrap `LocateAnything-3B` in a local HTTP server + thin SDK, demo it driving one real desktop app fully offline. It's the crispest pure-infra build on the list, it's finishable in a week, and it sells to every harness on today's board instead of competing with them. If it slips, the **BYO-model local companion runtime** (opp #3) is the carryover to close instead — still the loudest consumer download signal, just package it before it cools.

---

*Data note: X, TikTok, TikTok-v2 and Instagram are all over the Apify monthly hard limit today (X and YouTube both errored on the same 403 limit) — treat all consumer-social signal as prior-day fallback or empty. The consumer-AI use-case scrape was light again: 14 posts, one subreddit (r/AICompanions), and the categorizer dumped all 14 into Companion/Romance, so read that bucket as "a heartbeat from one room," not a measured distribution. Wikipedia, Google Trends, App Store, Hacker News, Reddit, HuggingFace and GitHub are all fresh as of this morning — and that's where today's story lives, so weight the AI-ecosystem read accordingly.*
