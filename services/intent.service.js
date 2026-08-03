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
    }
];

function normalize(text = "") {

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function detectIntent(message = "") {

    const text = normalize(message);

    let best = {
        intent: "unknown",
        score: 0
    };

    for (const intent of intents) {

        let score = 0;

        for (const keyword of intent.keywords) {

            if (text.includes(keyword.toLowerCase())) {
                score++;
            }

        }

        if (score > best.score) {

            best.intent = intent.name;
            best.score = score;

        }

    }

    return best.intent;

}

module.exports = {
    detectIntent
};