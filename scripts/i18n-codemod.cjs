/**
 * One-off codemod: wraps the site's English copy in t(), so every string has a
 * catalog entry. Keys are the English source text itself, which means an
 * untranslated string still renders as English rather than as a key.
 *
 *   node scripts/i18n-codemod.cjs [--dry]
 *
 * Safety net: t() is typed (english: string) => string, so anything wrapped by
 * mistake that is not a string fails `tsc` rather than shipping.
 */
const ts = require("typescript");
const fs = require("fs");
const path = require("path");

const DRY = process.argv.includes("--dry");
const ROOTS = ["src/app/(frontend)", "src/components"];

/** JSX attributes that hold prose. */
const PROSE_ATTRS = new Set([
  "alt", "title", "placeholder", "aria-label", "label", "body", "quote",
  "caption", "heading", "eyebrow", "description", "text", "note", "cta",
  "excerpt", "answer", "question", "subtitle", "kicker",
]);

/** Object fields, referenced from JSX, that hold prose. */
const PROSE_FIELDS = new Set([
  "label", "title", "body", "text", "name", "excerpt", "quote", "caption",
  "heading", "description", "eyebrow", "alt", "cta", "answer", "question",
  "subtitle", "kicker", "note", "role", "time", "tag",
]);

const ENTITIES = {
  "&rsquo;": "’", "&lsquo;": "‘", "&rdquo;": "”",
  "&ldquo;": "“", "&mdash;": "—", "&ndash;": "–",
  "&hellip;": "…", "&nbsp;": " ", "&times;": "×",
  "&middot;": "·", "&quot;": '"', "&apos;": "'", "&#39;": "'",
  "&amp;": "&", "&lt;": "<", "&gt;": ">",
  "&larr;": "←", "&rarr;": "→", "&uarr;": "↑", "&darr;": "↓",
  "&alpha;": "α", "&gamma;": "γ", "&epsilon;": "ε", "&iota;": "ι",
  "&lambda;": "λ", "&nu;": "ν", "&omicron;": "ο", "&deg;": "°",
  "&copy;": "©", "&reg;": "®", "&bull;": "•", "&sect;": "§",
};

function decode(s) {
  return s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&[a-z]+;/gi, (m) => ENTITIES[m] ?? m);
}

/** Collapses JSX text the way JSX itself does before it reaches the DOM. */
function jsxText(raw) {
  if (!raw.includes("\n")) return decode(raw);
  const lines = raw.split("\n");
  const kept = lines
    .map((l, i) => (i === 0 ? l.replace(/\s+$/, "") : l.trim()))
    .filter((l, i) => l !== "" || i === 0);
  return decode(kept.filter(Boolean).join(" ").trim());
}

const isProse = (t) =>
  t && /[A-Za-z]{2}/.test(t) && !/^[a-z][a-z0-9-]*$/.test(t) &&
  !/^(https?:|\/|#|mailto:|tel:)/.test(t);

const quote = (s) =>
  '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"';

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".tsx") && !p.includes("/components/i18n/")) files.push(p);
  }
})(ROOTS[0]);
ROOTS.slice(1).forEach((r) => (function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".tsx") && !p.includes("/components/i18n/")) files.push(p);
  }
})(r));

/** The module-scope function a node sits in — the component, not a .map callback. */
function enclosingComponent(node) {
  let found = null;
  for (let n = node.parent; n; n = n.parent) {
    if (
      ts.isFunctionDeclaration(n) ||
      ts.isArrowFunction(n) ||
      ts.isFunctionExpression(n)
    ) {
      found = n;
    }
    if (ts.isSourceFile(n)) break;
  }
  return found;
}

const catalog = new Set();
let changedFiles = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  if (/\bconst t = (await getT\(\)|useT\(\))/.test(original)) continue; // already done
  const src = ts.createSourceFile(file, original, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const edits = [];
  const needsT = new Set();
  const record = (node, start, end, text, key) => {
    catalog.add(key);
    edits.push({ start, end, text });
    const fn = enclosingComponent(node);
    if (fn) needsT.add(fn);
  };

  const literalText = (e) =>
    e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) ? e.text : null;

  (function visit(n) {
    if (ts.isJsxText(n)) {
      const text = jsxText(n.text);
      if (isProse(text)) {
        // Keep the surrounding whitespace JSX would have rendered.
        const lead = /^\s*\n/.test(n.text) ? "\n" : (/^\s/.test(n.text) ? " " : "");
        const trail = /\n\s*$/.test(n.text) ? "\n" : (/\s$/.test(n.text) ? " " : "");
        record(n, n.getStart(), n.getEnd(), `${lead}{t(${quote(text)})}${trail}`, text);
      }
    } else if (ts.isJsxAttribute(n) && PROSE_ATTRS.has(n.name.getText())) {
      const init = n.initializer;
      const direct = literalText(init);
      const inExpr = init && ts.isJsxExpression(init) ? literalText(init.expression) : null;
      const value = direct ?? inExpr;
      if (value !== null && value !== undefined && isProse(value)) {
        const decoded = decode(value);
        const start = init.getStart();
        record(n, start, init.getEnd(), `{t(${quote(decoded)})}`, decoded);
      }
    } else if (
      ts.isJsxExpression(n) &&
      n.expression &&
      !ts.isJsxAttribute(n.parent) // already handled as the attribute itself
    ) {
      const e = n.expression;
      const lit = literalText(e) === null ? null : decode(literalText(e));
      if (lit !== null && isProse(lit)) {
        record(n, e.getStart(), e.getEnd(), `t(${quote(lit)})`, lit);
      } else if (
        ts.isPropertyAccessExpression(e) &&
        PROSE_FIELDS.has(e.name.getText())
      ) {
        edits.push({ start: e.getStart(), end: e.getEnd(), text: `t(${e.getText()})` });
        const fn = enclosingComponent(n);
        if (fn) needsT.add(fn);
      }
    } else if (ts.isPropertyAssignment(n) && PROSE_ATTRS.has(n.name.getText().replace(/['"]/g, ""))) {
      // Module-scope data: collected for the catalog, wrapped where it renders.
      const lit = literalText(n.initializer);
      if (lit !== null && isProse(lit)) catalog.add(lit);
    }
    ts.forEachChild(n, visit);
  })(src);

  if (edits.length === 0) continue;

  const isClient = /^\s*["']use client["']/.test(original);
  // Bind t at the top of each component that now uses it.
  for (const fn of needsT) {
    const body = fn.body;
    if (!body || !ts.isBlock(body)) continue;
    const binding = isClient ? "\n  const t = useT();" : "\n  const t = await getT();";
    edits.push({ start: body.getStart() + 1, end: body.getStart() + 1, text: binding });
    if (!isClient) {
      const hasAsync = fn.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword);
      if (!hasAsync) {
        if (ts.isFunctionDeclaration(fn) || ts.isFunctionExpression(fn)) {
          const kw = fn.getChildren().find((c) => c.kind === ts.SyntaxKind.FunctionKeyword);
          if (kw) edits.push({ start: kw.getStart(), end: kw.getStart(), text: "async " });
        } else {
          edits.push({ start: fn.getStart(), end: fn.getStart(), text: "async " });
        }
      }
    }
  }

  let out = original;
  for (const e of edits.sort((a, b) => b.start - a.start || b.end - a.end)) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
  }

  const importLine = isClient
    ? 'import { useT } from "@/lib/i18n/client";\n'
    : 'import { getT } from "@/lib/i18n/server";\n';
  if (!out.includes(importLine.trim())) {
    const lastImport = [...out.matchAll(/^import .*?;$/gms)].pop();
    if (lastImport) {
      const at = lastImport.index + lastImport[0].length + 1;
      out = out.slice(0, at) + importLine + out.slice(at);
    } else {
      const useClient = out.match(/^\s*["']use client["'];\n/);
      const at = useClient ? useClient[0].length : 0;
      out = out.slice(0, at) + importLine + out.slice(at);
    }
  }

  changedFiles += 1;
  if (!DRY) fs.writeFileSync(file, out);
}

// Extend the catalog with prose held in src/lib data modules.
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".ts") && !p.includes("/i18n/")) {
      const src = ts.createSourceFile(p, fs.readFileSync(p, "utf8"), ts.ScriptTarget.Latest, true);
      (function visit(n) {
        if (ts.isPropertyAssignment(n) && PROSE_FIELDS.has(n.name.getText().replace(/['"]/g, ""))) {
          const init = n.initializer;
          if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) {
            if (isProse(init.text)) catalog.add(init.text);
          }
        }
        ts.forEachChild(n, visit);
      })(src);
    }
  }
})("src/lib");

const sorted = [...catalog].sort((a, b) => a.localeCompare(b));
const en = Object.fromEntries(sorted.map((k) => [k, k]));
if (!DRY) fs.writeFileSync("src/messages/en.json", JSON.stringify(en, null, 2) + "\n");

console.log(`${changedFiles} files rewritten, ${sorted.length} catalog entries`);
