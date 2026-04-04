// ai-identifier.js — AI-based martech tag identification
// Tries DeepSeek first, then Anthropic for any remaining unidentified signals
// Learned patterns are saved to learned-patterns.json for future reuse

const OpenAI    = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { learnPatterns } = require('./pattern-learner');

const CATEGORIES = [
  'Analytics', 'Advertising', 'Tag Manager', 'Marketing Automation',
  'CRM', 'Chat & Support', 'A/B Testing', 'Consent Management',
  'Session Recording', 'Personalization', 'Customer Feedback',
  'E-commerce', 'Affiliate', 'Performance Monitoring', 'Video & Content',
  'SEO', 'Other',
];

function buildPrompt(urls, skipNames) {
  const skipNote = skipNames.length > 0
    ? `\nAlready identified (do not repeat these): ${skipNames.join(', ')}`
    : '';
  return `You are a martech/web analytics expert. Identify marketing technology tools from these URLs collected from a website.

URLs:
${urls.join('\n')}
${skipNote}

Return ONLY a JSON array with no markdown or explanation.
Each element: {"name":"Tool Name","category":"Category","matchedUrl":"exact URL from the list above that identifies this tool"}
Valid categories: ${CATEGORIES.join(', ')}
Only include tools you are confident about. Return [] if none found.`;
}

function parseJsonArray(text) {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    return match ? JSON.parse(match[0]) : [];
  } catch {
    return [];
  }
}

/** Extract unique hostnames from a URL list, up to maxCount */
function topDomains(urls, maxCount = 5) {
  const seen = new Set();
  for (const u of urls) {
    try { seen.add(new URL(u).hostname); } catch {}
    if (seen.size >= maxCount) break;
  }
  return [...seen];
}

async function identifyWithDeepSeek(urls, skipNames) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key || urls.length === 0) return { results: [], called: false };

  const client = new OpenAI({ apiKey: key, baseURL: 'https://api.deepseek.com' });
  try {
    const res = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: buildPrompt(urls, skipNames) }],
      temperature: 0,
      max_tokens: 2000,
    });
    return { results: parseJsonArray(res.choices[0]?.message?.content || '[]'), called: true };
  } catch (err) {
    console.error('[ai] DeepSeek error:', err.message);
    return { results: [], called: true };
  }
}

async function identifyWithAnthropic(urls, skipNames) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || urls.length === 0) return { results: [], called: false };

  const client = new Anthropic({ apiKey: key });
  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: buildPrompt(urls, skipNames) }],
    });
    return { results: parseJsonArray(msg.content[0]?.text || '[]'), called: true };
  } catch (err) {
    console.error('[ai] Anthropic error:', err.message);
    return { results: [], called: true };
  }
}

/**
 * Identify unknown martech tools using AI.
 * DeepSeek runs first; Anthropic handles anything it missed.
 * Results with a matchedUrl are persisted to learned-patterns.json.
 *
 * @param {string[]} signals     - URLs not matched by patterns
 * @param {Array}    patternTags - tags already found by pattern matching
 * @returns {{ aiTags, providers, deepseekCalled, anthropicCalled, anthropicSkipped, deepseekDomains, anthropicDomains, newPatternsLearned }}
 */
async function identifyWithAI(signals, patternTags) {
  if (signals.length === 0) {
    return { aiTags: [], providers: [], deepseekCalled: false, anthropicCalled: false, anthropicSkipped: false, deepseekDomains: [], anthropicDomains: [], newPatternsLearned: 0 };
  }

  const aiTags = [];
  const providers = [];
  const foundNames = patternTags.map(t => t.name);

  // Step 1: DeepSeek
  const deepseekDomains = topDomains(signals);
  const { results: dsResults, called: deepseekCalled } = await identifyWithDeepSeek(signals, foundNames);
  for (const t of dsResults) {
    if (t.name && t.category) {
      aiTags.push({ name: t.name, category: t.category, matchedUrl: t.matchedUrl || null, source: 'DeepSeek' });
    }
  }
  if (aiTags.length > 0) providers.push('DeepSeek');

  // Step 2: Anthropic — only if DeepSeek didn't identify everything
  const allFoundNames = [...foundNames, ...aiTags.map(t => t.name)];

  // Find signals still unidentified after DeepSeek
  const dsIdentifiedUrls = new Set(dsResults.map(r => r.matchedUrl).filter(Boolean));
  const remainingSignals = signals.filter(u => !dsIdentifiedUrls.has(u));

  let anthropicCalled = false;
  let anthropicSkipped = false;
  let anthropicDomains = [];

  if (remainingSignals.length === 0) {
    anthropicSkipped = true;
  } else {
    anthropicDomains = topDomains(remainingSignals);
    const { results: anResults, called } = await identifyWithAnthropic(remainingSignals, allFoundNames);
    anthropicCalled = called;
    let anthropicAdded = 0;
    for (const t of anResults) {
      if (!t.name || !t.category) continue;
      const lower = t.name.toLowerCase();
      if (!allFoundNames.some(n => n.toLowerCase() === lower)) {
        aiTags.push({ name: t.name, category: t.category, matchedUrl: t.matchedUrl || null, source: 'Anthropic' });
        anthropicAdded++;
      }
    }
    if (anthropicAdded > 0) providers.push('Anthropic');
  }

  // Persist learned patterns
  const newPatternsLearned = learnPatterns(aiTags);

  aiTags.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return { aiTags, providers, deepseekCalled, anthropicCalled, anthropicSkipped, deepseekDomains, anthropicDomains, newPatternsLearned };
}

module.exports = { identifyWithAI };
