import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { countryOptions, isSuper, scopeOf, type AdminUser } from "@/payload/access";

const isLeader = (data?: { role?: string | null } | null) =>
  data?.role === "leader";

/**
 * Public-facing accounts for the Resources hub: YEF students, leaders, staff,
 * and ministers. Distinct from `users` (the CMS editors) — different people,
 * different purpose, and mixing them would let a site visitor's account carry
 * CMS edit rights.
 *
 * New accounts are unapproved until a `users` admin flips the checkbox in
 * `/admin`; `beforeLogin` refuses to sign in anyone who isn't.
 */
/**
 * The members an admin may see, which is the ones in their own countries.
 *
 * This used to be `user?.collection === "users"` — true for any signed-in
 * editor — so every country admin could read, edit and delete every member in
 * the network. These records carry names, email addresses, the country someone
 * is in and where they are in their training, so "any admin" was the wrong
 * answer; the rest of the CMS has scoped by country all along and this did
 * not.
 *
 * A member with no country set is left to super admins rather than shown to
 * everyone: an unassigned record is not evidence that it belongs to whoever
 * happens to be looking.
 */
function adminScope(user: AdminUser) {
  if (isSuper(user)) return true;
  const scope = scopeOf(user);
  if (scope.length === 0) return false;
  return { country: { in: scope } };
}

export const Members: CollectionConfig = {
  slug: "members",
  auth: true,
  labels: { singular: "Member", plural: "Members" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "approved"],
    description:
      "Accounts for the Resources hub — approve a member here before they can sign in.",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.collection === "users") return adminScope(user as AdminUser);
      if (user?.collection === "members") return { id: { equals: user.id } };
      return false;
    },
    update: ({ req: { user } }) => {
      if (user?.collection === "users") return adminScope(user as AdminUser);
      if (user?.collection === "members") return { id: { equals: user.id } };
      return false;
    },
    delete: ({ req: { user } }) =>
      user?.collection === "users" ? adminScope(user as AdminUser) : false,
  },
  hooks: {
    beforeLogin: [
      ({ user }) => {
        if (!user.approved) {
          throw new APIError(
            "Your account is awaiting approval from a YEF staff member.",
            403,
            undefined,
            true,
          );
        }
        return user;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "member",
      options: [
        { label: "Member", value: "member" },
        { label: "Leader", value: "leader" },
        { label: "Staff", value: "staff" },
        { label: "Minister", value: "minister" },
      ],
      access: {
        update: ({ req: { user } }) => user?.collection === "users",
      },
    },
    {
      name: "approved",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "A member can't sign in until this is checked.",
      },
      access: {
        update: ({ req: { user } }) => user?.collection === "users",
      },
    },
    {
      name: "country",
      type: "select",
      options: countryOptions,
      index: true,
      admin: {
        description: "The country site this leader serves — powers the leadership dashboard.",
        condition: isLeader,
      },
    },
    {
      name: "trainingStage",
      type: "select",
      options: [
        { label: "Join", value: "join" },
        { label: "Grow", value: "grow" },
        { label: "Reach", value: "reach" },
        { label: "Train", value: "train" },
        { label: "Serve", value: "serve" },
      ],
      index: true,
      admin: {
        description: "Where this leader is in the Join/Grow/Reach/Train/Serve journey.",
        condition: isLeader,
      },
    },
    {
      name: "advancingToNextStage",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Checked once this leader is ready to move to the next stage.",
        condition: isLeader,
      },
    },
    {
      name: "raisedUpAt",
      type: "date",
      admin: {
        description: "The date this person was raised up as a leader.",
        condition: isLeader,
        date: { pickerAppearance: "dayOnly" },
      },
    },
  ],
};
