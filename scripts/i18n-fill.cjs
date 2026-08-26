/**
 * Merges translations into a language's catalog keyed by their English source.
 *
 *   node scripts/i18n-fill.cjs <locale> <values.json>
 *
 * values.json is a JSON object mapping each English key to its translation.
 * Unlike i18n-apply.cjs this needs no index alignment, so it is the safe way
 * to backfill a handful of new strings into catalogs that are already full.
 * Keys the English catalog does not contain are an error rather than a silent
 * no-op, which catches copy that drifted since the chunk was written.
 */
const fs = require("fs");

const [locale, valuesPath, keysPath] = process.argv.slice(2);
if (!locale || !valuesPath) {
  console.error("usage: node scripts/i18n-fill.cjs <locale> <values.json> [keys.json]");
  process.exit(1);
}

const keys = Object.keys(JSON.parse(fs.readFileSync("src/messages/en.json", "utf8")));
const known = new Set(keys);
let values = JSON.parse(fs.readFileSync(valuesPath, "utf8"));
if (Array.isArray(values)) {
  // Array form pairs with an explicit key list, so a backfill of the same
  // strings across many locales does not have to restate the English each time.
  if (!keysPath) throw new Error("array values need a keys.json to pair with");
  const order = JSON.parse(fs.readFileSync(keysPath, "utf8"));
  if (order.length !== values.length) {
    throw new Error(`expected ${order.length} values, got ${values.length}`);
  }
  values = Object.fromEntries(order.map((k, i) => [k, values[i]]));
} else if (typeof values !== "object" || values === null) {
  throw new Error("values file must be a JSON object or array");
}

for (const [key, value] of Object.entries(values)) {
  if (!known.has(key)) throw new Error(`no such English key: ${key}`);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`empty translation for: ${key}`);
  }
}

const file = `src/messages/${locale}.json`;
const catalog = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
Object.assign(catalog, values);

// Keep the file in key order so diffs stay readable.
const ordered = {};
for (const key of keys) if (key in catalog) ordered[key] = catalog[key];
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

const translated = Object.entries(ordered).filter(([k, v]) => v !== k).length;
console.log(
  `${locale}: +${Object.keys(values).length} by key — ${translated}/${keys.length} translated`,
);
