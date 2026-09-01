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
  title: "Volunteering",
};

const BAND = "bg-[#eff5ff]";
const BAND_HEADING =
  "font-display font-extrabold text-3xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[50px]";

export default async function VolunteeringPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/volunteering-hero.webp"
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
              <Breadcrumb label={t("Volunteering")} />

              <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
                {t("Volunteering")}
              </h1>
              <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
                {t("Every Gift, Given for the Kingdom")}
              </p>

              <div className="mt-[84px]">
                <GalleryMosaic
                  images={[
                    {
                      src: "/images/get-involved/volunteering-campus-outreach.webp",
                      alt: t("A volunteer talking with students at a campus outreach table"),
                    },
                    {
                      src: "/images/get-involved/volunteering-donation-drive.png",
                      alt: t("Volunteers waving beside a donation box at a clothing drive"),
                    },
                    {
                      src: "/images/get-involved/volunteering-clipboard.webp",
                      alt: t("A volunteer wearing a \"Volunteer\" shirt writing on a clipboard"),
                    },
                  ]}
                />
              </div>

              <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-[849fr_494fr]">
                <div className="space-y-[30px] font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19px]">
                  <p>
                    {t(
                      "As a volunteer with YEF, you put your everyday gifts to work building the ministry in your local chapter — administration, hospitality, media, prayer, event support, and more.",
                    )}
                  </p>
                  <p>
                    {t(
                      "Every role matters. The same mission that sends a student to share the Gospel on campus is carried forward by the volunteer setting up chairs, editing a video, welcoming guests at the door, or covering a shift in prayer.",
                    )}
                  </p>
                  <p>
                    {t(
                      "Volunteering doesn't require a title or a stage — it requires availability and a willing heart. Scripture describes the body of Christ as many parts, each one necessary (1 Corinthians 12); this is that truth lived out in ordinary, faithful service.",
                    )}
                  </p>
                  <p>
                    {t(
                      "Whether you can give an afternoon or a whole semester, there's a place for you to serve.",
                    )}
                  </p>
                </div>

                <p className="mt-12 text-center font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:mt-0 lg:pt-[81px] lg:pr-[20px] lg:pl-[56px] lg:text-[33px] lg:leading-[50px]">
                  {t("“Whatever you do, work at it with all your heart, as working for the Lord.”")}
                  <br />
                  {t("— Colossians 3:23")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={`${BAND} mt-[100px] pt-20 pb-24 lg:pb-[110px]`}>
          <div className="mx-auto max-w-[1391px] px-6">
            <h2 className={BAND_HEADING}>{t("Ways to Serve")}</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-[39px] lg:mt-[49px] lg:grid-cols-2">
              <InfoCard
                className="lg:min-h-[220px]"
                title={t("Find Your Fit")}
                body={t("Administration, hospitality, media and design, prayer, event support — YEF chapters need every kind of gift, not just the ones on stage.")}
              />
              <InfoCard
                className="lg:min-h-[220px]"
                title={t("Flexible Commitment")}
                body={t("Serve weekly, seasonally, or for a single event — whatever fits the season of life you're in right now.")}
              />
              <InfoCard
                className="lg:min-h-[220px]"
                title={t("Serve Alongside Your Chapter")}
                body={t("Volunteering happens locally, coordinated with your chapter's leaders, so your service is connected to a team, not done alone.")}
              />
              <InfoCard
                className="lg:min-h-[220px]"
                title={t("No Experience Required")}
                body={t("You don't need special training or a ministry background to start — just a willingness to be useful.")}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 pt-20 pb-20 lg:pb-[101px]">
          <div className="rounded-2xl border border-v2-border bg-white px-8 pt-16 pb-12 sm:px-[73px]">
            <h2 className={BAND_HEADING}>{t("Who Can Join?")}</h2>
            <p className="mt-[38px] max-w-[760px] whitespace-pre-line text-[19px] text-[#4b5565] leading-[27.2px]">
              {t(
                "Volunteering is open to anyone connected to a YEF chapter — students, alumni, staff families, and friends of the ministry.\n\nTell us a bit about yourself, and we'll help match you to where you're needed most.",
              )}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1391px] px-6 py-20 text-center lg:py-[100px]">
          <h2 className="font-display font-semibold text-3xl text-black sm:text-[34px] sm:leading-[37.4px]">
            {t("Give Your Time")}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16.6px] text-black leading-[27.2px]">
            {t(
              "Tell us about yourself below, and we'll help you find where you're needed most.",
            )}
          </p>
          <Link
            href="/get-involved/volunteer"
            className="mt-9 inline-block rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Apply to Volunteer")}
          </Link>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
