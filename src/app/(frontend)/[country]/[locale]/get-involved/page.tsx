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
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Get Involved | Youth Evangelical Fellowship",
};

export default async function GetInvolvedPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <GetInvolvedHero />

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px] lg:sticky lg:top-32 lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Get Involved")} />

              <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#dce3f5] bg-[#f1f6ff] p-8 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display font-bold text-xl text-black">
                    {t("Not sure where to start?")}
                  </h2>
                  <p className="mt-2 max-w-[520px] text-[15px] text-[#4b5565] leading-[24px]">
                    {t(
                      "Tell us what you're interested in, and we'll help you find the right opportunity.",
                    )}
                  </p>
                </div>
                <a
                  href="/get-involved/apply"
                  className="shrink-0 rounded-full bg-[#0066cf] px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
                >
                  {t("Tell Us Your Interests")}
                </a>
              </div>

              <MinistrySection
                id="bible-studies"
                title={t("Bible Studies")}
                body={t("Embrace your identity in Christ and live out your calling. Offering individual and group studies, YEF is proud to offer deep and extensive Bible studies. Join us and go deeper in the Word during your college years, which will stay with you for many years to come. The Word of God has the power to change lives and so we aim to give you this great blessing that will surely change your whole life. Transform your lives with the power of His love.")}
                image="/images/get-involved/bible-studies-sunset.png"
                alt={t("The sun setting over a calm ocean")}
                ctas={[
                  { label: "More Info", href: "#bible-studies", primary: true },
                  { label: "Apply Bible Study", href: "/get-involved/apply" },
                ]}
              />

              <CarouselWhatWeDo />

              <div className="border-t border-black/10 py-16">
                <CampusEvangelismPromo />
              </div>

              <StoriesTrio />

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

              <InternshipSection />

              <MinistrySection
                id="discipleship"
                title={t("Discipleship Training")}
                cardTitle={t("Follow Jesus Daily")}
                body={t("Discipleship is one of the key focuses of our ministry. Jesus also raised twelve disciples among the many crowds that followed. Those who are willing to follow the life of Jesus, by overcoming all the hindrances of the world were selected and preciously guided with Word of Jesus. YEF is dedicated to raising students on campus into disciples of Jesus with a more adaptable program for campus life. With small group and personal mentoring, the Bible can guide us to know the heart of God and His amazing salvation. Through our program, you can discover the meaning of salvation, the cross, the calling of God in our lives and much more. Yes, just as Jesus said, “Go, make disciples!”")}
                resourceColumns={[
                  [
                    "Program Overview",
                    "Start a Bible Study",
                    "Study Materials by Phase",
                    "Meet Your Teacher",
                    "What Comes Next",
                  ],
                ]}
                image="/images/get-involved/discipleship.webp"
                alt={t("A student in discipleship training")}
              />

              <MinistrySection
                id="leadership-training"
                title={t("Leadership Training")}
                cardTitle={t("Raise Up Leaders")}
                body={t("YEF offers leadership training regionally and nationwide to provide rich spiritual foods to the students in need. Leadership Training is open to the students who finished their discipleship program on their campus. During their training, they will be equipped as teachers and missionaries on campus by learning about mission and the practicum for instructing students.")}
                ctas={[
                  {
                    label: "Apply for Leadership Training",
                    href: "/get-involved/leadership-retreats/apply",
                    primary: true,
                  },
                ]}
                resourceColumns={[
                  [
                    "Who This Is For",
                    "Training Application",
                    "Leader's Toolkit",
                    "Starting a Chapter",
                    "Ongoing Support",
                  ],
                ]}
                image="/images/get-involved/leadership-training-conference.webp"
                alt={t("YEF students clapping at a leadership training conference")}
              />

              <MinistrySection
                id="volunteering"
                title={t("Volunteering")}
                cardTitle={t("Give Your Time")}
                body={t("As a volunteer with YEF, you will be helping build or start a spiritual movement in your local chapter. Contact your local YEF leader for further information.")}
                ctas={[
                  { label: "Apply to Volunteer", href: "/get-involved/volunteer", primary: true },
                ]}
                resourceColumns={[
                  [
                    "Sign Up",
                    "Time Commitment",
                    "Recommendation Letter",
                    "Volunteer Stories",
                  ],
                ]}
                image="/images/get-involved/volunteering-donation-drive.png"
                alt={t("Volunteers sorting clothing at a donation drive")}
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
