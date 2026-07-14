const fs = require('fs');
const path = require('path');

const SERVICES_DIRECTORY = __dirname;

function normalizeServiceType(value) {
    return String(value || '').trim().toLowerCase();
}

function loadServices() {
    const services = {};
    const entries = fs.readdirSync(SERVICES_DIRECTORY, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
        const serviceDirectory = path.join(SERVICES_DIRECTORY, entry.name);
        const configPath = path.join(serviceDirectory, 'config.json');
        if (!fs.existsSync(configPath)) continue;

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const serviceType = normalizeServiceType(config.serviceType || entry.name);
        if (!serviceType) continue;

        services[serviceType] = {
            ...config,
            serviceType,
            countries: Array.isArray(config.countries) ? config.countries : []
        };
    }

    return services;
}

module.exports = loadServices();
