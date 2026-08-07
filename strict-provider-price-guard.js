const STRICT_PRICE_UNAVAILABLE_MESSAGE = 'No numbers available at the current price.';

function toFiniteNumber(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string' && !value.trim()) return null;
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
}

function normalizeMoney(value) {
    const numberValue = toFiniteNumber(value);
    if (numberValue == null) return null;
    return Number(numberValue.toFixed(6));
}

function getProviderCostPkrFromProvider(provider, exchangeRate) {
    const providerPriceUsd = toFiniteNumber(provider?.price);
    const numericExchangeRate = toFiniteNumber(exchangeRate);
    if (providerPriceUsd == null || providerPriceUsd < 0 || numericExchangeRate == null || numericExchangeRate <= 0) return null;
    return normalizeMoney(providerPriceUsd * numericExchangeRate);
}

function getProviderCostPkrFromPurchase(result, exchangeRate, epsilon = 0) {
    const numericExchangeRate = toFiniteNumber(exchangeRate);
    if (numericExchangeRate == null || numericExchangeRate <= 0) return null;
    const numericEpsilon = Math.max(0, toFiniteNumber(epsilon) || 0);
    const activationCostUsd = toFiniteNumber(result?.activationCost);
    if (activationCostUsd != null && activationCostUsd > numericEpsilon) {
        return normalizeMoney(activationCostUsd * numericExchangeRate);
    }
    const providerPriceUsd = toFiniteNumber(result?.provider_price ?? result?.price);
    if (providerPriceUsd != null && providerPriceUsd >= 0) {
        return normalizeMoney(providerPriceUsd * numericExchangeRate);
    }
    return null;
}

function validateStrictProviderPrice({ websitePricePkr, providerCostPkr, message = STRICT_PRICE_UNAVAILABLE_MESSAGE }) {
    const websitePrice = normalizeMoney(websitePricePkr);
    const providerCost = normalizeMoney(providerCostPkr);
    if (websitePrice == null || websitePrice <= 0 || providerCost == null || providerCost < 0) {
        return {
            allowed: false,
            error: message,
            code: 'STRICT_PRICE_GUARD_BLOCKED',
            reason: 'missing_price',
            websitePricePkr: websitePrice,
            providerCostPkr: providerCost
        };
    }
    if (providerCost > websitePrice) {
        return {
            allowed: false,
            error: message,
            code: 'STRICT_PRICE_GUARD_BLOCKED',
            reason: 'provider_cost_exceeds_website_price',
            websitePricePkr: websitePrice,
            providerCostPkr: providerCost
        };
    }
    return {
        allowed: true,
        websitePricePkr: websitePrice,
        providerCostPkr: providerCost
    };
}

function assertStrictProviderPrice(input) {
    const result = validateStrictProviderPrice(input);
    if (result.allowed) return result;
    const err = new Error(result.error);
    err.code = result.code;
    err.reason = result.reason;
    err.websitePricePkr = result.websitePricePkr;
    err.providerCostPkr = result.providerCostPkr;
    throw err;
}

module.exports = {
    STRICT_PRICE_UNAVAILABLE_MESSAGE,
    getProviderCostPkrFromProvider,
    getProviderCostPkrFromPurchase,
    validateStrictProviderPrice,
    assertStrictProviderPrice
};
