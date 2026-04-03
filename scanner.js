// scanner.js — frontend API client
// All heavy lifting (headless browser, pattern matching) is done by the backend.

// ── Update this to your deployed Railway URL after deployment ──────────────
const BACKEND_URL = "https://martech-scanner-backend-production.up.railway.app";
// ──────────────────────────────────────────────────────────────────────────

/**
 * Main entry point — called by the UI.
 * @param {string} rawUrl
 * @param {object} ui  { setStatus, setResults, setError }
 */
async function runScan(rawUrl, { setStatus, setResults, setError }) {
  let url = rawUrl.trim();
  if (!url) { setError("Please enter a URL."); return; }
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  try { new URL(url); }
  catch { setError("That doesn't look like a valid URL."); return; }

  setStatus("Starting headless browser scan… (may take 15–30 s)");

  let data;
  try {
    const res = await fetch(`${BACKEND_URL}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || err.error || `Server error ${res.status}`);
    }

    data = await res.json();
  } catch (err) {
    setError(`Scan failed: ${err.message}`);
    return;
  }

  setResults(data.grouped, data.total, data.durationMs);
}
