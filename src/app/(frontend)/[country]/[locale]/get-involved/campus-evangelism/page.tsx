import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Campus Evangelism",
};

export default async function CampusEvangelismPage({
  params,
}: {
  params: LocaleParams;
}) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("get-involved/campus-evangelism");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved/campus-evangelism", draft);
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src={
              header.image ||
              "/images/get-involved/banner-campus-evangelism.webp"
            }
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        {/* The frame insets the sub-menu 81px from the left and opens the
            content column at 485px. */}
        <section className="mx-auto max-w-[1920px] px-6 pt-16 lg:pt-[110px] lg:pr-[92px] lg:pl-[81px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 min-[1728px]:gap-[167px]">
            <div className="shrink-0 lg:w-[237px] lg:sticky lg:top-32 lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Get Involved")} />

              <h1 className="mt-[42px] font-display font-extrabold text-4xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[60px]">
                {t(header.heading || "Campus Evangelism")}
              </h1>
            </div>
          </div>
        </section>

        <RenderBlocks layout={layout} />

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
