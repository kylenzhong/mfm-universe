# GitHub's AI trending list is 14-for-14 agent infrastructure — the consumer internet is just watching trailers

*Daily Trend Brief · Friday, May 22, 2026*

## TL;DR

- **The builder ecosystem has collapsed onto one layer: agent plumbing.** Every one of the top 14 AI repos trending on GitHub today is a harness, a tool, or a model server — ECC ("agent harness performance optimization," 188k ⭐), AutoGPT, ollama, hermes-agent ("the agent that grows with you"), dify, langchain ("the agent engineering platform"), firecrawl and browser-use ("for AI agents"), vllm, TradingAgents. Not one consumer product. HuggingFace says the same thing one level down: the trending *datasets* are SWE-ZERO-12M-trajectories, Open-MM-RL and PsiBotAI/SynData — agent training data. The whole open-source AI economy is building the rails, not the train.
- **Consumer side: pure entertainment, zero build surface.** YouTube's top video is the Boys final-season teaser at 7.5M views; Google Trends is IPL cricket (SRH vs RCB), tennis and Dell/ARM stock; X is Memorial Day and Good Friday. Wikipedia's "buildable" list is films, a Kendrick song and 2026 World Cup squads. `triple_validated = 0`. ChatGPT is the only consumer entity with real cross-validation — on both the App Store top-free and top-grossing charts, mentioned across 9 sources.
- **Noise / data caveats.** The TikTok hashtag actor returned 0 rows again (weeks-long pattern); tiktok-v2 and Instagram actors both timed out and fell back to 3-day-old (May 19) data; hn-front failed once. The Wikipedia anchor is news-cycle churn today — treat the entity scorer as offline and read the Reddit + GitHub + HF layers instead.

## Top 3 buildable opportunities

### 1. Agent-skill distribution layer — `publish-skill`
- **Category / stage** — AI builder infrastructure; emerging, fragmented, no incumbent.
- **Velocity / cross-validation** — the cleanest validation this trend has had: the top 14 GitHub AI repos are all agent harnesses/tools, and "AI agent tooling and harnesses" is the #1 builder topic in the guest-match data. Every harness — ECC, hermes-agent, dify, langchain, AutoGPT — reinvents skill packaging; none share a format.
- **Hypothesis** — harnesses are multiplying weekly but a skill written for one can't move to another. The winner isn't harness #15, it's the `npm`-equivalent underneath all of them. The first credible registry sets the standard.
- **MVP** — `npx publish-skill <dir>` + a one-page public index of published skills. Provider-neutral. This is already your in-flight Friday deliverable — finish it.
- **Why now** — the harness count is still climbing and the distribution gap widens every week it stays unfilled. Today's GitHub pull is the thesis aimed dead-on.
- **Confidence: 4/5.**

### 2. Local-model router — on-device fallback for cloud LLM apps
- **Category / stage** — developer tooling; emerging, real demand, no clean product.
- **Velocity / cross-validation** — ollama is the #3 AI repo (172k ⭐) and its tagline now lists Kimi-K2.5, GLM-5, MiniMax, DeepSeek and gpt-oss; HuggingFace's model list is wall-to-wall GGUF — unsloth's Qwen3.6 27B/35B MTP builds, MiniCPM-V-4.6 multimodal at 221k downloads. "Local LLMs on consumer hardware" and "on-device vision" are both top-5 builder topics.
- **Hypothesis** — every cloud-LLM app eats latency, cost and outage risk on calls a 27B local model could serve fine. Nobody ships a drop-in router that decides "local vs cloud" per request against a quality floor.
- **MVP** — an npm package: wrap an OpenAI-style client, route trivial calls to a local Ollama model, escalate hard ones to the cloud API, log the split. One week.
- **Why now** — local models just got good enough (Qwen3.6, MiniCPM-V) and ollama's distribution is already there. The glue is missing.
- **Confidence: 3/5.**

### 3. Roleplay / interactive-fiction authoring workspace
- **Category / stage** — creative AI tooling; emerging, displaced demand.
- **Velocity / cross-validation** — Creative writing is the #2 consumer-AI use case (26 posts) behind Companion/Romance. Today's live evidence is a verbatim r/CharacterAI post: "I proved I'm 18+. Stop blocking my fight scenes." — the calibrated-filter complaint, stated for you.
- **Hypothesis** — the storytelling segment wants a *document*, not a *partner*. Incumbent filters are too blunt (they block violence alongside sex), memory too short; raw APIs have no authoring UX. Nobody serves the middle.
- **MVP** — a story workspace: character-sheet sidebar, pinned long-context memory, markdown export, and a filter that allows graphic violence while age-gating sexual content. The filter is the wedge.
- **Why now** — the same incumbent-filter collapse driving companion churn, different user. An adjacent build, not an instead-of.
- **Confidence: 3/5.**

## Consumer pulse

The two ecosystems are not looking at the same internet. The consumer feeds — YouTube, Google Trends, X, Instagram — are 100% entertainment and calendar: a Boys trailer at 7.5M views, four film trailers, IPL cricket, Memorial Day weekend, KAROL G and GloRilla music videos. Useful as a noise floor, useless for building. The only live consumer-AI signal is Reddit's use-case data: Companion/Romance is still #1 at 62 of 137 categorized posts, Creative writing #2 at 26, Code/Development a distant 4 — a ~15:1 consumer-to-builder gap that has held for weeks. Meanwhile the builder ecosystem (GitHub harnesses, HuggingFace GGUF models) is healthy, fast-moving and building exclusively for itself. The measurable fact of the day: the open-source AI economy shipped roughly fourteen pieces of agent infrastructure and zero things a non-technical person could use.

## MFM angle

Today's top trend is agent tooling, and **Dharmesh Shah** is the sharpest voice on it — 0.90 affinity on the "AI agent tooling and harnesses" topic, the highest in the dataset. He built agent.ai and has argued consistently that the agent layer needs *shared infrastructure*, not another standalone framework — which is precisely the `publish-skill` thesis. He's the right person to pressure-test whether a skill registry is a company or a feature. Secondary: **Greg Isenberg** (0.80 on the same topic, 0.78 on AI companions) — the read to pull in if you want the consumer-distribution angle on opp 3.

## Kill list

- **Companion migration funnel** — yesterday's opp 1. The peak-intent window it bet on is already closing: r/CharacterAI's tone today is back to ordinary grumbling ("it was so peak now it's just buns"), not the day-3 obituary threads. The rage-quit moment passed without a visible mass exodus — downgrade to a watch, don't build the funnel.
- **The Wikipedia/entertainment "buildable" cluster** — The Boys, The Odyssey, Karuppu, Eurovision, 2026 World Cup squads. They top `buildable_only` only because the scorer is flattered by movie/TV/sports premieres every single day. Zero build surface — skip the cluster.

## This week's ship

**Ship `publish-skill` v0.1 today. It's Friday, it's the deliverable, and today's data is a green light — don't thrash, don't re-scope, finish it.** `npx publish-skill <dir>` plus the one-page public skill index, provider-neutral. Then measure one number over the weekend: ≥20 GitHub stars in 72h *or* any harness maintainer inbound — that's the signal to push harder Monday. Next week's seed: spend two hours scoping opp 2 (the local-model router) — same builder-infra wave, one layer down, and you'll already have an audience from publish-skill.
