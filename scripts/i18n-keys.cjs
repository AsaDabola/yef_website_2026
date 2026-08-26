/**
 * Prints the English keys in catalog order, numbered, for translating.
 *
 *   node scripts/i18n-keys.cjs [from] [to]
 */
const fs = require("fs");
const keys = Object.keys(JSON.parse(fs.readFileSync("src/messages/en.json", "utf8")));
const from = Number(process.argv[2] ?? 0);
const to = Number(process.argv[3] ?? keys.length);
keys.slice(from, to).forEach((k, i) => console.log(`${from + i}\t${JSON.stringify(k)}`));
