/**
 * services/ai.service.js
 * MRFSMS AI Engine
 */

const { askGemini, getGeminiHealth } = require("./gemini.service");
const { detectIntentWithConfidence } = require("./intent.service");
const { extractEntities } = require("./entity.service");
const { getReply } = require("./knowledge.service");
const memory = require("./memory.service");

// Confidence threshold (0..1) — at or above this, we trust the local
// knowledge base and skip Gemini entirely (fast + free). Below it, we
// fall back to Gemini even if a weak keyword/fuzzy hit was found.
// Tune per business risk appetite via env var, no code change needed.
const CONFIDENCE_THRESHOLD = Number.isFinite(Number(process.env.AI_CONFIDENCE_THRESHOLD))
    ? Number(process.env.AI_CONFIDENCE_THRESHOLD)
    : 0.6;

function normalizeChatInput(input = {}) {
    const message = String(input.message || input.text || "").trim();

    const messages = Array.isArray(input.messages)
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

/** Fills gaps in this turn's entities using recently remembered ones,
 *  e.g. "aur uska price?" after "USA whatsapp number kaise le" still
 *  knows service=whatsapp, country=usa. */
function resolveEntitiesWithContext(currentEntities, contextEntities) {
    const resolved = { ...contextEntities };
    for (const [key, value] of Object.entries(currentEntities)) {
        if (value !== null && value !== undefined && value !== "") {
            resolved[key] = value;
        }
    }
    return resolved;
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

    // Previous memory (older snapshot, rolling history, carried-forward entities)
    const previousMemory = memory.get(userId) || {};
    const contextEntities = memory.getContextEntities(userId);
    const history = memory.getHistory(userId);

    // Detect intent + confidence (exact + synonym + fuzzy matching)
    const { intent, confidence, matchedKeywords } = detectIntentWithConfidence(message);

    // Detect entities for this turn, then resolve against recent context
    const entities = extractEntities(message);
    const resolvedEntities = resolveEntitiesWithContext(entities, contextEntities);

    // Save this turn (snapshot for backward-compat + rolling history)
    memory.merge(userId, { intent, ...entities });
    memory.pushMessage(userId, "user", message, { intent, entities });

    // High confidence -> answer straight from the knowledge base (fast, free).
    const localReply = getReply(intent);

    if (localReply && confidence >= CONFIDENCE_THRESHOLD) {

        memory.pushMessage(userId, "assistant", localReply, { intent });

        return {
            success: true,
            source: "knowledge",
            intent,
            confidence,
            entities: resolvedEntities,
            reply: localReply
        };
    }

    // Low confidence (or no local reply) -> Gemini fallback, with real
    // multi-turn conversation history + a compact context-hints summary
    // so follow-up questions resolve naturally.
    const conversation = [
        ...history.map((turn) => ({ role: turn.role, content: turn.text })),
        { role: "user", content: message }
    ];

    const contextHints = JSON.stringify({
        detectedIntent: intent,
        intentConfidence: confidence,
        matchedKeywords,
        entities: resolvedEntities
    });

    const reply = await askGemini(conversation, {
        userId,
        memory: previousMemory,
        contextHints
    });

    memory.pushMessage(userId, "assistant", reply, { intent });

    return {
        success: true,
        source: "gemini",
        intent,
        confidence,
        entities: resolvedEntities,
        reply
    };
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
