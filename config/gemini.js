const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || '').trim();
const GEMINI_MODEL = String(process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite').trim();
const GEMINI_MAX_OUTPUT_TOKENS = Math.max(64, Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 1024));
const parsedTemperature = Number(process.env.GEMINI_TEMPERATURE);
const GEMINI_TEMPERATURE = Number.isFinite(parsedTemperature) ? parsedTemperature : 0.4;
const GEMINI_SYSTEM_INSTRUCTION = String(process.env.GEMINI_SYSTEM_INSTRUCTION || '').trim() || [
    'You are MRFSMS AI Support.',
    'Answer clearly, safely, and briefly.',
    'Do not claim payment approval, wallet credit, OTP delivery, refunds, or account changes unless the application provides verified data.',
    'If live account data is required, tell the user to check their dashboard or contact support.'
].join(' ');

module.exports = {
    GEMINI_API_KEY,
    GEMINI_MODEL,
    GEMINI_MAX_OUTPUT_TOKENS,
    GEMINI_TEMPERATURE,
    GEMINI_SYSTEM_INSTRUCTION
};
