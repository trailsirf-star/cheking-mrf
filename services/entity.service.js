/**
 * services/entity.service.js
 * MRFSMS AI Entity Engine
 */

const { canonicalize, normalize } = require("./synonym.service");
const { isFuzzyMatch } = require("./fuzzy.service");

// Matches the real services offered on the dashboard (dashboard.html
// service grid) plus a few common aliases.
const SERVICES = [
    "whatsapp", "facebook", "instagram", "snapchat", "google", "tiktok",
    "imo", "tinder", "twitter", "amazon", "alibaba", "careem", "spotify",
    "openai", "paypal", "aliexpress", "wechat", "viber", "uber",
    "microsoft", "signal", "easypay", "telegram", "discord", "binance",
    "gmail"
];

const COUNTRIES = [
    "pakistan", "india", "usa", "uk", "canada", "indonesia", "vietnam",
    "thailand", "malaysia", "philippines", "brazil", "germany", "france",
    "russia", "turkey", "saudi", "uae"
];

const PAYMENTS = [
    "easypaisa",
    "binance"
];

const FUZZY_ENTITY_THRESHOLD = 0.82;

function detectLanguage(text = "") {

    if (/[\u0600-\u06FF]/.test(text))
        return "urdu";

    // Common Roman-Urdu marker words. If none of these appear, and the
    // text is otherwise plain ASCII, treat it as English.
    const romanUrduMarkers = /\b(hai|hain|kya|nahi|nahin|nhi|ni|mera|meri|mere|kaise|kaisay|karo|batao|bhai|yaar|chahiye|kro|kry|se|wala|wali|hoga|hogi|tha|thi|bheje|bhej|dijiye|kijiye|karein|karain)\b/i;

    if (romanUrduMarkers.test(text))
        return "roman-urdu";

    if (/^[\x00-\x7F]*$/.test(text) && text.trim())
        return "english";

    return "roman-urdu";

}

/**
 * Finds the first list item that appears (exactly, or fuzzily for
 * typo-tolerance) inside the already-canonicalized text.
 */
function findMatch(text, list) {

    for (const item of list) {

        if (text.includes(item))
            return item;

    }

    // Exact substring failed — try fuzzy match per token (catches typos
    // like "whatsap", "telgram", "byance").
    const tokens = text.split(" ").filter(Boolean);

    for (const item of list) {

        if (item.includes(" ")) continue; // fuzzy compare is per single token

        for (const token of tokens) {

            if (isFuzzyMatch(token, item, FUZZY_ENTITY_THRESHOLD))
                return item;

        }

    }

    return null;

}

function detectOrderId(text) {

    const match = text.match(/\b\d{4,12}\b/);

    return match ? match[0] : null;

}

function detectTransactionId(text) {

    const hasKeyword = /\b(txid|trx|txn|reference|transaction)\b/i.test(text);

    if (!hasKeyword) return null;

    const KEYWORD_SET = new Set(["txid", "trx", "txn", "reference", "transaction", "id"]);

    const candidates = (text.match(/\b[A-Za-z0-9]{5,}\b/g) || [])
        .filter((token) => !KEYWORD_SET.has(token.toLowerCase()));

    if (!candidates.length) return null;

    // Real transaction IDs are usually a mix of letters + digits — prefer
    // those, otherwise fall back to the first remaining candidate.
    const mixed = candidates.find((token) => /[0-9]/.test(token) && /[A-Za-z]/.test(token));

    return mixed || candidates[0];

}

function extractEntities(message = "") {

    const text = canonicalize(message) || normalize(message);

    return {

        service: findMatch(text, SERVICES),

        country: findMatch(text, COUNTRIES),

        paymentMethod: findMatch(text, PAYMENTS),

        language: detectLanguage(message),

        orderId: detectOrderId(text),

        transactionId: detectTransactionId(message)

    };

}

module.exports = {

    extractEntities,
    SERVICES,
    COUNTRIES,
    PAYMENTS

};
