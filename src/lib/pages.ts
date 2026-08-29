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

/** Year/title/body entries for the History timeline fallback — kept in sync
 *  by hand with `historyTimelineEntries` in `src/payload/seed.ts`. */
const historyTimelineItems = [
  {
    year: "2002",
    title: "The Beginning",
    body: "Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary, laying an early foundation for university-centered evangelism and discipleship.",
  },
  {
    year: "2003",
    title: "Development of YEF",
    body: "The ministry began developing independently as Youth Evangelical Fellowship, carrying forward the vision of evangelizing university students and raising young disciples for the mission of God.",
  },
  {
    year: "2004",
    title: "Expansion in Korea",
    body: "The Korea Evangelical College Students Association was established by Dr. David Jang, further strengthening university mission efforts in Korea.",
  },
  {
    year: "2005",
    title: "Campus Mission Expands",
    body: "The ministry expanded throughout Korea to approximately 40 universities across 12 regional branches, establishing a broader foundation for campus evangelism and discipleship.",
  },
  {
    year: "2006",
    title: "Participation in Urbana 06",
    body: "YEF participated in the Urbana 06 missions conference in St. Louis, Missouri, beginning their expansion abroad and joining young Christians and mission leaders from around the world in seeking God's direction for global evangelism.",
  },
  {
    year: "2007",
    title: "Mission Engagement and Publications",
    body: "YEF participated in MissionFest Toronto in Canada. The ministry also published several books related to global mission and contemporary religious issues, including How Islam Plans to Change the World by William Wagner. YEF also participated in the publication of READ, a magazine focused on revival and discipleship organized through a Korean Christian youth and university network.",
  },
  {
    year: "2008",
    title: "Growing International Connections",
    body: "YEF participated in the World Evangelical Alliance General Assembly and the WEA Mission Commission. The ministry also organized theological seminars, including discussions on the modern understanding of the Student Volunteer Movement and its continuing significance for world mission.",
  },
  {
    year: "2009",
    title: "A New Chapter in International Campus Mission",
    body: "YEF was inaugurated in New York City with students from Columbia University who began gathering for small-group Bible studies and witnessing Jesus Christ to fellow students. During the same year, the Korea Evangelical College Students Association became affiliated with YEF International as its Korean branch. Jongwon Lee was appointed as the representative of YEF Korea. YEF participated as a partner organization in the NEXT WAVE CONVENTION and attended the third Asia Emerging Leaders Summit.",
  },
  {
    year: "2010",
    title: "Strengthening Biblical and Global Mission Training",
    body: "YEF participated in the Tokyo 2010 Global Mission Consultation. New editions of Bible study materials, including a Romans study series, were published. YEF also held a World Mission Workshop, Summer Gathering 2010, and Pentecost Gathering 2010.",
  },
  {
    year: "2011",
    title: "Strengthening Mission Partnerships",
    body: "Kyungil Ahn was appointed as the representative of YEF Korea. YEF Korea became an official member organization of the Korea World Missions Association (KWMA). Throughout the year, YEF held the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
  },
  {
    year: "2012",
    title: "Research, Publications, and Gatherings",
    body: "The Korea Evangelical Institute was established as a research and publishing organization. YEF held the Easter Gathering 2012, Pentecost Gathering 2012, Summer Gathering 2012, and Winter Christmas Gathering 2012. YEF also participated in the 22nd General Assembly of the Korea World Missions Association.",
  },
  {
    year: "2013",
    title: "International Mission and Leadership Development",
    body: "YEF participated in the World Evangelical Alliance Youth Commission's East Asia Youth Mission Leaders Consultation and the YEF International World Mission Conference. Throughout the year, YEF organized the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering. YEF also co-hosted and participated in the first through fourth Revival Bible Camps organized by the Revival Movement and participated in the 23rd General Assembly of KWMA.",
  },
  {
    year: "2014",
    title: "Developing Discipleship and Bible Education",
    body: "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014. The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development. YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
  },
  {
    year: "2015",
    title: "Global Expansion and Leadership Development",
    body: "By 2015, YEF's international mission had expanded to campuses across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia. This period also marked the beginning of YEF's first Leadership Conference series in Korea, bringing leaders together for biblical training, fellowship, mission planning, and preparation for continued international expansion. YEF held the Easter Gathering, Pentecost Gathering, and Christmas Retreat and participated in the 25th General Assembly of KWMA.",
  },
  {
    year: "2016",
    title: "Developing Discipleship and Bible Education",
    body: "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014. The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development. YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
  },
  {
    year: "2017",
    title: "Strengthening the Asia Mission Network",
    body: "YEF continued its Leadership Conference series in Korea, strengthening relationships among leaders and developing a broader vision for the growing international mission. The ministry also held the Easter Retreat, Summer Retreat, and Christmas Retreat. YEF participated in the 2017 General Assembly of the Asia Evangelical Alliance and the 27th General Assembly of the Korea World Missions Association.",
  },
  {
    year: "2018",
    title: "Building the Asia Pacific Mission Network",
    body: "YEF launched the 2018 YEF Asia Pacific Mission Network, further strengthening cooperation between fellowships throughout the region. The Easter Retreat, Summer Retreat, and Christmas Retreat were also held. YEF participated in the 28th General Assembly of KWMA.",
  },
  {
    year: "2019",
    title: "International Mission Conferences and Global Partnerships",
    body: "YEF held the 2019 YEF International Mission Conference in the United Kingdom. Representatives participated in the 2019 World Olivet Assembly General Assembly in Dover, New York, as well as the World Evangelical Alliance General Assembly in Jakarta, Indonesia. YEF also held the Easter Retreat, Summer Retreat, and Christmas Retreat. The ministry participated in the 18th Korea Mission Leaders Forum and the 29th General Assembly of KWMA.",
  },
  {
    year: "2020",
    title: "YEF Headquarters Established in Orlando",
    body: "A significant milestone in YEF's international development came in 2020 with the acquisition of YEF Headquarters in Orlando, Florida. The headquarters provided a permanent base for international mission coordination, leadership development, training, worship, fellowship, and missionary preparation. During the same year, YEF Korea established a mission center serving Kyungpook National University in Daegu and another center in Busan serving Pukyong National University and Kyungsung University. As ministry increasingly moved online, YEF held the Online Easter Retreat 2020, Online Summer Retreat 2020, and Online Christmas Retreat 2020. YEF also participated in the 30th General Assembly of KWMA.",
  },
  {
    year: "2021",
    title: "New Mission Centers and Continued Online Discipleship",
    body: "YEF established centers serving KAIST in Daejeon and Kyungpook National University. A YEF Mission Center was also established in Macau, strengthening the ministry's presence in Asia. YEF hosted the Online Easter Retreat 2021, Online Summer Retreat 2021, and Christmas Retreat 2021. The ministry participated as a member organization in the 31st General Assembly of the Korea World Missions Association. Chanyu Kim was appointed as the representative of YEF Korea.",
  },
  {
    year: "2022",
    title: "Continued Leadership and Ministry Development",
    body: "YEF held its 2022 Summer Retreat. Rev. Myunghyuk Kim, senior pastor emeritus of Riverside Church, was appointed as an advising professor for YEF Korea. Minwook Hwang was appointed as the representative of YEF Korea.",
  },
  {
    year: "2023",
    title: "Strengthening Mission Partnerships",
    body: "YEF held its 2023 Summer Retreat. Representatives participated in the 33rd General Assembly of the Korea World Missions Association. Rev. Haejoo Kang was appointed as the representative of YEF Korea.",
  },
  {
    year: "2025",
    title: "Equipping a New Generation at YEF Headquarters",
    body: "In 2025, YEF Headquarters in Orlando held a large internship program and Summer Retreat for college students and young missionaries. Through Bible study, worship, prayer, evangelism, ministry training, fellowship, and practical mission experiences, participants were given opportunities to deepen their faith while experiencing the daily life of Christian mission. These programs reflected YEF's continued commitment to raising and equipping a new generation of students and young missionaries who can carry the gospel to university campuses, cities, and nations.",
  },
  {
    year: "2026",
    title: "2026 — Expanding the Mission to More Than 60 Nations",
    body: "In 2026, YEF enters a new season of international expansion with plans to establish and strengthen chapters across more than 60 nations. Building upon more than two decades of campus evangelism, discipleship, leadership development, and international mission, YEF is working to develop stronger national fellowships, digital mission platforms, local leadership, and partnerships with churches around the world. The vision is not simply to establish a presence in more countries, but to build sustainable mission fields where young people can encounter the gospel, study the Word of God, grow as disciples, and eventually become missionaries and leaders themselves.",
  },
];

/** The Welcome subpage's bundled content, below the kept-static lead line. */
const defaultWelcomeLayout: PageBlock[] = [
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "Youth Evangelical Fellowship is a group of proactive, outreaching Christians, whose youth and passion are spent on bringing glory to God’s name. We want to see the Great Commission of Jesus fulfilled in each and every major city in the world as he promised in his prayer, “thy kingdom come, thy will be done on earth as it is in heaven.” (Matthew 6:10) YEF has been a symbol of revival in urban mission since its establishment, working to redeem college campuses for the greater cause of Jesus Christ.",
      },
      {
        body: "You are about to dive into the deep Word of God with our members at your local fellowships and university campuses. I sincerely pray that YEF will strengthen you spiritually and that you will be fully equipped in spirit and truth while you walk on this faith journey. We thank you for your continued prayers for YEF as we work to make meaningful changes in the lives of many.",
      },
      {
        body: "Welcome to the beginning of an amazing journey with God! We are excited to help you on your journey of faith to grow closer to God!",
      },
    ],
  },
];

/** The Our Mission subpage's bundled content, below the kept-static lead
 *  line and feature card. */
const defaultMissionLayout: PageBlock[] = [
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "The word “evangelical” comes from the Greek term εὐαγγέλιον (euangelion), meaning “good news” or “gospel.” At its core, it refers to the message of salvation through Jesus Christ, the central message of Christianity. In the early days of the church, this “good news” was spread through evangelism, the act of sharing Christ’s message with others. From the beginning, believers have been called to share this good news with others, fulfilling Jesus’ command in Matthew 28:19-20: “Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.”",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote:
      "Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent.",
    reference: "John 17:3 NIV",
  },
  {
    blockType: "genericText",
    heading: "To Know Christ and Make Him Known",
    paragraphs: [
      {
        body: "Over the centuries, “evangelical” came to describe a movement within Christianity that highlights a few key beliefs:",
      },
      { body: "The Bible as the ultimate authority. (2 Tim 3:16-17)" },
      { body: "The need for a personal relationship with Jesus. (John 3:3)" },
      {
        body: "The belief in Jesus’ death and resurrection as the way to salvation. (Romans 10:9)",
      },
      {
        body: "A strong commitment to sharing the gospel and spreading Christ’s message. (Romans 1:16)",
      },
    ],
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "At Youth Evangelical Fellowship (YEF), this mission is at the heart of everything we do. YEF exists to raise up young leaders who believe in these core principles and live them out in their everyday lives. We believe that young people have a unique and powerful role in spreading the good news, building vibrant communities of faith, and drawing others closer to God.",
      },
      {
        body: "Through Bible study, fellowship, and outreach, YEF is dedicated to equipping young believers to grow in their faith and share it with others. Evangelism isn’t just about telling others about Jesus—it’s about living out the transformative love of Christ in ways that invite others to experience it for themselves!",
      },
      {
        body: "Our mission is to ignite a passion for Christ in the hearts of young people and empower them to be the next generation of leaders who will bring revival and transformation to their communities and beyond.",
      },
    ],
  },
];

/** The Statement of Faith subpage's bundled content. */
const defaultStatementOfFaithLayout: PageBlock[] = [
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "We believe in the Holy Scriptures as originally given by God, divinely inspired, infallible, entirely trustworthy; and the supreme authority in all matters of faith and conduct.",
      },
      {
        body: "We believe in One God, eternally existent in three persons, Father, Son, and Holy Spirit.",
      },
      {
        body: "We believe in Our Lord Jesus Christ, God manifest in the flesh, His virgin birth, His sinless human life, His divine miracles, His vicarious and atoning death, His bodily resurrection, His ascension, His mediatorial work, and His Personal return in power and glory.",
      },
      {
        body: "We believe in the Salvation of lost and sinful man through the shed blood of the Lord Jesus Christ by faith apart from works, and regeneration by the Holy Spirit.",
      },
      {
        body: "We believe in The Holy Spirit, by whose indwelling the believer is enabled to live a holy life, to witness and work for the Lord Jesus Christ.",
      },
      {
        body: "We believe in the Unity of the Spirit of all true believers, the Church, the Body of Christ.",
      },
      {
        body: "We believe in the Resurrection of both the saved and the lost; they that are saved unto the resurrection of life, they that are lost unto the resurrection of damnation.",
      },
    ],
  },
];

/** The History subpage's bundled content, below the kept-static
 *  breadcrumb/heading. */
const defaultHistoryLayout: PageBlock[] = [
  {
    blockType: "genericGallery",
    images: [
      {
        image: {
          url: "/images/history/hero-large.png",
          alt: "Youth Evangelical Fellowship headquarters building",
        },
        alt: "Youth Evangelical Fellowship headquarters building",
      },
      {
        image: {
          url: "/images/history/hero-small-top.png",
          alt: "YEF international staff gathered together",
        },
        alt: "YEF international staff gathered together",
      },
      {
        image: {
          url: "/images/history/hero-small-bottom.png",
          alt: "Students on a campus mission trip",
        },
        alt: "Students on a campus mission trip",
      },
    ],
  },
  {
    blockType: "genericText",
    heading: "From a Small Campus Mission to a Global Youth Fellowship",
    paragraphs: [
      {
        body: "Youth Evangelical Fellowship (YEF) traces its roots to 2002, when Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary (OTCS). In 2003, the ministry began developing into what would become Youth Evangelical Fellowship, carrying a growing vision to reach university students through the Word of God, discipleship, and evangelism.",
      },
      {
        body: "A significant new chapter began in New York City in 2009, when YEF was inaugurated with students from Columbia University who were moved by the Holy Spirit to gather for small-group Bible studies and share the gospel of Jesus Christ with their fellow students. From these early gatherings, YEF developed with a clear focus: to reach university students who are thirsty for the Word of God, help them grow as disciples of Jesus Christ, and raise a young generation willing to participate in God’s mission.",
      },
      {
        body: "By the grace of God, the ministry continued expanding internationally. By 2015, YEF’s mission had reached campuses across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia. The growth of YEF reflects Jesus’ description of the Kingdom of God:",
      },
    ],
  },
  {
    blockType: "genericQuote",
    quote:
      "“It is like a mustard seed, which, when sown upon the soil, though it is smaller than all the seeds that are upon the soil, yet when it is sown, it grows up and becomes larger than all the garden plants and forms large branches; so that the birds of the air can nest under its shade.”",
    reference: "Mark 4:31–32",
  },
  {
    blockType: "genericText",
    paragraphs: [
      {
        body: "YEF’s commission is to raise a young generation who love the Cross of Jesus Christ, boldly proclaim His sacrifice and the power of His salvation, and dream together for the Kingdom of God. YEF firmly believes in international growth and in equipping young people from diverse backgrounds to devote themselves to Jesus Christ and His Great Commission. Through biblical teaching, discipleship, evangelism, leadership development, retreats, mission conferences, and local fellowship life, YEF seeks to help young believers passionately embody Kingdom-centered lifestyles. Youth Evangelical Fellowship is a member of the World Olivet Assembly and an associate member of the World Evangelical Alliance.",
      },
    ],
  },
  {
    blockType: "genericTimeline",
    heading: "YEF Through the Years",
    items: historyTimelineItems,
  },
  {
    blockType: "genericText",
    heading: "Continuing the Mission",
    paragraphs: [
      {
        body: "From its early roots in campus ministry to an international fellowship reaching across continents, YEF’s history is a testimony to God’s grace and faithfulness.",
      },
      {
        body: "What began as a small seed has continued to grow through Bible studies, campus evangelism, retreats, mission centers, leadership conferences, international partnerships, missionary training, and the dedication of young believers who have answered God’s call.",
      },
      {
        body: "Today, YEF continues looking toward the future with a vision for more campuses, cities, mission centers, and nations. As chapters are established and strengthened across more than 60 nations, YEF desires to raise young people who will not only receive the gospel but also become disciples, leaders, and missionaries who carry it to others.",
      },
    ],
  },
  {
    blockType: "genericText",
    heading: "Our History Is Still Being Written",
    paragraphs: [
      {
        body: "Every student reached, every Bible study opened, every leader raised, every missionary sent, every campus pioneered, and every nation reached becomes another chapter in the story of God’s work through YEF.",
      },
      {
        body: "From a small mustard seed to a growing international mission, YEF continues forward in faith—raising the next generation to love Christ, serve His Church, and carry the gospel to the nations.",
      },
    ],
  },
];

/** The Membership subpage's bundled content, below the kept-static
 *  breadcrumb/heading/intro line. */
const defaultMembershipLayout: PageBlock[] = [
  {
    blockType: "genericText",
    heading: "What Membership Means",
    paragraphs: [
      {
        body: "Becoming a YEF member means committing to grow in your walk with Christ alongside a local chapter, while staying connected to YEF’s wider international fellowship. Members affirm the YEF Statement of Faith and sign the Membership Covenant, which lays out what we believe and how we commit to living and serving together.",
      },
      { body: "Bible studies, discipleship, and mentorship within your local chapter" },
      { body: "A voice in your chapter’s life and leadership" },
      { body: "Invitations to YEF trainings, retreats, and mission opportunities" },
      { body: "Connection to a wider fellowship of YEF chapters and members" },
    ],
  },
  {
    blockType: "genericText",
    heading: "Apply to join",
    paragraphs: [
      {
        body: "Fill out the application below. As part of joining, you’ll also be asked to review and sign the YEF Membership Covenant.",
      },
    ],
  },
];

const defaultLayouts: Record<string, PageBlock[]> = {
  home: defaultHomeLayout,
  "who-we-are": defaultWhoWeAreLayout,
  "who-we-are/welcome": defaultWelcomeLayout,
  "who-we-are/mission": defaultMissionLayout,
  "who-we-are/statement-of-faith": defaultStatementOfFaithLayout,
  "who-we-are/history": defaultHistoryLayout,
  "who-we-are/membership": defaultMembershipLayout,
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
