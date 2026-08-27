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

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    hidden: ({ user }) => !hasSection(user as AdminUser | null, "media"),
  },
  access: {
    read: () => true,
    create: canCreateIn("media"),
    update: countryScoped("media"),
    delete: countryScoped("media"),
  },
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
      name: "country",
      type: "select",
      required: true,
      options: countryOptions,
      index: true,
      defaultValue: ({ user }: { user?: AdminUser | null }) =>
        scopeOf(user)[0] ?? "int",
      admin: { description: "Which country site owns this file." },
      access: {
        update: ({ req: { user } }) => isSuper(user as AdminUser | null),
      },
    },
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
