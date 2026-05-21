# r/CharacterAI has stopped raging and started grieving — and the exodus is still growing

*Daily Trend Brief · Thursday, May 21, 2026*

## TL;DR

- **The companion meltdown is now day three and compounding, not cooling.** Companion/Romance is still the #1 consumer-AI category and it *grew* — 421 → 483 posts/day (+15%). r/CharacterAI's tone has shifted from anger to obituary: today's threads read "They finally shot themselves in the foot. RIP C.AI," "We did not enjoy all the past updates AT ALL," "I'm no longer addicted, I guess." A second straight up-day on the same signal is the line between a blip and a migration. This is a migration.
- **Consumer side: grief and exits. Builder side: agent harnesses.** GitHub's AI list is wall-to-wall agent infrastructure — ECC ("agent harness performance optimization"), AutoGPT, hermes-agent, dify, OpenHands, browser-use. HuggingFace is Qwen3.6 GGUF + on-device multimodal. The two ecosystems are not looking at the same world: consumers want their companion back, builders are shipping orchestration.
- **Everything else is noise.** Wikipedia, X, YouTube and Google Trends are 100% news/entertainment — The Boys final season, four movie trailers, NBA playoffs, the PGA Championship, an Ebola outbreak. `triple_validated = 0`. TikTok hashtags returned 0 for the sixth straight day; the tiktok-v2 and Instagram Apify actors timed out and fell back to stale data. Cross-source validation is effectively offline today — Reddit + use-case data is the only live builder signal.

## Top 3 buildable opportunities

### 1. Companion migration funnel — catch the refugees at peak intent

- **What** — a "Leaving Character.AI?" funnel: a persona-import tool that converts a C.AI character definition into a portable JSON persona running on a pinned, owned model. Category: consumer AI companion. Stage: category mainstream, exodus live, no incumbent owns the off-ramp.
- **Velocity / cross-validation** — not a Wikipedia/X entity (both are dead for builders today). The validation is stronger than that: a two-day-confirmed trend — Companion/Romance 421→483 — across three companion subreddits (r/CharacterAI, r/Replika, r/myboyfriendisai) converging on one complaint, with r/CharacterAI now self-describing as dead. Intent is maximal *this week*: grieving users are actively hunting for somewhere to go.
- **Hypothesis** — millions formed attachments to a *specific model's behavior*. Every incumbent's business model requires forced migration, so no incumbent can structurally promise permanence. A tool that captures users at the exact moment they rage-quit owns the most valuable funnel position in the category.
- **MVP** — one page: paste your C.AI character → get a portable persona JSON + a live chat on a pinned open model, plus an email capture ("we'll tell you when import is one-click"). One day to build. It ships the funnel and measures real exodus volume.
- **Why now** — day-three obituary threads. The window is the rage-quit, and it is open right now.
- **Confidence: 4/5.**

### 2. Roleplay / interactive-fiction authoring workspace — the other half of the exodus

- **What** — a long-form collaborative-fiction tool: character sheets, real long-context memory, scene-level generation, markdown export, and a filter that allows graphic violence while age-gating sexual content. Category: creative AI tooling. Stage: emerging, displaced demand.
- **Velocity / cross-validation** — Creative writing is the #2 use-case category and it also grew, 182 → 208. Sample posts are overwhelmingly C.AI refugees grieving lost characters ("at least it was dialogue and we could engage with it").
- **Hypothesis** — the storytelling segment is distinct from the romance segment: they want a *document*, not a *partner*. Incumbent filters are too blunt and memory too short; raw APIs have no authoring UX. Nobody serves the middle.
- **MVP** — a story workspace with a character-sheet sidebar, pinned long-context memory, and one-click export. Proving wedge: the calibrated filter — the single loudest unmet complaint in the refugee posts.
- **Why now** — same collapse, different user. Build adjacent to opp 1, not instead of it.
- **Confidence: 3/5.**

### 3. Agent-skill distribution layer — the missing registry behind the harness surge

- **What** — a package/registry layer for agent skills: `publish` + `install` + a discoverable index, provider-neutral. Category: AI builder infrastructure. Stage: emerging, fragmented.
- **Velocity / cross-validation** — GitHub's AI trending list is dominated by agent harnesses — ECC, AutoGPT, hermes-agent, dify, OpenHands, langchain. "AI agent tooling and harnesses" is the top builder topic by a wide margin. Every harness reinvents skill packaging; none share a distribution format.
- **Hypothesis** — harnesses are multiplying but a skill written for one cannot move to another. The winner is not another harness — it is the `npm`-equivalent that sits underneath all of them. The first credible registry sets the standard.
- **MVP** — `npx publish-skill <dir>` plus a one-page index of published skills. This is the in-flight `publish-skill` deliverable; today's GitHub data is direct confirmation the thesis is aimed right.
- **Why now** — the harness count is still climbing; the distribution gap widens every week it stays unfilled.
- **Confidence: 3/5.**

## Consumer pulse

The consumer feeds and the builder ecosystem are looking at completely different worlds today. Google Trends, YouTube, X and Wikipedia are pure mainstream churn — a Boys trailer at 7.5M views, four movie trailers, NBA conference finals, the PGA Championship, an Ebola outbreak in DR Congo. Useful as a noise floor, useless for building. The only live consumer-AI signal is Reddit's use-case data, and it points hard in one direction: 483 Companion/Romance posts versus 37 Code/Development — a 13:1 gap, both categories *up* day-over-day. Builders keep optimizing the 37 (it is what HN and r/SaaS talk about all day) while the 483 sits underserved and, right now, actively churning. The AI builder ecosystem — GitHub harnesses, HuggingFace GGUF models — is healthy and busy, but it is building tools for builders. The gap between what builders ship and what consumers are desperate for has rarely been this measurable.

## MFM angle

**Greg Isenberg** has the sharpest take on today's top trend — affinity 0.78 on the AI-companions topic, and the highest-coverage non-host guest in the dataset. He has argued for over a year that the "loneliness economy" and AI companionship are among the largest underpriced consumer-AI markets, and his framing of community and parasocial products maps directly onto opp 1: the value is not the model, it is the relationship and its continuity. He is the right person to pressure-test whether a migration funnel is a product or just a feature. Secondarily, **Dharmesh Shah** (affinity 0.90 on agent tooling) is the relevant voice for opp 3 — he built agent.ai and has consistently argued the agent layer needs shared infrastructure, not more standalone frameworks.

## Kill list

- **The entertainment cross-validation cluster** — "Hope (2026 film)," "The Boys," "The Odyssey," "Legends," the "Mercy" trailer. They top `buildable_only` and carry cross-validated badges only because app stores and subreddits both mention them. The scorer is flattered by movie/TV premieres every single time. Zero build surface — skip the whole cluster.
- **The TikTok-v2 "creator" leaderboard** — Fernanda, Calle y Poché et al., ranked at 9M+ "trend_score." That number is raw follower count, not trend velocity, and today it is stale fallback data (the actor timed out). A big account is not a moving trend. Ignore.

## This week's ship

**Ship `publish-skill` v0.1 tomorrow, Friday 5/22 — finish it, do not thrash.** It is Thursday; the deliverable is one day out, and today's GitHub pull — agent harnesses dominating the trending list (opp 3) — is direct confirmation the thesis is correctly aimed. Ship `npx publish-skill <dir>` plus the one-page skill index, then measure: ≥20 stars in 72h or any maintainer inbound. Separately, spend *60 minutes today* standing up the opp-1 smoke test — the static "Leaving Character.AI?" page with persona-paste and email capture. It is a day-three signal at peak intent; a landing page costs an hour and tells you next week whether the companion-migration bet is real. Build the page, not the product.
