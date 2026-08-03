/**
 * services/entity.service.js
 * MRFSMS AI Entity Engine
 */

const SERVICES = [
    "whatsapp",
    "telegram",
    "facebook",
    "instagram",
    "tiktok",
    "google",
    "gmail",
    "discord",
    "snapchat",
    "binance",
    "twitter",
    "x",
    "amazon",
    "microsoft"
];

const COUNTRIES = [
    "pakistan",
    "india",
    "usa",
    "united states",
    "uk",
    "united kingdom",
    "canada",
    "indonesia",
    "vietnam",
    "thailand",
    "malaysia",
    "philippines",
    "brazil",
    "germany",
    "france",
    "russia",
    "turkey",
    "saudi",
    "saudi arabia",
    "uae",
    "dubai"
];

const PAYMENTS = [
    "easypaisa",
    "binance"
];

function normalize(text = "") {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}

function detectLanguage(text = "") {

    if (/[\u0600-\u06FF]/.test(text))
        return "urdu";

    return "roman-urdu";

}

function findMatch(text, list) {

    for (const item of list) {

        if (text.includes(item.toLowerCase()))
            return item;

    }

    return null;

}

function detectOrderId(text) {

    const match = text.match(/\b\d{4,12}\b/);

    return match ? match[0] : null;

}

function detectTransactionId(text) {

    const regex = /(txid|trx|txn|reference|transaction)\s*[:#-]?\s*([A-Za-z0-9]+)/i;

    const match = text.match(regex);

    if (match)
        return match[2];

    return null;

}

function extractEntities(message = "") {

    const text = normalize(message);

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

    extractEntities

};