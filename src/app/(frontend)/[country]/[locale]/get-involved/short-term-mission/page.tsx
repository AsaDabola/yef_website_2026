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
  title: "Short-term Mission | Youth Evangelical Fellowship",
};

/** The pale blue the frame uses behind the banded section, matching Campus Evangelism. */
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
            src="/images/get-involved/short-term-mission.webp"
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
                {t("Short-term Mission")}
              </h1>

              <p className="mt-8 max-w-[820px] text-[19px] text-black leading-[30px]">
                {t(
                  "YEF short-term mission trips send teams of students to serve during school breaks — on their own campus, in another city, another country, or online. Teams share the Gospel, lead Bible studies, pray for the campuses and communities they visit, and serve alongside local YEF chapters and churches.",
                )}
              </p>
              <p className="mt-5 max-w-[820px] text-[16.6px] text-[#4b5565] leading-[27.2px]">
                {t(
                  "It's a chance to step out in faith, grow through hands-on ministry, and see God work through students who are simply willing to go.",
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

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pb-[101px]">
          <div className="grid grid-cols-1 gap-[33px] lg:grid-cols-2">
            <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[62px]">
              <h2 className={BAND_HEADING}>{t("Where You Could Serve")}</h2>
              <ul className="mt-[38px] list-disc space-y-2 pl-6 text-[16.6px] text-[#4b5565] leading-[27.2px]">
                <li>{t("Your current city or campus")}</li>
                <li>{t("Another city")}</li>
                <li>{t("Another country")}</li>
                <li>{t("Online mission")}</li>
                <li>{t("Wherever the need is greatest")}</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[62px]">
              <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
              <p className="mt-[38px] whitespace-pre-line text-[16.6px] text-[#4b5565] leading-[27.2px]">
                {t(
                  "Short-term Mission is open to students and young adults connected to YEF.\n\nYou don't need to be an experienced evangelist — you need a willing heart and a readiness to serve as part of a team.",
                )}
              </p>
            </div>
          </div>
        </section>

        <StoriesTrio divider={false} />

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Ready to Go?")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "If God is stirring something in you, take the next step. Tell us where you are and our missions team will walk with you from there.",
            )}
          </p>
          <Link
            href="/get-involved/short-term-mission/apply"
            className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Apply for Short-term Mission")}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
