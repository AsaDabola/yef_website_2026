import type { CollectionConfig } from "payload";
import {
  canCreateIn,
  countryOptions,
  countryScoped,
  hasSection,
  type AdminUser,
} from "@/payload/access";

/**
 * The leadership roles each country site is expected to staff (Chapter
 * Leader, Bible Study Leader, etc). Distinct from `members` — a position can
 * exist and sit unfilled, which is exactly what the leadership dashboard
 * needs to surface.
 */
export const LeadershipPositions: CollectionConfig = {
  slug: "leadership-positions",
  labels: { singular: "Leadership Position", plural: "Leadership Positions" },
  admin: {
    useAsTitle: "positionTitle",
    defaultColumns: ["positionTitle", "country", "filled", "filledBy"],
    description:
      "The leadership roles each country is expected to fill. Leave \"Filled\" unchecked for an open position — it then shows up on the dashboard's unfilled-positions list.",
    hidden: ({ user }) => !hasSection(user as AdminUser | null, "network"),
  },
  access: {
    read: () => true,
    create: canCreateIn("network"),
    update: countryScoped("network"),
    delete: countryScoped("network"),
  },
  fields: [
    { name: "positionTitle", type: "text", required: true },
    {
      name: "country",
      type: "select",
      required: true,
      options: countryOptions,
      index: true,
    },
    {
      name: "filled",
      type: "checkbox",
      defaultValue: false,
      index: true,
      admin: {
        description: "Checked once someone is serving in this role.",
      },
    },
    {
      name: "filledBy",
      type: "relationship",
      relationTo: "members",
      admin: {
        condition: (data) => Boolean(data?.filled),
        description: "Who currently holds this position.",
      },
    },
  ],
};
