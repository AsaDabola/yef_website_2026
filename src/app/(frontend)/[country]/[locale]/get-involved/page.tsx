import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CampusEvangelismPromo from "@/components/get-involved/CampusEvangelismPromo";
import CarouselWhatWeDo from "@/components/get-involved/CarouselWhatWeDo";
import GetInvolvedHero from "@/components/get-involved/GetInvolvedHero";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import InternshipSection from "@/components/get-involved/InternshipSection";
import MinistrySection from "@/components/get-involved/MinistrySection";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import JourneyTimeline from "@/components/ui/JourneyTimeline";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Get Involved | Youth Evangelical Fellowship",
};

/** The five-stage YEF journey, in the same connected-timeline visual as the
 *  Membership Journey. Drives the compact overview at the top of the page;
 *  the section headings below group the existing program cards — the cards
 *  themselves are untouched, only regrouped. Colors match the Membership
 *  Journey's progression so the two "at a glance" diagrams read as one
 *  visual language. */
const journeySteps = [
  {
    number: "01",
    label: "Join",
    title: "Become a Member",
    body: "Start your journey with YEF.",
    color: "#3D9BE9",
    href: "#join-yef",
  },
  {
    number: "02",
    label: "Grow",
    title: "Bible Studies · Discipleship",
    body: "Grow in Christ, His Word, and community.",
    color: "#0066CF",
    href: "#grow",
  },
  {
    number: "03",
    label: "Reach",
    title: "Campus Evangelism · Short-term Mission",
    body: "Share Christ on campus, and carry it beyond.",
    color: "#2F5FA8",
    href: "#reach",
  },
  {
    number: "04",
    label: "Train",
    title: "Summer Training · Leadership Training",
    body: "Get equipped for ministry and leadership.",
    color: "#5B4B8A",
    href: "#train",
  },
  {
    number: "05",
    label: "Serve",
    title: "Volunteer · Internship",
    body: "Give your gifts, time, and calling to serve.",
    color: "#B4823C",
    href: "#serve",
  },
];

const STAGE_HEADING =
  "font-display font-extrabold text-2xl text-black tracking-[-0.5px] sm:text-[28px]";

/** The small blue-tick-plus-heading treatment MinistrySection uses for a
 *  single program, reused here at the stage level to group a pair of them. */
function StageHeading({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="mb-2">
      <span
        aria-hidden="true"
        className="block h-[3px] w-[55px] bg-[#0066cf]"
      />
      <h2 className={`mt-4 ${STAGE_HEADING}`}>{label}</h2>
      <p className="mt-2 max-w-[560px] text-[15px] text-[#4b5565] leading-[24px]">
        {body}
      </p>
    </div>
  );
}

export default async function GetInvolvedPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("get-involved");
  return (
    <>
      <main>
        <GetInvolvedHero image={header.image} heading={header.heading} />

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px] lg:sticky lg:top-32 lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Get Involved")} />

              {/* A compact, at-a-glance map of the whole journey, in the
                  same connected-timeline style as the Membership Journey. */}
              <div className="mt-10">
                <JourneyTimeline
                  stages={journeySteps.map((step) => ({
                    ...step,
                    label: t(step.label),
                    title: t(step.title),
                    body: t(step.body),
                  }))}
                />
              </div>

              {/* JOIN YEF — a compact CTA, not a program card. */}
              <div
                id="join-yef"
                className="mt-10 scroll-mt-32 flex flex-col items-start justify-between gap-5 rounded-2xl bg-v2-navy px-8 py-7 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold text-[11px] text-white/60 tracking-[1.92px] uppercase">
                    {t("Join YEF")}
                  </p>
                  <h2 className="mt-1 font-display font-bold text-2xl text-white">
                    {t("Become a Member")}
                  </h2>
                  <p className="mt-1.5 max-w-[440px] text-[14px] text-white/70 leading-[21px]">
                    {t(
                      "Take your first step and join a community of students following Jesus together.",
                    )}
                  </p>
                </div>
                <Link
                  href="/who-we-are/membership"
                  className="shrink-0 rounded-full bg-white px-7 py-3.5 font-semibold text-[#00203f] text-xs tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
                >
                  {t("Apply Now")}
                </Link>
              </div>

              {/* GROW — growing in Christ, His Word, and community. */}
              <section id="grow" className="mt-16 scroll-mt-32">
                <StageHeading
                  label={t("Grow")}
                  body={t("Grow in Christ, His Word, and community.")}
                />

                <MinistrySection
                  id="bible-studies"
                  title={t("Bible Studies")}
                  body={t("Embrace your identity in Christ and live out your calling. YEF Bible Studies bring students together each week — one-on-one or in small groups — to open Scripture, ask honest questions, and learn to feed themselves on the Word, not just for a season, but for a lifetime. Every study is led by a trained student leader, not a lecturer, so you're walked through the text rather than simply told what it means. No question is off-limits — whether you're exploring faith for the first time or you've read the Bible your whole life, this is a place to bring your honest doubts into the light of Scripture, together with others doing the same. The Bible has the power to change lives, and we want every student on your campus to have a place to discover that for themselves.")}
                  image="/images/get-involved/bible-studies-sunset.png"
                  alt={t("The sun setting over a calm ocean")}
                  ctas={[
                    { label: "Learn More", href: "/get-involved/bible-studies", primary: true },
                    { label: "Apply Bible Study", href: "/get-involved/apply" },
                  ]}
                />

                <CarouselWhatWeDo />

                <MinistrySection
                  id="discipleship"
                  title={t("Discipleship Training")}
                  cardTitle={t("Follow Jesus Daily")}
                  body={t("Discipleship is one of the key focuses of our ministry. Jesus himself poured His life into twelve ordinary men and sent them to make disciples of the nations. At YEF, discipleship means walking with a trained mentor and a small group of your peers, working through the Word phase by phase — so you grow from being cared for into someone who can care for others. You don't need to have it all figured out. You just need a willingness to follow. Just as Jesus said, “Go, make disciples!”")}
                  ctas={[
                    {
                      label: "Learn More",
                      href: "/get-involved/discipleship",
                      primary: true,
                    },
                    { label: "Start Discipleship", href: "/get-involved/apply" },
                  ]}
                  image="/images/get-involved/discipleship.webp"
                  alt={t("A student in discipleship training")}
                />
              </section>

              {/* REACH — sharing Christ on campus, and carrying it further. */}
              <section id="reach" className="mt-16 scroll-mt-32">
                <StageHeading
                  label={t("Reach")}
                  body={t("Share Christ on campus, and carry it beyond.")}
                />

                <div className="border-t border-black/10 py-16">
                  <CampusEvangelismPromo />
                </div>

                <MinistrySection
                  id="short-term-mission"
                  title={t("Short-term Mission")}
                  cardTitle={t("Serve with Purpose")}
                  body={t("YEF short-term mission trips send teams of students to serve during school breaks — on their own campus, in another city, another country, or online. Teams share the Gospel, lead Bible studies, pray for the campuses and communities they visit, and serve alongside local YEF chapters and churches. It's a chance to step out in faith, grow through hands-on ministry, and see God work through students who are simply willing to go.")}
                  ctas={[
                    {
                      label: "Learn More",
                      href: "/get-involved/short-term-mission",
                      primary: true,
                    },
                    {
                      label: "Apply for Short-term Mission",
                      href: "/get-involved/short-term-mission/apply",
                    },
                  ]}
                  image="/images/get-involved/short-term-mission.webp"
                  alt={t("A woman leading a classroom in prayer")}
                />

                <StoriesTrio />
              </section>

              {/* TRAIN — equipped for ministry and leadership. */}
              <section id="train" className="mt-16 scroll-mt-32">
                <StageHeading
                  label={t("Train")}
                  body={t("Get equipped for ministry and leadership.")}
                />

                <MinistrySection
                  id="summer-training"
                  title={t("Summer Training")}
                  cardTitle={t("Grow in Christ")}
                  body={t("Every year, during students' summer break from campus, YEF gathers students from around the world for a season of training in the Word. Days are filled with Bible study, prayer, and fellowship with believers from different countries and cultures — alongside activities, camping, and a hands-on practicum in mission, evangelism, and teaching. Program details and dates vary each year, so stay tuned to our site events if you're interested.")}
                  ctas={[
                    {
                      label: "Learn More",
                      href: "/get-involved/summer-training",
                      primary: true,
                    },
                    { label: "Apply for Summer Training", href: "/get-involved/apply" },
                  ]}
                  image="/images/get-involved/summer-training.webp"
                  alt={t("YEF students setting up an outreach table on campus")}
                />

                <MinistrySection
                  id="leadership-training"
                  title={t("Leadership Training")}
                  cardTitle={t("Raise Up Leaders")}
                  body={t("YEF offers leadership training regionally and internationally to equip students with rich spiritual food for the road ahead. Leadership Training is open to students who have completed their discipleship program on their campus. During their training, they are formed as teachers and missionaries on campus — learning both the theology of mission and the practical craft of instructing and shepherding other students.")}
                  ctas={[
                    {
                      label: "Learn More",
                      href: "/get-involved/leadership-training",
                      primary: true,
                    },
                    {
                      label: "Apply for Leadership Training",
                      href: "/get-involved/leadership-training/apply",
                    },
                  ]}
                  image="/images/get-involved/leadership-training-conference.webp"
                  alt={t("YEF students clapping at a leadership training conference")}
                />
              </section>

              {/* SERVE — gifts, skills, time, and calling. */}
              <section id="serve" className="mt-16 scroll-mt-32">
                <StageHeading
                  label={t("Serve")}
                  body={t("Give your gifts, time, and calling to serve.")}
                />

                <MinistrySection
                  id="volunteering"
                  title={t("Volunteering")}
                  cardTitle={t("Give Your Time")}
                  body={t("As a volunteer with YEF, you put your everyday gifts — administration, hospitality, media, prayer, and more — to work building the ministry in your local chapter. Every role matters: a volunteer setting up chairs or editing a video is part of the same mission as a student sharing the Gospel on campus. Tell us about yourself, and we'll help you find where you're needed most.")}
                  ctas={[
                    {
                      label: "Learn More",
                      href: "/get-involved/volunteering",
                      primary: true,
                    },
                    { label: "Apply to Volunteer", href: "/get-involved/volunteer" },
                  ]}
                  image="/images/get-involved/volunteering-donation-drive.png"
                  alt={t("Volunteers sorting clothing at a donation drive")}
                />

                <InternshipSection />
              </section>

              {/* Share Your Story — a closing invitation, not another
                  program category. */}
              <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-2xl border border-v2-border bg-white px-8 py-7 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display font-bold text-black text-lg">
                    {t("Have a Story to Share?")}
                  </h2>
                  <p className="mt-1 max-w-[440px] text-[#4b5565] text-[14px] leading-[21px]">
                    {t(
                      "God has been at work in your life — we'd love to hear about it.",
                    )}
                  </p>
                </div>
                <Link
                  href="/submit-your-story"
                  className="shrink-0 rounded-full bg-[#0066cf] px-7 py-3.5 font-semibold text-white text-xs tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
                >
                  {t("Share Your Story")}
                </Link>
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl bg-v2-navy px-8 py-7 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display font-bold text-lg text-white">
                    {t("Still Not Sure Where to Start?")}
                  </h2>
                  <p className="mt-1 max-w-[440px] text-[14px] text-white/70 leading-[21px]">
                    {t(
                      "Tell us what you're interested in, and we'll help you find the right opportunity.",
                    )}
                  </p>
                </div>
                <Link
                  href="/get-involved/apply"
                  className="shrink-0 rounded-full bg-white px-7 py-3.5 font-semibold text-[#00203f] text-xs tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
                >
                  {t("Tell Us Your Interests")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
