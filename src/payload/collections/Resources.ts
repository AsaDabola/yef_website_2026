import type { CollectionConfig } from "payload";
import { revalidateAfterChange, revalidateAfterDelete } from "@/payload/hooks/revalidate";
import {
  canCreateIn,
  countryOptions,
  countryScoped,
  isSuper,
  scopeOf,
  type AdminUser,
} from "@/payload/access";

/**
 * The Resources hub's library: policies, training materials, forms, worship
 * & order sheets, and recorded messages (audio/video). One collection covers
 * all of it — `category` groups the hub's sections, `kind` decides how an
 * entry renders (a file to download, a player, or an external link).
 *
 * `visibility` is the internal/public split: "public" entries are readable by
 * anyone (so a ministry page can link or embed one for a logged-out visitor),
 * "internal" entries only by an approved member or a CMS user.
 */
export const Resources: CollectionConfig = {
  slug: "resources",
  labels: { singular: "Resource", plural: "Resources" },
  hooks: {
    beforeValidate: [
      /**
       * Files a new resource under the uploader's own country.
       *
       * Access control decides which records someone may write, not which
       * country they may write into them, so without this a country admin
       * could create a resource and leave `country` blank — which is the
       * headquarters library — or set someone else's. With one country to
       * their name it is filled in for them; with several they have to pick
       * one of theirs.
       */
      ({ data, req: { user } }) => {
        if (!data || !user || user.collection !== "users") return data;
        const admin = user as AdminUser;
        if (isSuper(admin)) return data;
        const scope = scopeOf(admin);
        if (scope.length === 0) return data;
        if (!data.country || !scope.includes(data.country)) {
          data.country = scope.length === 1 ? scope[0] : undefined;
        }
        return data;
      },
    ],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "kind", "visibility"],
    description:
      "Policies, training materials, forms, worship resources, and recorded messages shown on the Resources hub.",
  },
  /**
   * Reading stays wide and writing is scoped by country.
   *
   * Headquarters' training materials and policies are the point of the hub,
   * so narrowing `read` would hide from a country team the very documents
   * they are meant to work from. Writing is the part that had to change: it
   * used to be "anyone with a CMS account", which let a country admin edit or
   * delete headquarters' policies and every other country's files.
   */
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === "users" || user?.collection === "members") {
        return true;
      }
      return { visibility: { equals: "public" } };
    },
    create: canCreateIn("resources"),
    update: countryScoped("resources"),
    delete: countryScoped("resources"),
  },
  upload: {
    mimeTypes: ["application/pdf", "audio/*", "video/*", "image/*"],
    // An External link resource has no file — only a document/audio/video
    // upload needs one.
    filesRequiredOnCreate: false,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Policy", value: "policy" },
        { label: "Training Resources", value: "training" },
        { label: "Forms", value: "forms" },
        { label: "Worship & Order", value: "worship" },
        { label: "Media (Audio & Video)", value: "media" },
      ],
      index: true,
    },
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "document",
      options: [
        { label: "Document (uploaded file)", value: "document" },
        { label: "Audio", value: "audio" },
        { label: "Video", value: "video" },
        { label: "External link", value: "link" },
      ],
    },
    {
      name: "externalUrl",
      type: "text",
      admin: {
        description: "Only used when Kind is set to External link.",
        condition: (data) => data?.kind === "link",
      },
    },
    {
      name: "visibility",
      type: "select",
      required: true,
      defaultValue: "internal",
      options: [
        { label: "Internal — members only", value: "internal" },
        { label: "Public — visible to anyone", value: "public" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "country",
      type: "select",
      options: countryOptions,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Which country's library this belongs to. Left blank it is headquarters', and only a super admin can change it.",
      },
    },
    {
      name: "relatedSlug",
      type: "text",
      admin: {
        position: "sidebar",
        description:
          "Optional: a page section id (e.g. \"leadership-training\") to also surface this resource there.",
      },
    },
  ],
};
