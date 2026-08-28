import type { CollectionConfig } from "payload";
import { pageBlocks } from "@/payload/blocks";
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
      options: [
        { label: "Home page", value: "home" },
        { label: "Who We Are", value: "who-we-are" },
        { label: "Who We Are — Welcome", value: "who-we-are/welcome" },
        { label: "Who We Are — Our Mission", value: "who-we-are/mission" },
        {
          label: "Who We Are — Statement of Faith",
          value: "who-we-are/statement-of-faith",
        },
        { label: "Who We Are — History", value: "who-we-are/history" },
        { label: "Who We Are — Membership", value: "who-we-are/membership" },
        {
          label: "Who We Are — Staff/Executive Committee",
          value: "who-we-are/staff-executive-committee",
        },
        { label: "Get Involved", value: "get-involved" },
        { label: "Get Involved — Connect With YEFI", value: "get-involved/apply" },
        {
          label: "Get Involved — Campus Evangelism",
          value: "get-involved/campus-evangelism",
        },
        {
          label: "Get Involved — Begin Your Mission Journey",
          value: "get-involved/campus-evangelism/apply",
        },
        {
          label: "Get Involved — Chapter Affiliation",
          value: "get-involved/chapter-affiliation",
        },
        {
          label: "Get Involved — International Leadership Retreats",
          value: "get-involved/leadership-retreats",
        },
        { label: "Get Involved — Volunteer with YEF", value: "get-involved/volunteer" },
        { label: "News", value: "news" },
        { label: "Network", value: "network" },
        { label: "Donate", value: "donate" },
        { label: "Contact Us", value: "contact" },
        { label: "Request Access", value: "join" },
        { label: "Sign In", value: "login" },
        { label: "Reaching the Campus", value: "reaching-the-campus" },
        { label: "Resources", value: "resources" },
        { label: "Sharing the Gospel", value: "sharing-the-gospel" },
        { label: "Submit Your Story", value: "submit-your-story" },
        { label: "Raising Disciples", value: "what-is-evangelical" },
        { label: "YEF Mission School", value: "yef-mission-school" },
        {
          label: "YEF Mission School — Apply",
          value: "yef-mission-school/apply",
        },
      ],
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
      name: "builtIn",
      type: "checkbox",
      defaultValue: false,
      admin: {
        readOnly: true,
        description:
          "This page is listed so every real page of the site shows up here, but its sections are not yet wired to the CMS — editing them still means changing code. Home and Who We Are are the only pages with real section editing below.",
      },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: pageBlocks,
      admin: {
        condition: (data) => data?.builtIn !== true,
        description:
          "Sections render top to bottom in this order. Removing one falls back to nothing — leave it in place to keep it.",
      },
    },
  ],
};
