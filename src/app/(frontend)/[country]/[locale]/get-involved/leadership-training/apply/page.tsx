import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import LeadershipTrainingForm from "@/components/get-involved/LeadershipTrainingForm";
import Testimonials from "@/components/home-v2/Testimonials";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Apply for Leadership Training",
};

export default async function LeadershipTrainingApplyPage({
  params,
}: {
  params: LocaleParams;
}) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[185px] overflow-hidden bg-v2-navy sm:h-[270px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-worship-crowd.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1392px] px-6 pt-11">
          <Breadcrumb label={t("Leadership Training")} />

          <h1 className="mt-[66px] text-center font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
            {t("Apply for Leadership Training")}
          </h1>
          <p className="mx-auto mt-[25px] max-w-[640px] text-center text-lg text-[#4b5565] leading-[1.7] lg:text-[19px]">
            {t(
              "Take the next step toward serving as a teacher and missionary on your campus. Tell us where you are, and a member of our leadership team will follow up with you.",
            )}
          </p>

          <LeadershipTrainingForm />
        </section>

        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
