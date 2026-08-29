import type { Block } from "payload";

/**
 * A reusable block library any page's `layout` can draw from, alongside the
 * home page's bespoke blocks. Where a converted page's design needs a shape
 * these don't cover, it still falls back to its own hardcoded rendering — a
 * page is never blocked from shipping just because a block doesn't fit it.
 */

export const GenericTextBlock: Block = {
  slug: "genericText",
  labels: { singular: "Text section", plural: "Text sections" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "paragraphs",
      type: "array",
      minRows: 1,
      admin: {
        description: "Shown one after another, in this order.",
      },
      fields: [{ name: "body", type: "textarea", required: true }],
    },
  ],
};

export const GenericCardsBlock: Block = {
  slug: "genericCards",
  labels: { singular: "Cards grid", plural: "Cards grids" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "cards",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        {
          name: "quote",
          type: "textarea",
          admin: { description: "Optional — an italic pull-quote under the card body." },
        },
      ],
    },
  ],
};

export const GenericImageTextBlock: Block = {
  slug: "genericImageText",
  labels: { singular: "Image + text panel", plural: "Image + text panels" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "imageAlt", type: "text" },
    {
      name: "imageSide",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Image on the left", value: "left" },
        { label: "Image on the right", value: "right" },
      ],
    },
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        {
          name: "buttonLabel",
          type: "text",
          admin: { width: "50%", description: "Optional — leave both empty for no button." },
        },
        { name: "buttonHref", type: "text", admin: { width: "50%" } },
      ],
    },
  ],
};

export const GenericGalleryBlock: Block = {
  slug: "genericGallery",
  labels: { singular: "Gallery mosaic", plural: "Gallery mosaics" },
  admin: { group: "Generic sections" },
  fields: [
    {
      name: "images",
      type: "array",
      minRows: 3,
      maxRows: 3,
      admin: {
        description: "Exactly three photos: one large, two stacked beside it.",
      },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "alt", type: "text" },
      ],
    },
  ],
};

export const GenericStatsBlock: Block = {
  slug: "genericStats",
  labels: { singular: "Stats row", plural: "Stats rows" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "stats",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: "row",
          fields: [
            { name: "value", type: "text", required: true, admin: { width: "50%" } },
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
  ],
};

export const GenericTimelineBlock: Block = {
  slug: "genericTimeline",
  labels: { singular: "Timeline", plural: "Timelines" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            { name: "year", type: "text", required: true, admin: { width: "30%" } },
            { name: "title", type: "text", required: true, admin: { width: "70%" } },
          ],
        },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const GenericCtaBlock: Block = {
  slug: "genericCta",
  labels: { singular: "Call to action", plural: "Calls to action" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    {
      type: "row",
      fields: [
        { name: "buttonLabel", type: "text", required: true, admin: { width: "50%" } },
        { name: "buttonHref", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
  ],
};

export const GenericQuoteBlock: Block = {
  slug: "genericQuote",
  labels: { singular: "Pull quote", plural: "Pull quotes" },
  admin: { group: "Generic sections" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "reference", type: "text" },
  ],
};

export const genericBlocks: Block[] = [
  GenericTextBlock,
  GenericCardsBlock,
  GenericImageTextBlock,
  GenericGalleryBlock,
  GenericStatsBlock,
  GenericTimelineBlock,
  GenericCtaBlock,
  GenericQuoteBlock,
];
