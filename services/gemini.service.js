const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || '').trim();
const GEMINI_MODEL = String(process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();
const GEMINI_MAX_OUTPUT_TOKENS = Math.max(64, Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 1024));
const GEMINI_TEMPERATURE = Number.isFinite(Number(process.env.GEMINI_TEMPERATURE))
    ? Number(process.env.GEMINI_TEMPERATURE)
    : 0.4;
const AI_ROOT_PATH = path.join(__dirname, '..', 'ai');

let client = null;

function getClient() {
    if (!GEMINI_API_KEY) {
        const error = new Error('Gemini API key is not configured');
        error.code = 'GEMINI_NOT_CONFIGURED';
        throw error;
    }
    if (!client) {
        client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }
    return client;
}

function readTextFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch {
        return '';
    }
}

function readJsonFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return null;
    }
}

function compactJson(value, maxChars = 6000) {
    if (!value) return '';
    try {
        return JSON.stringify(value).slice(0, maxChars);
    } catch {
        return '';
    }
}

const { canonicalize } = require('./synonym.service');
const { isFuzzyMatch } = require('./fuzzy.service');

function normalizeText(text = '') {
    return String(text)
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

const STOPWORDS = new Set([
    'ho', 'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'se', 'me', 'main', 'mein',
    'mera', 'meri', 'mere', 'aap', 'ap', 'aapka', 'kya', 'kaisay', 'kaise',
    'gaya', 'gayi', 'gaye', 'raha', 'rahi', 'rahe', 'the', 'and', 'for',
    'you', 'your', 'please', 'karo', 'karen', 'kro', 'kry', 'batao', 'plz'
]);

// ---------------------------------------------------------------------
// FAQ bank loading + relevance selection.
//
// ai/knowledge/faq.json can now hold hundreds/thousands of Q&A entries.
// Instead of dumping the whole bank into every Gemini call (which used to
// get silently cut off at 6000 characters, i.e. only the first ~20-30
// entries ever reached the model), we score every entry against the
// user's current message and only send the most relevant ones. This
// keeps replies accurate no matter how large the FAQ bank grows, and
// keeps each request small/cheap.
// ---------------------------------------------------------------------

const faqFileCache = new Map(); // filePath -> { mtimeMs, data }

function buildFaqIndex(bank) {
    const faqs = Array.isArray(bank?.faqs) ? bank.faqs : [];
    const indexed = faqs.map((entry) => {
        const normKeywords = (Array.isArray(entry?.keywords) ? entry.keywords : [])
            .map((keyword) => canonicalize(keyword) || normalizeText(keyword))
            .filter((keyword) => keyword && keyword.length > 2 && !STOPWORDS.has(keyword));
        const normQuestion = canonicalize(entry?.q || entry?.question || entry?.id || '')
            || normalizeText(entry?.q || entry?.question || entry?.id || '');
        return { entry, normKeywords, normQuestion };
    });
    return { ...bank, _indexed: indexed };
}

function loadFaqBank(filePath) {
    try {
        const stat = fs.statSync(filePath);
        const cached = faqFileCache.get(filePath);
        if (cached && cached.mtimeMs === stat.mtimeMs) {
            return cached.data;
        }
        const data = buildFaqIndex(readJsonFile(filePath));
        faqFileCache.set(filePath, { mtimeMs: stat.mtimeMs, data });
        return data;
    } catch {
        return null;
    }
}

function scoreIndexedEntry(normalizedMessage, messageWords, indexed, useFuzzy) {
    let score = 0;
    for (const keyword of indexed.normKeywords) {
        if (normalizedMessage.includes(keyword)) {
            score += 3;
            continue;
        }
        // Typo-tolerant fallback: only for single-word keywords, only on
        // the (rarer) fuzzy pass, and only after the exact check above
        // already failed — keeps the common case cheap.
        if (useFuzzy && !keyword.includes(' ')) {
            for (const word of messageWords) {
                if (isFuzzyMatch(word, keyword)) {
                    score += 1.5;
                    break;
                }
            }
        }
    }
    for (const word of messageWords) {
        if (word.length > 2 && !STOPWORDS.has(word) && indexed.normQuestion.includes(word)) {
            score += 1;
        }
    }
    return score;
}

// Below this many exact-match hits, we consider the fast pass "weak" and
// spend the extra time on a typo-tolerant fuzzy pass. Real messages
// almost always clear this on the fast pass alone, so the (heavier)
// fuzzy path only runs on the harder, less common cases.
const MIN_GOOD_MATCHES = 5;

function selectRelevantFaqs(message, indexedEntries, limit = 25) {
    if (!Array.isArray(indexedEntries) || !indexedEntries.length) return [];
    const normalizedMessage = canonicalize(message) || normalizeText(message);
    const messageWords = normalizedMessage.split(' ').filter(Boolean);

    if (!normalizedMessage) {
        return indexedEntries.slice(0, Math.min(limit, indexedEntries.length)).map((i) => i.entry);
    }

    const scoreAll = (useFuzzy) => indexedEntries
        .map((indexed) => ({ indexed, score: scoreIndexedEntry(normalizedMessage, messageWords, indexed, useFuzzy) }))
        .filter((item) => item.score > 0);

    let ranked = scoreAll(false);
    if (ranked.length < MIN_GOOD_MATCHES) {
        ranked = scoreAll(true);
    }

    const scored = ranked
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.indexed.entry);

    // Nothing matched keywords/question text closely enough — fall back to a
    // small default sample so Gemini still has some grounding context.
    if (!scored.length) {
        return indexedEntries.slice(0, Math.min(10, indexedEntries.length)).map((i) => i.entry);
    }

    return scored;
}

function buildFaqContext(message, fileName, limit) {
    const bank = loadFaqBank(path.join(AI_ROOT_PATH, 'knowledge', fileName));
    const indexedEntries = Array.isArray(bank?._indexed) ? bank._indexed : [];
    if (!indexedEntries.length) return '';
    const relevant = selectRelevantFaqs(message, indexedEntries, limit);
    return compactJson({ faqs: relevant }, 20000);
}

function buildSystemInstruction(message = '', contextHints = '') {
    const promptPath = path.join(AI_ROOT_PATH, 'prompt');
    const systemPrompt = readTextFile(path.join(promptPath, 'system-prompt.md'));
    const companyInfo = readTextFile(path.join(promptPath, 'company-info.md'));
    const companyPolicy = readTextFile(path.join(promptPath, 'company-policy.md'));
    const companyConfig = compactJson(readJsonFile(path.join(AI_ROOT_PATH, 'config', 'company.json')), 8000);
    const faqKnowledge = buildFaqContext(message, 'faq.json', 25);
    const supportKnowledge = buildFaqContext(message, 'support.json', 10);
    return [
        systemPrompt,
        companyInfo,
        companyPolicy,
        companyConfig ? `Company config: ${companyConfig}` : '',
        faqKnowledge ? `Relevant FAQ knowledge for this question (use these as ground truth, rephrase naturally, do not just copy-paste verbatim): ${faqKnowledge}` : '',
        supportKnowledge ? `Support/escalation knowledge: ${supportKnowledge}` : '',
        contextHints ? `Conversation context (detected intent/entities/recent memory — use this to resolve follow-up questions like "what about India instead", do not repeat it verbatim to the user): ${contextHints}` : '',
        'You are MRFSMS AI Support. Answer clearly, confidently, and briefly using the FAQ knowledge above whenever it is relevant, even if the question is phrased differently than the FAQ text. Do not claim payment approval, wallet credit, OTP delivery, refunds, or account changes unless the application provides verified data. If live account data is required, tell the user to check their dashboard or contact support.'
    ].filter(Boolean).join('\n\n');
}

function normalizeMessages(input) {
    if (Array.isArray(input)) {
        return input
            .map((entry) => ({
                role: String(entry?.role || 'user').toLowerCase() === 'assistant' ? 'model' : 'user',
                text: String(entry?.content || entry?.text || '').trim()
            }))
            .filter((entry) => entry.text)
            .slice(-12);
    }
    const text = String(input || '').trim();
    return text ? [{ role: 'user', text }] : [];
}

async function askGemini(input, options = {}) {
    const messages = normalizeMessages(input);
    if (!messages.length) {
        const error = new Error('Message is required');
        error.code = 'GEMINI_EMPTY_MESSAGE';
        throw error;
    }
    const contents = messages.map((message) => ({
        role: message.role,
        parts: [{ text: message.text }]
    }));
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.text || '';
    const response = await getClient().models.generateContent({
        model: String(options.model || GEMINI_MODEL),
        contents,
        config: {
            systemInstruction: buildSystemInstruction(lastUserMessage, options.contextHints || ''),
            temperature: GEMINI_TEMPERATURE,
            maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS
        }
    });
    const text = String(response?.text || '').trim();
    if (!text) {
        const error = new Error('Gemini returned an empty response');
        error.code = 'GEMINI_EMPTY_RESPONSE';
        throw error;
    }
    return text;
}

function getGeminiHealth() {
    return {
        configured: Boolean(GEMINI_API_KEY),
        model: GEMINI_MODEL,
        sdk: '@google/genai'
    };
}

module.exports = {
    askGemini,
    getGeminiHealth
};
