/**
 * Rebuilds src/messages/en.json from the t("...") calls in the source, plus
 * the prose held in the src/lib data modules that pages render through t().
 *
 *   node scripts/i18n-extract.cjs
 *
 * Run this after adding or editing copy; scripts/i18n-status.cjs then shows
 * which languages are missing the new strings.
 */
const ts = require("typescript");
const fs = require("fs");
const path = require("path");

/**
 * Object fields that hold prose. Data arrays sit at module scope, where t()
 * cannot be called, so pages render them as t(item.title) — the strings still
 * need to reach the catalog from their definitions.
 */
const PROSE_FIELDS = new Set([
  "label", "title", "body", "text", "name", "excerpt", "quote", "caption",
  "heading", "description", "eyebrow", "alt", "cta", "answer", "question",
  "subtitle", "kicker", "note", "role", "time", "tag",
]);

const files = [];
for (const root of ["src/app/(frontend)", "src/components", "src/lib"]) {
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.tsx?$/.test(p) && !p.includes(`${path.sep}i18n${path.sep}`)) files.push(p);
    }
  })(root);
}

const catalog = new Set();
const literal = (e) =>
  e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) ? e.text : null;

for (const file of files) {
  const src = ts.createSourceFile(
    file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  (function visit(n) {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      n.expression.text === "t"
    ) {
      for (const arg of n.arguments) {
        const direct = literal(arg);
        if (direct) catalog.add(direct);
        // t(cond ? "a" : "b")
        else if (ts.isConditionalExpression(arg)) {
          for (const branch of [arg.whenTrue, arg.whenFalse]) {
            const s = literal(branch);
            if (s) catalog.add(s);
          }
        }
      }
    } else if (
      ts.isPropertyAssignment(n) &&
      PROSE_FIELDS.has(n.name.getText().replace(/['"]/g, ""))
    ) {
      const s = literal(n.initializer);
      if (s && /[A-Za-z]{2}/.test(s) && !/^(https?:|\/|#|mailto:)/.test(s)) catalog.add(s);
    }
    ts.forEachChild(n, visit);
  })(src);
}

const keys = [...catalog].sort((a, b) => a.localeCompare(b));
fs.writeFileSync(
  "src/messages/en.json",
  JSON.stringify(Object.fromEntries(keys.map((k) => [k, k])), null, 2) + "\n",
);
console.log(`${keys.length} strings`);
