import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import InfoCard from "@/components/get-involved/InfoCard";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Summer Training | Youth Evangelical Fellowship",
};

const BAND = "bg-[#eff5ff]";
const BAND_HEADING =
  "font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]";

export default async function SummerTrainingPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/summer-training-hero.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1392px] px-6 pt-[111px]">
          <Breadcrumb label={t("Summer Training")} />

          <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
            {t("Summer Training")}
          </h1>
          <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
            {t("A Season Set Apart to Grow in the Word, Together")}
          </p>

          <div className="mt-[84px]">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/summer-training-campfire.webp",
                  alt: "Students gathered around a campfire under a starry sky",
                },
                {
                  src: "/images/get-involved/summer-training-beach-run.webp",
                  alt: "Students running and laughing together on the beach at sunset",
                },
                {
                  src: "/images/get-involved/summer-training-zipline.webp",
                  alt: "A student ziplining through the trees",
                },
              ]}
            />
          </div>

          <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-[849fr_494fr]">
            <div className="space-y-[30px] font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19px]">
              <p>
                {t(
                  "Every year, during students' summer break from campus, YEF gathers students from around the world for a season of training in the Word. It's a time set apart from the school year — a chance to slow down, be surrounded by prayer and Scripture, and build friendships with believers from different countries and cultures who share the same calling.",
                )}
              </p>
              <p>
                {t(
                  "Days are anchored in Bible study, teaching, and extended prayer, but Summer Training isn't only what happens indoors. Camping, outdoor activities, and shared meals build community alongside the more structured teaching times — friendships forged around a campfire are as much a part of the training as the sessions themselves.",
                )}
              </p>
              <p>
                {t(
                  "Students also put what they're learning into practice through a hands-on mission practicum — evangelism, teaching, and serving others — under the guidance of experienced leaders. It's one thing to study the Great Commission; Summer Training gives students a place to begin living it out.",
                )}
              </p>
              <p>
                {t(
                  "Program details and dates vary each year, so stay tuned to our site and events if you're interested in joining.",
                )}
              </p>
            </div>

            <p className="mt-12 text-center font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:mt-0 lg:pt-[81px] lg:pr-[20px] lg:pl-[56px] lg:text-[33px] lg:leading-[50px]">
              {t("“As iron sharpens iron, so one person sharpens another.”")}
              <br />
              {t("— Proverbs 27:17")}
            </p>
          </div>
        </section>

        <section className={`${BAND} mt-[100px] pt-20 pb-24 lg:pb-[110px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("What You'll Experience")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:mt-[49px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Bible Study & Prayer")}
                body={t("Each day is anchored in the Word — Bible study, teaching, and times of extended prayer that give students room to slow down and go deeper with God.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Fellowship from Around the World")}
                body={t("Students travel in from different countries and cultures to train side by side, building friendships across the global YEF family.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Activities & Camping")}
                body={t("Training isn't all indoors. Camping, outdoor activities, and shared meals build community alongside the more structured teaching times.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Mission Practicum")}
                body={t("Students put what they're learning into practice through hands-on evangelism and teaching, under the guidance of experienced leaders.")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pt-[100px] lg:pb-[101px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[672fr_671fr]">
            <div className="relative min-h-[320px] w-full lg:min-h-[480px]">
              <Image
                src="/images/get-involved/summer-training-journal.webp"
                alt={t("A student journaling by the water during a quiet moment at Summer Training")}
                fill
                sizes="(min-width: 1024px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 lg:py-0 lg:pr-[108px] lg:pl-12">
              <h2 className="font-display font-semibold text-3xl text-black tracking-[-0.64px] lg:text-[40px] lg:leading-[44px]">
                {t("Where It Leads")}
              </h2>
              <p className="mt-4 font-medium text-[#4b5565] text-base leading-[30px] lg:text-[18.9px]">
                {t(
                  "Summer Training often becomes a turning point — students return to their campus with a deeper walk with Christ and a renewed sense of calling, ready to go further into discipleship, leadership, or their first short-term mission trip.",
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pb-20 lg:pb-[101px]">
          <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[73px]">
            <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
            <p className="mt-[38px] max-w-[760px] whitespace-pre-line text-[19px] text-[#4b5565] leading-[27.2px]">
              {t(
                "Summer Training is open to college students and young adults connected to YEF, whatever stage of faith they're at.\n\nYou don't need prior training or ministry experience — you need a willing heart and a desire to grow.",
              )}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Ready to Grow This Summer?")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "Tell us you're interested in Summer Training, and a member of our team will reach out with details for this year's program.",
            )}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/news"
              className="inline-block rounded-full border border-[#0066cf] px-10 py-4 font-semibold text-[#0066cf] text-xs tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
            >
              {t("See Upcoming Dates")}
            </Link>
            <Link
              href="/get-involved/apply"
              className="inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
            >
              {t("Apply for Summer Training")}
            </Link>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
