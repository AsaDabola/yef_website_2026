const timeline = [
  {
    year: "2002",
    title: "Founding of Apostolos Campus Ministry",
    body: "Apostolos Campus Ministry (ACM) was founded by Dr. David Jang together with students from Olivet Theological College and Seminary, laying an early foundation for university-centered evangelism and discipleship.",
  },
  {
    year: "2003",
    title: "Youth Evangelical Fellowship Takes Shape",
    body: "The ministry began developing independently as Youth Evangelical Fellowship, carrying forward the vision of evangelizing university students and raising young disciples for the mission of God.",
  },
  {
    year: "2004",
    title: "Korea Evangelical College Students Association Founded",
    body: "The Korea Evangelical College Students Association was established by Dr. David Jang, further strengthening university mission efforts in Korea.",
  },
  {
    year: "2005",
    title: "Expanding Across Korean Universities",
    body: "The ministry expanded throughout Korea to approximately 40 universities across 12 regional branches, establishing a broader foundation for campus evangelism and discipleship.",
  },
  {
    year: "2006",
    title: "Urbana 06 and a Global Vision",
    body: "YEF participated in the Urbana 06 missions conference in St. Louis, Missouri, beginning their expansion abroad and joining young Christians and mission leaders from around the world in seeking God's direction for global evangelism.",
  },
  {
    year: "2007",
    title: "Publishing for World Mission",
    body: "YEF participated in MissionFest Toronto in Canada. The ministry also published several books related to global mission and contemporary religious issues, including How Islam Plans to Change the World by William Wagner. YEF also participated in the publication of READ, a magazine focused on revival and discipleship organized through a Korean Christian youth and university network.",
  },
  {
    year: "2008",
    title: "Joining the World Evangelical Alliance",
    body: "YEF participated in the World Evangelical Alliance General Assembly and the WEA Mission Commission. The ministry also organized theological seminars, including discussions on the modern understanding of the Student Volunteer Movement and its continuing significance for world mission.",
  },
  {
    year: "2009",
    title: "YEF Inaugurated in New York City",
    body: "YEF was inaugurated in New York City with students from Columbia University who began gathering for small-group Bible studies and witnessing Jesus Christ to fellow students. During the same year, the Korea Evangelical College Students Association became affiliated with YEF International as its Korean branch. Jongwon Lee was appointed as the representative of YEF Korea.",
  },
  {
    year: "2010",
    title: "Tokyo Global Mission Consultation",
    body: "YEF participated in the Tokyo 2010 Global Mission Consultation. New editions of Bible study materials, including a Romans study series, were published. YEF also held a World Mission Workshop, Summer Gathering 2010, and Pentecost Gathering 2010.",
  },
  {
    year: "2011",
    title: "YEF Korea Joins KWMA",
    body: "Kyungil Ahn was appointed as the representative of YEF Korea. YEF Korea became an official member organization of the Korea World Missions Association (KWMA). Throughout the year, YEF held the Easter, Pentecost, Summer, and Winter Christmas Gatherings.",
  },
  {
    year: "2012",
    title: "Korea Evangelical Institute Established",
    body: "The Korea Evangelical Institute was established as a research and publishing organization. YEF held the Easter, Pentecost, Summer, and Winter Christmas Gatherings, and participated in the 22nd General Assembly of the Korea World Missions Association.",
  },
  {
    year: "2013",
    title: "Strengthening East Asia Mission Leadership",
    body: "YEF participated in the World Evangelical Alliance Youth Commission's East Asia Youth Mission Leaders Consultation and the YEF International World Mission Conference, and co-hosted the first through fourth Revival Bible Camps organized by the Revival Movement.",
  },
  {
    year: "2014",
    title: "Launching MTC, DTC & LTC Training",
    body: "YEF developed and published structured Bible education and member-training programs, including MTC, DTC, and LTC courses designed to support progressive stages of discipleship and ministry development, and participated in the 24th General Assembly of KWMA.",
  },
  {
    year: "2015",
    title: "Mission Reaches More Than 40 Countries",
    body: "By 2015, YEF's international mission had expanded to more than 40 countries across North America, South America, Europe, Africa, Asia Pacific, Southeast Asia, and South Asia, marking the beginning of YEF's first Leadership Conference series in Korea.",
  },
  {
    year: "2017",
    title: "Leadership Conference Series Continues",
    body: "YEF continued its Leadership Conference series in Korea, strengthening relationships among leaders and developing a broader vision for the growing international mission, and participated in the 2017 General Assembly of the Asia Evangelical Alliance.",
  },
  {
    year: "2018",
    title: "Asia Pacific Mission Network Launches",
    body: "YEF launched the 2018 YEF Asia Pacific Mission Network, further strengthening cooperation between fellowships throughout the region, and participated in the 28th General Assembly of KWMA.",
  },
  {
    year: "2019",
    title: "International Mission Conference in the UK",
    body: "YEF held the 2019 YEF International Mission Conference in the United Kingdom. Representatives participated in the 2019 World Olivet Assembly General Assembly in Dover, New York, as well as the World Evangelical Alliance General Assembly in Jakarta, Indonesia.",
  },
  {
    year: "2020",
    title: "YEF Headquarters Established in Orlando",
    body: "A significant milestone in YEF's international development came in 2020 with the acquisition of YEF Headquarters in Orlando, Florida, providing a permanent base for international mission coordination, leadership development, training, worship, fellowship, and missionary preparation.",
  },
  {
    year: "2022",
    title: "New Leadership for YEF Korea",
    body: "YEF held its 2022 Summer Retreat. Rev. Myunghyuk Kim, senior pastor emeritus of Riverside Church, was appointed as an advising professor for YEF Korea, and Minwook Hwang was appointed as the representative of YEF Korea.",
  },
  {
    year: "2023",
    title: "2023 Summer Retreat",
    body: "YEF held its 2023 Summer Retreat. Representatives participated in the 33rd General Assembly of the Korea World Missions Association, and Rev. Haejoo Kang was appointed as the representative of YEF Korea.",
  },
  {
    year: "2025",
    title: "Internship Program at YEF Headquarters",
    body: "YEF Headquarters in Orlando held a large internship program and Summer Retreat for college students and young missionaries, giving participants opportunities to deepen their faith while experiencing the daily life of Christian mission.",
  },
  {
    year: "2026",
    title: "Expanding to 60+ Nations",
    body: "YEF enters a new season of international expansion with plans to establish and strengthen chapters across more than 60 nations, developing stronger national fellowships, digital mission platforms, local leadership, and partnerships with churches around the world.",
  },
];

export default function HistoryTimeline() {
  return (
    <section className="bg-yef-gray-light">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-16">
        <h2 className="font-semibold text-4xl text-yef-navy sm:text-5xl">
          Our Journey, Year by Year
        </h2>

        <ol className="mt-14 border-l-2 border-yef-primary/30">
          {timeline.map((item) => (
            <li key={item.year} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 size-3 -translate-x-[7px] rounded-full bg-yef-primary"
              />
              <p className="font-bold text-2xl text-yef-primary">
                {item.year}
              </p>
              <h3 className="mt-1 font-semibold text-xl text-black">
                {item.title}
              </h3>
              <p className="mt-2 text-black/70">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
