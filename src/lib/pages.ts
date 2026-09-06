import "server-only";
import { cmsConfigured } from "@/lib/posts";
import { getCountryCode } from "@/lib/i18n/request";

/** One section of a page, as saved by an editor. */
export type PageBlock = {
  blockType: string;
  [key: string]: unknown;
};

/** Block types that render as their own edge-to-edge section rather than
 *  content meant to sit inside a text column. */
const FULL_BLEED_BLOCK_TYPES = new Set(["missionSchoolCta"]);

/**
 * Splits the full-bleed blocks off the end of a layout so a page with a
 * sticky sidebar can render everything else inside the narrower content
 * column and these panels outside it, full width — the same block array an
 * editor saved, just rendered in two places. Only looks at the tail, since
 * that's the only place these appear in practice.
 */
export function splitTrailingFullBleed(layout: PageBlock[]): [PageBlock[], PageBlock[]] {
  let end = layout.length;
  while (end > 0 && FULL_BLEED_BLOCK_TYPES.has(layout[end - 1].blockType)) {
    end -= 1;
  }
  return [layout.slice(0, end), layout.slice(end)];
}

/**
 * The order the home page's sections ship in. A country with no saved page
 * renders this, so every site works before anyone opens the admin.
 */
export const defaultHomeLayout: PageBlock[] = [
  { blockType: "hero" },
  { blockType: "about" },
  { blockType: "mission" },
  { blockType: "campusFinder" },
  { blockType: "getInvolved" },
  { blockType: "proof" },
  { blockType: "movement" },
  { blockType: "giving" },
  { blockType: "signup" },
];

/** The order the Who We Are page's sections ship in. */
export const defaultWhoWeAreLayout: PageBlock[] = [
  { blockType: "whoWeAreHero" },
  { blockType: "introCards" },
  { blockType: "visionMission" },
  { blockType: "storiesNews" },
  { blockType: "missionSchoolCta" },
];

/** The order the Get Involved page's sections ship in — the same content
 *  `npm run seed` writes into the CMS, bundled here so the page still shows
 *  its real content if that seed has never run against this country. */
export const defaultGetInvolvedLayout: PageBlock[] = [
  {
    blockType: "genericJourney",
    stages: [
      {
        label: "Join",
        color: "#3D9BE9",
        title: "Become a Member",
        body: "Start your journey with YEF.",
        href: "#join-yef",
      },
      {
        label: "Grow",
        color: "#0066CF",
        title: "Bible Studies · Discipleship",
        body: "Grow in Christ, His Word, and community.",
        href: "#grow",
      },
      {
        label: "Reach",
        color: "#2F5FA8",
        title: "Campus Evangelism · Short-term Mission",
        body: "Share Christ on campus, and carry it beyond.",
        href: "#reach",
      },
      {
        label: "Train",
        color: "#5B4B8A",
        title: "Summer Training · Leadership Training",
        body: "Get equipped for ministry and leadership.",
        href: "#train",
      },
      {
        label: "Serve",
        color: "#B4823C",
        title: "Volunteer · Internship",
        body: "Give your gifts, time, and calling to serve.",
        href: "#serve",
      },
    ],
  },
  {
    blockType: "genericCta",
    heading: "Become a Member",
    body: "Take your first step and join a community of students following Jesus together.",
    buttonLabel: "Apply Now",
    buttonHref: "/who-we-are/membership",
    background: "navy",
  },
  {
    blockType: "genericText",
    heading: "Grow",
    paragraphs: [{ body: "Grow in Christ, His Word, and community." }],
  },
  {
    blockType: "genericImageText",
    image: { url: "/images/get-involved/bible-studies-sunset.png", alt: "The sun setting over a calm ocean" },
    imageAlt: "The sun setting over a calm ocean",
    imageSide: "right",
    heading: "Bible Studies",
    body: "Embrace your identity in Christ and live out your calling. YEF Bible Studies bring students together each week — one-on-one or in small groups — to open Scripture, ask honest questions, and learn to feed themselves on the Word, not just for a season, but for a lifetime. Every study is led by a trained student leader, not a lecturer, so you're walked through the text rather than simply told what it means. No question is off-limits — whether you're exploring faith for the first time or you've read the Bible your whole life, this is a place to bring your honest doubts into the light of Scripture, together with others doing the same. The Bible has the power to change lives, and we want every student on your campus to have a place to discover that for themselves.",
    buttonLabel: "Learn More",
    buttonHref: "/get-involved/bible-studies",
    buttonLabel2: "Apply Bible Study",
    buttonHref2: "/get-involved/apply",
  },
  {
    blockType: "genericIconCards",
    eyebrow: "What We Study",
    heading: "Foundations for a Lifetime of Faith",
    cards: [
      {
        icon: { url: "/images/icons/icon-four-spiritual-laws.svg", alt: "Four Spiritual Laws icon" },
        title: "The Four Spiritual Laws",
        body: "Discover the essential message of the Gospel—God’s love, our need for salvation, and faith in Jesus Christ.",
      },
      {
        icon: { url: "/images/icons/icon-romans.svg", alt: "Romans icon" },
        title: "Romans",
        body: "Explore the Gospel, God’s righteousness, and new life through faith in Jesus Christ.",
      },
      {
        icon: { url: "/images/icons/icon-way-of-the-cross.svg", alt: "The Way of the Cross icon" },
        title: "The Way of the Cross",
        body: "Walk through Christ's journey to the cross, and discover what it means to follow Him in suffering and in glory.",
      },
      {
        icon: { url: "/images/icons/icon-christ.svg", alt: "Christ icon" },
        title: "The Way of Faith",
        body: "Walk through the foundations of faith—repentance, assurance, and daily trust in the God who keeps His promises.",
      },
      {
        icon: { url: "/images/icons/icon-romans.svg", alt: "Romans icon" },
        title: "Galatians",
        body: "Stand firm in the freedom Christ won, and learn to live by the Spirit rather than by the law.",
      },
      {
        icon: { url: "/images/icons/icon-church.svg", alt: "Church icon" },
        title: "Acts",
        body: "Follow the early church as the Gospel spreads from Jerusalem to the ends of the earth.",
      },
      {
        icon: { url: "/images/icons/icon-romans.svg", alt: "Romans icon" },
        title: "1 & 2 Corinthians",
        body: "Learn what it means to live as the church—in unity, in love, and in the sufficiency of God’s grace.",
      },
      {
        icon: { url: "/images/icons/icon-four-spiritual-laws.svg", alt: "Four Spiritual Laws icon" },
        title: "The Sermon on the Mount",
        body: "Sit under the teaching of Jesus and see what life in the kingdom of God is meant to look like.",
      },
      {
        icon: { url: "/images/icons/icon-providing-education.svg", alt: "Providing Education icon" },
        title: "Providing Education",
        body: "Each student receives Biblical and practical training, empowering them to reach their dreams and become thriving disciples.",
      },
    ],
  },
  {
    blockType: "genericImageText",
    image: { url: "/images/get-involved/discipleship.webp", alt: "A student in discipleship training" },
    imageAlt: "A student in discipleship training",
    heading: "Discipleship Training",
    body: "Discipleship is one of the key focuses of our ministry. Jesus himself poured His life into twelve ordinary men and sent them to make disciples of the nations. At YEF, discipleship means walking with a trained mentor and a small group of your peers, working through the Word phase by phase — so you grow from being cared for into someone who can care for others. You don't need to have it all figured out. You just need a willingness to follow. Just as Jesus said, “Go, make disciples!”",
    buttonLabel: "Learn More",
    buttonHref: "/get-involved/discipleship",
    buttonLabel2: "Start Discipleship",
    buttonHref2: "/get-involved/apply",
  },
  {
    blockType: "genericText",
    heading: "Reach",
    paragraphs: [{ body: "Share Christ on campus, and carry it beyond." }],
  },
  {
    blockType: "genericFeature",
    heading: "Campus Evangelism",
    intro:
      "Youth Evangelical Fellowship (YEF) is dedicated to sharing the Gospel of Jesus Christ with students, transforming campus culture, and bringing the good news to every corner of university life. As creative and committed Christians, we work daily to reach the spiritually thirsty on campus and awaken the hearts of students worldwide.",
    image: { url: "/images/get-involved/campus-evangelism-walk.webp", alt: "Students walking together on a sunlit campus path" },
    imageAlt: "Students walking together on a sunlit campus path",
    items: [
      {
        icon: { url: "/images/icons/icon-christ.svg", alt: "Christ icon" },
        title: "01. Step Out & Share",
        body: "Step beyond your comfort zone and experience the joy of sharing the Gospel with fellow students, right where they already are.",
      },
      {
        icon: { url: "/images/icons/icon-church.svg", alt: "Church icon" },
        title: "02. Engage & Grow",
        body: "Follow up with the students you meet through Bible study and discipleship, so a single conversation grows into a lasting walk with Christ.",
      },
      {
        icon: { url: "/images/icons/icon-child.svg", alt: "Child icon" },
        title: "03. Equip & Go",
        body: "Receive Biblical and practical training and take your next step into campus evangelism.",
      },
    ],
    buttonLabel: "Learn more about Campus Evangelism",
    buttonHref: "/get-involved/campus-evangelism",
  },
  {
    blockType: "genericImageText",
    image: { url: "/images/get-involved/short-term-mission.webp", alt: "A woman leading a classroom in prayer" },
    imageAlt: "A woman leading a classroom in prayer",
    imageSide: "right",
    heading: "Short-term Mission",
    body: "YEF short-term mission trips send teams of students to serve during school breaks — on their own campus, in another city, another country, or online. Teams share the Gospel, lead Bible studies, pray for the campuses and communities they visit, and serve alongside local YEF chapters and churches. It's a chance to step out in faith, grow through hands-on ministry, and see God work through students who are simply willing to go.",
    buttonLabel: "Learn More",
    buttonHref: "/get-involved/short-term-mission",
    buttonLabel2: "Apply for Short-term Mission",
    buttonHref2: "/get-involved/short-term-mission/apply",
  },
  {
    blockType: "genericLinkCards",
    cards: [
      {
        image: { url: "/images/get-involved/trio-sharing-the-gospel.webp", alt: "YEF members handing out tracts on a European street" },
        title: "Sharing the Gospel",
        href: "/sharing-the-gospel",
      },
      {
        image: { url: "/images/get-involved/trio-reaching-the-campus.webp", alt: "A campus fellowship group gathered in a study lounge" },
        title: "Reaching the Campus",
        href: "/reaching-the-campus",
      },
      {
        image: { url: "/images/get-involved/trio-raising-disciples.webp", alt: "Two students swapping contact details outside a campus building" },
        title: "Raising Disciples",
        href: "/what-is-evangelical",
      },
    ],
  },
  {
    blockType: "genericText",
    heading: "Train",
    paragraphs: [{ body: "Get equipped for ministry and leadership." }],
  },
  {
    blockType: "genericImageText",
    image: { url: "/images/get-involved/summer-training.webp", alt: "YEF students setting up an outreach table on campus" },
    imageAlt: "YEF students setting up an outreach table on campus",
    heading: "Summer Training",
    body: "Every year, during students' summer break from campus, YEF gathers students from around the world for a season of training in the Word. Days are filled with Bible study, prayer, and fellowship with believers from different countries and cultures — alongside activities, camping, and a hands-on practicum in mission, evangelism, and teaching. Program details and dates vary each year, so stay tuned to our site events if you're interested.",
    buttonLabel: "Learn More",
    buttonHref: "/get-involved/summer-training",
    buttonLabel2: "Apply for Summer Training",
    buttonHref2: "/get-involved/apply",
  },
  {
    blockType: "genericImageText",
    image: { url: "/images/get-involved/leadership-training-conference.webp", alt: "YEF students clapping at a leadership training conference" },
    imageAlt: "YEF students clapping at a leadership training conference",
    imageSide: "right",
    heading: "Leadership Training",
    body: "YEF offers leadership training regionally and internationally to equip students with rich spiritual food for the road ahead. Leadership Training is open to students who have completed their discipleship program on their campus. During their training, they are formed as teachers and missionaries on campus — learning both the theology of mission and the practical craft of instructing and shepherding other students.",
    buttonLabel: "Learn More",
    buttonHref: "/get-involved/leadership-training",
    buttonLabel2: "Apply for Leadership Training",
    buttonHref2: "/get-involved/leadership-training/apply",
  },
  {
    blockType: "genericText",
    heading: "Serve",
    paragraphs: [{ body: "Give your gifts, time, and calling to serve." }],
  },
  {
    blockType: "genericImageText",
    image: { url: "/images/get-involved/volunteering-donation-drive.png", alt: "Volunteers sorting clothing at a donation drive" },
    imageAlt: "Volunteers sorting clothing at a donation drive",
    heading: "Volunteering",
    body: "As a volunteer with YEF, you put your everyday gifts — administration, hospitality, media, prayer, and more — to work building the ministry in your local chapter. Every role matters: a volunteer setting up chairs or editing a video is part of the same mission as a student sharing the Gospel on campus. Tell us about yourself, and we'll help you find where you're needed most.",
    buttonLabel: "Learn More",
    buttonHref: "/get-involved/volunteering",
    buttonLabel2: "Apply to Volunteer",
    buttonHref2: "/get-involved/volunteer",
  },
  {
    blockType: "genericFeature",
    heading: "Internship",
    intro:
      "Work under a trained professional in any field and learn the ropes from them! Internships at YEF HQ are open to YEF members from local chapters who have finished their leadership training and are willing to serve in building the ministry together. You can intern in video making, web design, technology, event-planning, communications, and more.",
    image: { url: "/images/get-involved/internship-outreach-table.webp", alt: "An intern smiling and helping a student at an outreach table" },
    imageAlt: "An intern smiling and helping a student at an outreach table",
    items: [
      {
        icon: { url: "/images/icons/icon-christ.svg", alt: "Christ icon" },
        title: "Hands-On Ministry:",
        body: "You won't just observe — you'll carry real responsibility on real projects, from video and design to events and communications, all in service of the Gospel going out.",
      },
      {
        icon: { url: "/images/icons/icon-church.svg", alt: "Church icon" },
        title: "Mentorship:",
        body: "A trained staff member walks alongside you, not just teaching a skill but discipling you in how to steward it for the Kingdom.",
      },
      {
        icon: { url: "/images/icons/icon-child.svg", alt: "Child icon" },
        title: "Sent, Not Just Trained:",
        body: "An internship at YEF HQ prepares you to carry what you've learned back to your own campus and chapter, equipped to serve and lead.",
      },
    ],
    buttonLabel: "I'm Interested in an Internship",
    buttonHref: "/get-involved/apply",
  },
  {
    blockType: "genericCta",
    heading: "Have a Story to Share?",
    body: "God has been at work in your life — we'd love to hear about it.",
    buttonLabel: "Share Your Story",
    buttonHref: "/submit-your-story",
  },
  {
    blockType: "genericCta",
    heading: "Still Not Sure Where to Start?",
    body: "Tell us what you're interested in, and we'll help you find the right opportunity.",
    buttonLabel: "Tell Us Your Interests",
    buttonHref: "/get-involved/apply",
    background: "navy",
  },
];

const defaultLayouts: Record<string, PageBlock[]> = {
  home: defaultHomeLayout,
  "who-we-are": defaultWhoWeAreLayout,
  "get-involved": defaultGetInvolvedLayout,
};

const INTERNATIONAL_COUNTRY = "int";

/**
 * The layout an editor has published for this country's page; if this
 * country has never published its own (the common case — most pages are
 * only ever edited once, for every site), the international page's layout;
 * or the bundled one if even that doesn't exist yet. `draft` reads the
 * unpublished version, which is how live preview shows work in progress.
 */
export async function getLayout(
  route = "home",
  draft = false,
): Promise<PageBlock[]> {
  const fallback = defaultLayouts[route] ?? [];
  if (!cmsConfigured) return fallback;
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const country = getCountryCode();

    const { docs } = await payload.find({
      collection: "pages",
      depth: 2,
      limit: 1,
      draft,
      where: { and: [{ route: { equals: route } }, { country: { equals: country } }] },
    });
    const layout = docs[0]?.layout as PageBlock[] | undefined;
    if (layout?.length) return layout;

    if (country !== INTERNATIONAL_COUNTRY) {
      const intl = await payload.find({
        collection: "pages",
        depth: 2,
        limit: 1,
        draft,
        where: {
          and: [{ route: { equals: route } }, { country: { equals: INTERNATIONAL_COUNTRY } }],
        },
      });
      const intlLayout = intl.docs[0]?.layout as PageBlock[] | undefined;
      if (intlLayout?.length) return intlLayout;
    }

    return fallback;
  } catch (error) {
    console.error("Falling back to the bundled page layout: ", error);
    return fallback;
  }
}

/** A built-in page's editable banner photo, heading, and intro line — the
 *  one thing every such page can override today, ahead of full section
 *  editing. Any field left empty in the CMS keeps the page's own default. */
export type PageHeader = {
  image?: string;
  imageAlt?: string;
  heading?: string;
  intro?: string;
};

type HeaderMedia = { url?: string | null; alt?: string | null } | number | null;

/**
 * The banner/heading/intro override an editor has published for this
 * country's page, or nothing if there is none — the caller merges whatever
 * comes back over its own hardcoded copy, field by field.
 */
export async function getPageHeader(route: string): Promise<PageHeader> {
  if (!cmsConfigured) return {};
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "pages",
      depth: 1,
      limit: 1,
      where: {
        and: [
          { route: { equals: route } },
          { country: { equals: getCountryCode() } },
        ],
      },
    });
    const header = docs[0]?.header as
      | { image?: HeaderMedia; heading?: string | null; intro?: string | null }
      | undefined;
    if (!header) return {};
    const image = typeof header.image === "object" ? header.image : null;
    return {
      image: image?.url ?? undefined,
      imageAlt: image?.alt ?? undefined,
      heading: header.heading ?? undefined,
      intro: header.intro ?? undefined,
    };
  } catch (error) {
    console.error("Falling back to the bundled page header: ", error);
    return {};
  }
}
