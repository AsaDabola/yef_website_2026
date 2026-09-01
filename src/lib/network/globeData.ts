/**
 * Static data for the network globe: every YEF chapter country (matching
 * `countries` in `@/lib/i18n/countries`), its ISO alpha-3 code (for matching
 * the world TopoJSON), a short factual profile, and — where a chapter has more
 * than a single presence in `@/lib/chapters` — its named local chapters.
 */

export type GlobeCountry = {
  code: string;
  name: string;
  region: string;
  alpha3: string;
  lat: number;
  lon: number;
  population: string;
  capital: string;
  language: string;
};

export type GlobeChapter = {
  name: string;
  city: string;
  leader: string;
  role: string;
  lat: number;
  lon: number;
};

export const GLOBE_COUNTRIES: GlobeCountry[] = [
  { code: "br", name: "Brazil", region: "South America", alpha3: "BRA", lat: -15.8, lon: -47.9, population: "About 213 million", capital: "Brasília", language: "Portuguese" },
  { code: "ca", name: "Canada", region: "North America", alpha3: "CAN", lat: 45.4, lon: -75.7, population: "About 42 million", capital: "Ottawa", language: "English and French" },
  { code: "co", name: "Colombia", region: "South America", alpha3: "COL", lat: 4.6, lon: -74.1, population: "About 53 million", capital: "Bogotá", language: "Spanish" },
  { code: "fr", name: "France", region: "Europe", alpha3: "FRA", lat: 48.9, lon: 2.3, population: "About 67 million", capital: "Paris", language: "French" },
  { code: "de", name: "Germany", region: "Europe", alpha3: "DEU", lat: 52.5, lon: 13.4, population: "About 85 million", capital: "Berlin", language: "German" },
  { code: "in", name: "India", region: "South Asia", alpha3: "IND", lat: 28.6, lon: 77.2, population: "About 1.46 billion", capital: "New Delhi", language: "Hindi, English, and regional languages" },
  { code: "id", name: "Indonesia", region: "Southeast Asia", alpha3: "IDN", lat: -6.2, lon: 106.8, population: "About 286 million", capital: "Jakarta", language: "Indonesian" },
  { code: "it", name: "Italy", region: "Europe", alpha3: "ITA", lat: 41.9, lon: 12.5, population: "About 59 million", capital: "Rome", language: "Italian" },
  { code: "jp", name: "Japan", region: "Asia-Pacific", alpha3: "JPN", lat: 35.7, lon: 139.7, population: "About 123 million", capital: "Tokyo", language: "Japanese" },
  { code: "ke", name: "East Africa Federation", region: "Africa", alpha3: "KEN", lat: -1.3, lon: 36.8, population: "About 58 million (Kenya)", capital: "Nairobi", language: "Swahili and English" },
  { code: "kr", name: "South Korea", region: "Asia-Pacific", alpha3: "KOR", lat: 37.6, lon: 127.0, population: "About 52 million", capital: "Seoul", language: "Korean" },
  { code: "mx", name: "Mexico", region: "North America", alpha3: "MEX", lat: 19.4, lon: -99.1, population: "About 131 million", capital: "Mexico City", language: "Spanish and indigenous languages" },
  { code: "ng", name: "Nigeria", region: "Africa", alpha3: "NGA", lat: 9.1, lon: 7.4, population: "About 238 million", capital: "Abuja", language: "English and regional languages" },
  { code: "au", name: "Australia", region: "Oceania", alpha3: "AUS", lat: -35.3, lon: 149.1, population: "About 27 million", capital: "Canberra", language: "English" },
  { code: "ru", name: "Russia", region: "Europe", alpha3: "RUS", lat: 55.8, lon: 37.6, population: "About 144 million", capital: "Moscow", language: "Russian" },
  { code: "za", name: "South Africa", region: "Africa", alpha3: "ZAF", lat: -25.7, lon: 28.2, population: "About 64 million", capital: "Pretoria", language: "12 official languages" },
  { code: "es", name: "Spain", region: "Europe", alpha3: "ESP", lat: 40.4, lon: -3.7, population: "About 49 million", capital: "Madrid", language: "Spanish and regional languages" },
  { code: "tr", name: "Türkiye", region: "Europe", alpha3: "TUR", lat: 39.9, lon: 32.9, population: "About 88 million", capital: "Ankara", language: "Turkish" },
  { code: "gb", name: "United Kingdom", region: "Europe", alpha3: "GBR", lat: 51.5, lon: -0.1, population: "About 70 million", capital: "London", language: "English" },
  { code: "us", name: "United States", region: "North America", alpha3: "USA", lat: 38.9, lon: -77.0, population: "About 341 million", capital: "Washington, D.C.", language: "English" },
  { code: "ao", name: "Angola", region: "Africa", alpha3: "AGO", lat: -8.8, lon: 13.2, population: "About 39 million", capital: "Luanda", language: "Portuguese" },
  { code: "cm", name: "Cameroon", region: "Africa", alpha3: "CMR", lat: 3.9, lon: 11.5, population: "About 30 million", capital: "Yaoundé", language: "French and English" },
  { code: "cd", name: "Democratic Republic of the Congo", region: "Africa", alpha3: "COD", lat: -4.3, lon: 15.3, population: "About 113 million", capital: "Kinshasa", language: "French and national languages" },
  { code: "et", name: "Ethiopia", region: "Africa", alpha3: "ETH", lat: 9.0, lon: 38.7, population: "About 132 million", capital: "Addis Ababa", language: "Amharic and regional languages" },
  { code: "gh", name: "Ghana", region: "Africa", alpha3: "GHA", lat: 5.6, lon: -0.2, population: "About 35 million", capital: "Accra", language: "English" },
  { code: "ci", name: "Côte d’Ivoire", region: "Africa", alpha3: "CIV", lat: 6.8, lon: -5.3, population: "About 33 million", capital: "Yamoussoukro", language: "French" },
  { code: "mg", name: "Madagascar", region: "Africa", alpha3: "MDG", lat: -18.9, lon: 47.5, population: "About 33 million", capital: "Antananarivo", language: "Malagasy and French" },
  { code: "mz", name: "Mozambique", region: "Africa", alpha3: "MOZ", lat: -25.9, lon: 32.6, population: "About 36 million", capital: "Maputo", language: "Portuguese" },
  { code: "zm", name: "Zambia", region: "Africa", alpha3: "ZMB", lat: -15.4, lon: 28.3, population: "About 22 million", capital: "Lusaka", language: "English" },
  { code: "at", name: "Austria", region: "Europe", alpha3: "AUT", lat: 48.2, lon: 16.4, population: "About 9.2 million", capital: "Vienna", language: "German" },
  { code: "be", name: "Belgium", region: "Europe", alpha3: "BEL", lat: 50.8, lon: 4.4, population: "About 12 million", capital: "Brussels", language: "Dutch, French, and German" },
  { code: "cz", name: "Czechia", region: "Europe", alpha3: "CZE", lat: 50.1, lon: 14.4, population: "About 11 million", capital: "Prague", language: "Czech" },
  { code: "sk", name: "Slovakia", region: "Europe", alpha3: "SVK", lat: 48.1, lon: 17.1, population: "About 5.4 million", capital: "Bratislava", language: "Slovak" },
  { code: "gr", name: "Greece", region: "Europe", alpha3: "GRC", lat: 38.0, lon: 23.7, population: "About 10 million", capital: "Athens", language: "Greek" },
  { code: "hu", name: "Hungary", region: "Europe", alpha3: "HUN", lat: 47.5, lon: 19.0, population: "About 9.6 million", capital: "Budapest", language: "Hungarian" },
  { code: "nl", name: "Netherlands", region: "Europe", alpha3: "NLD", lat: 52.1, lon: 5.3, population: "About 18 million", capital: "Amsterdam", language: "Dutch" },
  { code: "pl", name: "Poland", region: "Europe", alpha3: "POL", lat: 52.2, lon: 21.0, population: "About 38 million", capital: "Warsaw", language: "Polish" },
  { code: "pt", name: "Portugal", region: "Europe", alpha3: "PRT", lat: 38.7, lon: -9.1, population: "About 11 million", capital: "Lisbon", language: "Portuguese" },
  { code: "ro", name: "Romania", region: "Europe", alpha3: "ROU", lat: 44.4, lon: 26.1, population: "About 19 million", capital: "Bucharest", language: "Romanian" },
  { code: "se", name: "Sweden", region: "Europe", alpha3: "SWE", lat: 59.3, lon: 18.1, population: "About 11 million", capital: "Stockholm", language: "Swedish" },
  { code: "ch", name: "Switzerland", region: "Europe", alpha3: "CHE", lat: 46.9, lon: 7.4, population: "About 9 million", capital: "Bern", language: "German, French, Italian, and Romansh" },
  { code: "ua", name: "Ukraine", region: "Europe", alpha3: "UKR", lat: 50.4, lon: 30.5, population: "About 38 million", capital: "Kyiv", language: "Ukrainian" },
  { code: "do", name: "Dominican Republic", region: "Central America & Caribbean", alpha3: "DOM", lat: 18.5, lon: -69.9, population: "About 12 million", capital: "Santo Domingo", language: "Spanish" },
  { code: "ht", name: "Haiti", region: "Central America & Caribbean", alpha3: "HTI", lat: 18.5, lon: -72.3, population: "About 12 million", capital: "Port-au-Prince", language: "Haitian Creole and French" },
  { code: "ar", name: "Argentina", region: "South America", alpha3: "ARG", lat: -34.6, lon: -58.4, population: "About 46 million", capital: "Buenos Aires", language: "Spanish" },
  { code: "cl", name: "Chile", region: "South America", alpha3: "CHL", lat: -33.4, lon: -70.6, population: "About 20 million", capital: "Santiago", language: "Spanish" },
  { code: "pe", name: "Peru", region: "South America", alpha3: "PER", lat: -12.0, lon: -77.0, population: "About 35 million", capital: "Lima", language: "Spanish, Quechua, and Aymara" },
  { code: "kz", name: "Kazakhstan", region: "Commonwealth of Independent States", alpha3: "KAZ", lat: 51.2, lon: 71.4, population: "About 21 million", capital: "Astana", language: "Kazakh and Russian" },
  { code: "eg", name: "Egypt", region: "Middle East & North Africa", alpha3: "EGY", lat: 30.0, lon: 31.2, population: "About 118 million", capital: "Cairo", language: "Arabic" },
  { code: "il", name: "Israel", region: "Middle East & North Africa", alpha3: "ISR", lat: 31.8, lon: 35.2, population: "About 10 million", capital: "Jerusalem", language: "Hebrew and Arabic" },
  { code: "ae", name: "United Arab Emirates", region: "Middle East & North Africa", alpha3: "ARE", lat: 24.5, lon: 54.4, population: "About 11 million", capital: "Abu Dhabi", language: "Arabic" },
  { code: "nz", name: "New Zealand", region: "Oceania", alpha3: "NZL", lat: -41.3, lon: 174.8, population: "About 5.3 million", capital: "Wellington", language: "English and Māori" },
  { code: "fj", name: "Fiji", region: "Oceania", alpha3: "FJI", lat: -18.1, lon: 178.4, population: "About 940,000", capital: "Suva", language: "English, Fijian, and Fiji Hindi" },
  { code: "to", name: "Tonga", region: "Oceania", alpha3: "TON", lat: -21.14, lon: -175.2, population: "About 100,000", capital: "Nukuʻalofa", language: "Tongan and English" },
  { code: "ws", name: "Samoa", region: "Oceania", alpha3: "WSM", lat: -13.85, lon: -171.75, population: "About 220,000", capital: "Apia", language: "Samoan and English" },
  { code: "sb", name: "Solomon Islands", region: "Oceania", alpha3: "SLB", lat: -9.43, lon: 159.95, population: "About 840,000", capital: "Honiara", language: "English and Solomon Islands Pijin" },
  { code: "bd", name: "Bangladesh", region: "South Asia", alpha3: "BGD", lat: 23.8, lon: 90.4, population: "About 176 million", capital: "Dhaka", language: "Bengali" },
  { code: "np", name: "Nepal", region: "South Asia", alpha3: "NPL", lat: 27.7, lon: 85.3, population: "About 30 million", capital: "Kathmandu", language: "Nepali" },
  { code: "pk", name: "Pakistan", region: "South Asia", alpha3: "PAK", lat: 33.7, lon: 73.1, population: "About 255 million", capital: "Islamabad", language: "Urdu, English, and regional languages" },
  { code: "my", name: "Malaysia", region: "Southeast Asia", alpha3: "MYS", lat: 3.1, lon: 101.7, population: "About 36 million", capital: "Kuala Lumpur", language: "Malay" },
  { code: "mm", name: "Myanmar", region: "Southeast Asia", alpha3: "MMR", lat: 19.7, lon: 96.1, population: "About 55 million", capital: "Naypyidaw", language: "Burmese" },
  { code: "ph", name: "Philippines", region: "Southeast Asia", alpha3: "PHL", lat: 14.6, lon: 121.0, population: "About 117 million", capital: "Manila", language: "Filipino and English" },
  { code: "sg", name: "Singapore", region: "Southeast Asia", alpha3: "SGP", lat: 1.35, lon: 103.8, population: "About 6 million", capital: "Singapore", language: "English, Malay, Mandarin, and Tamil" },
  { code: "th", name: "Thailand", region: "Southeast Asia", alpha3: "THA", lat: 13.75, lon: 100.5, population: "About 72 million", capital: "Bangkok", language: "Thai" },
  { code: "vn", name: "Vietnam", region: "Southeast Asia", alpha3: "VNM", lat: 21.0, lon: 105.8, population: "About 102 million", capital: "Hanoi", language: "Vietnamese" },
  { code: "mn", name: "Mongolia", region: "Asia-Pacific", alpha3: "MNG", lat: 47.9, lon: 106.9, population: "About 3.5 million", capital: "Ulaanbaatar", language: "Mongolian" },
  { code: "tw", name: "Taiwan", region: "Asia-Pacific", alpha3: "TWN", lat: 25.0, lon: 121.5, population: "About 23 million", capital: "Taipei", language: "Mandarin Chinese and regional languages" },
  { code: "rw", name: "Rwanda", region: "Africa", alpha3: "RWA", lat: -1.95, lon: 30.06, population: "About 15 million", capital: "Kigali", language: "Kinyarwanda, English, and French" },
  { code: "gt", name: "Guatemala", region: "Central America & Caribbean", alpha3: "GTM", lat: 14.6, lon: -90.5, population: "About 18 million", capital: "Guatemala City", language: "Spanish and Mayan languages" },
  { code: "hn", name: "Honduras", region: "Central America & Caribbean", alpha3: "HND", lat: 14.1, lon: -87.2, population: "About 11 million", capital: "Tegucigalpa", language: "Spanish" },
  { code: "lk", name: "Sri Lanka", region: "South Asia", alpha3: "LKA", lat: 6.9, lon: 79.9, population: "About 23 million", capital: "Sri Jayawardenepura Kotte", language: "Sinhala and Tamil" },
];

/** Local chapters for countries where `@/lib/chapters` names more than the country marker itself. */
export const GLOBE_CHAPTERS: Record<string, GlobeChapter[]> = {
  us: [
    { name: "YEF Orlando", city: "Orlando", leader: "Tamara Hollis", role: "Campus Leader", lat: 28.6024, lon: -81.2001 },
    { name: "YEF Philadelphia", city: "Philadelphia", leader: "James Carter", role: "Campus Leader", lat: 39.9812, lon: -75.1554 },
    { name: "YEF Atlanta", city: "Atlanta", leader: "Leader TBD", role: "Campus Leader", lat: 33.7532, lon: -84.386 },
    { name: "YEF Kansas", city: "Lawrence", leader: "Leader TBD", role: "Campus Leader", lat: 38.9543, lon: -95.2558 },
    { name: "YEF NYU", city: "New York", leader: "Leader TBD", role: "Campus Leader", lat: 40.7295, lon: -73.9965 },
  ],
  kr: [
    { name: "YEF Korea", city: "Seoul", leader: "Grace Kim", role: "Regional Director", lat: 37.5665, lon: 126.9387 },
  ],
  et: [
    { name: "YEF Ethiopia", city: "Addis Ababa", leader: "Daniel Bekele", role: "Regional Director", lat: 9.0405, lon: 38.7626 },
  ],
  to: [
    { name: "YEF Tonga", city: "Nuku'alofa", leader: "Sione Taufa", role: "Campus Leader", lat: -21.1394, lon: -175.2018 },
  ],
  in: [
    { name: "YEF Hyderabad", city: "Hyderabad", leader: "Leader TBD", role: "Campus Leader", lat: 17.46, lon: 78.33 },
  ],
};

