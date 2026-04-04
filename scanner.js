// scanner.js — frontend API client

const BACKEND_URL = "https://martech-scanner-production.up.railway.app";

/**
 * @param {string} rawUrl
 * @param {object} ui        { setStatus, setResults, setError }
 * @param {boolean} useAI    true = pattern match + AI; false = pattern match only
 */
async function runScan(rawUrl, { setStatus, setResults, setError }, useAI = false) {
  let url = rawUrl.trim();
  if (!url) { setError("Please enter a URL."); return; }
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  try { new URL(url); }
  catch { setError("That doesn't look like a valid URL."); return; }

  setStatus(useAI
    ? "Starting scan with AI identification… (may take 30–60 s)"
    : "Starting headless browser scan… (may take 15–30 s)"
  );

  let data;
  try {
    const res = await fetch(`${BACKEND_URL}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, useAI }),
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

  setResults(data.grouped, data.total, data.durationMs, data.aiGrouped, data.aiTotal, data.aiProviders, useAI, {
    signalCount:       data.signalCount,
    unmatchedCount:    data.unmatchedCount,
    deepseekCalled:    data.deepseekCalled,
    anthropicCalled:   data.anthropicCalled,
    anthropicSkipped:  data.anthropicSkipped,
    deepseekDomains:   data.deepseekDomains   || [],
    anthropicDomains:  data.anthropicDomains  || [],
    newPatternsLearned: data.newPatternsLearned || 0,
  });
}
