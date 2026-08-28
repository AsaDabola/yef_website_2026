import type { Where } from "payload";
import { newsArticles, type NewsArticle } from "@/lib/news";
import { getCountryCode } from "@/lib/i18n/request";

export type MovementItem = {
  tag: string;
  title: string;
  image: string;
  alt: string;
  href?: string;
};

/**
 * The strip and the news grid fall back to the copy that shipped with the site
 * whenever the CMS is not configured, so the marketing pages keep building and
 * deploying before anyone has provisioned a database.
 */
const fallbackMovementItems: MovementItem[] = [
  {
    tag: "PIONEERING MISSIONS",
    title: "YEF Tonga Begins Romans Bible Study with Six Nursing Students at TNU",
    image: "/images/home-v2/movement-tonga.jpg",
    alt: "YEF Tonga nursing students studying Romans around a picnic table",
  },
  {
    tag: "CONFERENCES",
    title:
      "YEF Hong Kong Members Renewed by God's Love and Mission at Mission Conference",
    image: "/images/home-v2/movement-hong-kong.jpg",
    alt: "YEF Hong Kong members at the Great Commission Mission Conference",
  },
  {
    tag: "NEW CHAPTER",
    title: "YEF Holds Fellowship Gathering Near Washington University in St. Louis",
    image: "/images/home-v2/movement-st-louis.jpg",
    alt: "Students seated together at a YEF fellowship gathering in St. Louis",
  },
];

export const cmsConfigured = Boolean(
  process.env.DATABASE_URI && process.env.PAYLOAD_SECRET,
);

type MediaValue = {
  url?: string | null;
  alt?: string | null;
  sizes?: Record<string, { url?: string | null } | undefined>;
};

type PostDoc = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  homeEyebrow?: string | null;
  image?: MediaValue | string | null;
  body?: unknown;
};

function mediaUrl(image: PostDoc["image"], size?: "card" | "tile") {
  if (!image || typeof image === "string") return null;
  return image.sizes?.[size ?? ""]?.url || image.url || null;
}

function mediaAlt(image: PostDoc["image"]) {
  if (!image || typeof image === "string") return "";
  return image.alt ?? "";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Every read is scoped to the site the request is on — without this the
 * headquarters site would list every country's news alongside its own.
 *
 * A post reaches a site three ways: it belongs to that country, it was
 * distributed to it by name, or it was published to every country. The last
 * two are how headquarters pushes an announcement out to the network without
 * each country having to re-type it.
 */
export function forThisCountry(where?: Where): Where {
  const code = getCountryCode();
  const visible: Where = {
    or: [
      { country: { equals: code } },
      { audience: { equals: "all" } },
      { and: [{ audience: { equals: "some" } }, { distributeTo: { in: [code] } }] },
    ],
  };
  return where ? { and: [visible, where] } : visible;
}

async function findPosts(where?: Where, limit = 100) {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    limit,
    sort: "-publishedAt",
    where: forThisCountry(where),
  });
  return docs as unknown as PostDoc[];
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!cmsConfigured) return newsArticles;
  try {
    const docs = await findPosts();
    if (docs.length === 0) return newsArticles;
    return docs.map((doc) => ({
      slug: doc.slug,
      tag: doc.category,
      title: doc.title,
      excerpt: doc.excerpt,
      image: mediaUrl(doc.image, "card") ?? "/images/news/article-philippines.png",
      date: formatDate(doc.publishedAt),
    }));
  } catch (error) {
    console.error("Falling back to bundled news: ", error);
    return newsArticles;
  }
}

export async function getMovementItems(): Promise<MovementItem[]> {
  if (!cmsConfigured) return fallbackMovementItems;
  try {
    const docs = await findPosts({ showOnHome: { equals: true } }, 3);
    if (docs.length === 0) return fallbackMovementItems;
    return docs.map((doc) => ({
      tag: doc.homeEyebrow || doc.category,
      title: doc.title,
      image: mediaUrl(doc.image, "tile") ?? "/images/home-v2/movement-africa.png",
      alt: mediaAlt(doc.image) || doc.title,
      href: `/news/${doc.slug}`,
    }));
  } catch (error) {
    console.error("Falling back to bundled movement items: ", error);
    return fallbackMovementItems;
  }
}

export type ArticleWithBody = { article: NewsArticle; body: unknown | null };

export async function getArticle(
  slug: string,
): Promise<ArticleWithBody | null> {
  if (cmsConfigured) {
    try {
      const docs = await findPosts({ slug: { equals: slug } }, 1);
      const doc = docs[0];
      if (doc) {
        return {
          article: {
            slug: doc.slug,
            tag: doc.category,
            title: doc.title,
            excerpt: doc.excerpt,
            image:
              mediaUrl(doc.image) ?? "/images/news/article-philippines.png",
            date: formatDate(doc.publishedAt),
          },
          body: doc.body ?? null,
        };
      }
    } catch (error) {
      console.error("Falling back to the bundled article: ", error);
    }
  }
  const bundled = newsArticles.find((item) => item.slug === slug);
  return bundled ? { article: bundled, body: null } : null;
}
