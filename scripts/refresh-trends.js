#!/usr/bin/env node
/* refresh-trends.js — build mfm-universe/data/trends-latest.json from the
 * trend-detector pipeline output.
 *
 * Reads three trend-detector artifacts:
 *   - data/processed/latest.json                   (AI/Wikipedia backbone + consumer feeds)
 *   - data/processed/ai-use-cases.json             (how people actually use AI)
 *   - data/processed/mfm-guest-matches-latest.json (MFM guest affinity)
 *
 * Produces one consolidated, trimmed JSON that trends.html fetches at runtime.
 * Also precomputes a `viz` block (consumer-lane breakdown + theme split +
 * use-case split) so the daily run "creates the visualization while pulling
 * the data" rather than leaving it all to the browser.
 *
 * Run via refresh-trends.sh (or directly: `node scripts/refresh-trends.js`).
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(ROOT, '../trend-detector/data/processed');
const SRC = path.join(SRC_DIR, 'latest.json');
const SRC_USECASES = path.join(SRC_DIR, 'ai-use-cases.json');
const SRC_GUESTS = path.join(SRC_DIR, 'mfm-guest-matches-latest.json');
const DST = path.resolve(ROOT, 'data/trends-latest.json');

if (!fs.existsSync(SRC)) {
  console.error('✗ Source not found:', SRC);
  process.exit(1);
}

const readJson = (p) => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { return null; }
};

const raw = readJson(SRC);
const useCasesRaw = readJson(SRC_USECASES);
const guestsRaw = readJson(SRC_GUESTS);

/* ─── helpers ─────────────────────────────────────────────────────────── */
function trimEntity(e) {
  return {
    ...e,
    pageview_history: (e.pageview_history || []).slice(-14),
    sample_items: (e.sample_items || []).slice(0, 5),
  };
}
const num = (v) => (typeof v === 'number' && isFinite(v) ? v : 0);

/* ─── consumer feeds (slim — drop heavy raw / description / thumbnails) ── */
const googleTrends = (raw.google_trends_top || []).slice(0, 12).map((g) => ({
  rank: g.rank,
  query: g.query || g.title || '',
  traffic_value: num(g.traffic_value),
  approx_traffic: g.approx_traffic || '',
  top_news: (g.news_items && g.news_items[0])
    ? { title: g.news_items[0].title, url: g.news_items[0].url, source: g.news_items[0].source }
    : null,
}));

const youtubeTop = (raw.youtube_top || [])
  .slice()
  .sort((a, b) => num(b.views) - num(a.views))
  .slice(0, 20)
  .map((y) => ({
    rank: y.rank,
    title: y.title || '',
    channel: y.channel || '',
    views: num(y.views),
    likes: num(y.likes),
    video_id: y.video_id || '',
  }));

const instagramTop = (raw.instagram_top || []).slice(0, 20).map((p) => ({
  rank: p.rank,
  username: p.username || '',
  section: p.section || '',
  topic: p.topic || '',
  caption: (p.caption || '').slice(0, 140),
  likes: num(p.likes),
  comments: num(p.comments),
  url: p.url || '',
  is_video: !!p.is_video,
}));

const tiktokV2Top = (raw.tiktok_v2_top || []).slice(0, 20).map((t) => ({
  rank: t.rank,
  name: t.name || '',
  trend_type: t.trend_type || 'creator',
  followers: num(t.followers),
  handle: (t.raw && t.raw.creatorHandle) || (t.creator || ''),
}));

const xTop = (raw.x_top || []).slice(0, 25);

/* ─── theme classification for the consumer-lane breakdown viz ─────────── */
const THEMES = [
  { key: 'sports', label: 'Sports', color: '#1aa971',
    re: /\b(nba|nfl|nhl|mlb|game \d|playoffs?|finals?|knicks|cavs|lakers|celtics|brunson|harden|vs\.?|[a-z]fc\b| fc |united|league|soccer|football|golf|tennis|rugby|cricket|world cup|ufc|boxing|atp|wta|nascar|formula 1|olympics?|basketball|wrestling|gymnastics|skateboard|scooter|spurs|hoop|derby|kkr|coach)/i },
  { key: 'entertainment', label: 'Entertainment & Music', color: '#6e5cff',
    re: /\b(trailer|teaser|official (video|music)|movies?|films?|season \d|episode|tv ?&|tv series|fantasy tv|drag race|vevo|song|albums?|lyrics?|netflix|prime video|disney|hbo|marvel|premiere|bollywood|reaction|celebrities?)/i },
  { key: 'gaming', label: 'Gaming', color: '#ff5d6e',
    re: /\b(minecraft|roblox|brainrot|smp|among us|fortnite|gameplay|gamer|speedrun|admin abuse|marvel rivals|fan ?fest)\b/i },
  { key: 'tech_ai', label: 'Tech & AI', color: '#4a9fff',
    re: /\b(a\.?i\.?|chatgpt|openai|gpt|claude|llm|iphone|android|software|startup|gadget|disney ?plus)\b/i },
  { key: 'money', label: 'Money & Markets', color: '#e2a93b',
    re: /\b(stock|\$[a-z]|earnings|markets?|crypto|bitcoin|ipo|alphabet|nasdaq|dow|shares|investor|inflation|capital)/i },
  { key: 'news', label: 'News & Politics', color: '#0d4a8c',
    re: /\b(election|primary results?|trump|biden|congress|senate|court|verdict|war|ground stop|power outage|storm|hurricane|protest|aipac|golden dome|flag)/i },
  { key: 'lifestyle', label: 'Lifestyle & Culture', color: '#ff2d77',
    re: /\b(fashion|beauty|skincare|makeup|fitness|workout|recipe|cooking|wellness|travel|parenting|pets?|streetwear|kawaii|wedding|bridal)/i },
];
function classifyTheme(text) {
  const s = String(text || '');
  for (const t of THEMES) if (t.re.test(s)) return t.key;
  return 'other';
}

/* every descriptive consumer item → one theme bucket.
 * X trends are excluded — terse proper-noun tokens don't theme reliably. */
const consumerItems = [
  ...googleTrends.map((g) => `${g.query} ${g.top_news ? g.top_news.title : ''}`),
  ...youtubeTop.map((y) => `${y.title} ${y.channel}`),
  ...instagramTop.map((p) => `${p.section} ${p.section} ${p.topic} ${p.caption}`),
];
const themeCounts = {};
for (const item of consumerItems) {
  const k = classifyTheme(item);
  themeCounts[k] = (themeCounts[k] || 0) + 1;
}
const totalConsumer = consumerItems.length || 1;
const consumerThemes = [...THEMES, { key: 'other', label: 'Other', color: '#5a7a96' }]
  .map((t) => ({
    key: t.key, label: t.label, color: t.color,
    count: themeCounts[t.key] || 0,
    pct: Math.round(((themeCounts[t.key] || 0) / totalConsumer) * 100),
  }))
  .filter((t) => t.count > 0)
  .sort((a, b) => b.count - a.count);

/* per-lane scoreboard */
const consumerLanes = [
  { key: 'google', label: 'Google Trends', color: '#4a9fff', count: googleTrends.length,
    top: googleTrends[0] ? googleTrends[0].query : '' },
  { key: 'youtube', label: 'YouTube', color: '#ff5d6e', count: youtubeTop.length,
    top: youtubeTop[0] ? youtubeTop[0].title : '' },
  { key: 'instagram', label: 'Instagram', color: '#ff2d77', count: instagramTop.length,
    top: instagramTop[0] ? `${instagramTop[0].topic} — @${instagramTop[0].username}` : '' },
  { key: 'tiktok', label: 'TikTok creators', color: '#6e5cff', count: tiktokV2Top.length,
    top: tiktokV2Top[0] ? tiktokV2Top[0].name : '' },
  { key: 'x', label: 'X / Twitter', color: '#0d2540', count: xTop.length,
    top: xTop[0] ? xTop[0].trend : '' },
].filter((l) => l.count > 0);

/* ─── use cases ───────────────────────────────────────────────────────── */
const USECASE_COLORS = ['#ff5d6e', '#6e5cff', '#4a9fff', '#e2a93b', '#1aa971',
  '#ff2d77', '#0d4a8c', '#5a7a96', '#ffb547', '#335577'];
let useCases = null;
let useCaseSplit = [];
if (useCasesRaw && Array.isArray(useCasesRaw.categories)) {
  const cats = useCasesRaw.categories.filter((c) => num(c.count) > 0);
  const totalUC = cats.reduce((s, c) => s + num(c.count), 0) || 1;
  useCases = {
    posts_analyzed: useCasesRaw.posts_analyzed || 0,
    coverage: useCasesRaw.coverage || 0,
    categories: cats.map((c) => ({
      id: c.id, label: c.label, desc: c.desc, count: num(c.count),
    })),
  };
  useCaseSplit = cats
    .slice()
    .sort((a, b) => num(b.count) - num(a.count))
    .map((c, i) => ({
      label: c.label, count: num(c.count),
      pct: Math.round((num(c.count) / totalUC) * 100),
      color: USECASE_COLORS[i % USECASE_COLORS.length],
    }));
}

/* ─── MFM guest affinity ──────────────────────────────────────────────── */
let guestAffinity = null;
if (guestsRaw && Array.isArray(guestsRaw.topics)) {
  // trend_score is on wildly different scales per source_kind (follower counts
  // vs post counts vs pageviews), so a raw score sort buries the substantive
  // topics under raw social. Rank by source_kind priority instead, cap the
  // noisy social kinds, and sort by score only within a kind.
  const SK_PRIORITY = {
    daily_brief_opportunity: 0, consumer_ai_use_case: 1, wikipedia_entity: 2,
    huggingface_cluster: 3, github_cluster: 3, google_trends_query: 4,
    instagram_topic_cluster: 5, youtube_trending_video: 6, tiktok_trend: 7,
  };
  const SK_CAP = {
    google_trends_query: 4, instagram_topic_cluster: 3,
    youtube_trending_video: 3, tiktok_trend: 3,
  };
  const byKind = {};
  for (const t of guestsRaw.topics) (byKind[t.source_kind] ||= []).push(t);
  let ranked = [];
  for (const [kind, arr] of Object.entries(byKind)) {
    arr.sort((a, b) => num(b.trend_score) - num(a.trend_score));
    ranked.push(...(SK_CAP[kind] ? arr.slice(0, SK_CAP[kind]) : arr));
  }
  ranked.sort((a, b) => (SK_PRIORITY[a.source_kind] ?? 9) - (SK_PRIORITY[b.source_kind] ?? 9));

  const topics = ranked
    .slice(0, 24)
    .map((t) => ({
      id: t.id, name: t.name,
      summary: t.summary || '',
      lanes: t.lanes || [],
      source_kind: t.source_kind || '',
      trend_score: num(t.trend_score),
      guests: (t.guest_matches || []).slice(0, 5).map((g) => ({
        name: g.name, tier: g.tier,
        affinity: g.affinity,
        confidence: g.confidence,
        tag_recommendation: g.tag_recommendation,
        evidence_summary: g.evidence_summary || '',
      })),
    }))
    .filter((t) => t.guests.length > 0);

  const guestCoverage = (guestsRaw.guest_coverage || [])
    .slice()
    .sort((a, b) => num(b.strong_matches) - num(a.strong_matches) || num(b.max_affinity) - num(a.max_affinity))
    .slice(0, 14)
    .map((g) => ({
      name: g.name, tier: g.tier,
      matches: num(g.matches), strong_matches: num(g.strong_matches),
      max_affinity: g.max_affinity,
      topics: (g.topics || []).slice(0, 4).map((t) => ({
        topic_name: t.topic_name, affinity: t.affinity,
        tag_recommendation: t.tag_recommendation,
      })),
    }));

  guestAffinity = {
    run_date: guestsRaw.run_date || '',
    guests_scanned: guestsRaw.guests_scanned || 0,
    topics_scanned: guestsRaw.topics_scanned || 0,
    caveats: guestsRaw.caveats || [],
    topics,
    guest_coverage: guestCoverage,
  };
}

/* ─── assemble ────────────────────────────────────────────────────────── */
const out = {
  generated_at: raw.generated_at,
  sources_scanned: raw.sources_scanned,
  items_scanned: raw.items_scanned,
  wiki_candidates: raw.wiki_candidates,

  // counts
  tiktok_hashtags_count: raw.tiktok_hashtags_count || 0,
  x_trends_count: raw.x_trends_count || 0,
  huggingface_models_count: raw.huggingface_models_count || 0,
  github_repos_count: raw.github_repos_count || 0,
  google_trends_count: raw.google_trends_count || googleTrends.length,
  youtube_trends_count: raw.youtube_trends_count || 0,
  instagram_trends_count: raw.instagram_trends_count || 0,
  tiktok_v2_count: raw.tiktok_v2_count || 0,

  // AI / Wikipedia backbone
  triple_validated: (raw.triple_validated || []).map(trimEntity),
  tiktok_validated: (raw.tiktok_validated || []).map(trimEntity),
  x_validated: (raw.x_validated || []).map(trimEntity),
  buildable_only: (raw.buildable_only || []).slice(0, 30).map(trimEntity),
  top_entities: (raw.top_entities || []).slice(0, 60).map(trimEntity),
  tiktok_top: raw.tiktok_top || [],
  x_top: xTop,
  huggingface_models: raw.huggingface_models || [],
  huggingface_datasets: raw.huggingface_datasets || [],
  github_top: raw.github_top || [],

  // consumer feeds
  google_trends_top: googleTrends,
  youtube_top: youtubeTop,
  instagram_top: instagramTop,
  tiktok_v2_top: tiktokV2Top,

  // how people use AI
  use_cases: useCases,

  // MFM guest affinity
  guest_affinity: guestAffinity,

  // precomputed visualizations
  viz: {
    consumer_themes: consumerThemes,
    consumer_lanes: consumerLanes,
    use_case_split: useCaseSplit,
  },
};

fs.mkdirSync(path.dirname(DST), { recursive: true });
fs.writeFileSync(DST, JSON.stringify(out));

const sizeKB = (fs.statSync(DST).size / 1024).toFixed(1);
console.log(`✓ trends-latest.json written  (${sizeKB} KB)`);
console.log(`  consumer feeds : google ${googleTrends.length} · youtube ${youtubeTop.length} · instagram ${instagramTop.length} · tiktok-creators ${tiktokV2Top.length}`);
console.log(`  consumer themes: ${consumerThemes.map((t) => t.label + ' ' + t.count).join(' · ')}`);
console.log(`  use cases      : ${useCaseSplit.length} categories`);
console.log(`  guest affinity : ${guestAffinity ? guestAffinity.topics.length + ' topics × ' + guestAffinity.guest_coverage.length + ' guests' : 'none'}`);
console.log(`  triple-valid   : ${out.triple_validated.length}`);
