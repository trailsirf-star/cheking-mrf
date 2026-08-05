/**
 * services/fuzzy.service.js
 * MRFSMS AI Fuzzy Matching Engine
 *
 * Small, dependency-free similarity utilities so questions still match
 * even when keywords are not typed exactly right. Intended for short
 * words/phrases (chat messages, keyword lists), so a plain iterative
 * Levenshtein distance is more than fast enough — no external library
 * needed, keeping the project lightweight.
 */

const DEFAULT_THRESHOLD = 0.8;

function levenshtein(a = "", b = "") {
    a = String(a);
    b = String(b);
    if (a === b) return 0;
    const la = a.length;
    const lb = b.length;
    if (la === 0) return lb;
    if (lb === 0) return la;

    let prevRow = new Array(lb + 1);
    let currRow = new Array(lb + 1);
    for (let j = 0; j <= lb; j++) prevRow[j] = j;

    for (let i = 1; i <= la; i++) {
        currRow[0] = i;
        const charA = a.charCodeAt(i - 1);
        for (let j = 1; j <= lb; j++) {
            const cost = charA === b.charCodeAt(j - 1) ? 0 : 1;
            currRow[j] = Math.min(
                prevRow[j] + 1,      // deletion
                currRow[j - 1] + 1,  // insertion
                prevRow[j - 1] + cost // substitution
            );
        }
        [prevRow, currRow] = [currRow, prevRow];
    }
    return prevRow[lb];
}

/** 0 = completely different, 1 = identical */
function similarity(a = "", b = "") {
    a = String(a);
    b = String(b);
    const maxLen = Math.max(a.length, b.length);
    if (maxLen === 0) return 1;
    return 1 - levenshtein(a, b) / maxLen;
}

function isFuzzyMatch(a, b, threshold = DEFAULT_THRESHOLD) {
    if (!a || !b) return false;
    // Skip fuzzy compare on very short strings — too noisy (e.g. "ok" vs "go").
    if (a.length < 3 || b.length < 3) return a === b;
    // Cheap bail-out: edit distance can never be smaller than the length
    // difference, so if that alone already breaks the threshold there is
    // no point running the full Levenshtein DP table.
    const maxLen = Math.max(a.length, b.length);
    const lenDiff = Math.abs(a.length - b.length);
    if (1 - lenDiff / maxLen < threshold) return false;
    return similarity(a, b) >= threshold;
}

/**
 * Checks whether `phrase` (single word or multi-word) fuzzily occurs
 * inside `messageTokens` (array of already-tokenized message words).
 * Multi-word phrases are matched with a sliding window of the same
 * token-count, averaging per-token similarity.
 */
function fuzzyPhraseInTokens(messageTokens, phrase, threshold = DEFAULT_THRESHOLD) {
    const phraseTokens = String(phrase || "").split(" ").filter(Boolean);
    if (!phraseTokens.length || !messageTokens.length) return false;

    if (phraseTokens.length === 1) {
        return messageTokens.some((word) => isFuzzyMatch(word, phraseTokens[0], threshold));
    }

    for (let i = 0; i + phraseTokens.length <= messageTokens.length; i++) {
        let total = 0;
        for (let j = 0; j < phraseTokens.length; j++) {
            total += similarity(messageTokens[i + j], phraseTokens[j]);
        }
        if (total / phraseTokens.length >= threshold) return true;
    }
    return false;
}

module.exports = {
    levenshtein,
    similarity,
    isFuzzyMatch,
    fuzzyPhraseInTokens,
    DEFAULT_THRESHOLD
};
