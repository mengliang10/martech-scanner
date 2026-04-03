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

  // ─── SESSION RECORDING & HEATMAPS ────────────────────────────────────────
  {
    name: "Contentsquare",
    category: "Session Recording",
    patterns: [
      "contentsquare\\.net",
      "uxa\\.io",
      "czplugin",
      "ContentSquare\\.init",
    ],
  },
  {
    name: "Quantum Metric",
    category: "Session Recording",
    patterns: [
      "cdn\\.quantummetric\\.com",
      "quantummetric\\.com/api",
    ],
  },
  {
    name: "Glassbox",
    category: "Session Recording",
    patterns: [
      "cdn\\.gbqofs\\.com",
      "gbqofs\\.com",
      "glassbox\\.com/recorder",
    ],
  },
  {
    name: "LogRocket",
    category: "Session Recording",
    patterns: [
      "cdn\\.logrocket\\.io",
      "logrocket\\.com/record",
      "LogRocket\\.init\\s*\\(",
    ],
  },
  {
    name: "Smartlook",
    category: "Session Recording",
    patterns: [
      "web-sdk\\.smartlook\\.com",
      "rec\\.smartlook\\.com",
      "smartlook\\.init\\s*\\(",
    ],
  },
  {
    name: "Inspectlet",
    category: "Session Recording",
    patterns: [
      "cdn\\.inspectlet\\.com",
      "__insp_push\\s*\\(",
    ],
  },
  {
    name: "Medallia Digital (Decibel)",
    category: "Session Recording",
    patterns: [
      "cdn\\.decibelinsight\\.net",
      "d\\.decibelinsight\\.net",
      "medal\\.lia\\.com",
      "dnx\\.medallia\\.com",
    ],
  },
  {
    name: "SessionStack",
    category: "Session Recording",
    patterns: [
      "cdn\\.sessionstack\\.com",
      "SessionStack\\.init\\s*\\(",
    ],
  },

  // ─── PERSONALIZATION ─────────────────────────────────────────────────────
  {
    name: "Dynamic Yield",
    category: "Personalization",
    patterns: [
      "cdn\\.dynamicyield\\.com",
      "st\\.dynamicyield\\.com",
      "DY\\.API\\s*\\(",
    ],
  },
  {
    name: "Monetate",
    category: "Personalization",
    patterns: [
      "se\\.monetate\\.net",
      "monetate\\.net/w/",
    ],
  },
  {
    name: "Salesforce Interaction Studio (Evergage)",
    category: "Personalization",
    patterns: [
      "cdn\\.evergage\\.com",
      "evergage\\.com/api",
      "Evergage\\.init\\s*\\(",
    ],
  },
  {
    name: "Nosto",
    category: "Personalization",
    patterns: [
      "connect\\.nosto\\.com",
      "nosto\\.com/include",
    ],
  },
  {
    name: "Barilliance",
    category: "Personalization",
    patterns: [
      "barilliance\\.net",
      "barilliance\\.com/be",
    ],
  },
  {
    name: "RichRelevance (Emerge)",
    category: "Personalization",
    patterns: [
      "recs\\.richrelevance\\.com",
      "richrelevance\\.com/rrserver",
    ],
  },

  // ─── CUSTOMER FEEDBACK & SURVEYS ─────────────────────────────────────────
  {
    name: "Qualtrics",
    category: "Customer Feedback",
    patterns: [
      "qualtrics\\.com/WRSiteInterceptEngine",
      "qualtrics\\.com/jfe",
      "siteintercept\\.qualtrics\\.com",
      "ZN_",
    ],
  },
  {
    name: "Medallia (Survey)",
    category: "Customer Feedback",
    patterns: [
      "kampyle\\.com",
      "medallia\\.com/survey",
      "nebula\\.kampyle\\.com",
    ],
  },
  {
    name: "UserVoice",
    category: "Customer Feedback",
    patterns: [
      "widget\\.uservoice\\.com",
      "UserVoice\\.push\\s*\\(",
    ],
  },
  {
    name: "Typeform",
    category: "Customer Feedback",
    patterns: [
      "embed\\.typeform\\.com",
      "typeform\\.com/to/",
    ],
  },
  {
    name: "SurveyMonkey",
    category: "Customer Feedback",
    patterns: [
      "surveymonkey\\.com/r/",
      "smcx\\.com",
      "surveymonkey\\.com/collect",
    ],
  },
  {
    name: "GetFeedback",
    category: "Customer Feedback",
    patterns: [
      "getfeedback\\.com",
      "usabilla\\.com",
    ],
  },
  {
    name: "Hotjar (Surveys)",
    category: "Customer Feedback",
    patterns: [
      "insights\\.hotjar\\.com",
    ],
  },

  // ─── E-COMMERCE ──────────────────────────────────────────────────────────
  {
    name: "Shopify Analytics",
    category: "E-commerce",
    patterns: [
      "cdn\\.shopify\\.com",
      "shopify\\.com/s/files",
      "Shopify\\.analytics",
    ],
  },
  {
    name: "WooCommerce",
    category: "E-commerce",
    patterns: [
      "woocommerce\\.com",
      "wc-ajax",
      "woocommerce_params",
    ],
  },
  {
    name: "Magento / Adobe Commerce",
    category: "E-commerce",
    patterns: [
      "mage/cookies",
      "Magento_",
      "requirejs/require\\.js",
    ],
  },
  {
    name: "Yotpo",
    category: "E-commerce",
    patterns: [
      "staticw2\\.yotpo\\.com",
      "yotpo\\.com/widget",
    ],
  },
  {
    name: "Bazaarvoice",
    category: "E-commerce",
    patterns: [
      "bazaarvoice\\.com",
      "bvapi\\.bazaarvoice\\.com",
    ],
  },
  {
    name: "Trustpilot",
    category: "E-commerce",
    patterns: [
      "widget\\.trustpilot\\.com",
      "invitations\\.trustpilot\\.com",
    ],
  },
  {
    name: "Klevu",
    category: "E-commerce",
    patterns: [
      "js\\.klevu\\.com",
      "klevu\\.com/api",
    ],
  },
  {
    name: "Algolia",
    category: "E-commerce",
    patterns: [
      "cdn\\.jsdelivr\\.net/npm/algoliasearch",
      "algolia\\.net/1/indexes",
      "algoliainsights\\.com",
    ],
  },

  // ─── AFFILIATE & PARTNERSHIPS ─────────────────────────────────────────────
  {
    name: "Impact (Impact Radius)",
    category: "Affiliate",
    patterns: [
      "utt\\.impactcdn\\.com",
      "impact\\.com/conversions",
      "d\\.impactradius-event\\.com",
    ],
  },
  {
    name: "CJ Affiliate (Commission Junction)",
    category: "Affiliate",
    patterns: [
      "www\\.emjcd\\.com",
      "cj\\.com/collector",
      "qsstats\\.com",
    ],
  },
  {
    name: "Rakuten Marketing",
    category: "Affiliate",
    patterns: [
      "tag\\.rmp\\.rakuten\\.com",
      "linksynergy\\.com",
    ],
  },
  {
    name: "Partnerize",
    category: "Affiliate",
    patterns: [
      "prf\\.hn",
      "partnerize\\.com/v",
    ],
  },
  {
    name: "Awin",
    category: "Affiliate",
    patterns: [
      "www\\.awin1\\.com",
      "awin\\.com/awclick",
    ],
  },

  // ─── MORE ADVERTISING ────────────────────────────────────────────────────
  {
    name: "Reddit Ads",
    category: "Advertising",
    patterns: [
      "rdt\\.li",
      "ads-api\\.reddit\\.com",
      "reddit\\.com/ads/pixel",
      "redditmedia\\.com/ads",
      "rpx\\.reddit\\.com",
    ],
  },
  {
    name: "Quora Pixel",
    category: "Advertising",
    patterns: [
      "qpxl\\.quora\\.com",
      "quora\\.com/qevents\\.js",
      "qp\\.push\\s*\\(",
    ],
  },
  {
    name: "StackAdapt",
    category: "Advertising",
    patterns: [
      "tags\\.srv\\.stackadapt\\.com",
      "stackadapt\\.com/saq",
    ],
  },
  {
    name: "The Trade Desk",
    category: "Advertising",
    patterns: [
      "js\\.adsrvr\\.org",
      "insight\\.adsrvr\\.org",
    ],
  },
  {
    name: "Xandr (AppNexus)",
    category: "Advertising",
    patterns: [
      "acdn\\.adnxs\\.com",
      "secure\\.adnxs\\.com",
    ],
  },
  {
    name: "Magnite (Rubicon)",
    category: "Advertising",
    patterns: [
      "fastlane\\.rubiconproject\\.com",
      "prebid\\.rubiconproject\\.com",
    ],
  },
  {
    name: "PubMatic",
    category: "Advertising",
    patterns: [
      "ads\\.pubmatic\\.com",
      "simage2\\.pubmatic\\.com",
    ],
  },
  {
    name: "Google AdSense",
    category: "Advertising",
    patterns: [
      "pagead2\\.googlesyndication\\.com",
      "adsbygoogle",
    ],
  },
  {
    name: "LiveRamp",
    category: "Advertising",
    patterns: [
      "ats\\.rlcdn\\.com",
      "liveramp\\.com/pixel",
    ],
  },

  // ─── MORE MARKETING AUTOMATION ───────────────────────────────────────────
  {
    name: "Salesforce Marketing Cloud",
    category: "Marketing Automation",
    patterns: [
      "exacttarget\\.com",
      "salesforce-marketingcloud\\.com",
      "memberclicks\\.net",
      "et\\.exacttarget\\.com",
    ],
  },
  {
    name: "Emarsys (SAP)",
    category: "Marketing Automation",
    patterns: [
      "cdn\\.scarabresearch\\.com",
      "scarabresearch\\.com",
      "emarsys\\.com/api",
    ],
  },
  {
    name: "Brevo (Sendinblue)",
    category: "Marketing Automation",
    patterns: [
      "sibautomation\\.com",
      "sendinblue\\.com/tracker",
    ],
  },
  {
    name: "dotdigital",
    category: "Marketing Automation",
    patterns: [
      "r\\.dotdigital-pages\\.com",
      "tracking\\.dotmailer\\.com",
    ],
  },
  {
    name: "Omnisend",
    category: "Marketing Automation",
    patterns: [
      "omnisrc\\.com",
      "omnisend\\.com/tracker",
    ],
  },
  {
    name: "Pendo",
    category: "Marketing Automation",
    patterns: [
      "cdn\\.pendo\\.io",
      "app\\.pendo\\.io",
      "pendo\\.initialize\\s*\\(",
    ],
  },

  // ─── VIDEO & CONTENT ─────────────────────────────────────────────────────
  {
    name: "Wistia",
    category: "Video & Content",
    patterns: [
      "fast\\.wistia\\.com",
      "fast\\.wistia\\.net",
      "wistia\\.com/embed",
    ],
  },
  {
    name: "Vidyard",
    category: "Video & Content",
    patterns: [
      "play\\.vidyard\\.com",
      "embed\\.vidyard\\.com",
    ],
  },
  {
    name: "Brightcove",
    category: "Video & Content",
    patterns: [
      "players\\.brightcove\\.net",
      "brightcove\\.com/services",
    ],
  },
  {
    name: "JW Player",
    category: "Video & Content",
    patterns: [
      "cdn\\.jwplayer\\.com",
      "jwplatform\\.com",
    ],
  },

  // ─── MORE ANALYTICS ──────────────────────────────────────────────────────
  {
    name: "New Relic Browser",
    category: "Analytics",
    patterns: [
      "js-agent\\.newrelic\\.com",
      "bam\\.nr-data\\.net",
      "NREUM",
    ],
  },
  {
    name: "Dynatrace RUM",
    category: "Analytics",
    patterns: [
      "bf\\.dynatrace\\.com",
      "dynatracelabs\\.com",
      "dtrum\\.init\\s*\\(",
    ],
  },
  {
    name: "Datadog RUM",
    category: "Analytics",
    patterns: [
      "browser-intake-datadoghq\\.com",
      "datadoghq\\.com/api/v2/rum",
      "DD_RUM\\.init\\s*\\(",
    ],
  },
  {
    name: "Sentry",
    category: "Analytics",
    patterns: [
      "browser\\.sentry-cdn\\.com",
      "sentry\\.io/api",
      "Sentry\\.init\\s*\\(",
    ],
  },
  {
    name: "PostHog",
    category: "Analytics",
    patterns: [
      "app\\.posthog\\.com",
      "us\\.i\\.posthog\\.com",
      "posthog\\.init\\s*\\(",
    ],
  },
  {
    name: "Pirsch",
    category: "Analytics",
    patterns: [
      "api\\.pirsch\\.io",
    ],
  },
];

module.exports = { MARTECH_PATTERNS };
