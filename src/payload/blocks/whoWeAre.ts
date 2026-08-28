import type { Block } from "payload";

/**
 * The Who We Are page's sections, as blocks an editor can reorder and edit —
 * same pattern as src/payload/blocks/index.ts, grouped separately in the
 * block picker so the two pages' sections don't mix together in the list.
 */

export const WhoWeAreHeroBlock: Block = {
  slug: "whoWeAreHero",
  labels: { singular: "Who We Are hero", plural: "Who We Are heroes" },
  admin: { group: "Who We Are" },
  fields: [
    { name: "image", type: "upload", relationTo: "media" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    {
      name: "missionBody",
      label: "Mission statement",
      type: "textarea",
      admin: {
        description:
          "Shown after the bolded label “Mission Statement:” in the hero.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "portrait",
          label: "President's portrait",
          type: "upload",
          relationTo: "media",
          admin: { width: "50%" },
        },
        {
          name: "quote",
          type: "textarea",
          admin: {
            width: "50%",
            description: "The short pull-quote over the portrait.",
          },
        },
      ],
    },
    {
      name: "signature",
      type: "text",
      admin: { description: "e.g. “- Dr. Mark Wagner, President of YEF”." },
    },
  ],
};

export const IntroCardsBlock: Block = {
  slug: "introCards",
  labels: { singular: "Intro cards", plural: "Intro cards" },
  admin: { group: "Who We Are" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "cards",
      type: "array",
      maxRows: 3,
      admin: {
        description:
          "Always the three cards in this order (Welcome, Membership, Statement of Faith) — only their words and photo are editable here.",
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "image", type: "upload", relationTo: "media", admin: { width: "40%" } },
            {
              name: "eyebrow",
              type: "textarea",
              admin: { width: "60%", description: "A line break here breaks the label." },
            },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "title", type: "text", admin: { width: "50%" } },
            { name: "cta", type: "text", admin: { width: "50%" } },
          ],
        },
      ],
    },
  ],
};

export const VisionMissionBlock: Block = {
  slug: "visionMission",
  labels: { singular: "Vision & Mission", plural: "Vision & Mission" },
  admin: { group: "Who We Are" },
  fields: [
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "pillars",
      type: "array",
      maxRows: 3,
      admin: {
        description:
          "Always the same three pillars, in order — only the title and body are editable; the icon is fixed.",
      },
      fields: [
        { name: "title", type: "text" },
        { name: "body", type: "textarea" },
      ],
    },
  ],
};

/** Sections that render their bundled content; reorder and remove only. */
const bundled: [string, string][] = [
  ["storiesNews", "Stories & News teasers"],
  ["missionSchoolCta", "Mission School CTA"],
];

export const whoWeAreBundledBlocks: Block[] = bundled.map(([slug, label]) => ({
  slug,
  labels: { singular: label, plural: label },
  admin: {
    group: "Who We Are",
    description:
      "Renders the section as designed. Move or remove it here; its content is not editable yet.",
  },
  fields: [],
}));

export const whoWeAreBlocks: Block[] = [
  WhoWeAreHeroBlock,
  IntroCardsBlock,
  VisionMissionBlock,
  ...whoWeAreBundledBlocks,
];
