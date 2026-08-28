import type { CollectionConfig } from "payload";

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
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "kind", "visibility"],
    description:
      "Policies, training materials, forms, worship resources, and recorded messages shown on the Resources hub.",
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === "users" || user?.collection === "members") {
        return true;
      }
      return { visibility: { equals: "public" } };
    },
    create: ({ req: { user } }) => user?.collection === "users",
    update: ({ req: { user } }) => user?.collection === "users",
    delete: ({ req: { user } }) => user?.collection === "users",
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
