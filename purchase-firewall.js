const {
    STRICT_PRICE_UNAVAILABLE_MESSAGE,
    getProviderCostPkrFromProvider,
    getProviderCostPkrFromPurchase,
    validateStrictProviderPrice
} = require('./strict-provider-price-guard');

function toFiniteNumber(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string' && !value.trim()) return null;
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : null;
}

function pkrToUsd(pkr, exchangeRate) {
    const amount = toFiniteNumber(pkr);
    const rate = toFiniteNumber(exchangeRate);
    if (amount == null || amount <= 0 || rate == null || rate <= 0) return null;
    return Number((amount / rate).toFixed(6));
}

function makeFirewallBlockedResponse(details = {}) {
    return {
        success: false,
        error: STRICT_PRICE_UNAVAILABLE_MESSAGE,
        priceUnavailable: true,
        strictPriceBlocked: true,
        ...details
    };
}

function parseV1NumberResponse(text) {
    const raw = String(text || '').trim();
    if (raw.startsWith('ACCESS_NUMBER:')) {
        const parts = raw.split(':');
        if (parts.length >= 3) {
            return {
                success: true,
                activationId: parts[1],
                phoneNumber: parts[2].startsWith('+') ? parts[2] : `+${parts[2]}`
            };
        }
    }
    return { success: false, error: raw || 'No number available' };
}

function parseNumberResponse(data) {
    if (typeof data === 'string') {
        const trimmed = data.trim();
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
            try {
                return parseNumberResponse(JSON.parse(trimmed));
            } catch {
                return parseV1NumberResponse(trimmed);
            }
        }
        return parseV1NumberResponse(trimmed);
    }
    if (data && typeof data === 'object') {
        if (data.activationId && data.phoneNumber) {
            return {
                success: true,
                activationId: String(data.activationId),
                phoneNumber: String(data.phoneNumber).startsWith('+')
                    ? String(data.phoneNumber)
                    : `+${String(data.phoneNumber)}`,
                activationCost: data.activationCost == null ? null : Number(data.activationCost),
                countryCode: String(data.countryCode || '').trim() || null,
                activationOperator: String(data.activationOperator || '').trim() || null,
                activationTime: data.activationTime || null,
                canGetAnotherSms: Boolean(data.canGetAnotherSms)
            };
        }
    }
    return { success: false, error: 'No number available' };
}

function extractProvidersRecursive(node, bucket = [], seen = new Set()) {
    if (!node || typeof node !== 'object') return bucket;
    if (
        Object.prototype.hasOwnProperty.call(node, 'provider_id') &&
        Object.prototype.hasOwnProperty.call(node, 'price')
    ) {
        const providerId = Number(node.provider_id);
        const providerPrice = Number(node.price);
        if (Number.isFinite(providerId) && Number.isFinite(providerPrice)) {
            const key = `${providerId}:${providerPrice}`;
            if (!seen.has(key)) {
                seen.add(key);
                bucket.push({
                    provider_id: providerId,
                    price: providerPrice,
                    count: node.count
                });
            }
        }
    }
    for (const value of Object.values(node)) {
        if (value && typeof value === 'object') {
            extractProvidersRecursive(value, bucket, seen);
        }
    }
    return bucket;
}

function extractProvidersFromPriceResponse(data, countryId, serviceCode) {
    let providers = [];
    if (data && typeof data === 'object') {
        const exactCountryNode = data[String(countryId)] ?? data[countryId] ?? null;
        const rootServiceNode = data[serviceCode] ?? null;
        if (!exactCountryNode && !rootServiceNode && Object.keys(data).some((key) => /^\d+$/.test(String(key)))) {
            return [];
        }
        const countryNode = exactCountryNode || data;
        const serviceNode = exactCountryNode
            ? countryNode?.[serviceCode]
            : rootServiceNode;
        providers = extractProvidersRecursive(serviceNode || countryNode);
    }
    return providers
        .filter((p) => Number.isFinite(p.provider_id) && Number.isFinite(p.price))
        .sort((a, b) => a.price - b.price);
}

function createPurchaseFirewall({ axios, smsbowerUrl, apiKey, exchangeRate, providerBalanceEpsilon = 0 }) {
    async function fetchLiveProviders(countryId, serviceCode = 'wa') {
        const url = `${smsbowerUrl}?api_key=${apiKey}&action=getPricesV3&service=${serviceCode}&country=${countryId}`;
        const response = await axios.get(url, { timeout: 15000 });
        return extractProvidersFromPriceResponse(response.data, countryId, serviceCode);
    }

    async function purchaseNumber({ countryId, providerId, serviceCode = 'wa', websitePricePkr, timeoutMs = 15000 }) {
        const strictProviderId = toFiniteNumber(providerId);
        if (strictProviderId == null || strictProviderId <= 0) {
            return makeFirewallBlockedResponse({ reason: 'provider_id_unavailable' });
        }
        let providers = [];
        try {
            providers = await fetchLiveProviders(countryId, serviceCode);
        } catch (err) {
            return makeFirewallBlockedResponse({ reason: 'live_provider_price_fetch_failed', providerError: err.message });
        }
        const liveProvider = providers.find((provider) => Number(provider.provider_id) === strictProviderId) || null;
        if (!liveProvider) {
            return makeFirewallBlockedResponse({ reason: 'live_provider_price_unavailable', providerId: strictProviderId });
        }
        const providerCostPkr = getProviderCostPkrFromProvider(liveProvider, exchangeRate);
        const preflight = validateStrictProviderPrice({
            websitePricePkr,
            providerCostPkr,
            message: STRICT_PRICE_UNAVAILABLE_MESSAGE
        });
        if (!preflight.allowed) return makeFirewallBlockedResponse(preflight);
        const strictMaxPrice = pkrToUsd(preflight.websitePricePkr, exchangeRate);
        if (strictMaxPrice == null || strictMaxPrice < 0) {
            return makeFirewallBlockedResponse({ reason: 'strict_max_price_unavailable' });
        }
        const url =
            `${smsbowerUrl}?api_key=${apiKey}` +
            `&action=getNumberV2` +
            `&service=${serviceCode}` +
            `&country=${countryId}` +
            `&maxPrice=${strictMaxPrice}` +
            `&providerIds=${strictProviderId}`;
        try {
            const response = await axios.get(url, { timeout: Math.max(1, Number(timeoutMs) || 15000) });
            const parsed = parseNumberResponse(response.data);
            if (!parsed.success) {
                return { success: false, error: parsed.error || 'No number from provider' };
            }
            const result = {
                ...parsed,
                provider_id: strictProviderId,
                provider_price: Number(liveProvider.price),
                activationCost: parsed.activationCost,
                countryCode: parsed.countryCode,
                activationOperator: parsed.activationOperator,
                activationTime: parsed.activationTime,
                canGetAnotherSms: parsed.canGetAnotherSms
            };
            const postflight = validateStrictProviderPrice({
                websitePricePkr: preflight.websitePricePkr,
                providerCostPkr: getProviderCostPkrFromPurchase(result, exchangeRate, providerBalanceEpsilon),
                message: STRICT_PRICE_UNAVAILABLE_MESSAGE
            });
            if (!postflight.allowed) return makeFirewallBlockedResponse({ ...postflight, activationId: result.activationId });
            return result;
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    return {
        fetchLiveProviders,
        purchaseNumber
    };
}

module.exports = {
    STRICT_PRICE_UNAVAILABLE_MESSAGE,
    createPurchaseFirewall,
    extractProvidersFromPriceResponse,
    makeFirewallBlockedResponse,
    parseNumberResponse
};
