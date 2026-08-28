import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "YEF Mission School | Youth Evangelical Fellowship",
};

const curriculum = [
  "Biblical Foundations and Gospel Studies",
  "Prayer and Spiritual Formation",
  "Campus Evangelism",
  "Online Evangelism",
  "Personal Testimony and Gospel Sharing",
  "Bible study preparation and teaching",
  "Student follow-up and shepherding",
  "Discipleship and membership development",
  "Worship and service preparation",
  "Mission reporting and communication",
  "Media and digital ministry",
  "Teamwork and community life",
  "Ministry administration",
  "Leadership development",
  "Chapter development and pioneering",
  "World mission and the Great Commission",
];

const nextSteps = [
  "Come study the Word.",
  "Experience campus mission.",
  "Learn to evangelize and teach.",
  "Serve alongside missionaries.",
  "Grow together with other young believers.",
  "Discover how your life can participate in God’s work throughout the world.",
];

export default async function YefMissionSchoolPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
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
          <Breadcrumb label={t("YEF Mission School")} />

          <h1 className="mt-10 text-center font-display font-extrabold text-4xl text-black leading-[1.15] tracking-[-0.96px] sm:text-5xl lg:text-[46px] lg:leading-[60px]">
            
{t("YEF Mission School")}
</h1>

          <div className="mt-10">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/mission-school-bible-study.png",
                  alt: "A small group studying the Bible together around a table",
                },
                {
                  src: "/images/get-involved/mission-school-street-outreach.png",
                  alt: "YEF members handing out tracts on a European street",
                },
                {
                  src: "/images/get-involved/gospel-campus-conversation.png",
                  alt: "Two students talking on a campus path",
                },
              ]}
            />
          </div>

          <div className="mx-auto mt-24 max-w-[1109px]">
            <h2 className="text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
              
{t("Know the Gospel. Live the Mission. Reach the World.")}
</h2>
            <p className="mx-auto mt-10 max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("YEF Mission School is a series of courses of Youth Evangelical Fellowship designed to equip students, young adults, members, and emerging missionaries with the spiritual foundation and practical experience needed to participate in the Great Commission.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Jesus did not only call His disciples to believe. He called them to follow Him, trained them through life together, and eventually sent them into the world to proclaim the Gospel. YEF Mission School seeks to follow this pattern by bringing together the Word of God, spiritual formation, practical ministry training, and real mission experience.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("The goal is not simply to produce knowledgeable students, but to raise disciples who understand the Gospel, love God’s Word, care for people, and are prepared to serve wherever God may lead them.")}
</p>
          </div>

          <div className="mx-auto mt-24 max-w-[1109px]">
            <h2 className="text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
              
{t("From Students to Missionaries")}
</h2>
            <p className="mx-auto mt-10 max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Before someone can faithfully carry the Gospel to others, the Gospel must first take deep root within his or her own life. For this reason, YEF Mission School places Bible study and spiritual formation at the center of the training experience.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Participants are encouraged to examine their faith, deepen their understanding of Scripture, develop a consistent prayer life, and learn what it means to follow Jesus not only during ministry activities but throughout everyday life.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("As this foundation develops, students are gradually introduced to the practical work of mission. They learn how to approach others, share the Gospel, invite someone to Bible study, teach the Word, follow up with students, care for developing members, and participate responsibly in the life of a mission community.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("YEF Mission School therefore seeks to connect two things that should never be separated: growing as a disciple and learning to make disciples.")}
</p>
          </div>

          <div className="mx-auto mt-24 max-w-[1109px]">
            <h2 className="text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
              
{t("Learning Mission by Doing Mission")}
</h2>
            <p className="mx-auto mt-10 max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Mission cannot be learned only in a classroom.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("An important part of YEF Mission School is practical experience. Participants are given opportunities to serve alongside active missionaries and ministry leaders, allowing them to experience the daily reality of mission firsthand.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Depending on the location and program, practical training may include campus evangelism, online evangelism, Bible study invitations, follow-up, student outreach, preparing fellowship gatherings, prayer meetings, worship services, event preparation, media ministry, administrative service, and other areas of mission.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Through these experiences, participants begin learning how ministry actually develops from day to day.")}
</p>
          </div>
        </section>

        <section
          id="curriculum"
          className="scroll-mt-32 bg-gradient-to-b from-yef-primary to-yef-primary-light py-20"
        >
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <h2 className="text-center font-display font-extrabold text-3xl text-white tracking-[-0.5px] sm:text-4xl">
              
{t("Living in Christian Community")}
</h2>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 sm:p-10">
                <p className="text-v2-muted-dark-2 leading-relaxed">
                  
{t("YEF Mission School is also an opportunity to experience Christian community more deeply.")}
</p>
                <p className="mt-4 text-v2-muted-dark-2 leading-relaxed">
                  
{t("Depending on the program format, participants may spend significant time living, studying, serving, eating, praying, and carrying out mission together. Community life provides its own form of training. Participants learn responsibility, communication, punctuality, service, teamwork, patience, humility, and consideration for others.")}
</p>
                <p className="mt-4 text-v2-muted-dark-2 leading-relaxed">
                  
{t("Mission is rarely accomplished alone. Learning how to work faithfully with other believers is therefore an important part of preparation for long-term ministry.")}
</p>
              </div>

              <div className="rounded-2xl bg-white p-8 sm:p-10">
                <h3 className="font-display font-extrabold text-xl text-v2-navy">
                  
{t("Mission Training Areas")}
</h3>
                <p className="mt-2 font-semibold text-xs text-v2-muted tracking-[1.6px] uppercase">
                  
{t("YEF Mission School Curriculum may include:")}
</p>
                <ul className="mt-4 space-y-2.5">
                  {curriculum.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <ArrowRightIcon className="size-4 shrink-0 text-yef-primary" />
                      <span className="border-b border-v2-border pb-1 text-sm text-v2-navy leading-none">
                        {t(item)}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#curriculum"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-yef-primary px-8 py-4 font-semibold text-white transition-transform duration-200 hover:scale-105 hover:opacity-90"
                >
                  
{t("Explore Mission School")}
</a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="mx-auto max-w-[1109px]">
            <h2 className="text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
              
{t("A Global Vision")}
</h2>
            <p className="mx-auto mt-10 max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("YEF Mission School seeks to give participants a vision that reaches beyond their immediate surroundings.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("A student may begin by evangelizing on one campus, but the Gospel belongs to every nation. Participants are therefore encouraged to learn about mission fields around the world, pray for other nations, hear missionary testimonies, and consider how their lives might participate in the worldwide advancement of the Gospel.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Some may return to their universities with a stronger desire to build campus ministry. Others may help establish new YEF chapters, participate in short-term mission trips, serve through internships, support international mission projects, or eventually pursue full-time ministry. The particular path may differ from person to person, but YEF desires every participant to develop a heart for the Great Commission.")}
</p>

            <p className="mt-16 text-center font-medium text-2xl text-v2-navy italic leading-relaxed">
              
{t("“Go therefore and make disciples of all nations.”")}
</p>
            <p className="mt-2 text-center text-v2-muted-dark-2 italic">
              
{t("— Matthew 28:19")}
</p>
          </div>

          <div className="mx-auto mt-24 max-w-[1109px]">
            <h2 className="text-center font-display font-extrabold text-3xl text-black leading-[1.15] tracking-[-0.8px] lg:text-[46px] lg:leading-[50px]">
              
{t("Who Is Mission School For?")}
</h2>
            <p className="mx-auto mt-10 max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("YEF Mission School is designed especially for university students, young adults, YEF members, Bible students seeking deeper training, emerging leaders, interns, prospective missionaries, and those prayerfully considering greater involvement in ministry.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Previous ministry experience is not always necessary. What is most important is a willingness to learn, grow, serve, and seriously consider how God may use one’s life for His Kingdom.")}
</p>
            <p className="mx-auto mt-[30px] max-w-[849px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
              
{t("Different Mission School programs may have specific eligibility requirements according to their location and level of training.")}
</p>
          </div>
        </section>

        <section id="apply" className="scroll-mt-32 bg-gradient-to-b from-yef-primary to-yef-primary-light py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
              <div>
                <h2 className="font-display font-extrabold text-3xl text-white tracking-[-0.5px] sm:text-4xl">
                  
{t("Take the Next Step")}
</h2>
                <div className="relative mt-8 aspect-[531/369] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/get-involved/leadership-conference.png"
                    alt={t("Students gathered together at a YEF conference")}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <ul className="space-y-5">
                  {nextSteps.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ArrowRightIcon className="mt-1 size-5 shrink-0 text-white" />
                      <span className="border-b border-white/30 pb-1 text-lg text-white leading-snug">
                        {t(item)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#curriculum"
                    className="inline-flex items-center justify-center rounded-2xl bg-v2-navy px-8 py-4 font-semibold text-white transition-transform duration-200 hover:scale-105 hover:opacity-90"
                  >
                    
{t("Explore Mission School")}
</a>
                  <a
                    href="/yef-mission-school/apply"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 font-semibold text-yef-primary transition-transform duration-200 hover:scale-105 hover:opacity-90"
                  >
                    
{t("Apply for Mission School")}
</a>
                </div>
              </div>
            </div>

            <p className="mt-16 text-center font-medium text-2xl text-white italic leading-relaxed">
              
{t("“Your kingdom come, your will be done, on earth as it is in heaven.”")}
</p>
            <p className="mt-2 text-center text-white/80 italic">
              
{t("— Matthew 6:10")}
</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
