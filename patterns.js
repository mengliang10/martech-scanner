// Martech tag patterns — based on Wappalyzer fingerprints (MIT)
// Each entry: { name, category, patterns[] }
// Patterns are regexes matched against the full page HTML source.

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
      "clicky\\.init\\s*\\(",
    ],
  },
  {
    name: "Woopra",
    category: "Analytics",
    patterns: [
      "static\\.woopra\\.com",
      "woopra\\.com/track",
      "woopra\\.identify\\s*\\(",
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
      "scorecardresearch\\.com",
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
      "lo\\.init\\s*\\(",
    ],
  },
  {
    name: "Mouseflow",
    category: "Analytics",
    patterns: [
      "cdn\\.mouseflow\\.com",
      "mouseflow\\.com/projects",
      "mf\\.init\\s*\\(",
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
      "adobedtm\\.com",
    ],
  },
  {
    name: "Adobe DTM (Legacy)",
    category: "Tag Managers",
    patterns: [
      "//[^/]+/satelliteLib-",
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
      "ensighten\\.com/i/",
    ],
  },
  {
    name: "Signal (formerly BrightTag)",
    category: "Tag Managers",
    patterns: [
      "cdn\\.signal\\.co",
      "signaltag\\.js",
    ],
  },
  {
    name: "Commanders Act",
    category: "Tag Managers",
    patterns: [
      "cdn\\.tagcommander\\.com",
      "tagcommander\\.com",
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
      "tiktok\\.com/i18n/pixel",
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
      "microsoft\\.com/bat",
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
      "amzn\\.to",
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
      "adrollimg\\.com",
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
      "quantcount\\.com",
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
      "hubspot\\.com/analytics",
    ],
  },
  {
    name: "Marketo",
    category: "Marketing Automation",
    patterns: [
      "munchkin\\.marketo\\.net",
      "Munchkin\\.init\\s*\\(",
      "marketo\\.com/index\\.php",
    ],
  },
  {
    name: "Pardot (Salesforce)",
    category: "Marketing Automation",
    patterns: [
      "pi\\.pardot\\.com",
      "pardot\\.com/pd\\.js",
      "piAId",
      "piCId",
    ],
  },
  {
    name: "Oracle Eloqua",
    category: "Marketing Automation",
    patterns: [
      "img\\.en25\\.com",
      "eloqua\\.com/visitor/v200",
      "tracking\\.edgesuite\\.net",
    ],
  },
  {
    name: "Mailchimp",
    category: "Marketing Automation",
    patterns: [
      "chimpstatic\\.com",
      "list-manage\\.com",
      "mailchimp\\.com/embed",
    ],
  },
  {
    name: "ActiveCampaign",
    category: "Marketing Automation",
    patterns: [
      "trackcmp\\.net",
      "activehosted\\.com/f",
      "activehosted\\.com/app",
    ],
  },
  {
    name: "Klaviyo",
    category: "Marketing Automation",
    patterns: [
      "static\\.klaviyo\\.com",
      "klaviyo\\.com/media/js",
      "klaviyo\\.identify\\s*\\(",
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
      "iterable\\.initialize\\s*\\(",
    ],
  },
  {
    name: "Sailthru",
    category: "Marketing Automation",
    patterns: [
      "ak\\.sail-horizon\\.com",
      "sailthru\\.com/horizon",
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
      "dc\\.getdrip\\.com",
    ],
  },

  // ─── CRM / CUSTOMER DATA ─────────────────────────────────────────────────
  {
    name: "Salesforce",
    category: "CRM",
    patterns: [
      "salesforce\\.com/analytics",
      "d\\.la[0-9]+cs\\.salesforceliveagent\\.com",
      "salesforceliveagent\\.com",
    ],
  },
  {
    name: "mParticle",
    category: "CRM",
    patterns: [
      "jssdkcdns\\.mparticle\\.com",
      "mparticle\\.com/js",
      "mParticle\\.init\\s*\\(",
    ],
  },
  {
    name: "Lytics",
    category: "CRM",
    patterns: [
      "c\\.lytics\\.io",
      "lytics\\.io/api",
    ],
  },

  // ─── CHAT & SUPPORT ──────────────────────────────────────────────────────
  {
    name: "Intercom",
    category: "Chat & Support",
    patterns: [
      "widget\\.intercom\\.io",
      "js\\.intercomcdn\\.com",
      "Intercom\\s*\\(",
      "intercomSettings",
    ],
  },
  {
    name: "Drift",
    category: "Chat & Support",
    patterns: [
      "js\\.driftt\\.com",
      "drift\\.load\\s*\\(",
      "driftt\\.com",
    ],
  },
  {
    name: "Zendesk Chat",
    category: "Chat & Support",
    patterns: [
      "static\\.zdassets\\.com",
      "ekr\\.zdassets\\.com",
      "zendesk\\.com/embeddable",
    ],
  },
  {
    name: "LiveChat",
    category: "Chat & Support",
    patterns: [
      "cdn\\.livechatinc\\.com",
      "livechatinc\\.com/tracking\\.js",
    ],
  },
  {
    name: "Olark",
    category: "Chat & Support",
    patterns: [
      "static\\.olark\\.com",
      "olark\\.identify\\s*\\(",
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
      "widget\\.tidio\\.co",
    ],
  },
  {
    name: "Tawk.to",
    category: "Chat & Support",
    patterns: [
      "embed\\.tawk\\.to",
      "tawk\\.to/s/",
    ],
  },
  {
    name: "Crisp Chat",
    category: "Chat & Support",
    patterns: [
      "client\\.crisp\\.chat",
      "crisp\\.chat/js/sdk",
      "\\$crisp\\.push\\s*\\(",
    ],
  },

  // ─── A/B TESTING ─────────────────────────────────────────────────────────
  {
    name: "Optimizely",
    category: "A/B Testing",
    patterns: [
      "cdn\\.optimizely\\.com",
      "optimizely\\.com/js",
      "window\\.optimizely",
    ],
  },
  {
    name: "VWO (Visual Website Optimizer)",
    category: "A/B Testing",
    patterns: [
      "dev\\.visualwebsiteoptimizer\\.com",
      "visualwebsiteoptimizer\\.com/deploy",
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
      "mbox\\.js",
      "at\\.js",
      "adobe\\.target\\.getOffer",
    ],
  },
  {
    name: "AB Tasty",
    category: "A/B Testing",
    patterns: [
      "try\\.abtasty\\.com",
      "abtasty\\.com/js",
    ],
  },
  {
    name: "Convert",
    category: "A/B Testing",
    patterns: [
      "cdn-4\\.convertexperiments\\.com",
      "convertexperiments\\.com",
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

  // ─── SEO & PERFORMANCE ───────────────────────────────────────────────────
  {
    name: "Moz",
    category: "SEO",
    patterns: [
      "moz\\.com/api",
    ],
  },
  {
    name: "Yoast SEO",
    category: "SEO",
    patterns: [
      "yoast\\.com",
      "\"@type\"\\s*:\\s*\"Article\"",
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
      "cookiebot\\.com/en/cookie-declaration",
    ],
  },
  {
    name: "TrustArc",
    category: "Consent Management",
    patterns: [
      "consent\\.trustarc\\.com",
      "truste\\.com/notice",
    ],
  },
  {
    name: "Didomi",
    category: "Consent Management",
    patterns: [
      "sdk\\.privacy-center\\.org",
      "didomi\\.io/public",
    ],
  },
];
