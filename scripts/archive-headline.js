#!/usr/bin/env node
/* archive-headline.js — retire the current "Headline of the day" into the
 * dated archive that the /trends calendar reads.
 *
 * The headline-of-the-day is a hand-authored long-form piece living in
 * data/trends-headline-latest.md. When it's superseded, run this to:
 *   1. copy it to data/headlines/<date>.md
 *   2. copy data/headline-chart-data.json to data/headlines/<date>-chart.json
 *   3. add/replace the entry in data/headlines/index.json (sorted newest-first)
 *   4. empty data/trends-headline-latest.md so the page leads with the
 *      daily brief until a new headline is written.
 *
 * Usage:
 *   node scripts/archive-headline.js [YYYY-MM-DD]
 *   (date defaults to today)
 *
 * Then commit data/headlines/ + data/trends-headline-latest.md and push.
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const LATEST = path.join(ROOT, 'data/trends-headline-latest.md');
const CHART = path.join(ROOT, 'data/headline-chart-data.json');
const ARCHIVE = path.join(ROOT, 'data/headlines');
const INDEX = path.join(ARCHIVE, 'index.json');

const date = process.argv[2] || new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('✗ Date must be YYYY-MM-DD. Got:', date);
  process.exit(1);
}

const md = fs.existsSync(LATEST) ? fs.readFileSync(LATEST, 'utf8') : '';
if (!md.trim()) {
  console.log('Nothing to archive — data/trends-headline-latest.md is empty.');
  process.exit(0);
}

const titleLine = md.split('\n').find((l) => /^#\s+/.test(l));
const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : `Headline ${date}`;

fs.mkdirSync(ARCHIVE, { recursive: true });
fs.writeFileSync(path.join(ARCHIVE, `${date}.md`), md);

let hasChart = false;
if (fs.existsSync(CHART)) {
  try {
    const chart = JSON.parse(fs.readFileSync(CHART, 'utf8'));
    if (chart && Array.isArray(chart.repos) && chart.repos.length) {
      fs.writeFileSync(path.join(ARCHIVE, `${date}-chart.json`), JSON.stringify(chart));
      hasChart = true;
    }
  } catch (e) { /* no usable chart */ }
}

let index = [];
if (fs.existsSync(INDEX)) {
  try { index = JSON.parse(fs.readFileSync(INDEX, 'utf8')) || []; } catch (e) { index = []; }
}
index = index.filter((e) => e.date !== date);
index.push({ date, title, chart: hasChart });
index.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
fs.writeFileSync(INDEX, JSON.stringify(index, null, 2) + '\n');

fs.writeFileSync(LATEST, '');

console.log(`✓ Archived "${title}"`);
console.log(`  → data/headlines/${date}.md${hasChart ? ` (+ ${date}-chart.json)` : ''}`);
console.log(`  → index.json now has ${index.length} piece(s)`);
console.log(`  → data/trends-headline-latest.md emptied`);
