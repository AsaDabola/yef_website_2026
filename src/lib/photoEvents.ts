import "server-only";
import { cmsConfigured, forThisCountry } from "@/lib/posts";
import { getCountryCode } from "@/lib/i18n/request";
import { INTERNATIONAL } from "@/lib/i18n/constants";

export type PhotoEventPhoto = {
  url: string;
  alt: string;
  caption?: string;
};

export type PhotoEvent = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  photos: PhotoEventPhoto[];
};

type MediaValue = { url?: string | null; alt?: string | null } | string | null;

type PhotoEventDoc = {
  slug: string;
  title: string;
  publishedAt: string;
  photos?: { image?: MediaValue; caption?: string | null }[] | null;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function photosOf(
  title: string,
  dir: string,
  files: string[],
): PhotoEventPhoto[] {
  return files.map((file, i) => ({
    url: `/images/photo-news/${dir}/${file}`,
    alt: `${title} — photo ${i + 1}`,
  }));
}

/**
 * Ships with the site so the International site's Photo News tab is never
 * empty before anyone has touched /admin. A country other than headquarters
 * sees nothing here until its own team (or headquarters, distributing to
 * them) publishes a batch in the CMS — matching how the rest of the site
 * falls back to bundled content only for International.
 */
const fallbackPhotoEvents: PhotoEvent[] = [
  {
    slug: "yef-hq-retreat",
    title: "YEF HQ Retreat",
    date: "2025",
    cover: "/images/photo-news/yef-hq-retreat/1.webp",
    photos: photosOf("YEF HQ Retreat", "yef-hq-retreat", [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
    ]),
  },
  {
    slug: "2026-ministry-highlights",
    title: "2026 Ministry Highlights",
    date: "2026",
    cover: "/images/photo-news/2026-ministry-highlights/1.webp",
    photos: photosOf(
      "2026 Ministry Highlights",
      "2026-ministry-highlights",
      ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"],
    ),
  },
];

/**
 * Every read is scoped to the site the request is on, the same three ways a
 * Post reaches a country: it belongs there, it was published to every
 * country, or it was distributed there by name. That is how headquarters
 * seeds International first and then pushes a batch out continent by
 * continent, or country by country, rather than every site sharing one list.
 */
export async function getPhotoEvents(): Promise<PhotoEvent[]> {
  const isInternational = getCountryCode() === INTERNATIONAL;
  if (!cmsConfigured) return isInternational ? fallbackPhotoEvents : [];
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "photo-events",
      depth: 2,
      limit: 100,
      sort: "-publishedAt",
      where: forThisCountry(),
    });
    if (docs.length === 0) return isInternational ? fallbackPhotoEvents : [];
    return (docs as unknown as PhotoEventDoc[])
      .map((doc) => {
        const photos: PhotoEventPhoto[] = (doc.photos ?? [])
          .map((row): PhotoEventPhoto | null => {
            const image = row.image;
            const url = typeof image === "object" && image ? image.url : undefined;
            const alt = typeof image === "object" && image ? image.alt : undefined;
            return url
              ? { url, alt: alt ?? doc.title, caption: row.caption ?? undefined }
              : null;
          })
          .filter((photo): photo is PhotoEventPhoto => photo !== null);
        return {
          slug: doc.slug,
          title: doc.title,
          date: formatDate(doc.publishedAt),
          cover: photos[0]?.url ?? "",
          photos,
        };
      })
      .filter((event) => event.cover);
  } catch (error) {
    console.error("Falling back to bundled photo events: ", error);
    return isInternational ? fallbackPhotoEvents : [];
  }
}
