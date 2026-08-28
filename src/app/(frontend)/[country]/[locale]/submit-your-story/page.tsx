import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonySubmission from "@/components/get-involved/TestimonySubmission";
import Testimonials from "@/components/home-v2/Testimonials";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Submit Your Story | Youth Evangelical Fellowship",
};

export default async function SubmitYourStoryPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("submit-your-story");
  return (
    <>
      <main>
        <section className="relative h-[260px] overflow-hidden bg-v2-navy sm:h-[360px] lg:h-[450px]">
          <Image
            src={header.image || "/images/submit-story/banner-campfire.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        {/* The frame centres the heading, intro and form card on the page but
            hangs the breadcrumb off the 1344px quote card below them. */}
        <section className="mx-auto max-w-[1392px] px-6 pt-11">
          <Breadcrumb label={t("Submit Your Story")} />

          <h1 className="mt-[66px] text-center font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">

{t(header.heading || "Submit Your Story")}
</h1>
          <p className="mx-auto mt-[25px] max-w-[724px] text-center font-semibold text-xl text-[#4b5565] leading-[1.6] tracking-[-0.8px] lg:text-[28px] lg:leading-[50px]">

{t(header.intro || "God has been at work in your life — we’d love to hear about it. Share the grace you’ve received, and how it’s shaped your walk with Him.")}
</p>

          <div className="mx-auto mt-[15px] max-w-[922px]">
            <TestimonySubmission />
          </div>

          <div className="mt-[115px] grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[671fr_673fr]">
            <div className="flex items-center px-8 py-12 lg:min-h-[640px] lg:py-0 lg:pr-[30px] lg:pl-[82px]">
              <p className="font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19.2px]">
                <span className="font-bold">{t("Hudson Taylor,")}</span>  {t("who would become one of the most influential missionaries to China and the founder of the China Inland Mission, was only 21 years old when he first sailed for China. His willingness to answer God’s call as a young man eventually contributed to a missionary movement that reached far beyond his own lifetime.")}
</p>
            </div>
            <div className="relative min-h-[320px] w-full lg:min-h-[640px]">
              <Image
                src="/images/submit-story/hudson-taylor.jpg"
                alt={t("Hudson Taylor")}
                fill
                sizes="(min-width: 1024px) 673px, 100vw"
                // The engraving is a portrait bust on white, so it sits in the
                // card rather than filling it the way a photo would.
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </section>

        <div className="mt-[124px]">
          <Testimonials />
        </div>
      </main>
      <Footer />
    </>
  );
}
