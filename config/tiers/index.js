const fs = require('fs');
const path = require('path');

const SERVICES_DIRECTORY = path.join(__dirname, '..', 'services');
const CONFIG_DIRECTORY = path.join(__dirname, '..');
const PROJECT_DIRECTORY = path.join(__dirname, '..', '..');
const ROOT_TIERS_DIRECTORY = path.join(PROJECT_DIRECTORY, 'tiers');
const RESERVED_CONFIG_DIRECTORIES = new Set(['services', 'tiers']);
const services = require('../services');

function parseCsvLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let index = 0; index < line.length; index++) {
        const char = line[index];
        const next = line[index + 1];
        if (char === '"') {
            if (inQuotes && next === '"') {
                current += '"';
                index++;
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
    return String(value || '').trim().toLowerCase();
}

function normalizeCountryName(value) {
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}

function loadServiceType(serviceDirectory, fallbackName) {
    const configPath = path.join(serviceDirectory, 'config.json');
    if (!fs.existsSync(configPath)) return normalizeServiceType(fallbackName);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return normalizeServiceType(config.serviceType || fallbackName);
}

function loadTierCsv(filePath) {
    const lines = fs.readFileSync(filePath, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    if (!lines.length) return [];

    const headers = parseCsvLine(lines[0]).map(normalizeHeader);
    return lines.slice(1).map((line) => {
        const cells = parseCsvLine(line);
        return headers.reduce((row, header, index) => {
            row[header] = cells[index];
            return row;
        }, {});
    });
}

function getFirstValue(row, keys) {
    for (const key of keys) {
        if (row[key] != null && String(row[key]).trim() !== '') return row[key];
    }
    return null;
}

function buildCountryLookup(serviceType) {
    const countries = Array.isArray(services[serviceType]?.countries) ? services[serviceType].countries : [];
    const byName = new Map();
    const byId = new Map();
    countries.forEach((country) => {
        const countryId = Number(country.countryId);
        if (Number.isFinite(countryId)) byId.set(countryId, country);
        const countryName = normalizeCountryName(country.name);
        if (countryName && Number.isFinite(countryId)) byName.set(countryName, countryId);
    });
    return { byName, byId };
}

function addTierFile(files, serviceType, filePath) {
    if (!serviceType || !fs.existsSync(filePath)) return;
    files.push({ serviceType: normalizeServiceType(serviceType), filePath });
}

function addDirectoryTierFile(files, serviceDirectory, fallbackName) {
    const tiersPath = path.join(serviceDirectory, 'tiers.csv');
    if (!fs.existsSync(tiersPath)) return;
    addTierFile(files, loadServiceType(serviceDirectory, fallbackName), tiersPath);
}

function collectServiceDirectoryTierFiles(files, directory, options = {}) {
    if (!fs.existsSync(directory)) return;
    const entries = fs.readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .filter((entry) => !options.reservedNames || !options.reservedNames.has(entry.name.toLowerCase()))
        .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
        addDirectoryTierFile(files, path.join(directory, entry.name), entry.name);
    }
}

function collectNamedTierFiles(files, directory) {
    if (!fs.existsSync(directory)) return;
    const entries = fs.readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            addDirectoryTierFile(files, entryPath, entry.name);
        } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.csv') {
            addTierFile(files, path.basename(entry.name, path.extname(entry.name)), entryPath);
        }
    }
}

function loadTiers() {
    const pricing = {};
    const providerRanks = {};
    const countryNames = {};
    const files = [];

    collectServiceDirectoryTierFiles(files, SERVICES_DIRECTORY);
    collectServiceDirectoryTierFiles(files, CONFIG_DIRECTORY, { reservedNames: RESERVED_CONFIG_DIRECTORIES });
    collectNamedTierFiles(files, __dirname);
    collectNamedTierFiles(files, ROOT_TIERS_DIRECTORY);

    for (const file of files) {
        const serviceType = normalizeServiceType(file.serviceType);
        if (!serviceType) continue;
        const countryLookup = buildCountryLookup(serviceType);

        for (const row of loadTierCsv(file.filePath)) {
            const rawCountryId = getFirstValue(row, ['countryid', 'country_id']);
            const rawCountryName = getFirstValue(row, ['country', 'countryname', 'name']);
            const rawProviderIds = getFirstValue(row, ['providerid', 'provider_id', 'agentids', 'agentid', 'agent_ids']);
            const rawPrice = getFirstValue(row, ['price', 'finalpkr', 'final_pkr', 'convertedpkr', 'converted_pkr']);
            const rank = String(getFirstValue(row, ['rank']) || 'Bronze').trim() || 'Bronze';
            const countryId = Number(rawCountryId) || countryLookup.byName.get(normalizeCountryName(rawCountryName));
            const price = Number(rawPrice);
            if (!Number.isFinite(countryId) || !Number.isFinite(price) || rawProviderIds == null) continue;

            pricing[serviceType] = pricing[serviceType] || {};
            countryNames[serviceType] = countryNames[serviceType] || {};
            pricing[serviceType][countryId] = pricing[serviceType][countryId] || {};
            if (rawCountryName && !countryNames[serviceType][countryId]) {
                countryNames[serviceType][countryId] = String(rawCountryName).trim();
            } else if (!countryNames[serviceType][countryId] && countryLookup.byId.has(countryId)) {
                countryNames[serviceType][countryId] = countryLookup.byId.get(countryId).name;
            }

            String(rawProviderIds).split(',').map((providerId) => Number(providerId.trim())).forEach((providerId) => {
                if (!Number.isFinite(providerId)) return;
                pricing[serviceType][countryId][providerId] = price;
                providerRanks[providerId] = rank;
            });
        }
    }

    return { pricing, providerRanks, countryNames };
}

module.exports = loadTiers();
