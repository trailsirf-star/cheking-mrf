const fs = require('fs');
const path = require('path');

const SERVICES_DIRECTORY = __dirname;
const CONFIG_DIRECTORY = path.join(__dirname, '..');
const RESERVED_CONFIG_DIRECTORIES = new Set(['services', 'tiers']);

function normalizeServiceType(value) {
    return String(value || '').trim().toLowerCase();
}

function addServiceDirectory(services, serviceDirectory, fallbackName) {
    const configPath = path.join(serviceDirectory, 'config.json');
    if (!fs.existsSync(configPath)) return;

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const serviceType = normalizeServiceType(config.serviceType || fallbackName);
    if (!serviceType) return;

    services[serviceType] = {
        ...config,
        serviceType,
        countries: Array.isArray(config.countries) ? config.countries : []
    };
}

function loadServiceDirectories(services, directory, options = {}) {
    if (!fs.existsSync(directory)) return;
    const entries = fs.readdirSync(directory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .filter((entry) => !options.reservedNames || !options.reservedNames.has(entry.name.toLowerCase()))
        .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
        addServiceDirectory(services, path.join(directory, entry.name), entry.name);
    }
}

function loadServices() {
    const services = {};
    loadServiceDirectories(services, SERVICES_DIRECTORY);
    loadServiceDirectories(services, CONFIG_DIRECTORY, { reservedNames: RESERVED_CONFIG_DIRECTORIES });
    return services;
}

module.exports = loadServices();
