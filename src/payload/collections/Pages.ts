import type { CollectionConfig } from "payload";
import { homeBlocks } from "@/payload/blocks";
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
 * A page as an ordered list of sections.
 *
 * The site falls back to its bundled layout whenever a country has no page
 * saved, so publishing one is opt-in per country: a country admin builds
 * their own home page when they want to, and inherits the design until then.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "route", "country", "_status"],
    description:
      "Build a page by stacking sections. Drag a section by its handle to reorder it.",
    hidden: ({ user }) => !hasSection(user as AdminUser | null, "home"),
    livePreview: {
      url: ({ data }) =>
        `/api/preview?country=${data?.country ?? "int"}&route=${
          data?.route ?? "home"
        }`,
      breakpoints: [
        { label: "Phone", name: "phone", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 834, height: 1112 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  access: {
    read: () => true,
    create: canCreateIn("home"),
    update: countryScoped("home"),
    delete: countryScoped("home"),
  },
  versions: { drafts: true },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "For the admin list only; not shown on the site." },
    },
    {
      name: "route",
      type: "select",
      required: true,
      defaultValue: "home",
      options: [{ label: "Home page", value: "home" }],
      index: true,
      admin: {
        position: "sidebar",
        description: "Which page of the country's site this lays out.",
      },
    },
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
        // Same reason as Posts: a select must not be a way out of your scope.
        update: ({ req: { user } }) => isSuper(user as AdminUser | null),
      },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: homeBlocks,
      admin: {
        description:
          "Sections render top to bottom in this order. Removing one falls back to nothing — leave it in place to keep it.",
      },
    },
  ],
};
