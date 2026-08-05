/**
 * services/synonym.service.js
 * MRFSMS AI Synonym Engine
 *
 * Turns messy real-world input (Urdu script / Roman Urdu / English,
 * common typos, alternate spellings) into one canonical, matchable form.
 *
 * Used by: intent.service.js, entity.service.js, gemini.service.js
 * (FAQ relevance scoring) — every place that used to do plain
 * lowercase+strip-punctuation normalization can swap in canonicalize()
 * for much better matching, with zero new dependencies.
 */

// Canonical token -> list of variants (Roman Urdu spellings, typos,
// English synonyms, and a few common Urdu-script words). Matching is
// done on whole word boundaries so short canonical forms (e.g. "ni")
// cannot corrupt unrelated words.
const SYNONYM_GROUPS = {
    nahi: ["nahi", "nahin", "nahe", "nai", "nhi", "ni", "nae", "ny"],
    otp: ["otp", "o.t.p", "otop", "otp.", "onetimepassword"],
    code: ["code", "cod", "kod"],
    receive: ["receive", "recieve", "recive", "resieve", "received", "recieved"],
    verification: ["verification", "verfication", "varification", "verifcation"],
    number: ["number", "numbr", "numebr", "nmbr", "num"],
    payment: ["payment", "paymnt", "paymet", "pemnt", "peymant"],
    paisay: ["paisay", "paisa", "paisey", "paise", "rupay", "rupaye", "rupees", "rupya", "rupiya"],
    balance: ["balance", "blance", "ballance", "baqaya"],
    wallet: ["wallet", "walet", "wallett"],
    refund: ["refund", "refnd", "refaund", "refunt"],
    pending: ["pending", "pendin", "pendding", "pendng"],
    ban: ["ban", "band", "banned", "bband", "suspend", "suspended", "block", "blocked", "blockd"],
    login: ["login", "log in", "logn", "loginn"],
    order: ["order", "ordr", "oder"],
    transaction: ["transaction", "transection", "tranaction", "trx", "txn", "txid"],
    vpn: ["vpn", "v.p.n", "tunnelbear", "tunnel bear"],
    youtube: ["youtube", "you tube", "utube", "yt"],
    referral: ["referral", "refral", "refferal", "refer"],
    service: ["service", "servic", "srvice"],
    country: ["country", "cntry", "cuntry"],
    live: ["live feed", "livefeed", "live"],
    golden: ["golden", "gold", "goldn"],
    parallel: ["parallel space", "parallel", "clone app", "clone"],
    minimum: ["minimum", "minmum", "min"],
    deposit: ["deposit", "depsit", "depoist"],
    screenshot: ["screenshot", "screen shot", "ss", "scrnshot"],

    // services
    whatsapp: ["whatsapp", "whatsap", "watsapp", "whats app", "wtsapp", "wattsapp"],
    telegram: ["telegram", "teligram", "telegrm", "telgram"],
    facebook: ["facebook", "fb", "face book", "facebok"],
    instagram: ["instagram", "insta", "instagrm", "instgram"],
    tiktok: ["tiktok", "tik tok", "tictok"],
    google: ["google", "gogle", "googl"],
    gmail: ["gmail", "g mail", "gmial"],
    discord: ["discord", "discrd", "discord"],
    snapchat: ["snapchat", "snap chat", "snapchaat"],
    binance: ["binance", "binanace", "byance", "binnance"],
    twitter: ["twitter", "twiter", "x app"],
    amazon: ["amazon", "amzon", "amazn"],
    microsoft: ["microsoft", "micro soft", "mcrosoft"],
    easypaisa: ["easypaisa", "easy paisa", "easypesa", "easy pesa"],

    // countries
    usa: ["usa", "us", "united states", "u.s.a", "america"],
    uk: ["uk", "u.k", "united kingdom", "britain"],
    uae: ["uae", "u.a.e", "dubai", "emirates"],
    saudi: ["saudi", "saudi arabia", "ksa"]
};

// Pre-build variant -> canonical lookup + regex per variant (word-boundary,
// longest-first so multi-word variants match before their sub-words do).
const REPLACEMENTS = [];
for (const canonical of Object.keys(SYNONYM_GROUPS)) {
    for (const variant of SYNONYM_GROUPS[canonical]) {
        if (variant === canonical) continue;
        REPLACEMENTS.push({ variant, canonical });
    }
}
REPLACEMENTS.sort((a, b) => b.variant.length - a.variant.length);

const REPLACEMENT_REGEXES = REPLACEMENTS.map(({ variant, canonical }) => {
    const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    return { regex: new RegExp(`\\b${escaped}\\b`, "gi"), canonical };
});

// A handful of common Urdu-script domain words mapped straight to their
// Roman Urdu canonical form (plain string replace, no word-boundary
// regex needed since Urdu script has no spaces-in-token ambiguity here).
const URDU_SCRIPT_MAP = [
    ["اوٹی پی", "otp"], ["او ٹی پی", "otp"],
    ["پیسے", "paisay"], ["روپے", "paisay"], ["رقم", "paisay"],
    ["بیلنس", "balance"], ["والٹ", "wallet"],
    ["ادائیگی", "payment"], ["پیمنٹ", "payment"],
    ["ریفنڈ", "refund"], ["واپسی", "refund"],
    ["بند", "ban"], ["بلاک", "ban"],
    ["لاگ ان", "login"], ["نمبر", "number"],
    ["آرڈر", "order"], ["ٹرانزیکشن", "transaction"],
    ["وی پی این", "vpn"], ["یوٹیوب", "youtube"],
    ["ریفرل", "referral"], ["سروس", "service"], ["ملک", "country"],
    ["نہیں", "nahi"], ["نہی", "nahi"],
    ["آئی", "ayi"], ["آیا", "aya"], ["موصول", "receive"]
];

function normalize(text = "") {
    return String(text)
        .toLowerCase()
        .replace(/[^\w\s\u0600-\u06FF]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * normalize() + synonym/typo expansion. This is the function every
 * matching engine (intent, entity, FAQ) should use instead of a plain
 * lowercase/strip.
 */
function canonicalize(text = "") {
    let working = String(text || "");

    for (const [urduPhrase, canonical] of URDU_SCRIPT_MAP) {
        if (working.includes(urduPhrase)) {
            working = working.split(urduPhrase).join(` ${canonical} `);
        }
    }

    working = normalize(working);

    for (const { regex, canonical } of REPLACEMENT_REGEXES) {
        working = working.replace(regex, canonical);
    }

    return working.replace(/\s+/g, " ").trim();
}

module.exports = {
    normalize,
    canonicalize,
    SYNONYM_GROUPS
};
