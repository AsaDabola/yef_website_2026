import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import VolunteerForm from "@/components/get-involved/VolunteerForm";
import Testimonials from "@/components/home-v2/Testimonials";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Volunteer with YEF | Youth Evangelical Fellowship",
};

export default async function VolunteerPage({
  params,
}: {
  params: LocaleParams;
}) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("get-involved/volunteer");
  return (
    <>
      <main>
        <section className="relative h-[185px] overflow-hidden bg-v2-navy sm:h-[270px] lg:h-[378px]">
          <Image
            src={header.image || "/images/submit-story/banner-campfire.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />
          <HeaderV2 />
        </section>

        {/* The frame centres the heading, intro and the form card beneath
            them, with the breadcrumb hanging above at the page's left edge. */}
        <section className="mx-auto max-w-[1392px] px-6 pt-11">
          <Breadcrumb label={t("Volunteer with YEF")} />

          <h1 className="mt-[66px] text-center font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
            {t(header.heading || "Volunteer with YEF")}
          </h1>
          <p className="mx-auto mt-[25px] max-w-[640px] text-center text-lg text-[#4b5565] leading-[1.7] lg:text-[19px]">
            {t(
              header.intro || "Use your gifts for the Gospel. Whether you can serve regularly or support a special project, there is a place for you to participate in YEF’s mission.",
            )}
          </p>

          <VolunteerForm />
        </section>

        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
