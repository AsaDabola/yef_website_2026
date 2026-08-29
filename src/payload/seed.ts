import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsArticles } from "@/lib/news";
import type { Page } from "@/payload-types";
import newsRealImages from "@/payload/newsRealImages.json";

const realImages = newsRealImages as Record<string, { url: string; filename: string }>;

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

type MediaUploader = ReturnType<typeof mediaUploader>;

/**
 * The Home and Who We Are pages' real, current bundled copy, built into a
 * saved layout so the block editor shows exactly what the site already
 * says instead of an empty form. Kept in sync by hand with each block
 * component's own `defaults` (Hero.tsx, AboutUs.tsx, MissionStatement.tsx,
 * WhyTheYoung.tsx, SignUp.tsx, and the who-we-are/ equivalents) — there is
 * no single source both this standalone script and those "use client"/
 * server components can share.
 */
async function buildDefaultHomeLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "hero",
      slides: [
        {
          image: await uploadMedia(
            "/images/home-v2/hero-fire.webp",
            "Youth gathered around a bonfire at dusk",
          ),
          heading: "To Know Christ.\nTo Make Him Known.",
          body: "For we do not preach ourselves but Jesus Christ as Lord",
        },
        {
          image: await uploadMedia(
            "/images/home-v2/hero-headquarters.webp",
            "Youth Evangelical Fellowship headquarters building",
          ),
          heading: "For Christ.\nFor the Campus.\nFor the Nations.",
          body: "We exist to help students know Christ, live for Him on campus, and carry the Gospel to the nations.",
        },
        {
          image: await uploadMedia(
            "/images/home-v2/slide-2-students.webp",
            "Students smiling together on a mission trip",
          ),
          heading: "Reaching Students.\nRaising Disciples.",
          body: "A global evangelical campus fellowship sharing the Gospel, teaching the Bible, and raising disciples of Jesus Christ.",
          buttonLabel: "FIND YOUR CAMPUS",
          buttonHref: "#find-your-campus",
        },
      ],
    },
    { blockType: "campusFinder" },
    {
      blockType: "about",
      image: await uploadMedia(
        "/images/home-v2/about-us-photo.webp",
        "Students celebrating together on campus",
      ),
      eyebrow: "About Us",
      heading: "A global campus",
      headingAccent: "fellowship",
      lead: "YEF is a global evangelical fellowship where university students encounter Christ, grow in the Word, and learn to share the Gospel with others.",
      body: "Founded in New York City in 2009, YEF began with students gathering around Scripture, prayer, and campus evangelism. As disciples were raised and new leaders were sent out, the fellowship expanded across cities and nations, united by the same Gospel and mission.",
      stats: [
        { value: "WORD", label: "ROOTED IN SCRIPTURE" },
        { value: "MISSION", label: "FROM CAMPUS TO NATIONS" },
      ],
    },
    {
      blockType: "mission",
      eyebrow: "Mission Statement",
      verse:
        "Your people will offer themselves freely on\nthe day of your power; young people will\ncome to",
      verseAccent: "you like the morning dew.",
      reference: "Psalm 110:3",
      columns: [
        {
          body: "We exist to help students **know Jesus Christ deeply, build their lives on the Word of God,** and **grow into mature disciples** whose faith shapes every part of life.",
        },
        {
          body: "From campus evangelism and Bible study to discipleship and leadership, YEF equips students to **share the Gospel, serve others**, and **carry Christ’s mission into the world.**",
        },
      ],
    },
    {
      blockType: "proof",
      eyebrow: "The Call",
      heading:
        "In the days of your youth, before the days of trouble come, **remember your Creator**.",
      items: [
        {
          name: "Know Christ",
          body: "The university years are a formative season when convictions, values, and direction for life are taking shape. YEF calls students to seek Christ and build their lives firmly upon Him.",
        },
        {
          name: "Grow in the\nWord",
          body: "Through Scripture, prayer, fellowship, and discipleship, students deepen their faith, develop a biblical worldview, and learn to follow Christ in every area of life.",
        },
        {
          name: "Live on Mission",
          body: "Faith is meant to be lived and shared. Students are encouraged to serve others, make disciples, and carry the Gospel to their friends, campuses, communities, and beyond.",
        },
      ],
    },
    { blockType: "getInvolved" },
    { blockType: "testimonials" },
    { blockType: "giving" },
    { blockType: "movement" },
    {
      blockType: "signup",
      eyebrow: "Stay Up to Date",
      heading: "News from the campuses.",
      body: "Field reports, training dates, and stories from students around the world.",
      buttonLabel: "Sign Up",
    },
  ];
}

async function buildDefaultWhoWeAreLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "whoWeAreHero",
      image: await uploadMedia(
        "/images/who-we-are/hero-mountains.png",
        "Mountain range at dusk",
      ),
      heading: "Who We Are",
      body: "YEF is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many around the world.",
      missionBody:
        "YEF exists to reach and plant the Gospel of Christ’s love into the souls of the youth on campus—those who can bring great, lasting impact to the future of Christian faith.",
      portrait: await uploadMedia(
        "/images/who-we-are/hero-president-portrait.webp",
        "Dr. Mark Wagner, President of Youth Evangelical Fellowship",
      ),
      quote:
        "“God has a Great Calling for His people. Walk the journey with faith and you will find true joy and peace”",
      signature: "- Dr. Mark Wagner, President of Youth Evangelical Fellowship",
    },
    {
      blockType: "introCards",
      eyebrow: "Who we are",
      heading: "Youth Evangelical Fellowship",
      cards: [
        {
          image: await uploadMedia(
            "/images/who-we-are/intro-welcome.png",
            "Youth Evangelical Fellowship building",
          ),
          eyebrow: "NEW TO YEF?\nSTART YOUR\nJOURNEY HERE",
          title: "Welcome",
          cta: "START HERE",
        },
        {
          image: await uploadMedia(
            "/images/who-we-are/intro-membership.png",
            "Three students smiling together outdoors on a mission trip",
          ),
          eyebrow: "READY TO\nJOIN THE\nFELLOWSHIP",
          title: "Membership",
          cta: "JOIN US",
        },
        {
          image: await uploadMedia(
            "/images/who-we-are/intro-statement-of-faith.png",
            "A wooden cross resting on an open Bible before a world map",
          ),
          eyebrow: "WHAT WE\nBELIEVE AND\nTEACH",
          title: "Statement of Faith",
          cta: "READ MORE",
        },
      ],
    },
    {
      blockType: "visionMission",
      heading: "Our Vision & Mission",
      body: "Youth Evangelical Fellowship (YEF) is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide.",
      image: await uploadMedia(
        "/images/who-we-are/vision-cross-bible.jpg",
        "A wooden cross resting on an open Bible",
      ),
      pillars: [
        {
          title: "Reach the Next Generation",
          body: "Share the Gospel with university students and young people, helping them encounter Jesus Christ and build their lives upon God's Word.",
        },
        {
          title: "Raise Disciples and Leaders",
          body: "Nurture young believers through Bible study, fellowship, and spiritual training, equipping them to become faithful disciples who can lead and serve others.",
        },
        {
          title: "Advance the Gospel to the Nations",
          body: "Establish and strengthen campus fellowships around the world, raising missionaries and sending the next generation to participate in the Great Commission.",
        },
      ],
    },
    { blockType: "storiesNews" },
    { blockType: "missionSchoolCta" },
  ];
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

/** True once every block in a saved layout carries only the fields Payload
 *  itself adds (`id`, `blockType`) — i.e. the placeholder layout this same
 *  script used to seed before it filled in real content, never touched by
 *  an editor since. Safe to overwrite; anything else is someone's work. */
/** Whether a field's saved value is really "nothing" — covers Payload's own
 *  bookkeeping (null ids/blockNames, empty arrays) as well as an unfilled
 *  text field, so a genuinely empty block reads as empty regardless of
 *  which of those shapes it happens to be. */
function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return true;
  if (Array.isArray(value)) return value.every(isEmptyValue);
  if (typeof value === "object") {
    return Object.values(value as object).every(isEmptyValue);
  }
  return false;
}

function isUntouchedLayout(layout: unknown): boolean {
  if (!Array.isArray(layout)) return true;
  return layout.every(
    (block) =>
      block && typeof block === "object" &&
      Object.entries(block as object).every(
        ([key, value]) => key === "id" || key === "blockType" || isEmptyValue(value),
      ),
  );
}

async function seedPage(
  payload: Payload,
  route: Page["route"],
  title: string,
  // A thunk rather than an already-built layout: building one uploads its
  // images, and that should only happen on the create/fill-in paths below,
  // not on every build once the page has real content in place.
  buildLayout: () => Promise<{ blockType: string }[]>,
) {
  const existing = await payload.find({
    collection: "pages",
    where: { and: [{ route: { equals: route } }, { country: { equals: "int" } }] },
    limit: 1,
    depth: 0,
  });

  if (existing.docs.length > 0) {
    const doc = existing.docs[0];
    if (!doc || !isUntouchedLayout(doc.layout)) {
      payload.logger.info(`Page "${route}": already exists, skipped.`);
      return;
    }
    await payload.update({
      collection: "pages",
      id: doc.id,
      data: { layout: (await buildLayout()) as Page["layout"] },
    });
    payload.logger.info(`Page "${route}": filled in with real content.`);
    return;
  }

  await payload.create({
    collection: "pages",
    data: {
      title,
      route,
      country: "int",
      layout: (await buildLayout()) as Page["layout"],
      _status: "published",
    },
  });
  payload.logger.info(`Page "${route}": created.`);
}

/**
 * Every real page of the site that is not yet wired to the block editor —
 * listed so Pages shows the whole site rather than just Home and Who We Are,
 * even though editing one of these still means changing code for now. See
 * the `builtIn` field on the Pages collection.
 */
const builtInPages: { route: string; title: string }[] = [
  { route: "who-we-are/welcome", title: "Welcome" },
  { route: "who-we-are/mission", title: "Our Mission" },
  { route: "who-we-are/statement-of-faith", title: "Statement of Faith" },
  { route: "who-we-are/history", title: "History" },
  { route: "who-we-are/membership", title: "Membership" },
  { route: "who-we-are/staff-executive-committee", title: "Staff/Executive Committee" },
  { route: "get-involved", title: "Get Involved" },
  { route: "get-involved/apply", title: "Connect With YEFI" },
  { route: "get-involved/campus-evangelism", title: "Campus Evangelism" },
  { route: "get-involved/campus-evangelism/apply", title: "Begin Your Mission Journey" },
  { route: "get-involved/chapter-affiliation", title: "Chapter Affiliation" },
  { route: "get-involved/leadership-training", title: "International Leadership Retreats" },
  { route: "get-involved/volunteer", title: "Volunteer with YEF" },
  { route: "news", title: "News" },
  { route: "network", title: "Network" },
  { route: "donate", title: "Donate" },
  { route: "contact", title: "Contact Us" },
  { route: "join", title: "Request Access" },
  { route: "login", title: "Sign In" },
  { route: "reaching-the-campus", title: "Reaching the Campus" },
  { route: "resources", title: "Resources" },
  { route: "sharing-the-gospel", title: "Sharing the Gospel" },
  { route: "submit-your-story", title: "Submit Your Story" },
  { route: "what-is-evangelical", title: "Raising Disciples" },
  { route: "yef-mission-school", title: "YEF Mission School" },
  { route: "yef-mission-school/apply", title: "Apply YEF Mission School" },
];

async function seedBuiltInPages(payload: Payload) {
  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const entry of builtInPages) {
    const existing = await payload.find({
      collection: "pages",
      where: {
        and: [
          { route: { equals: entry.route as Page["route"] } },
          { country: { equals: "int" } },
        ],
      },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      skipped += 1;
      continue;
    }
    try {
      await payload.create({
        collection: "pages",
        data: {
          title: entry.title,
          route: entry.route as Page["route"],
          country: "int",
          builtIn: true,
          _status: "published",
        },
      });
      created += 1;
    } catch (error) {
      failed += 1;
      payload.logger.error(`Page "${entry.route}" failed to seed: ${error}`);
    }
  }

  payload.logger.info(
    `Built-in pages seed: ${created} created, ${skipped} skipped, ${failed} failed.`,
  );
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
  const uploadMedia = mediaUploader(payload);
  await step(payload, 'Page "home"', () =>
    seedPage(payload, "home", "Home", () => buildDefaultHomeLayout(uploadMedia)),
  );
  await step(payload, 'Page "who-we-are"', () =>
    seedPage(payload, "who-we-are", "Who We Are", () =>
      buildDefaultWhoWeAreLayout(uploadMedia),
    ),
  );
  await step(payload, "Built-in pages seed", () => seedBuiltInPages(payload));
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
