const conversations = new Map();

function getHistory(userId) {
    return conversations.get(userId) || [];
}

function addMessage(userId, role, content) {
    const history = conversations.get(userId) || [];
    history.push({ role, content });

    if (history.length > 20) {
        history.shift();
    }

    conversations.set(userId, history);
}

function clearHistory(userId) {
    conversations.delete(userId);
}

module.exports = {
    getHistory,
    addMessage,
    clearHistory
};