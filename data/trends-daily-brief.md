# Daily Trend Brief — 2026-05-18

> Monday. **Hermes-agent re-accelerated to +1,630 stars (was +1,336)** — yesterday's "3-day decel chain → harness war cooling" call broke. ECC decelerated further (+974 vs +1,183). The two leaders are NOT converging; Hermes is pulling away. Meanwhile **the token-efficiency category went from "two named entrants" to "five named entrants and accelerating"** in 24h — `rtk-ai/rtk` +517 (up from +408, day-2 acceleration), `caveman` +401 (up from +276), plus NEW `opensquilla/opensquilla` at 999 stars ("Token-Efficient AI Agent — same budget, higher intelligence density") and NEW `sno-ai/llmix` ("Production LLM call layer"). The `publish-skill` thesis from yesterday now has its strongest substrate yet. TikTok empty for the 3rd consecutive day — Apify actor needs a fix today or the source gets cut from the brief tomorrow.

## TL;DR

- **Token-efficiency category is fully formed and accelerating.** rtk-ai/rtk and caveman both accelerated on day 2 (+27% and +45% star velocity respectively). NEW `opensquilla` lands at 999 stars on first detection. NEW `sno-ai/llmix` ("Production LLM call layer"). That's five named, simultaneously-accelerating entrants in the operational-tooling-for-heavy-CC-users category. This is the strongest cross-source thesis on the board today.
- **Hermes broke the 3-day decel chain. ECC didn't.** Hermes +1,630 (was 1,336 → 1,459 → 1,693). ECC +974 (was 1,183 → 1,299 → 835). Yesterday's "harness war cooling" call was wrong by one day. Practical implication: still don't tie a deliverable to either harness — `publish-skill` cross-harness positioning gets *more* important if Hermes wins, not less.
- **NEW category emerging: Native Desktop AI Companion.** `basionwang-bot/HermesPet` (NEW, macOS notch AI companion, Swift 6) and `gonemedia/aipointer` (NEW, cursor-overlay companion — "Hold a key, ask a question") both surfaced today. Distinct from web companion apps. Companion is still the #1 consumer use case (419 posts, +6 from yesterday). Worth a watch slot.

## Top 3 buildable opportunities

### 1. `publish-skill` — cross-harness skill packager. SHIP THIS WEEK. Conviction rising.

- **Name** — `publish-skill` (or `cowork-skill-toolkit`). Node CLI: one SKILL.md + supporting files → emits format-correct outputs for Claude Code skills, `everything-claude-code` convention, Hermes plugin, and the Codex agent-skill spec.
- **Velocity / cross-validation** — Token-efficiency / skill-tooling stack today:
  - `rtk-ai/rtk` +517 (now 49,585) — day-2 *acceleration* from +408. CLI proxy for token reduction.
  - `JuliusBrussee/caveman` +401 (now 61,522) — day-2 *acceleration* from +276. Claude Code skill, "many token / few token."
  - **NEW `opensquilla/opensquilla` at 999 stars** — "Token-Efficient AI Agent — same budget, higher intelligence density."
  - **NEW `sno-ai/llmix` at 128 stars** — "Production LLM call layer for AI agents and tools: keep OpenAI/Anthropic/AI SDK/…" — adapter pattern, exact `publish-skill` adjacency.
  - `DenisSergeevitch/agents-best-practices` +135 (now 760) — day-3 retention on cross-provider spec, slowing but still adding.
  - `lightseekorg/tokenspeed` +15 (now 1,048) — "speed-of-light LLM inference engine."
  - **5 named token-tooling entrants, 3 accelerating on day 2-3.** This is no longer a hypothesis; it's a market.
- **Hypothesis** — Skill authoring is detaching from harness selection as its own market. Heavy CC users want operational tooling (token budget, telemetry, cross-harness portability) more than they want another harness. A packager that ships skills *as ops tools* — `--add-token-budget` flag baking caveman/rtk-style prompts into outputs — meets the audience where it is.
- **MVP** — Same as yesterday, *strengthened*: `npx publish-skill <dir>` emits `dist/{claude-code,hermes,cc-everything,codex}/`. Hard-code the 4 format divergences (Monday morning research pass). Ship Kindred-loader as the bundled example. **Add `--add-token-budget` and `--with-best-practices` flags** — the first bakes in token-reduction skill prompts in the output (lean into rtk/caveman audience); the second auto-includes `agents-best-practices` compliance metadata. These two flags are the *opinionated* hook that says "this tool is for operators, not authors."
- **Why now** — Token-tooling sub-narrative is 3-named-entrants-deep and *accelerating* — Day-1 detection 5/16, Day-2 confirmation 5/17, Day-3 *acceleration with 2 new entrants* today 5/18. That's a 3-day curve too steep to ignore. Window before someone ships the packager is now <7 days.
- **Confidence: 5/5 to ship by Friday.** Up from 4/5 yesterday. Two new operationally-framed token-tooling repos in one day is the kind of cross-validation that has been missing all week.

### 2. Native Desktop AI Companion — new category surfaced today. 3-day watch.

- **Name** — `notch-companion` (or similar). A macOS menubar/notch AI companion app: hold a key, get an answer; or a desktop-resident persona-tool that lives in the system UI, not in a browser tab.
- **Velocity / cross-validation** —
  - **NEW `basionwang-bot/HermesPet`** — "Let AI live in your MacBook notch · zero-dep · multi-engine desktop AI companion (Swift 6 / SwiftUI / macOS 14+)" — 111 stars on first detection.
  - **NEW `gonemedia/aipointer`** — "The AI cursor companion. Hold a key, ask a question, get an answer about whatever…" — 110 stars on first detection.
  - **Consumer demand:** Companion category sustained at #1 — 419 posts (+6 24h, monotonically up for 4 days). Sample includes "I made a curated list of every AI companion app worth trying (30+ apps compared)" — there's an enthusiast audience actively shopping for differentiated form factors.
  - HF supply-side: `Supertone/supertonic-3` +28 trend / +52 likes (voice for companion stack); `ResembleAI/Dramabox` +30 / +32 (interactive dramatic voice); `circlestone-labs/Anima` +17 trend retention.
- **Hypothesis** — Companion as a use case is saturated on web/mobile chat form factor (C.AI etc are losing audience to imploding model quality). The form-factor frontier is *where the AI lives*: notch, cursor, menubar — not "I open an app." Two named desktop-native entrants in 24h is the earliest possible signal of a new layer.
- **MVP** — Don't build this week. Spend 60 minutes Tuesday: install HermesPet, run aipointer, evaluate them as products. Specifically check: (1) Do either let you bring your own model/persona? (2) Do they leverage local LLMs? If the answer to either is "no" — there's a clean wedge for Kindred-as-desktop-app (portable persona file + local fallback), which is a much higher-leverage pivot than the standalone Kindred web ship.
- **Why now** — Earliest possible signal. Both repos NEW today, both >100 stars on first detection (rare for non-meme repos). Either this is the first wave of a new category or it's noise; the only way to know is Tuesday's hands-on test.
- **Confidence: 1/5 to build this week, 3/5 to evaluate Tuesday, 4/5 that the desktop-native form factor is a real frontier.**

### 3. Local-Opus router skill — Qwen 3.6 27B as on-device fallback. UPGRADE: watch → spike this week.

- **Name** — `claude-code-local-router`. CC skill intercepts mechanical subtasks (file moves, lint fixes, simple regex refactors) and routes them to local Qwen 3.6 27B GGUF; falls back to Opus for reasoning. Carried over from yesterday with stronger signal.
- **Velocity / cross-validation** —
  - **HF top 4 + 5 are both Qwen 3.6 GGUFs accelerating:** `unsloth/Qwen3.6-27B-MTP-GGUF` trend +33 to 236, +35 likes; `unsloth/Qwen3.6-35B-A3B-MTP-GGUF` trend +35 to 216, +35 likes. Downloads at 268K and 237K respectively — these are not vanity numbers, they're *being pulled.*
  - **Code/Dev sample posts still leading with the airplane-mode narrative:** "Hugging Face co-founder says Qwen 3.6 27B running on airplane mode is close to latest Opus in Claude Code" appears 3× in today's top sample. Day 2 of the story leading.
  - `Cactus-Compute/needle` NEW-ish at trend 72 (+13) — small on-device inference signal.
  - `Jackrong/Qwopus3.5-9B-Coder-GGUF` NEW at trend 71 — coding-specific quantized model.
  - Wednesday re-evaluation criterion from 5/17 (top-5 hold + Image/Art use-case inflection) is **now met on the local-LLM side, partially on the Image side** (Image/Art ticked 11 → 12, slow but the third consecutive uptick).
- **Hypothesis** — Unchanged from yesterday. The supply side just got stronger: two Qwen 3.6 GGUFs in HF top 5 with real download volume is the strongest "local LLMs are infra again" signal in 3 weeks.
- **MVP** — **This week (Wed-Thu, post `publish-skill` ship):** 2-hour spike to test the airplane-mode claim with a real CC session against Qwen 3.6 27B-MTP-GGUF. If ≥60% of CC's mechanical subtasks can be served locally with acceptable latency, this becomes opp #1 for week-of-5/25, and it's an obvious worked example to bundle inside `publish-skill` (a skill that uses a local model is a tight demo of `publish-skill`'s value prop).
- **Why now** — Two consecutive days of leading-narrative status on r/ClaudeAI + two new accelerating supply-side entrants on HF + the unsloth quants showing 200K+ downloads is enough to commit a 2-hour spike. Don't wait until next Wednesday.
- **Confidence: 4/5 to spike this week, 3/5 to build week-of-5/25 (up from 1/5 yesterday).**

---

## What's new since yesterday (5/17 → 5/18, 24h)

- **GitHub: Hermes-agent re-accelerated** — +1,630 (vs +1,336 yesterday, +1,459 day-3, +1,693 day-4). Three-day decel chain broken. The cycle peak was *not* on 5/14 as claimed yesterday — it may still be ahead.
- **GitHub: ECC decelerated further** — +974 (vs +1,183, +1,299). The "Hermes vs ECC both cooling" call held for ECC; broke for Hermes. Implication: ECC is losing momentum to Hermes specifically, not "the harness war is over."
- **GitHub: `rtk-ai/rtk` accelerated on day 2** — +517 (vs +408). Now 49,585 stars total. Token-tooling thesis confirmed at higher resolution.
- **GitHub: `caveman` accelerated on day 2** — +401 (vs +276). Now 61,522 stars. Same.
- **GitHub: NEW `opensquilla/opensquilla` at 999 stars** — "OpenSquilla — Token-Efficient AI Agent with same budget, higher intelligence density." Drops into the exact category surfaced 48h ago. First-day debut near 1K is unusually strong.
- **GitHub: NEW `sno-ai/llmix` at 128 stars** — "Production LLM call layer for AI agents and tools: keep OpenAI/Anthropic/AI SDK/…" Adapter/portability pattern that's *itself* `publish-skill`-adjacent.
- **GitHub: NEW `basionwang-bot/HermesPet`** (111 stars) — macOS notch AI companion. Earliest signal in the Native Desktop AI Companion category.
- **GitHub: NEW `gonemedia/aipointer`** (110 stars) — cursor-overlay AI companion. Same category, same day.
- **GitHub: NEW `jmerelnyc/Photo-agents` at 931 stars** — "Autonomous self-evolving agents. Vision-grounded layered memory and self-written…" First-day debut near 1K, vision-agent territory; watch list.
- **GitHub: NEW `agentic-in/elephant-agent`** (291) — "Personal-Model First Self Evolving AI Agent." Niche, but the "personal-model first" framing is exactly the Kindred wedge — name-check for Kindred pivot.
- **GitHub: NEW `LiuMengxuan04/shushu-internship-tool` (129 stars, Chinese)** — "Turn job description into project, project into resume, resume into interview." Career-use-case in Chinese market, but reminds: Career category here is still 1 post / day.
- **GitHub: NEW `ahammadmejbah/Awesome-Datasets-Hub` at 105 stars** — curated LLM dataset list. Awesome-list, low-build-value, ignore.
- **GitHub: `DenisSergeevitch/agents-best-practices` +135** (now 760) — day-3 retention. Decelerating from +273 day-2, but still adding meaningfully. The cross-provider spec stays in the picture.
- **HF: `MiniCPM-V-4.6` day-3 acceleration** — trend 587 → 644 (+57), likes 662 → 724 (+62). Still HF #1. Vision-language on-device. Wednesday re-eval threshold met on this axis; Image/Art use-case posts ticked 11 → 12 (third consecutive +1 — small but directional).
- **HF: Both unsloth Qwen 3.6 GGUFs accelerated** — see opp #3. Combined +68 trend / +70 likes / +75K downloads in 24h.
- **HF: `Supertone/supertonic-3` continued accel** — trend 274 → 302 (+28), likes 331 → 383 (+52). Now HF #3, day 3 of acceleration. TTS voice → companion stack.
- **HF: `ResembleAI/Dramabox` continued accel** — trend 115 → 145 (+30), likes 115 → 147 (+32). Persona-tool category continues to grow on supply side, supporting opp #2.
- **HF: NEW `inclusionAI/Ring-2.6-1T`** at trend 73 — 1-trillion parameter MoE-class model. Not buildable; note for awareness of release cadence.
- **HF: NEW `Jackrong/Qwopus3.5-9B-Coder-GGUF`** at trend 71 — small quantized coding model, supports opp #3.
- **HF: NEW `Cactus-Compute/needle`** at trend 72 — on-device inference engine; same.
- **Use cases: Companion +6 (413 → 419)**, monotonic up 4 days. Creative writing flat (181 → 182). Code/Dev +2 (29 → 31). Image/Art +1 (11 → 12, 3rd consecutive +1).
- **Pipeline: TikTok empty 3rd consecutive day, X stable (sports/Real-Housewives clustered).** Apify TikTok actor needs a fix today. If 4th day tomorrow, cut it from the brief.
- **No new triple-validated entities. 8th consecutive day.** Cross-validation lane is structurally dead; treating it as a tertiary signal now.

---

## Consumer AI use cases — today's surprise

The thing that's quietly compounding: **Image/Art is up 3 days in a row (9 → 11 → 12) while Companion is also still climbing (406 → 413 → 419) and Code/Dev is up too (27 → 29 → 31).** Every "interesting" category has positive 24h delta. That's not what a topped-out market looks like — that's what a *broadening* one looks like. The dominant narrative ("AI is just chat") is getting weaker daily, even in the data the brief uses to fact-check itself. The single highest-leverage observation today is that the long-tail consumer categories — Image/Art especially, with its 3-day continuous uptick — finally have HF supply-side validation in the same week: `openbmb/MiniCPM-V-4.6` is HF #1 by trend score for the 3rd day running (image-text-to-text, on-device), `HiDream-ai/HiDream-O1-Image` holds rank 6, and `TencentARC/Pixal3D` is NEW-ish at rank 12. **Product implication:** the consumer-Image opportunity is not "build an image tool" — it's "build for the very narrow corner where on-device-vision is the wedge" (privacy-first photo restoration / private family-photo enhancement / dead-relative photo work — exactly what the leading Image/Art sample post "Fixed my grandfather's picture" is about). That's a real product, with real supply (MiniCPM-V), real demand (12 posts and rising), and it's invisible to anyone building from frontier-model APIs. Not the ship-this-week pick, but the highest-leverage *new* idea on the board today.

---

## Kill list

1. **NBA Game 7 cluster (Cavs/Pistons/Cade/Jarrett Allen/Tobias Harris/Sam Merrill/James Harden/Donovan Mitchell)** — 9 of the top 22 X trends are tonight's playoff game. Calendar event, dies Tuesday morning. Not buildable.
2. **Real Housewives / BaddiesUSA cluster (#RHOA, #RHORI, Porsha, K Michelle, Shamea, #BaddiesUSA, Rollie, Xena)** — 8 trends, reality TV cycle, no AI hook.
3. *(Bonus, pipeline alert)*: **TikTok = 0 hashtags for the 3rd consecutive day.** Investigate the Apify TikTok actor TODAY. If tomorrow's run also returns 0, cut it from the brief and the cross-validation logic — the pipeline is currently spending 3 minutes/day on a dead source.

---

## This week's ship recommendation

**Build `publish-skill` (cross-harness skill packager — opp #1) by Friday 5/22. Include `--add-token-budget` and `--with-best-practices` flags from v0.1. Dogfood with `kindred-loader` as the bundled worked example, regardless of how Kindred's standalone distribution resolved.** Single deliverable that proves/disproves: whether the skill-authoring tier is a real, distinct market separate from harness selection AND whether the operational-tooling framing resonates with the rtk/caveman audience.

**Pass thresholds (any one):**
- ≥20 GitHub stars in 72h post-release (up from yesterday's ≥15 threshold — token-tooling category has been validated, raise the bar)
- ≥1 inbound from a known skill author: `DenisSergeevitch` (agents-best-practices), `JuliusBrussee` (caveman), `affaan-m` (ECC), `WantongC` (journal-adapt-writing-skill), or `rtk-ai` — DM at launch
- ≥1 inbound from `opensquilla` or `sno-ai` maintainers — they're solving the same problem space, would either compete or collaborate

**Fail:** <5 stars in 7 days → category isn't ripe / packager framing was wrong → pivot to either Local-Opus router (opp #3, now spike-worthy) or to investigating Native Desktop AI Companion (opp #2, Tuesday eval first).

**Why this is the right week-bet:** The token-tooling sub-narrative is now 5 named entrants deep, accelerating, and visible to every dev reading GitHub trending. Anyone with a Saturday afternoon can ship a packager in 7 days. The substrate is fully formed. Ship now or watch someone else take the namespace by month-end.

**Monday tactical:**
1. **Morning (1h):** Fix the Apify TikTok actor or cut the source. Don't let it bleed another day.
2. **Morning (2h):** Read the 4 harness skill specs (Claude Code, ECC, Hermes, Codex). Capture the divergences in a single design note.
3. **Afternoon:** Start `publish-skill` v0.1 (CLI scaffolding + format-1: Claude Code).
4. **Tuesday 1h:** Hands-on with HermesPet and aipointer (opp #2 evaluation).
5. **Wed or Thu 2h:** Qwen 3.6 27B airplane-mode spike (opp #3 confirmation).
