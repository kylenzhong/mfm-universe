#!/usr/bin/env node
/* refresh-trends.js — trim trend-detector/data/processed/latest.json into
 * mfm-universe/data/trends-latest.json. Stripped fields:
 *   - pageview_history → last 14 days only
 *   - sample_items → first 5 per entity
 *   - top_entities → first 60
 *   - buildable_only → first 30
 *
 * Run via refresh-trends.sh (or directly: `node scripts/refresh-trends.js`).
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, '../trend-detector/data/processed/latest.json');
const DST = path.resolve(ROOT, 'data/trends-latest.json');

if (!fs.existsSync(SRC)) {
  console.error('✗ Source not found:', SRC);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

function trimEntity(e) {
  return {
    ...e,
    pageview_history: (e.pageview_history || []).slice(-14),
    sample_items: (e.sample_items || []).slice(0, 5),
  };
}

const trimmed = {
  ...raw,
  // Keep top-level counts as-is
  triple_validated: (raw.triple_validated || []).map(trimEntity),
  tiktok_validated: (raw.tiktok_validated || []).map(trimEntity),
  x_validated:      (raw.x_validated || []).map(trimEntity),
  buildable_only:   (raw.buildable_only || []).slice(0, 30).map(trimEntity),
  top_entities:     (raw.top_entities || []).slice(0, 60).map(trimEntity),
  // cross_validated isn't rendered, drop it
  cross_validated: undefined,
  // recent_items list is also not rendered
  recent_items: undefined,
  // tiktok_top, x_top, huggingface_models, huggingface_datasets, github_top
  // are small enough — keep verbatim
};

// Drop undefined keys
for (const k of Object.keys(trimmed)) {
  if (trimmed[k] === undefined) delete trimmed[k];
}

fs.mkdirSync(path.dirname(DST), { recursive: true });
fs.writeFileSync(DST, JSON.stringify(trimmed));

const sizeKB = (fs.statSync(DST).size / 1024).toFixed(1);
console.log(`✓ latest.json → data/trends-latest.json  (${sizeKB} KB)`);
console.log(`  triple-validated: ${trimmed.triple_validated.length}`);
console.log(`  buildable: ${trimmed.buildable_only.length}`);
console.log(`  top_entities: ${trimmed.top_entities.length}`);
console.log(`  tiktok_top: ${(trimmed.tiktok_top || []).length}, x_top: ${(trimmed.x_top || []).length}`);
console.log(`  hf models: ${(trimmed.huggingface_models || []).length}, gh repos: ${(trimmed.github_top || []).length}`);
