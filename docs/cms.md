# Editing news and events

The News page and the home page's "Around the Movement" strip both read from a
[Payload](https://payloadcms.com) admin that runs inside this site at `/admin`.
An editor signs in there, writes a post, and it appears on the site within a
minute — no deploy, no developer.

## For editors

Go to `https://<the site>/admin` and sign in.

**News & Events** is the only collection you normally need.

- **Create New** writes a post. Title, cover photo, excerpt and published date
  are required; the Article field is the full body and can be left empty for a
  short notice.
- **Slug** is the web address, so `yef-tonga-romans` becomes
  `/news/yef-tonga-romans`. Keep it lowercase with hyphens, and don't change it
  after publishing or existing links will break.
- **Category** (News / Story / Event) drives the filter tabs on the News page.
- **Show on the home page** puts the post in the Around the Movement strip. The
  three most recent ticked posts are shown, so ticking a fourth pushes the
  oldest out. **Home page label** is the small caps line above the title there
  (e.g. FIELD REPORT); leave it empty to use the category.
- **Save Draft** keeps a post out of sight; **Publish changes** puts it live.
  Every save is kept under **Versions**, so a bad edit can be rolled back.

Photos live under **Media**. Every image needs alt text — it's what a screen
reader announces and what shows if the photo fails to load.

## For developers

### Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | What it is |
| --- | --- |
| `DATABASE_URI` | Postgres connection string. On Vercel this is the URL from Vercel Postgres / Neon. |
| `PAYLOAD_SECRET` | Any long random string. Admin sessions are signed with it, so keep it stable — changing it signs everyone out. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token. Only needed in deployed environments: Vercel's filesystem is read-only, so uploads have to go to Blob. Locally, leave it empty and uploads land in `public/media`. |

Without `DATABASE_URI` and `PAYLOAD_SECRET` the site still builds and runs — the
News page and the movement strip fall back to the copy in `src/lib/news.ts` and
`src/lib/posts.ts`. That keeps the marketing pages deployable before anyone has
provisioned a database.

### First run

```bash
npm run migrate   # create the tables
npm run dev       # then open /admin and create the first user
npm run seed      # move the articles bundled in src/lib/news.ts into the CMS
```

`npm run seed` is safe to re-run: it matches on slug and skips posts that
already exist. Run it once before the first editor publishes anything —
otherwise the News page will show only the new post, because CMS content
replaces the bundled list rather than adding to it.

### Deploying

Vercel needs the three environment variables above, and `npm run migrate` has to
run against the production database before the first deploy that includes a
schema change. Payload's Postgres adapter pushes schema automatically in
development only.

### Changing the shape of a post

Fields live in `src/payload/collections/`. After editing them:

```bash
npm run generate:types      # refresh src/payload-types.ts
npm run generate:importmap  # refresh the admin's component map
npm run migrate:create      # write a migration for the schema change
```

The import map matters: without it the rich text editor renders as an empty
field. Regenerate it whenever a collection gains a field type the admin hasn't
loaded before.
