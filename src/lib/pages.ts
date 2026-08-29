import "server-only";
import { cmsConfigured } from "@/lib/posts";
import { getCountryCode } from "@/lib/i18n/request";

/** One section of a page, as saved by an editor. */
export type PageBlock = {
  blockType: string;
  [key: string]: unknown;
};

/**
 * The order the home page's sections ship in. A country with no saved page
 * renders this, so every site works before anyone opens the admin.
 */
export const defaultHomeLayout: PageBlock[] = [
  { blockType: "hero" },
  { blockType: "campusFinder" },
  { blockType: "about" },
  { blockType: "mission" },
  { blockType: "proof" },
  { blockType: "getInvolved" },
  { blockType: "testimonials" },
  { blockType: "giving" },
  { blockType: "movement" },
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

/** The order each converted Get Involved subpage's sections ship in — the
 *  full bundled copy, since generic block components carry no defaults of
 *  their own (unlike Hero/AboutUs/etc., which fall back field by field). */
export const defaultBibleStudiesLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/bible-studies-table-discussion.webp",
          alt: "Students gathered around a table for Bible study",
        },
      },
      {
        image: {
          url: "/images/get-involved/bible-studies-rephidim-meeting.webp",
          alt: "A group of students at a YEF Bible study meeting",
        },
      },
      {
        image: {
          url: "/images/get-involved/bible-studies-group-prayer.webp",
          alt: "Students bowed together in prayer",
        },
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "Embrace your identity in Christ and live out your calling. YEF Bible Studies bring students together each week — one-on-one or in small groups — to open Scripture, ask honest questions, and learn to feed themselves on the Word, not just for a season, but for a lifetime.",
      },
      {
        body: "Every study is led by a trained student leader, not a lecturer. You won't just be told what a passage means — you'll be walked through it, so that reading and understanding the Bible for yourself becomes a habit that outlasts your college years.",
      },
      {
        body: "No question is off-limits. Whether you're exploring faith for the first time or you've read the Bible your whole life, Bible study is a place to bring your honest doubts and questions into the light of Scripture, together with others doing the same.",
      },
      {
        body: "Many YEF leaders trace their walk with Christ back to a single Bible study — a friend who invited them, a passage that finally made sense, a small group that became family. The Word of God has the power to change a life, and that change often starts here.",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote: "“Your word is a lamp for my feet, a light on my path.”",
    reference: "— Psalm 119:105",
  },
  {
    blockType: "genericCards",
    heading: "What You'll Experience",
    cards: [
      {
        title: "A Weekly Rhythm",
        body: "Bible study meets every week — a steady rhythm of opening Scripture together that becomes a natural part of campus life.",
      },
      {
        title: "One-on-One or Small Group",
        body: "Study individually with a leader or alongside a small group of peers — whichever format fits where you are.",
      },
      {
        title: "A Place for Honest Questions",
        body: "Doubts, hard questions, and half-formed thoughts are welcome here. Bible study is a place to wrestle with Scripture, not just receive it.",
      },
      {
        title: "Feed Yourself on the Word",
        body: "The goal isn't just to finish a study — it's to leave equipped to open your Bible on your own, long after college ends.",
      },
    ],
  },
  {
    blockType: "genericImageText",
    image: {
      url: "/images/get-involved/bible-studies-open-bibles.webp",
      alt: "Students with open Bibles studying together outdoors",
    },
    imageAlt: "Students with open Bibles studying together outdoors",
    imageSide: "left",
    heading: "Where It Leads",
    body: "For many students, a Bible study becomes the start of something deeper — a mentoring relationship, a small group that turns into Discipleship Training, a calling to lead others the way they were led. Wherever you're starting, there's room to grow further.",
  },
  {
    blockType: "genericCta",
    heading: "Join a Bible Study",
    body: "Tell us you're interested, and someone from your local chapter will reach out to get you connected.",
    buttonLabel: "Apply Bible Study",
    buttonHref: "/get-involved/apply",
  },
];

export const defaultDiscipleshipLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/discipleship-friends-sky.webp",
          alt: "A group of friends laughing together outdoors",
        },
      },
      {
        image: {
          url: "/images/get-involved/discipleship-embrace.webp",
          alt: "Believers embracing one another in fellowship",
        },
      },
      {
        image: {
          url: "/images/get-involved/discipleship-praying-hands.webp",
          alt: "A student praying over an open Bible",
        },
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "Discipleship is one of the key focuses of our ministry. Jesus himself poured His life into twelve ordinary men and sent them to make disciples of the nations — not through a classroom, but through years of walking, eating, and ministering alongside them.",
      },
      {
        body: "Discipleship at YEF follows that same pattern. You walk with a trained mentor and a small group of your peers, working through God's Word together — so that you grow from being cared for into someone who can care for others.",
      },
      {
        body: "This isn't a program you complete and move past. It's a relationship — one-on-one meetings, honest conversation, and Scripture opened together — that keeps shaping you long after any one phase is finished.",
      },
      {
        body: "You don't need to have it all figured out. You just need a willingness to follow.",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote:
      "“Go therefore and make disciples of all nations… teaching them to observe all that I have commanded you.”",
    reference: "— Matthew 28:19-20",
  },
  {
    blockType: "genericCards",
    heading: "What Discipleship Looks Like",
    cards: [
      {
        title: "A Mentor Who Walks With You",
        body: "You're paired with a trained leader who meets with you one-on-one — not to lecture, but to listen, pray, and open Scripture together.",
      },
      {
        title: "Small Group Bible Study",
        body: "Alongside one-on-one mentoring, you'll study the Word in a small group of your peers — asking honest questions and learning to feed yourselves on Scripture.",
      },
      {
        title: "Growth by Phase",
        body: "Discipleship moves through phases — from the foundations of the Gospel and your identity in Christ, to living out God's calling and the Great Commission in everyday life.",
      },
    ],
  },
  {
    blockType: "genericImageText",
    image: {
      url: "/images/get-involved/discipleship-hand-raised.webp",
      alt: "A young man raising his hand in worship at sunset",
    },
    imageAlt: "A young man raising his hand in worship at sunset",
    imageSide: "left",
    heading: "What Comes Next",
    body: "Discipleship is where leaders are formed. Many students who complete the program go on to Leadership Training, equipped to disciple others the way they were discipled — the same pattern Jesus gave His own disciples, carried forward one generation at a time.",
  },
  {
    blockType: "genericText",
    heading: "Who Can Join?",
    paragraphs: [
      {
        body: "Discipleship is open to any student connected to a YEF chapter, wherever you're at in your walk with Christ — new believer or long-time follower.",
      },
      {
        body: "You don't need to have it all figured out. You just need a willingness to follow.",
      },
    ],
  },
  {
    blockType: "genericCta",
    heading: "Start Your Discipleship Journey",
    body: "Tell us you're interested, and a leader from your local chapter will reach out to walk this next step with you.",
    buttonLabel: "Start Discipleship",
    buttonHref: "/get-involved/apply",
  },
];

export const defaultLeadershipRetreatsLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/leadership-retreat-classroom.webp",
          alt: "A leader teaching a session to a room of students at a retreat",
        },
      },
      {
        image: {
          url: "/images/get-involved/gallery-street-outreach.png",
          alt: "Team members sharing the gospel on the street",
        },
      },
      {
        image: {
          url: "/images/get-involved/gallery-campus-chat.png",
          alt: "Team members talking on a university campus",
        },
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "YEF International Leadership Retreats bring together ministers, chapter leaders, missionaries, staff, and emerging leaders from around the world for concentrated times of spiritual renewal, leadership training, fellowship, and mission planning.",
      },
      {
        body: "Leadership in YEF begins with faith. Before we can lead others, we must continually allow ourselves to be led by God through His Word. For this reason, the Leadership Retreat is not simply a conference about methods, strategies, or organizational development. It is first a time for leaders to gather before God, examine their faith and mission, strengthen their spiritual foundation, and renew their calling to serve the Gospel.",
      },
      {
        body: "The retreat also provides an important opportunity for leaders serving in different nations and regions to meet one another personally. Although each mission field faces different circumstances, YEF leaders share one calling: to reach the younger generation with the Gospel, raise disciples through the Word of God, and establish strong mission communities that can continue carrying the Gospel forward.",
      },
      {
        body: "Above all, the retreat seeks to remind every leader that Christian leadership is ultimately service. Jesus taught His disciples that greatness in the Kingdom of God is not found in position or recognition, but in becoming a servant of others.",
      },
      {
        body: "Through International Leadership Retreats, YEF seeks to strengthen this foundation and build a worldwide network of leaders who share the same Gospel, the same mission, and the same hope for the next generation.",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote:
      "“For even the Son of Man came not to be served but to serve, and to give his life as a ransom for many.”",
    reference: "— Mark 10:45",
  },
  {
    blockType: "genericImageText",
    image: {
      url: "/images/get-involved/leadership-retreat-shepherd-sunset.webp",
      alt: "A shepherd leading sheep across a field at sunset",
    },
    imageAlt: "A shepherd leading sheep across a field at sunset",
    imageSide: "left",
    heading: "Upcoming Leadership Retreats",
    body: "Join YEF leaders from around the world for a time of spiritual renewal, training, fellowship, and preparation for the mission ahead.",
  },
];

export const defaultShortTermMissionLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/short-term-mission-friends.webp",
          alt: "Three friends with backpacks setting off from a train platform",
        },
      },
      {
        image: {
          url: "/images/get-involved/short-term-mission-signpost.webp",
          alt: "A signpost pointing to Short-Term and Long-Term",
        },
      },
      {
        image: {
          url: "/images/get-involved/short-term-mission-hands.webp",
          alt: "A team stacking hands together in unity",
        },
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "YEF short-term mission trips send teams of students to serve during school breaks — on their own campus, in another city, another country, or online. Teams share the Gospel, lead Bible studies, pray for the campuses and communities they visit, and serve alongside local YEF chapters and churches.",
      },
      {
        body: "No one goes alone. Every trip is a team — praying, preparing, and serving together, so that the weight of the mission is carried together and the joy of it is shared together too.",
      },
      {
        body: "A trip doesn't end when the team comes home. Students they meet are connected to Bible study and discipleship, so a short trip can grow into a lasting walk with Christ long after the team has left.",
      },
      {
        body: "It's a chance to step out in faith, grow through hands-on ministry, and see God work through students who are simply willing to go.",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote: "“Here am I. Send me!”",
    reference: "— Isaiah 6:8",
  },
  {
    blockType: "genericCards",
    heading: "What You'll Experience",
    cards: [
      {
        title: "Team-Based Ministry",
        body: "Trips are done as a team, not alone — praying, planning, and serving together, and encouraging one another along the way.",
      },
      {
        title: "Evangelism & Bible Study",
        body: "Teams meet students and community members, share the Gospel, and lead or join Bible studies that continue after the trip ends.",
      },
      {
        title: "Prayer & Worship",
        body: "Every trip is anchored in prayer — for the people you'll meet, the local church, and your team, alongside daily worship and reflection.",
      },
      {
        title: "Serving Local Chapters & Churches",
        body: "Teams come alongside local YEF chapters and churches, serving what God is already building rather than working apart from it.",
      },
    ],
  },
  {
    blockType: "genericText",
    heading: "Preparing to Go",
    paragraphs: [
      {
        body: "Before a team departs, they walk through preparation together, so every student arrives ready — spiritually and practically.",
      },
    ],
  },
  {
    blockType: "genericCards",
    cards: [
      {
        title: "Team Training",
        body: "Teams train together before the trip — Scripture, evangelism practice, and getting to know the people they'll serve alongside.",
      },
      {
        title: "Support Raising",
        body: "Trips are carried by prayer and financial partnership. We'll walk you through inviting others into your trip through support raising.",
      },
      {
        title: "Travel & Safety Prep",
        body: "From logistics to safety guidelines and cultural preparation, our team helps you get ready to serve well and serve safely.",
      },
    ],
  },
  {
    blockType: "genericText",
    heading: "Who Can Join?",
    paragraphs: [
      {
        body: "Short-term Mission is open to students and young adults connected to YEF.",
      },
      {
        body: "You don't need to be an experienced evangelist — you need a willing heart and a readiness to serve as part of a team.",
      },
    ],
  },
];

export const defaultSummerTrainingLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/summer-training-beach-run.webp",
          alt: "Students running and laughing together on the beach at sunset",
        },
      },
      {
        image: {
          url: "/images/get-involved/summer-training-zipline.webp",
          alt: "A student ziplining through the trees",
        },
      },
      {
        image: {
          url: "/images/get-involved/summer-training-journal.webp",
          alt: "A student journaling by the water during a quiet moment",
        },
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "Every year, during students' summer break from campus, YEF gathers students from around the world for a season of training in the Word. It's a time set apart from the school year — a chance to slow down, be surrounded by prayer and Scripture, and build friendships with believers from different countries and cultures who share the same calling.",
      },
      {
        body: "Days are anchored in Bible study, teaching, and extended prayer, but Summer Training isn't only what happens indoors. Camping, outdoor activities, and shared meals build community alongside the more structured teaching times — friendships forged around a campfire are as much a part of the training as the sessions themselves.",
      },
      {
        body: "Students also put what they're learning into practice through a hands-on mission practicum — evangelism, teaching, and serving others — under the guidance of experienced leaders. It's one thing to study the Great Commission; Summer Training gives students a place to begin living it out.",
      },
      {
        body: "Program details and dates vary each year, so stay tuned to our site and events if you're interested in joining.",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote: "“As iron sharpens iron, so one person sharpens another.”",
    reference: "— Proverbs 27:17",
  },
  {
    blockType: "genericCards",
    heading: "What You'll Experience",
    cards: [
      {
        title: "Bible Study & Prayer",
        body: "Each day is anchored in the Word — Bible study, teaching, and times of extended prayer that give students room to slow down and go deeper with God.",
      },
      {
        title: "Fellowship from Around the World",
        body: "Students travel in from different countries and cultures to train side by side, building friendships across the global YEF family.",
      },
      {
        title: "Activities & Camping",
        body: "Training isn't all indoors. Camping, outdoor activities, and shared meals build community alongside the more structured teaching times.",
      },
      {
        title: "Mission Practicum",
        body: "Students put what they're learning into practice through hands-on evangelism and teaching, under the guidance of experienced leaders.",
      },
    ],
  },
  {
    blockType: "genericImageText",
    image: {
      url: "/images/get-involved/summer-training-campfire.webp",
      alt: "Students gathered around a campfire under a starry sky at Summer Training",
    },
    imageAlt: "Students gathered around a campfire under a starry sky at Summer Training",
    imageSide: "left",
    heading: "Where It Leads",
    body: "Summer Training often becomes a turning point — students return to their campus with a deeper walk with Christ and a renewed sense of calling, ready to go further into discipleship, leadership, or their first short-term mission trip.",
  },
  {
    blockType: "genericText",
    heading: "Who Can Join?",
    paragraphs: [
      {
        body: "Summer Training is open to college students and young adults connected to YEF, whatever stage of faith they're at.",
      },
      {
        body: "You don't need prior training or ministry experience — you need a willing heart and a desire to grow.",
      },
    ],
  },
];

export const defaultVolunteeringLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/get-involved/volunteering-campus-outreach.webp",
          alt: "A volunteer talking with students at a campus outreach table",
        },
      },
      {
        image: {
          url: "/images/get-involved/volunteering-donation-drive.png",
          alt: "Volunteers waving beside a donation box at a clothing drive",
        },
      },
      {
        image: {
          url: "/images/get-involved/volunteering-clipboard.webp",
          alt: 'A volunteer wearing a "Volunteer" shirt writing on a clipboard',
        },
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "As a volunteer with YEF, you put your everyday gifts to work building the ministry in your local chapter — administration, hospitality, media, prayer, event support, and more.",
      },
      {
        body: "Every role matters. The same mission that sends a student to share the Gospel on campus is carried forward by the volunteer setting up chairs, editing a video, welcoming guests at the door, or covering a shift in prayer.",
      },
      {
        body: "Volunteering doesn't require a title or a stage — it requires availability and a willing heart. Scripture describes the body of Christ as many parts, each one necessary (1 Corinthians 12); this is that truth lived out in ordinary, faithful service.",
      },
      {
        body: "Whether you can give an afternoon or a whole semester, there's a place for you to serve.",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote: "“Whatever you do, work at it with all your heart, as working for the Lord.”",
    reference: "— Colossians 3:23",
  },
  {
    blockType: "genericCards",
    heading: "Ways to Serve",
    cards: [
      {
        title: "Find Your Fit",
        body: "Administration, hospitality, media and design, prayer, event support — YEF chapters need every kind of gift, not just the ones on stage.",
      },
      {
        title: "Flexible Commitment",
        body: "Serve weekly, seasonally, or for a single event — whatever fits the season of life you're in right now.",
      },
      {
        title: "Serve Alongside Your Chapter",
        body: "Volunteering happens locally, coordinated with your chapter's leaders, so your service is connected to a team, not done alone.",
      },
      {
        title: "No Experience Required",
        body: "You don't need special training or a ministry background to start — just a willingness to be useful.",
      },
    ],
  },
  {
    blockType: "genericText",
    heading: "Who Can Join?",
    paragraphs: [
      {
        body: "Volunteering is open to anyone connected to a YEF chapter — students, alumni, staff families, and friends of the ministry.",
      },
      {
        body: "Tell us a bit about yourself, and we'll help match you to where you're needed most.",
      },
    ],
  },
  {
    blockType: "genericCta",
    heading: "Give Your Time",
    body: "Tell us about yourself below, and we'll help you find where you're needed most.",
    buttonLabel: "Apply to Volunteer",
    buttonHref: "/get-involved/volunteer",
  },
];

const defaultLayouts: Record<string, PageBlock[]> = {
  home: defaultHomeLayout,
  "who-we-are": defaultWhoWeAreLayout,
  "get-involved/bible-studies": defaultBibleStudiesLayout,
  "get-involved/discipleship": defaultDiscipleshipLayout,
  "get-involved/leadership-retreats": defaultLeadershipRetreatsLayout,
  "get-involved/short-term-mission": defaultShortTermMissionLayout,
  "get-involved/summer-training": defaultSummerTrainingLayout,
  "get-involved/volunteering": defaultVolunteeringLayout,
};

/**
 * The layout an editor has published for this country's page, or the bundled
 * one. `draft` reads the unpublished version, which is how live preview shows
 * work in progress.
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
    const { docs } = await payload.find({
      collection: "pages",
      depth: 2,
      limit: 1,
      draft,
      where: {
        and: [
          { route: { equals: route } },
          { country: { equals: getCountryCode() } },
        ],
      },
    });
    const layout = docs[0]?.layout as PageBlock[] | undefined;
    return layout?.length ? layout : fallback;
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
