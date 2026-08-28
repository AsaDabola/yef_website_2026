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
    read: countryScoped("news"),
    create: canCreateIn("news"),
    update: countryScoped("news"),
    delete: countryScoped("news"),
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
