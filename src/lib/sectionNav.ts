/** Shared with the mobile header's expandable "Who We Are" / "Get Involved"
 *  submenus, so both stay in sync with the desktop section sidebars. */
export const whoWeAreLinks = [
  { label: "Welcome", href: "/who-we-are/welcome" },
  { label: "Our Mission", href: "/who-we-are/mission" },
  { label: "Statement of Faith", href: "/who-we-are/statement-of-faith" },
  { label: "History", href: "/who-we-are/history" },
  { label: "Membership", href: "/who-we-are/membership" },
  {
    label: "Chapter Affiliation",
    href: "/get-involved/chapter-affiliation",
  },
  {
    label: "Staff/Executive Committee",
    href: "/who-we-are/staff-executive-committee",
  },
];

/**
 * The Get Involved sidebar and mobile submenu now follow the JOIN → GROW →
 * REACH → TRAIN → SERVE journey rather than listing every program page.
 * `href` scrolls to that stage's section on /get-involved and is what the
 * mobile header submenu (one level deep) links to; `activePaths` lets the
 * sidebar highlight a stage while a visitor is reading one of its program's
 * own detail pages; `items` is the stage's actual program pages, rendered as
 * a nested list under the stage heading in the desktop sidebar.
 */
export const getInvolvedLinks: {
  label: string;
  href: string;
  activePaths?: string[];
  items: { label: string; href: string }[];
}[] = [
  {
    label: "Join YEF",
    href: "/get-involved#join-yef",
    activePaths: ["/who-we-are/membership"],
    items: [{ label: "Become a Member", href: "/who-we-are/membership" }],
  },
  {
    label: "Grow",
    href: "/get-involved#grow",
    activePaths: ["/get-involved/bible-studies", "/get-involved/discipleship"],
    items: [
      { label: "Bible Studies", href: "/get-involved/bible-studies" },
      { label: "Discipleship", href: "/get-involved/discipleship" },
    ],
  },
  {
    label: "Reach",
    href: "/get-involved#reach",
    activePaths: [
      "/get-involved/campus-evangelism",
      "/get-involved/short-term-mission",
    ],
    items: [
      { label: "Campus Evangelism", href: "/get-involved/campus-evangelism" },
      { label: "Short-term Mission", href: "/get-involved/short-term-mission" },
    ],
  },
  {
    label: "Train",
    href: "/get-involved#train",
    activePaths: [
      "/get-involved/summer-training",
      "/get-involved/leadership-training",
    ],
    items: [
      { label: "Summer Training", href: "/get-involved/summer-training" },
      { label: "Leadership Training", href: "/get-involved/leadership-training" },
    ],
  },
  {
    label: "Serve",
    href: "/get-involved#serve",
    activePaths: ["/get-involved/volunteering"],
    items: [
      { label: "Volunteer", href: "/get-involved/volunteering" },
      { label: "Internship", href: "/get-involved#internship" },
    ],
  },
];
