// scraper.js — Playwright headless browser scraper with stealth
// Matches patterns against: rendered HTML + all network request URLs

const { chromium } = require("playwright-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { MARTECH_PATTERNS } = require("./patterns");
const { identifyWithAI } = require("./ai-identifier");

chromium.use(StealthPlugin());

const NAVIGATION_TIMEOUT = 30000; // 30s
const IDLE_TIMEOUT       = 5000;  // wait up to 5s for network to settle after load

/**
 * Launch a stealth Chromium instance, navigate to the URL, and collect:
 *   - Full rendered HTML (after JS execution)
 *   - All network request URLs (catches beacon/pixel calls)
 *
 * Returns { html, requestUrls }
 */
async function scrape(url) {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "en-US",
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  const page = await context.newPage();

  // Capture every network request URL
  const requestUrls = [];
  page.on("request", (req) => requestUrls.push(req.url()));

  try {
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: NAVIGATION_TIMEOUT,
    });
  } catch (err) {
    // networkidle can time out on chatty sites — fall back to domcontentloaded
    if (err.name === "TimeoutError") {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: NAVIGATION_TIMEOUT,
      });
      // Give JS a moment to fire tags
      await page.waitForTimeout(IDLE_TIMEOUT);
    } else {
      throw err;
    }
  }

  const html = await page.content();
  await browser.close();

  return { html, requestUrls };
}

/**
 * Run every pattern against both the rendered HTML and the collected
 * network request URLs. Returns deduplicated, sorted matched tags.
 */
function detectTags(html, requestUrls) {
  const requestBlob = requestUrls.join("\n");
  const found = [];
  const seen  = new Set();

  for (const tag of MARTECH_PATTERNS) {
    for (const raw of tag.patterns) {
      try {
        const re = new RegExp(raw, "i");
        if (re.test(html) || re.test(requestBlob)) {
          if (!seen.has(tag.name)) {
            seen.add(tag.name);
            found.push({ name: tag.name, category: tag.category });
          }
          break;
        }
      } catch {
        // skip malformed regex
      }
    }
  }

  found.sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );
  return found;
}

/**
 * Group flat tag array into { category: [name, ...] }
 */
function groupByCategory(tags) {
  return tags.reduce((acc, tag) => {
    if (!acc[tag.category]) acc[tag.category] = [];
    acc[tag.category].push(tag.name);
    return acc;
  }, {});
}

/**
 * Extract third-party script URLs and network requests for AI analysis.
 * Returns up to 150 deduplicated URLs not from the target domain.
 */
function extractSignals(html, requestUrls, targetUrl) {
  const signals = new Set();
  let targetHost = "";
  try { targetHost = new URL(targetUrl).hostname; } catch {}

  // Script src tags from rendered HTML
  const scriptRe = /<script[^>]+src=["']([^"'>]+)["']/gi;
  let m;
  while ((m = scriptRe.exec(html)) !== null) {
    try {
      const u = new URL(m[1], targetUrl);
      if (u.protocol.startsWith("http") && u.hostname !== targetHost) {
        signals.add(u.href);
      }
    } catch {}
  }

  // Third-party network request URLs
  for (const u of requestUrls) {
    try {
      const parsed = new URL(u);
      if (parsed.protocol.startsWith("http") && parsed.hostname !== targetHost) {
        signals.add(u);
      }
    } catch {}
  }

  return [...signals].slice(0, 150);
}

/**
 * Full pipeline: scrape → detect → group → AI identify → return result object
 */
async function scan(url) {
  const { html, requestUrls } = await scrape(url);
  const tags = detectTags(html, requestUrls);
  const grouped = groupByCategory(tags);

  const signals = extractSignals(html, requestUrls, url);
  const { aiTags, providers } = await identifyWithAI(signals, tags);
  const aiGrouped = groupByCategory(aiTags);

  return {
    tags, grouped, total: tags.length,
    requestUrlCount: requestUrls.length,
    aiTags, aiGrouped, aiTotal: aiTags.length, aiProviders: providers,
  };
}

module.exports = { scan };
