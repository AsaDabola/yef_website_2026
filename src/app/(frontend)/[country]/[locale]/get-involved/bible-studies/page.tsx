import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import InfoCard from "@/components/get-involved/InfoCard";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Bible Studies | Youth Evangelical Fellowship",
};

const BAND = "bg-[#eff5ff]";
const BAND_HEADING =
  "font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]";

export default async function BibleStudiesPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/bible-studies-sunset.png"
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
          <Breadcrumb label={t("Bible Studies")} />

          <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
            {t("Bible Studies")}
          </h1>
          <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
            {t("Open the Word. Ask Anything. Grow for Life.")}
          </p>

          <div className="mt-[84px]">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/bible-study-large-group.png",
                  alt: "A large group of students gathered for Bible study",
                },
                {
                  src: "/images/get-involved/gallery-bible-study-bench.png",
                  alt: "Students studying the Bible together on a bench",
                },
                {
                  src: "/images/get-involved/teaser-bible-study-field.png",
                  alt: "Students reading Scripture together outdoors",
                },
              ]}
            />
          </div>

          <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-[849fr_494fr]">
            <div className="space-y-[30px] font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19px]">
              <p>
                {t(
                  "Embrace your identity in Christ and live out your calling. YEF Bible Studies bring students together each week — one-on-one or in small groups — to open Scripture, ask honest questions, and learn to feed themselves on the Word, not just for a season, but for a lifetime.",
                )}
              </p>
              <p>
                {t(
                  "Every study is led by a trained student leader, not a lecturer. You won't just be told what a passage means — you'll be walked through it, so that reading and understanding the Bible for yourself becomes a habit that outlasts your college years.",
                )}
              </p>
              <p>
                {t(
                  "No question is off-limits. Whether you're exploring faith for the first time or you've read the Bible your whole life, Bible study is a place to bring your honest doubts and questions into the light of Scripture, together with others doing the same.",
                )}
              </p>
              <p>
                {t(
                  "Many YEF leaders trace their walk with Christ back to a single Bible study — a friend who invited them, a passage that finally made sense, a small group that became family. The Word of God has the power to change a life, and that change often starts here.",
                )}
              </p>
            </div>

            <p className="mt-12 text-center font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:mt-0 lg:pt-[81px] lg:pr-[20px] lg:pl-[56px] lg:text-[33px] lg:leading-[50px]">
              {t("“Your word is a lamp for my feet, a light on my path.”")}
              <br />
              {t("— Psalm 119:105")}
            </p>
          </div>
        </section>

        <section className={`${BAND} mt-[100px] pt-20 pb-24 lg:pb-[110px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("What You'll Experience")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:mt-[49px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("A Weekly Rhythm")}
                body={t("Bible study meets every week — a steady rhythm of opening Scripture together that becomes a natural part of campus life.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("One-on-One or Small Group")}
                body={t("Study individually with a leader or alongside a small group of peers — whichever format fits where you are.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("A Place for Honest Questions")}
                body={t("Doubts, hard questions, and half-formed thoughts are welcome here. Bible study is a place to wrestle with Scripture, not just receive it.")}
              />
              <InfoCard
                className="lg:min-h-[257px]"
                title={t("Feed Yourself on the Word")}
                body={t("The goal isn't just to finish a study — it's to leave equipped to open your Bible on your own, long after college ends.")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pt-[100px] lg:pb-[101px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[672fr_671fr]">
            <div className="relative min-h-[320px] w-full lg:min-h-[480px]">
              <Image
                src="/images/get-involved/calvin-conversation.png"
                alt={t("Two students in conversation over an open Bible")}
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
                  "For many students, a Bible study becomes the start of something deeper — a mentoring relationship, a small group that turns into Discipleship Training, a calling to lead others the way they were led. Wherever you're starting, there's room to grow further.",
                )}
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1391px] px-6">
          <StoriesTrio divider={false} />
        </div>

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Join a Bible Study")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "Tell us you're interested, and someone from your local chapter will reach out to get you connected.",
            )}
          </p>
          <Link
            href="/get-involved/apply"
            className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Apply Bible Study")}
          </Link>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
