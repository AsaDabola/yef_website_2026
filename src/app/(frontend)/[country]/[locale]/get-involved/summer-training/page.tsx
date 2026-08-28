import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import InfoCard from "@/components/get-involved/InfoCard";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Summer Training | Youth Evangelical Fellowship",
};

/** The pale blue the frame uses behind the banded section, matching Campus Evangelism. */
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
            src="/images/get-involved/summer-training.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1920px] px-6 pt-16 lg:pt-[110px] lg:pr-[92px] lg:pl-[81px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 min-[1728px]:gap-[167px]">
            <div className="shrink-0 lg:w-[237px] lg:sticky lg:top-32 lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1 max-w-[1134px]">
              <Breadcrumb label={t("Get Involved")} />

              <h1 className="mt-[42px] font-display font-extrabold text-4xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[60px]">
                {t("Summer Training")}
              </h1>

              <p className="mt-8 max-w-[820px] text-[19px] text-black leading-[30px]">
                {t(
                  "Every year, during students' summer break from campus, YEF gathers students from around the world for a season of training in the Word. It's a time set apart from the school year — a chance to slow down, be surrounded by prayer and Scripture, and build friendships with believers from different countries and cultures who share the same calling.",
                )}
              </p>
              <p className="mt-5 max-w-[820px] text-[16.6px] text-[#4b5565] leading-[27.2px]">
                {t(
                  "Program details and dates vary each year, so stay tuned to our site and events if you're interested in joining.",
                )}
              </p>
            </div>
          </div>
        </section>

        <section className={`${BAND} mt-16 pt-20 pb-24 lg:pt-[100px] lg:pb-[110px]`}>
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

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pb-[101px]">
          <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[73px]">
            <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
            <p className="mt-[38px] max-w-[760px] whitespace-pre-line text-[19px] text-[#4b5565] leading-[27.2px]">
              {t(
                "Summer Training is open to college students and young adults connected to YEF, whatever stage of faith they're at.\n\nYou don't need prior training or ministry experience — you need a willing heart and a desire to grow.",
              )}
            </p>
          </div>
        </section>

        <StoriesTrio divider={false} />

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Ready to Grow This Summer?")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "Tell us you're interested in Summer Training, and a member of our team will reach out with details for this year's program.",
            )}
          </p>
          <Link
            href="/get-involved/apply"
            className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Apply for Summer Training")}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
