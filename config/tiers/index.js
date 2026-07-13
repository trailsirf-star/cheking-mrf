const whatsapp = require('./whatsapp');
const facebook = require('./facebook');
const snapchat = require('./snapchat');

const pricing = {
    whatsapp: whatsapp.pricing,
    facebook: facebook.pricing,
    snapchat: snapchat.pricing
};

const providerRanks = {
    // ===== EXISTING RANKS =====
    // Brazil
    2404: 'Gold',
    3412: 'Gold',
    3229: 'Silver',
    // Canada
    3406: 'Gold',
    2262: 'Silver',
    2568: 'Silver',
    // Colombia
    3288: 'Gold',
    2236: 'Gold',
    3253: 'Gold',
    3243: 'Gold',
    2286: 'Gold',
    2335: 'Gold',
    // Indonesia
    3327: 'Gold',
    3061: 'Gold',
    3029: 'Gold',
    3424: 'Gold',
    3267: 'Silver',
    3334: 'Silver',
    2272: 'Silver',
    3320: 'Silver',
    3426: 'Silver',
    3406: 'Silver',
    // Philippines
    3371: 'Silver',
    // Thailand
    3237: 'Silver',
    // UK
    3368: 'Gold',
    // USA (WhatsApp)
    2268: 'Gold',
    2266: 'Gold',
    3170: 'Gold',
    3193: 'Silver',

    // ===== FACEBOOK RANKS =====
    // USA
    3370: 'Gold',
    2617: 'Silver',
    3193: 'Bronze',
    // Canada
    3406: 'Gold',
    2262: 'Silver',
    2462: 'Bronze',
    // Pakistan
    3109: 'Gold',
    3160: 'Silver',
    3001: 'Bronze',

    // ===== NEW WHATSAPP RANKS (all new countries) =====
    // Chile
    3428: 'Gold',
    3109: 'Gold',
    3193: 'Bronze',
    2217: 'Bronze',
    2750: 'Bronze',
    3160: 'Bronze',
    3001: 'Bronze',
    3235: 'Bronze',
    // Syria
    3428: 'Gold',
    3370: 'Bronze',
    3168: 'Bronze',
    3001: 'Bronze',
    // Somalia
    3428: 'Gold',
    3370: 'Bronze',
    3001: 'Bronze',
    // Kyrgyzstan
    3178: 'Gold',
    3109: 'Silver',
    2750: 'Bronze',
    3193: 'Bronze',
    3001: 'Bronze',
    // Iraq
    3428: 'Gold',
    2260: 'Bronze',
    3193: 'Bronze',
    2217: 'Bronze',
    3001: 'Bronze',
    // Mongolia
    3428: 'Gold',
    2579: 'Bronze',
    3193: 'Bronze',
    3225: 'Bronze',
    3001: 'Bronze',
    // Myanmar
    3428: 'Gold',
    3178: 'Silver',
    2579: 'Bronze',
    3193: 'Bronze',
    3001: 'Bronze',
    // Cameroon
    3428: 'Gold',
    2709: 'Silver',
    3109: 'Bronze',
    3168: 'Bronze',
    2750: 'Bronze',
    2567: 'Bronze',
    3193: 'Bronze',
    2263: 'Bronze',
    2354: 'Bronze',
    3001: 'Bronze',
    // Madagascar
    3428: 'Gold',
    3109: 'Silver',
    2579: 'Bronze',
    3168: 'Bronze',
    2217: 'Bronze',
    3001: 'Bronze',
    // Tanzania
    3428: 'Gold',
    3001: 'Silver',
    2354: 'Bronze',
    2750: 'Bronze',
    3168: 'Bronze',
    // Suriname
    3428: 'Gold',
    3370: 'Bronze',
    3001: 'Bronze',
    // Uzbekistan
    3428: 'Gold',
    3160: 'Bronze',
    3193: 'Bronze',
    3168: 'Bronze',
    3001: 'Bronze',
    // Tajikistan
    3225: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    3193: 'Bronze',
    // Zimbabwe
    3428: 'Gold',
    3160: 'Bronze',
    3001: 'Bronze',
    // Ethiopia
    3428: 'Gold',
    3168: 'Silver',
    2750: 'Bronze',
    3001: 'Bronze',
    // Tunisia
    3178: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3428: 'Bronze',
    3168: 'Bronze',
    // Mauritius
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Morocco
    3178: 'Gold',
    3001: 'Silver',
    3335: 'Bronze',
    3371: 'Bronze',
    3309: 'Bronze',
    3225: 'Bronze',
    2260: 'Bronze',
    3428: 'Bronze',
    2217: 'Bronze',
    2567: 'Bronze',
    3193: 'Bronze',
    // Yemen
    2377: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    3428: 'Bronze',
    3193: 'Bronze',
    // Cambodia
    3428: 'Gold',
    2260: 'Bronze',
    3193: 'Bronze',
    3001: 'Bronze',
    // Peru
    3428: 'Gold',
    3001: 'Silver',
    2354: 'Bronze',
    2260: 'Bronze',
    3193: 'Bronze',
    3109: 'Bronze',
    // Hong Kong
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    2579: 'Bronze',
    3328: 'Bronze',
    2217: 'Bronze',
    3193: 'Bronze',
    2318: 'Bronze',
    // Argentina
    3428: 'Gold',
    3056: 'Silver',
    3237: 'Bronze',
    3001: 'Bronze',
    2579: 'Bronze',
    2750: 'Bronze',
    2567: 'Bronze',
    2263: 'Bronze',
    3109: 'Bronze',
    2738: 'Bronze',
    2286: 'Bronze',
    3193: 'Bronze',
    3160: 'Bronze',
    3335: 'Bronze',
    // New Zealand
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3160: 'Bronze',
    3237: 'Bronze',
    // Sierra Leone
    3428: 'Gold',
    2750: 'Bronze',
    3001: 'Bronze',
    // Bangladesh
    3428: 'Gold',
    3160: 'Bronze',
    3001: 'Bronze',
    // Bolivia
    3428: 'Gold',
    2750: 'Bronze',
    3001: 'Bronze',
    // Senegal
    3428: 'Gold',
    2750: 'Bronze',
    3001: 'Bronze',
    // Egypt
    3428: 'Gold',
    3160: 'Silver',
    3001: 'Bronze',
    2260: 'Bronze',
    3193: 'Bronze',
    2750: 'Bronze',
    // Moldova
    3428: 'Gold',
    3239: 'Silver',
    3370: 'Bronze',
    2260: 'Bronze',
    2738: 'Bronze',
    3237: 'Bronze',
    // Ireland
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    3329: 'Bronze',
    3225: 'Bronze',
    3160: 'Bronze',
    // Kenya
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    3193: 'Bronze',
    3160: 'Bronze',
    // Ukraine
    3428: 'Gold',
    2260: 'Bronze',
    3177: 'Bronze',
    3309: 'Bronze',
    3418: 'Bronze',
    3340: 'Bronze',
    3335: 'Bronze',
    3168: 'Bronze',
    // Greece
    3428: 'Gold',
    3001: 'Silver',
    3237: 'Bronze',
    2260: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    2739: 'Bronze',
    3248: 'Bronze',
    3193: 'Bronze',
    3309: 'Bronze',
    3418: 'Bronze',
    3109: 'Bronze',
    // Latvia
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    2476: 'Bronze',
    3237: 'Bronze',
    3340: 'Bronze',
    3335: 'Bronze',
    3193: 'Bronze',
    // Seychelles
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // France
    3428: 'Gold',
    3193: 'Silver',
    2579: 'Bronze',
    2750: 'Bronze',
    2442: 'Bronze',
    3329: 'Bronze',
    3237: 'Bronze',
    2738: 'Bronze',
    3418: 'Bronze',
    3160: 'Bronze',
    3335: 'Bronze',
    3109: 'Bronze',
    // Uganda
    3428: 'Gold',
    2750: 'Bronze',
    3001: 'Bronze',
    // Kazakhstan
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    2579: 'Bronze',
    2750: 'Bronze',
    3237: 'Bronze',
    3335: 'Bronze',
    // Belgium
    3309: 'Gold',   // cheapest provider is 3001 but rank not given; I'll assign Gold to 3309 based on original rank? Actually original rank not given for Belgium; I'll set 3001 as Silver, 3309 as Bronze, etc.
    3428: 'Gold',
    3001: 'Silver',
    3370: 'Bronze',
    2750: 'Bronze',
    3225: 'Bronze',
    3160: 'Bronze',
    // Zambia
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3178: 'Bronze',
    // Ghana
    3428: 'Gold',
    3001: 'Silver',
    2354: 'Bronze',
    2750: 'Bronze',
    2217: 'Bronze',
    // Nigeria
    3428: 'Gold',
    3178: 'Silver',
    3168: 'Bronze',
    3001: 'Bronze',
    2579: 'Bronze',
    3330: 'Bronze',
    3335: 'Bronze',
    3193: 'Bronze',
    2217: 'Bronze',
    // Lesotho
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Guadeloupe
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Malawi
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Lebanon
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3168: 'Bronze',
    // Chad
    3428: 'Gold',
    2260: 'Bronze',
    3001: 'Bronze',
    // Congo DR
    3428: 'Gold',
    3001: 'Silver',
    2354: 'Bronze',
    2260: 'Bronze',
    // Bahamas
    3428: 'Gold',
    3370: 'Bronze',
    3001: 'Bronze',
    // Maldives
    3428: 'Gold',
    3160: 'Bronze',
    3001: 'Bronze',
    // Paraguay
    2750: 'Bronze',
    3001: 'Bronze',
    // Rwanda
    3428: 'Gold',
    3370: 'Bronze',
    3001: 'Bronze',
    // Benin
    3428: 'Gold',
    3168: 'Silver',
    2750: 'Bronze',
    3001: 'Bronze',
    // Reunion
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Equatorial Guinea
    3428: 'Gold',
    3370: 'Bronze',
    3001: 'Bronze',
    // Luxembourg
    2750: 'Bronze',
    3001: 'Bronze',
    // Djibouti
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // French Guiana
    2579: 'Bronze',
    3001: 'Bronze',
    // Saint Lucia
    2579: 'Bronze',
    3001: 'Bronze',
    // Brunei
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Aruba
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Sao Tome
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // New Caledonia
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Macau
    2217: 'Bronze',
    3001: 'Bronze',
    // Switzerland
    2750: 'Bronze',
    3225: 'Bronze',
    3193: 'Bronze',
    3001: 'Bronze',
    // Romania
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    3328: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    3109: 'Bronze',
    2739: 'Bronze',
    3335: 'Bronze',
    3193: 'Bronze',
    3312: 'Bronze',
    3237: 'Bronze',
    // Portugal
    3428: 'Gold',
    3193: 'Silver',
    2579: 'Bronze',
    2263: 'Bronze',
    2567: 'Bronze',
    3087: 'Bronze',
    2442: 'Bronze',
    2739: 'Bronze',
    3160: 'Bronze',
    3314: 'Bronze',
    3329: 'Bronze',
    3309: 'Bronze',
    3371: 'Bronze',
    3094: 'Bronze',
    3340: 'Bronze',
    // Mexico
    2354: 'Gold',
    3370: 'Bronze',
    3330: 'Bronze',
    2579: 'Bronze',
    2750: 'Bronze',
    3109: 'Bronze',
    3160: 'Bronze',
    3193: 'Bronze',
    // Poland
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    2295: 'Bronze',
    2739: 'Bronze',
    1015: 'Bronze',
    3418: 'Bronze',
    2217: 'Bronze',
    2284: 'Bronze',
    3094: 'Bronze',
    3309: 'Bronze',
    3109: 'Bronze',
    3328: 'Bronze',
    3193: 'Bronze',
    3237: 'Bronze',
    // Czech Republic
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    2567: 'Bronze',
    2750: 'Bronze',
    2738: 'Bronze',
    3418: 'Bronze',
    2263: 'Bronze',
    3335: 'Bronze',
    2295: 'Bronze',
    3087: 'Bronze',
    3309: 'Bronze',
    2739: 'Bronze',
    2291: 'Bronze',
    3193: 'Bronze',
    // Denmark
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    2260: 'Bronze',
    2263: 'Bronze',
    3237: 'Bronze',
    3193: 'Bronze',
    // Venezuela
    3428: 'Gold',
    3160: 'Silver',
    3001: 'Bronze',
    2579: 'Bronze',
    3193: 'Bronze',
    2750: 'Bronze',
    // Estonia
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    2738: 'Bronze',
    3309: 'Bronze',
    3193: 'Bronze',
    // Georgia
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3309: 'Bronze',
    3335: 'Bronze',
    3193: 'Bronze',
    // Laos
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    2217: 'Bronze',
    3193: 'Bronze',
    // Hungary
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3309: 'Bronze',
    3237: 'Bronze',
    3193: 'Bronze',
    // Bulgaria
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    2263: 'Bronze',
    2750: 'Bronze',
    3335: 'Bronze',
    3193: 'Bronze',
    3237: 'Bronze',
    // Azerbaijan
    3428: 'Gold',
    3330: 'Bronze',
    3193: 'Bronze',
    // Taiwan
    3428: 'Gold',
    3001: 'Silver',
    3330: 'Bronze',
    3193: 'Bronze',
    // Honduras
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    3193: 'Bronze',
    2750: 'Bronze',
    // Croatia
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    2750: 'Bronze',
    3335: 'Bronze',
    2738: 'Bronze',
    3193: 'Bronze',
    // Liberia
    3160: 'Gold',
    3109: 'Silver',
    3428: 'Bronze',
    2579: 'Bronze',
    3193: 'Bronze',
    2750: 'Bronze',
    3001: 'Bronze',
    // Lithuania
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3309: 'Bronze',
    3193: 'Bronze',
    // Monaco
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3193: 'Bronze',
    // Mali
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    2217: 'Bronze',
    3193: 'Bronze',
    // Finland
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3193: 'Bronze',
    // Comoros
    3428: 'Gold',
    3370: 'Bronze',
    3001: 'Bronze',
    // Timor-Leste
    3428: 'Gold',
    3160: 'Silver',
    3370: 'Bronze',
    3001: 'Bronze',
    // Eritrea
    3428: 'Gold',
    2579: 'Bronze',
    3001: 'Bronze',
    // Slovakia
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    3370: 'Bronze',
    2750: 'Bronze',
    3193: 'Bronze',
    // Germany
    3428: 'Gold',
    3225: 'Silver',
    2579: 'Bronze',
    2750: 'Bronze',
    3193: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    3329: 'Bronze',
    3394: 'Bronze',
    3418: 'Bronze',
    3087: 'Bronze',
    // Italy
    3428: 'Gold',
    2354: 'Silver',
    2579: 'Bronze',
    2750: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    2739: 'Bronze',
    3304: 'Bronze',
    3418: 'Bronze',
    3335: 'Bronze',
    3406: 'Bronze',
    3160: 'Bronze',
    3193: 'Bronze',
    // Puerto Rico
    3428: 'Gold',
    3001: 'Silver',
    2579: 'Bronze',
    3370: 'Bronze',
    // Iran
    3428: 'Gold',
    3001: 'Silver',
    3193: 'Bronze',
    // Sweden
    3428: 'Gold',
    2750: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    2739: 'Bronze',
    3087: 'Bronze',
    3094: 'Bronze',
    3296: 'Bronze',
    3237: 'Bronze',
    // Ivory Coast
    3428: 'Gold',
    3168: 'Silver',
    3001: 'Bronze',
    2260: 'Bronze',
    3193: 'Bronze',
    3237: 'Bronze',
    2750: 'Bronze',
    32: 'Bronze',
    // Uruguay
    3428: 'Gold',
    2260: 'Bronze',
    3001: 'Bronze',
    // Australia
    3428: 'Gold',
    3109: 'Silver',
    2260: 'Bronze',
    3237: 'Bronze',
    2293: 'Bronze',
    2567: 'Bronze',
    3193: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    2442: 'Bronze',
    // Spain
    3428: 'Gold',
    3335: 'Silver',
    2260: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    2739: 'Bronze',
    3329: 'Bronze',
    3109: 'Bronze',
    3160: 'Bronze',
    // Turkey
    3428: 'Gold',
    3001: 'Silver',
    3370: 'Bronze',
    3329: 'Bronze',
    3094: 'Bronze',
    3335: 'Bronze',
    2750: 'Bronze',
    3193: 'Bronze',
    // Cyprus
    3428: 'Gold',
    3001: 'Silver',
    2750: 'Bronze',
    3193: 'Bronze',
    // Austria
    3428: 'Gold',
    3160: 'Silver',
    3001: 'Bronze',
    2260: 'Bronze',
    2567: 'Bronze',
    2738: 'Bronze',
    2263: 'Bronze',
    3109: 'Bronze',
    3335: 'Bronze',
    3329: 'Bronze',
    3193: 'Bronze',
    // Japan
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze',
    2567: 'Bronze',
    3109: 'Bronze',
    2217: 'Bronze',
    3160: 'Bronze',
    // Gibraltar
    3428: 'Gold',
    2750: 'Bronze',
    // Singapore
    3428: 'Gold',
    3001: 'Silver',
    2260: 'Bronze'
    // snap chat
    // ======================== SNAPCHAT COUNTRIES ========================
const countries = [
    // ======================== EXISTING COUNTRIES (UNCHANGED FROM FACEBOOK) ========================
    { name: 'Canada', code: '+1', price: 40, countryId: 36, flag: '\u{1F1E8}\u{1F1E6}' },
    { name: 'United Kingdom', code: '+44', price: 40, countryId: 16, flag: '\u{1F1EC}\u{1F1E7}' },
    { name: 'USA', code: '+1', price: 75, countryId: 187, flag: '\u{1F1FA}\u{1F1F8}' },
    { name: 'Pakistan', code: '+92', price: 24, countryId: 66, flag: '\u{1F1F5}\u{1F1F0}' },
    { name: 'Philippines', code: '+63', price: 29, countryId: 4, flag: '\u{1F1F5}\u{1F1ED}' },
    { name: 'Ethiopia', code: '+251', price: 31, countryId: 71, flag: '\u{1F1EA}\u{1F1F9}' },
    { name: 'USA Virtual', code: '+1', price: 70, countryId: 12, flag: '\u{1F1FA}\u{1F1F8}' },
    { name: 'Afghanistan', code: '+93', price: 31, countryId: 74, flag: '\u{1F1E6}\u{1F1EB}' },
    { name: 'Peru', code: '+51', price: 33, countryId: 65, flag: '\u{1F1F5}\u{1F1EA}' },
    { name: 'Egypt', code: '+20', price: 30, countryId: 21, flag: '\u{1F1EA}\u{1F1EC}' },
    { name: 'Georgia', code: '+995', price: 34, countryId: 128, flag: '\u{1F1EC}\u{1F1EA}' },
    { name: 'Finland', code: '+358', price: 29, countryId: 163, flag: '\u{1F1EB}\u{1F1EE}' },
    { name: 'Papua New Guinea', code: '+675', price: 70, countryId: 79, flag: '\u{1F1F5}\u{1F1EC}' },
    { name: "Ivory Coast", code: '+225', price: 32, countryId: 27, flag: '\u{1F1E8}\u{1F1EE}' },
    { name: 'Chad', code: '+235', price: 31, countryId: 42, flag: '\u{1F1F9}\u{1F1E9}' },
    { name: 'Nepal', code: '+977', price: 33, countryId: 81, flag: '\u{1F1F3}\u{1F1F5}' },
    { name: 'Moldova', code: '+373', price: 30, countryId: 85, flag: '\u{1F1F2}\u{1F1E9}' },
    { name: 'Croatia', code: '+385', price: 34, countryId: 45, flag: '\u{1F1ED}\u{1F1F7}' },
    { name: 'Nicaragua', code: '+505', price: 29, countryId: 90, flag: '\u{1F1F3}\u{1F1EE}' },
    { name: 'Cuba', code: '+53', price: 120, countryId: 113, flag: '\u{1F1E8}\u{1F1FA}' },
    { name: 'Mongolia', code: '+976', price: 32, countryId: 72, flag: '\u{1F1F2}\u{1F1F3}' },
    { name: 'Slovenia', code: '+386', price: 31, countryId: 59, flag: '\u{1F1F8}\u{1F1EE}' },
    { name: 'Benin', code: '+229', price: 33, countryId: 120, flag: '\u{1F1E7}\u{1F1EF}' },
    { name: 'Belarus', code: '+375', price: 100, countryId: 51, flag: '\u{1F1E7}\u{1F1FE}' },
    { name: 'Botswana', code: '+267', price: 100, countryId: 123, flag: '\u{1F1E7}\u{1F1FC}' },
    { name: 'DR Congo', code: '+243', price: 30, countryId: 18, flag: '\u{1F1E8}\u{1F1E9}' },
    { name: 'Madagascar', code: '+261', price: 34, countryId: 17, flag: '\u{1F1F2}\u{1F1EC}' },
    { name: 'Colombia', code: '+57', price: 19, countryId: 33, flag: '\u{1F1E8}\u{1F1F4}' },
    { name: 'Algeria', code: '+213', price: 29, countryId: 58, flag: '\u{1F1E9}\u{1F1FF}' },
    { name: 'Austria', code: '+43', price: 32, countryId: 50, flag: '\u{1F1E6}\u{1F1F9}' },
    { name: 'Panama', code: '+507', price: 31, countryId: 112, flag: '\u{1F1F5}\u{1F1E6}' },
    { name: 'Norway', code: '+47', price: 33, countryId: 174, flag: '\u{1F1F3}\u{1F1F4}' },
    { name: 'Ireland', code: '+353', price: 30, countryId: 23, flag: '\u{1F1EE}\u{1F1EA}' },
    { name: 'Mauritius', code: '+230', price: 34, countryId: 157, flag: '\u{1F1F2}\u{1F1FA}' },
    { name: 'Switzerland', code: '+41', price: 29, countryId: 173, flag: '\u{1F1E8}\u{1F1ED}' },
    { name: 'Costa Rica', code: '+506', price: 60, countryId: 93, flag: '\u{1F1E8}\u{1F1F7}' },
    { name: 'Bahrain', code: '+973', price: 90, countryId: 145, flag: '\u{1F1E7}\u{1F1ED}' },
    { name: 'Gambia', code: '+220', price: 32, countryId: 28, flag: '\u{1F1EC}\u{1F1F2}' },
    { name: 'Liberia', code: '+231', price: 31, countryId: 135, flag: '\u{1F1F1}\u{1F1F7}' },
    { name: 'Angola', code: '+244', price: 33, countryId: 76, flag: '\u{1F1E6}\u{1F1F4}' },
    { name: 'Armenia', code: '+374', price: 30, countryId: 148, flag: '\u{1F1E6}\u{1F1F2}' },
    { name: 'Gabon', code: '+241', price: 34, countryId: 154, flag: '\u{1F1EC}\u{1F1E6}' },
    { name: 'Hungary', code: '+36', price: 29, countryId: 84, flag: '\u{1F1ED}\u{1F1FA}' },
    { name: 'Guinea', code: '+224', price: 32, countryId: 68, flag: '\u{1F1EC}\u{1F1F3}' },
    { name: 'Serbia', code: '+381', price: 31, countryId: 29, flag: '\u{1F1F7}\u{1F1F8}' },
    { name: 'Burundi', code: '+257', price: 33, countryId: 119, flag: '\u{1F1E7}\u{1F1EE}' },
    { name: 'South Sudan', code: '+211', price: 30, countryId: 177, flag: '\u{1F1F8}\u{1F1F8}' },
    { name: 'Maldives', code: '+960', price: 200, countryId: 159, flag: '\u{1F1F2}\u{1F1FB}' },
    { name: 'Albania', code: '+355', price: 80, countryId: 155, flag: '\u{1F1E6}\u{1F1F1}' },
    { name: 'Guinea-Bissau', code: '+245', price: 80, countryId: 130, flag: '\u{1F1EC}\u{1F1FC}' },
    { name: 'Sierra Leone', code: '+232', price: 34, countryId: 115, flag: '\u{1F1F8}\u{1F1F1}' },
    { name: 'Azerbaijan', code: '+994', price: 29, countryId: 35, flag: '\u{1F1E6}\u{1F1FF}' },
    { name: 'Slovakia', code: '+421', price: 32, countryId: 141, flag: '\u{1F1F8}\u{1F1F0}' },
    { name: 'North Macedonia', code: '+389', price: 31, countryId: 183, flag: '\u{1F1F2}\u{1F1F0}' },
    { name: 'Togo', code: '+228', price: 33, countryId: 99, flag: '\u{1F1F9}\u{1F1EC}' },
    { name: 'Lebanon', code: '+961', price: 170, countryId: 153, flag: '\u{1F1F1}\u{1F1E7}' },
    { name: 'Hong Kong', code: '+852', price: 30, countryId: 14, flag: '\u{1F1ED}\u{1F1F0}' },
    { name: 'Denmark', code: '+45', price: 33, countryId: 172, flag: '\u{1F1E9}\u{1F1F0}' },
    { name: 'Tunisia', code: '+216', price: 80, countryId: 89, flag: '\u{1F1F9}\u{1F1F3}' },
    { name: 'Kazakhstan', code: '+7', price: 30, countryId: 2, flag: '\u{1F1F0}\u{1F1FF}' },
    { name: 'Latvia', code: '+371', price: 34, countryId: 49, flag: '\u{1F1F1}\u{1F1FB}' },
    { name: 'Uganda', code: '+256', price: 29, countryId: 75, flag: '\u{1F1FA}\u{1F1EC}' },
    { name: 'Greece', code: '+30', price: 32, countryId: 129, flag: '\u{1F1EC}\u{1F1F7}' },
    { name: 'Estonia', code: '+372', price: 31, countryId: 34, flag: '\u{1F1EA}\u{1F1EA}' },
    { name: 'Fiji', code: '+679', price: 70, countryId: 189, flag: '\u{1F1EB}\u{1F1EF}' },
    { name: 'Taiwan', code: '+886', price: 33, countryId: 55, flag: '\u{1F1F9}\u{1F1FC}' },
    { name: 'Kyrgyzstan', code: '+996', price: 30, countryId: 11, flag: '\u{1F1F0}\u{1F1EC}' },
    { name: 'Bolivia', code: '+591', price: 34, countryId: 92, flag: '\u{1F1E7}\u{1F1F4}' },
    { name: 'Haiti', code: '+509', price: 29, countryId: 26, flag: '\u{1F1ED}\u{1F1F9}' },
    { name: 'Myanmar', code: '+95', price: 32, countryId: 5, flag: '\u{1F1F2}\u{1F1F2}' },
    { name: 'Dominican Republic', code: '+1', price: 70, countryId: 109, flag: '\u{1F1E9}\u{1F1F4}' },
    { name: 'Belgium', code: '+32', price: 31, countryId: 82, flag: '\u{1F1E7}\u{1F1EA}' },
    { name: 'Eswatini', code: '+268', price: 33, countryId: 106, flag: '\u{1F1F8}\u{1F1FF}' },
    { name: 'Kuwait', code: '+965', price: 90, countryId: 100, flag: '\u{1F1F0}\u{1F1FC}' },
    { name: 'Laos', code: '+856', price: 30, countryId: 25, flag: '\u{1F1F1}\u{1F1E6}' },
    { name: 'Niger', code: '+227', price: 100, countryId: 139, flag: '\u{1F1F3}\u{1F1EA}' },
    { name: 'Tajikistan', code: '+992', price: 34, countryId: 143, flag: '\u{1F1F9}\u{1F1EF}' },
    { name: 'Qatar', code: '+974', price: 90, countryId: 111, flag: '\u{1F1F6}\u{1F1E6}' },
    { name: 'El Salvador', code: '+503', price: 80, countryId: 101, flag: '\u{1F1F8}\u{1F1FB}' },
    { name: 'New Zealand', code: '+64', price: 80, countryId: 67, flag: '\u{1F1F3}\u{1F1FF}' },
    { name: 'Libya', code: '+218', price: 90, countryId: 102, flag: '\u{1F1F1}\u{1F1FE}' },
    { name: 'Honduras', code: '+504', price: 29, countryId: 88, flag: '\u{1F1ED}\u{1F1F3}' },
    { name: 'United Arab Emirates', code: '+971', price: 60, countryId: 95, flag: '\u{1F1E6}\u{1F1EA}' },
    { name: 'Namibia', code: '+264', price: 60, countryId: 138, flag: '\u{1F1F3}\u{1F1E6}' },
    { name: 'Equatorial Guinea', code: '+240', price: 80, countryId: 167, flag: '\u{1F1EC}\u{1F1F6}' },
    { name: 'Somalia', code: '+252', price: 70, countryId: 149, flag: '\u{1F1F8}\u{1F1F4}' },
    { name: 'Jordan', code: '+962', price: 32, countryId: 116, flag: '\u{1F1EF}\u{1F1F4}' },
    { name: 'Central African Republic', code: '+236', price: 32, countryId: 125, flag: '\u{1F1E8}\u{1F1EB}' },
    { name: 'Zimbabwe', code: '+263', price: 80, countryId: 96, flag: '\u{1F1FF}\u{1F1FC}' },
    { name: 'Turkmenistan', code: '+993', price: 31, countryId: 161, flag: '\u{1F1F9}\u{1F1F2}' },
    { name: 'Rwanda', code: '+250', price: 80, countryId: 140, flag: '\u{1F1F7}\u{1F1FC}' },
    { name: 'Sudan', code: '+249', price: 90, countryId: 1010, flag: '\u{1F1F8}\u{1F1E9}' },
    { name: 'Reunion', code: '+262', price: 60, countryId: 146, flag: '\u{1F1F7}\u{1F1EA}' },
    { name: 'Oman', code: '+968', price: 80, countryId: 107, flag: '\u{1F1F4}\u{1F1F2}' },
    { name: 'Bhutan', code: '+975', price: 33, countryId: 158, flag: '\u{1F1E7}\u{1F1F9}' },
    { name: 'China', code: '+86', price: 30, countryId: 3, flag: '\u{1F1E8}\u{1F1F3}' },
    { name: 'Barbados', code: '+1', price: 34, countryId: 118, flag: '\u{1F1E7}\u{1F1E7}' },
    { name: 'Martinique', code: '+596', price: 29, countryId: 1011, flag: '\u{1F1F2}\u{1F1F6}' },
    { name: 'Puerto Rico', code: '+1', price: 60, countryId: 97, flag: '\u{1F1F5}\u{1F1F7}' },
    { name: 'Guadeloupe', code: '+590', price: 32, countryId: 160, flag: '\u{1F1EC}\u{1F1F5}' },
    { name: 'Luxembourg', code: '+352', price: 31, countryId: 165, flag: '\u{1F1F1}\u{1F1FA}' },
    { name: 'Antigua and Barbuda', code: '+1', price: 33, countryId: 169, flag: '\u{1F1E6}\u{1F1EC}' },
    { name: 'Djibouti', code: '+253', price: 30, countryId: 168, flag: '\u{1F1E9}\u{1F1EF}' },
    { name: 'French Guiana', code: '+594', price: 34, countryId: 162, flag: '\u{1F1EC}\u{1F1EB}' },
    { name: 'Saint Lucia', code: '+1', price: 29, countryId: 164, flag: '\u{1F1F1}\u{1F1E8}' },
    { name: 'Montenegro', code: '+382', price: 80, countryId: 171, flag: '\u{1F1F2}\u{1F1EA}' },
    { name: 'Bahamas', code: '+1', price: 70, countryId: 122, flag: '\u{1F1E7}\u{1F1F8}' },
    { name: 'Grenada', code: '+1', price: 90, countryId: 127, flag: '\u{1F1EC}\u{1F1E9}' },
    { name: 'Brunei', code: '+673', price: 170, countryId: 121, flag: '\u{1F1E7}\u{1F1F3}' },
    { name: 'Cayman Islands', code: '+1', price: 32, countryId: 170, flag: '\u{1F1F0}\u{1F1FE}' },
    { name: 'Saint Vincent', code: '+1', price: 31, countryId: 166, flag: '\u{1F1FB}\u{1F1E8}' },
    { name: 'Saint Kitts and Nevis', code: '+1', price: 33, countryId: 134, flag: '\u{1F1F0}\u{1F1F3}' },
    { name: 'Aruba', code: '+297', price: 30, countryId: 179, flag: '\u{1F1E6}\u{1F1FC}' },
    { name: 'Comoros', code: '+269', price: 80, countryId: 133, flag: '\u{1F1F0}\u{1F1F2}' },
    { name: 'Malta', code: '+356', price: 34, countryId: 199, flag: '\u{1F1F2}\u{1F1F9}' },
    { name: 'Singapore', code: '+65', price: 29, countryId: 196, flag: '\u{1F1F8}\u{1F1EC}' },
    { name: 'Anguilla', code: '+1', price: 80, countryId: 181, flag: '\u{1F1E6}\u{1F1EE}' },
    { name: 'Sao Tome and Principe', code: '+239', price: 32, countryId: 178, flag: '\u{1F1F8}\u{1F1F9}' },
    { name: 'Palestine', code: '+970', price: 31, countryId: 188, flag: '\u{1F1F5}\u{1F1F8}' },
    { name: 'Monaco', code: '+377', price: 33, countryId: 144, flag: '\u{1F1F2}\u{1F1E8}' },
    { name: 'Belize', code: '+501', price: 70, countryId: 124, flag: '\u{1F1E7}\u{1F1FF}' },
    { name: 'New Caledonia', code: '+687', price: 30, countryId: 185, flag: '\u{1F1F3}\u{1F1E8}' },
    { name: 'Seychelles', code: '+248', price: 34, countryId: 184, flag: '\u{1F1F8}\u{1F1E8}' },
    { name: 'Montserrat', code: '+1', price: 29, countryId: 180, flag: '\u{1F1F2}\u{1F1F8}' },
    { name: 'Dominica', code: '+1', price: 32, countryId: 126, flag: '\u{1F1E9}\u{1F1F2}' },
    { name: 'South Korea', code: '+82', price: 31, countryId: 1002, flag: '\u{1F1F0}\u{1F1F7}' },
    { name: 'Macau', code: '+853', price: 120, countryId: 20, flag: '\u{1F1F2}\u{1F1F4}' },
    { name: 'Iceland', code: '+354', price: 100, countryId: 132, flag: '\u{1F1EE}\u{1F1F8}' },
    { name: 'Eritrea', code: '+291', price: 33, countryId: 176, flag: '\u{1F1EA}\u{1F1F7}' },
    { name: 'Kosovo', code: '+383', price: 30, countryId: 1004, flag: '\u{1F1FD}\u{1F1F0}' },
    { name: 'Uzbekistan', code: '+998', price: 34, countryId: 40, flag: '\u{1F1FA}\u{1F1FF}' },

    // ======================== SNAPCHAT SPECIFIC COUNTRIES ========================
    { name: 'South Africa', code: '+27', price: 30, countryId: 31, flag: '\u{1F1FF}\u{1F1E6}' },
    { name: 'India', code: '+91', price: 25, countryId: 22, flag: '\u{1F1EE}\u{1F1F3}' },
    { name: 'Bangladesh', code: '+880', price: 28, countryId: 60, flag: '\u{1F1E7}\u{1F1E9}' },
    { name: 'Zambia', code: '+260', price: 32, countryId: 147, flag: '\u{1F1FF}\u{1F1F2}' },
    { name: 'Mozambique', code: '+258', price: 33, countryId: 80, flag: '\u{1F1F2}\u{1F1FF}' },
    { name: 'Ukraine', code: '+380', price: 30, countryId: 1, flag: '\u{1F1FA}\u{1F1E6}' },
    { name: 'Brazil', code: '+55', price: 29, countryId: 73, flag: '\u{1F1E7}\u{1F1F7}' },
    { name: 'Iran', code: '+98', price: 31, countryId: 57, flag: '\u{1F1EE}\u{1F1F7}' },
    { name: 'Vietnam', code: '+84', price: 27, countryId: 10, flag: '\u{1F1FB}\u{1F1F3}' },
    { name: 'Nigeria', code: '+234', price: 30, countryId: 19, flag: '\u{1F1F3}\u{1F1EC}' },
    { name: 'France', code: '+33', price: 32, countryId: 78, flag: '\u{1F1EB}\u{1F1F7}' },
    { name: 'Mexico', code: '+52', price: 28, countryId: 54, flag: '\u{1F1F2}\u{1F1FD}' },
    { name: 'Tanzania', code: '+255', price: 31, countryId: 9, flag: '\u{1F1F9}\u{1F1FF}' },
    { name: 'Sri Lanka', code: '+94', price: 29, countryId: 64, flag: '\u{1F1F1}\u{1F1F0}' },
    { name: 'Argentina', code: '+54', price: 33, countryId: 39, flag: '\u{1F1E6}\u{1F1F7}' },
    { name: 'Timor-Leste', code: '+670', price: 32, countryId: 91, flag: '\u{1F1F9}\u{1F1F1}' },
    { name: 'Lesotho', code: '+266', price: 34, countryId: 136, flag: '\u{1F1F1}\u{1F1F8}' },
    { name: 'Ecuador', code: '+593', price: 30, countryId: 105, flag: '\u{1F1EA}\u{1F1E8}' },
    { name: 'Morocco', code: '+212', price: 28, countryId: 37, flag: '\u{1F1F2}\u{1F1E6}' },
    { name: 'Malawi', code: '+265', price: 32, countryId: 137, flag: '\u{1F1F2}\u{1F1FC}' },
    { name: 'Ghana', code: '+233', price: 30, countryId: 38, flag: '\u{1F1EC}\u{1F1ED}' },
    { name: 'Kenya', code: '+254', price: 29, countryId: 8, flag: '\u{1F1F0}\u{1F1EA}' },
    { name: 'Venezuela', code: '+58', price: 33, countryId: 70, flag: '\u{1F1FB}\u{1F1EA}' },
    { name: 'Turkey', code: '+90', price: 31, countryId: 62, flag: '\u{1F1F9}\u{1F1F7}' },
    { name: 'Cameroon', code: '+237', price: 30, countryId: 41, flag: '\u{1F1E8}\u{1F1F2}' },
    { name: 'Israel', code: '+972', price: 32, countryId: 46, flag: '\u{1F1EE}\u{1F1F1}' },
    { name: 'Bulgaria', code: '+359', price: 29, countryId: 83, flag: '\u{1F1E7}\u{1F1EC}' },
    { name: 'Mali', code: '+223', price: 33, countryId: 69, flag: '\u{1F1F2}\u{1F1F1}' },
    { name: 'Spain', code: '+34', price: 31, countryId: 56, flag: '\u{1F1EA}\u{1F1F8}' },
    { name: 'Saudi Arabia', code: '+966', price: 30, countryId: 53, flag: '\u{1F1F8}\u{1F1E6}' },
    { name: 'Thailand', code: '+66', price: 28, countryId: 52, flag: '\u{1F1F9}\u{1F1ED}' },
    { name: 'Burkina Faso', code: '+226', price: 32, countryId: 95, flag: '\u{1F1E7}\u{1F1EB}' },
    { name: 'Congo', code: '+242', price: 30, countryId: 77, flag: '\u{1F1E8}\u{1F1EC}' },
    { name: 'Yemen', code: '+967', price: 31, countryId: 30, flag: '\u{1F1FE}\u{1F1EA}' },
    { name: 'Uruguay', code: '+598', price: 33, countryId: 156, flag: '\u{1F1FA}\u{1F1FE}' },
    { name: 'Iraq', code: '+964', price: 30, countryId: 47, flag: '\u{1F1EE}\u{1F1F6}' },
    { name: 'Senegal', code: '+221', price: 29, countryId: 61, flag: '\u{1F1F8}\u{1F1F3}' },
    { name: 'Germany', code: '+49', price: 32, countryId: 43, flag: '\u{1F1E9}\u{1F1EA}' },
    { name: 'Poland', code: '+48', price: 31, countryId: 15, flag: '\u{1F1F5}\u{1F1F1}' },
    { name: 'Syria', code: '+963', price: 33, countryId: 1333, flag: '\u{1F1F8}\u{1F1FE}' },
    { name: 'Malaysia', code: '+60', price: 29, countryId: 1005, flag: '\u{1F1F2}\u{1F1FE}' },
    { name: 'Portugal', code: '+351', price: 30, countryId: 117, flag: '\u{1F1F5}\u{1F1F9}' },
    { name: 'Bosnia and Herzegovina', code: '+387', price: 32, countryId: 108, flag: '\u{1F1E7}\u{1F1E6}' },
    { name: 'Suriname', code: '+597', price: 31, countryId: 142, flag: '\u{1F1F8}\u{1F1F7}' },
    { name: 'Guatemala', code: '+502', price: 30, countryId: 94, flag: '\u{1F1EC}\u{1F1F9}' },
    { name: 'Indonesia', code: '+62', price: 28, countryId: 6, flag: '\u{1F1EE}\u{1F1E9}' },
    { name: 'Sweden', code: '+46', price: 32, countryId: 1007, flag: '\u{1F1F8}\u{1F1EA}' },
    { name: 'Chile', code: '+56', price: 31, countryId: 151, flag: '\u{1F1E8}\u{1F1F1}' },
    { name: 'Lithuania', code: '+370', price: 30, countryId: 1016, flag: '\u{1F1F1}\u{1F1F9}' },
    { name: 'Japan', code: '+81', price: 33, countryId: 1001, flag: '\u{1F1EF}\u{1F1F5}' },
    { name: 'Cape Verde', code: '+238', price: 32, countryId: 186, flag: '\u{1F1E8}\u{1F1FB}' },
    { name: 'Australia', code: '+61', price: 35, countryId: 175, flag: '\u{1F1E6}\u{1F1FA}' },
    { name: 'Gibraltar', code: '+350', price: 34, countryId: 201, flag: '\u{1F1EC}\u{1F1EE}' }
];

// ======================== SNAPCHAT PRICING (all prices in PKR) ========================
const pricing = {
    // ======================== CANADA (36) ========================
    36: {
        2262: 3640.00,
        2750: 3640.00,
        2579: 3640.00,
        3330: 3640.00,
        3406: 3640.00,
        3370: 3640.00,
        3329: 3640.00,
        2430: 3640.00,
        2440: 3640.00,
        2441: 3640.00,
        2767: 3640.00,
        2748: 3640.00,
        2677: 3640.00,
        2784: 3640.00,
        2524: 3640.00,
        2675: 3640.00,
        3160: 3640.00,
        3140: 3640.00,
        2620: 3640.00,
        2568: 3640.00,
        3001: 3640.00,
        3228: 3640.00,
        3198: 3640.00,
        2567: 3640.00,
        2920: 3640.00,
        3428: 3640.00
    },
    // ======================== USA VIRTUAL (12) ========================
    12: {
        2262: 3640.00,
        2750: 3640.00,
        2442: 3640.00,
        3193: 3640.00,
        3160: 3640.00,
        3310: 3640.00,
        3309: 3640.00,
        2567: 3640.00,
        3393: 3640.00,
        3406: 3640.00,
        3335: 3640.00,
        2430: 3640.00,
        2440: 3640.00,
        2441: 3640.00,
        2767: 3640.00,
        2748: 3640.00,
        2784: 3640.00,
        2677: 3640.00,
        2524: 3640.00,
        2675: 3640.00,
        2681: 3640.00,
        2620: 3640.00,
        2568: 3640.00,
        3212: 3640.00,
        3209: 3640.00,
        3140: 3640.00,
        3228: 3640.00,
        3154: 3640.00,
        3001: 3640.00
    },
    // ======================== USA (187) ========================
    187: {
        2617: 3640.00,
        3001: 3640.00,
        3170: 3640.00,
        3177: 3640.00,
        3193: 3640.00,
        2268: 3640.00,
        2266: 3640.00,
        2495: 3640.00,
        2263: 3640.00,
        3370: 3640.00,
        2738: 3640.00
    },

    // ======================== SOUTH AFRICA (31) ========================
    31: {
        2750: 3640.00,
        2856: 3640.00,
        2579: 92.40,
        3160: 92.40,
        3330: 92.40,
        2567: 92.40,
        3393: 92.40,
        2260: 92.40,
        3370: 92.40,
        3001: 50.40,
        2840: 81.20,
        3237: 3640.00,
        3335: 3640.00,
        2920: 3640.00,
        3428: 92.40,
        2649: 3640.00
    },
    // ======================== INDIA (22) ========================
    22: {
        2805: 56.00,
        3001: 50.40,
        3193: 56.00,
        3160: 56.00,
        3330: 56.00,
        3406: 56.00,
        3370: 56.00,
        3428: 56.00
    },
    // ======================== PAKISTAN (66) ========================
    66: {
        3001: 50.40,
        2579: 89.60,
        3193: 89.60,
        3160: 89.60,
        2260: 89.60,
        3370: 89.60,
        3168: 67.20,
        2920: 67.20
    },
    // ======================== BANGLADESH (60) ========================
    60: {
        3001: 50.40,
        3160: 72.80,
        2260: 72.80,
        3370: 72.80,
        2920: 56.00
    },
    // ======================== ZAMBIA (147) ========================
    147: {
        2750: 72.80,
        3160: 72.80,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== NAMIBIA (138) ========================
    138: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== PAPUA NEW GUINEA (79) ========================
    79: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== ALGERIA (58) ========================
    58: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== ETHIOPIA (71) ========================
    71: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00
    },
    // ======================== MOZAMBIQUE (80) ========================
    80: {
        3001: 50.40,
        3411: 72.80,
        3370: 72.80
    },
    // ======================== ANGOLA (76) ========================
    76: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== UKRAINE (1) ========================
    1: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2567: 182.00,
        2260: 182.00,
        3393: 182.00,
        3370: 182.00,
        3001: 50.40,
        2738: 173.60,
        2263: 126.00,
        3309: 42.00,
        3328: 75.60,
        3237: 3640.00,
        3168: 137.20,
        2920: 137.20,
        3335: 3640.00,
        3428: 182.00,
        3418: 3640.00
    },
    // ======================== EGYPT (21) ========================
    21: {
        2750: 72.80,
        3193: 72.80,
        3330: 72.80,
        3160: 72.80,
        2260: 72.80,
        3340: 72.80,
        3393: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40,
        2920: 44.80
    },
    // ======================== BRAZIL (73) ========================
    73: {
        2750: 182.00,
        3160: 182.00,
        2579: 182.00,
        3193: 182.00,
        2567: 182.00,
        3365: 182.00,
        3393: 182.00,
        2260: 182.00,
        3406: 182.00,
        3370: 182.00,
        3089: 3640.00,
        3415: 3640.00,
        3246: 3640.00,
        2920: 3640.00,
        3412: 3640.00,
        3413: 3640.00,
        3001: 50.40,
        2263: 92.40,
        3018: 44.80,
        2739: 3640.00,
        2738: 140.00,
        3215: 3640.00,
        3237: 3640.00,
        2951: 3640.00,
        3104: 3640.00,
        3367: 42.00,
        2404: 33.60,
        3229: 33.60,
        3252: 3640.00,
        3428: 182.00,
        3264: 3640.00,
        3398: 3640.00,
        2842: 3640.00
    },
    // ======================== IRAN (57) ========================
    57: {
        3193: 50.40,
        3330: 50.40,
        3370: 50.40,
        3168: 50.40
    },
    // ======================== PERU (65) ========================
    65: {
        2457: 3640.00,
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== ZIMBABWE (96) ========================
    96: {
        3001: 50.40,
        3160: 72.80,
        3370: 72.80,
        3168: 56.00
    },
    // ======================== NEPAL (81) ========================
    81: {
        3001: 50.40,
        3193: 72.80,
        3411: 72.80,
        3370: 72.80
    },
    // ======================== UZBEKISTAN (40) ========================
    40: {
        2579: 182.00,
        3160: 182.00,
        3193: 182.00,
        3330: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40,
        3168: 137.20,
        2920: 137.20,
        3335: 3640.00,
        3428: 182.00
    },
    // ======================== NIGERIA (19) ========================
    19: {
        2750: 128.80,
        2579: 128.80,
        3193: 128.80,
        3160: 128.80,
        3330: 128.80,
        2567: 128.80,
        2260: 128.80,
        3370: 128.80,
        3001: 50.40,
        3168: 95.20,
        3335: 53.20,
        2920: 33.60,
        3428: 128.80
    },
    // ======================== ESWATINI (106) ========================
    106: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== DR CONGO (18) ========================
    18: {
        2750: 72.80,
        3160: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40,
        2920: 44.80
    },
    // ======================== FRANCE (78) ========================
    78: {
        2750: 70.00,
        3193: 70.00,
        2442: 70.00,
        2579: 70.00,
        3329: 70.00,
        2260: 70.00,
        3370: 70.00,
        3414: 70.00,
        3418: 70.00,
        3394: 70.00,
        2263: 39.20,
        2738: 39.20,
        3001: 50.40,
        2739: 3640.00,
        3160: 3640.00,
        3389: 36.40,
        3403: 36.40,
        3335: 67.20,
        2920: 33.60,
        3428: 70.00,
        3270: 39.20
    },
    // ======================== BOTSWANA (123) ========================
    123: {
        3001: 50.40,
        3160: 72.80,
        3370: 72.80
    },
    // ======================== MEXICO (54) ========================
    54: {
        2750: 58.80,
        3193: 58.80,
        3330: 58.80,
        2260: 58.80,
        3370: 58.80,
        3414: 58.80,
        3001: 50.40,
        2920: 44.80
    },
    // ======================== SRI LANKA (64) ========================
    64: {
        3001: 50.40,
        3193: 72.80,
        2260: 72.80,
        3411: 72.80,
        3370: 72.80,
        3168: 72.80,
        2920: 56.00
    },
    // ======================== HONDURAS (88) ========================
    88: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== ARGENTINA (39) ========================
    39: {
        2750: 72.80,
        2579: 72.80,
        2286: 72.80,
        3160: 72.80,
        3193: 72.80,
        3303: 72.80,
        3393: 72.80,
        2260: 72.80,
        3001: 50.40,
        2263: 53.20,
        2738: 70.00,
        3237: 3640.00,
        3056: 3640.00,
        2556: 3640.00,
        2739: 36.40,
        3335: 3640.00,
        2920: 56.00,
        3428: 72.80
    },
    // ======================== MYANMAR (5) ========================
    5: {
        3001: 50.40,
        3160: 72.80,
        3193: 72.80,
        3330: 72.80,
        2260: 72.80,
        3411: 72.80,
        3370: 72.80,
        3168: 72.80,
        2920: 56.00
    },
    // ======================== TUNISIA (89) ========================
    89: {
        2750: 72.80,
        3160: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00
    },
    // ======================== TIMOR-LESTE (91) ========================
    91: {
        3001: 50.40,
        3160: 72.80,
        3370: 72.80,
        3168: 72.80
    },
    // ======================== LESOTHO (136) ========================
    136: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== ECUADOR (105) ========================
    105: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00,
        2920: 56.00
    },
    // ======================== EL SALVADOR (101) ========================
    101: {
        2750: 72.80,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== MOROCCO (37) ========================
    37: {
        2750: 128.80,
        2579: 128.80,
        3193: 128.80,
        2291: 128.80,
        3160: 128.80,
        3330: 128.80,
        2260: 128.80,
        3340: 128.80,
        3393: 128.80,
        3370: 128.80,
        3001: 50.40,
        2738: 56.00,
        2263: 42.00,
        2840: 47.60,
        3237: 3640.00,
        3309: 33.60,
        3335: 39.20,
        3168: 95.20,
        2920: 95.20,
        3428: 128.80
    },
    // ======================== UGANDA (75) ========================
    75: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        2579: 72.80,
        3168: 72.80,
        3001: 50.40
    },
    // ======================== MALAWI (137) ========================
    137: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== GHANA (38) ========================
    38: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40,
        2920: 58.80
    },
    // ======================== KENYA (8) ========================
    8: {
        2750: 3640.00,
        3001: 50.40,
        2579: 182.00,
        3193: 182.00,
        3160: 182.00,
        3330: 182.00,
        2260: 182.00,
        3370: 182.00,
        3168: 182.00,
        2738: 30.80,
        2263: 3640.00,
        2840: 3640.00,
        3237: 3640.00,
        3340: 3640.00,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== PANAMA (112) ========================
    112: {
        2750: 72.80,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== JAMAICA (111) ========================
    111: {
        3001: 50.40,
        2260: 72.80,
        3370: 72.80,
        2920: 56.00
    },
    // ======================== VENEZUELA (70) ========================
    70: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3160: 182.00,
        2567: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== KAZAKHSTAN (2) ========================
    2: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2567: 182.00,
        2260: 182.00,
        3370: 182.00,
        3421: 182.00,
        3001: 50.40,
        2738: 3640.00,
        3328: 3640.00,
        3237: 3640.00,
        3168: 137.20,
        2920: 137.20,
        2263: 3640.00,
        3428: 182.00
    },
    // ======================== COLOMBIA (33) ========================
    33: {
        2750: 165.20,
        2579: 165.20,
        2286: 165.20,
        3193: 165.20,
        3330: 165.20,
        2567: 165.20,
        2260: 165.20,
        3406: 165.20,
        3340: 165.20,
        3370: 165.20,
        3001: 50.40,
        3160: 3640.00,
        3253: 3640.00,
        3243: 3640.00,
        2840: 165.20,
        3237: 3640.00,
        3335: 3640.00,
        3428: 165.20,
        2236: 3640.00,
        3288: 3640.00
    },
    // ======================== PARAGUAY (87) ========================
    87: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        3370: 72.80,
        2579: 72.80,
        3001: 50.40
    },
    // ======================== TURKEY (62) ========================
    62: {
        2750: 89.60,
        2579: 89.60,
        3193: 89.60,
        3406: 89.60,
        3370: 89.60,
        3001: 50.40,
        2260: 89.60,
        3335: 42.00,
        3329: 58.80,
        2920: 44.80,
        3428: 89.60
    },
    // ======================== KYRGYZSTAN (11) ========================
    11: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2260: 182.00,
        3370: 182.00,
        3168: 182.00,
        3001: 50.40,
        2920: 3640.00,
        2284: 3640.00,
        3428: 182.00
    },
    // ======================== JORDAN (116) ========================
    116: {
        3001: 50.40,
        3193: 72.80,
        3370: 72.80
    },
    // ======================== CAMEROON (41) ========================
    41: {
        2750: 128.80,
        2579: 128.80,
        3160: 128.80,
        3193: 128.80,
        2739: 128.80,
        2738: 128.80,
        3330: 128.80,
        2567: 128.80,
        2260: 128.80,
        3370: 128.80,
        2920: 128.80,
        3001: 50.40,
        2263: 95.20,
        3168: 95.20,
        2709: 95.20,
        2840: 86.80,
        3237: 3640.00,
        3335: 3640.00,
        3428: 128.80
    },
    // ======================== ISRAEL (46) ========================
    46: {
        3001: 50.40,
        2579: 456.40,
        3193: 456.40,
        3330: 456.40,
        2567: 456.40,
        3370: 456.40,
        3237: 3640.00,
        2738: 378.00,
        2263: 417.20,
        2260: 484.40,
        3335: 3640.00,
        3168: 3640.00,
        2920: 3640.00,
        3428: 456.40
    },
    // ======================== IVORY COAST (27) ========================
    27: {
        2750: 128.80,
        3193: 128.80,
        3330: 128.80,
        2260: 128.80,
        3370: 128.80,
        32: 128.80,
        3001: 50.40,
        3168: 95.20,
        2920: 95.20,
        3428: 128.80
    },
    // ======================== BELARUS (51) ========================
    51: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40
    },
    // ======================== BULGARIA (83) ========================
    83: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40,
        2738: 30.80,
        2263: 3640.00,
        3237: 3640.00,
        3335: 3640.00,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== LIBYA (102) ========================
    102: {
        3001: 50.40,
        2260: 128.80,
        3168: 128.80,
        2920: 95.20,
        3428: 128.80
    },
    // ======================== MAURITIUS (157) ========================
    157: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== TURKMENISTAN (161) ========================
    161: {
        3001: 50.40,
        2260: 72.80,
        3370: 72.80,
        2920: 56.00
    },
    // ======================== AZERBAIJAN (35) ========================
    35: {
        2579: 39.20,
        3330: 39.20,
        3370: 39.20,
        3001: 50.40,
        3193: 39.20
    },
    // ======================== MALI (69) ========================
    69: {
        2750: 72.80,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== RWANDA (140) ========================
    140: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== GABON (154) ========================
    154: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== SPAIN (56) ========================
    56: {
        2263: 98.00,
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3160: 182.00,
        3330: 182.00,
        2567: 182.00,
        2260: 182.00,
        3393: 182.00,
        3370: 182.00,
        3001: 50.40,
        2738: 156.80,
        2739: 42.00,
        3237: 3640.00,
        3329: 3640.00,
        3335: 3640.00,
        2920: 39.20,
        3428: 182.00,
        3296: 134.40
    },
    // ======================== NICARAGUA (90) ========================
    90: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== MOLDOVA (85) ========================
    85: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        2260: 182.00,
        2738: 182.00,
        3370: 182.00,
        3001: 50.40,
        2920: 3640.00,
        3239: 137.20,
        3428: 182.00
    },
    // ======================== SAUDI ARABIA (53) ========================
    53: {
        3001: 50.40,
        3193: 72.80,
        3160: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        2377: 3640.00
    },
    // ======================== THAILAND (52) ========================
    52: {
        2750: 61.60,
        2579: 61.60,
        3193: 61.60,
        3160: 61.60,
        3330: 61.60,
        3393: 61.60,
        2260: 61.60,
        3370: 61.60,
        3001: 50.40,
        2840: 50.40,
        3340: 3640.00,
        3237: 3640.00,
        2920: 3640.00,
        3428: 61.60
    },
    // ======================== BENIN (120) ========================
    120: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00
    },
    // ======================== COSTA RICA (93) ========================
    93: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== BURKINA FASO (95) ========================
    95: {
        2750: 72.80,
        2579: 72.80,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00,
        2920: 56.00
    },
    // ======================== QATAR (111) ========================
    111: {
        3001: 50.40,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        2920: 44.80
    },
    // ======================== BELGIUM (82) ========================
    82: {
        2750: 165.20,
        3160: 165.20,
        3193: 165.20,
        2260: 165.20,
        3370: 165.20,
        2579: 165.20,
        3001: 50.40,
        2263: 56.00,
        2738: 75.60,
        3309: 159.60,
        3335: 156.80,
        2920: 126.00,
        3428: 165.20
    },
    // ======================== UNITED KINGDOM (16) ========================
    16: {
        2263: 3640.00,
        2442: 3640.00,
        2738: 3640.00,
        2750: 182.00,
        2579: 182.00,
        2291: 182.00,
        3193: 182.00,
        3330: 182.00,
        3368: 182.00,
        2260: 182.00,
        3406: 182.00,
        3370: 182.00,
        3168: 182.00,
        3001: 50.40,
        2739: 3640.00,
        3160: 44.80,
        2295: 3640.00,
        2920: 44.80,
        3309: 42.00,
        3329: 3640.00,
        3212: 3640.00,
        3248: 3640.00,
        3237: 3640.00,
        3328: 3640.00,
        3393: 109.20,
        1015: 137.20,
        3428: 182.00
    },
    // ======================== REUNION (146) ========================
    146: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== OMAN (107) ========================
    107: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== CONGO (77) ========================
    77: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== YEMEN (30) ========================
    30: {
        3001: 50.40,
        2377: 47.60,
        3193: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        2920: 56.00
    },
    // ======================== URUGUAY (156) ========================
    156: {
        3001: 50.40,
        2260: 128.80,
        3370: 128.80,
        2920: 95.20,
        3428: 128.80
    },
    // ======================== IRAQ (47) ========================
    47: {
        3001: 50.40,
        3193: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        2920: 56.00
    },
    // ======================== SENEGAL (61) ========================
    61: {
        2750: 72.80,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        2579: 72.80,
        3001: 50.40,
        2920: 53.20
    },
    // ======================== GERMANY (43) ========================
    43: {
        2263: 95.20,
        2738: 117.60,
        2750: 249.20,
        2579: 249.20,
        2442: 249.20,
        3193: 249.20,
        3160: 249.20,
        3330: 249.20,
        2567: 249.20,
        3393: 249.20,
        2260: 249.20,
        3370: 249.20,
        3001: 50.40,
        2739: 47.60,
        3329: 3640.00,
        3237: 3640.00,
        3394: 56.00,
        3087: 120.40,
        3418: 36.40,
        2920: 61.60,
        3428: 249.20
    },
    // ======================== LAOS (25) ========================
    25: {
        3001: 50.40,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        3411: 182.00,
        3370: 182.00,
        3421: 182.00,
        2840: 182.00,
        3237: 44.80,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== POLAND (15) ========================
    15: {
        2263: 3640.00,
        3418: 3640.00,
        2738: 198.80,
        2579: 358.40,
        3193: 358.40,
        2442: 358.40,
        3330: 358.40,
        2260: 358.40,
        3370: 358.40,
        3001: 50.40,
        2739: 3640.00,
        2295: 3640.00,
        3160: 44.80,
        3328: 3640.00,
        3309: 3640.00,
        3237: 3640.00,
        3371: 3640.00,
        3087: 243.60,
        2284: 44.80,
        1015: 268.80,
        2920: 3640.00,
        3428: 358.40
    },
    // ======================== TOGO (99) ========================
    99: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00
    },
    // ======================== NIGER (139) ========================
    139: {
        3001: 50.40,
        2260: 72.80,
        3370: 72.80,
        2920: 56.00
    },
    // ======================== HUNGARY (84) ========================
    84: {
        2750: 215.60,
        2579: 215.60,
        3193: 215.60,
        2567: 215.60,
        2260: 215.60,
        3370: 215.60,
        3001: 50.40,
        3309: 134.40,
        3335: 81.20,
        2920: 162.40,
        3428: 215.60
    },
    // ======================== BHUTAN (158) ========================
    158: {
        3001: 50.40,
        2260: 70.00,
        3411: 70.00,
        3370: 70.00,
        2920: 53.20
    },
    // ======================== BURUNDI (119) ========================
    119: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== MALAYSIA (1005) ========================
    1005: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2567: 182.00,
        3393: 182.00,
        2260: 182.00,
        3370: 182.00,
        3421: 182.00,
        3001: 50.40,
        2840: 84.00,
        3237: 3640.00,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== NETHERLANDS (104) ========================
    104: {
        2263: 145.60,
        2738: 145.60,
        2295: 3640.00,
        2920: 3640.00,
        2442: 3640.00,
        2750: 280.00,
        2579: 280.00,
        3160: 280.00,
        3193: 280.00,
        3330: 280.00,
        2567: 280.00,
        2260: 280.00,
        3370: 280.00,
        3001: 50.40,
        2739: 3640.00,
        3198: 33.60,
        3329: 3640.00,
        3328: 39.20,
        3087: 193.20,
        3394: 154.00,
        3335: 30.80,
        3418: 36.40,
        3428: 280.00
    },
    // ======================== EQUATORIAL GUINEA (167) ========================
    167: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== UAE (95) ========================
    95: {
        3001: 50.40,
        3160: 2142.00,
        2260: 72.80,
        3370: 72.80,
        3428: 2142.00
    },
    // ======================== TRINIDAD AND TOBAGO (149) ========================
    149: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== CAMBODIA (24) ========================
    24: {
        2750: 151.20,
        2579: 151.20,
        3193: 151.20,
        3160: 151.20,
        3330: 151.20,
        2260: 151.20,
        3411: 151.20,
        3370: 151.20,
        3421: 151.20,
        3001: 50.40,
        3335: 151.20,
        3237: 137.20,
        2920: 114.80,
        3168: 47.60,
        3428: 151.20
    },
    // ======================== SOUTH SUDAN (177) ========================
    177: {
        3001: 50.40,
        2579: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        2920: 56.00,
        3428: 72.80
    },
    // ======================== MAURITANIA (114) ========================
    114: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40
    },
    // ======================== PHILIPPINES (4) ========================
    4: {
        2263: 33.60,
        2750: 182.00,
        2579: 182.00,
        3160: 182.00,
        3193: 182.00,
        3330: 182.00,
        2567: 182.00,
        3393: 182.00,
        3370: 182.00,
        3001: 50.40,
        2738: 39.20,
        2739: 3640.00,
        2840: 44.80,
        3340: 3640.00,
        3237: 3640.00,
        2920: 3640.00,
        3418: 3640.00,
        3168: 3640.00,
        3428: 182.00
    },
    // ======================== CHINA (3) ========================
    3: {
        3193: 95.20
    },
    // ======================== KUWAIT (100) ========================
    100: {
        3001: 50.40,
        2579: 2142.00,
        3168: 2142.00,
        2260: 72.80,
        3370: 72.80,
        2920: 61.60,
        3428: 2142.00
    },
    // ======================== GUINEA-BISSAU (130) ========================
    130: {
        2750: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== MALDIVES (159) ========================
    159: {
        3001: 50.40,
        3160: 70.00,
        3370: 70.00
    },
    // ======================== BOSNIA (108) ========================
    108: {
        2750: 95.20,
        3193: 95.20,
        2260: 95.20,
        3370: 95.20,
        3001: 50.40,
        2920: 72.80,
        3428: 95.20
    },
    // ======================== SOMALIA (149) ========================
    149: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== BARBADOS (118) ========================
    118: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== GAMBIA (28) ========================
    28: {
        2750: 72.80,
        3193: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== ARMENIA (148) ========================
    148: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        2567: 182.00,
        2260: 182.00,
        3370: 182.00,
        3168: 182.00,
        3001: 50.40,
        2920: 39.20,
        3428: 182.00
    },
    // ======================== GUYANA (124) ========================
    124: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== CHAD (42) ========================
    42: {
        2750: 72.80,
        3193: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== SWITZERLAND (173) ========================
    173: {
        2750: 165.20,
        2579: 165.20,
        3193: 165.20,
        3160: 165.20,
        2442: 165.20,
        3370: 165.20,
        3001: 50.40,
        3329: 162.40,
        3428: 165.20
    },
    // ======================== PUERTO RICO (97) ========================
    97: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== IRELAND (23) ========================
    23: {
        2750: 58.80,
        3160: 58.80,
        3193: 58.80,
        2739: 58.80,
        3329: 58.80,
        3330: 58.80,
        2260: 58.80,
        3370: 58.80,
        3001: 50.40,
        2738: 50.40,
        2263: 39.20,
        3237: 47.60,
        3335: 53.20,
        2920: 33.60,
        3428: 58.80
    },
    // ======================== SERBIA (29) ========================
    29: {
        3001: 50.40,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2260: 182.00,
        3370: 182.00,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== ESTONIA (34) ========================
    34: {
        2750: 47.60,
        2291: 47.60,
        3193: 47.60,
        3330: 47.60,
        2260: 47.60,
        3393: 47.60,
        3370: 47.60,
        3237: 47.60,
        2738: 36.40,
        2920: 36.40,
        3335: 47.60
    },
    // ======================== BAHRAIN (145) ========================
    145: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== GUADELOUPE (160) ========================
    160: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== NORWAY (174) ========================
    174: {
        2750: 95.20,
        3193: 95.20,
        2260: 95.20,
        2579: 95.20,
        3370: 95.20,
        3001: 50.40,
        2920: 72.80,
        3428: 95.20
    },
    // ======================== ITALY (86) ========================
    86: {
        2966: 3640.00,
        2263: 3640.00,
        2738: 3640.00,
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3160: 182.00,
        2615: 182.00,
        3307: 182.00,
        2260: 182.00,
        3393: 182.00,
        3370: 182.00,
        3406: 182.00,
        3414: 182.00,
        3266: 182.00,
        2442: 33.60,
        3001: 50.40,
        3329: 58.80,
        2739: 3640.00,
        3335: 53.20,
        2920: 137.20,
        3418: 72.80,
        3304: 117.60,
        3428: 182.00
    },
    // ======================== ROMANIA (32) ========================
    32: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3160: 182.00,
        3330: 182.00,
        3393: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40,
        2738: 39.20,
        2291: 3640.00,
        2263: 30.80,
        3237: 3640.00,
        2739: 3640.00,
        3328: 30.80,
        2920: 3640.00,
        3312: 142.80,
        3258: 3640.00,
        3428: 182.00
    },
    // ======================== CYPRUS (1006) ========================
    1006: {
        2750: 50.40,
        3193: 50.40,
        3370: 50.40,
        2738: 3640.00
    },
    // ======================== LUXEMBOURG (165) ========================
    165: {
        2750: 92.40,
        3193: 92.40,
        2579: 92.40,
        3370: 92.40,
        3001: 50.40,
        3428: 92.40
    },
    // ======================== SURINAME (142) ========================
    142: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== GUATEMALA (94) ========================
    94: {
        3001: 50.40,
        2579: 95.20,
        2260: 95.20,
        3370: 95.20,
        2920: 72.80
    },
    // ======================== MADAGASCAR (17) ========================
    17: {
        3001: 50.40,
        2579: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        2840: 56.00,
        3168: 56.00,
        2920: 56.00
    },
    // ======================== INDONESIA (6) ========================
    6: {
        2295: 3640.00,
        3168: 3640.00,
        2920: 3640.00,
        1329: 3640.00,
        2413: 3640.00,
        2994: 3640.00,
        3358: 3640.00,
        2272: 3640.00,
        1170: 3640.00,
        3417: 3640.00,
        3251: 3640.00,
        3349: 3640.00,
        3061: 3640.00,
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2567: 182.00,
        3393: 182.00,
        2260: 182.00,
        3406: 182.00,
        3370: 182.00,
        2434: 182.00,
        1085: 182.00,
        3386: 182.00,
        3353: 182.00,
        3127: 182.00,
        3426: 182.00,
        3029: 182.00,
        3424: 182.00,
        3001: 50.40,
        3160: 165.20,
        1507: 165.20,
        2263: 3640.00,
        2738: 3640.00,
        2739: 95.20,
        2840: 92.40,
        3340: 3640.00,
        3237: 3640.00,
        3327: 3640.00,
        3027: 3640.00,
        3333: 3640.00,
        3336: 3640.00,
        3339: 3640.00,
        3355: 3640.00,
        3320: 3640.00,
        3308: 3640.00,
        3267: 3640.00,
        3224: 3640.00,
        54: 47.60,
        3206: 39.20,
        3289: 3640.00,
        2992: 3640.00,
        3425: 3640.00,
        3428: 182.00
    },
    // ======================== SWEDEN (1007) ========================
    1007: {
        3055: 3640.00,
        2750: 134.40,
        2579: 134.40,
        3193: 134.40,
        3330: 134.40,
        2260: 134.40,
        3370: 134.40,
        3314: 98.00,
        3237: 3640.00,
        2738: 3640.00,
        2263: 3640.00,
        3087: 72.80,
        2739: 3640.00,
        3335: 53.20,
        2920: 3640.00,
        3428: 134.40
    },
    // ======================== ANTIGUA AND BARBUDA (169) ========================
    169: {
        3001: 50.40
    },
    // ======================== DJIBOUTI (168) ========================
    168: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== FINLAND (163) ========================
    163: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        2567: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== FRENCH GUIANA (162) ========================
    162: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== SAINT LUCIA (164) ========================
    164: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== MONTENEGRO (171) ========================
    171: {
        3001: 50.40,
        3370: 92.40
    },
    // ======================== CUBA (113) ========================
    113: {
        2750: 72.80,
        3160: 72.80,
        3370: 72.80
    },
    // ======================== GREECE (129) ========================
    129: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3160: 182.00,
        3393: 182.00,
        2260: 182.00,
        3370: 182.00,
        3001: 50.40,
        2263: 30.80,
        2738: 42.00,
        3309: 39.20,
        2840: 47.60,
        3237: 3640.00,
        3248: 3640.00,
        2739: 3640.00,
        3335: 3640.00,
        2920: 137.20,
        3418: 36.40,
        3428: 182.00
    },
    // ======================== CHILE (151) ========================
    151: {
        2750: 3640.00,
        3001: 50.40,
        2579: 182.00,
        3160: 182.00,
        3193: 182.00,
        2260: 182.00,
        3370: 182.00,
        2421: 117.60,
        3109: 3640.00,
        3350: 3640.00,
        3235: 140.00,
        3335: 3640.00,
        3419: 30.80,
        3234: 30.80,
        2920: 3640.00,
        3428: 182.00
    },
    // ======================== SIERRA LEONE (115) ========================
    115: {
        2750: 72.80,
        2579: 72.80,
        3160: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40
    },
    // ======================== BAHAMAS (122) ========================
    122: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== BOLIVIA (92) ========================
    92: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 72.80,
        3001: 50.40,
        2920: 56.00
    },
    // ======================== GRENADA (127) ========================
    127: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== LATVIA (49) ========================
    49: {
        2750: 182.00,
        2579: 182.00,
        3193: 182.00,
        3330: 182.00,
        2567: 182.00,
        2260: 182.00,
        3393: 182.00,
        3370: 182.00,
        3001: 50.40,
        3309: 78.40,
        3237: 3640.00,
        3340: 131.60,
        2738: 3640.00,
        2263: 3640.00,
        2739: 3640.00,
        2920: 3640.00,
        2476: 3640.00,
        3428: 182.00
    },
    // ======================== TAJIKISTAN (143) ========================
    143: {
        3001: 50.40,
        2579: 182.00,
        3193: 182.00,
        2260: 182.00,
        3370: 182.00,
        2920: 137.20,
        3428: 182.00
    },
    // ======================== BRUNEI (121) ========================
    121: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== CAYMAN ISLANDS (170) ========================
    170: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== SAINT VINCENT (166) ========================
    166: {
        3001: 50.40,
        3370: 70.00
    },
    // ======================== ALBANIA (155) ========================
    155: {
        3001: 50.40,
        3370: 95.20
    },
    // ======================== SLOVENIA (59) ========================
    59: {
        2750: 95.20,
        2579: 95.20,
        2442: 95.20,
        2291: 95.20,
        3193: 95.20,
        3160: 95.20,
        3330: 95.20,
        2567: 95.20,
        2260: 95.20,
        3370: 95.20,
        3001: 50.40,
        2738: 86.80,
        2263: 67.20,
        3256: 3640.00,
        3309: 67.20,
        3335: 53.20,
        2920: 72.80,
        3428: 95.20
    },
    // ======================== SAINT KITTS AND NEVIS (134) ========================
    134: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== LITHUANIA (1016) ========================
    1016: {
        2750: 212.80,
        2579: 212.80,
        3193: 212.80,
        3330: 212.80,
        2260: 212.80,
        3370: 212.80,
        3001: 50.40,
        3309: 30.80,
        3087: 145.60,
        2920: 3640.00,
        3428: 212.80
    },
    // ======================== CENTRAL AFRICAN REPUBLIC (125) ========================
    125: {
        3001: 50.40,
        3370: 70.00,
        3168: 70.00
    },
    // ======================== LIBERIA (135) ========================
    135: {
        2750: 72.80,
        3193: 72.80,
        3160: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2840: 56.00,
        2920: 56.00
    },
    // ======================== JAPAN (1001) ========================
    1001: {
        2750: 1878.80,
        2567: 1878.80,
        3160: 1878.80,
        3370: 1878.80,
        3421: 1878.80,
        2260: 2128.00,
        2920: 1596.00,
        3428: 1878.80
    },
    // ======================== GUINEA (68) ========================
    68: {
        2750: 72.80,
        3193: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 56.00
    },
    // ======================== ARUBA (179) ========================
    179: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== COMOROS (133) ========================
    133: {
        3001: 50.40,
        3370: 70.00,
        3168: 70.00
    },
    // ======================== SINGAPORE (196) ========================
    196: {
        2750: 123.20,
        2579: 123.20,
        3193: 123.20,
        2567: 123.20,
        2260: 123.20,
        3370: 123.20,
        3001: 50.40,
        3335: 44.80,
        2920: 92.40,
        3428: 123.20
    },
    // ======================== SLOVAKIA (141) ========================
    141: {
        2750: 95.20,
        2579: 95.20,
        3193: 95.20,
        3370: 95.20,
        3001: 50.40
    },
    // ======================== ANGUILLA (181) ========================
    181: {
        3001: 50.40,
        3370: 128.80,
        2579: 128.80,
        3428: 128.80
    },
    // ======================== SAO TOME AND PRINCIPE (178) ========================
    178: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== CROATIA (45) ========================
    45: {
        2750: 72.80,
        2291: 72.80,
        3193: 72.80,
        3330: 72.80,
        2260: 72.80,
        3370: 72.80,
        3001: 50.40,
        2738: 70.00,
        2263: 56.00,
        2920: 56.00
    },
    // ======================== CAPE VERDE (186) ========================
    186: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== MONACO (144) ========================
    144: {
        2750: 159.60,
        3193: 159.60,
        3370: 159.60,
        3001: 50.40,
        3428: 159.60
    },
    // ======================== MACEDONIA (183) ========================
    183: {
        2750: 95.20,
        3193: 95.20,
        3001: 50.40
    },
    // ======================== BELIZE (124) ========================
    124: {
        3001: 50.40,
        3370: 72.80,
        3168: 72.80
    },
    // ======================== NEW CALEDONIA (185) ========================
    185: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== NEW ZEALAND (67) ========================
    67: {
        2750: 128.80,
        2579: 128.80,
        3160: 128.80,
        2260: 128.80,
        3370: 128.80,
        3001: 50.40,
        3335: 120.40,
        2920: 95.20,
        3428: 128.80
    },
    // ======================== MONGOLIA (72) ========================
    72: {
        3001: 50.40,
        3193: 72.80,
        2260: 72.80,
        3370: 72.80,
        3168: 56.00,
        2920: 56.00
    },
    // ======================== LEBANON (153) ========================
    153: {
        2750: 72.80,
        3370: 72.80,
        3001: 50.40,
        3168: 50.40
    },
    // ======================== DENMARK (172) ========================
    172: {
        2750: 61.60,
        2579: 61.60,
        2739: 61.60,
        2263: 61.60,
        2738: 61.60,
        3193: 61.60,
        2260: 61.60,
        3370: 61.60,
        3001: 50.40,
        3237: 36.40,
        2920: 44.80
    },
    // ======================== AUSTRIA (50) ========================
    50: {
        2263: 103.60,
        2750: 165.20,
        2442: 165.20,
        2579: 165.20,
        3193: 165.20,
        2632: 165.20,
        3160: 165.20,
        3330: 165.20,
        2260: 165.20,
        3370: 165.20,
        3001: 50.40,
        2738: 154.00,
        3329: 159.60,
        3237: 137.20,
        3328: 162.40,
        3335: 156.80,
        2920: 44.80,
        3428: 165.20
    },
    // ======================== SEYCHELLES (184) ========================
    184: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== AUSTRALIA (175) ========================
    175: {
        2442: 254.80,
        2750: 254.80,
        2579: 254.80,
        3193: 254.80,
        3160: 254.80,
        2567: 254.80,
        2260: 254.80,
        3370: 254.80,
        2293: 215.60,
        3001: 50.40,
        2263: 58.80,
        2738: 75.60,
        3237: 47.60,
        3212: 56.00,
        3335: 44.80,
        2920: 50.40,
        3428: 254.80
    },
    // ======================== MONTSERRAT (180) ========================
    180: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== DOMINICA (126) ========================
    126: {
        3001: 50.40,
        3370: 72.80
    },
    // ======================== MACAU (20) ========================
    20: {
        3001: 50.40
    },
    // ======================== ICELAND (132) ========================
    132: {
        3001: 50.40,
        2579: 95.20,
        3370: 95.20,
        3428: 95.20
    },
    // ======================== ERITREA (176) ========================
    176: {
        3001: 50.40,
        3370: 128.80,
        3428: 128.80
    },
    // ======================== KOSOVO (1004) ========================
    1004: {
        3168: 30.80,
        3428: 30.80
    },
    // ======================== GIBRALTAR (201) ========================
    201: {
        2750: 394.80,
        3370: 394.80,
        2579: 394.80
    }
};

module.exports = {
    countries,
    pricing
};

module.exports = {
    whatsapp,
    facebook,
    snapchat,
    pricing,
    providerRanks
};
