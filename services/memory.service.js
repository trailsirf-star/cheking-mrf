/**
 * services/memory.service.js
 * MRFSMS AI Context Memory
 *
 * Keeps a short rolling window of each user's recent messages + last
 * known entities/intent, so follow-up questions ("aur uska price?"
 * after "USA whatsapp number kaise le") can be understood without the
 * user repeating themselves.
 *
 * Backward compatible: get(userId) / merge(userId, data) / clear(userId)
 * behave exactly as before (same signatures, same "flat merged snapshot"
 * shape). Everything else here is additive.
 */

const HISTORY_LIMIT = Math.max(2, Number(process.env.AI_MEMORY_HISTORY_LIMIT || 8)); // ~4 turns

const store = new Map(); // userId -> { snapshot: {...}, history: [{role, text, intent, entities, at}] }

function ensure(userId) {
    const id = String(userId);
    if (!store.has(id)) {
        store.set(id, { snapshot: {}, history: [] });
    }
    return store.get(id);
}

/** Original behavior: returns the flat merged snapshot object. */
function get(userId) {
    return { ...ensure(userId).snapshot };
}

/** Original behavior: shallow-merges data into the snapshot. */
function merge(userId, data = {}) {
    const record = ensure(userId);
    record.snapshot = {
        ...record.snapshot,
        ...data,
        updatedAt: Date.now()
    };
    return { ...record.snapshot };
}

function clear(userId) {
    store.delete(String(userId));
}

/**
 * Appends one turn (user or assistant) to the rolling history, capped
 * at HISTORY_LIMIT entries (oldest dropped first).
 */
function pushMessage(userId, role, text, meta = {}) {
    const record = ensure(userId);
    record.history.push({
        role: role === "assistant" ? "assistant" : "user",
        text: String(text || "").slice(0, 2000),
        intent: meta.intent || null,
        entities: meta.entities || null,
        at: Date.now()
    });
    if (record.history.length > HISTORY_LIMIT) {
        record.history.splice(0, record.history.length - HISTORY_LIMIT);
    }
    return record.history;
}

/** Returns the last `limit` turns (oldest first), for building Gemini context. */
function getHistory(userId, limit = HISTORY_LIMIT) {
    const record = ensure(userId);
    return record.history.slice(-limit);
}

/**
 * Merges entities across recent history so a follow-up question that
 * omits a detail (e.g. country/service already mentioned a turn ago)
 * can still resolve it. Most recent non-null value wins per field.
 */
function getContextEntities(userId) {
    const record = ensure(userId);
    const merged = {};
    for (const turn of record.history) {
        if (!turn.entities) continue;
        for (const [key, value] of Object.entries(turn.entities)) {
            if (value !== null && value !== undefined && value !== "") {
                merged[key] = value;
            }
        }
    }
    return merged;
}

module.exports = {
    get,
    merge,
    clear,
    pushMessage,
    getHistory,
    getContextEntities
};
