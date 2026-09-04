import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import LeadershipTrainingForm from "@/components/get-involved/LeadershipTrainingForm";
import Testimonials from "@/components/home-v2/Testimonials";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout } from "@/lib/pages";

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
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved/leadership-training/apply", draft);
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

          <div className="mt-[66px] text-center">
            <RenderBlocks layout={layout} />
          </div>

          <LeadershipTrainingForm />
        </section>

        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
