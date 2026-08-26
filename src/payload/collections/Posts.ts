import type { CollectionConfig } from "payload";
import {
  canCreateIn,
  countryOptions,
  countryScoped,
  hasSection,
  isSuper,
  scopeOf,
  type AdminUser,
} from "@/payload/access";

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
    hidden: ({ user }) => !hasSection(user as AdminUser | null, "news"),
  },
  access: {
    // The site itself reads posts unauthenticated; editing is scoped to the
    // countries a person is responsible for.
    read: () => true,
    create: canCreateIn("news"),
    update: countryScoped("news"),
    delete: countryScoped("news"),
  },
  versions: { drafts: true },
  fields: [
    {
      name: "country",
      type: "select",
      required: true,
      options: countryOptions,
      index: true,
      defaultValue: ({ user }: { user?: AdminUser | null }) =>
        scopeOf(user)[0] ?? "int",
      admin: {
        position: "sidebar",
        description: "Which country site this post belongs to.",
      },
      access: {
        // An editor must not be able to move a post out of their own scope,
        // or claim one from another country by retyping this field.
        update: ({ req: { user } }) => isSuper(user as AdminUser | null),
      },
    },
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
