// patterns.js — Martech tag fingerprint library (Node/CommonJS)
// Matched against: rendered page HTML + all network request URLs loaded by the browser.

const MARTECH_PATTERNS = [

  // ─── ANALYTICS ───────────────────────────────────────────────────────────
  {
    name: "Google Analytics 4",
    category: "Analytics",
    patterns: [
      "googletagmanager\\.com/gtag/js\\?id=G-",
      "gtag\\s*\\(\\s*['\"]config['\"]\\s*,\\s*['\"]G-",
      "google-analytics\\.com/g/collect",
    ],
  },
  {
    name: "Google Universal Analytics",
    category: "Analytics",
    patterns: [
      "google-analytics\\.com/analytics\\.js",
      "googletagmanager\\.com/gtag/js\\?id=UA-",
      "gtag\\s*\\(\\s*['\"]config['\"]\\s*,\\s*['\"]UA-",
      "ga\\s*\\(\\s*['\"]create['\"]",
    ],
  },
  {
    name: "Adobe Analytics",
    category: "Analytics",
    patterns: [
      "omniture\\.com",
      "2o7\\.net",
      "omtrdc\\.net",
      "s_code\\.js",
      "AppMeasurement\\.js",
      "adobeanalytics",
      "sc\\.omtrdc\\.net",
    ],
  },
  {
    name: "Mixpanel",
    category: "Analytics",
    patterns: [
      "cdn\\.mxpnl\\.com",
      "api\\.mixpanel\\.com",
      "mixpanel\\.init\\s*\\(",
      "cdn4\\.mxpnl\\.com",
    ],
  },
  {
    name: "Amplitude",
    category: "Analytics",
    patterns: [
      "cdn\\.amplitude\\.com",
      "api\\.amplitude\\.com",
      "amplitude\\.getInstance",
      "amplitude\\.init\\s*\\(",
    ],
  },
  {
    name: "Heap Analytics",
    category: "Analytics",
    patterns: [
      "cdn\\.heapanalytics\\.com",
      "heapanalytics\\.com",
      "heap\\.load\\s*\\(",
      "heap\\.identify\\s*\\(",
    ],
  },
  {
    name: "Segment",
    category: "Analytics",
    patterns: [
      "cdn\\.segment\\.com",
      "api\\.segment\\.io",
      "analytics\\.load\\s*\\(",
      "analytics\\.identify\\s*\\(",
    ],
  },
  {
    name: "Hotjar",
    category: "Analytics",
    patterns: [
      "static\\.hotjar\\.com",
      "script\\.hotjar\\.com",
      "hj\\s*\\(\\s*['\"]identify['\"]",
      "hjid\\s*=",
    ],
  },
  {
    name: "Matomo / Piwik",
    category: "Analytics",
    patterns: [
      "matomo\\.js",
      "piwik\\.js",
      "_paq\\.push",
      "matomo\\.php",
      "piwik\\.php",
    ],
  },
  {
    name: "Plausible Analytics",
    category: "Analytics",
    patterns: [
      "plausible\\.io/js/plausible",
      "data-domain.*plausible",
    ],
  },
  {
    name: "Fathom Analytics",
    category: "Analytics",
    patterns: [
      "cdn\\.usefathom\\.com",
      "fathom\\.trackPageview",
    ],
  },
  {
    name: "Clicky",
    category: "Analytics",
    patterns: [
      "static\\.getclicky\\.com",
      "in\\.getclicky\\.com",
    ],
  },
  {
    name: "Woopra",
    category: "Analytics",
    patterns: [
      "static\\.woopra\\.com",
      "woopra\\.com/track",
    ],
  },
  {
    name: "Kissmetrics",
    category: "Analytics",
    patterns: [
      "scripts\\.kissmetrics\\.com",
      "kissmetrics\\.com/i\\.js",
      "_kmq\\.push",
    ],
  },
  {
    name: "Chartbeat",
    category: "Analytics",
    patterns: [
      "static\\.chartbeat\\.com",
      "chartbeat\\.com/js",
      "_sf_async_config",
    ],
  },
  {
    name: "comScore",
    category: "Analytics",
    patterns: [
      "sb\\.scorecardresearch\\.com",
      "beacon\\.scorecardresearch\\.com",
    ],
  },
  {
    name: "FullStory",
    category: "Analytics",
    patterns: [
      "fullstory\\.com/s/fs\\.js",
      "edge\\.fullstory\\.com",
      "FS\\.identify\\s*\\(",
      "_fs_debug",
    ],
  },
  {
    name: "Lucky Orange",
    category: "Analytics",
    patterns: [
      "luckyorange\\.com",
    ],
  },
  {
    name: "Mouseflow",
    category: "Analytics",
    patterns: [
      "cdn\\.mouseflow\\.com",
      "mouseflow\\.com/projects",
    ],
  },
  {
    name: "Crazy Egg",
    category: "Analytics",
    patterns: [
      "crazyegg\\.com/pages/scripts",
      "script\\.crazyegg\\.com",
    ],
  },
  {
    name: "Microsoft Clarity",
    category: "Analytics",
    patterns: [
      "clarity\\.ms/tag",
      "www\\.clarity\\.ms",
    ],
  },

  // ─── TAG MANAGERS ────────────────────────────────────────────────────────
  {
    name: "Google Tag Manager",
    category: "Tag Managers",
    patterns: [
      "googletagmanager\\.com/gtm\\.js",
      "googletagmanager\\.com/ns\\.html",
      "GTM-[A-Z0-9]+",
    ],
  },
  {
    name: "Adobe Experience Platform Launch",
    category: "Tag Managers",
    patterns: [
      "assets\\.adobedtm\\.com",
      "launch-[a-z0-9]+\\.min\\.js",
    ],
  },
  {
    name: "Adobe DTM (Legacy)",
    category: "Tag Managers",
    patterns: [
      "satelliteLib-",
      "window\\._satellite",
    ],
  },
  {
    name: "Tealium iQ",
    category: "Tag Managers",
    patterns: [
      "tags\\.tiqcdn\\.com",
      "utag\\.js",
      "utag\\.sync\\.js",
      "utag_data",
    ],
  },
  {
    name: "Ensighten",
    category: "Tag Managers",
    patterns: [
      "nexus\\.ensighten\\.com",
    ],
  },
  {
    name: "Commanders Act",
    category: "Tag Managers",
    patterns: [
      "cdn\\.tagcommander\\.com",
    ],
  },

  // ─── ADS & PIXELS ────────────────────────────────────────────────────────
  {
    name: "Meta Pixel (Facebook)",
    category: "Advertising",
    patterns: [
      "connect\\.facebook\\.net.*fbevents\\.js",
      "fbq\\s*\\(\\s*['\"]init['\"]",
      "facebook\\.com/tr",
    ],
  },
  {
    name: "Google Ads",
    category: "Advertising",
    patterns: [
      "googleadservices\\.com/pagead/conversion",
      "googletagmanager\\.com/gtag/js\\?id=AW-",
      "gtag\\s*\\(\\s*['\"]config['\"]\\s*,\\s*['\"]AW-",
    ],
  },
  {
    name: "LinkedIn Insight Tag",
    category: "Advertising",
    patterns: [
      "snap\\.licdn\\.com/li\\.lms-analytics",
      "linkedin\\.com/px",
      "_linkedin_partner_id",
    ],
  },
  {
    name: "Twitter / X Pixel",
    category: "Advertising",
    patterns: [
      "static\\.ads-twitter\\.com",
      "t\\.co/i/adsct",
      "analytics\\.twitter\\.com",
      "twq\\s*\\(",
    ],
  },
  {
    name: "Pinterest Tag",
    category: "Advertising",
    patterns: [
      "s\\.pinimg\\.com/ct/core\\.js",
      "pintrk\\s*\\(",
      "ct\\.pinterest\\.com",
    ],
  },
  {
    name: "TikTok Pixel",
    category: "Advertising",
    patterns: [
      "analytics\\.tiktok\\.com/i18n/pixel",
      "ttq\\.load\\s*\\(",
    ],
  },
  {
    name: "Snapchat Pixel",
    category: "Advertising",
    patterns: [
      "tr\\.snapchat\\.com",
      "sc-static\\.net/scevent\\.min\\.js",
      "snaptr\\s*\\(",
    ],
  },
  {
    name: "Microsoft Advertising (Bing Ads)",
    category: "Advertising",
    patterns: [
      "bat\\.bing\\.com",
      "uetq\\.push\\s*\\(",
    ],
  },
  {
    name: "Criteo",
    category: "Advertising",
    patterns: [
      "static\\.criteo\\.net",
      "dynamic\\.criteo\\.com",
      "rtax\\.criteo\\.com",
      "window\\.criteo_q",
    ],
  },
  {
    name: "Amazon Advertising",
    category: "Advertising",
    patterns: [
      "s\\.amazon-adsystem\\.com",
      "aax-us-east\\.amazon-adsystem\\.com",
    ],
  },
  {
    name: "DoubleClick / Campaign Manager",
    category: "Advertising",
    patterns: [
      "fls\\.doubleclick\\.net",
      "ad\\.doubleclick\\.net",
      "securepubads\\.g\\.doubleclick\\.net",
    ],
  },
  {
    name: "AdRoll",
    category: "Advertising",
    patterns: [
      "s\\.adroll\\.com",
      "d\\.adroll\\.com",
    ],
  },
  {
    name: "Outbrain",
    category: "Advertising",
    patterns: [
      "amplify\\.outbrain\\.com",
      "outbrain\\.com/outbrain\\.js",
    ],
  },
  {
    name: "Taboola",
    category: "Advertising",
    patterns: [
      "cdn\\.taboola\\.com",
      "_taboola\\.push\\s*\\(",
    ],
  },
  {
    name: "Quantcast",
    category: "Advertising",
    patterns: [
      "edge\\.quantserve\\.com",
      "quantserve\\.com/quant\\.js",
    ],
  },

  // ─── MARKETING AUTOMATION ────────────────────────────────────────────────
  {
    name: "HubSpot",
    category: "Marketing Automation",
    patterns: [
      "js\\.hs-scripts\\.com",
      "js\\.hsforms\\.net",
      "js\\.hscta\\.net",
      "hs-analytics\\.net",
    ],
  },
  {
    name: "Marketo",
    category: "Marketing Automation",
    patterns: [
      "munchkin\\.marketo\\.net",
      "Munchkin\\.init\\s*\\(",
    ],
  },
  {
    name: "Pardot (Salesforce)",
    category: "Marketing Automation",
    patterns: [
      "pi\\.pardot\\.com",
      "pardot\\.com/pd\\.js",
      "piAId",
    ],
  },
  {
    name: "Oracle Eloqua",
    category: "Marketing Automation",
    patterns: [
      "img\\.en25\\.com",
      "eloqua\\.com/visitor/v200",
    ],
  },
  {
    name: "Mailchimp",
    category: "Marketing Automation",
    patterns: [
      "chimpstatic\\.com",
      "list-manage\\.com",
    ],
  },
  {
    name: "ActiveCampaign",
    category: "Marketing Automation",
    patterns: [
      "trackcmp\\.net",
      "activehosted\\.com/f",
    ],
  },
  {
    name: "Klaviyo",
    category: "Marketing Automation",
    patterns: [
      "static\\.klaviyo\\.com",
      "klaviyo\\.com/media/js",
    ],
  },
  {
    name: "Braze",
    category: "Marketing Automation",
    patterns: [
      "js\\.appboycdn\\.com",
      "appboy\\.initialize\\s*\\(",
      "braze\\.initialize\\s*\\(",
    ],
  },
  {
    name: "Iterable",
    category: "Marketing Automation",
    patterns: [
      "js\\.iterable\\.com",
    ],
  },
  {
    name: "Customer.io",
    category: "Marketing Automation",
    patterns: [
      "assets\\.customer\\.io",
      "_cio\\.identify\\s*\\(",
    ],
  },
  {
    name: "Drip",
    category: "Marketing Automation",
    patterns: [
      "tag\\.getdrip\\.com",
    ],
  },
  {
    name: "Sailthru",
    category: "Marketing Automation",
    patterns: [
      "ak\\.sail-horizon\\.com",
    ],
  },

  // ─── CRM / CUSTOMER DATA ─────────────────────────────────────────────────
  {
    name: "Salesforce",
    category: "CRM",
    patterns: [
      "salesforceliveagent\\.com",
      "service\\.force\\.com",
    ],
  },
  {
    name: "mParticle",
    category: "CRM",
    patterns: [
      "jssdkcdns\\.mparticle\\.com",
      "mParticle\\.init\\s*\\(",
    ],
  },
  {
    name: "Lytics",
    category: "CRM",
    patterns: [
      "c\\.lytics\\.io",
    ],
  },

  // ─── CHAT & SUPPORT ──────────────────────────────────────────────────────
  {
    name: "Intercom",
    category: "Chat & Support",
    patterns: [
      "widget\\.intercom\\.io",
      "js\\.intercomcdn\\.com",
      "intercomSettings",
    ],
  },
  {
    name: "Drift",
    category: "Chat & Support",
    patterns: [
      "js\\.driftt\\.com",
      "drift\\.load\\s*\\(",
    ],
  },
  {
    name: "Zendesk Chat",
    category: "Chat & Support",
    patterns: [
      "static\\.zdassets\\.com",
      "ekr\\.zdassets\\.com",
    ],
  },
  {
    name: "LiveChat",
    category: "Chat & Support",
    patterns: [
      "cdn\\.livechatinc\\.com",
    ],
  },
  {
    name: "Olark",
    category: "Chat & Support",
    patterns: [
      "static\\.olark\\.com",
    ],
  },
  {
    name: "Freshchat",
    category: "Chat & Support",
    patterns: [
      "wchat\\.freshchat\\.com",
      "euc-widget\\.freshworks\\.com",
    ],
  },
  {
    name: "Tidio",
    category: "Chat & Support",
    patterns: [
      "code\\.tidio\\.co",
    ],
  },
  {
    name: "Tawk.to",
    category: "Chat & Support",
    patterns: [
      "embed\\.tawk\\.to",
    ],
  },
  {
    name: "Crisp Chat",
    category: "Chat & Support",
    patterns: [
      "client\\.crisp\\.chat",
      "\\$crisp\\.push\\s*\\(",
    ],
  },

  // ─── A/B TESTING ─────────────────────────────────────────────────────────
  {
    name: "Optimizely",
    category: "A/B Testing",
    patterns: [
      "cdn\\.optimizely\\.com",
      "window\\.optimizely",
    ],
  },
  {
    name: "VWO (Visual Website Optimizer)",
    category: "A/B Testing",
    patterns: [
      "dev\\.visualwebsiteoptimizer\\.com",
      "vwo_code",
    ],
  },
  {
    name: "Google Optimize",
    category: "A/B Testing",
    patterns: [
      "googleoptimize\\.com/optimize\\.js",
      "gtag\\s*\\(\\s*['\"]config['\"]\\s*,\\s*['\"]OPT-",
    ],
  },
  {
    name: "Adobe Target",
    category: "A/B Testing",
    patterns: [
      "tt\\.omtrdc\\.net",
      "adobe\\.target\\.getOffer",
    ],
  },
  {
    name: "AB Tasty",
    category: "A/B Testing",
    patterns: [
      "try\\.abtasty\\.com",
    ],
  },
  {
    name: "Convert",
    category: "A/B Testing",
    patterns: [
      "cdn-4\\.convertexperiments\\.com",
    ],
  },
  {
    name: "LaunchDarkly",
    category: "A/B Testing",
    patterns: [
      "app\\.launchdarkly\\.com/sdk",
      "clientsideevents\\.launchdarkly\\.com",
    ],
  },

  // ─── CONSENT MANAGEMENT ──────────────────────────────────────────────────
  {
    name: "OneTrust",
    category: "Consent Management",
    patterns: [
      "cdn\\.cookielaw\\.org",
      "optanon\\.blob\\.core\\.windows\\.net",
      "OneTrust\\.Init\\s*\\(",
    ],
  },
  {
    name: "Cookiebot",
    category: "Consent Management",
    patterns: [
      "consent\\.cookiebot\\.com",
    ],
  },
  {
    name: "TrustArc",
    category: "Consent Management",
    patterns: [
      "consent\\.trustarc\\.com",
    ],
  },
  {
    name: "Didomi",
    category: "Consent Management",
    patterns: [
      "sdk\\.privacy-center\\.org",
    ],
  },

  // ─── SEO ─────────────────────────────────────────────────────────────────
  {
    name: "Yoast SEO",
    category: "SEO",
    patterns: [
      "yoast\\.com",
    ],
  },
];

module.exports = { MARTECH_PATTERNS };
