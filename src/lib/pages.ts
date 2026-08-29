import "server-only";
import { cmsConfigured } from "@/lib/posts";
import { getCountryCode } from "@/lib/i18n/request";

/** One section of a page, as saved by an editor. */
export type PageBlock = {
  blockType: string;
  [key: string]: unknown;
};

/**
 * The order the home page's sections ship in. A country with no saved page
 * renders this, so every site works before anyone opens the admin.
 */
export const defaultHomeLayout: PageBlock[] = [
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

/** The order the Who We Are page's sections ship in. */
export const defaultWhoWeAreLayout: PageBlock[] = [
  { blockType: "whoWeAreHero" },
  { blockType: "introCards" },
  { blockType: "visionMission" },
  { blockType: "storiesNews" },
  { blockType: "missionSchoolCta" },
];

/** The Get Involved landing page's one generic-block section: its closing
 *  CTA. Everything else on that page is bespoke code, not part of this
 *  bundled layout. */
export const defaultGetInvolvedLayout: PageBlock[] = [
  {
    blockType: "genericCta",
    heading: "Still Not Sure Where to Start?",
    body: "Tell us what you're interested in, and we'll help you find the right opportunity.",
    buttonLabel: "Tell Us Your Interests",
    buttonHref: "/get-involved/apply",
  },
];

/** The Campus Evangelism page's gallery mosaic and closing CTA — the two
 *  sections of that page converted to generic blocks. */
export const defaultCampusEvangelismLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/gallery-campus-evangelism-table.webp",
          alt: "YEF students sharing the Gospel at a campus outreach table",
        },
      },
      {
        image: {
          url: "/images/get-involved/gallery-campus-evangelism-trees.webp",
          alt: "Students walking together beneath campus trees",
        },
      },
      {
        image: {
          url: "/images/get-involved/gallery-campus-evangelism-walk.webp",
          alt: "Students walking across a sunlit campus path",
        },
      },
    ],
  },
  {
    blockType: "genericCta",
    heading: "Begin Your Mission Journey",
    body: "If God is stirring something in you, take the next step. Tell us where you are and our missions team will walk with you from there.",
    buttonLabel: "Apply for a Campus Mission",
    buttonHref: "/get-involved/campus-evangelism/apply",
  },
];

/** The Chapter Affiliation page's intro copy, its only converted section. */
export const defaultChapterAffiliationLayout: PageBlock[] = [
  {
    blockType: "genericText",
    eyebrow: "Bring YEF to Your Campus",
    paragraphs: [
      {
        body: "Every YEF chapter is a seedbed—a witnessing community planted on one campus, connected to a wider movement of chapters around the world. Affiliating your chapter is a three-step process: chapter information, leadership contact, and agreement.",
      },
    ],
  },
];

const defaultLayouts: Record<string, PageBlock[]> = {
  home: defaultHomeLayout,
  "who-we-are": defaultWhoWeAreLayout,
  "get-involved": defaultGetInvolvedLayout,
  "get-involved/campus-evangelism": defaultCampusEvangelismLayout,
  "get-involved/chapter-affiliation": defaultChapterAffiliationLayout,
};

/**
 * The layout an editor has published for this country's page, or the bundled
 * one. `draft` reads the unpublished version, which is how live preview shows
 * work in progress.
 */
export async function getLayout(
  route = "home",
  draft = false,
): Promise<PageBlock[]> {
  const fallback = defaultLayouts[route] ?? [];
  if (!cmsConfigured) return fallback;
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "pages",
      depth: 2,
      limit: 1,
      draft,
      where: {
        and: [
          { route: { equals: route } },
          { country: { equals: getCountryCode() } },
        ],
      },
    });
    const layout = docs[0]?.layout as PageBlock[] | undefined;
    return layout?.length ? layout : fallback;
  } catch (error) {
    console.error("Falling back to the bundled page layout: ", error);
    return fallback;
  }
}

/** A built-in page's editable banner photo, heading, and intro line — the
 *  one thing every such page can override today, ahead of full section
 *  editing. Any field left empty in the CMS keeps the page's own default. */
export type PageHeader = {
  image?: string;
  imageAlt?: string;
  heading?: string;
  intro?: string;
};

type HeaderMedia = { url?: string | null; alt?: string | null } | number | null;

/**
 * The banner/heading/intro override an editor has published for this
 * country's page, or nothing if there is none — the caller merges whatever
 * comes back over its own hardcoded copy, field by field.
 */
export async function getPageHeader(route: string): Promise<PageHeader> {
  if (!cmsConfigured) return {};
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "pages",
      depth: 1,
      limit: 1,
      where: {
        and: [
          { route: { equals: route } },
          { country: { equals: getCountryCode() } },
        ],
      },
    });
    const header = docs[0]?.header as
      | { image?: HeaderMedia; heading?: string | null; intro?: string | null }
      | undefined;
    if (!header) return {};
    const image = typeof header.image === "object" ? header.image : null;
    return {
      image: image?.url ?? undefined,
      imageAlt: image?.alt ?? undefined,
      heading: header.heading ?? undefined,
      intro: header.intro ?? undefined,
    };
  } catch (error) {
    console.error("Falling back to the bundled page header: ", error);
    return {};
  }
}
