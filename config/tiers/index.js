const fs = require('fs');
const path = require('path');

const SERVICES_DIRECTORY = path.join(__dirname, '..', 'services');

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
    return String(value || '').trim().toLowerCase();
}

function normalizeServiceType(value) {
    return String(value || '').trim().toLowerCase();
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

function loadTiers() {
    const pricing = {};
    const providerRanks = {};
    const entries = fs.readdirSync(SERVICES_DIRECTORY, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
        const serviceDirectory = path.join(SERVICES_DIRECTORY, entry.name);
        const tiersPath = path.join(serviceDirectory, 'tiers.csv');
        if (!fs.existsSync(tiersPath)) continue;

        const serviceType = loadServiceType(serviceDirectory, entry.name);
        if (!serviceType) continue;
        pricing[serviceType] = pricing[serviceType] || {};

        for (const row of loadTierCsv(tiersPath)) {
            const countryId = Number(row.countryid);
            const providerId = Number(row.providerid);
            const price = Number(row.price);
            if (!Number.isFinite(countryId) || !Number.isFinite(providerId) || !Number.isFinite(price)) continue;

            pricing[serviceType][countryId] = pricing[serviceType][countryId] || {};
            pricing[serviceType][countryId][providerId] = price;
            providerRanks[providerId] = String(row.rank || 'Bronze').trim() || 'Bronze';
        }
    }

    return { pricing, providerRanks };
}

module.exports = loadTiers();
