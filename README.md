# Martech Tag Scanner

A browser-based tool that scans any public website and lists all detected **Marketing Technology (Martech) tags** — analytics, advertising pixels, tag managers, marketing automation, CRM tools, chat widgets, A/B testing platforms, and consent management systems.

**Live tool:** https://mengliang10.github.io/martech-scanner/

---

## How it works

Enter a URL → the page is fetched via a CORS proxy → the raw HTML is matched against a pattern library → detected tag names are displayed grouped by category.

---

## File structure

```
martech-scanner/
├── index.html      # UI shell
├── scanner.js      # Fetch + detection logic
├── patterns.js     # Martech tag pattern library
└── README.md       # This file
```

---

## File documentation

### `index.html`

The single-page UI. Responsibilities:

- **URL input box** — accepts a URL, normalises it (adds `https://` if missing), triggers on Enter or button click.
- **Scan button** — calls `handleScan()` in the inline `<script>` block.
- **Status / error display** — two separate `<div>` elements updated by the scanner callbacks.
- **Results display** — renders tag pills grouped by category once the scan completes.
- Loads `patterns.js` then `scanner.js` (order matters — scanner depends on `MARTECH_PATTERNS`).

No build step or framework required. Plain HTML + CSS + JS.

---

### `scanner.js`

Core logic. Three exported functions used by the UI:

#### `fetchPage(url) → Promise<string>`
Fetches the raw HTML of a URL by routing the request through the [allorigins.win](https://allorigins.win) CORS proxy. Returns the HTML string. Throws if the proxy fails or returns an empty body.

> **Why a CORS proxy?** Browsers block cross-origin `fetch()` calls unless the target site opts in via CORS headers. A proxy fetches server-side and relays the response.

#### `detectTags(html) → Array<{ name, category }>`
Iterates over every entry in `MARTECH_PATTERNS`. For each tag, tries each of its regex patterns against the full HTML string (case-insensitive). Returns a deduplicated, sorted array of matched tags.

#### `groupByCategory(tags) → Object`
Groups the flat array of matched tags into `{ category: [name, ...] }` for display.

#### `runScan(rawUrl, { setStatus, setResults, setError })`
Orchestrates the full flow: URL normalisation → `fetchPage` → `detectTags` → `groupByCategory` → calls the appropriate UI callback.

---

### `patterns.js`

The Martech pattern library. Exports a single global constant `MARTECH_PATTERNS` — an array of objects:

```js
{
  name: "Google Analytics 4",   // Display name
  category: "Analytics",        // Category group
  patterns: [                   // Array of regex strings (case-insensitive)
    "googletagmanager\\.com/gtag/js\\?id=G-",
    "gtag\\s*\\(\\s*['\"]config['\"]\\s*,\\s*['\"]G-",
  ]
}
```

**Categories covered:**

| Category | Examples |
|---|---|
| Analytics | GA4, Adobe Analytics, Mixpanel, Amplitude, Segment, Hotjar, Heap, Matomo |
| Tag Managers | Google Tag Manager, Adobe Launch, Tealium iQ, Ensighten |
| Advertising | Meta Pixel, Google Ads, LinkedIn Insight, TikTok Pixel, Criteo, AdRoll |
| Marketing Automation | HubSpot, Marketo, Pardot, Klaviyo, Mailchimp, Braze, ActiveCampaign |
| CRM | Salesforce, mParticle |
| Chat & Support | Intercom, Drift, Zendesk Chat, LiveChat, Tidio, Crisp |
| A/B Testing | Optimizely, VWO, Adobe Target, Google Optimize, AB Tasty |
| Consent Management | OneTrust, Cookiebot, TrustArc, Didomi |
| SEO | Yoast |

Pattern sources: adapted from [Wappalyzer](https://github.com/wappalyzer/wappalyzer) (MIT licence).

---

## Limitations

- **CORS proxy dependency** — fetches route through `allorigins.win`, a free public proxy. It may be rate-limited under heavy use. A future version will include a self-hosted proxy option.
- **Static HTML only** — the proxy returns the initial HTML, not JavaScript-rendered content. Tags injected purely by client-side JS after page load may be missed.
- **Pattern coverage** — only tags with known fingerprints are detected. Obfuscated or custom tag implementations may not match.

---

## Planned extensions

- [ ] Self-hosted backend proxy (removes allorigins.win dependency)
- [ ] LLM-assisted identification for unrecognised tags
- [ ] Headless browser mode to capture JS-rendered tags
- [ ] Exportable results (CSV / JSON)
- [ ] Bulk URL scanning

---

## Local development

No build step needed. Open `index.html` directly in a browser or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Deployment (GitHub Pages)

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Set source to **main branch / root**.
4. The live URL will be `https://<your-username>.github.io/martech-scanner/`.
