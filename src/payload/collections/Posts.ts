import { APIError, type CollectionConfig } from "payload";
import {
  canCreateIn,
  countryOptions,
  countryScoped,
  distributedRead,
  hasSection,
  reachOf,
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
    // The site itself reads through the local API, which bypasses this and
    // scopes by country; for a signed-in editor this narrows the admin list
    // to what they own plus what has been distributed to them. Editing stays
    // with the owning country either way.
    read: distributedRead(),
    create: canCreateIn("news"),
    update: countryScoped("news"),
    delete: countryScoped("news"),
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        const user = req.user as AdminUser | null;
        if (!data || !user || isSuper(user)) return data;

        // Publishing to the whole network is headquarters' call. Everyone
        // else distributes within their own continental sphere, so a single
        // country's team cannot put a story on all 68 sites.
        if (data.audience === "all") {
          throw new APIError(
            "Only a super admin can publish to every country. Choose the countries instead.",
            403,
          );
        }

        if (data.audience === "some") {
          const reach = new Set(reachOf(user));
          const outside = ((data.distributeTo ?? []) as string[]).filter(
            (code) => !reach.has(code),
          );
          if (outside.length > 0) {
            throw new APIError(
              `You can only distribute within your own region. Outside it: ${outside.join(", ")}.`,
              403,
            );
          }
        }
        return data;
      },
    ],
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
        description:
          "The country site this post belongs to. Its editors own it wherever else it appears.",
      },
      access: {
        // An editor must not be able to move a post out of their own scope,
        // or claim one from another country by retyping this field.
        update: ({ req: { user } }) => isSuper(user as AdminUser | null),
      },
    },
    {
      name: "audience",
      type: "select",
      required: true,
      defaultValue: "own",
      options: [
        { label: "This country only", value: "own" },
        { label: "Chosen countries", value: "some" },
        { label: "Every country", value: "all" },
      ],
      admin: {
        position: "sidebar",
        description:
          "Where this post is published. A post shown elsewhere is still edited here, by this country's team.",
      },
    },
    {
      name: "distributeTo",
      type: "select",
      hasMany: true,
      options: countryOptions,
      index: true,
      admin: {
        position: "sidebar",
        description: "The other country sites that also show this post.",
        condition: (data) => data?.audience === "some",
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
