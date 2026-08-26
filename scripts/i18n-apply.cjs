/**
 * Writes a translated catalog from a JSON array of strings in key order.
 *
 *   node scripts/i18n-apply.cjs <locale> <values.json>
 *
 * The array must have exactly one entry per English key, in the order
 * scripts/i18n-keys.cjs prints them; a mismatch is an error rather than a
 * silently misaligned catalog.
 */
const fs = require("fs");

const [locale, valuesPath] = process.argv.slice(2);
if (!locale || !valuesPath) {
  console.error("usage: node scripts/i18n-apply.cjs <locale> <values.json>");
  process.exit(1);
}

const keys = Object.keys(JSON.parse(fs.readFileSync("src/messages/en.json", "utf8")));
const values = JSON.parse(fs.readFileSync(valuesPath, "utf8"));

if (!Array.isArray(values)) throw new Error("values file must be a JSON array");
if (values.length !== keys.length) {
  throw new Error(`expected ${keys.length} values for ${locale}, got ${values.length}`);
}

const blank = values.findIndex((v) => typeof v !== "string" || v.trim() === "");
if (blank !== -1) throw new Error(`empty translation at index ${blank}: ${keys[blank]}`);

const catalog = {};
keys.forEach((key, i) => {
  catalog[key] = values[i];
});
fs.writeFileSync(`src/messages/${locale}.json`, JSON.stringify(catalog, null, 2) + "\n");
console.log(`${locale}: ${keys.length} strings`);
