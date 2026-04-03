// scanner.js — core fetch + pattern matching logic

const CORS_PROXY = "https://api.allorigins.win/get?url=";

/**
 * Fetch the raw HTML of a URL via CORS proxy.
 * Returns the HTML string or throws on failure.
 */
async function fetchPage(url) {
  const encoded = encodeURIComponent(url);
  const res = await fetch(`${CORS_PROXY}${encoded}`);
  if (!res.ok) throw new Error(`Proxy returned ${res.status}`);
  const data = await res.json();
  if (!data.contents) throw new Error("Empty response from proxy");
  return data.contents;
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
    html = await fetchPage(url);
  } catch (err) {
    setError(`Could not fetch the page: ${err.message}`);
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
