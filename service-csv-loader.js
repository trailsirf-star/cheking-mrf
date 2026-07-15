const fs = require('fs');
const path = require('path');

const REQUIRED_HEADERS = ['country', 'rank', 'agentids', 'originalusd', 'convertedpkr', 'finalpkr'];

function parseCsvLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        const next = line[index + 1];
        if (char === '"') {
            if (inQuotes && next === '"') {
                current += '"';
                index += 1;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}

function normalizeHeader(value) {
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function normalizeServiceType(value) {
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '').trim();
}

function normalizeCountryName(value) {
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function readJson(filePath, fallback) {
    try {
        if (!fs.existsSync(filePath)) return fallback;
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return fallback;
    }
}

function readCsvRows(filePath) {
    const lines = fs.readFileSync(filePath, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    if (!lines.length) return [];
    const headers = parseCsvLine(lines[0]).map(normalizeHeader);
    const hasRequiredHeaders = REQUIRED_HEADERS.every((header) => headers.includes(header));
    if (!hasRequiredHeaders) return [];
    return lines.slice(1).map((line) => {
        const cells = parseCsvLine(line);
        return headers.reduce((row, header, index) => {
            row[header] = cells[index] == null ? '' : cells[index];
            return row;
        }, {});
    });
}

function parseAgentIds(value) {
    return String(value || '')
        .split(',')
        .map((entry) => Number(String(entry || '').trim()))
        .filter(Number.isFinite);
}

function getCountryResolverEntry(countryResolver, serviceType, countryName) {
    const serviceKey = normalizeServiceType(serviceType);
    const countryKey = normalizeCountryName(countryName);
    return countryResolver?.services?.[serviceKey]?.[countryKey]
        || countryResolver?.global?.[countryKey]
        || null;
}

function makeCountryFromRow(row, countryMeta, fallbackOrder) {
    const finalPrice = Number(row.finalpkr);
    return {
        name: String(countryMeta?.name || row.country || '').trim(),
        code: String(countryMeta?.code || '').trim(),
        price: Number.isFinite(finalPrice) ? finalPrice : 0,
        countryId: Number(countryMeta?.countryId),
        flag: countryMeta?.flag || '',
        catalogOrder: fallbackOrder
    };
}

let EMBEDDED_COUNTRY_RESOLVER = {};
try {
    EMBEDDED_COUNTRY_RESOLVER = require('./country-resolver');
} catch {
    EMBEDDED_COUNTRY_RESOLVER = {};
}

function loadCsvServiceData(options = {}) {
    const servicesDirectory = options.servicesDirectory || path.join(__dirname, 'services');
    const fileResolver = readJson(path.join(servicesDirectory, '_country-resolver.json'), { global: {}, services: {} });
    const countryResolver = {
        global: { ...EMBEDDED_COUNTRY_RESOLVER, ...(fileResolver.global || {}) },
        services: fileResolver.services || {}
    };
    const services = {};
    const pricing = {};
    const providerRanks = {};
    const providerRanksByServiceCountry = {};

    if (!fs.existsSync(servicesDirectory)) {
        return { services, pricing, providerRanks, providerRanksByServiceCountry };
    }

    const files = fs.readdirSync(servicesDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === '.csv')
        .filter((entry) => !entry.name.startsWith('_'));

    files.forEach((entry) => {
        const serviceType = normalizeServiceType(path.basename(entry.name, path.extname(entry.name)));
        if (!serviceType) return;
        const rows = readCsvRows(path.join(servicesDirectory, entry.name));
        const countries = [];
        const countryIndexById = new Map();
        const countryHasBasePriceById = new Set();
        pricing[serviceType] = pricing[serviceType] || {};
        providerRanksByServiceCountry[serviceType] = providerRanksByServiceCountry[serviceType] || {};

        rows.forEach((row) => {
            const countryName = String(row.country || '').trim();
            if (!countryName) return;
            const countryMeta = getCountryResolverEntry(countryResolver, serviceType, countryName);
            const countryId = Number(countryMeta?.countryId);
            if (!Number.isFinite(countryId)) return;
            const finalPrice = Number(row.finalpkr);
            const agentIds = parseAgentIds(row.agentids);
            if (!countryIndexById.has(countryId)) {
                countryIndexById.set(countryId, countries.length);
                countries.push(makeCountryFromRow(row, countryMeta, countries.length));
            } else if (!agentIds.length) {
                const existingCountry = countries[countryIndexById.get(countryId)];
                if (Number.isFinite(finalPrice) && finalPrice > 0) {
                    existingCountry.price = finalPrice;
                    countryHasBasePriceById.add(countryId);
                }
            } else {
                const existingCountry = countries[countryIndexById.get(countryId)];
                if (!countryHasBasePriceById.has(countryId) && Number.isFinite(finalPrice) && finalPrice > 0 && (!Number(existingCountry.price) || finalPrice < Number(existingCountry.price))) {
                    existingCountry.price = finalPrice;
                }
            }

            if (!Number.isFinite(finalPrice) || finalPrice <= 0) return;
            if (!agentIds.length) return;
            pricing[serviceType][countryId] = pricing[serviceType][countryId] || {};
            providerRanksByServiceCountry[serviceType][countryId] = providerRanksByServiceCountry[serviceType][countryId] || {};
            const rank = String(row.rank || 'Bronze').trim() || 'Bronze';
            agentIds.forEach((providerId) => {
                pricing[serviceType][countryId][providerId] = finalPrice;
                providerRanks[providerId] = rank;
                providerRanksByServiceCountry[serviceType][countryId][providerId] = rank;
            });
        });

        services[serviceType] = {
            serviceType,
            countries
        };
    });

    return { services, pricing, providerRanks, providerRanksByServiceCountry };
}

module.exports = {
    loadCsvServiceData,
    normalizeServiceType
};
