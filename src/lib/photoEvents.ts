import "server-only";
import { cmsConfigured } from "@/lib/posts";
import { getCountryCode } from "@/lib/i18n/request";

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

/**
 * There is no bundled fallback here — unlike the news articles, these photo
 * batches have no design-time content to ship with the site. A country with
 * none published simply shows an empty Photo News tab until an editor adds
 * some in /admin.
 */
export async function getPhotoEvents(): Promise<PhotoEvent[]> {
  if (!cmsConfigured) return [];
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
      where: { country: { equals: getCountryCode() } },
    });
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
    console.error("Falling back to no photo events: ", error);
    return [];
  }
}
