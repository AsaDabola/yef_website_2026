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
  // A dropped or duplicated entry shifts every translation after it onto the
  // wrong key. That shows up as a wild length mismatch — but "wild" depends on
  // the language: Korean renders the same sentence in half the characters of
  // English, so the test is against this catalog's own median ratio rather
  // than an absolute one.
  const measured = keys
    .filter(
      (k) =>
        k.length > 25 &&
        typeof catalog[k] === "string" &&
        // A proper noun left in English is a deliberate pass-through, not drift.
        catalog[k] !== k,
    )
    .map((k) => ({ key: k, ratio: catalog[k].length / k.length }));
  const sorted = measured.map((m) => m.ratio).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] || 1;
  // The upper bound is loose because a translated page title keeps the English
  // organisation name, which inflates the ratio in a compact script.
  const shifted = measured.filter(
    (m) => m.ratio < median * 0.4 || m.ratio > median * 4,
  );
  if (shifted.length) {
    problems += 1;
    console.log(
      `${file}: ${shifted.length} entries look misaligned (median ratio ${median.toFixed(2)})`,
    );
    for (const { key } of shifted.slice(0, 3)) {
      console.log(`  ${JSON.stringify(key).slice(0, 60)}`);
      console.log(`    => ${JSON.stringify(catalog[key]).slice(0, 60)}`);
    }
  }
  if (stale.length || missing.length) {
    problems += 1;
    console.log(`${file}: ${missing.length} missing, ${stale.length} no longer in the source`);
    for (const k of stale.slice(0, 3)) console.log(`  stale: ${JSON.stringify(k).slice(0, 90)}`);
  }
}
console.log(problems === 0 ? "all catalogs match the English keys" : `${problems} catalogs need attention`);
process.exit(problems === 0 ? 0 : 1);
