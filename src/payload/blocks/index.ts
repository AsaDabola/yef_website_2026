import type { Block } from "payload";

/**
 * The home page's sections, as blocks an editor can reorder and edit.
 *
 * Two kinds live here. Converted sections carry their own copy, images and
 * repeatable rows, so an editor changes what the section says. The rest are
 * placed as-is: the section still appears, and can be moved or removed, but
 * its content is the one bundled with the site until it is converted too.
 * Both kinds reorder freely, which is the thing editors reach for first.
 */

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero carousel", plural: "Hero carousels" },
  admin: { group: "Sections" },
  fields: [
    {
      name: "slides",
      type: "array",
      minRows: 1,
      maxRows: 6,
      admin: { description: "Shown in this order, cycling automatically." },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        {
          name: "heading",
          type: "textarea",
          required: true,
          admin: { description: "A line break here breaks the headline." },
        },
        { name: "body", type: "text", required: true },
      ],
    },
  ],
};

export const AboutBlock: Block = {
  slug: "about",
  labels: { singular: "About us", plural: "About us" },
  admin: { group: "Sections" },
  fields: [
    { name: "image", type: "upload", relationTo: "media" },
    { name: "eyebrow", type: "text" },
    {
      type: "row",
      fields: [
        { name: "heading", type: "text", admin: { width: "60%" } },
        {
          name: "headingAccent",
          type: "text",
          admin: {
            width: "40%",
            description: "Set in the italic serif, e.g. “young”.",
          },
        },
      ],
    },
    { name: "lead", type: "textarea" },
    { name: "body", type: "textarea" },
    {
      name: "stats",
      type: "array",
      maxRows: 4,
      fields: [
        {
          type: "row",
          fields: [
            { name: "value", type: "text", required: true },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};

export const MissionBlock: Block = {
  slug: "mission",
  labels: { singular: "Mission statement", plural: "Mission statements" },
  admin: { group: "Sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "verse", type: "textarea" },
    {
      name: "verseAccent",
      type: "text",
      admin: { description: "The closing phrase, set in the italic serif." },
    },
    { name: "reference", type: "text" },
    {
      name: "columns",
      type: "array",
      maxRows: 2,
      fields: [{ name: "body", type: "textarea", required: true }],
    },
  ],
};

export const ProofBlock: Block = {
  slug: "proof",
  labels: { singular: "Why the young", plural: "Why the young" },
  admin: { group: "Sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    {
      name: "heading",
      type: "textarea",
      admin: {
        description:
          "Wrap a phrase in **double asterisks** to set it in the italic serif.",
      },
    },
    {
      name: "items",
      type: "array",
      maxRows: 4,
      fields: [
        {
          type: "row",
          fields: [
            { name: "number", type: "text", required: true },
            { name: "name", type: "text", required: true },
          ],
        },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const SignUpBlock: Block = {
  slug: "signup",
  labels: { singular: "Sign-up band", plural: "Sign-up bands" },
  admin: { group: "Sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "body", type: "textarea" },
    { name: "buttonLabel", type: "text" },
  ],
};

/** Sections that render their bundled content; reorder and remove only. */
const bundled: [string, string][] = [
  ["campusFinder", "Find your campus"],
  ["getInvolved", "Join the movement"],
  ["testimonials", "Testimonials"],
  ["giving", "Giving"],
  ["movement", "Around the movement"],
];

export const bundledBlocks: Block[] = bundled.map(([slug, label]) => ({
  slug,
  labels: { singular: label, plural: label },
  admin: {
    group: "Sections",
    description:
      "Renders the section as designed. Move or remove it here; its content is not editable yet.",
  },
  fields: [],
}));

export const homeBlocks: Block[] = [
  HeroBlock,
  AboutBlock,
  MissionBlock,
  ProofBlock,
  SignUpBlock,
  ...bundledBlocks,
];
