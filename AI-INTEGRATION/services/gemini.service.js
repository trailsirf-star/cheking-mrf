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

function compactJson(value) {
    if (!value) return '';
    try {
        return JSON.stringify(value).slice(0, 6000);
    } catch {
        return '';
    }
}

function buildSystemInstruction() {
    const promptPath = path.join(AI_ROOT_PATH, 'prompt');
    const systemPrompt = readTextFile(path.join(promptPath, 'system-prompt.md'));
    const companyInfo = readTextFile(path.join(promptPath, 'company-info.md'));
    const companyPolicy = readTextFile(path.join(promptPath, 'company-policy.md'));
    const companyConfig = compactJson(readJsonFile(path.join(AI_ROOT_PATH, 'config', 'company.json')));
    const faqKnowledge = compactJson(readJsonFile(path.join(AI_ROOT_PATH, 'knowledge', 'faq.json')));
    const supportKnowledge = compactJson(readJsonFile(path.join(AI_ROOT_PATH, 'knowledge', 'support.json')));
    return [
        systemPrompt,
        companyInfo,
        companyPolicy,
        companyConfig ? `Company config: ${companyConfig}` : '',
        faqKnowledge ? `FAQ knowledge: ${faqKnowledge}` : '',
        supportKnowledge ? `Support knowledge: ${supportKnowledge}` : '',
        'You are MRFSMS AI Support. Answer clearly, safely, and briefly. Do not claim payment approval, wallet credit, OTP delivery, refunds, or account changes unless the application provides verified data. If live account data is required, tell the user to check their dashboard or contact support.'
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
    const response = await getClient().models.generateContent({
        model: String(options.model || GEMINI_MODEL),
        contents,
        config: {
            systemInstruction: buildSystemInstruction(),
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