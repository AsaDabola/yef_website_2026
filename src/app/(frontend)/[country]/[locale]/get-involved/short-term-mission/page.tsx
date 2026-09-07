import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import InfoCard from "@/components/get-involved/InfoCard";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Short-term Mission",
};

const BAND = "bg-[#eff5ff]";
const BAND_HEADING =
  "font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]";

export default async function ShortTermMissionPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/short-term-mission-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1920px] px-6 pt-16 lg:pt-[111px] lg:pr-[92px] lg:pl-[81px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 min-[1728px]:gap-[167px]">
            <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Short-term Mission")} />

              <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
                {t("Short-term Mission")}
              </h1>
              <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
                {t("Step Out in Faith. Go Where You're Sent.")}
              </p>

              <div className="mt-[84px]">
                <GalleryMosaic
                  images={[
                    {
                      src: "/images/get-involved/short-term-mission-friends.webp",
                      alt: t("Three friends with backpacks setting off from a train platform"),
                    },
                    {
                      src: "/images/get-involved/short-term-mission-signpost.webp",
                      alt: t("A signpost pointing to Short-Term and Long-Term"),
                    },
                    {
                      src: "/images/get-involved/short-term-mission-hands.webp",
                      alt: t("A team stacking hands together in unity"),
                    },
                  ]}
                />
              </div>

              <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-[849fr_494fr]">
                <div className="space-y-[30px] font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19px]">
                  <p>
                    {t(
                      "YEF short-term mission trips send teams of students to serve during school breaks — on their own campus, in another city, another country, or online. Teams share the Gospel, lead Bible studies, pray for the campuses and communities they visit, and serve alongside local YEF chapters and churches.",
                    )}
                  </p>
                  <p>
                    {t(
                      "No one goes alone. Every trip is a team — praying, preparing, and serving together, so that the weight of the mission is carried together and the joy of it is shared together too.",
                    )}
                  </p>
                  <p>
                    {t(
                      "A trip doesn't end when the team comes home. Students they meet are connected to Bible study and discipleship, so a short trip can grow into a lasting walk with Christ long after the team has left.",
                    )}
                  </p>
                  <p>
                    {t(
                      "It's a chance to step out in faith, grow through hands-on ministry, and see God work through students who are simply willing to go.",
                    )}
                  </p>
                </div>

                <p className="mt-12 text-center font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:mt-0 lg:pt-[81px] lg:pr-[20px] lg:pl-[56px] lg:text-[33px] lg:leading-[50px]">
                  {t("“Here am I. Send me!”")}
                  <br />
                  {t("— Isaiah 6:8")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${BAND} mt-[100px] pt-20 pb-24 lg:pb-[110px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("What You'll Experience")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:mt-[49px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Team-Based Ministry")}
                body={t("Trips are done as a team, not alone — praying, planning, and serving together, and encouraging one another along the way.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Evangelism & Bible Study")}
                body={t("Teams meet students and community members, share the Gospel, and lead or join Bible studies that continue after the trip ends.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Prayer & Worship")}
                body={t("Every trip is anchored in prayer — for the people you'll meet, the local church, and your team, alongside daily worship and reflection.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Serving Local Chapters & Churches")}
                body={t("Teams come alongside local YEF chapters and churches, serving what God is already building rather than working apart from it.")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pt-[100px] lg:pb-[101px]">
          <h2 className={BAND_HEADING}>{t("Preparing to Go")}</h2>
          <p className="mt-5 max-w-[908px] text-[15px] text-[#4b5565] leading-[24px]">
            {t(
              "Before a team departs, they walk through preparation together, so every student arrives ready — spiritually and practically.",
            )}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:grid-cols-3">
            <InfoCard
              title={t("Team Training")}
              body={t("Teams train together before the trip — Scripture, evangelism practice, and getting to know the people they'll serve alongside.")}
            />
            <InfoCard
              title={t("Support Raising")}
              body={t("Trips are carried by prayer and financial partnership. We'll walk you through inviting others into your trip through support raising.")}
            />
            <InfoCard
              title={t("Travel & Safety Prep")}
              body={t("From logistics to safety guidelines and cultural preparation, our team helps you get ready to serve well and serve safely.")}
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pb-20 lg:pb-[101px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[672fr_671fr]">
            <div className="relative min-h-[320px] w-full lg:min-h-[480px]">
              <Image
                src="/images/get-involved/short-term-mission-kids.webp"
                alt={t("Children running joyfully to greet a mission team")}
                fill
                sizes="(min-width: 1024px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 lg:py-0 lg:pr-[108px] lg:pl-12">
              <h2 className="font-display font-semibold text-3xl text-black tracking-[-0.64px] lg:text-[40px] lg:leading-[44px]">
                {t("Where You Could Serve")}
              </h2>
              <ul className="mt-4 list-disc space-y-1 pl-5 font-medium text-[#4b5565] text-base leading-[30px] lg:text-[18.9px]">
                <li>{t("Your current city or campus")}</li>
                <li>{t("Another city")}</li>
                <li>{t("Another country")}</li>
                <li>{t("Online mission")}</li>
                <li>{t("Wherever the need is greatest")}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pb-20 lg:pb-[101px]">
          <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[73px]">
            <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
            <p className="mt-[38px] max-w-[760px] whitespace-pre-line text-[19px] text-[#4b5565] leading-[27.2px]">
              {t(
                "Short-term Mission is open to students and young adults connected to YEF.\n\nYou don't need to be an experienced evangelist — you need a willing heart and a readiness to serve as part of a team.",
              )}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1391px] px-6">
          <StoriesTrio divider={false} />
        </div>

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Ready to Go?")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "If God is stirring something in you, take the next step. Tell us where you are and our missions team will walk with you from there.",
            )}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/news"
              className="inline-block rounded-full border border-[#0066cf] px-10 py-4 font-semibold text-[#0066cf] text-xs tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
            >
              {t("See Upcoming Trips")}
            </Link>
            <Link
              href="/get-involved/short-term-mission/apply"
              className="inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
            >
              {t("Apply for Short-term Mission")}
            </Link>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
