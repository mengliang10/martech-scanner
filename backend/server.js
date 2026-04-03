// server.js — Express API server for Martech Tag Scanner

require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const { scan } = require("./scraper");
const { load: loadLearned } = require("./pattern-learner");

const app  = express();
const PORT = process.env.PORT || 3000;

// Public tool — open CORS
app.use(cors());

app.use(express.json());

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Scan endpoint ─────────────────────────────────────────────────────────────
// POST /scan   body: { url: "https://example.com" }
// Returns:     { url, total, tags, grouped, requestUrlCount, durationMs }
app.post("/scan", async (req, res) => {
  let { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "url is required" });
  }

  url = url.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  console.log(`[scan] ${url}`);
  const start = Date.now();

  try {
    const result = await scan(url);
    const durationMs = Date.now() - start;
    console.log(`[scan] done in ${durationMs}ms — ${result.total} tags found`);
    res.json({ url, ...result, durationMs });
  } catch (err) {
    console.error(`[scan] error: ${err.message}`);
    res.status(500).json({
      error: "Scan failed",
      detail: err.message,
    });
  }
});

// ── Export learned patterns ───────────────────────────────────────────────────
// GET /export-patterns
// Returns learned-patterns.json so you can commit it to the repo and persist
// patterns across Railway deployments.
app.get("/export-patterns", (_req, res) => {
  res.json(loadLearned());
});

app.listen(PORT, () => {
  console.log(`Martech Scanner backend running on port ${PORT}`);
});
