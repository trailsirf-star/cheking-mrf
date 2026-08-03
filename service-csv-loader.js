const fs = require('fs');
const path = require('path');

const REQUIRED_HEADERS = ['country', 'rank', 'agentids', 'originalusd', 'convertedpkr', 'finalpkr'];

function getLogger(options = {}) {
    return options.logger || console;
}

function logInfo(logger, message, details = null) {
    if (!logger || typeof logger.info !== 'function') return;
    if (details == null) {
        logger.info(message);
        return;
    }
    logger.info(message, details);
}

function logWarn(logger, message, details = null) {
    if (!logger || typeof logger.warn !== 'function') return;
    if (details == null) {
        logger.warn(message);
        return;
    }
    logger.warn(message, details);
}

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

const COUNTRY_NAME_ALIASES = {
    'united states': 'usa',
    'united states of america': 'usa',
    'u s a': 'usa',
    'us': 'usa',
    'u s': 'usa'
};

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
    const aliasKey = COUNTRY_NAME_ALIASES[countryKey] || '';
    return countryResolver?.services?.[serviceKey]?.[countryKey]
        || (aliasKey ? countryResolver?.services?.[serviceKey]?.[aliasKey] : null)
        || countryResolver?.global?.[countryKey]
        || (aliasKey ? countryResolver?.global?.[aliasKey] : null)
        || null;
}

function parseCsvCountryId(row) {
    const rawCountryId = String(row?.countryid || row?.country_id || '').trim();
    if (!rawCountryId) return null;
    const countryId = Number(rawCountryId.split('|')[0].trim());
    return Number.isInteger(countryId) && countryId >= 0 ? countryId : null;
}

function makeCountryFromRow(row, countryMeta, fallbackOrder, countryIdOverride = null) {
    const finalPrice = Number(row.finalpkr);
    return {
        name: String(countryMeta?.name || row.country || '').trim(),
        code: String(countryMeta?.code || '').trim(),
        price: Number.isFinite(finalPrice) ? finalPrice : 0,
        countryId: Number(countryIdOverride ?? countryMeta?.countryId),
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
    const logger = getLogger(options);
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
    const skippedRows = [];

    if (!fs.existsSync(servicesDirectory)) {
        logWarn(logger, '[service-csv-loader] services directory missing', { servicesDirectory });
        return { services, pricing, providerRanks, providerRanksByServiceCountry, skippedRows };
    }

    const files = fs.readdirSync(servicesDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === '.csv')
        .filter((entry) => !entry.name.startsWith('_'));

    files.forEach((entry) => {
        const serviceType = normalizeServiceType(path.basename(entry.name, path.extname(entry.name)));
        if (!serviceType) {
            skippedRows.push({ file: entry.name, reason: 'invalid_service_type' });
            logWarn(logger, '[service-csv-loader] country removal reason', { file: entry.name, reason: 'invalid_service_type' });
            return;
        }
        const rows = readCsvRows(path.join(servicesDirectory, entry.name));
        const countries = [];
        const countryIndexById = new Map();
        const countryHasBasePriceById = new Set();
        pricing[serviceType] = pricing[serviceType] || {};
        providerRanksByServiceCountry[serviceType] = providerRanksByServiceCountry[serviceType] || {};

        rows.forEach((row, rowIndex) => {
            const countryName = String(row.country || '').trim();
            if (!countryName) {
                skippedRows.push({ file: entry.name, row: rowIndex + 2, reason: 'missing_country_name' });
                logWarn(logger, '[service-csv-loader] country removal reason', { serviceType, file: entry.name, row: rowIndex + 2, reason: 'missing_country_name' });
                return;
            }
            const countryMeta = getCountryResolverEntry(countryResolver, serviceType, countryName);
            const csvCountryId = parseCsvCountryId(row);
            const countryId = Number(csvCountryId ?? countryMeta?.countryId);
            if (!Number.isFinite(countryId)) {
                skippedRows.push({ file: entry.name, row: rowIndex + 2, country: countryName, reason: 'missing_country_id' });
                logWarn(logger, '[service-csv-loader] country removal reason', { serviceType, file: entry.name, row: rowIndex + 2, country: countryName, reason: 'missing_country_id' });
                return;
            }
            const finalPrice = Number(row.finalpkr);
            const agentIds = parseAgentIds(row.agentids);
            if (!countryIndexById.has(countryId)) {
                countryIndexById.set(countryId, countries.length);
                countries.push(makeCountryFromRow(row, countryMeta, countries.length, countryId));
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

        const pricedCountryCount = countries.filter((country) => {
            const serviceCountryPricing = pricing[serviceType]?.[Number(country.countryId)];
            return serviceCountryPricing && Object.keys(serviceCountryPricing).length > 0;
        }).length;
        if (!countries.length) {
            delete pricing[serviceType];
            delete providerRanksByServiceCountry[serviceType];
            logWarn(logger, '[service-csv-loader] CSV loaded count', { serviceType, file: entry.name, rows: rows.length, countries: 0, pricedCountries: 0 });
            return;
        }
        if (!Object.keys(pricing[serviceType] || {}).length) {
            delete pricing[serviceType];
            delete providerRanksByServiceCountry[serviceType];
        }
        services[serviceType] = {
            serviceType,
            countries
        };
        logInfo(logger, '[service-csv-loader] CSV loaded count', { serviceType, file: entry.name, rows: rows.length, countries: countries.length, pricedCountries: pricedCountryCount });
    });

    logInfo(logger, '[service-csv-loader] loaded service country totals', Object.fromEntries(Object.entries(services).map(([serviceType, service]) => [serviceType, service.countries.length])));
    return { services, pricing, providerRanks, providerRanksByServiceCountry, skippedRows };
}

module.exports = {
    loadCsvServiceData,
    normalizeServiceType
};
