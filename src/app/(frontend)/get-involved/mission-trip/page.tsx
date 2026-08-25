import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import ResourceTeaserCard from "@/components/get-involved/ResourceTeaserCard";
import InfoCard from "@/components/get-involved/InfoCard";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mission Trips | Youth Evangelical Fellowship",
};

export default function MissionTripPage() {
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/subpage-hero-bonfire.png"
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
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <GetInvolvedSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Get Involved" />

              <h1 className="mt-6 font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
                Mission Trips
              </h1>

              {/* Go. Serve. Share. Make Disciples. */}
              <section className="mt-12 border-t border-black/10 pt-12">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_344px] lg:gap-16">
                  <div>
                    <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                      Go. Serve. Share. Make Disciples.
                    </h2>
                    <p className="mt-4 max-w-xl font-medium italic text-yef-primary leading-relaxed">
                      &ldquo;Go into all the world and preach the gospel to all
                      creation.&rdquo;
                      <br />
                      &mdash; Mark 16:15
                    </p>
                    <p className="mt-6 max-w-xl text-v2-muted-dark-2 leading-relaxed">
                      Mission begins with a willing heart. YEF Mission Trips
                      give students, young adults, and believers an
                      opportunity to step outside of their everyday lives and
                      participate directly in the work of the gospel. Through
                      evangelism, Bible study, prayer, service, and fellowship
                      with local believers, participants experience what it
                      means to live with God&rsquo;s mission at the center of
                      their lives.
                    </p>
                    <p className="mt-4 max-w-xl text-v2-muted-dark-2 leading-relaxed">
                      Whether serving in another city, on a university campus,
                      or across international borders, every mission trip
                      carries the same purpose: to make Jesus Christ known
                      and strengthen the work God is already doing in that
                      mission field.
                    </p>
                  </div>

                  <ResourceTeaserCard
                    image="/images/get-involved/teaser-bible-study-field.png"
                    alt="Students gathered on a campus field"
                    title="Bible Studies"
                    href="/get-involved#bible-studies"
                  />
                </div>
              </section>

              {/* Why Go on a Mission Trip? */}
              <section className="mt-16 border-t border-black/10 pt-16">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_344px] lg:gap-16">
                  <div>
                    <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                      Why Go on a Mission Trip?
                    </h2>
                    <p className="mt-6 max-w-xl text-v2-muted-dark-2 leading-relaxed">
                      A mission trip is more than traveling somewhere new. It
                      is an opportunity to see people, cities, and nations
                      through the eyes of Christ. Jesus said:
                    </p>
                    <p className="mt-6 max-w-xl font-medium italic text-yef-primary leading-relaxed">
                      &ldquo;The harvest is plentiful but the workers are
                      few.&rdquo;
                      <br />
                      &mdash; Matthew 9:37
                    </p>
                    <p className="mt-6 max-w-xl text-v2-muted-dark-2 leading-relaxed">
                      There are campuses where students have never been
                      personally invited to study the Bible. There are cities
                      where young people are searching for purpose and
                      community. There are mission fields where local
                      believers need encouragement, fellowship, and
                      additional laborers. YEF Mission Trips allow
                      participants to enter these fields and serve alongside
                      local churches, missionaries, and fellowship leaders.
                    </p>
                    <p className="mt-4 max-w-xl text-v2-muted-dark-2 leading-relaxed">
                      Sometimes the greatest change also happens within the
                      missionary. Through mission, participants learn to
                      depend more deeply on God, overcome fear, serve others,
                      work as a team, and discover that God can use ordinary
                      people who are simply willing to obey Him.
                    </p>
                  </div>

                  <ResourceTeaserCard
                    image="/images/get-involved/teaser-mission-trip-girls.png"
                    alt="Students smiling together on a mission trip"
                    title="Bible Studies"
                    href="/get-involved#bible-studies"
                  />
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* What You Will Experience */}
        <section className="bg-v2-bg py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <h2 className="text-center font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              What You Will Experience
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <p className="flex items-center rounded-2xl bg-v2-bg p-8 font-medium text-2xl text-yef-primary leading-snug tracking-[-0.4px] sm:p-9">
                Every mission field is different, but YEF Mission Trips are
                centered around several important areas of ministry.
              </p>
              <InfoCard
                title="Campus Evangelism"
                body="University campuses are at the heart of YEF's mission. Participants may visit local universities to meet students, introduce the fellowship, share the gospel, distribute invitations, pray for the campus, and invite students to Bible study. For many participants, approaching someone they have never met can initially feel uncomfortable. Mission provides an opportunity to overcome that fear and experience the joy of speaking about Christ with others."
              />
              <InfoCard
                title="Prayer & Worship"
                body="Every mission begins and ends with prayer. Teams spend time praying for the mission field, local churches, universities, students, missionaries, and people they encounter. Morning devotions, worship services, group prayer, and personal reflection help participants remember that mission is ultimately God's work. We go into the field, but God changes hearts."
              />
              <InfoCard
                title="Bible Study & Discipleship"
                body="Evangelism should lead toward discipleship. Mission teams may participate in individual or group Bible studies with students they meet during outreach. Participants can observe experienced Bible teachers, share their own reflections, and learn how God's Word speaks into the lives of different people. The goal is not simply to make contact with students, but to help them begin a lasting journey of following Christ."
              />
              <InfoCard
                title="Fellowship"
                body="Mission is also experienced through community. Participants pray together, eat together, evangelize together, study Scripture together, overcome difficulties together, and encourage one another throughout the journey. These shared experiences often create meaningful relationships between believers from different churches, cities, cultures, and nations."
              />
              <InfoCard
                title="Serving the Local Mission"
                body="Missionaries do not arrive simply to carry out their own plans. YEF teams seek to serve alongside the local church and existing mission field. Depending on the location, participants may assist with worship services, student gatherings, outreach events, retreats, media ministry, hospitality, children's ministry, community service, or practical ministry needs. Our desire is to strengthen what God is already building."
              />
            </div>
          </div>
        </section>

        {/* Where We Serve */}
        <section className="bg-v2-bg py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                Where We Serve
              </h2>
              <p className="max-w-lg text-v2-muted-dark-2 leading-relaxed">
                YEF&rsquo;s mission extends across university campuses,
                cities, and nations. Mission opportunities may include:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoCard
                title="Domestic Mission Trips"
                body="Travel to another city or region to support developing mission fields, local outreach, retreats, and evangelism."
              />
              <InfoCard
                title="Campus Missions"
                body="Serve alongside YEF chapters and local churches to evangelize university students, establish Bible studies, and strengthen campus fellowships."
              />
              <InfoCard
                title="Pioneering Missions"
                body="Join efforts to enter developing mission fields where YEF is working to establish new relationships, Bible studies, campus ministries, or chapters."
              />
              <InfoCard
                title="International Mission Trips"
                body="Experience cross-cultural mission by serving alongside YEF leaders, missionaries, and churches in another nation."
              />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-16">
          <GalleryMosaic
            images={[
              {
                src: "/images/get-involved/gallery-bible-study-bench.png",
                alt: "A YEF Bible study meeting indoors",
              },
              {
                src: "/images/get-involved/gallery-street-outreach.png",
                alt: "Team members sharing the gospel on the street",
              },
              {
                src: "/images/get-involved/gallery-campus-chat.png",
                alt: "Team members talking on a university campus",
              },
            ]}
          />
        </section>

        {/* Who Can Join? */}
        <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-v2-border bg-white p-8 sm:p-10">
              <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                Who Can Join?
              </h2>
              <p className="mt-8 text-lg text-v2-muted-dark-2 leading-relaxed">
                YEF Mission Trips are especially designed for students, young
                adults, church members, volunteers, and emerging missionaries
                who desire to grow in faith and participate in the Great
                Commission.
              </p>
              <p className="mt-4 text-lg text-v2-muted-dark-2 leading-relaxed">
                You do not need to be an experienced evangelist or Bible
                teacher.
              </p>
              <p className="mt-4 text-lg font-semibold text-v2-navy">
                You need a willing heart.
              </p>
            </div>

            <div className="rounded-2xl border border-v2-border bg-white p-8 sm:p-10">
              <h3 className="font-display font-semibold text-2xl text-v2-navy">
                Participants should be prepared to:
              </h3>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-v2-muted-dark-2">
                <li>
                  Participate faithfully in our Bible study program, prayer
                  and Bible study
                </li>
                <li>Work together as part of a team</li>
                <li>Respect local churches, leaders, and cultures</li>
                <li>Serve wherever help is needed</li>
                <li>Share their faith with others</li>
                <li>Remain flexible when plans change</li>
                <li>Receive guidance and training</li>
                <li>Approach the mission field with humility</li>
                <li>Represent Christ through their words and actions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Preparing for Mission */}
        <section className="bg-v2-bg py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                Preparing for Mission
              </h2>
              <p className="max-w-lg text-v2-muted-dark-2 leading-relaxed">
                Before entering the mission field, participants receive
                preparation to help them serve effectively and responsibly.
                Training may include:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <InfoCard
                title="Biblical Preparation"
                body="Understanding the gospel, the Great Commission, and the biblical foundation of mission."
              />
              <InfoCard
                title="Evangelism Training"
                body="Learning how to approach students, begin conversations, share personal testimony, explain the gospel, and invite people to Bible study."
              />
              <InfoCard
                title="Spiritual Preparation"
                body="Developing habits of prayer, Scripture meditation, repentance, and dependence upon God."
              />
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoCard
                title="Practical Preparation"
                body="Understanding schedules, transportation, accommodations, team responsibilities, safety guidelines, finances, and other expectations."
              />
              <InfoCard
                title="Cultural Preparation"
                body="Learning about the people and culture of the mission field and how to serve respectfully across cultural differences."
              />
            </div>
          </div>
        </section>

        {/* A Typical Day in Mission */}
        <section className="mx-auto max-w-[1800px] px-6 py-20 lg:px-16">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-v2-border bg-white lg:grid-cols-[1fr_412px]">
            <div className="p-8 sm:p-12">
              <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                A Typical Day in Mission
              </h2>
              <p className="mt-6 text-lg text-v2-muted-dark-2 leading-relaxed">
                While every mission trip is different, a typical day may
                include:
              </p>

              <dl className="mt-6 space-y-5">
                {[
                  {
                    time: "Morning",
                    body: "Prayer, worship, Scripture meditation, breakfast, and preparation for the day's mission.",
                  },
                  {
                    time: "Daytime",
                    body: "Campus evangelism, outreach, service projects, ministry visits, or meetings with local students and leaders.",
                  },
                  {
                    time: "Afternoon",
                    body: "Bible studies, follow-up meetings, discipleship, ministry training, or additional outreach.",
                  },
                  {
                    time: "Evening",
                    body: "Worship service, fellowship, group Bible study, prayer, and sharing testimonies from the day.",
                  },
                  {
                    time: "End of Day",
                    body: "Personal reflection, journaling, team evaluation, and prayer for the people encountered during outreach.",
                  },
                ].map((item) => (
                  <div key={item.time}>
                    <dt className="font-semibold text-lg text-v2-navy">
                      {item.time}
                    </dt>
                    <dd className="mt-1 text-v2-muted-dark-2 leading-relaxed">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-v2-muted-dark-2 leading-relaxed">
                Mission is not simply one activity during the day.
                Participants are encouraged to approach the entire
                experience with a missionary heart.
              </p>
            </div>

            <div className="relative min-h-[320px] w-full">
              <Image
                src="/images/get-involved/typical-day-portrait.png"
                alt="A YEF mission trip participant"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
