import { APIError, type CollectionConfig } from "payload";
import {
  canCreateIn,
  countryOptions,
  countryScoped,
  distributedRead,
  hasSection,
  isSuper,
  reachOf,
  scopeOf,
  type AdminUser,
} from "@/payload/access";

/**
 * A batch of photos from one YEF event. Shows on the News page's Photo News
 * tab as a single cover tile with a title; visitors click through to see
 * every photo in the batch. There is no article body here — just images and
 * a title, for the events that are better told in photos than in prose.
 */
export const PhotoEvents: CollectionConfig = {
  slug: "photo-events",
  labels: { singular: "Photo Event", plural: "Photo News" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "country", "publishedAt"],
    description:
      "A batch of photos from one event. The first photo is used as the cover tile.",
    hidden: ({ user }) => !hasSection(user as AdminUser | null, "news"),
  },
  access: {
    // Same reasoning as Posts: the admin list is narrowed to what a signed-in
    // editor owns plus what has been distributed to them; the public site
    // reads through the local API, which bypasses this and scopes by country.
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
  fields: [
    {
      name: "country",
      type: "select",
      required: true,
      options: countryOptions,
      index: true,
      defaultValue: ({ user }: { user?: AdminUser | null }) =>
        scopeOf(user)[0] ?? "int",
      admin: { position: "sidebar" },
      access: {
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
          "Where this batch is published. A batch shown elsewhere is still edited here, by this country's team.",
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
        description: "The other country sites that also show this batch.",
        condition: (data) => data?.audience === "some",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "e.g. Summer Mission Trip 2026 — Kenya." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "The web address for this batch, e.g. kenya-mission-trip-2026.",
      },
    },
    {
      name: "publishedAt",
      label: "Date",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "photos",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Photo", plural: "Photos" },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true },
        { name: "caption", type: "text" },
      ],
    },
  ],
};
