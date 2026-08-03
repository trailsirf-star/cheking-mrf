/**
 * services/ai.service.js
 * MRFSMS AI Engine
 */

const { askGemini, getGeminiHealth } = require("./gemini.service");

const { detectIntent } = require("./intent.service");
const { extractEntities } = require("./entity.service");
const { getReply } = require("./knowledge.service");
const memory = require("./memory.service");

function normalizeChatInput(input) {

    const message = String(input?.message || input?.text || "").trim();

    const messages = Array.isArray(input?.messages)
        ? input.messages
        : null;

    return {
        message,
        messages
    };

}

function getUserId(input = {}, user = {}) {

    return (
        user?.id ||
        user?.email ||
        input?.conversationId ||
        input?.sessionId ||
        "anonymous"
    );

}

async function chat(input = {}, user = {}) {

    const normalized = normalizeChatInput(input);

    const message = normalized.message;

    if (!message) {

        const error = new Error("Message is required");

        error.statusCode = 400;

        throw error;

    }

    const userId = getUserId(input, user);

    // Load Previous Memory
    const previous = memory.get(userId) || {};

    // Detect Intent
    const intent = detectIntent(message);

    // Detect Entities
    const entities = extractEntities(message);

    // Merge With Memory
    memory.merge(userId, {

        intent,

        ...entities

    });

    // Try Knowledge Engine
    const localReply = getReply(intent);

    if (localReply) {

        return {

            success: true,

            source: "knowledge",

            intent,

            entities,

            reply: localReply

        };

    }

    // Gemini Fallback
    try {

        const reply = await askGemini(message, {

            userId,

            memory: previous

        });

        return {

            success: true,

            source: "gemini",

            intent,

            entities,

            reply

        };

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

function health() {

    const gemini = getGeminiHealth();

    return {

        success: true,

        service: "ai",

        gemini,

        status: gemini.configured
            ? "ready"
            : "not_configured"

    };

}

module.exports = {

    chat,

    health

};