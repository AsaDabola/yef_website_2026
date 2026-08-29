import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsArticles } from "@/lib/news";
import type { Page } from "@/payload-types";
import newsRealImages from "@/payload/newsRealImages.json";

const realImages = newsRealImages as Record<string, { url: string; filename: string }>;

/**
 * Moves what the site already ships with into the CMS, so /admin shows real,
 * editable documents instead of an empty list backed by bundled fallbacks.
 * Safe to re-run: everything is matched on slug/route and skipped if it
 * already exists, so re-running after an editor has made changes won't
 * overwrite their work.
 *
 *   npm run seed
 *
 * Also runs automatically at the end of every production build (see
 * package.json), since that is the only place with real database access —
 * this sandbox can't reach the live Postgres instance directly.
 */

type Payload = Awaited<ReturnType<typeof getPayload>>;

/** Uploads a public/ file as Media once per source path, reusing the same
 *  document for every article that shares a placeholder image. */
function mediaUploader(payload: Payload) {
  const cache = new Map<string, number>();
  return async (publicPath: string, alt: string): Promise<number> => {
    const cached = cache.get(publicPath);
    if (cached !== undefined) return cached;

    const filePath = path.join(process.cwd(), "public", publicPath);
    const ext = path.extname(filePath).slice(1);
    const mimetype =
      ext === "jpg" ? "image/jpeg" : ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    const media = await payload.create({
      collection: "media",
      data: { alt, country: "int" },
      file: {
        data: await fs.readFile(filePath),
        name: path.basename(filePath),
        mimetype,
        size: (await fs.stat(filePath)).size,
      },
    });
    const id = Number(media.id);
    cache.set(publicPath, id);
    return id;
  };
}

type MediaUploader = ReturnType<typeof mediaUploader>;

/**
 * The Home and Who We Are pages' real, current bundled copy, built into a
 * saved layout so the block editor shows exactly what the site already
 * says instead of an empty form. Kept in sync by hand with each block
 * component's own `defaults` (Hero.tsx, AboutUs.tsx, MissionStatement.tsx,
 * WhyTheYoung.tsx, SignUp.tsx, and the who-we-are/ equivalents) — there is
 * no single source both this standalone script and those "use client"/
 * server components can share.
 */
async function buildDefaultHomeLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "hero",
      slides: [
        {
          image: await uploadMedia(
            "/images/home-v2/hero-fire.webp",
            "Youth gathered around a bonfire at dusk",
          ),
          heading: "To Know Christ.\nTo Make Him Known.",
          body: "For we do not preach ourselves but Jesus Christ as Lord",
        },
        {
          image: await uploadMedia(
            "/images/home-v2/hero-headquarters.webp",
            "Youth Evangelical Fellowship headquarters building",
          ),
          heading: "For Christ.\nFor the Campus.\nFor the Nations.",
          body: "We exist to help students know Christ, live for Him on campus, and carry the Gospel to the nations.",
        },
        {
          image: await uploadMedia(
            "/images/home-v2/slide-2-students.webp",
            "Students smiling together on a mission trip",
          ),
          heading: "Reaching Students.\nRaising Disciples.",
          body: "A global evangelical campus fellowship sharing the Gospel, teaching the Bible, and raising disciples of Jesus Christ.",
          buttonLabel: "FIND YOUR CAMPUS",
          buttonHref: "#find-your-campus",
        },
      ],
    },
    { blockType: "campusFinder" },
    {
      blockType: "about",
      image: await uploadMedia(
        "/images/home-v2/about-us-photo.webp",
        "Students celebrating together on campus",
      ),
      eyebrow: "About Us",
      heading: "A global campus",
      headingAccent: "fellowship",
      lead: "YEF is a global evangelical fellowship where university students encounter Christ, grow in the Word, and learn to share the Gospel with others.",
      body: "Founded in New York City in 2009, YEF began with students gathering around Scripture, prayer, and campus evangelism. As disciples were raised and new leaders were sent out, the fellowship expanded across cities and nations, united by the same Gospel and mission.",
      stats: [
        { value: "WORD", label: "ROOTED IN SCRIPTURE" },
        { value: "MISSION", label: "FROM CAMPUS TO NATIONS" },
      ],
    },
    {
      blockType: "mission",
      eyebrow: "Mission Statement",
      verse:
        "Your people will offer themselves freely on\nthe day of your power; young people will\ncome to",
      verseAccent: "you like the morning dew.",
      reference: "Psalm 110:3",
      columns: [
        {
          body: "We exist to help students **know Jesus Christ deeply, build their lives on the Word of God,** and **grow into mature disciples** whose faith shapes every part of life.",
        },
        {
          body: "From campus evangelism and Bible study to discipleship and leadership, YEF equips students to **share the Gospel, serve others**, and **carry Christ’s mission into the world.**",
        },
      ],
    },
    {
      blockType: "proof",
      eyebrow: "The Call",
      heading:
        "In the days of your youth, before the days of trouble come, **remember your Creator**.",
      items: [
        {
          name: "Know Christ",
          body: "The university years are a formative season when convictions, values, and direction for life are taking shape. YEF calls students to seek Christ and build their lives firmly upon Him.",
        },
        {
          name: "Grow in the\nWord",
          body: "Through Scripture, prayer, fellowship, and discipleship, students deepen their faith, develop a biblical worldview, and learn to follow Christ in every area of life.",
        },
        {
          name: "Live on Mission",
          body: "Faith is meant to be lived and shared. Students are encouraged to serve others, make disciples, and carry the Gospel to their friends, campuses, communities, and beyond.",
        },
      ],
    },
    { blockType: "getInvolved" },
    { blockType: "testimonials" },
    { blockType: "giving" },
    { blockType: "movement" },
    {
      blockType: "signup",
      eyebrow: "Stay Up to Date",
      heading: "News from the campuses.",
      body: "Field reports, training dates, and stories from students around the world.",
      buttonLabel: "Sign Up",
    },
  ];
}

async function buildDefaultWhoWeAreLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "whoWeAreHero",
      image: await uploadMedia(
        "/images/who-we-are/hero-mountains.png",
        "Mountain range at dusk",
      ),
      heading: "Who We Are",
      body: "YEF is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many around the world.",
      missionBody:
        "YEF exists to reach and plant the Gospel of Christ’s love into the souls of the youth on campus—those who can bring great, lasting impact to the future of Christian faith.",
      portrait: await uploadMedia(
        "/images/who-we-are/hero-president-portrait.webp",
        "Dr. Mark Wagner, President of Youth Evangelical Fellowship",
      ),
      quote:
        "“God has a Great Calling for His people. Walk the journey with faith and you will find true joy and peace”",
      signature: "- Dr. Mark Wagner, President of Youth Evangelical Fellowship",
    },
    {
      blockType: "introCards",
      eyebrow: "Who we are",
      heading: "Youth Evangelical Fellowship",
      cards: [
        {
          image: await uploadMedia(
            "/images/who-we-are/intro-welcome.png",
            "Youth Evangelical Fellowship building",
          ),
          eyebrow: "NEW TO YEF?\nSTART YOUR\nJOURNEY HERE",
          title: "Welcome",
          cta: "START HERE",
        },
        {
          image: await uploadMedia(
            "/images/who-we-are/intro-membership.png",
            "Three students smiling together outdoors on a mission trip",
          ),
          eyebrow: "READY TO\nJOIN THE\nFELLOWSHIP",
          title: "Membership",
          cta: "JOIN US",
        },
        {
          image: await uploadMedia(
            "/images/who-we-are/intro-statement-of-faith.png",
            "A wooden cross resting on an open Bible before a world map",
          ),
          eyebrow: "WHAT WE\nBELIEVE AND\nTEACH",
          title: "Statement of Faith",
          cta: "READ MORE",
        },
      ],
    },
    {
      blockType: "visionMission",
      heading: "Our Vision & Mission",
      body: "Youth Evangelical Fellowship (YEF) is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide.",
      image: await uploadMedia(
        "/images/who-we-are/vision-cross-bible.jpg",
        "A wooden cross resting on an open Bible",
      ),
      pillars: [
        {
          title: "Reach the Next Generation",
          body: "Share the Gospel with university students and young people, helping them encounter Jesus Christ and build their lives upon God's Word.",
        },
        {
          title: "Raise Disciples and Leaders",
          body: "Nurture young believers through Bible study, fellowship, and spiritual training, equipping them to become faithful disciples who can lead and serve others.",
        },
        {
          title: "Advance the Gospel to the Nations",
          body: "Establish and strengthen campus fellowships around the world, raising missionaries and sending the next generation to participate in the Great Commission.",
        },
      ],
    },
    { blockType: "storiesNews" },
    { blockType: "missionSchoolCta" },
  ];
}

/** The real, current bundled copy for the six Who We Are subpages that have
 *  been converted to the generic block library, built the same way as
 *  `buildDefaultWhoWeAreLayout` above. */
async function buildDefaultWelcomeLayout(_uploadMedia: MediaUploader) {
  return [
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
}

async function buildDefaultMissionLayout(_uploadMedia: MediaUploader) {
  return [
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
}

async function buildDefaultStatementOfFaithLayout(_uploadMedia: MediaUploader) {
  return [
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
}

/** Year/title/body entries for the History timeline — the exact copy that
 *  used to live in `HistoryTimeline.tsx`'s `timeline` array, folded into
 *  one body paragraph per entry since `genericTimeline` carries a single
 *  textarea rather than a list. */
const historyTimelineEntries: { year: string; title: string; body: string[] }[] = [
  {
    year: "2002",
    title: "The Beginning",
    body: [
      "Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary, laying an early foundation for university-centered evangelism and discipleship.",
    ],
  },
  {
    year: "2003",
    title: "Development of YEF",
    body: [
      "The ministry began developing independently as Youth Evangelical Fellowship, carrying forward the vision of evangelizing university students and raising young disciples for the mission of God.",
    ],
  },
  {
    year: "2004",
    title: "Expansion in Korea",
    body: [
      "The Korea Evangelical College Students Association was established by Dr. David Jang, further strengthening university mission efforts in Korea.",
    ],
  },
  {
    year: "2005",
    title: "Campus Mission Expands",
    body: [
      "The ministry expanded throughout Korea to approximately 40 universities across 12 regional branches, establishing a broader foundation for campus evangelism and discipleship.",
    ],
  },
  {
    year: "2006",
    title: "Participation in Urbana 06",
    body: [
      "YEF participated in the Urbana 06 missions conference in St. Louis, Missouri, beginning their expansion abroad and joining young Christians and mission leaders from around the world in seeking God's direction for global evangelism.",
    ],
  },
  {
    year: "2007",
    title: "Mission Engagement and Publications",
    body: [
      "YEF participated in MissionFest Toronto in Canada.",
      "The ministry also published several books related to global mission and contemporary religious issues, including How Islam Plans to Change the World by William Wagner.",
      "YEF also participated in the publication of READ, a magazine focused on revival and discipleship organized through a Korean Christian youth and university network.",
    ],
  },
  {
    year: "2008",
    title: "Growing International Connections",
    body: [
      "YEF participated in the World Evangelical Alliance General Assembly and the WEA Mission Commission.",
      "The ministry also organized theological seminars, including discussions on the modern understanding of the Student Volunteer Movement and its continuing significance for world mission.",
    ],
  },
  {
    year: "2009",
    title: "A New Chapter in International Campus Mission",
    body: [
      "YEF was inaugurated in New York City with students from Columbia University who began gathering for small-group Bible studies and witnessing Jesus Christ to fellow students.",
      "During the same year, the Korea Evangelical College Students Association became affiliated with YEF International as its Korean branch. Jongwon Lee was appointed as the representative of YEF Korea.",
      "YEF participated as a partner organization in the NEXT WAVE CONVENTION and attended the third Asia Emerging Leaders Summit.",
    ],
  },
  {
    year: "2010",
    title: "Strengthening Biblical and Global Mission Training",
    body: [
      "YEF participated in the Tokyo 2010 Global Mission Consultation.",
      "New editions of Bible study materials, including a Romans study series, were published.",
      "YEF also held a World Mission Workshop, Summer Gathering 2010, and Pentecost Gathering 2010.",
    ],
  },
  {
    year: "2011",
    title: "Strengthening Mission Partnerships",
    body: [
      "Kyungil Ahn was appointed as the representative of YEF Korea.",
      "YEF Korea became an official member organization of the Korea World Missions Association (KWMA).",
      "Throughout the year, YEF held the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
    ],
  },
  {
    year: "2012",
    title: "Research, Publications, and Gatherings",
    body: [
      "The Korea Evangelical Institute was established as a research and publishing organization.",
      "YEF held the Easter Gathering 2012, Pentecost Gathering 2012, Summer Gathering 2012, and Winter Christmas Gathering 2012.",
      "YEF also participated in the 22nd General Assembly of the Korea World Missions Association.",
    ],
  },
  {
    year: "2013",
    title: "International Mission and Leadership Development",
    body: [
      "YEF participated in the World Evangelical Alliance Youth Commission's East Asia Youth Mission Leaders Consultation and the YEF International World Mission Conference.",
      "Throughout the year, YEF organized the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
      "YEF also co-hosted and participated in the first through fourth Revival Bible Camps organized by the Revival Movement and participated in the 23rd General Assembly of KWMA.",
    ],
  },
  {
    year: "2014",
    title: "Developing Discipleship and Bible Education",
    body: [
      "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014.",
      "The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development.",
      "YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
    ],
  },
  {
    year: "2015",
    title: "Global Expansion and Leadership Development",
    body: [
      "By 2015, YEF's international mission had expanded to campuses across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia.",
      "This period also marked the beginning of YEF's first Leadership Conference series in Korea, bringing leaders together for biblical training, fellowship, mission planning, and preparation for continued international expansion.",
      "YEF held the Easter Gathering, Pentecost Gathering, and Christmas Retreat and participated in the 25th General Assembly of KWMA.",
    ],
  },
  {
    year: "2016",
    title: "Developing Discipleship and Bible Education",
    body: [
      "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014.",
      "The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development.",
      "YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
    ],
  },
  {
    year: "2017",
    title: "Strengthening the Asia Mission Network",
    body: [
      "YEF continued its Leadership Conference series in Korea, strengthening relationships among leaders and developing a broader vision for the growing international mission.",
      "The ministry also held the Easter Retreat, Summer Retreat, and Christmas Retreat.",
      "YEF participated in the 2017 General Assembly of the Asia Evangelical Alliance and the 27th General Assembly of the Korea World Missions Association.",
    ],
  },
  {
    year: "2018",
    title: "Building the Asia Pacific Mission Network",
    body: [
      "YEF launched the 2018 YEF Asia Pacific Mission Network, further strengthening cooperation between fellowships throughout the region.",
      "The Easter Retreat, Summer Retreat, and Christmas Retreat were also held.",
      "YEF participated in the 28th General Assembly of KWMA.",
    ],
  },
  {
    year: "2019",
    title: "International Mission Conferences and Global Partnerships",
    body: [
      "YEF held the 2019 YEF International Mission Conference in the United Kingdom.",
      "Representatives participated in the 2019 World Olivet Assembly General Assembly in Dover, New York, as well as the World Evangelical Alliance General Assembly in Jakarta, Indonesia.",
      "YEF also held the Easter Retreat, Summer Retreat, and Christmas Retreat. The ministry participated in the 18th Korea Mission Leaders Forum and the 29th General Assembly of KWMA.",
    ],
  },
  {
    year: "2020",
    title: "YEF Headquarters Established in Orlando",
    body: [
      "A significant milestone in YEF's international development came in 2020 with the acquisition of YEF Headquarters in Orlando, Florida. The headquarters provided a permanent base for international mission coordination, leadership development, training, worship, fellowship, and missionary preparation.",
      "During the same year, YEF Korea established a mission center serving Kyungpook National University in Daegu and another center in Busan serving Pukyong National University and Kyungsung University.",
      "As ministry increasingly moved online, YEF held the Online Easter Retreat 2020, Online Summer Retreat 2020, and Online Christmas Retreat 2020. YEF also participated in the 30th General Assembly of KWMA.",
    ],
  },
  {
    year: "2021",
    title: "New Mission Centers and Continued Online Discipleship",
    body: [
      "YEF established centers serving KAIST in Daejeon and Kyungpook National University.",
      "A YEF Mission Center was also established in Macau, strengthening the ministry's presence in Asia.",
      "YEF hosted the Online Easter Retreat 2021, Online Summer Retreat 2021, and Christmas Retreat 2021. The ministry participated as a member organization in the 31st General Assembly of the Korea World Missions Association. Chanyu Kim was appointed as the representative of YEF Korea.",
    ],
  },
  {
    year: "2022",
    title: "Continued Leadership and Ministry Development",
    body: [
      "YEF held its 2022 Summer Retreat.",
      "Rev. Myunghyuk Kim, senior pastor emeritus of Riverside Church, was appointed as an advising professor for YEF Korea.",
      "Minwook Hwang was appointed as the representative of YEF Korea.",
    ],
  },
  {
    year: "2023",
    title: "Strengthening Mission Partnerships",
    body: [
      "YEF held its 2023 Summer Retreat.",
      "Representatives participated in the 33rd General Assembly of the Korea World Missions Association.",
      "Rev. Haejoo Kang was appointed as the representative of YEF Korea.",
    ],
  },
  {
    year: "2025",
    title: "Equipping a New Generation at YEF Headquarters",
    body: [
      "In 2025, YEF Headquarters in Orlando held a large internship program and Summer Retreat for college students and young missionaries.",
      "Through Bible study, worship, prayer, evangelism, ministry training, fellowship, and practical mission experiences, participants were given opportunities to deepen their faith while experiencing the daily life of Christian mission.",
      "These programs reflected YEF's continued commitment to raising and equipping a new generation of students and young missionaries who can carry the gospel to university campuses, cities, and nations.",
    ],
  },
  {
    year: "2026",
    title: "2026 — Expanding the Mission to More Than 60 Nations",
    body: [
      "In 2026, YEF enters a new season of international expansion with plans to establish and strengthen chapters across more than 60 nations.",
      "Building upon more than two decades of campus evangelism, discipleship, leadership development, and international mission, YEF is working to develop stronger national fellowships, digital mission platforms, local leadership, and partnerships with churches around the world.",
      "The vision is not simply to establish a presence in more countries, but to build sustainable mission fields where young people can encounter the gospel, study the Word of God, grow as disciples, and eventually become missionaries and leaders themselves.",
    ],
  },
];

async function buildDefaultHistoryLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/history/hero-large.png",
            "Youth Evangelical Fellowship headquarters building",
          ),
        },
        {
          image: await uploadMedia(
            "/images/history/hero-small-top.png",
            "YEF international staff gathered together",
          ),
        },
        {
          image: await uploadMedia(
            "/images/history/hero-small-bottom.png",
            "Students on a campus mission trip",
          ),
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
      items: historyTimelineEntries.map((entry) => ({
        year: entry.year,
        title: entry.title,
        body: entry.body.join(" "),
      })),
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
}

async function buildDefaultMembershipLayout(_uploadMedia: MediaUploader) {
  return [
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
}

/** Uploads an image fetched from a remote URL as Media once per URL — used
 *  for the real WordPress-hosted photos, which are more authoritative than
 *  the Drive-matched placeholders under public/. */
function remoteMediaUploader(payload: Payload) {
  const cache = new Map<string, number>();
  return async (url: string, filename: string, alt: string): Promise<number> => {
    const cached = cache.get(url);
    if (cached !== undefined) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const ext = path.extname(filename).slice(1).toLowerCase();
    const mimetype =
      ext === "jpg" ? "image/jpeg" : ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    const media = await payload.create({
      collection: "media",
      data: { alt, country: "int" },
      file: { data: buffer, name: filename, mimetype, size: buffer.length },
    });
    const id = Number(media.id);
    cache.set(url, id);
    return id;
  };
}

const POST_CATEGORIES = new Set(["News", "Story", "Event"]);

async function seedPosts(payload: Payload) {
  const uploadMedia = mediaUploader(payload);
  const uploadRemoteMedia = remoteMediaUploader(payload);
  let created = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const article of newsArticles) {
    try {
      // The real photo hosted on the original WordPress site, when we have
      // one for this slug, always wins over the Drive-matched placeholder.
      const real = realImages[article.slug];
      const expectedFilename = real ? real.filename : path.basename(article.image);
      const getMedia = () =>
        real
          ? uploadRemoteMedia(real.url, real.filename, article.title)
          : uploadMedia(article.image, article.title);

      const existing = await payload.find({
        collection: "posts",
        where: { slug: { equals: article.slug } },
        limit: 1,
        depth: 1,
      });
      if (existing.docs.length > 0) {
        const doc = existing.docs[0];
        const currentImage = doc?.image;
        const currentFilename =
          typeof currentImage === "object" && currentImage
            ? currentImage.filename
            : undefined;
        // The background photo-matching pass (and now the real WordPress
        // export) keeps replacing placeholders with better photos after this
        // article was first seeded — re-upload and repoint the post whenever
        // the source image has moved on, rather than leaving it stuck on
        // whatever was seeded first.
        if (currentFilename === expectedFilename) {
          skipped += 1;
          continue;
        }
        const media = await getMedia();
        await payload.update({
          collection: "posts",
          id: doc.id,
          data: { image: media },
        });
        updated += 1;
        continue;
      }

      const media = await getMedia();
      // A handful of articles carry tags (e.g. Testimonial) outside the
      // three categories Posts supports — file those under News rather than
      // failing the whole seed on one article.
      const category = POST_CATEGORIES.has(article.tag) ? article.tag : "News";

      await payload.create({
        collection: "posts",
        data: {
          country: "int",
          audience: "own",
          title: article.title,
          slug: article.slug,
          category: category as "News" | "Story" | "Event",
          publishedAt: new Date(article.date).toISOString(),
          excerpt: article.excerpt,
          image: media,
          showOnHome: false,
          _status: "published",
        },
      });
      created += 1;
    } catch (error) {
      failed += 1;
      payload.logger.error(`Post "${article.slug}" failed to seed: ${error}`);
    }
  }

  payload.logger.info(
    `Posts seed: ${created} created, ${updated} updated, ${skipped} skipped, ${failed} failed.`,
  );
}

/** True once every block in a saved layout carries only the fields Payload
 *  itself adds (`id`, `blockType`) — i.e. the placeholder layout this same
 *  script used to seed before it filled in real content, never touched by
 *  an editor since. Safe to overwrite; anything else is someone's work. */
/** Whether a field's saved value is really "nothing" — covers Payload's own
 *  bookkeeping (null ids/blockNames, empty arrays) as well as an unfilled
 *  text field, so a genuinely empty block reads as empty regardless of
 *  which of those shapes it happens to be. */
function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return true;
  if (Array.isArray(value)) return value.every(isEmptyValue);
  if (typeof value === "object") {
    return Object.values(value as object).every(isEmptyValue);
  }
  return false;
}

function isUntouchedLayout(layout: unknown): boolean {
  if (!Array.isArray(layout)) return true;
  return layout.every(
    (block) =>
      block && typeof block === "object" &&
      Object.entries(block as object).every(
        ([key, value]) => key === "id" || key === "blockType" || isEmptyValue(value),
      ),
  );
}

async function seedPage(
  payload: Payload,
  route: Page["route"],
  title: string,
  // A thunk rather than an already-built layout: building one uploads its
  // images, and that should only happen on the create/fill-in paths below,
  // not on every build once the page has real content in place.
  buildLayout: () => Promise<{ blockType: string }[]>,
  // True for a built-in page (one of `builtInPages` below) that is also
  // getting a real seeded layout — keeps its banner/heading/intro override
  // editable alongside the new blocks.
  builtIn = false,
) {
  const existing = await payload.find({
    collection: "pages",
    where: { and: [{ route: { equals: route } }, { country: { equals: "int" } }] },
    limit: 1,
    depth: 0,
  });

  if (existing.docs.length > 0) {
    const doc = existing.docs[0];
    if (!doc || !isUntouchedLayout(doc.layout)) {
      payload.logger.info(`Page "${route}": already exists, skipped.`);
      return;
    }
    await payload.update({
      collection: "pages",
      id: doc.id,
      data: { layout: (await buildLayout()) as Page["layout"] },
    });
    payload.logger.info(`Page "${route}": filled in with real content.`);
    return;
  }

  await payload.create({
    collection: "pages",
    data: {
      title,
      route,
      country: "int",
      builtIn,
      layout: (await buildLayout()) as Page["layout"],
      _status: "published",
    },
  });
  payload.logger.info(`Page "${route}": created.`);
}

/**
 * Every real page of the site that is not yet wired to the block editor —
 * listed so Pages shows the whole site rather than just Home and Who We Are,
 * even though editing one of these still means changing code for now. See
 * the `builtIn` field on the Pages collection.
 */
const builtInPages: { route: string; title: string }[] = [
  // who-we-are/welcome, /mission, /statement-of-faith, /history, and
  // /membership are seeded further down with real `buildLayout` thunks
  // (like home and who-we-are above) now that they're converted to the
  // generic block library — they're deliberately not listed here.
  { route: "who-we-are/staff-executive-committee", title: "Staff/Executive Committee" },
  { route: "get-involved", title: "Get Involved" },
  { route: "get-involved/apply", title: "Connect With YEFI" },
  { route: "get-involved/campus-evangelism", title: "Campus Evangelism" },
  { route: "get-involved/campus-evangelism/apply", title: "Begin Your Mission Journey" },
  { route: "get-involved/chapter-affiliation", title: "Chapter Affiliation" },
  { route: "get-involved/leadership-retreats", title: "International Leadership Retreats" },
  { route: "get-involved/volunteer", title: "Volunteer with YEF" },
  { route: "news", title: "News" },
  { route: "network", title: "Network" },
  { route: "donate", title: "Donate" },
  { route: "contact", title: "Contact Us" },
  { route: "join", title: "Request Access" },
  { route: "login", title: "Sign In" },
  { route: "reaching-the-campus", title: "Reaching the Campus" },
  { route: "resources", title: "Resources" },
  { route: "sharing-the-gospel", title: "Sharing the Gospel" },
  { route: "submit-your-story", title: "Submit Your Story" },
  { route: "what-is-evangelical", title: "Raising Disciples" },
  { route: "yef-mission-school", title: "YEF Mission School" },
  { route: "yef-mission-school/apply", title: "Apply YEF Mission School" },
];

async function seedBuiltInPages(payload: Payload) {
  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const entry of builtInPages) {
    const existing = await payload.find({
      collection: "pages",
      where: {
        and: [
          { route: { equals: entry.route as Page["route"] } },
          { country: { equals: "int" } },
        ],
      },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      skipped += 1;
      continue;
    }
    try {
      await payload.create({
        collection: "pages",
        data: {
          title: entry.title,
          route: entry.route as Page["route"],
          country: "int",
          builtIn: true,
          _status: "published",
        },
      });
      created += 1;
    } catch (error) {
      failed += 1;
      payload.logger.error(`Page "${entry.route}" failed to seed: ${error}`);
    }
  }

  payload.logger.info(
    `Built-in pages seed: ${created} created, ${skipped} skipped, ${failed} failed.`,
  );
}

async function seedPhotoEvent(
  payload: Payload,
  slug: string,
  title: string,
  publishedAt: string,
  dir: string,
  files: string[],
) {
  const existing = await payload.find({
    collection: "photo-events",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    payload.logger.info(`Photo event "${slug}": already exists, skipped.`);
    return;
  }

  const uploadMedia = mediaUploader(payload);
  const photos = [];
  for (const [i, file] of files.entries()) {
    const media = await uploadMedia(
      `/images/photo-news/${dir}/${file}`,
      `${title} — photo ${i + 1}`,
    );
    photos.push({ image: media });
  }

  await payload.create({
    collection: "photo-events",
    data: {
      country: "int",
      audience: "own",
      title,
      slug,
      publishedAt,
      photos,
    },
  });
  payload.logger.info(`Photo event "${slug}": created.`);
}

/** Runs one seed step; logs and continues rather than taking the whole
 *  script down, so one bad step (Pages, say) still lets the others run. */
async function step(payload: Payload, label: string, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (error) {
    payload.logger.error(`${label} failed: ${error}`);
  }
}

const run = async () => {
  const payload = await getPayload({ config });

  await step(payload, "Posts seed", () => seedPosts(payload));
  const uploadMedia = mediaUploader(payload);
  await step(payload, 'Page "home"', () =>
    seedPage(payload, "home", "Home", () => buildDefaultHomeLayout(uploadMedia)),
  );
  await step(payload, 'Page "who-we-are"', () =>
    seedPage(payload, "who-we-are", "Who We Are", () =>
      buildDefaultWhoWeAreLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "who-we-are/welcome"', () =>
    seedPage(
      payload,
      "who-we-are/welcome",
      "Welcome",
      () => buildDefaultWelcomeLayout(uploadMedia),
      true,
    ),
  );
  await step(payload, 'Page "who-we-are/mission"', () =>
    seedPage(
      payload,
      "who-we-are/mission",
      "Our Mission",
      () => buildDefaultMissionLayout(uploadMedia),
      true,
    ),
  );
  await step(payload, 'Page "who-we-are/statement-of-faith"', () =>
    seedPage(
      payload,
      "who-we-are/statement-of-faith",
      "Statement of Faith",
      () => buildDefaultStatementOfFaithLayout(uploadMedia),
      true,
    ),
  );
  await step(payload, 'Page "who-we-are/history"', () =>
    seedPage(
      payload,
      "who-we-are/history",
      "History",
      () => buildDefaultHistoryLayout(uploadMedia),
      true,
    ),
  );
  await step(payload, 'Page "who-we-are/membership"', () =>
    seedPage(
      payload,
      "who-we-are/membership",
      "Membership",
      () => buildDefaultMembershipLayout(uploadMedia),
      true,
    ),
  );
  await step(payload, "Built-in pages seed", () => seedBuiltInPages(payload));
  await step(payload, 'Photo event "yef-hq-retreat"', () =>
    seedPhotoEvent(
      payload,
      "yef-hq-retreat",
      "YEF HQ Retreat",
      new Date("2025-01-01").toISOString(),
      "yef-hq-retreat",
      ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    ),
  );
  await step(payload, 'Photo event "2026-ministry-highlights"', () =>
    seedPhotoEvent(
      payload,
      "2026-ministry-highlights",
      "2026 Ministry Highlights",
      new Date("2026-01-01").toISOString(),
      "2026-ministry-highlights",
      ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"],
    ),
  );

  payload.logger.info("Seed complete.");
  process.exit(0);
};

await run();
