#!/usr/bin/env bash
# refresh-trends.sh — pull the latest trend-detector snapshot into mfm-universe.
#
# Reads from ../trend-detector/data/processed/ and writes a trimmed JSON +
# the daily-brief markdown into mfm-universe/data/, where trends.html fetches
# them at runtime.
#
# Usage:
#   bash scripts/refresh-trends.sh
#
# Then commit + push as usual:
#   git add data/trends-latest.json data/trends-daily-brief.md
#   git commit -m "trends: refresh data $(date +%Y-%m-%d)"
#   git push origin main
#
# Vercel re-deploys in ~30s.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$ROOT/../trend-detector/data/processed"
DST="$ROOT/data"

if [[ ! -d "$SRC" ]]; then
  echo "✗ Could not find trend-detector data at: $SRC"
  echo "  Expected sibling repo layout: ~/Documents/Claude/Projects/{mfm-universe,trend-detector}"
  exit 1
fi

if [[ ! -f "$SRC/latest.json" ]]; then
  echo "✗ $SRC/latest.json does not exist."
  echo "  Run the trend-detector pipeline first:  cd ../trend-detector && npm run refresh"
  exit 1
fi

mkdir -p "$DST"

# Use node to trim the JSON — strip pageview_history beyond last 14 days and
# limit sample_items to 5 per entity, to keep the asset under ~500KB.
node "$SCRIPT_DIR/refresh-trends.js"

# Daily brief — copy as-is if present
if [[ -f "$SRC/daily-brief-latest.md" ]]; then
  cp "$SRC/daily-brief-latest.md" "$DST/trends-daily-brief.md"
  echo "✓ daily-brief-latest.md → data/trends-daily-brief.md"
else
  echo "  (no daily-brief-latest.md found, skipping)"
fi

# Headline-of-the-day chart data — copy as-is if present.
# This is produced by `npm run headline-chart` in the trend-detector repo
# (scripts/build-headline-chart-data.mjs reading config/featured-repos.json).
# The trends-headline-latest.md content is hand-authored in this repo and is NOT copied from trend-detector.
if [[ -f "$SRC/headline-chart-data.json" ]]; then
  cp "$SRC/headline-chart-data.json" "$DST/headline-chart-data.json"
  echo "✓ headline-chart-data.json → data/headline-chart-data.json"
else
  echo "  (no headline-chart-data.json found, skipping — run 'npm run headline-chart' in trend-detector)"
fi

echo ""
echo "✓ Refresh complete."
echo "  Review: open trends.html"
echo "  Ship:   git add data/ && git commit -m 'trends: refresh' && git push"
