import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsArticles } from "@/lib/news";

/**
 * Moves the articles that shipped with the site into the CMS, so switching the
 * News page over to Payload doesn't lose anything. Safe to re-run: posts are
 * matched on slug and skipped if they already exist.
 *
 *   npm run seed
 */
const run = async () => {
  const payload = await getPayload({ config });
  let created = 0;
  let skipped = 0;

  for (const article of newsArticles) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: article.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      skipped += 1;
      continue;
    }

    const filePath = path.join(process.cwd(), "public", article.image);
    const media = await payload.create({
      collection: "media",
      // Seeded content belongs to the headquarters site.
      data: { alt: article.title, country: "int" },
      file: {
        data: await fs.readFile(filePath),
        name: path.basename(filePath),
        mimetype: "image/png",
        size: (await fs.stat(filePath)).size,
      },
    });

    await payload.create({
      collection: "posts",
      data: {
        country: "int",
        audience: "own",
        title: article.title,
        slug: article.slug,
        category: article.tag as "News" | "Story" | "Event",
        publishedAt: new Date(article.date).toISOString(),
        excerpt: article.excerpt,
        image: media.id,
        showOnHome: false,
        _status: "published",
      },
    });
    created += 1;
  }

  payload.logger.info(`Seed complete: ${created} created, ${skipped} skipped.`);
  process.exit(0);
};

await run();
