// scanner.js — core fetch + pattern matching logic

// Proxies are tried in order; the first to succeed wins.
const CORS_PROXIES = [
  {
    name: "allorigins",
    build: (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    extract: async (res) => {
      const data = await res.json();
      if (!data.contents) throw new Error("Empty response");
      return data.contents;
    },
  },
  {
    name: "corsproxy.io",
    build: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    extract: async (res) => res.text(),
  },
  {
    name: "codetabs",
    build: (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    extract: async (res) => res.text(),
  },
];

/**
 * Fetch the raw HTML of a URL, trying each CORS proxy in turn.
 * Returns the HTML string or throws if all proxies fail.
 */
async function fetchPage(url, onProxyAttempt) {
  const errors = [];
  for (const proxy of CORS_PROXIES) {
    if (onProxyAttempt) onProxyAttempt(proxy.name);
    try {
      const res = await fetch(proxy.build(url), { signal: AbortSignal.timeout(15000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await proxy.extract(res);
      if (!html || html.trim().length === 0) throw new Error("Empty body");
      return html;
    } catch (err) {
      errors.push(`${proxy.name}: ${err.message}`);
    }
  }
  throw new Error(`All proxies failed — ${errors.join(" | ")}`);
}

/**
 * Run every pattern in MARTECH_PATTERNS against the HTML string.
 * Returns an array of matched tag objects: { name, category }
 */
function detectTags(html) {
  const found = [];
  const seen = new Set();

  for (const tag of MARTECH_PATTERNS) {
    for (const raw of tag.patterns) {
      try {
        const re = new RegExp(raw, "i");
        if (re.test(html)) {
          if (!seen.has(tag.name)) {
            seen.add(tag.name);
            found.push({ name: tag.name, category: tag.category });
          }
          break; // one match per tag is enough
        }
      } catch {
        // skip malformed regex
      }
    }
  }

  // Sort by category then name
  found.sort((a, b) =>
    a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );
  return found;
}

/**
 * Group an array of { name, category } objects by category.
 * Returns: { "Analytics": ["Tag A", "Tag B"], ... }
 */
function groupByCategory(tags) {
  return tags.reduce((acc, tag) => {
    if (!acc[tag.category]) acc[tag.category] = [];
    acc[tag.category].push(tag.name);
    return acc;
  }, {});
}

/**
 * Main entry point — called by the UI.
 * @param {string} rawUrl   The URL entered by the user
 * @param {object} ui       { setStatus, setResults, setError }
 */
async function runScan(rawUrl, { setStatus, setResults, setError }) {
  // Basic URL normalisation
  let url = rawUrl.trim();
  if (!url) { setError("Please enter a URL."); return; }
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  try {
    new URL(url);
  } catch {
    setError("That doesn't look like a valid URL.");
    return;
  }

  setStatus("Fetching page…");
  let html;
  try {
    html = await fetchPage(url, (proxyName) => {
      setStatus(`Trying via ${proxyName}…`);
    });
  } catch (err) {
    setError(`Could not fetch the page. The site may block automated requests, or all proxies are unavailable.\n\nDetails: ${err.message}`);
    return;
  }

  setStatus("Scanning for Martech tags…");
  const tags = detectTags(html);

  if (tags.length === 0) {
    setResults({}, 0);
  } else {
    const grouped = groupByCategory(tags);
    setResults(grouped, tags.length);
  }
}
