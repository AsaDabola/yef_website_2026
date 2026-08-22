import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "YEF Mission School | Youth Evangelical Fellowship",
};

const trainingTopics = [
  "Biblical Foundations and Gospel Studies",
  "Prayer and Spiritual Formation",
  "Campus Evangelism",
  "Online Evangelism",
  "Personal Testimony and Gospel Sharing",
  "Bible Study Preparation and Teaching",
  "Student Follow-up and Shepherding",
  "Discipleship and Membership Development",
  "Worship and Service Preparation",
  "Mission Reporting and Communication",
  "Media and Digital Ministry",
  "Teamwork and Community Life",
  "Ministry Administration",
  "Leadership Development",
  "Chapter Development and Pioneering",
  "World Mission and the Great Commission",
];

const whoItsFor = [
  "Come study the Word.",
  "Learn to evangelize and teach.",
  "Grow together with other young believers.",
  "Experience campus mission.",
  "Serve alongside missionaries.",
  "Discover how your life can participate in God's work throughout the world.",
];

export default function YefMissionSchoolPage() {
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-crowd.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label="YEF Mission School" />

          <h1 className="mt-6 font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
            YEF Mission School
          </h1>

          <div className="mt-10">
            <GalleryMosaic
              images={[
                {
                  src: "/images/home-v2/get-involved-summer-training.png",
                  alt: "Mission School students in training",
                },
                {
                  src: "/images/get-involved/discipleship.png",
                  alt: "Students in a Bible study session",
                },
                {
                  src: "/images/get-involved/story-teacher.png",
                  alt: "A student practicing teaching",
                },
              ]}
            />
          </div>

          <div className="mt-12 max-w-3xl">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              What Is YEF Mission School?
            </h2>
            <p className="mt-6 text-v2-muted-dark-2 leading-relaxed">
              YEF Mission School is a series of courses of Youth Evangelical
              Fellowship designed to equip students, young adults, members,
              and emerging missionaries with the spiritual foundation and
              practical experience needed to participate in the Great
              Commission. Jesus did not only call His disciples to believe.
              He called them to follow Him, trained them through life
              together, and eventually sent them into the world to proclaim
              the Gospel. YEF Mission School seeks to follow this pattern by
              bringing together the Word of God, spiritual formation,
              practical ministry training, and real mission experience. The
              goal is not simply to produce knowledgeable students, but to
              raise disciples who understand the Gospel, love God&rsquo;s
              Word, care for people, and are prepared to serve wherever God
              may lead them.
            </p>
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              Growing as a Disciple, Learning to Disciple
            </h2>
            <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              Before someone can faithfully carry the Gospel to others, the
              Gospel must first take deep root within his or her own life.
              For this reason, YEF Mission School places Bible study and
              spiritual formation at the center of the training experience.
              Participants are encouraged to examine their faith, deepen
              their understanding of Scripture, develop a consistent prayer
              life, and learn what it means to follow Jesus not only during
              ministry activities but throughout everyday life. As this
              foundation develops, students are gradually introduced to the
              practical work of mission &mdash; learning how to approach
              others, share the Gospel, invite someone to Bible study, teach
              the Word, follow up with students, care for developing
              members, and participate responsibly in the life of a mission
              community. YEF Mission School therefore seeks to connect two
              things that should never be separated: growing as a disciple
              and learning to make disciples.
            </p>
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              Learning Mission by Doing Mission
            </h2>
            <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              Mission cannot be learned only in a classroom. An important
              part of YEF Mission School is practical experience.
              Participants are given opportunities to serve alongside
              active missionaries and ministry leaders, allowing them to
              experience the daily reality of mission firsthand. Depending
              on the location and program, practical training may include
              campus evangelism, online evangelism, Bible study invitations,
              follow-up, student outreach, preparing fellowship gatherings,
              prayer meetings, worship services, event preparation, media
              ministry, administrative service, and other areas of mission.
              Through these experiences, participants begin learning how
              ministry actually develops from day to day.
            </p>
          </div>

          <div
            id="curriculum"
            className="mt-16 scroll-mt-32 grid grid-cols-1 gap-5 border-t border-black/10 pt-16 lg:grid-cols-2"
          >
            <div className="rounded-2xl border border-v2-border bg-white p-8 sm:p-10">
              <h2 className="font-display font-extrabold text-2xl text-v2-navy sm:text-3xl">
                What You&rsquo;ll Learn
              </h2>
              <p className="mt-6 text-v2-muted-dark-2 leading-relaxed">
                YEF Mission School is also an opportunity to experience
                Christian community more deeply. Depending on the program
                format, participants may spend significant time living,
                studying, serving, eating, praying, and carrying out mission
                together. Community life provides its own form of training
                &mdash; teaching responsibility, communication, punctuality,
                service, teamwork, patience, humility, and consideration for
                others. Mission is rarely accomplished alone. Learning how to
                work faithfully with other believers is therefore an
                important part of preparation for long-term ministry.
              </p>
            </div>

            <div className="rounded-2xl border border-v2-border bg-white p-8 sm:p-10">
              <p className="font-semibold text-xs text-v2-muted tracking-[1.6px] uppercase">
                Top Resources
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {trainingTopics.map((topic) => (
                  <li key={topic}>
                    <a
                      href="#"
                      className="font-medium text-v2-navy underline decoration-v2-border underline-offset-4 transition-colors hover:text-yef-primary hover:decoration-yef-primary"
                    >
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#curriculum"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
              >
                Explore Mission School
              </a>
            </div>
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              A Vision for the World
            </h2>
            <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              YEF Mission School seeks to give participants a vision that
              reaches beyond their immediate surroundings. A student may
              begin by evangelizing on one campus, but the Gospel belongs to
              every nation. Participants are therefore encouraged to learn
              about mission fields around the world, pray for other
              nations, hear missionary testimonies, and consider how their
              lives might participate in the worldwide advancement of the
              Gospel. Some may return to their universities with a stronger
              desire to build campus ministry. Others may help establish
              new YEF chapters, participate in short-term mission trips,
              serve through internships, support international mission
              projects, or eventually pursue full-time ministry. The
              particular path may differ from person to person, but YEF
              desires every participant to develop a heart for the Great
              Commission.
            </p>
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              Who Is Mission School For?
            </h2>
            <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              YEF Mission School is designed especially for university
              students, young adults, YEF members, Bible students seeking
              deeper training, emerging leaders, interns, prospective
              missionaries, and those prayerfully considering greater
              involvement in ministry. Previous ministry experience is not
              always necessary. What is most important is a willingness to
              learn, grow, serve, and seriously consider how God may use
              one&rsquo;s life for His Kingdom. Different Mission School
              programs may have specific eligibility requirements according
              to their location and level of training.
            </p>
          </div>
        </section>

        <section id="apply" className="scroll-mt-32 bg-v2-bg py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
              <div>
                <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                  Is Mission School Right for You?
                </h2>
                <ul className="mt-8 space-y-5">
                  {whoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-yef-primary/10 text-xs text-yef-primary"
                      >
                        &#10003;
                      </span>
                      <p className="text-lg text-v2-navy">{item}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#curriculum"
                    className="inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
                  >
                    Explore Mission School
                  </a>
                  <a
                    href="/get-involved/apply"
                    className="inline-flex items-center justify-center rounded-full border border-v2-border px-8 py-4 font-semibold text-xs text-v2-navy tracking-[1px] uppercase transition-all duration-200 hover:scale-105 hover:border-v2-navy"
                  >
                    Apply for Mission School
                  </a>
                </div>
              </div>

              <div className="relative aspect-[531/369] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/home-v2/get-involved-leadership-training.png"
                  alt="YEF leadership conference"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
