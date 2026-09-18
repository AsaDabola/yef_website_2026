# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev                  # Next dev server; Payload pushes schema to the local DB
npm run build                # see the warning below before trusting this
npm run lint                 # eslint
npm run migrate              # apply migrations in src/migrations
npm run migrate:create       # generate one after changing a collection
npm run seed                 # payload run src/payload/seed.ts — idempotent, matches on slug/route
npm run generate:types       # regenerate src/payload-types.ts
npm run generate:importmap   # regenerate the admin import map after adding an admin component
```

There is **no test suite**. Verification here means: `npx tsc --noEmit`, `npm run lint`, a
production build, and fetching the rendered page and grepping its HTML. A local build alone
has repeatedly been insufficient — see Deployment.

Translations have their own scripts (`node scripts/i18n-*.cjs`); see Languages.

### The build script hides failures

```
payload generate:importmap
  && ([ -n "$DATABASE_URI" ] && payload migrate || true)
  && ([ -n "$DATABASE_URI" ] && payload run src/payload/seed.ts || true)
  && next build
```

Both `|| true` branches mean a build with no `DATABASE_URI` **silently skips migrate and
seed** and still exits 0. Preview builds have no database, so they always skip. Never read a
green build as "the migration ran".

## Architecture

Next 16 (App Router) and Payload 3 in one deployment: `src/app/(frontend)` is the public site,
`src/app/(payload)` is `/admin` and Payload's REST/GraphQL. Postgres, with media on Vercel Blob
in deployed environments and `public/media` locally. Env vars are documented in `docs/cms.md`;
without `DATABASE_URI` + `PAYLOAD_SECRET` the site still builds and falls back to bundled copy.

### Every page is country × locale

Public routes live under `/[country]/[locale]/…`. 71 countries in `src/lib/i18n/countries.ts`,
plus `int` (the headquarters site, `INTERNATIONAL` in `i18n/constants.ts`), and 48 locales. It is
not a cross product — each country lists only the languages it serves, so there are ~102
country/language pairs, and roughly 3,000 country/language/page combinations across the site.
`src/middleware.ts` resolves and redirects; only three pairs are prerendered
(`generateStaticParams` in `[country]/[locale]/layout.tsx`), the rest render on demand and are
then cached.

That scale drives a hard constraint: **nothing in a page may read `headers()` or `cookies()`**,
because it would opt every page out of static rendering. Pages call
`applyRequestLocale(params)` and the country/locale are published through a React `cache()`
store instead (`src/lib/i18n/request.ts`). Respect this when adding pages.

### Pages come from three places, and this is the main trap

A public page's content can come from the CMS, from code, or from both — and getting this wrong
produces the bug that has bitten this repo repeatedly: **an editor saves, publishes, and the site
does not change.**

- **CMS-rendered pages** call `getLayout(route)` and render blocks (`src/payload/blocks/`).
  `getLayout` falls back country → `int` → the bundled `defaultLayouts` in `src/lib/pages.ts`.
- **Coded pages** are React, because their designs (sticky sub-menus, timelines, two-column
  splits, card grids) have no block equivalent. They take editable values field by field:
  `getPageHeader(route)` for the banner photo/heading/intro, `getPageProse(route)` for body copy.
- The **seed writes the same words into the CMS** for every page, so the Pages screen always
  looks populated — whether or not anything reads it back.

So a coded page that does not call `getPageProse` shows hardcoded copy while the admin shows
editable fields for it, and the live preview renders the coded page, so the admin and the preview
agree with each other and disagree with the site. Before concluding "caching", check whether the
component actually reads the record.

Currently wired: `who-we-are/history`, `who-we-are/welcome`. Still coded-only:
`who-we-are/mission` and the eight `get-involved/*` pages — their designs encode structure
(bulleted lists, two-column splits, galleries) that a flat paragraph list cannot carry, so they
need blocks shaped like their designs rather than positional mapping.

`Pages.route` is a fixed `select` enum — adding a page means adding an option **and** a
migration for the enum value.

### Caching and revalidation

Pages are static and cached indefinitely (only `news` and `news/[slug]` set `revalidate = 60`).
`src/payload/hooks/revalidate.ts` calls `revalidatePath("/", "layout")` from `afterChange` on
Pages and Resources, which invalidates everything beneath the root layout. This has been verified
working against a production build: publishing invalidates the cache and the next request serves
the new content. Note it is gated on `_status === "published"`, so **Save Draft revalidates
nothing** — that is intended.

### Languages

`src/messages/<locale>.json`, one per locale. **The English sentence is the key**, and
`translate()` returns the key when a locale has no entry, so a gap renders as English rather than
breaking.

The catalogs are not machine-translated by any service — no translation API is wired in. The
English key list is extracted from the source, a model writes the translations in chunks, and
scripts merge them:

```bash
node scripts/i18n-extract.cjs          # rebuild en.json from t("…") calls + src/lib prose data
node scripts/i18n-keys.cjs [from] [to] # print keys in order, numbered, for translating
node scripts/i18n-fill.cjs <locale> values.json   # merge keyed by English string — PREFER THIS
node scripts/i18n-apply.cjs <locale> values.json [fromIndex]  # merge a positional array
node scripts/i18n-status.cjs           # completeness per language
node scripts/i18n-check.cjs            # fail on drift or suspected misalignment
```

Prefer `i18n-fill` (keyed). `i18n-apply` is positional: a dropped value shifts every later
translation onto the wrong key, which has actually happened here and required a commit to repair
52 misaligned Romansh entries. Always run `i18n-check.cjs` afterwards.

Two things to know before promising a translated site: the catalogs are unreviewed model output
across ~47 languages, and **CMS-entered text is not translated at all**. There is no
`page_translations` table and no Payload localized fields; CMS prose goes through the same `t()`
lookup, so it is translated only when the exact English sentence already exists as a catalog key.
Edit a paragraph in the admin and it renders in English on every country site.

### Migrations

`src/migrations/` with every migration registered in `src/migrations/index.ts`. Payload's adapter
pushes schema **in development only**, so a field added to a collection reaches a local database
by itself and never reaches production.

The Postgres adapter joins every block table into one query per page, so **one missing block
table blanks the entire admin list**, not just the block. A schema change and the code that needs
it must ship together.

## Deployment

Vercel project `yef-website-2026`; production currently builds from branch
`claude/yef-site-figma-design-az9asg`, fed by PRs from working branches. Two hazards, both of
which have taken this site down:

1. Preview builds have no `DATABASE_URI`, so the `|| true` above skips the migration.
2. **Promoting a preview deployment to production reuses the built artifact without rebuilding**,
   so migrations never run for it.

Together those mean code can reach production against an unmigrated database. When a schema
change must go live, force a real production build (a merge into the production branch) rather
than promoting a preview, and read the build log to confirm the migration actually ran.

When diagnosing a live problem, read Vercel build logs and runtime errors line by line rather
than trusting `state: READY`, and grep the live HTML for the specific string rather than trusting
a local build.
