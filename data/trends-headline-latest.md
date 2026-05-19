# Token-Efficient Agents — a category formed in public this week

> Six independent open-source projects, all targeting the same problem — making AI agents cost less per useful output — gained meaningful traction simultaneously between May 11 and May 18. Three are accelerating on day-2 of detection. Two debuted at >100 stars on day one. This is the strongest single-category cross-source signal on the board today.

## What got built

The six projects, taxonomized by what layer they target:

### Compression — talk fewer tokens

- **[rtk-ai/rtk](https://github.com/rtk-ai/rtk)** — 49,585 stars, +517 in 24h (day-2 acceleration from +408). A Rust CLI proxy that intercepts LLM calls and claims 60–90% token reduction on common dev commands. Single binary, zero dependencies.
- **[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)** — 61,522 stars, +401 in 24h (day-2 acceleration from +276). A Claude Code skill that rewrites prompts in clipped "caveman" style. The README claim: 65% token cut. Yes, really.

Different mechanisms targeting the same pain. `rtk` is at the network layer; `caveman` is at the prompt-engineering layer. Both reduce the bill a heavy AI user pays when they hit Anthropic's rate ceiling at the end of a long session.

### Orchestration — route smarter

- **[sno-ai/llmix](https://github.com/sno-ai/llmix)** — 128 stars, new this week. A production LLM call layer. Hot-swap providers behind config presets, plus cache, retries, circuit breakers, key rotation, singleflight. Python, TypeScript, and Rust parity.
- **[opensquilla/opensquilla](https://github.com/opensquilla/opensquilla)** — 999 stars on debut. A full agent framework with the explicit positioning: "same budget, higher intelligence density."

This is the production-engineering layer above raw API calls. `llmix` is the adapter pattern — keep your existing code, swap models behind it as a middleware decision. `opensquilla` is the same idea pushed into the agent's runtime.

### Standards — interoperability

- **[DenisSergeevitch/agents-best-practices](https://github.com/DenisSergeevitch/agents-best-practices)** — 760 stars, +135 in 24h, day-3 retention. Provider-neutral skill spec for Codex, Claude Code, and agentic harness design.

This is the quietly important entry. It is not a tool — it is a specification for what a provider-neutral agent skill should look like across multiple harnesses. Standards are the layer that decides which tools win. Whoever defines the interface owns the category.

### Infrastructure — faster inference

- **[lightseekorg/tokenspeed](https://github.com/lightseekorg/tokenspeed)** — 1,048 stars. Self-described as a "speed-of-light LLM inference engine."

The lowest level of the stack. The boring foundation underneath everything else.

## The pattern

Compression, orchestration, standards, infrastructure. **That is not a tool list. That is an operational stack.** Six independent teams arrived at adjacent layers of the same problem inside a seven-day window, and the framing across them converged in real time: this is operational tooling for the heavy AI user.

## Why now

Three structural forces, all reading off the same pressure point.

**The frontier models got faster and more expensive at the same time.** Sonnet 4.5 and Opus 4.5 priced premium reasoning higher than the previous generation while delivering it faster. The combined effect: a heavy AI user can now hit a meaningful cost ceiling in a single workday in a way that was not possible 18 months ago. `rtk` targets exactly "common dev commands" — the workload of a developer running Claude Code through a normal session, not edge-case batch jobs.

**The harness market is fragmenting.** The "agent harness" category — `everything-claude-code`, `hermes-agent`, `dify`, `learn-claude-code`, `deer-flow`, and others — added five named entrants in the last 30 days. Each is incompatible with the others by default. That fragmentation is the demand-creator: when users have to pick between four harnesses, they want operational tooling that works across all of them. `agents-best-practices` and `llmix` are explicitly cross-harness on purpose.

**The demand-side signal is leading.** r/ClaudeAI top posts on May 17 and May 18 cited the "airplane-mode Qwen 3.6 ≈ Opus" narrative three times in 24 hours — heavy users explicitly looking for ways to reduce frontier-API dependence. The supply side (these six projects) and the demand side surfaced the same week. That timing is the structural mark of a category becoming a market.

## The pattern operator commentary is missing

The way the operator class still talks about AI agents in May 2026 is by talking about *agents* and *frameworks*. AutoGPT-style autonomy. AGI-grade reasoning. Self-evolving loops. That is the conversation running on TechCrunch and the prominent VC podcasts.

The actual money and attention this month is going to the layer underneath — to operational tooling for people who are already running agents at scale. Token budgets. Telemetry. Cross-harness portability. Production-grade fallback. The unsexy SaaS layer.

**The boring layer is forming faster than the sexy one, and almost nobody in operator-class commentary is naming it.**

This matters because the boring layer is where the durable businesses get built. Harnesses are interchangeable. The orchestration layer is sticky. Compression tools win because they integrate at the operational pain point. Standards become the moat. If the analogy is to web infrastructure, this week is roughly the 2010 moment when CDNs and queue services and orchestration tooling started naming themselves as a category separately from "websites."

## Three buildable bets the data supports

For builders watching this category, three positions are open right now:

- **The hosted token-budget endpoint.** Sold to teams running Claude Code, ECC, or Hermes at scale. A single SaaS interface that wraps `rtk`-class proxying, exposes telemetry, and bills per token saved. The category currently sells via open-source; the production teams will pay for the hosted version.
- **The cross-harness skill packager.** A tool that takes one canonical SKILL.md plus supporting files and emits the format-correct version for each major harness. This is `agents-best-practices` materialized as a CLI. Whoever ships first owns the namespace. Window: under 30 days.
- **The trade publication for this category.** Stratechery covers SaaS at the application layer. There is currently no Stratechery for the agent-operations layer. The audience is small but high-LTV — the same heavy Claude Code users who pay for Max. A newsletter that covers exactly this category, six repos to start and expanding as the category does, has zero incumbent.

## The operator we want to ask about this

The single person in the MFM podcast circle with the most direct stake in what happened this week is **[Dharmesh Shah](https://x.com/dharmesh)** — CTO and co-founder of HubSpot, founder of [agent.ai](https://agent.ai).

Three reasons.

First, [agent.ai is the largest indie AI agent marketplace by user count](https://www.cxtoday.com/crm/over-2-million-people-are-using-hubspots-unofficial-ai-agent-platform/) — over 2 million users, 26,000 building agents, roughly 1,800 published. It runs on a credit-per-task pricing model. Token efficiency at the agent runtime layer is not an interesting thesis for Dharmesh. It is his platform's unit economics. The six projects above are competing approaches to a problem his platform is already operating against at scale.

Second, [he is a Series A angel investor in Composio](https://siliconangle.com/2025/07/22/composio-raises-25m-funding-ease-ai-agent-development/) — the learning-infrastructure layer for AI agents — alongside Vercel CEO Guillermo Rauch. The July 2025 $25M Lightspeed round closed at the same intersection of dev-infra-for-agents that this week's six projects target.

Third, he publishes [simple.ai](https://simple.ai/) to over 2 million subscribers on exactly this topic. He is also a media operator in the category, not only a builder and investor.

The angle that makes the question substantive: of the six projects on this list, **`agents-best-practices`** is the one that maps most directly to where agent.ai's marketplace economics are headed. A standardized provider-neutral agent skill spec lets a marketplace like agent.ai run any published agent across any underlying LLM with consistent metering — which is the exact question that determines whether the credit-per-task model survives once heavy users start running long-horizon agents on the platform. The provider-neutral standardization that DenisSergeevitch shipped this week is downstream-relevant to a platform decision Dharmesh has to make in the next six months.

---

*Built from the May 18 daily trend brief — Wikipedia pageview velocity cross-validated against TikTok hashtags, X trends, HuggingFace, and GitHub. The full underlying signal data is below; this headline piece is what the data added up to.*
