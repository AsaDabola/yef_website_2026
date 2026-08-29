import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import InfoCard from "@/components/get-involved/InfoCard";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Discipleship Training | Youth Evangelical Fellowship",
};

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
            src="/images/get-involved/discipleship-hero.webp"
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
              <Breadcrumb label={t("Discipleship Training")} />

              <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
                {t("Discipleship Training")}
              </h1>
              <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
                {t("Not a Class You Finish — a Relationship You Grow Into")}
              </p>

              <div className="mt-[84px]">
                <GalleryMosaic
                  images={[
                    {
                      src: "/images/get-involved/discipleship-embrace.webp",
                      alt: t("Believers embracing one another in fellowship"),
                    },
                    {
                      src: "/images/get-involved/discipleship-friends-sky.webp",
                      alt: t("A group of friends laughing together outdoors"),
                    },
                    {
                      src: "/images/get-involved/discipleship-praying-hands.webp",
                      alt: t("A student praying over an open Bible"),
                    },
                  ]}
                />
              </div>

              <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-[849fr_494fr]">
                <div className="space-y-[30px] font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19px]">
                  <p>
                    {t(
                      "Discipleship is one of the key focuses of our ministry. Jesus himself poured His life into twelve ordinary men and sent them to make disciples of the nations — not through a classroom, but through years of walking, eating, and ministering alongside them.",
                    )}
                  </p>
                  <p>
                    {t(
                      "Discipleship at YEF follows that same pattern. You walk with a trained mentor and a small group of your peers, working through God's Word together — so that you grow from being cared for into someone who can care for others.",
                    )}
                  </p>
                  <p>
                    {t(
                      "This isn't a program you complete and move past. It's a relationship — one-on-one meetings, honest conversation, and Scripture opened together — that keeps shaping you long after any one phase is finished.",
                    )}
                  </p>
                  <p>
                    {t(
                      "You don't need to have it all figured out. You just need a willingness to follow.",
                    )}
                  </p>
                </div>

                <p className="mt-12 text-center font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:mt-0 lg:pt-[81px] lg:pr-[20px] lg:pl-[56px] lg:text-[33px] lg:leading-[50px]">
                  {t("“Go therefore and make disciples of all nations… teaching them to observe all that I have commanded you.”")}
                  <br />
                  {t("— Matthew 28:19-20")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${BAND} mt-[100px] pt-20 pb-24 lg:pb-[110px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("What Discipleship Looks Like")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:mt-[49px] lg:grid-cols-3">
              <InfoCard
                title={t("A Mentor Who Walks With You")}
                body={t("You're paired with a trained leader who meets with you one-on-one — not to lecture, but to listen, pray, and open Scripture together.")}
              />
              <InfoCard
                title={t("Small Group Bible Study")}
                body={t("Alongside one-on-one mentoring, you'll study the Word in a small group of your peers — asking honest questions and learning to feed yourselves on Scripture.")}
              />
              <InfoCard
                title={t("Growth by Phase")}
                body={t("Discipleship moves through phases — from the foundations of the Gospel and your identity in Christ, to living out God's calling and the Great Commission in everyday life.")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pt-[100px] lg:pb-[101px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[672fr_671fr]">
            <div className="relative min-h-[320px] w-full lg:min-h-[480px]">
              <Image
                src="/images/get-involved/discipleship-hand-raised.webp"
                alt={t("A young man raising his hand in worship at sunset")}
                fill
                sizes="(min-width: 1024px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 lg:py-0 lg:pr-[108px] lg:pl-12">
              <h2 className="font-display font-semibold text-3xl text-black tracking-[-0.64px] lg:text-[40px] lg:leading-[44px]">
                {t("What Comes Next")}
              </h2>
              <p className="mt-4 font-medium text-[#4b5565] text-base leading-[30px] lg:text-[18.9px]">
                {t(
                  "Discipleship is where leaders are formed. Many students who complete the program go on to Leadership Training, equipped to disciple others the way they were discipled — the same pattern Jesus gave His own disciples, carried forward one generation at a time.",
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
                "Discipleship is open to any student connected to a YEF chapter, wherever you're at in your walk with Christ — new believer or long-time follower.\n\nYou don't need to have it all figured out. You just need a willingness to follow.",
              )}
            </p>
          </div>
        </section>

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

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
