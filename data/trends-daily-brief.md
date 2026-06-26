# The harness leaderboard is frozen because the race moved one layer down — the top of the HF *dataset* board is now frontier-model traces, and the top small models are clones trained on them

*Daily Trend Brief · Friday, June 26, 2026*

## TL;DR

- **Most interesting movement:** the action left the model layer and showed up in the **datasets**. The top of the Hugging Face dataset board is now a wall of frontier-model traces — `Glint-Research/Fable-5-traces` (414 likes, **26,233 dl**), `armand0e/claude-fable-5-claude-code` (206 likes, 9,869 dl), `lazarus19/Vibe-Coding-Instruct`, `…claude_mythos_distilled_25k`, `…claude-opus-4.6-4.7-reasoning-8.7k` (417 likes, 9,729 dl). And the models pulling real volume are the ones trained *on* exactly that: `gemma-4-12B-coder-fable5-composer2.5-v1-GGUF` is at **516,333 downloads**, with an `agentic-fable5-composer` sibling at 186,663. The loop — harvest a frontier agent's traces → fine-tune a 12B local GGUF that imitates it on one lane — is now visible end-to-end on a single screen. Meanwhile the GitHub harness standings did their daily half-percent grind again: `affaan-m/ECC` **221,924** (+522 from yesterday), `NousResearch/hermes-agent` **203,370** (+852), `AutoGPT` 185,157 (flat), `ollama` 174,923 (flat — still naming Kimi-K2.6 / GLM-5.1 in its own description while the Hub's top-liked model is already `GLM-5.2`). The harnesses are settled. The data layer is where capability is actually being copied.
- **Consumer-side:** total decoupling holds, and today the Google feed is pure mall + tabloid: `mountain dew 5 cent bundles`, `new york times`, `tomodachi life update`, `h&m`, `famous birthdays`, `chlorthalidone recall`, `ncis`, `google play`. Zero AI terms in the top ten. The only live consumer-AI signal is the same one as every day this week — 14 posts, **100% Companion / Romance**, all r/AICompanions.
- **What's noise:** X, TikTok, TikTok-v2 and Instagram are dark. Apify has been 403'ing on the monthly hard limit for ~two weeks; today YouTube and X both 403'd on the same cap, so `youtube_top` and `x_top` are **prior-day fallback, now ~14 days stale** — weight them at zero. The cross-source "leaderboard" is again only two real entities (**ChatGPT 29.1, YouTube 23.4**) sitting on top of Wikipedia pageview sludge (`Voicemails for Isabelle` ×53, `Coppery emerald` ×2293, `House of the Dragon`, FIFA goalscorers). The board is not the story; the dataset shelf is.

## Top 3 buildable opportunities

### 1. A "capability-clone" kit — point it at a frontier agent + one task class, get a small local model that matches it on that lane
- **Category / stage:** Developer infrastructure / nascent — and the one place on the board where the full produce→consume loop is now public.
- **Velocity / cross-validation:** both ends of the loop are simultaneously top-of-board. Demand for the *inputs*: `Fable-5-traces` (26.2k dl) and `claude-fable-5-claude-code` (9.9k dl) are the most-liked datasets on the Hub today. Proof the *outputs* work: `gemma-4-12B-coder-fable5-composer-v1-GGUF` has **516k downloads** and `agentic-fable5-composer` 187k — small models explicitly trained to imitate a frontier composer's traces, pulling more volume than most base models. Nobody has packaged the pipeline *between* them.
- **Hypothesis:** Teams want a cheap local model that's actually good at *their* one workflow (their code style, their support tone, their agent's tool-use). Today they either pay frontier per-token forever, or hand-roll a fragile distillation run. A kit that runs a frontier model over N tasks of one class, logs traces in the proven `Fable-5-traces` schema, fine-tunes a `gemma-4-12B` LoRA, and benchmarks lane pass-rate turns "clone this capability" into one command.
- **MVP (≤1 week):** CLI that (a) drives a frontier model over a user-supplied task set for one lane, (b) emits traces in the Fable schema, (c) fires a LoRA fine-tune on gemma-4-12B, (d) prints a before/after lane benchmark. One screen-recorded demo cloning a single coding-agent behavior.
- **Why now:** the trace-datasets and the trace-trained models hit the top of the board *the same day* — the market just validated both halves publicly, but the connecting tooling is still artisanal.
- **Confidence: 4/5.**

### 2. A local "bring-your-own-model" companion runtime — uncensored, offline, un-deplatformable
- **Category / stage:** Consumer AI / nascent. Carryover — still the single loudest consumer-AI number on the board, still cooling.
- **Velocity / cross-validation:** the uncensored A3B lineage (`Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive`) sits at **3,453,492 downloads** — biggest consumer-AI download figure by an order of magnitude — but the curve keeps rolling over (~3.95M → ~3.52M → ~3.45M across the week). The consumer-AI scrape is again **100% companion/romance** (14 posts, all r/AICompanions): hosted-platform fatigue, churn toward local. Guests: **Greg Isenberg (0.78 companions)**, **Pieter Levels (0.88 local LLMs)**.
- **Hypothesis:** Hosted companion apps keep changing the rules — filters, price hikes, model swaps, deplatforming — and the most-attached users are the most-burned. Nobody has packaged "your companion, your model, on your machine, forever." Millions already did the manual ollama dance to get there.
- **MVP (≤1 week):** one-command app that pulls the uncensored A3B model via ollama, wraps it in a persistent-memory chat UI (local SQLite + a simple long-term-memory layer), runs fully offline. Installer + one demo.
- **Why now:** ride-it-before-it-breaks, not screaming-acceleration — the download curve is declining, so the packaging window is narrowing, not widening. Ship it or drop it.
- **Confidence: 3/5.**

### 3. A lane-specialist model registry — "the best local model for *this* task, this week"
- **Category / stage:** Developer tooling / nascent. The consumption side of Opp #1's produce side.
- **Velocity / cross-validation:** the board is no longer "one base model wins" — it's fragmenting into purpose-built fine-tunes: `gemma-4-12B-coder-fable5-composer` (516k dl) for code, `agentic-fable5-composer` (187k) for tool-use, `Unlimited-OCR` (134k) for OCR, `VibeThinker-3B` (55k) for reasoning, all out-downloading shinier base models. Meanwhile `ollama`'s own description still advertises last-month's base models. Guest: **Pieter Levels (0.88)** — cost-aware, offline, exactly this user.
- **Hypothesis:** A builder picking a local model hard-codes one base model on vibes and never revisits it, leaving a specialist fine-tune that's 2× better on their lane on the table. A registry that tags the live Hub by task lane, ranks the freshest specialist GGUF per lane, and emits a "pull this for X" install line is pure leverage on churn you don't have to track yourself.
- **MVP (≤1 week):** a script that classifies the top ~50 trending GGUFs into ~8 task lanes, ranks each lane by download-velocity + likes, and outputs a one-line `ollama pull` per lane that refreshes daily.
- **Why now:** the specialist-fine-tune layer just out-downloaded the base layer; "which local model for my one task, today" became a real recurring question this week.
- **Confidence: 3/5.**

## Consumer pulse

The two ecosystems stayed fully decoupled and didn't even rhyme. The **builder** side is loud but entirely internal: the GitHub harness standings are the same five names grinding half a percent a day (ECC +522, hermes +852, AutoGPT and ollama flat), and the genuine motion dropped a full layer beneath them — into the **dataset shelf**, where frontier-model traces (`Fable-5-traces`, `claude-fable-5-claude-code`, distilled-reasoning sets) now own the top likes, and the small GGUFs trained on those traces (`gemma-4-12B-…composer`, 516k dl) out-pull the base models. The **consumer** side went the opposite direction entirely — `mountain dew 5 cent bundles`, `h&m`, `ncis`, a `chlorthalidone recall`, `tomodachi life update`. Evergreen retail and tabloid, zero AI. The social feeds (X / YouTube / TikTok / Instagram) are Apify-dark and ~14 days stale — weight at zero. Net: ~100% of today's buildable signal is in the AI stack, and the actionable edge moved again — from *which harness wins* (decided) to *who owns the click* (yesterday) to **who owns the training data** (today). Agents are now being cloned from traces in the open.

## MFM angle

Today's top trend — distillation, trace-datasets, and the agent-tooling layer — lands hardest with two guests by affinity. **Dharmesh Shah (0.90, strong-tag on agent tooling)** is the sharpest read: his "a thin wrapper around a commoditizing model is a trap unless you own a primitive" thesis points straight at this — the primitive just stopped being the model and became *the proprietary trace data you fine-tune on*. He'd argue the moat is now your task-specific dataset, not your harness. **Greg Isenberg (0.80 agent tooling; 0.78 companions)** is the distribution read: he'd package the capability-clone kit as "the boring infra play that prints" while everyone else fights over the frozen harness leaderboard. On the consumer thread, **Pieter Levels (0.88)** stays the patron saint of the ship-it-solo, offline, un-deplatformable build.

## Kill list

- **Building another agent harness.** ECC / hermes / AutoGPT / ollama are a frozen standings table grinding a few hundred stars a day. Showing up to a knife-fight that already ended. Own a layer underneath instead — now the *data* layer.
- **Re-pumping yesterday's grounding model.** `LocateAnything-3B` added 134k downloads in 24h on the 25th and then fell off the top board entirely today. One breakout day is not a roadmap — don't extrapolate a single print into a thesis.

## This week's ship

**Ship the capability-clone kit by Friday** — a CLI that drives a frontier model over a single task lane, logs traces in the `Fable-5-traces` schema, fine-tunes a `gemma-4-12B` LoRA, and prints a before/after lane benchmark, with one screen-recorded demo cloning a real coding-agent behavior. Why: the trace-datasets and the trace-trained models hit the top of the Hub the *same day*, so both halves of the loop are publicly validated — but the tooling that connects them is still hand-rolled, and that gap is the whole opportunity. The harness war is over; the data war just started, and it's wide open.
