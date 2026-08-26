/**
 * The 60-country fellowship platform, transcribed from
 * "Fellowship Websites Status – 60 Countries".
 *
 * `code` is the ISO 3166-1 alpha-2 code that becomes the country's subdomain
 * (kr.<domain>, br.<domain>). `locales` are the languages that country's site
 * offers, most-used first; the first entry is the default the site opens in.
 *
 * Two codes in the source sheet were transposed — it lists Malaysia as `ms`
 * (a language code) and Myanmar as `my`. They are corrected here to `my` and
 * `mm`, the real ISO country codes.
 */
export type Country = {
  code: string;
  name: string;
  region: Region;
  /** Most-used language first; that one is the site's default. */
  locales: string[];
  /** Neighbouring countries this site also serves, per the source list. */
  alsoServes?: string[];
  /** In the G20 group of the source list rather than the M40 group. */
  g20?: boolean;
  /**
   * Keep this name as written instead of using the browser's localized region
   * name — for entries that are not simply a country.
   */
  ownName?: boolean;
};

export type Region =
  | "Africa"
  | "Asia-Pacific"
  | "Central America & Caribbean"
  | "Commonwealth of Independent States"
  | "Europe"
  | "Middle East & North Africa"
  | "North America"
  | "Oceania"
  | "South America"
  | "South Asia"
  | "Southeast Asia";

export const countries: Country[] = [
  // G20 mission countries
  {
    code: "br",
    name: "Brazil",
    region: "South America",
    locales: ["pt"],
    g20: true,
  },
  {
    code: "ca",
    name: "Canada",
    region: "North America",
    locales: ["en", "fr"],
    g20: true,
  },
  {
    code: "co",
    name: "Colombia",
    region: "South America",
    locales: ["es"],
    alsoServes: ["ve", "ec", "pa"],
    g20: true,
  },
  { code: "fr", name: "France", region: "Europe", locales: ["fr"], g20: true },
  { code: "de", name: "Germany", region: "Europe", locales: ["de"], g20: true },
  {
    code: "in",
    name: "India",
    region: "South Asia",
    locales: ["hi", "en"],
    g20: true,
  },
  {
    code: "id",
    name: "Indonesia",
    region: "Southeast Asia",
    locales: ["id"],
    g20: true,
  },
  { code: "it", name: "Italy", region: "Europe", locales: ["it"], g20: true },
  {
    code: "jp",
    name: "Japan",
    region: "Asia-Pacific",
    locales: ["ja"],
    g20: true,
  },
  {
    code: "ke",
    name: "East Africa Federation",
    region: "Africa",
    locales: ["en", "sw", "fr", "rw", "rn"],
    alsoServes: ["tz", "ug", "rw", "bi", "ss"],
    g20: true,
    ownName: true,
  },
  {
    code: "kr",
    name: "South Korea",
    region: "Asia-Pacific",
    locales: ["ko"],
    g20: true,
  },
  {
    code: "mx",
    name: "Mexico",
    region: "North America",
    locales: ["es"],
    g20: true,
  },
  { code: "ng", name: "Nigeria", region: "Africa", locales: ["en"], g20: true },
  {
    code: "au",
    name: "Australia",
    region: "Oceania",
    locales: ["en"],
    g20: true,
  },
  { code: "ru", name: "Russia", region: "Europe", locales: ["ru"], g20: true },
  {
    code: "za",
    name: "South Africa",
    region: "Africa",
    locales: ["en", "af", "zu", "xh"],
    g20: true,
  },
  { code: "es", name: "Spain", region: "Europe", locales: ["es"], g20: true },
  { code: "tr", name: "Türkiye", region: "Europe", locales: ["tr"], g20: true },
  {
    code: "gb",
    name: "United Kingdom",
    region: "Europe",
    locales: ["en"],
    g20: true,
  },
  {
    code: "us",
    name: "United States",
    region: "North America",
    locales: ["en"],
    g20: true,
  },

  // M40 — Africa
  { code: "ao", name: "Angola", region: "Africa", locales: ["pt"] },
  { code: "cm", name: "Cameroon", region: "Africa", locales: ["fr", "en"] },
  {
    code: "cd",
    name: "Democratic Republic of the Congo",
    region: "Africa",
    locales: ["fr"],
  },
  { code: "et", name: "Ethiopia", region: "Africa", locales: ["am", "en"] },
  { code: "gh", name: "Ghana", region: "Africa", locales: ["en"] },
  { code: "ci", name: "Côte d’Ivoire", region: "Africa", locales: ["fr"] },
  { code: "mg", name: "Madagascar", region: "Africa", locales: ["mg", "fr"] },
  { code: "mz", name: "Mozambique", region: "Africa", locales: ["pt"] },
  { code: "zm", name: "Zambia", region: "Africa", locales: ["en"] },

  // M40 — Europe
  { code: "at", name: "Austria", region: "Europe", locales: ["de"] },
  {
    code: "be",
    name: "Belgium",
    region: "Europe",
    locales: ["nl", "fr", "de"],
  },
  { code: "cz", name: "Czechia", region: "Europe", locales: ["cs"] },
  { code: "sk", name: "Slovakia", region: "Europe", locales: ["sk"] },
  { code: "gr", name: "Greece", region: "Europe", locales: ["el"] },
  { code: "hu", name: "Hungary", region: "Europe", locales: ["hu"] },
  { code: "nl", name: "Netherlands", region: "Europe", locales: ["nl"] },
  { code: "pl", name: "Poland", region: "Europe", locales: ["pl"] },
  { code: "pt", name: "Portugal", region: "Europe", locales: ["pt"] },
  { code: "ro", name: "Romania", region: "Europe", locales: ["ro"] },
  { code: "se", name: "Sweden", region: "Europe", locales: ["sv"] },
  {
    code: "ch",
    name: "Switzerland",
    region: "Europe",
    locales: ["de", "fr", "it", "rm"],
  },
  { code: "ua", name: "Ukraine", region: "Europe", locales: ["uk"] },

  // M40 — Central America & the Caribbean
  {
    code: "do",
    name: "Dominican Republic",
    region: "Central America & Caribbean",
    locales: ["es"],
  },
  {
    code: "ht",
    name: "Haiti",
    region: "Central America & Caribbean",
    locales: ["fr", "ht"],
  },

  // M40 — South America
  { code: "ar", name: "Argentina", region: "South America", locales: ["es"] },
  { code: "cl", name: "Chile", region: "South America", locales: ["es"] },
  { code: "pe", name: "Peru", region: "South America", locales: ["es"] },

  // M40 — Commonwealth of Independent States
  {
    code: "kz",
    name: "Kazakhstan",
    region: "Commonwealth of Independent States",
    locales: ["kk", "ru"],
  },

  // M40 — Middle East & North Africa
  {
    code: "eg",
    name: "Egypt",
    region: "Middle East & North Africa",
    locales: ["ar"],
  },
  {
    code: "il",
    name: "Israel",
    region: "Middle East & North Africa",
    locales: ["he", "ar"],
  },
  {
    code: "ae",
    name: "United Arab Emirates",
    region: "Middle East & North Africa",
    locales: ["ar"],
  },

  // M40 — Oceania
  { code: "nz", name: "New Zealand", region: "Oceania", locales: ["en"] },
  { code: "fj", name: "Fiji", region: "Oceania", locales: ["en", "fj", "hif"] },

  // M40 — South Asia
  { code: "bd", name: "Bangladesh", region: "South Asia", locales: ["bn"] },
  { code: "np", name: "Nepal", region: "South Asia", locales: ["ne"] },
  { code: "pk", name: "Pakistan", region: "South Asia", locales: ["ur", "en"] },

  // M40 — Southeast Asia
  { code: "my", name: "Malaysia", region: "Southeast Asia", locales: ["ms"] },
  { code: "mm", name: "Myanmar", region: "Southeast Asia", locales: ["my"] },
  {
    code: "ph",
    name: "Philippines",
    region: "Southeast Asia",
    locales: ["fil", "en"],
  },
  {
    code: "sg",
    name: "Singapore",
    region: "Southeast Asia",
    locales: ["en", "ms", "zh", "ta"],
  },
  { code: "th", name: "Thailand", region: "Southeast Asia", locales: ["th"] },
  { code: "vn", name: "Vietnam", region: "Southeast Asia", locales: ["vi"] },

  // M40 — Asia-Pacific
  { code: "mn", name: "Mongolia", region: "Asia-Pacific", locales: ["mn"] },
  { code: "tw", name: "Taiwan", region: "Asia-Pacific", locales: ["zh"] },

  // Additional priority / replacement countries
  {
    code: "rw",
    name: "Rwanda",
    region: "Africa",
    locales: ["rw", "en", "fr", "sw"],
  },
  {
    code: "gt",
    name: "Guatemala",
    region: "Central America & Caribbean",
    locales: ["es"],
  },
  {
    code: "hn",
    name: "Honduras",
    region: "Central America & Caribbean",
    locales: ["es"],
  },
  {
    code: "lk",
    name: "Sri Lanka",
    region: "South Asia",
    locales: ["si", "ta"],
  },
];

export const countryCodes = countries.map((c) => c.code);

const byCode = new Map(countries.map((c) => [c.code, c]));

export function getCountry(
  code: string | undefined | null,
): Country | undefined {
  return code ? byCode.get(code) : undefined;
}

/** The language a country's site opens in. */
export function defaultLocaleFor(code: string): string {
  return getCountry(code)?.locales[0] ?? "en";
}

/** Countries grouped for the picker, alphabetical within each region. */
export function countriesByRegion(): [Region, Country[]][] {
  const groups = new Map<Region, Country[]>();
  for (const c of countries) {
    const list = groups.get(c.region) ?? [];
    list.push(c);
    groups.set(c.region, list);
  }
  return [...groups.entries()]
    .map(
      ([region, list]) =>
        [region, [...list].sort((a, b) => a.name.localeCompare(b.name))] as [
          Region,
          Country[],
        ],
    )
    .sort((a, b) => a[0].localeCompare(b[0]));
}
