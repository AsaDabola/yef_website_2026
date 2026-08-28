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
  title: "Discipleship Training | Youth Evangelical Fellowship",
};

/** The pale blue the frame uses behind the banded section, matching Campus Evangelism. */
const BAND = "bg-[#eff5ff]";
const BAND_HEADING =
  "font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]";

export default async function DiscipleshipPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/discipleship.webp"
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
                {t("Discipleship Training")}
              </h1>

              <p className="mt-[33px] whitespace-pre-line min-[1728px]:w-[790px] text-[19.9px] text-yef-primary italic leading-[37.4px]">
                {t("“Go therefore and make disciples of all nations… teaching them to observe all that I have commanded you.”\n— Matthew 28:19-20")}
              </p>

              <p className="mt-[31px] max-w-[820px] text-[16.6px] text-black leading-[27.2px]">
                {t(
                  "Jesus himself poured His life into twelve ordinary men and sent them to make disciples of the nations. Discipleship at YEF follows that same pattern — not a class you finish, but a relationship you grow into. You walk with a trained mentor and a small group of your peers, working through God's Word together, so that you grow from being cared for into someone who can care for others.",
                )}
              </p>
            </div>
          </div>
        </section>

        <section className={`${BAND} mt-16 pt-20 pb-24 lg:pt-[100px] lg:pb-[110px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("What Discipleship Looks Like")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:mt-[49px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("A Mentor Who Walks With You")}
                body={t("You're paired with a trained leader who meets with you one-on-one — not to lecture, but to listen, pray, and open Scripture together.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Small Group Bible Study")}
                body={t("Alongside one-on-one mentoring, you'll study the Word in a small group of your peers — asking honest questions and learning to feed yourselves on Scripture.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Growth by Phase")}
                body={t("Discipleship moves through phases — from the foundations of the Gospel and your identity in Christ, to living out God's calling and the Great Commission in everyday life.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("What Comes Next")}
                body={t("Discipleship is where leaders are formed. Many students who complete the program go on to Leadership Training, equipped to disciple others the way they were discipled.")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pb-[101px]">
          <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[73px]">
            <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
            <p className="mt-[38px] max-w-[760px] whitespace-pre-line text-[19px] text-[#4b5565] leading-[27.2px]">
              {t(
                "Discipleship is open to any student connected to a YEF chapter, wherever you're at in your walk with Christ — new believer or long-time follower.\n\nYou don't need to have it all figured out. You just need a willingness to follow.",
              )}
            </p>
          </div>
        </section>

        <StoriesTrio divider={false} />

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Start Your Discipleship Journey")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "Tell us you're interested, and a leader from your local chapter will reach out to walk this next step with you.",
            )}
          </p>
          <Link
            href="/get-involved/apply"
            className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Start Discipleship")}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
