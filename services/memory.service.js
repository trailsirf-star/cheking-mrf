/**
 * services/memory.service.js
 * Simple Memory Store
 */

const store = new Map();

function get(userId) {
    return store.get(String(userId)) || {};
}

function merge(userId, data = {}) {
    const id = String(userId);

    const previous = get(id);

    const updated = {
        ...previous,
        ...data,
        updatedAt: Date.now()
    };

    store.set(id, updated);

    return updated;
}

function clear(userId) {
    store.delete(String(userId));
}

module.exports = {
    get,
    merge,
    clear
};
