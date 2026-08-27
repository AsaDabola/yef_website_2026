/**
 * Adds `await applyRequestLocale(params)` to every page under
 * [country]/[locale], so a page that renders before its layout still knows
 * which language it is in.
 *
 *   node scripts/i18n-page-locale.cjs
 */
const ts = require("typescript");
const fs = require("fs");
const path = require("path");

const ROOT = "src/app/(frontend)/[country]/[locale]";
const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name === "page.tsx") pages.push(p);
  }
})(ROOT);

let changed = 0;
for (const file of pages) {
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("applyRequestLocale(params)")) continue;

  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const fn = sf.statements.find(
    (s) =>
      ts.isFunctionDeclaration(s) &&
      s.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword),
  );
  if (!fn || !fn.body) {
    console.warn(`skipped (no default export function): ${file}`);
    continue;
  }

  const edits = [];
  const hasParams = fn.parameters.length > 0;
  if (!hasParams) {
    edits.push({
      at: fn.parameters.pos,
      text: "{ params }: { params: LocaleParams }",
    });
  }
  edits.push({ at: fn.body.getStart() + 1, text: "\n  await applyRequestLocale(params);" });
  if (!fn.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword)) {
    const kw = fn.getChildren().find((c) => c.kind === ts.SyntaxKind.FunctionKeyword);
    edits.push({ at: kw.getStart(), text: "async " });
  }

  for (const e of edits.sort((a, b) => b.at - a.at)) {
    src = src.slice(0, e.at) + e.text + src.slice(e.at);
  }

  const importLine = hasParams
    ? 'import { applyRequestLocale } from "@/lib/i18n/request";\n'
    : 'import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";\n';
  const lastImport = [...src.matchAll(/^import .*?;$/gms)].pop();
  const at = lastImport.index + lastImport[0].length + 1;
  src = src.slice(0, at) + importLine + src.slice(at);

  fs.writeFileSync(file, src);
  changed += 1;
}
console.log(`${changed}/${pages.length} pages updated`);
