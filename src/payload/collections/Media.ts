import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    // Sized to the two places these images are used: the news grid card and
    // the Around the Movement tile.
    imageSizes: [
      { name: "card", width: 624, height: 468, position: "centre" },
      { name: "tile", width: 938, height: 992, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describe the photo for screen readers and for when it fails to load.",
      },
    },
  ],
};
