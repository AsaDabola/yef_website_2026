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
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Campus Evangelism | Youth Evangelical Fellowship",
};

/** The pale blue the frame uses behind the three banded sections. */
const BAND = "bg-[#eff5ff]";

/** A section heading: Bricolage ExtraBold 46/50 in the frame. */
const BAND_HEADING =
  "font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]";

/** The short line the frame sets to the right of a band heading. */
const BAND_INTRO = "text-[15px] text-[#4b5565] leading-[24px]";

/** The blue tick that sits on the hairline above each intro heading. */
function HeadingRule() {
  return <div className="-mt-px h-[3px] w-[55px] bg-yef-primary" />;
}

export default async function MissionTripPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-campus-evangelism.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        {/* The frame insets the sub-menu 81px from the left and opens the
            content column at 485px. */}
        <section className="mx-auto max-w-[1920px] px-6 pt-16 lg:pt-[110px] lg:pr-[92px] lg:pl-[81px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 min-[1728px]:gap-[167px]">
            <div className="shrink-0 lg:w-[237px]">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Get Involved")} />

              <h1 className="mt-[42px] font-display font-extrabold text-4xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[60px]">

{t("Campus Evangelism")}
</h1>

              {/* Reach Students. Share Christ. Make Disciples. */}
              <section className="mt-[84px] max-w-[1134px] border-t border-black/10">
                <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,572px)_344px] 2xl:gap-x-16 min-[1728px]:gap-x-[218px]">
                  <div>
                    <HeadingRule />
                    <h2 className="mt-[28px] font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">

{t("Reach Students. Share Christ. Make Disciples.")}
</h2>
                    <p className="mt-[33px] whitespace-pre-line min-[1728px]:w-[640px] text-[19.9px] text-yef-primary italic leading-[37.4px]">
                      {t("“Go into all the world and preach the gospel to all creation.”\n— Mark 16:15")}
                    </p>
                    <p className="mt-[31px] whitespace-pre-line text-[16.6px] text-black leading-[27.2px]">
                      {t("Campus evangelism begins with a willing heart. YEF equips young people to meet students, build genuine relationships, share the Gospel, and invite them to discover Christ through God's Word. Every campus is filled with students searching for purpose, identity, and community — many of whom have never had a real conversation about faith. Through everyday moments, intentional outreach, and consistent presence, YEF trains students to become confident, compassionate witnesses for Christ right where they already are.")}
                    </p>
                  </div>

                  <div className="mt-10 max-w-[344px] 2xl:mt-[31px]">
                    <ResourceTeaserCard
                      image="/images/get-involved/campus-evangelism-teaser-university.webp"
                      alt={t("Students walking together on a university campus")}
                      title={t("Campus Outreach")}
                      href="/get-involved#bible-studies"
                    />
                  </div>
                </div>
              </section>

              {/* Why Go into Campus Evangelism? */}
              <section className="mt-[70px] max-w-[1134px] border-t border-black/10">
                <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,572px)_344px] 2xl:gap-x-16 min-[1728px]:gap-x-[218px]">
                  <div>
                    <HeadingRule />
                    <h2 className="mt-[28px] font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">

{t("Why Go into Campus Evangelism?")}
</h2>
                    <p className="mt-[38px] max-w-[610px] whitespace-pre-line text-[16.6px] text-black leading-[27.2px]">
                      {t("Campus evangelism is more than a single conversation. It is an opportunity to see students, campuses, and communities through the eyes of Christ.\n\nJesus said:")}
                    </p>
                    <p className="mt-[39px] whitespace-pre-line min-[1728px]:w-[790px] text-[19.9px] text-yef-primary italic leading-[37.4px]">
                      {t("“The harvest is plentiful but the workers are few.”\n— Matthew 9:37")}
                    </p>
                    <p className="mt-[23px] max-w-[624px] whitespace-pre-line text-[16.6px] text-black leading-[27.2px]">
                      {t("There are campuses where students have never been personally invited to study the Bible. There are students searching for purpose, identity, and community. There are classmates and friends who have never heard the Gospel clearly explained. YEF Campus Evangelism equips participants to step onto these campuses and share Christ alongside fellow students, campus ministries, and local churches.\n\nSometimes the greatest change also happens within the evangelist. Through evangelism, participants learn to depend more deeply on God, overcome fear, love others well, work as a team, and discover that God can use ordinary students who are simply willing to obey Him.")}
                    </p>
                  </div>

                  <div className="mt-10 max-w-[344px] 2xl:mt-[98px]">
                    <ResourceTeaserCard
                      image="/images/get-involved/campus-evangelism-teaser-friends.webp"
                      alt={t("Two students talking together on campus")}
                      title={t("Bible Studies")}
                      href="/get-involved#bible-studies"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* What You Will Experience */}
        <section className={`${BAND} mt-[67px] pt-20 pb-24 lg:pt-[121px] lg:pb-[129px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("What You Will Experience")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-[33px] gap-y-[39px] lg:mt-[49px] lg:grid-cols-2">
              <div className="flex items-center lg:pl-[63px]">
                <p className="max-w-[531px] font-medium text-2xl text-yef-primary tracking-[-0.8px] sm:text-[36.4px] sm:leading-[50px]">

{t("Every campus is different, but YEF Campus Evangelism is centered around several important areas of ministry.")}
</p>
              </div>

              <InfoCard
                className="lg:min-h-[358px]"
                title={t("Campus Evangelism")}
                body={t("University campuses are at the heart of YEF's mission.\nParticipants may visit local universities to meet students, introduce the fellowship, share the gospel, distribute invitations, pray for the campus, and invite students to Bible study.\nFor many participants, approaching someone they have never met can initially feel uncomfortable. Mission provides an opportunity to overcome that fear and experience the joy of speaking about Christ with others.")}
                quote={t("“How beautiful are the feet of those who bring good news!”\n— Romans 10:15")}
              />

              <InfoCard
                className="lg:min-h-[358px]"
                title={t("Bible Study & Discipleship")}
                body={t("Evangelism should lead toward discipleship.\n\nMission teams may participate in individual or group Bible studies with students they meet during outreach. Participants can observe experienced Bible teachers, share their own reflections, and learn how God's Word speaks into the lives of different people.\n\nThe goal is not simply to make contact with students, but to help them begin a lasting journey of following Christ.")}
              />

              <InfoCard
                className="lg:min-h-[358px]"
                title={t("Prayer & Worship")}
                body={t("Every mission begins and ends with prayer.\n\nTeams spend time praying for the mission field, local churches, universities, students, missionaries, and people they encounter.\nMorning devotions, worship services, group prayer, and personal reflection help participants remember that mission is ultimately God's work.\n\nWe go into the field, but God changes hearts.")}
              />

              <InfoCard
                className="lg:min-h-[358px]"
                title={t("Serving the Local Mission")}
                body={t("Missionaries do not arrive simply to carry out their own plans.\n\nYEF teams seek to serve alongside the local church and existing mission field. Depending on the location, participants may assist with worship services, student gatherings, outreach events, retreats, media ministry, hospitality, children's ministry, community service, or practical ministry needs.\n\nOur desire is to strengthen what God is already building.")}
              />

              <InfoCard
                className="lg:min-h-[358px]"
                title={t("Fellowship")}
                body={t("Mission is also experienced through community.\n\nParticipants pray together, eat together, evangelize together, study Scripture together, overcome difficulties together, and encourage one another throughout the journey.\n\nThese shared experiences often create meaningful relationships between believers from different churches, cities, cultures, and nations.")}
              />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-[1391px] px-6 pt-[68px] pb-20 lg:pb-[125px]">
          <GalleryMosaic
            images={[
              {
                src: "/images/get-involved/gallery-campus-evangelism-table.webp",
                alt: "YEF students sharing the Gospel at a campus outreach table",
              },
              {
                src: "/images/get-involved/gallery-campus-evangelism-trees.webp",
                alt: "Students walking together beneath campus trees",
              },
              {
                src: "/images/get-involved/gallery-campus-evangelism-walk.webp",
                alt: "Students walking across a sunlit campus path",
              },
            ]}
          />
        </section>

        {/* Where We Serve */}
        <section className={`${BAND} pt-20 pb-20 lg:pt-[110px] lg:pb-[86px]`}>
          <div className="mx-auto max-w-[1392px] px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <h2 className={`${BAND_HEADING} lg:mt-[11px]`}>{t("Where We Serve")}</h2>
              <p className={`${BAND_INTRO} lg:max-w-[908px]`}>

{t("YEF's campus evangelism extends across university campuses at home and abroad. Opportunities may include:")}
</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[62px] lg:mt-[59px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Local Campus Outreach")}
                body={t("Reach students on your own campus through outreach events, one-on-one conversations, and invitations to Bible study.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("New Campus Outreach")}
                body={t("Serve alongside YEF chapters and local churches to evangelize university students, establish Bible studies, and strengthen campus fellowships.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Pioneering New Campuses")}
                body={t("Join efforts to reach campuses where YEF has not yet established a fellowship, laying the groundwork for new relationships, Bible studies, and chapters.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("International Campus Evangelism")}
                body={t("Experience cross-cultural evangelism by serving alongside YEF leaders and campus ministries in another nation.")}
              />
            </div>
          </div>
        </section>

        {/* Who Can Join? */}
        <section className="mx-auto max-w-[1391px] px-6 pt-[68px] pb-20 lg:pb-[101px]">
          <div className="grid grid-cols-1 gap-[33px] lg:grid-cols-2">
            <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[73px] lg:min-h-[557px] lg:pt-[68px]">
              <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
              <p className="mt-[54px] whitespace-pre-line text-[19px] text-[#4b5565] leading-[24px]">
                {t("YEF Campus Evangelism is especially designed for students, young adults, church members, volunteers, and emerging evangelists who desire to grow in faith and participate in the Great Commission.\n\nYou do not need to be an experienced evangelist or Bible teacher.\n\nYou need a willing heart.")}
              </p>
            </div>

            <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[62px] lg:min-h-[557px] lg:pt-[82px]">
              <h3 className="font-display font-semibold text-2xl text-black sm:text-[34px] sm:leading-[38px]">
                
{t("Participants should be prepared to:")}
</h3>
              <ul className="mt-[46px] list-disc pl-6 text-[15.8px] text-black leading-[30.8px]">
                <li>
                  
{t("Participate faithfully in our Bible study program, prayer and Bible study")}
</li>
                <li>{t("Work together as part of a team")}</li>
                <li>{t("Respect local churches, leaders, and cultures")}</li>
                <li>{t("Serve wherever help is needed")}</li>
                <li>{t("Share their faith with others")}</li>
                <li>{t("Remain flexible when plans change")}</li>
                <li>{t("Receive guidance and training")}</li>
                <li>{t("Approach the mission field with humility")}</li>
                <li>{t("Represent Christ through their words and actions")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Preparing for Mission */}
        <section className={`${BAND} pt-20 pb-20 lg:pt-[94px] lg:pb-[86px]`}>
          <div className="mx-auto max-w-[1392px] px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <h2 className={`${BAND_HEADING} lg:max-w-[405px]`}>

{t("Preparing for Evangelism")}
</h2>
              <p className={`${BAND_INTRO} lg:mt-[16px] lg:max-w-[908px]`}>

{t("Before stepping onto campus, participants receive preparation to help them share Christ effectively and responsibly. Training may include:")}
</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-[45px] gap-y-[62px] lg:mt-[42px] lg:grid-cols-3">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Biblical Preparation")}
                body={t("Understanding the gospel, the Great Commission, and the biblical foundation of mission.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Evangelism Training")}
                body={t("Learning how to approach students, begin conversations, share personal testimony, explain the gospel, and invite people to Bible study.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Spiritual Preparation")}
                body={t("Developing habits of prayer, Scripture meditation, repentance, and dependence upon God.")}
              />
            </div>

            <div className="mt-[62px] grid grid-cols-1 gap-x-8 gap-y-[62px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Cultural Preparation")}
                body={t("Learning about the people and culture of the mission field and how to serve respectfully across cultural differences.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Practical Preparation")}
                body={t("Understanding schedules, transportation, accommodations, team responsibilities, safety guidelines, finances, and other expectations.")}
              />
            </div>
          </div>
        </section>

        {/* A Typical Day in Mission */}
        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pt-[141px] lg:pb-[110px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-v2-border bg-white lg:min-h-[993px] lg:grid-cols-[1fr_412px]">
            <div className="px-8 pt-12 pb-12 lg:pt-[57px] lg:pr-[45px] lg:pl-[95px]">
              <h2 className={BAND_HEADING}>{t("A Typical Day in Campus Evangelism")}</h2>

              <div className="mt-10 max-w-[790px] text-[19.2px] text-[#4b5565] leading-[30px]">
                <p>

{t("While every day of outreach is different, a typical day may include:")}
</p>

                {[
                  {
                    time: "Morning",
                    body: "Prayer, worship, Scripture meditation, breakfast, and preparation for the day's outreach.",
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
                  <div key={item.time} className="mt-[30px]">
                    <p className="font-bold">{t(item.time)}</p>
                    <p>{t(item.body)}</p>
                  </div>
                ))}

                <p className="mt-[30px]">

{t("Evangelism is not simply one activity during the day. Participants are encouraged to approach the entire day with a missionary heart.")}
</p>
              </div>
            </div>

            <div className="relative min-h-[320px] w-full lg:min-h-full">
              <Image
                src="/images/get-involved/campus-evangelism-typical-day.webp"
                alt={t("A YEF student sharing the Gospel on campus")}
                fill
                sizes="(min-width: 1024px) 412px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* The application frame lives on its own page; this is the only door
            to it from the Mission Trip story. */}
        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Begin Your Mission Journey")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "If God is stirring something in you, take the next step. Tell us where you are and our missions team will walk with you from there.",
            )}
          </p>
          <Link
            href="/get-involved/mission-trip/apply"
            className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Apply for a Campus Mission")}
          </Link>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
