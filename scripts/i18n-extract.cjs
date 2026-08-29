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
  "subtitle", "kicker", "note", "role", "time", "tag", "paragraphs",
  // Field names the page blocks standardise on, so a section's bundled
  // defaults stay visible to the catalog once its copy moves into an object.
  "imageAlt", "headingAccent", "lead", "verse", "verseAccent", "reference",
  "buttonLabel", "columns", "place", "missionBody", "portraitAlt", "signature",
]);

const files = [];
for (const root of ["src/app/(frontend)", "src/components", "src/lib"]) {
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      // src/lib/i18n is the runtime itself; src/components/i18n is UI with copy.
      else if (/\.tsx?$/.test(p) && !p.startsWith(path.join("src", "lib", "i18n"))) files.push(p);
    }
  })(root);
}

const catalog = new Set();
/** Strings reached from "use client" components, which must be sent to the browser. */
const clientKeys = new Set();
const literal = (e) =>
  e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) ? e.text : null;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const isClient = /^\s*["']use client["']/.test(text);
  const src = ts.createSourceFile(
    file, text, ts.ScriptTarget.Latest, true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  // A field name only needs to be in PROSE_FIELDS if nothing in this same
  // file ever calls t(something.<thatField>) — when it does, that call site
  // is the proof the field holds prose, so pick it up automatically instead
  // of relying on someone remembering to extend the whitelist by hand.
  const fileProseFields = new Set(PROSE_FIELDS);
  (function findFieldsPassedToT(n) {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      n.expression.text === "t"
    ) {
      for (const arg of n.arguments) {
        if (ts.isPropertyAccessExpression(arg)) fileProseFields.add(arg.name.text);
      }
    }
    ts.forEachChild(n, findFieldsPassedToT);
  })(src);

  (function visit(n) {
    if (
      ts.isCallExpression(n) &&
      ts.isIdentifier(n.expression) &&
      n.expression.text === "t"
    ) {
      for (const arg of n.arguments) {
        const direct = literal(arg);
        if (direct) {
          catalog.add(direct);
          if (isClient) clientKeys.add(direct);
        }
        // t(cond ? "a" : "b")
        else if (ts.isConditionalExpression(arg)) {
          for (const branch of [arg.whenTrue, arg.whenFalse]) {
            const s = literal(branch);
            if (s) {
              catalog.add(s);
              if (isClient) clientKeys.add(s);
            }
          }
        }
      }
    } else if (
      ts.isPropertyAssignment(n) &&
      fileProseFields.has(n.name.getText().replace(/['"]/g, ""))
    ) {
      // A prose field is usually one string, but some hold an array of
      // paragraphs; both reach the page through t(), so collect either shape.
      const values = ts.isArrayLiteralExpression(n.initializer)
        ? n.initializer.elements.map(literal)
        : [literal(n.initializer)];
      for (const s of values) {
        if (s && /[A-Za-z]{2}/.test(s) && !/^(https?:|\/|#|mailto:)/.test(s)) {
          catalog.add(s);
          // Data arrays are rendered as t(item.title); if the file is a client
          // component, the browser needs those strings too.
          if (isClient) clientKeys.add(s);
        }
      }
    }
    ts.forEachChild(n, visit);
  })(src);
}

// Strings the scanner cannot see because they come from data rather than a
// literal t("...") call — the region headings in the country picker.
const extra = JSON.parse(fs.readFileSync("src/messages/_extra-keys.json", "utf8"));
for (const key of extra) {
  catalog.add(key);
  clientKeys.add(key);
}

const keys = [...catalog].sort((a, b) => a.localeCompare(b));
fs.writeFileSync(
  "src/messages/en.json",
  JSON.stringify(Object.fromEntries(keys.map((k) => [k, k])), null, 2) + "\n",
);
fs.writeFileSync(
  "src/messages/_client-keys.json",
  JSON.stringify([...clientKeys].filter((k) => catalog.has(k)).sort((a, b) => a.localeCompare(b)), null, 2) + "\n",
);
console.log(`${keys.length} strings, ${clientKeys.size} of them needed in the browser`);
