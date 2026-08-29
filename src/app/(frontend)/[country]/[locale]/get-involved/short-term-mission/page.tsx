import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Short-term Mission | Youth Evangelical Fellowship",
};

export default async function ShortTermMissionPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const layout = await getLayout("get-involved/short-term-mission");
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

              <RenderBlocks layout={layout} />
            </div>
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
