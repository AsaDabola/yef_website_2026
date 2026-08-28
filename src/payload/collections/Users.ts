import type { CollectionConfig } from "payload";
import {
  countryOptions,
  isSuper,
  regionOptions,
  sectionOptions,
  superOnlyField,
  usersAccess,
  usersReadAccess,
  type AdminUser,
} from "@/payload/access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: { singular: "Person", plural: "People & permissions" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["avatar", "email", "name", "role", "regions", "countries"],
    description:
      "Who can sign in, which country sites they are responsible for, and which parts of those sites they may edit.",
  },
  access: {
    read: usersReadAccess,
    // Handing out accounts is how permissions are granted, so it stays with
    // super admins rather than following the country scope. Subadmins and
    // country/continental admins alike can see the People list, but only a
    // super admin can add or remove someone from it.
    create: ({ req: { user } }) => isSuper(user as AdminUser | null),
    delete: ({ req: { user } }) => isSuper(user as AdminUser | null),
    update: usersAccess,
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        // Payload lets the very first account be created without a session.
        // Without this it would land as an editor with no countries and be
        // locked out of everything, including this collection.
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({ collection: "users" });
        return totalDocs === 0 ? { ...data, role: "super" } : data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Shown next to their name in the admin. Anyone can set their own.",
      },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Super Admin — every country, every section", value: "super" },
        {
          label: "Admin (Continental) — every country in their regions",
          value: "region-admin",
        },
        {
          label: "Admin (Country) — their countries, every section",
          value: "country-admin",
        },
        {
          label: "Subadmin — their countries, listed sections only",
          value: "editor",
        },
      ],
      access: { create: superOnlyField, update: superOnlyField },
      admin: { position: "sidebar" },
    },
    {
      name: "regions",
      type: "select",
      hasMany: true,
      options: regionOptions,
      access: { create: superOnlyField, update: superOnlyField },
      admin: {
        description:
          "The continents this person is responsible for. Every country in them falls into their scope.",
        condition: (data) => data?.role === "region-admin",
      },
    },
    {
      name: "countries",
      type: "select",
      hasMany: true,
      options: countryOptions,
      access: { create: superOnlyField, update: superOnlyField },
      admin: {
        description:
          "The country sites this person may edit. Ignored for super admins, who reach every country, and for continental admins, whose regions decide it.",
        condition: (data) =>
          data?.role !== "super" && data?.role !== "region-admin",
      },
    },
    {
      name: "sections",
      type: "select",
      hasMany: true,
      options: sectionOptions,
      access: { create: superOnlyField, update: superOnlyField },
      admin: {
        description:
          "The parts of those sites this person may edit. Continental and country admins reach every section, so this applies to editors.",
        condition: (data) => data?.role === "editor",
      },
    },
  ],
};
