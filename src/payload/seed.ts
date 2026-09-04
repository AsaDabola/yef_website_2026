import fs from "node:fs/promises";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsArticles, REMOVED_ARTICLE_SLUGS } from "@/lib/news";
import type { Page } from "@/payload-types";
import newsRealImages from "@/payload/newsRealImages.json";

const realImages = newsRealImages as Record<
  string,
  { url: string; filename: string }
>;

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
      ext === "jpg"
        ? "image/jpeg"
        : ext === "svg"
          ? "image/svg+xml"
          : `image/${ext}`;
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
          heading: "Not to Be Served,\nbut to Serve.",
          body: "“For even the Son of Man did not come to be served, but to serve.”\nMark 10:45",
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
      verse: "Young people will come to you",
      verseAccent: "\nlike the morning dew.",
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
    { blockType: "campusFinder" },
    { blockType: "getInvolved" },
    {
      blockType: "proof",
      eyebrow: "The Call",
      heading: "From the **campus**\nto the **nations**.",
      items: [
        {
          name: "Share the\nGospel",
          body: "We meet students on university campuses and invite them to know Jesus Christ through the Gospel.",
        },
        {
          name: "Teach the Bible",
          body: "We help students grow in faith through Scripture, prayer, and Christian fellowship.",
        },
        {
          name: "Raise Disciples",
          body: "We equip students to follow Christ, lead others, and carry the Gospel to the nations.",
        },
      ],
    },
    { blockType: "movement" },
    { blockType: "giving" },
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

/**
 * Default content for the remaining built-in pages, converted from their
 * previously-hardcoded body content into the generic block library so
 * they're editable from the admin like Home and Who We Are. Each function
 * name matches its route (see builtInPages below); most use the generic
 * blocks (genericText/genericCards/genericImageText/genericGallery/
 * genericStats/genericTimeline/genericCta/genericQuote) plus, where a page
 * already had one, the pre-existing bespoke testimonials/missionSchoolCta
 * blocks. Interactive pieces (forms, maps, directories, carousels) stay
 * hardcoded in each page's own component — see each page.tsx for what's
 * still rendered outside RenderBlocks.
 */
// --- from donate.ts ---
async function buildDefaultDonateLayout(uploadMedia: MediaUploader) {
  const prayingImage = await uploadMedia(
    "/images/shared/donate-praying.png",
    "Two students praying together at a YEF fellowship conference",
  );

  return [
    {
      blockType: "genericImageText",
      image: prayingImage,
      imageAlt: "Two students praying together at a YEF fellowship conference",
      imageSide: "right",
      heading: "2 Corinthians 9:11-12",
      body: "You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God. This service that you perform is not only supplying the needs of the Lord’s people but is also overflowing in many expressions of thanks to God.",
    },
  ];
}

// --- from get-involved-apply.ts ---
async function buildDefaultGetInvolvedApplyLayout(_uploadMedia: MediaUploader) {
  return [];
}

// --- from get-involved-bible-studies.ts ---
async function buildDefaultGetInvolvedBibleStudiesLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/bible-studies-table-discussion.webp",
            "Students gathered around a table for Bible study",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/bible-studies-rephidim-meeting.webp",
            "A group of students at a YEF Bible study meeting",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/bible-studies-group-prayer.webp",
            "Students bowed together in prayer",
          ),
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
      image: await uploadMedia(
        "/images/get-involved/bible-studies-open-bibles.webp",
        "Students with open Bibles studying together outdoors",
      ),
      imageSide: "left",
      heading: "Where It Leads",
      body: "For many students, a Bible study becomes the start of something deeper — a mentoring relationship, a small group that turns into Discipleship Training, a calling to lead others the way they were led. Wherever you're starting, there's room to grow further.",
    },
    // --- StoriesTrio renders here in page.tsx, outside this layout ---
    {
      blockType: "genericCta",
      heading: "Join a Bible Study",
      body: "Tell us you're interested, and someone from your local chapter will reach out to get you connected.",
      buttonLabel: "Apply Bible Study",
      buttonHref: "/get-involved/apply",
    },
    { blockType: "missionSchoolCta" },
  ];
}

// --- from get-involved-campus-evangelism-apply.ts ---
async function buildDefaultGetInvolvedCampusEvangelismApplyLayout(
  _uploadMedia: MediaUploader,
) {
  return [];
}

// --- from get-involved-campus-evangelism.ts ---
async function buildDefaultGetInvolvedCampusEvangelismLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericText",
      heading: "Reach Students. Share Christ. Make Disciples.",
      paragraphs: [
        {
          body: "Campus evangelism begins with a willing heart. YEF equips young people to meet students, build genuine relationships, share the Gospel, and invite them to discover Christ through God's Word. Every campus is filled with students searching for purpose, identity, and community — many of whom have never had a real conversation about faith. Through everyday moments, intentional outreach, and consistent presence, YEF trains students to become confident, compassionate witnesses for Christ right where they already are.",
        },
      ],
    },
    {
      blockType: "genericQuote",
      quote: "“Go into all the world and preach the gospel to all creation.”",
      reference: "— Mark 16:15",
    },
    {
      blockType: "genericLinkCards",
      cards: [
        {
          image: await uploadMedia(
            "/images/get-involved/campus-evangelism-teaser-university.webp",
            "Students walking together on a university campus",
          ),
          title: "Campus Outreach",
          href: "/get-involved#bible-studies",
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "Why Go into Campus Evangelism?",
      paragraphs: [
        {
          body: "Campus evangelism is more than a single conversation. It is an opportunity to see students, campuses, and communities through the eyes of Christ.\n\nJesus said:",
        },
      ],
    },
    {
      blockType: "genericQuote",
      quote: "“The harvest is plentiful but the workers are few.”",
      reference: "— Matthew 9:37",
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "There are campuses where students have never been personally invited to study the Bible. There are students searching for purpose, identity, and community. There are classmates and friends who have never heard the Gospel clearly explained. YEF Campus Evangelism equips participants to step onto these campuses and share Christ alongside fellow students, campus ministries, and local churches.\n\nSometimes the greatest change also happens within the evangelist. Through evangelism, participants learn to depend more deeply on God, overcome fear, love others well, work as a team, and discover that God can use ordinary students who are simply willing to obey Him.",
        },
      ],
    },
    {
      blockType: "genericLinkCards",
      cards: [
        {
          image: await uploadMedia(
            "/images/get-involved/campus-evangelism-teaser-friends.webp",
            "Two students talking together on campus",
          ),
          title: "Share the Gospel",
          href: "/get-involved#bible-studies",
        },
      ],
    },
    // -- What You Will Experience -> Gallery -> Where We Serve --
    {
      blockType: "genericText",
      heading: "What You Will Experience",
      paragraphs: [
        {
          body: "Every campus is different, but YEF Campus Evangelism is centered around several important areas of ministry.",
        },
      ],
      background: "light",
    },
    {
      blockType: "genericCards",
      background: "light",
      cards: [
        {
          title: "Campus Evangelism",
          body: "University campuses are at the heart of YEF's mission.\nParticipants may visit local universities to meet students, introduce the fellowship, share the gospel, distribute invitations, pray for the campus, and invite students to Bible study.\nFor many participants, approaching someone they have never met can initially feel uncomfortable. Mission provides an opportunity to overcome that fear and experience the joy of speaking about Christ with others.",
          quote:
            "“How beautiful are the feet of those who bring good news!”\n— Romans 10:15",
        },
        {
          title: "Bible Study & Discipleship",
          body: "Evangelism should lead toward discipleship.\n\nMission teams may participate in individual or group Bible studies with students they meet during outreach. Participants can observe experienced Bible teachers, share their own reflections, and learn how God's Word speaks into the lives of different people.\n\nThe goal is not simply to make contact with students, but to help them begin a lasting journey of following Christ.",
        },
        {
          title: "Prayer & Worship",
          body: "Every mission begins and ends with prayer.\n\nTeams spend time praying for the mission field, local churches, universities, students, missionaries, and people they encounter.\nMorning devotions, worship services, group prayer, and personal reflection help participants remember that mission is ultimately God's work.\n\nWe go into the field, but God changes hearts.",
        },
        {
          title: "Serving the Local Mission",
          body: "Missionaries do not arrive simply to carry out their own plans.\n\nYEF teams seek to serve alongside the local church and existing mission field. Depending on the location, participants may assist with worship services, student gatherings, outreach events, retreats, media ministry, hospitality, children's ministry, community service, or practical ministry needs.\n\nOur desire is to strengthen what God is already building.",
        },
        {
          title: "Fellowship",
          body: "Mission is also experienced through community.\n\nParticipants pray together, eat together, evangelize together, study Scripture together, overcome difficulties together, and encourage one another throughout the journey.\n\nThese shared experiences often create meaningful relationships between believers from different churches, cities, cultures, and nations.",
        },
      ],
    },
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/gallery-campus-evangelism-table.webp",
            "YEF students sharing the Gospel at a campus outreach table",
          ),
          alt: "YEF students sharing the Gospel at a campus outreach table",
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gallery-campus-evangelism-trees.webp",
            "Students walking together beneath campus trees",
          ),
          alt: "Students walking together beneath campus trees",
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gallery-campus-evangelism-walk.webp",
            "Students walking across a sunlit campus path",
          ),
          alt: "Students walking across a sunlit campus path",
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "Where We Serve",
      paragraphs: [
        {
          body: "YEF's campus evangelism extends across university campuses at home and abroad. Opportunities may include:",
        },
      ],
      background: "light",
    },
    {
      blockType: "genericCards",
      background: "light",
      cards: [
        {
          title: "Local Campus Outreach",
          body: "Reach students on your own campus through outreach events, one-on-one conversations, and invitations to Bible study.",
        },
        {
          title: "New Campus Outreach",
          body: "Serve alongside YEF chapters and local churches to evangelize university students, establish Bible studies, and strengthen campus fellowships.",
        },
        {
          title: "Pioneering New Campuses",
          body: "Join efforts to reach campuses where YEF has not yet established a fellowship, laying the groundwork for new relationships, Bible studies, and chapters.",
        },
        {
          title: "International Campus Evangelism",
          body: "Experience cross-cultural evangelism by serving alongside YEF leaders and campus ministries in another nation.",
        },
      ],
    },
    // -- Who Can Join? --
    {
      blockType: "genericText",
      heading: "Who Can Join?",
      paragraphs: [
        {
          body: "YEF Campus Evangelism is especially designed for students, young adults, church members, volunteers, and emerging evangelists who desire to grow in faith and participate in the Great Commission.\n\nYou do not need to be an experienced evangelist or Bible teacher.\n\nYou need a willing heart.",
        },
      ],
    },
    {
      blockType: "genericList",
      heading: "Participants should be prepared to:",
      items: [
        {
          body: "Participate faithfully in our Bible study program, prayer and Bible study",
        },
        { body: "Work together as part of a team" },
        { body: "Respect local churches, leaders, and cultures" },
        { body: "Serve wherever help is needed" },
        { body: "Share their faith with others" },
        { body: "Remain flexible when plans change" },
        { body: "Receive guidance and training" },
        { body: "Approach the mission field with humility" },
        { body: "Represent Christ through their words and actions" },
      ],
    },
    // -- Preparing for Evangelism --
    {
      blockType: "genericText",
      heading: "Preparing for Evangelism",
      paragraphs: [
        {
          body: "Before stepping onto campus, participants receive preparation to help them share Christ effectively and responsibly. Training may include:",
        },
      ],
      background: "light",
    },
    {
      blockType: "genericCards",
      background: "light",
      cards: [
        {
          title: "Biblical Preparation",
          body: "Understanding the gospel, the Great Commission, and the biblical foundation of mission.",
        },
        {
          title: "Evangelism Training",
          body: "Learning how to approach students, begin conversations, share personal testimony, explain the gospel, and invite people to Bible study.",
        },
        {
          title: "Spiritual Preparation",
          body: "Developing habits of prayer, Scripture meditation, repentance, and dependence upon God.",
        },
        {
          title: "Cultural Preparation",
          body: "Learning about the people and culture of the mission field and how to serve respectfully across cultural differences.",
        },
        {
          title: "Practical Preparation",
          body: "Understanding schedules, transportation, accommodations, team responsibilities, safety guidelines, finances, and other expectations.",
        },
      ],
    },
    // -- A Typical Day --
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/campus-evangelism-typical-day.webp",
        "A YEF student sharing the Gospel on campus",
      ),
      imageAlt: "A YEF student sharing the Gospel on campus",
      imageSide: "right",
      heading: "A Typical Day in Campus Evangelism",
      body: "While every day of outreach is different, a typical day may include:",
    },
    {
      blockType: "genericTimeline",
      items: [
        {
          year: "Morning",
          body: "Prayer, worship, Scripture meditation, breakfast, and preparation for the day's outreach.",
        },
        {
          year: "Daytime",
          body: "Campus evangelism, outreach, service projects, ministry visits, or meetings with local students and leaders.",
        },
        {
          year: "Afternoon",
          body: "Bible studies, follow-up meetings, discipleship, ministry training, or additional outreach.",
        },
        {
          year: "Evening",
          body: "Worship service, fellowship, group Bible study, prayer, and sharing testimonies from the day.",
        },
        {
          year: "End of Day",
          body: "Personal reflection, journaling, team evaluation, and prayer for the people encountered during outreach.",
        },
      ],
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "Evangelism is not simply one activity during the day. Participants are encouraged to approach the entire day with a missionary heart.",
        },
      ],
    },
    // -- closing CTA --
    {
      blockType: "genericCta",
      heading: "Begin Your Mission Journey",
      body: "If God is stirring something in you, take the next step. Tell us where you are and our missions team will walk with you from there.",
      buttonLabel: "Apply for a Campus Mission",
      buttonHref: "/get-involved/campus-evangelism/apply",
    },
  ];
}

// --- from get-involved-chapter-affiliation.ts ---
async function buildDefaultGetInvolvedChapterAffiliationLayout(
  _uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericText",
      eyebrow: "Bring YEF to Your Campus",
      paragraphs: [
        {
          body: "Every YEF chapter is a seedbed—a witnessing community planted on one campus, connected to a wider movement of chapters around the world. Affiliating your chapter is a three-step process: chapter information, leadership contact, and agreement.",
        },
      ],
    },
  ];
}

// --- from get-involved-discipleship.ts ---
async function buildDefaultGetInvolvedDiscipleshipLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/discipleship-embrace.webp",
            "Believers embracing one another in fellowship",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/discipleship-friends-sky.webp",
            "A group of friends laughing together outdoors",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/discipleship-praying-hands.webp",
            "A student praying over an open Bible",
          ),
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
      image: await uploadMedia(
        "/images/get-involved/discipleship-hand-raised.webp",
        "A young man raising his hand in worship at sunset",
      ),
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
    { blockType: "missionSchoolCta" },
  ];
}

// --- from get-involved-leadership-training-apply.ts ---
async function buildDefaultGetInvolvedLeadershipTrainingApplyLayout(
  _uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericText",
      heading: "Apply for Leadership Training",
      paragraphs: [
        {
          body: "Take the next step toward serving as a teacher and missionary on your campus. Tell us where you are, and a member of our leadership team will follow up with you.",
        },
      ],
    },
  ];
}

// --- from get-involved-leadership-training.ts ---
async function buildDefaultGetInvolvedLeadershipTrainingLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/leadership-retreat-classroom.webp",
            "A leader teaching a session to a room of students at a retreat",
          ),
          alt: "A leader teaching a session to a room of students at a retreat",
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gallery-street-outreach.png",
            "Team members sharing the gospel on the street",
          ),
          alt: "Team members sharing the gospel on the street",
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gallery-campus-chat.png",
            "Team members talking on a university campus",
          ),
          alt: "Team members talking on a university campus",
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
      image: await uploadMedia(
        "/images/get-involved/leadership-retreat-shepherd-sunset.webp",
        "A shepherd leading sheep across a field at sunset",
      ),
      imageAlt: "A shepherd leading sheep across a field at sunset",
      imageSide: "left",
      heading: "Upcoming Leadership Retreats",
      body: "Join YEF leaders from around the world for a time of spiritual renewal, training, fellowship, and preparation for the mission ahead.",
    },
  ];
}

// --- from get-involved-short-term-mission-apply.ts ---
async function buildDefaultGetInvolvedShortTermMissionApplyLayout(
  _uploadMedia: MediaUploader,
) {
  return [];
}

// --- from get-involved-short-term-mission.ts ---
async function buildDefaultGetInvolvedShortTermMissionLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/short-term-mission-friends.webp",
            "Three friends with backpacks setting off from a train platform",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/short-term-mission-signpost.webp",
            "A signpost pointing to Short-Term and Long-Term",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/short-term-mission-hands.webp",
            "A team stacking hands together in unity",
          ),
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
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/short-term-mission-kids.webp",
        "Children running joyfully to greet a mission team",
      ),
      imageSide: "left",
      heading: "Where You Could Serve",
      // Originally a bulleted list; genericImageText's body is a single
      // textarea, so the items are joined with line breaks.
      body: "Your current city or campus\nAnother city\nAnother country\nOnline mission\nWherever the need is greatest",
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
    // --- StoriesTrio + the dual-button "Ready to Go?" CTA render here in
    // page.tsx, outside this layout ---
    { blockType: "missionSchoolCta" },
  ];
}

// --- from get-involved-summer-training.ts ---
async function buildDefaultGetInvolvedSummerTrainingLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/summer-training-beach-run.webp",
            "Students running and laughing together on the beach at sunset",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/summer-training-zipline.webp",
            "A student ziplining through the trees",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/summer-training-journal.webp",
            "A student journaling by the water during a quiet moment",
          ),
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
      image: await uploadMedia(
        "/images/get-involved/summer-training-campfire.webp",
        "Students gathered around a campfire under a starry sky at Summer Training",
      ),
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
    // --- The dual-button "Ready to Grow This Summer?" CTA renders here in
    // page.tsx, outside this layout ---
    { blockType: "missionSchoolCta" },
  ];
}

// --- from get-involved-volunteer.ts ---
async function buildDefaultGetInvolvedVolunteerLayout(
  _uploadMedia: MediaUploader,
) {
  return [{ blockType: "testimonials" }];
}

// --- from get-involved-volunteering.ts ---
async function buildDefaultGetInvolvedVolunteeringLayout(
  uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/volunteering-campus-outreach.webp",
            "A volunteer talking with students at a campus outreach table",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/volunteering-donation-drive.png",
            "Volunteers waving beside a donation box at a clothing drive",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/volunteering-clipboard.webp",
            'A volunteer wearing a "Volunteer" shirt writing on a clipboard',
          ),
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
      quote:
        "“Whatever you do, work at it with all your heart, as working for the Lord.”",
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
    { blockType: "missionSchoolCta" },
  ];
}

// --- from get-involved.ts ---
async function buildDefaultGetInvolvedLayout(uploadMedia: MediaUploader) {
  return [
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
      image: await uploadMedia(
        "/images/get-involved/bible-studies-sunset.png",
        "The sun setting over a calm ocean",
      ),
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
          icon: await uploadMedia(
            "/images/icons/icon-four-spiritual-laws.svg",
            "",
          ),
          title: "The Four Spiritual Laws",
          body: "Discover the essential message of the Gospel—God’s love, our need for salvation, and faith in Jesus Christ.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-romans.svg", ""),
          title: "Romans",
          body: "Explore the Gospel, God’s righteousness, and new life through faith in Jesus Christ.",
        },
        {
          icon: await uploadMedia(
            "/images/icons/icon-way-of-the-cross.svg",
            "",
          ),
          title: "The Way of the Cross",
          body: "Walk through Christ's journey to the cross, and discover what it means to follow Him in suffering and in glory.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-christ.svg", ""),
          title: "The Way of Faith",
          body: "Walk through the foundations of faith—repentance, assurance, and daily trust in the God who keeps His promises.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-romans.svg", ""),
          title: "Galatians",
          body: "Stand firm in the freedom Christ won, and learn to live by the Spirit rather than by the law.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-church.svg", ""),
          title: "Acts",
          body: "Follow the early church as the Gospel spreads from Jerusalem to the ends of the earth.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-romans.svg", ""),
          title: "1 & 2 Corinthians",
          body: "Learn what it means to live as the church—in unity, in love, and in the sufficiency of God’s grace.",
        },
        {
          icon: await uploadMedia(
            "/images/icons/icon-four-spiritual-laws.svg",
            "",
          ),
          title: "The Sermon on the Mount",
          body: "Sit under the teaching of Jesus and see what life in the kingdom of God is meant to look like.",
        },
        {
          icon: await uploadMedia(
            "/images/icons/icon-providing-education.svg",
            "",
          ),
          title: "Providing Education",
          body: "Each student receives Biblical and practical training, empowering them to reach their dreams and become thriving disciples.",
        },
      ],
    },
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/discipleship.webp",
        "A student in discipleship training",
      ),
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
      image: await uploadMedia(
        "/images/get-involved/campus-evangelism-walk.webp",
        "Students walking together on a sunlit campus path",
      ),
      imageAlt: "Students walking together on a sunlit campus path",
      items: [
        {
          icon: await uploadMedia("/images/icons/icon-christ.svg", ""),
          title: "01. Step Out & Share",
          body: "Step beyond your comfort zone and experience the joy of sharing the Gospel with fellow students, right where they already are.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-church.svg", ""),
          title: "02. Engage & Grow",
          body: "Follow up with the students you meet through Bible study and discipleship, so a single conversation grows into a lasting walk with Christ.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-child.svg", ""),
          title: "03. Equip & Go",
          body: "Receive Biblical and practical training and take your next step into campus evangelism.",
        },
      ],
      buttonLabel: "Learn more about Campus Evangelism",
      buttonHref: "/get-involved/campus-evangelism",
    },
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/short-term-mission.webp",
        "A woman leading a classroom in prayer",
      ),
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
          image: await uploadMedia(
            "/images/get-involved/trio-sharing-the-gospel.webp",
            "YEF members handing out tracts on a European street",
          ),
          title: "Sharing the Gospel",
          href: "/sharing-the-gospel",
        },
        {
          image: await uploadMedia(
            "/images/get-involved/trio-reaching-the-campus.webp",
            "A campus fellowship group gathered in a study lounge",
          ),
          title: "Reaching the Campus",
          href: "/reaching-the-campus",
        },
        {
          image: await uploadMedia(
            "/images/get-involved/trio-raising-disciples.webp",
            "Two students swapping contact details outside a campus building",
          ),
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
      image: await uploadMedia(
        "/images/get-involved/summer-training.webp",
        "YEF students setting up an outreach table on campus",
      ),
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
      image: await uploadMedia(
        "/images/get-involved/leadership-training-conference.webp",
        "YEF students clapping at a leadership training conference",
      ),
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
      image: await uploadMedia(
        "/images/get-involved/volunteering-donation-drive.png",
        "Volunteers sorting clothing at a donation drive",
      ),
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
      image: await uploadMedia(
        "/images/get-involved/internship-outreach-table.webp",
        "An intern smiling and helping a student at an outreach table",
      ),
      imageAlt: "An intern smiling and helping a student at an outreach table",
      items: [
        {
          icon: await uploadMedia("/images/icons/icon-christ.svg", ""),
          title: "Hands-On Ministry:",
          body: "You won't just observe — you'll carry real responsibility on real projects, from video and design to events and communications, all in service of the Gospel going out.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-church.svg", ""),
          title: "Mentorship:",
          body: "A trained staff member walks alongside you, not just teaching a skill but discipling you in how to steward it for the Kingdom.",
        },
        {
          icon: await uploadMedia("/images/icons/icon-child.svg", ""),
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
}

// --- from network.ts ---
async function buildDefaultNetworkLayout(_uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericText",
      heading: "Find a chapter near you.",
      paragraphs: [
        {
          body: "YEF chapters meet on campuses around the world. Search the list or drop a pin to see who’s leading a fellowship near you.",
        },
      ],
    },
  ];
}

// --- from reaching-the-campus.ts ---
async function buildDefaultReachingTheCampusLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericQuote",
      quote: "God Has Often Worked Through the Young",
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "Throughout Christian history, young people have played an important role in seasons of mission, renewal, and spiritual awakening. Again and again, God has called young men and women who were willing to dedicate the strength, passion, and years of their youth to His Kingdom.",
        },
      ],
    },
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/hudson-taylor-group.png",
        "A group of students gathered together",
      ),
      imageSide: "right",
      heading: "Hudson Taylor",
      body: "Hudson Taylor, who would become one of the most influential missionaries to China and the founder of the China Inland Mission, was only 21 years old when he first sailed for China. His willingness to answer God’s call as a young man eventually contributed to a missionary movement that reached far beyond his own lifetime.",
    },
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/calvin-conversation.png",
        "A student smiling outside on campus",
      ),
      imageSide: "left",
      heading: "John Calvin",
      body: "John Calvin was also still a young man when he published the first edition of his influential Institutes of the Christian Religion at the age of 26. The work would continue to develop throughout his life and profoundly influence generations of Christian theology, ministry, and church leadership.",
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "Many of those who first followed Jesus were also young people who left behind their ordinary lives to become His disciples. Jesus taught them, corrected them, walked with them, and eventually entrusted them with the responsibility of carrying the gospel into the world.",
        },
      ],
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "This pattern reminds us that youth is not simply a period of preparation for serving God someday. Young people can be used by God now.",
        },
        {
          body: "When young believers encounter the gospel deeply, surrender their lives to Christ, and receive a vision for God’s Kingdom, their lives can influence campuses, churches, cities, and even nations.",
        },
        {
          body: "This is one reason campus mission matters so deeply to YEF. Universities gather together a generation that still has much of its life ahead of it. If students can encounter Christ during these formative years and learn to dedicate their gifts, education, ambitions, and future to God, their influence for the gospel can continue for decades.",
        },
        {
          body: "YEF therefore believes that reaching university students is also an investment in the future of world mission. We desire to see a new generation arise—not simply as attendees of Christian gatherings, but as disciples, evangelists, Bible teachers, leaders, and missionaries who are willing to say:",
        },
      ],
    },
    {
      blockType: "genericQuote",
      quote: "“Here am I. Send me!”",
      reference: "— Isaiah 6:8",
    },
    {
      blockType: "genericCta",
      heading: "Apply Bible study",
      buttonLabel: "Apply Bible study",
      buttonHref: "/get-involved/apply",
    },
    { blockType: "missionSchoolCta" },
  ];
}

// --- from sharing-the-gospel.ts ---
async function buildDefaultSharingTheGospelLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/gospel-outreach-table.png",
            "YEF students at an outreach table on campus",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gospel-campus-conversation.png",
            "Two students talking on a campus path",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gallery-campus-chat.png",
            "Team members talking on a university campus",
          ),
        },
      ],
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "So if Christ has done everything, what do I need to do once I accept His truth? The Apostle John writes, “Herein is love, not that we love God (we will never understand love if we start from the human end), but that he loved us and sent his Son to be the propitiation for our sins.” Then he goes on, “Beloved, if God so loved us we ought to love one another, too” (1 John 4:10–11). Notice John’s verb. We ought; we ‘owe it’ to love one another. Love is not just an abstract concept or feeling, but it is a demand made on all God’s people as their response to His great love, and it is love that overflows in activities for others as 1 Corinthians 13 makes clear for all time. Love is demanding. Christ did not die, as someone has put it, “for the flim-flam of respectable Christianity”. Christ died for our sins, died to put them away so that we become loving people.",
        },
      ],
    },
    {
      blockType: "genericQuote",
      quote:
        "Having received God’s love, we are called to share that love with others through His Word, evangelism, prayer, and service.",
    },
    {
      blockType: "genericQuote",
      quote:
        "Loving means spreading the truth and love of Christ. If we’ve found the cure to the ills of this world, we want to share it, because we want others to be healed, as well.",
    },
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/gospel-campus-walk.png",
        "Students walking together outside a campus building",
      ),
      imageSide: "right",
      heading: "Christ's Love Is for Sinners",
      body: "We of the human race know a love for attractive people, for beautiful people, for those who love us. Christ's love is for sinners (Rom. 5:8), a love which puts away sin and rebukes all our self-centeredness so that love becomes our mainspring. This means in the first instance that we love other believers. The evangelical sees the church, the beloved community, as an integral part of the purpose of God. And in the second instance it means loving those outside. It means being loving people, for we are the followers of Him who died for sinners.",
    },
    {
      blockType: "genericQuote",
      quote:
        "It means in evangelism, we bring to sinners the best gift we have.",
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "So if Christ has done everything, what do I need to do once I accept His truth? The Apostle John writes, “Herein is love, not that we love God (we will never understand love if we start from the human end), but that he loved us and sent his Son to be the propitiation for our sins.” Then he goes on, “Beloved, if God so loved us we ought to love one another, too” (1 John 4:10–11). Notice John’s verb. We ought; we ‘owe it’ to love one another.",
        },
        {
          body: "Love is not just an abstract concept or feeling, but it is a demand made on all God’s people as their response to His great love and it is love that overflows in activities for others as 1 Corinthians 13 makes clear for all time. Love is demanding. Christ did not die, as someone has put it, “for the flim-flam of respectable Christianity”. Christ died for our sins, died to put them away so that we become loving people.",
        },
      ],
    },
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/get-involved/gospel-hq-group.png",
        "The YEF fellowship gathered outside the headquarters sign",
      ),
      imageSide: "left",
      heading: "How Can We Do All Of This?",
      body: "The standard set before us is one we cannot reach on our own. The indwelling and empowering of the Holy Spirit is an integral part of the Christian life as the evangelical understands it. Words like 'sanctification' and 'holiness' speak of the need for a standard we can never reach for ourselves and speaks also of what the Spirit does in the believer.",
    },
    {
      blockType: "genericCta",
      heading: "Apply Bible study",
      buttonLabel: "Apply Bible study",
      buttonHref: "/get-involved/apply",
    },
    { blockType: "missionSchoolCta" },
  ];
}

// --- from submit-your-story.ts ---
async function buildDefaultSubmitYourStoryLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/submit-story/hudson-taylor.jpg",
        "Hudson Taylor",
      ),
      imageSide: "right",
      heading: "Hudson Taylor",
      body: "Hudson Taylor, who would become one of the most influential missionaries to China and the founder of the China Inland Mission, was only 21 years old when he first sailed for China. His willingness to answer God’s call as a young man eventually contributed to a missionary movement that reached far beyond his own lifetime.",
    },
    { blockType: "testimonials" },
  ];
}

// --- from what-is-evangelical.ts ---
async function buildDefaultWhatIsEvangelicalLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/disciples-library-group.png",
            "A YEF Bible study group gathered in a campus library",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/disciples-fellowship-collage.png",
            "Students talking together at a YEF fellowship gathering",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/disciples-fall-event.png",
            "Students at the YEF fall fellowship event",
          ),
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "Why Do We Call Ourselves Evangelical?",
      paragraphs: [
        {
          body: "“Evangelical” derives from ‘evangel’: “gospel”. By definition an evangelical is someone concerned for the Gospel. This means more than just preaching the Gospel and reading the Word now and then. Of course, we do preach and teach, however it means much more than just that. It means that the Gospel of Christ is central.",
        },
      ],
    },
    {
      blockType: "genericQuote",
      quote: "The Gospel is at the center of our thinking and living.",
    },
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "Our highest commandment is to love God, and to love our neighbor as we do ourselves. Through life obedience of the Word and with the power of prayer, we believe that the individual, as well as this whole world, will change.",
        },
        {
          body: "The importance of an individual and personal relationship with God that is not defined by any political, cultural or social association, nor automatically given by way of nominal membership of any specific denomination. We recognize ourselves by our high regard for the Bible as the Word of God that guides our daily lives; the conviction that salvation is only received by faith through Jesus Christ who died on the cross and was resurrected to life; that God is triune as Father, Son and Holy Spirit; and a few other core beliefs as found in our Statement of Faith.",
        },
        {
          body: "Christianity is a historical religion in a way that no other religion is. Unless we have access to the facts we are cut off from our roots. And our access is by way of “the Scriptures”. They are the means God has given us to bring us the Gospel. So evangelicals have always thankfully received this good gift of God and have regarded it as of the utmost importance that we have a Bible on which we can rely. They point to the express teaching of our Lord Himself and to that of the apostles. And they point to the necessity for the facts of the gospel to be reliably attested.",
        },
        {
          body: "There are other things that evangelicals hold, though we will not give an exhaustive list of evangelical convictions. They all stem from the evangel (the Good News). The whole system of the evangelical is the outworking of the Gospel.",
        },
      ],
    },
    {
      blockType: "genericCards",
      background: "light",
      heading: "Why Do We Need the Gospel?",
      cards: [
        {
          title: "We Cannot Work Out Our Own Salvation",
          body: "We do not put our trust in human endeavors. Dictatorships of the left and dictatorships of the right alike end up in oppression. Democracies all too often end up in muddled and soulless bureaucracy. Every system has to work on the raw material of sinners. Because we are sinners, no matter how good the intent, there’s a firm limit on Mankind’s ability to do good.\n\nTherefore, we cannot work out our own salvation. Sin leaves its mark on life here and has consequences for the hereafter. But the great, wonderful truth is that “Christ died for our sins.” What was impossible for Mankind, God in Christ has perfectly accomplished. He has defeated sin now and for eternity. The evangel (Good News) is a message about a salvation with both temporal and eternal results.\n\nSalvation and atonement means for individuals, as well as this whole world. The significant thing is that Christ died for our sins. Whatever needed to be done He has done. Nothing can be added to that perfect divine work. For that reason we testify salvation by grace. It is a gift. Good deeds, liturgical observances or anything else cannot save or ultimately change us or this world.",
        },
        {
          title:
            "Confronted with the truth of the cross, we have two choices :",
          body: "Respond and turn to Christ in faith and love, or harden our hearts and turn away.\n\nTo respond to Christ’s love in the former way is to become a different person. The whole set of the life is changed. This may happen in one sudden, blinding experience (as with Saul of Tarsus). Or it may happen gradually (as with Timothy). The time is immaterial. The turning and changing is everything. And it happens to all who come to Christ. In this way, this free gift of salvation can be accepted by all people.",
        },
      ],
    },
    {
      blockType: "genericCta",
      heading: "Interested in Learning More? Here’s How :",
      buttonLabel: "Apply Bible study",
      buttonHref: "/get-involved/apply",
    },
    { blockType: "missionSchoolCta" },
  ];
}

// --- from who-we-are-history.ts ---
async function buildDefaultWhoWeAreHistoryLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/history/yef_1.webp",
        "Youth Evangelical Fellowship headquarters building",
      ),
      imageAlt: "Youth Evangelical Fellowship headquarters building",
      imageSide: "left",
      heading: "From a Small Campus Mission to a Global Youth Fellowship",
      body: [
        "Youth Evangelical Fellowship (YEF) traces its roots to 2002, when Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary (OTCS). In 2003, the ministry began developing into what would become Youth Evangelical Fellowship, carrying a growing vision to reach university students through the Word of God, discipleship, and evangelism.",
        "A significant new chapter began in New York City in 2009, when YEF was inaugurated with students from Columbia University who were moved by the Holy Spirit to gather for small-group Bible studies and share the gospel of Jesus Christ with their fellow students. From these early gatherings, YEF developed with a clear focus: to reach university students who are thirsty for the Word of God, help them grow as disciples of Jesus Christ, and raise a young generation willing to participate in God’s mission.",
        "By the grace of God, the ministry continued expanding internationally. By 2015, YEF’s mission had reached campuses across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia. The growth of YEF reflects Jesus’ description of the Kingdom of God:",
      ].join("\n\n"),
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
      items: [
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
          body: [
            "YEF participated in MissionFest Toronto in Canada.",
            "The ministry also published several books related to global mission and contemporary religious issues, including How Islam Plans to Change the World by William Wagner.",
            "YEF also participated in the publication of READ, a magazine focused on revival and discipleship organized through a Korean Christian youth and university network.",
          ].join("\n\n"),
        },
        {
          year: "2008",
          title: "Growing International Connections",
          body: [
            "YEF participated in the World Evangelical Alliance General Assembly and the WEA Mission Commission.",
            "The ministry also organized theological seminars, including discussions on the modern understanding of the Student Volunteer Movement and its continuing significance for world mission.",
          ].join("\n\n"),
        },
        {
          year: "2009",
          title: "A New Chapter in International Campus Mission",
          body: [
            "YEF was inaugurated in New York City with students from Columbia University who began gathering for small-group Bible studies and witnessing Jesus Christ to fellow students.",
            "During the same year, the Korea Evangelical College Students Association became affiliated with YEF International as its Korean branch.",
            "YEF participated as a partner organization in the NEXT WAVE CONVENTION and attended the third Asia Emerging Leaders Summit.",
          ].join("\n\n"),
        },
        {
          year: "2010",
          title: "Strengthening Biblical and Global Mission Training",
          body: [
            "YEF participated in the Tokyo 2010 Global Mission Consultation.",
            "New editions of Bible study materials, including a Romans study series, were published.",
            "YEF also held a World Mission Workshop, Summer Gathering 2010, and Pentecost Gathering 2010.",
          ].join("\n\n"),
        },
        {
          year: "2011",
          title: "Strengthening Mission Partnerships",
          body: [
            "YEF Korea became an official member organization of the Korea World Missions Association (KWMA).",
            "Throughout the year, YEF held the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
          ].join("\n\n"),
        },
        {
          year: "2012",
          title: "Research, Publications, and Gatherings",
          body: [
            "The Korea Evangelical Institute was established as a research and publishing organization.",
            "YEF held the Easter Gathering 2012, Pentecost Gathering 2012, Summer Gathering 2012, and Winter Christmas Gathering 2012.",
            "YEF also participated in the 22nd General Assembly of the Korea World Missions Association.",
          ].join("\n\n"),
        },
        {
          year: "2013",
          title: "International Mission and Leadership Development",
          body: [
            "YEF participated in the World Evangelical Alliance Youth Commission's East Asia Youth Mission Leaders Consultation and the YEF International World Mission Conference.",
            "Throughout the year, YEF organized the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
            "YEF also co-hosted and participated in the first through fourth Revival Bible Camps organized by the Revival Movement and participated in the 23rd General Assembly of KWMA.",
          ].join("\n\n"),
        },
        {
          year: "2014",
          title: "Developing Discipleship and Bible Education",
          body: [
            "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014.",
            "The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development.",
            "YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
          ].join("\n\n"),
        },
        {
          year: "2015",
          title: "Global Expansion and Leadership Development",
          body: [
            "By 2015, YEF's international mission had expanded to campuses across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia.",
            "This period also marked the beginning of YEF's first Leadership Conference series in Korea, bringing leaders together for biblical training, fellowship, mission planning, and preparation for continued international expansion.",
            "YEF held the Easter Gathering, Pentecost Gathering, and Christmas Retreat and participated in the 25th General Assembly of KWMA.",
          ].join("\n\n"),
        },
        {
          year: "2016",
          title: "Developing Discipleship and Bible Education",
          body: [
            "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014.",
            "The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development.",
            "YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
          ].join("\n\n"),
        },
        {
          year: "2017",
          title: "Strengthening the Asia Mission Network",
          body: [
            "YEF continued its Leadership Conference series in Korea, strengthening relationships among leaders and developing a broader vision for the growing international mission.",
            "The ministry also held the Easter Retreat, Summer Retreat, and Christmas Retreat.",
            "YEF participated in the 2017 General Assembly of the Asia Evangelical Alliance and the 27th General Assembly of the Korea World Missions Association.",
          ].join("\n\n"),
        },
        {
          year: "2018",
          title: "Building the Asia Pacific Mission Network",
          body: [
            "YEF launched the 2018 YEF Asia Pacific Mission Network, further strengthening cooperation between fellowships throughout the region.",
            "The Easter Retreat, Summer Retreat, and Christmas Retreat were also held.",
            "YEF participated in the 28th General Assembly of KWMA.",
          ].join("\n\n"),
        },
        {
          year: "2019",
          title: "International Mission Conferences and Global Partnerships",
          body: [
            "YEF held the 2019 YEF International Mission Conference in the United Kingdom.",
            "Representatives participated in the 2019 World Olivet Assembly General Assembly in Dover, New York, as well as the World Evangelical Alliance General Assembly in Jakarta, Indonesia.",
            "YEF also held the Easter Retreat, Summer Retreat, and Christmas Retreat. The ministry participated in the 18th Korea Mission Leaders Forum and the 29th General Assembly of KWMA.",
          ].join("\n\n"),
        },
        {
          year: "2020",
          title: "YEF Headquarters Established in Orlando",
          body: [
            "A significant milestone in YEF's international development came in 2020 with the acquisition of YEF Headquarters in Orlando, Florida. The headquarters provided a permanent base for international mission coordination, leadership development, training, worship, fellowship, and missionary preparation.",
            "During the same year, YEF Korea established a mission center serving Kyungpook National University in Daegu and another center in Busan serving Pukyong National University and Kyungsung University.",
            "As ministry increasingly moved online, YEF held the Online Easter Retreat 2020, Online Summer Retreat 2020, and Online Christmas Retreat 2020. YEF also participated in the 30th General Assembly of KWMA.",
          ].join("\n\n"),
        },
        {
          year: "2021",
          title: "New Mission Centers and Continued Online Discipleship",
          body: [
            "YEF established centers serving KAIST in Daejeon and Kyungpook National University.",
            "A YEF Mission Center was also established in Macau, strengthening the ministry's presence in Asia.",
            "YEF hosted the Online Easter Retreat 2021, Online Summer Retreat 2021, and Christmas Retreat 2021. The ministry participated as a member organization in the 31st General Assembly of the Korea World Missions Association.",
          ].join("\n\n"),
        },
        {
          year: "2022",
          title: "Continued Leadership and Ministry Development",
          body: [
            "YEF held its 2022 Summer Retreat.",
            "Rev. Myunghyuk Kim, senior pastor emeritus of Riverside Church, was appointed as an advising professor for YEF Korea.",
          ].join("\n\n"),
        },
        {
          year: "2023",
          title: "Strengthening Mission Partnerships",
          body: [
            "YEF held its 2023 Summer Retreat.",
            "Representatives participated in the 33rd General Assembly of the Korea World Missions Association.",
          ].join("\n\n"),
        },
        {
          year: "2025",
          title: "Equipping a New Generation at YEF Headquarters",
          body: [
            "In 2025, YEF Headquarters in Orlando held a large internship program and Summer Retreat for college students and young missionaries.",
            "Through Bible study, worship, prayer, evangelism, ministry training, fellowship, and practical mission experiences, participants were given opportunities to deepen their faith while experiencing the daily life of Christian mission.",
            "These programs reflected YEF's continued commitment to raising and equipping a new generation of students and young missionaries who can carry the gospel to university campuses, cities, and nations.",
          ].join("\n\n"),
        },
        {
          year: "2026",
          title: "2026 — Expanding the Mission to More Than 60 Nations",
          body: [
            "In 2026, YEF enters a new season of international expansion with plans to establish and strengthen chapters across more than 60 nations.",
            "Building upon more than two decades of campus evangelism, discipleship, leadership development, and international mission, YEF is working to develop stronger national fellowships, digital mission platforms, local leadership, and partnerships with churches around the world.",
            "The vision is not simply to establish a presence in more countries, but to build sustainable mission fields where young people can encounter the gospel, study the Word of God, grow as disciples, and eventually become missionaries and leaders themselves.",
          ].join("\n\n"),
        },
      ],
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

// --- from who-we-are-membership.ts ---
async function buildDefaultWhoWeAreMembershipLayout(
  _uploadMedia: MediaUploader,
) {
  return [
    {
      blockType: "genericJourney",
      eyebrow: "The Membership Journey",
      heading: "How You Grow at YEF",
      stages: [
        {
          label: "Connect",
          color: "#3D9BE9",
          title: "Start Your Journey",
          body: "Discover YEF through Bible study, fellowship, and community.",
        },
        {
          label: "Commit",
          color: "#0066CF",
          title: "Grow in Community",
          body: "Become a committed member, grow in God's Word, and live out YEF's Statement of Faith.",
        },
        {
          label: "Serve",
          color: "#2F5FA8",
          title: "Serve with Purpose",
          body: "Use your gifts and time to serve Christ and contribute to the YEF community.",
        },
        {
          label: "Lead",
          color: "#5B4B8A",
          title: "Lead Others",
          body: "Develop as a servant leader and help others grow in Christ.",
        },
        {
          label: "Ministry",
          color: "#B4823C",
          title: "Live Your Calling",
          body: "Explore God's calling and pursue a life of ministry and service.",
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "What Membership Means",
      paragraphs: [
        {
          body: "Becoming a YEF member means committing to grow in your walk with Christ alongside a local chapter, while staying connected to YEF’s wider international fellowship. Members affirm the YEF Statement of Faith and sign the Membership Covenant, which lays out what we believe and how we commit to living and serving together.",
        },
        {
          body: "Bible studies, discipleship, and mentorship within your local chapter",
        },
        { body: "A voice in your chapter’s life and leadership" },
        {
          body: "Invitations to YEF trainings, retreats, and mission opportunities",
        },
        {
          body: "Connection to a wider fellowship of YEF chapters and members",
        },
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

// --- from who-we-are-mission.ts ---
async function buildDefaultWhoWeAreMissionLayout(_uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "Youth Evangelical Fellowship (YEF) is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide.",
        },
      ],
    },
    {
      blockType: "genericImageText",
      image: await _uploadMedia(
        "/images/who-we-are/card-mission-cross.png",
        "A wooden cross resting on an open Bible",
      ),
      imageAlt: "A wooden cross resting on an open Bible",
      imageSide: "right",
      heading: "Our Mission",
      body: "The word “evangelical” comes from the Greek term εὐαγγέλιον (euangelion), meaning “good news” or “gospel.” At its core, it refers to the message of salvation through Jesus Christ, the central message of Christianity. In the early days of the church, this “good news” was spread through evangelism, the act of sharing Christ’s message with others. From the beginning, believers have been called to share this good news with others, fulfilling Jesus’ command in Matthew 28:19-20: “Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.”",
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

// --- from who-we-are-staff-executive-committee.ts ---
async function buildDefaultWhoWeAreStaffExecutiveCommitteeLayout(
  uploadMedia: MediaUploader,
) {
  const roster: { name: string; title: string; image: string }[] = [
    {
      name: "Dr. William Mark Wagner",
      title: "President",
      image: "/images/staff/william_mark_wagner.webp",
    },
    {
      name: "Danielle White",
      title: "General Secretary",
      image: "/images/staff/Danielle_white.jpg",
    },
    {
      name: "Selemon Trife",
      title: "YEF Africa Representative",
      image: "/images/staff/Selemon_Trife.webp",
    },
    {
      name: "Victor Ahn",
      title: "YEF Asia Pacific Representative",
      image: "/images/staff/victer_ahn.webp",
    },
    {
      name: "Deborah Lan",
      title: "YEF China Representative",
      image: "/images/staff/Deborah_Lan.webp",
    },
    {
      name: "Andrea Li",
      title: "YEF Hong Kong",
      image: "/images/staff/Andrea_Li.webp",
    },
    {
      name: "Ilinca",
      title: "YEF Romania",
      image: "/images/staff/Ilinca.webp",
    },
    {
      name: "Bridaija Jones",
      title: "YEF HQ Mission Staff",
      image: "/images/staff/Bridaija_Jones.webp",
    },
    {
      name: "Emmanual Reid",
      title: "YEF HQ Mission Staff",
      image: "/images/staff/Emmanual_Reid.webp",
    },
    {
      name: "Olivia Lin",
      title: "Director of Chinese Mission",
      image: "/images/staff/olivia-1.webp",
    },
    {
      name: "Josiah Kim",
      title: "Broadcaster",
      image: "/images/staff/Josiah.webp",
    },
  ];

  return [
    {
      blockType: "genericPhotoGrid",
      people: await Promise.all(
        roster.map(async (person) => ({
          image: await uploadMedia(person.image, person.name),
          name: person.name,
          title: person.title,
        })),
      ),
    },
  ];
}

// --- from who-we-are-statement-of-faith.ts ---
async function buildDefaultWhoWeAreStatementOfFaithLayout(
  _uploadMedia: MediaUploader,
) {
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

// --- from who-we-are-welcome.ts ---
async function buildDefaultWhoWeAreWelcomeLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericText",
      paragraphs: [
        {
          body: "YEF is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many around the world.",
        },
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
    {
      blockType: "genericImageText",
      image: await uploadMedia(
        "/images/who-we-are/card-welcome-sunset.png",
        "The sun setting over the ocean",
      ),
      imageAlt: "The sun setting over the ocean",
      imageSide: "right",
      heading: "Welcome",
      body: "“Thy kingdom come, thy will be done on earth as it is in heaven.” — Matthew 6:10",
    },
  ];
}

// --- from yef-mission-school-apply.ts ---
async function buildDefaultYefMissionSchoolApplyLayout(
  _uploadMedia: MediaUploader,
) {
  return [];
}

// --- from yef-mission-school.ts ---
async function buildDefaultYefMissionSchoolLayout(uploadMedia: MediaUploader) {
  return [
    {
      blockType: "genericGallery",
      images: [
        {
          image: await uploadMedia(
            "/images/get-involved/mission-school-bible-study.png",
            "A small group studying the Bible together around a table",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/mission-school-street-outreach.png",
            "YEF members handing out tracts on a European street",
          ),
        },
        {
          image: await uploadMedia(
            "/images/get-involved/gospel-campus-conversation.png",
            "Two students talking on a campus path",
          ),
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "Know the Gospel. Live the Mission. Reach the World.",
      paragraphs: [
        {
          body: "YEF Mission School is a series of courses of Youth Evangelical Fellowship designed to equip students, young adults, members, and emerging missionaries with the spiritual foundation and practical experience needed to participate in the Great Commission.",
        },
        {
          body: "Jesus did not only call His disciples to believe. He called them to follow Him, trained them through life together, and eventually sent them into the world to proclaim the Gospel. YEF Mission School seeks to follow this pattern by bringing together the Word of God, spiritual formation, practical ministry training, and real mission experience.",
        },
        {
          body: "The goal is not simply to produce knowledgeable students, but to raise disciples who understand the Gospel, love God’s Word, care for people, and are prepared to serve wherever God may lead them.",
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "From Students to Missionaries",
      paragraphs: [
        {
          body: "Before someone can faithfully carry the Gospel to others, the Gospel must first take deep root within his or her own life. For this reason, YEF Mission School places Bible study and spiritual formation at the center of the training experience.",
        },
        {
          body: "Participants are encouraged to examine their faith, deepen their understanding of Scripture, develop a consistent prayer life, and learn what it means to follow Jesus not only during ministry activities but throughout everyday life.",
        },
        {
          body: "As this foundation develops, students are gradually introduced to the practical work of mission. They learn how to approach others, share the Gospel, invite someone to Bible study, teach the Word, follow up with students, care for developing members, and participate responsibly in the life of a mission community.",
        },
        {
          body: "YEF Mission School therefore seeks to connect two things that should never be separated: growing as a disciple and learning to make disciples.",
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "Learning Mission by Doing Mission",
      paragraphs: [
        { body: "Mission cannot be learned only in a classroom." },
        {
          body: "An important part of YEF Mission School is practical experience. Participants are given opportunities to serve alongside active missionaries and ministry leaders, allowing them to experience the daily reality of mission firsthand.",
        },
        {
          body: "Depending on the location and program, practical training may include campus evangelism, online evangelism, Bible study invitations, follow-up, student outreach, preparing fellowship gatherings, prayer meetings, worship services, event preparation, media ministry, administrative service, and other areas of mission.",
        },
        {
          body: "Through these experiences, participants begin learning how ministry actually develops from day to day.",
        },
      ],
    },
    {
      blockType: "genericCards",
      background: "blue",
      heading: "Living in Christian Community",
      cards: [
        {
          title: "Christian Community",
          body: "YEF Mission School is also an opportunity to experience Christian community more deeply.\n\nDepending on the program format, participants may spend significant time living, studying, serving, eating, praying, and carrying out mission together. Community life provides its own form of training. Participants learn responsibility, communication, punctuality, service, teamwork, patience, humility, and consideration for others.\n\nMission is rarely accomplished alone. Learning how to work faithfully with other believers is therefore an important part of preparation for long-term ministry.",
        },
        {
          title: "Mission Training Areas",
          body: "YEF Mission School Curriculum may include: Biblical Foundations and Gospel Studies, Prayer and Spiritual Formation, Campus Evangelism, Online Evangelism, Personal Testimony and Gospel Sharing, Bible study preparation and teaching, Student follow-up and shepherding, Discipleship and membership development, Worship and service preparation, Mission reporting and communication, Media and digital ministry, Teamwork and community life, Ministry administration, Leadership development, Chapter development and pioneering, World mission and the Great Commission.",
        },
      ],
    },
    {
      blockType: "genericText",
      heading: "A Global Vision",
      paragraphs: [
        {
          body: "YEF Mission School seeks to give participants a vision that reaches beyond their immediate surroundings.",
        },
        {
          body: "A student may begin by evangelizing on one campus, but the Gospel belongs to every nation. Participants are therefore encouraged to learn about mission fields around the world, pray for other nations, hear missionary testimonies, and consider how their lives might participate in the worldwide advancement of the Gospel.",
        },
        {
          body: "Some may return to their universities with a stronger desire to build campus ministry. Others may help establish new YEF chapters, participate in short-term mission trips, serve through internships, support international mission projects, or eventually pursue full-time ministry. The particular path may differ from person to person, but YEF desires every participant to develop a heart for the Great Commission.",
        },
      ],
    },
    {
      blockType: "genericQuote",
      quote: "“Go therefore and make disciples of all nations.”",
      reference: "— Matthew 28:19",
    },
    {
      blockType: "genericText",
      heading: "Who Is Mission School For?",
      paragraphs: [
        {
          body: "YEF Mission School is designed especially for university students, young adults, YEF members, Bible students seeking deeper training, emerging leaders, interns, prospective missionaries, and those prayerfully considering greater involvement in ministry.",
        },
        {
          body: "Previous ministry experience is not always necessary. What is most important is a willingness to learn, grow, serve, and seriously consider how God may use one’s life for His Kingdom.",
        },
        {
          body: "Different Mission School programs may have specific eligibility requirements according to their location and level of training.",
        },
      ],
    },
    {
      blockType: "genericCta",
      background: "gradient-navy-blue",
      heading: "Take the Next Step",
      body: "Come study the Word. Experience campus mission. Learn to evangelize and teach. Serve alongside missionaries. Grow together with other young believers. Discover how your life can participate in God’s work throughout the world.",
      buttonLabel: "Apply for Mission School",
      buttonHref: "/yef-mission-school/apply",
    },
    {
      blockType: "genericQuote",
      background: "gradient-navy-blue",
      quote:
        "“Your kingdom come, your will be done, on earth as it is in heaven.”",
      reference: "— Matthew 6:10",
    },
  ];
}

/** Uploads an image fetched from a remote URL as Media once per URL — used
 *  for the real WordPress-hosted photos, which are more authoritative than
 *  the Drive-matched placeholders under public/. */
function remoteMediaUploader(payload: Payload) {
  const cache = new Map<string, number>();
  return async (
    url: string,
    filename: string,
    alt: string,
  ): Promise<number> => {
    const cached = cache.get(url);
    if (cached !== undefined) return cached;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const ext = path.extname(filename).slice(1).toLowerCase();
    const mimetype =
      ext === "jpg"
        ? "image/jpeg"
        : ext === "svg"
          ? "image/svg+xml"
          : `image/${ext}`;
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
      const expectedFilename = real
        ? real.filename
        : path.basename(article.image);
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

/**
 * Deletes any Post (and its uploaded cover Media) previously seeded for a
 * slug in REMOVED_ARTICLE_SLUGS — invented placeholder "articles" (fabricated
 * bylines, uncredited stock photography) that never belonged on the site.
 * Runs before seedPosts on every deploy so a copy already sitting in the
 * database gets purged even though the slug no longer appears in
 * newsArticles for seedPosts to touch.
 */
async function deleteRemovedPosts(payload: Payload) {
  let deleted = 0;
  for (const slug of REMOVED_ARTICLE_SLUGS) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    const doc = existing.docs[0];
    if (!doc) continue;

    const imageId =
      typeof doc.image === "object" && doc.image ? doc.image.id : doc.image;

    await payload.delete({ collection: "posts", id: doc.id });
    if (imageId) {
      try {
        await payload.delete({ collection: "media", id: imageId });
      } catch (error) {
        payload.logger.error(
          `Removed post "${slug}": media delete failed: ${error}`,
        );
      }
    }
    deleted += 1;
    payload.logger.info(`Removed post "${slug}": deleted.`);
  }
  payload.logger.info(`Removed-article cleanup: ${deleted} deleted.`);
}

const HOME_BLOCK_ORDER = [
  "hero",
  "about",
  "mission",
  "campusFinder",
  "getInvolved",
  "proof",
  "movement",
  "giving",
  "signup",
];

/** Verbatim text this page's Mission Statement and Call blocks were seeded
 *  with the first time — used only to detect that live state below, never
 *  written anywhere. */
const OLD_MISSION_VERSE =
  "Your people will offer themselves freely on\nthe day of your power; young people will\ncome to";
const OLD_PROOF_HEADING =
  "In the days of your youth, **remember your Creator**.";
/** The Call heading's first correction only italicized "to the nations" —
 *  Figma actually italicizes "campus" and "nations" individually. */
const SINGLE_EMPHASIS_PROOF_HEADING = "From the campus **to the nations**.";
/** The second correction fixed the emphasis but kept it on one line — Figma
 *  breaks it across two. */
const UNBROKEN_PROOF_HEADING = "From the **campus** to the **nations**.";
/** The hero's original first-slide copy, replaced with the "Not to Be
 *  Served, but to Serve." heading and Mark 10:45 verse. */
const OLD_HERO_HEADING = "To Know Christ.\nTo Make Him Known.";
const OLD_HERO_BODY = "For we do not preach ourselves but Jesus Christ as Lord";

/**
 * A one-time fix-up for the "home" page's live database record, which
 * predates this round of Figma changes: seedPage() never re-applies a page
 * that already has real content (see isUntouchedLayout below), so editing
 * this file's defaults alone does nothing for a site already seeded. This
 * reorders the existing blocks to match Figma's section order and refreshes
 * the specific fields Figma changed (the mission verse, the Call section,
 * and the About Us photo), leaving every other block's saved content as an
 * editor left it. Detects its own prior run via the mission verse already
 * matching the new text, so it is safe to leave in place going forward.
 */
async function fixHomePageLayout(payload: Payload, uploadMedia: MediaUploader) {
  const existing = await payload.find({
    collection: "pages",
    where: {
      and: [{ route: { equals: "home" } }, { country: { equals: "int" } }],
    },
    limit: 1,
    depth: 0,
  });
  const doc = existing.docs[0];
  if (!doc || !Array.isArray(doc.layout)) {
    payload.logger.info('Home layout fix: no "home" page found, skipped.');
    return;
  }

  const layout = doc.layout as Array<Record<string, unknown>>;
  const currentOrder = layout
    .map((block) => block.blockType as string)
    .filter((blockType) => blockType !== "testimonials");
  const canonicalOrder = [...currentOrder].sort(
    (a, b) => HOME_BLOCK_ORDER.indexOf(a) - HOME_BLOCK_ORDER.indexOf(b),
  );
  const orderMatches = currentOrder.join() === canonicalOrder.join();

  const mission = layout.find((block) => block.blockType === "mission");
  const proof = layout.find((block) => block.blockType === "proof");
  const hero = layout.find((block) => block.blockType === "hero");
  const heroSlides = hero?.slides as Array<Record<string, unknown>> | undefined;
  const heroSlide0 = heroSlides?.[0];
  const hasTestimonials = layout.some(
    (block) => block.blockType === "testimonials",
  );
  // The condition this fix originally shipped with — kept separate from the
  // later heading-only correction below so a photo already fixed once
  // doesn't get re-uploaded (and duplicated) on a touch-up run.
  const needsOriginalFix =
    !orderMatches ||
    mission?.verse === OLD_MISSION_VERSE ||
    proof?.heading === OLD_PROOF_HEADING;
  const needsFix =
    needsOriginalFix ||
    proof?.heading === SINGLE_EMPHASIS_PROOF_HEADING ||
    proof?.heading === UNBROKEN_PROOF_HEADING ||
    heroSlide0?.heading === OLD_HERO_HEADING ||
    hasTestimonials;
  if (!needsFix) {
    payload.logger.info("Home layout fix: already applied, skipped.");
    return;
  }

  const reordered = layout
    .filter((block) => block.blockType !== "testimonials")
    .sort(
      (a, b) =>
        HOME_BLOCK_ORDER.indexOf(a.blockType as string) -
        HOME_BLOCK_ORDER.indexOf(b.blockType as string),
    );

  if (mission && mission.verse === OLD_MISSION_VERSE) {
    mission.verse = "Young people will come to you";
    mission.verseAccent = "\nlike the morning dew.";
  }

  if (
    proof &&
    (proof.heading === SINGLE_EMPHASIS_PROOF_HEADING ||
      proof.heading === UNBROKEN_PROOF_HEADING)
  ) {
    proof.heading = "From the **campus**\nto the **nations**.";
  }

  if (proof && proof.heading === OLD_PROOF_HEADING) {
    proof.heading = "From the **campus**\nto the **nations**.";
    proof.items = [
      {
        name: "Share the\nGospel",
        body: "We meet students on university campuses and invite them to know Jesus Christ through the Gospel.",
      },
      {
        name: "Teach the Bible",
        body: "We help students grow in faith through Scripture, prayer, and Christian fellowship.",
      },
      {
        name: "Raise Disciples",
        body: "We equip students to follow Christ, lead others, and carry the Gospel to the nations.",
      },
    ];
  }

  if (heroSlide0 && heroSlide0.heading === OLD_HERO_HEADING) {
    heroSlide0.heading = "Not to Be Served,\nbut to Serve.";
    heroSlide0.body =
      "“For even the Son of Man did not come to be served, but to serve.”\nMark 10:45";
  } else if (heroSlide0 && heroSlide0.body === OLD_HERO_BODY) {
    heroSlide0.body =
      "“For even the Son of Man did not come to be served, but to serve.”\nMark 10:45";
  }

  const about = reordered.find((block) => block.blockType === "about");
  if (about && needsOriginalFix) {
    about.image = await uploadMedia(
      "/images/home-v2/about-us-photo.webp",
      "Students celebrating together on campus",
    );
  }

  await payload.update({
    collection: "pages",
    id: doc.id,
    data: { layout: reordered as Page["layout"] },
  });
  payload.logger.info(
    "Home layout fix: reordered sections and refreshed Figma content.",
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
      block &&
      typeof block === "object" &&
      Object.entries(block as object).every(
        ([key, value]) =>
          key === "id" || key === "blockType" || isEmptyValue(value),
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
) {
  const existing = await payload.find({
    collection: "pages",
    where: {
      and: [{ route: { equals: route } }, { country: { equals: "int" } }],
    },
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
      layout: (await buildLayout()) as Page["layout"],
      _status: "published",
    },
  });
  payload.logger.info(`Page "${route}": created.`);
}

/**
 * Adds one block to an already-seeded page if — and only if — it doesn't
 * already have a block of that type. Unlike `seedPage`, this never touches
 * a page's existing blocks, so it's the right tool for adding a new block
 * to a page seedPage() has already filled in (which it will never revisit,
 * since its content is no longer "untouched"); an editor who later removes
 * the block is left alone, since this only checks for absence once.
 */
async function ensureBlockPresent(
  payload: Payload,
  route: Page["route"],
  blockType: string,
  buildBlock: () => Promise<Record<string, unknown>>,
  position: "start" | "end" = "start",
) {
  const existing = await payload.find({
    collection: "pages",
    where: {
      and: [{ route: { equals: route } }, { country: { equals: "int" } }],
    },
    limit: 1,
    depth: 0,
  });
  const doc = existing.docs[0];
  if (!doc || !Array.isArray(doc.layout)) return;
  const layout = doc.layout as Array<Record<string, unknown>>;
  if (layout.some((block) => block.blockType === blockType)) return;

  const block = await buildBlock();
  const updated =
    position === "start" ? [block, ...layout] : [...layout, block];
  await payload.update({
    collection: "pages",
    id: doc.id,
    data: { layout: updated as Page["layout"] },
  });
  payload.logger.info(`Page "${route}": added missing ${blockType} block.`);
}

/**
 * Replaces a whole page's layout with a richer default, but only while it's
 * still missing a given block type — so a page seedPage() already filled in
 * with an earlier, smaller default gets upgraded to the fuller one exactly
 * once, without clobbering anything an editor added since.
 */
async function replaceLayoutIfMissing(
  payload: Payload,
  route: Page["route"],
  blockType: string,
  buildLayout: () => Promise<{ blockType: string }[]>,
) {
  const existing = await payload.find({
    collection: "pages",
    where: {
      and: [{ route: { equals: route } }, { country: { equals: "int" } }],
    },
    limit: 1,
    depth: 0,
  });
  const doc = existing.docs[0];
  if (!doc || !Array.isArray(doc.layout)) return;
  const layout = doc.layout as Array<Record<string, unknown>>;
  if (layout.some((block) => block.blockType === blockType)) return;

  await payload.update({
    collection: "pages",
    id: doc.id,
    data: { layout: (await buildLayout()) as Page["layout"] },
  });
  payload.logger.info(
    `Page "${route}": replaced with the fuller default layout.`,
  );
}

/**
 * Every real page of the site that is not yet wired to the block editor —
 * listed so Pages shows the whole site rather than just Home and Who We Are,
 * even though editing one of these still means changing code for now. See
 * the `builtIn` field on the Pages collection.
 */
const builtInPages: { route: string; title: string }[] = [
  { route: "news", title: "News" },
  { route: "contact", title: "Contact Us" },
  { route: "join", title: "Request Access" },
  { route: "login", title: "Sign In" },
  { route: "resources", title: "Resources" },
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

  await step(payload, "Removed-article cleanup", () =>
    deleteRemovedPosts(payload),
  );
  await step(payload, "Posts seed", () => seedPosts(payload));
  const uploadMedia = mediaUploader(payload);
  await step(payload, 'Page "home"', () =>
    seedPage(payload, "home", "Home", () =>
      buildDefaultHomeLayout(uploadMedia),
    ),
  );
  await step(payload, "Home layout fix", () =>
    fixHomePageLayout(payload, uploadMedia),
  );
  await step(payload, 'Page "who-we-are"', () =>
    seedPage(payload, "who-we-are", "Who We Are", () =>
      buildDefaultWhoWeAreLayout(uploadMedia),
    ),
  );

  await step(payload, 'Page "who-we-are/welcome"', () =>
    seedPage(payload, "who-we-are/welcome", "Welcome", () =>
      buildDefaultWhoWeAreWelcomeLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "who-we-are/mission"', () =>
    seedPage(payload, "who-we-are/mission", "Our Mission", () =>
      buildDefaultWhoWeAreMissionLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "who-we-are/statement-of-faith"', () =>
    seedPage(
      payload,
      "who-we-are/statement-of-faith",
      "Statement of Faith",
      () => buildDefaultWhoWeAreStatementOfFaithLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "who-we-are/history"', () =>
    seedPage(payload, "who-we-are/history", "History", () =>
      buildDefaultWhoWeAreHistoryLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "who-we-are/membership"', () =>
    seedPage(payload, "who-we-are/membership", "Membership", () =>
      buildDefaultWhoWeAreMembershipLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "who-we-are/membership" journey block', () =>
    ensureBlockPresent(
      payload,
      "who-we-are/membership",
      "genericJourney",
      async () => {
        const [layout] =
          await buildDefaultWhoWeAreMembershipLayout(uploadMedia);
        return layout as Record<string, unknown>;
      },
    ),
  );
  await step(payload, 'Page "who-we-are/staff-executive-committee"', () =>
    seedPage(
      payload,
      "who-we-are/staff-executive-committee",
      "Staff/Executive Committee",
      () => buildDefaultWhoWeAreStaffExecutiveCommitteeLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved"', () =>
    seedPage(payload, "get-involved", "Get Involved", () =>
      buildDefaultGetInvolvedLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved" full layout upgrade', () =>
    replaceLayoutIfMissing(payload, "get-involved", "genericJourney", () =>
      buildDefaultGetInvolvedLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/apply"', () =>
    seedPage(payload, "get-involved/apply", "Connect With YEFI", () =>
      buildDefaultGetInvolvedApplyLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/campus-evangelism"', () =>
    seedPage(
      payload,
      "get-involved/campus-evangelism",
      "Campus Evangelism",
      () => buildDefaultGetInvolvedCampusEvangelismLayout(uploadMedia),
    ),
  );
  await step(
    payload,
    'Page "get-involved/campus-evangelism" full layout upgrade',
    () =>
      replaceLayoutIfMissing(
        payload,
        "get-involved/campus-evangelism",
        "genericList",
        () => buildDefaultGetInvolvedCampusEvangelismLayout(uploadMedia),
      ),
  );
  await step(payload, 'Page "get-involved/campus-evangelism/apply"', () =>
    seedPage(
      payload,
      "get-involved/campus-evangelism/apply",
      "Begin Your Mission Journey",
      () => buildDefaultGetInvolvedCampusEvangelismApplyLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/chapter-affiliation"', () =>
    seedPage(
      payload,
      "get-involved/chapter-affiliation",
      "Chapter Affiliation",
      () => buildDefaultGetInvolvedChapterAffiliationLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/leadership-training"', () =>
    seedPage(
      payload,
      "get-involved/leadership-training",
      "International Leadership Retreats",
      () => buildDefaultGetInvolvedLeadershipTrainingLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/leadership-training/apply"', () =>
    seedPage(
      payload,
      "get-involved/leadership-training/apply",
      "Apply for Leadership Training",
      () => buildDefaultGetInvolvedLeadershipTrainingApplyLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/volunteer"', () =>
    seedPage(payload, "get-involved/volunteer", "Volunteer with YEF", () =>
      buildDefaultGetInvolvedVolunteerLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/volunteering"', () =>
    seedPage(payload, "get-involved/volunteering", "Volunteering", () =>
      buildDefaultGetInvolvedVolunteeringLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/bible-studies"', () =>
    seedPage(payload, "get-involved/bible-studies", "Bible Studies", () =>
      buildDefaultGetInvolvedBibleStudiesLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/discipleship"', () =>
    seedPage(
      payload,
      "get-involved/discipleship",
      "Discipleship Training",
      () => buildDefaultGetInvolvedDiscipleshipLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/short-term-mission"', () =>
    seedPage(
      payload,
      "get-involved/short-term-mission",
      "Short-term Mission",
      () => buildDefaultGetInvolvedShortTermMissionLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/short-term-mission/apply"', () =>
    seedPage(
      payload,
      "get-involved/short-term-mission/apply",
      "Apply for Short-term Mission",
      () => buildDefaultGetInvolvedShortTermMissionApplyLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "get-involved/summer-training"', () =>
    seedPage(payload, "get-involved/summer-training", "Summer Training", () =>
      buildDefaultGetInvolvedSummerTrainingLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "network"', () =>
    seedPage(payload, "network", "Network", () =>
      buildDefaultNetworkLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "donate"', () =>
    seedPage(payload, "donate", "Donate", () =>
      buildDefaultDonateLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "reaching-the-campus"', () =>
    seedPage(payload, "reaching-the-campus", "Reaching the Campus", () =>
      buildDefaultReachingTheCampusLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "sharing-the-gospel"', () =>
    seedPage(payload, "sharing-the-gospel", "Sharing the Gospel", () =>
      buildDefaultSharingTheGospelLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "submit-your-story"', () =>
    seedPage(payload, "submit-your-story", "Submit Your Story", () =>
      buildDefaultSubmitYourStoryLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "what-is-evangelical"', () =>
    seedPage(payload, "what-is-evangelical", "Raising Disciples", () =>
      buildDefaultWhatIsEvangelicalLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "yef-mission-school"', () =>
    seedPage(payload, "yef-mission-school", "YEF Mission School", () =>
      buildDefaultYefMissionSchoolLayout(uploadMedia),
    ),
  );
  await step(payload, 'Page "yef-mission-school/apply"', () =>
    seedPage(
      payload,
      "yef-mission-school/apply",
      "Apply YEF Mission School",
      () => buildDefaultYefMissionSchoolApplyLayout(uploadMedia),
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
      [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp",
      ],
    ),
  );

  payload.logger.info("Seed complete.");
  process.exit(0);
};

await run();
