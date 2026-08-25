import type { CollectionConfig } from "payload";

/**
 * One collection behind both the News page and the home page's "Around the
 * Movement" strip — the strip is just the posts an editor has ticked
 * "Show on the home page", newest first.
 */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "News & Events" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "showOnHome"],
    description:
      "Posts appear on the News page. Tick “Show on the home page” to also put one in the Around the Movement strip.",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "The web address for this post, e.g. yef-tonga-romans.",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "News",
      options: ["News", "Story", "Event"],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "Published date",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "image",
      label: "Cover photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "The one or two lines shown on the News card." },
    },
    {
      name: "body",
      label: "Article",
      type: "richText",
    },
    {
      name: "showOnHome",
      label: "Show on the home page",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Adds this post to the Around the Movement strip. The three most recent ticked posts are shown.",
      },
    },
    {
      name: "homeEyebrow",
      label: "Home page label",
      type: "text",
      admin: {
        position: "sidebar",
        condition: (data) => Boolean(data?.showOnHome),
        description:
          "The small caps line above the title on the home page, e.g. FIELD REPORT. Defaults to the category.",
      },
    },
  ],
};
