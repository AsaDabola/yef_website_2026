/**
 * Fails if any catalog has drifted from the English key list.
 *
 *   node scripts/i18n-check.cjs
 */
const fs = require("fs");
const path = require("path");

const keys = Object.keys(JSON.parse(fs.readFileSync("src/messages/en.json", "utf8")));
const known = new Set(keys);
let problems = 0;

for (const file of fs.readdirSync("src/messages")) {
  if (file === "en.json" || file.startsWith("_") || !file.endsWith(".json")) continue;
  const catalog = JSON.parse(fs.readFileSync(path.join("src/messages", file), "utf8"));
  const stale = Object.keys(catalog).filter((k) => !known.has(k));
  const missing = keys.filter((k) => catalog[k] === undefined);
  if (stale.length || missing.length) {
    problems += 1;
    console.log(`${file}: ${missing.length} missing, ${stale.length} no longer in the source`);
    for (const k of stale.slice(0, 3)) console.log(`  stale: ${JSON.stringify(k).slice(0, 90)}`);
  }
}
console.log(problems === 0 ? "all catalogs match the English keys" : `${problems} catalogs need attention`);
process.exit(problems === 0 ? 0 : 1);
