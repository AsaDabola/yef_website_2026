import Image from "next/image";
import TimelineScroll from "./TimelineScroll";
import { getT } from "@/lib/i18n/server";

type Entry = {
  year: string;
  title: string;
  body: string[];
  side: "left" | "right";
  image?: { src: string; alt: string };
};

const timeline: Entry[] = [
  {
    year: "2002",
    side: "right",
    title: "The Beginning",
    body: [
      "Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary, laying an early foundation for university-centered evangelism and discipleship.",
    ],
  },
  {
    year: "2003",
    side: "left",
    title: "Development of YEF",
    body: [
      "The ministry began developing independently as Youth Evangelical Fellowship, carrying forward the vision of evangelizing university students and raising young disciples for the mission of God.",
    ],
  },
  {
    year: "2004",
    side: "right",
    title: "Expansion in Korea",
    body: [
      "The Korea Evangelical College Students Association was established by Dr. David Jang, further strengthening university mission efforts in Korea.",
    ],
  },
  {
    year: "2005",
    side: "left",
    title: "Campus Mission Expands",
    body: [
      "The ministry expanded throughout Korea to approximately 40 universities across 12 regional branches, establishing a broader foundation for campus evangelism and discipleship.",
    ],
  },
  {
    year: "2006",
    side: "right",
    title: "Participation in Urbana 06",
    body: [
      "YEF participated in the Urbana 06 missions conference in St. Louis, Missouri, beginning their expansion abroad and joining young Christians and mission leaders from around the world in seeking God's direction for global evangelism.",
    ],
  },
  {
    year: "2007",
    side: "left",
    title: "Mission Engagement and Publications",
    body: [
      "YEF participated in MissionFest Toronto in Canada.",
      "The ministry also published several books related to global mission and contemporary religious issues, including How Islam Plans to Change the World by William Wagner.",
      "YEF also participated in the publication of READ, a magazine focused on revival and discipleship organized through a Korean Christian youth and university network.",
    ],
  },
  {
    year: "2008",
    side: "right",
    title: "Growing International Connections",
    body: [
      "YEF participated in the World Evangelical Alliance General Assembly and the WEA Mission Commission.",
      "The ministry also organized theological seminars, including discussions on the modern understanding of the Student Volunteer Movement and its continuing significance for world mission.",
    ],
  },
  {
    year: "2009",
    side: "left",
    title: "A New Chapter in International Campus Mission",
    body: [
      "YEF was inaugurated in New York City with students from Columbia University who began gathering for small-group Bible studies and witnessing Jesus Christ to fellow students.",
      "During the same year, the Korea Evangelical College Students Association became affiliated with YEF International as its Korean branch.",
      "YEF participated as a partner organization in the NEXT WAVE CONVENTION and attended the third Asia Emerging Leaders Summit.",
    ],
  },
  {
    year: "2010",
    side: "right",
    title: "Strengthening Biblical and Global Mission Training",
    body: [
      "YEF participated in the Tokyo 2010 Global Mission Consultation.",
      "New editions of Bible study materials, including a Romans study series, were published.",
      "YEF also held a World Mission Workshop, Summer Gathering 2010, and Pentecost Gathering 2010.",
    ],
  },
  {
    year: "2011",
    side: "left",
    title: "Strengthening Mission Partnerships",
    body: [
      "YEF Korea became an official member organization of the Korea World Missions Association (KWMA).",
      "Throughout the year, YEF held the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
    ],
  },
  {
    year: "2012",
    side: "right",
    title: "Research, Publications, and Gatherings",
    body: [
      "The Korea Evangelical Institute was established as a research and publishing organization.",
      "YEF held the Easter Gathering 2012, Pentecost Gathering 2012, Summer Gathering 2012, and Winter Christmas Gathering 2012.",
      "YEF also participated in the 22nd General Assembly of the Korea World Missions Association.",
    ],
  },
  {
    year: "2013",
    side: "left",
    title: "International Mission and Leadership Development",
    body: [
      "YEF participated in the World Evangelical Alliance Youth Commission's East Asia Youth Mission Leaders Consultation and the YEF International World Mission Conference.",
      "Throughout the year, YEF organized the Easter Gathering, Pentecost Gathering, Summer Gathering, and Winter Christmas Gathering.",
      "YEF also co-hosted and participated in the first through fourth Revival Bible Camps organized by the Revival Movement and participated in the 23rd General Assembly of KWMA.",
    ],
  },
  {
    year: "2014",
    side: "right",
    title: "Developing Discipleship and Bible Education",
    image: {
      src: "/images/history/yef-5th-anniversary-nyc.jpg",
      alt: "YEF's 5th anniversary celebration in New York City",
    },
    body: [
      "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014.",
      "The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development.",
      "YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
    ],
  },
  {
    year: "2015",
    side: "left",
    title: "Global Expansion and Leadership Development",
    image: {
      src: "/images/history/uganda-yef.jpg",
      alt: "YEF ministry in Uganda",
    },
    body: [
      "By 2015, YEF's international mission had expanded to more than 40 countries across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia.",
      "This period also marked the beginning of YEF's first Leadership Conference series in Korea, bringing leaders together for biblical training, fellowship, mission planning, and preparation for continued international expansion.",
      "YEF held the Easter Gathering, Pentecost Gathering, and Christmas Retreat and participated in the 25th General Assembly of KWMA.",
    ],
  },
  {
    year: "2016",
    side: "right",
    title: "Developing Discipleship and Bible Education",
    body: [
      "YEF held the Easter Gathering 2014 and Pentecost Gathering 2014.",
      "The ministry developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development.",
      "YEF participated in the 24th General Assembly of KWMA and co-hosted the fifth Revival Vision Camp organized by the Revival Movement.",
    ],
  },
  {
    year: "2017",
    side: "left",
    title: "Strengthening the Asia Mission Network",
    body: [
      "YEF continued its Leadership Conference series in Korea, strengthening relationships among leaders and developing a broader vision for the growing international mission.",
      "The ministry also held the Easter Retreat, Summer Retreat, and Christmas Retreat.",
      "YEF participated in the 2017 General Assembly of the Asia Evangelical Alliance and the 27th General Assembly of the Korea World Missions Association.",
    ],
  },
  {
    year: "2018",
    side: "right",
    title: "Building the Asia Pacific Mission Network",
    body: [
      "YEF launched the 2018 YEF Asia Pacific Mission Network, further strengthening cooperation between fellowships throughout the region.",
      "The Easter Retreat, Summer Retreat, and Christmas Retreat were also held.",
      "YEF participated in the 28th General Assembly of KWMA.",
    ],
  },
  {
    year: "2019",
    side: "left",
    title: "International Mission Conferences and Global Partnerships",
    body: [
      "YEF held the 2019 YEF International Mission Conference in the United Kingdom.",
      "Representatives participated in the 2019 World Olivet Assembly General Assembly in Dover, New York, as well as the World Evangelical Alliance General Assembly in Jakarta, Indonesia.",
      "YEF also held the Easter Retreat, Summer Retreat, and Christmas Retreat. The ministry participated in the 18th Korea Mission Leaders Forum and the 29th General Assembly of KWMA.",
    ],
  },
  {
    year: "2020",
    side: "right",
    title: "YEF Headquarters Established in Orlando",
    image: {
      src: "/images/history/yef-hq-orlando-signboard.jpg",
      alt: "New signboard at YEF Headquarters in Orlando",
    },
    body: [
      "A significant milestone in YEF's international development came in 2020 with the acquisition of YEF Headquarters in Orlando, Florida. The headquarters provided a permanent base for international mission coordination, leadership development, training, worship, fellowship, and missionary preparation.",
      "During the same year, YEF Korea established a mission center serving Kyungpook National University in Daegu and another center in Busan serving Pukyong National University and Kyungsung University.",
      "As ministry increasingly moved online, YEF held the Online Easter Retreat 2020, Online Summer Retreat 2020, and Online Christmas Retreat 2020. YEF also participated in the 30th General Assembly of KWMA.",
    ],
  },
  {
    year: "2021",
    side: "left",
    title: "New Mission Centers and Continued Online Discipleship",
    body: [
      "YEF established centers serving KAIST in Daejeon and Kyungpook National University.",
      "A YEF Mission Center was also established in Macau, strengthening the ministry's presence in Asia.",
      "YEF hosted the Online Easter Retreat 2021, Online Summer Retreat 2021, and Christmas Retreat 2021. The ministry participated as a member organization in the 31st General Assembly of the Korea World Missions Association.",
    ],
  },
  {
    year: "2022",
    side: "right",
    title: "Continued Leadership and Ministry Development",
    body: [
      "YEF held its 2022 Summer Retreat.",
      "Rev. Myunghyuk Kim, senior pastor emeritus of Riverside Church, was appointed as an advising professor for YEF Korea.",
    ],
  },
  {
    year: "2023",
    side: "left",
    title: "Strengthening Mission Partnerships",
    body: [
      "YEF held its 2023 Summer Retreat.",
      "Representatives participated in the 33rd General Assembly of the Korea World Missions Association.",
    ],
  },
  {
    year: "2025",
    side: "right",
    title: "Equipping a New Generation at YEF Headquarters",
    body: [
      "In 2025, YEF Headquarters in Orlando held a large internship program and Summer Retreat for college students and young missionaries.",
      "Through Bible study, worship, prayer, evangelism, ministry training, fellowship, and practical mission experiences, participants were given opportunities to deepen their faith while experiencing the daily life of Christian mission.",
      "These programs reflected YEF's continued commitment to raising and equipping a new generation of students and young missionaries who can carry the gospel to university campuses, cities, and nations.",
    ],
  },
  {
    year: "2026",
    side: "left",
    title: "2026 — Expanding the Mission to More Than 60 Nations",
    body: [
      "In 2026, YEF enters a new season of international expansion with plans to establish and strengthen chapters across more than 60 nations.",
      "Building upon more than two decades of campus evangelism, discipleship, leadership development, and international mission, YEF is working to develop stronger national fellowships, digital mission platforms, local leadership, and partnerships with churches around the world.",
      "The vision is not simply to establish a presence in more countries, but to build sustainable mission fields where young people can encounter the gospel, study the Word of God, grow as disciples, and eventually become missionaries and leaders themselves.",
    ],
  },
];

async function EntryCard({ entry }: { entry: Entry }) {
  const t = await getT();
  return (
    <div>
      <p className="font-normal text-base text-[#4f4f4f]">{entry.year}</p>
      <h3 className="mt-2 font-black text-2xl leading-tight text-[#0a0500] sm:text-3xl">
        {t(entry.title)}
      </h3>
      {entry.image && (
        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl">
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="mt-3 space-y-3 text-base text-[#4f4f4f]">
        {entry.body.map((paragraph) => (
          <p key={paragraph}>{t(paragraph)}</p>
        ))}
      </div>
    </div>
  );
}

export default async function HistoryTimeline() {
  const t = await getT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:px-16">
        <h2 className="text-center font-black text-4xl text-[#0a0500] sm:text-5xl">
          {t("YEF Through the Years")}
        </h2>

        <TimelineScroll>
          <div className="space-y-16">
            {timeline.map((entry) => (
              <div
                key={entry.year}
                data-timeline-entry
                className="yef-timeline-entry relative sm:grid sm:grid-cols-2 sm:gap-x-16"
              >
                <span
                  aria-hidden="true"
                  className="yef-timeline-dot absolute top-2 left-4 size-3 -translate-x-1/2 rounded-full sm:left-1/2"
                />
                {entry.side === "left" ? (
                  <>
                    <div className="pl-10 sm:pl-0 sm:text-right">
                      <EntryCard entry={entry} />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div className="hidden sm:block" />
                    <div className="pl-10 sm:pl-0">
                      <EntryCard entry={entry} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </TimelineScroll>
      </div>
    </section>
  );
}
