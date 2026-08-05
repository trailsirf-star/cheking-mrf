/**
 * services/intent.service.js
 * MRFSMS AI Intent Engine
 */

const intents = [
    {
        name: "greeting",
        keywords: [
            "hi","hello","hey","assalam","assalamualaikum","asalam","slam",
            "salam","aoa","good morning","good evening","good night"
        ]
    },

    {
        name: "otp_not_received",
        keywords: [
            "otp",
            "code",
            "verification code",
            "receive",
            "not receive",
            "not received",
            "didn't receive",
            "didnt receive",
            "no code",
            "otp nahi",
            "otp ni",
            "otp nhi",
            "otp aya",
            "otp ayi",
            "otp nahi ayi",
            "otp ni ayi",
            "otp nhi ayi",
            "code nahi aya",
            "code ni aya",
            "verification nahi",
            "sms nahi"
        ]
    },

    {
        name: "payment_pending",
        keywords: [
            "payment pending",
            "pending payment",
            "payment add nahi",
            "payment add ni",
            "payment approve",
            "approve nahi",
            "wallet add nahi",
            "wallet update nahi",
            "deposit pending",
            "payment verify"
        ]
    },

    {
        name: "payment_approved",
        keywords: [
            "payment approved",
            "payment received",
            "wallet added",
            "deposit completed",
            "approved"
        ]
    },

    {
        name: "refund_request",
        keywords: [
            "refund",
            "money back",
            "return money",
            "refund chahiye",
            "refund do",
            "refund please"
        ]
    },

    {
        name: "wallet_balance",
        keywords: [
            "wallet",
            "balance",
            "mera balance",
            "wallet balance",
            "wallet check"
        ]
    },

    {
        name: "order_status",
        keywords: [
            "order",
            "status",
            "my order",
            "order id",
            "track order",
            "check order"
        ]
    },

    {
        name: "login_not_available",
        keywords: [
            "login not available",
            "login unavailable",
            "cannot login",
            "can't login",
            "login issue",
            "login problem"
        ]
    },

    {
        name: "permanent_number",
        keywords: [
            "permanent",
            "permanent number",
            "permanent whatsapp",
            "keep number",
            "lifetime number"
        ]
    },

    {
        name: "vpn_help",
        keywords: [
            "vpn",
            "tunnelbear",
            "tunnel bear"
        ]
    },

    {
        name: "parallel_space",
        keywords: [
            "parallel",
            "parallel space",
            "clone app"
        ]
    },

    {
        name: "golden_number",
        keywords: [
            "golden",
            "golden number",
            "premium number"
        ]
    },

    {
        name: "transaction_issue",
        keywords: [
            "transaction",
            "trx",
            "txid",
            "transaction id",
            "reference id"
        ]
    },

    {
        name: "youtube_tutorial",
        keywords: [
            "youtube",
            "tutorial",
            "video guide",
            "video dekh",
            "guide video",
            "step by step video",
            "koi video",
            "video chahiye"
        ]
    },

    {
        name: "number_ban",
        keywords: [
            "ban ho gaya",
            "banned",
            "account ban",
            "number ban",
            "suspend ho gaya",
            "account suspend",
            "block ho gaya",
            "ban ki guarantee",
            "ban guarantee"
        ]
    },

    {
        name: "how_to_use_number",
        keywords: [
            "number kaise use",
            "number use karne ka tarika",
            "purchase ke baad kya karna",
            "number lene ke baad",
            "number activate kaise",
            "number ko safe kaise",
            "naya number kaise chalayen"
        ]
    },

    {
        name: "live_feed_help",
        keywords: [
            "live feed",
            "stable number",
            "kaunsa number lena",
            "best number kaunsa",
            "dusra number try",
            "series change",
            "tier change"
        ]
    }
];

function normalize(text = "") {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

const { canonicalize } = require("./synonym.service");
const { isFuzzyMatch, fuzzyPhraseInTokens } = require("./fuzzy.service");

const EXACT_WEIGHT = 2;
const FUZZY_WEIGHT = 1;
const FUZZY_THRESHOLD = 0.82;
// One exact keyword hit (weight 2) already saturates confidence to 1.0.
// Tune via env if a business needs a stricter/looser fast-path gate.
const CONFIDENCE_SATURATION = Number(process.env.AI_INTENT_CONFIDENCE_SATURATION || 2);

/**
 * Confidence-aware intent detection.
 * Returns { intent, score, confidence, matchedKeywords }.
 * confidence is 0..1 — higher means "safe to answer from the local
 * knowledge base", lower means "let Gemini handle it".
 */
function detectIntentWithConfidence(message = "") {

    const text = canonicalize(message) || normalize(message);
    const tokens = text.split(" ").filter(Boolean);

    let best = {
        intent: "unknown",
        score: 0,
        matchedKeywords: []
    };

    for (const intent of intents) {

        let score = 0;
        const matchedKeywords = [];

        for (const rawKeyword of intent.keywords) {

            const keyword = canonicalize(rawKeyword) || normalize(rawKeyword);
            if (!keyword) continue;

            if (text.includes(keyword)) {
                score += EXACT_WEIGHT;
                matchedKeywords.push(rawKeyword);
                continue;
            }

            if (fuzzyPhraseInTokens(tokens, keyword, FUZZY_THRESHOLD)) {
                score += FUZZY_WEIGHT;
                matchedKeywords.push(`~${rawKeyword}`);
            }
        }

        if (score > best.score) {
            best = { intent: intent.name, score, matchedKeywords };
        }
    }

    const confidence = best.score > 0
        ? Math.min(1, best.score / CONFIDENCE_SATURATION)
        : 0;

    return {
        intent: best.intent,
        score: best.score,
        confidence: Number(confidence.toFixed(2)),
        matchedKeywords: best.matchedKeywords
    };
}

function detectIntent(message = "") {
    // Kept for backward compatibility — same signature/return type as
    // before (plain intent-name string). New code should prefer
    // detectIntentWithConfidence().
    return detectIntentWithConfidence(message).intent;
}

module.exports = {
    detectIntent,
    detectIntentWithConfidence
};
