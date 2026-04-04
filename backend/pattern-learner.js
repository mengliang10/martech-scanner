// pattern-learner.js — Persist patterns learned from AI identifications
// Writes to learned-patterns.json locally AND auto-commits to GitHub
// so patterns survive Railway redeploys without any manual copying.

const fs   = require('fs');
const path = require('path');

const LEARNED_PATH   = path.join(__dirname, 'learned-patterns.json');
const GITHUB_API     = 'https://api.github.com';
const GITHUB_FILE    = 'backend/learned-patterns.json';
const GITHUB_BRANCH  = process.env.GITHUB_BRANCH || 'main';

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
      const seg = pathname.split('/').filter(Boolean)[0] || '';
      return escapeRegex(hostname) + (seg ? '/' + escapeRegex(seg) : '');
    }

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
 * Push learned-patterns.json to GitHub so it survives Railway redeploys.
 * Requires GITHUB_TOKEN and GITHUB_REPO env vars.
 */
async function syncToGitHub(entries) {
  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO; // e.g. "mengliang10/martech-scanner"
  if (!token || !repo) return;

  const content = Buffer.from(JSON.stringify(entries, null, 2) + '\n').toString('base64');
  const apiUrl  = `${GITHUB_API}/repos/${repo}/contents/${GITHUB_FILE}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type':  'application/json',
    'User-Agent':    'martech-scanner',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // Get current file SHA (required by GitHub API to update a file)
    const getRes  = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, { headers });
    const getJson = await getRes.json();
    const sha     = getJson.sha;

    const body = JSON.stringify({
      message: `chore: update learned-patterns.json [${new Date().toISOString().slice(0,10)}]`,
      content,
      sha,
      branch: GITHUB_BRANCH,
    });

    const putRes = await fetch(apiUrl, { method: 'PUT', headers, body });
    if (putRes.ok) {
      console.log(`[learn] synced ${entries.length} entries to GitHub`);
    } else {
      const err = await putRes.json().catch(() => ({}));
      console.error('[learn] GitHub sync failed:', err.message || putRes.status);
    }
  } catch (err) {
    console.error('[learn] GitHub sync error:', err.message);
  }
}

/**
 * Persist patterns extracted from AI-identified results.
 * Saves locally and pushes to GitHub automatically.
 * @param {Array} aiResults  [{ name, category, matchedUrl }]
 * @returns {number} count of new patterns/tools added
 */
function learnPatterns(aiResults) {
  if (!aiResults || aiResults.length === 0) return 0;

  const entries = load();
  let added = 0;

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
        added++;
        console.log(`[learn] +pattern "${pattern}" → "${r.name}"`);
      }
    } else {
      entries.push({
        name: r.name,
        category: r.category,
        patterns: [pattern],
        learnedAt: new Date().toISOString(),
      });
      added++;
      console.log(`[learn] new tool "${r.name}" | pattern "${pattern}"`);
    }
  }

  if (added > 0) {
    save(entries);
    syncToGitHub(entries).catch(() => {});
  }

  return added;
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
