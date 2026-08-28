import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsArticles } from "@/lib/news";
import type { Page } from "@/payload-types";
import newsRealImages from "@/payload/newsRealImages.json";

const realImages = newsRealImages as Record<string, { url: string; filename: string }>;

// Duplicated from src/lib/pages.ts rather than imported: that module pulls in
// "server-only", which only resolves inside Next's bundler, not this
// standalone `payload run` script. Keep these two in sync with lib/pages.ts
// if either default layout changes.
const defaultHomeLayout = [
  { blockType: "hero" },
  { blockType: "campusFinder" },
  { blockType: "about" },
  { blockType: "mission" },
  { blockType: "proof" },
  { blockType: "getInvolved" },
  { blockType: "testimonials" },
  { blockType: "giving" },
  { blockType: "movement" },
  { blockType: "signup" },
];

const defaultWhoWeAreLayout = [
  { blockType: "whoWeAreHero" },
  { blockType: "introCards" },
  { blockType: "visionMission" },
  { blockType: "storiesNews" },
  { blockType: "missionSchoolCta" },
];

/**
 * Moves what the site already ships with into the CMS, so /admin shows real,
 * editable documents instead of an empty list backed by bundled fallbacks.
 * Safe to re-run: everything is matched on slug/route and skipped if it
 * already exists, so re-running after an editor has made changes won't
 * overwrite their work.
 *
 *   npm run seed
 *
 * Also runs automatically at the end of every production build (see
 * package.json), since that is the only place with real database access —
 * this sandbox can't reach the live Postgres instance directly.
 */

type Payload = Awaited<ReturnType<typeof getPayload>>;

/** Uploads a public/ file as Media once per source path, reusing the same
 *  document for every article that shares a placeholder image. */
function mediaUploader(payload: Payload) {
  const cache = new Map<string, number>();
  return async (publicPath: string, alt: string): Promise<number> => {
    const cached = cache.get(publicPath);
    if (cached !== undefined) return cached;

    const filePath = path.join(process.cwd(), "public", publicPath);
    const ext = path.extname(filePath).slice(1);
    const mimetype =
      ext === "jpg" ? "image/jpeg" : ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    const media = await payload.create({
      collection: "media",
      data: { alt, country: "int" },
      file: {
        data: await fs.readFile(filePath),
        name: path.basename(filePath),
        mimetype,
        size: (await fs.stat(filePath)).size,
      },
    });
    const id = Number(media.id);
    cache.set(publicPath, id);
    return id;
  };
}

/** Uploads an image fetched from a remote URL as Media once per URL — used
 *  for the real WordPress-hosted photos, which are more authoritative than
 *  the Drive-matched placeholders under public/. */
function remoteMediaUploader(payload: Payload) {
  const cache = new Map<string, number>();
  return async (url: string, filename: string, alt: string): Promise<number> => {
    const cached = cache.get(url);
    if (cached !== undefined) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const ext = path.extname(filename).slice(1).toLowerCase();
    const mimetype =
      ext === "jpg" ? "image/jpeg" : ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    const media = await payload.create({
      collection: "media",
      data: { alt, country: "int" },
      file: { data: buffer, name: filename, mimetype, size: buffer.length },
    });
    const id = Number(media.id);
    cache.set(url, id);
    return id;
  };
}

const POST_CATEGORIES = new Set(["News", "Story", "Event"]);

async function seedPosts(payload: Payload) {
  const uploadMedia = mediaUploader(payload);
  const uploadRemoteMedia = remoteMediaUploader(payload);
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const article of newsArticles) {
    try {
      // The real photo hosted on the original WordPress site, when we have
      // one for this slug, always wins over the Drive-matched placeholder.
      const real = realImages[article.slug];
      const expectedFilename = real ? real.filename : path.basename(article.image);
      const getMedia = () =>
        real
          ? uploadRemoteMedia(real.url, real.filename, article.title)
          : uploadMedia(article.image, article.title);

      const existing = await payload.find({
        collection: "posts",
        where: { slug: { equals: article.slug } },
        limit: 1,
        depth: 1,
      });
      if (existing.docs.length > 0) {
        const doc = existing.docs[0];
        const currentImage = doc?.image;
        const currentFilename =
          typeof currentImage === "object" && currentImage
            ? currentImage.filename
            : undefined;
        // The background photo-matching pass (and now the real WordPress
        // export) keeps replacing placeholders with better photos after this
        // article was first seeded — re-upload and repoint the post whenever
        // the source image has moved on, rather than leaving it stuck on
        // whatever was seeded first.
        if (currentFilename === expectedFilename) {
          skipped += 1;
          continue;
        }
        const media = await getMedia();
        await payload.update({
          collection: "posts",
          id: doc.id,
          data: { image: media },
        });
        updated += 1;
        continue;
      }

      const media = await getMedia();
      // A handful of articles carry tags (e.g. Testimonial) outside the
      // three categories Posts supports — file those under News rather than
      // failing the whole seed on one article.
      const category = POST_CATEGORIES.has(article.tag) ? article.tag : "News";

      await payload.create({
        collection: "posts",
        data: {
          country: "int",
          audience: "own",
          title: article.title,
          slug: article.slug,
          category: category as "News" | "Story" | "Event",
          publishedAt: new Date(article.date).toISOString(),
          excerpt: article.excerpt,
          image: media,
          showOnHome: false,
          _status: "published",
        },
      });
      created += 1;
    } catch (error) {
      failed += 1;
      payload.logger.error(`Post "${article.slug}" failed to seed: ${error}`);
    }
  }

  payload.logger.info(
    `Posts seed: ${created} created, ${updated} updated, ${skipped} skipped, ${failed} failed.`,
  );
}

async function seedPage(
  payload: Payload,
  route: Page["route"],
  title: string,
  layout: { blockType: string }[],
) {
  const existing = await payload.find({
    collection: "pages",
    where: { and: [{ route: { equals: route } }, { country: { equals: "int" } }] },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    payload.logger.info(`Page "${route}": already exists, skipped.`);
    return;
  }

  await payload.create({
    collection: "pages",
    data: {
      title,
      route,
      country: "int",
      layout: layout as Page["layout"],
      _status: "published",
    },
  });
  payload.logger.info(`Page "${route}": created.`);
}

async function seedPhotoEvent(
  payload: Payload,
  slug: string,
  title: string,
  publishedAt: string,
  dir: string,
  files: string[],
) {
  const existing = await payload.find({
    collection: "photo-events",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    payload.logger.info(`Photo event "${slug}": already exists, skipped.`);
    return;
  }

  const uploadMedia = mediaUploader(payload);
  const photos = [];
  for (const [i, file] of files.entries()) {
    const media = await uploadMedia(
      `/images/photo-news/${dir}/${file}`,
      `${title} — photo ${i + 1}`,
    );
    photos.push({ image: media });
  }

  await payload.create({
    collection: "photo-events",
    data: {
      country: "int",
      audience: "own",
      title,
      slug,
      publishedAt,
      photos,
    },
  });
  payload.logger.info(`Photo event "${slug}": created.`);
}

/** Runs one seed step; logs and continues rather than taking the whole
 *  script down, so one bad step (Pages, say) still lets the others run. */
async function step(payload: Payload, label: string, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (error) {
    payload.logger.error(`${label} failed: ${error}`);
  }
}

const run = async () => {
  const payload = await getPayload({ config });

  await step(payload, "Posts seed", () => seedPosts(payload));
  await step(payload, 'Page "home"', () =>
    seedPage(payload, "home", "Home", defaultHomeLayout),
  );
  await step(payload, 'Page "who-we-are"', () =>
    seedPage(payload, "who-we-are", "Who We Are", defaultWhoWeAreLayout),
  );
  await step(payload, 'Photo event "yef-hq-retreat"', () =>
    seedPhotoEvent(
      payload,
      "yef-hq-retreat",
      "YEF HQ Retreat",
      new Date("2025-01-01").toISOString(),
      "yef-hq-retreat",
      ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    ),
  );
  await step(payload, 'Photo event "2026-ministry-highlights"', () =>
    seedPhotoEvent(
      payload,
      "2026-ministry-highlights",
      "2026 Ministry Highlights",
      new Date("2026-01-01").toISOString(),
      "2026-ministry-highlights",
      ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"],
    ),
  );

  payload.logger.info("Seed complete.");
  process.exit(0);
};

await run();
