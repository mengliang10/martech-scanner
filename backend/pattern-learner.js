// pattern-learner.js — Persist patterns learned from AI identifications
// Writes to learned-patterns.json so future scans skip the LLM for known tools

const fs   = require('fs');
const path = require('path');

const LEARNED_PATH = path.join(__dirname, 'learned-patterns.json');

// CDNs that serve many different tools — hostname alone isn't enough to identify a tool
const GENERIC_CDNS = [
  'cloudfront.net', 'fastly.net', 'cdn.jsdelivr.net', 'unpkg.com',
  'cdnjs.cloudflare.com', 'storage.googleapis.com', 'akamaihd.net',
  'llnwd.net', 'edgesuite.net', 'akamaitechnologies.com', 'amazonaws.com',
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Derive a regex pattern string from a URL.
 * Returns null if the URL isn't useful as a fingerprint.
 */
function extractPattern(url) {
  try {
    const { hostname, pathname } = new URL(url);
    const isGeneric = GENERIC_CDNS.some(
      cdn => hostname === cdn || hostname.endsWith('.' + cdn)
    );

    if (isGeneric) {
      // Use hostname + first meaningful path segment
      const seg = pathname.split('/').filter(Boolean)[0] || '';
      return escapeRegex(hostname) + (seg ? '/' + escapeRegex(seg) : '');
    }

    // Strip subdomains that don't identify the tool (cdn., static., js., tag., etc.)
    const core = hostname.replace(
      /^(cdn\d?|static\d?|assets\d?|js|tag|tags|pixel|collect|s|img|media|files)\./i,
      ''
    );
    return escapeRegex(core);
  } catch {
    return null;
  }
}

function load() {
  try {
    return JSON.parse(fs.readFileSync(LEARNED_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function save(entries) {
  try {
    fs.writeFileSync(LEARNED_PATH, JSON.stringify(entries, null, 2) + '\n');
  } catch (err) {
    console.error('[learn] save failed:', err.message);
  }
}

/**
 * Persist patterns extracted from AI-identified results.
 * @param {Array} aiResults  [{ name, category, matchedUrl }]
 */
function learnPatterns(aiResults) {
  if (!aiResults || aiResults.length === 0) return;

  const entries = load();
  let changed = false;

  for (const r of aiResults) {
    if (!r.matchedUrl || !r.name || !r.category) continue;
    const pattern = extractPattern(r.matchedUrl);
    if (!pattern) continue;

    const existing = entries.find(
      e => e.name.toLowerCase() === r.name.toLowerCase()
    );

    if (existing) {
      if (!existing.patterns.includes(pattern)) {
        existing.patterns.push(pattern);
        changed = true;
        console.log(`[learn] +pattern "${pattern}" → "${r.name}"`);
      }
    } else {
      entries.push({
        name: r.name,
        category: r.category,
        patterns: [pattern],
        learnedAt: new Date().toISOString(),
      });
      changed = true;
      console.log(`[learn] new tool "${r.name}" | pattern "${pattern}"`);
    }
  }

  if (changed) save(entries);
}

/**
 * Merge learned entries into the base MARTECH_PATTERNS array.
 * Adds new tools; extends existing tools with additional patterns.
 */
function mergeWithLearned(basePatterns) {
  const learned = load();
  if (learned.length === 0) return basePatterns;

  const merged = basePatterns.map(t => ({ ...t, patterns: [...t.patterns] }));

  for (const entry of learned) {
    const existing = merged.find(
      t => t.name.toLowerCase() === entry.name.toLowerCase()
    );
    if (existing) {
      for (const p of entry.patterns) {
        if (!existing.patterns.includes(p)) existing.patterns.push(p);
      }
    } else {
      merged.push({ name: entry.name, category: entry.category, patterns: entry.patterns });
    }
  }

  return merged;
}

module.exports = { load, learnPatterns, mergeWithLearned };
