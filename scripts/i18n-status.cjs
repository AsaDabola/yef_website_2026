/**
 * Reports which languages have a catalog and how complete each one is.
 *
 *   node scripts/i18n-status.cjs
 */
const fs = require("fs");
const path = require("path");
const { locales } = require("./_locales.cjs");

const keys = Object.keys(JSON.parse(fs.readFileSync("src/messages/en.json", "utf8")));
const rows = locales.map((l) => {
  const file = path.join("src/messages", `${l.code}.json`);
  if (l.code === "en") return { ...l, done: keys.length };
  if (!fs.existsSync(file)) return { ...l, done: 0 };
  const cat = JSON.parse(fs.readFileSync(file, "utf8"));
  const done = keys.filter((k) => cat[k] && cat[k] !== k).length;
  return { ...l, done };
});

for (const r of rows) {
  const pct = Math.round((r.done / keys.length) * 100);
  console.log(`${r.code.padEnd(4)} ${String(pct).padStart(3)}%  ${r.done}/${keys.length}  ${r.english}`);
}
const complete = rows.filter((r) => r.done === keys.length).length;
console.log(`\n${complete}/${rows.length} languages complete`);
