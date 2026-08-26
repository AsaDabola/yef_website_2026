/**
 * Merges a chunk of translations into a language's catalog.
 *
 *   node scripts/i18n-apply.cjs <locale> <values.json> [fromIndex]
 *
 * values.json is a JSON array of strings that lines up with the English keys
 * starting at fromIndex (default 0), in the order scripts/i18n-keys.cjs prints
 * them. Writing past the end of the key list is an error rather than a
 * silently misaligned catalog.
 */
const fs = require("fs");

const [locale, valuesPath, fromArg] = process.argv.slice(2);
if (!locale || !valuesPath) {
  console.error("usage: node scripts/i18n-apply.cjs <locale> <values.json> [fromIndex]");
  process.exit(1);
}
const from = Number(fromArg ?? 0);

const keys = Object.keys(JSON.parse(fs.readFileSync("src/messages/en.json", "utf8")));
const values = JSON.parse(fs.readFileSync(valuesPath, "utf8"));
if (!Array.isArray(values)) throw new Error("values file must be a JSON array");
if (from + values.length > keys.length) {
  throw new Error(
    `chunk runs past the end: ${from} + ${values.length} > ${keys.length}`,
  );
}
const blank = values.findIndex((v) => typeof v !== "string" || v.trim() === "");
if (blank !== -1) {
  throw new Error(`empty translation at index ${from + blank}: ${keys[from + blank]}`);
}

const file = `src/messages/${locale}.json`;
const catalog = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
values.forEach((value, i) => {
  catalog[keys[from + i]] = value;
});

// Keep the file in key order so diffs stay readable.
const ordered = {};
for (const key of keys) if (catalog[key] !== undefined) ordered[key] = catalog[key];
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

const done = keys.filter((k) => ordered[k] && ordered[k] !== k).length;
console.log(`${locale}: +${values.length} at ${from} — ${done}/${keys.length} translated`);
