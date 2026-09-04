import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "International Leadership Retreats",
};

export default async function LeadershipTrainingPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("get-involved/leadership-retreats");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved/leadership-training", draft);
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src={header.image || "/images/get-involved/leadership-retreats-hero.webp"}
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
          <Breadcrumb label={t("Leadership Training")} />

          <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">

{t(header.heading || "International Leadership Retreats")}
</h1>
          <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">

{t(header.intro || "Strengthening Leaders. Building the Mission. Preparing the Next Generation.")}
</p>

          {/* Gallery, the five body paragraphs, the Mark 10:45 pull-quote,
              and the "Upcoming Leadership Retreats" image + text panel are
              all CMS-editable now. The quote moves from beside the
              paragraphs to stacked below them, since the generic blocks
              render as full-width stacked sections rather than a 2-column
              grid. */}
          <div className="mt-[84px]">
            <RenderBlocks layout={layout} />
          </div>

          <div className="mt-[122px] flex flex-col items-center justify-center gap-6 lg:flex-row">
            <Link
              href="/get-involved/leadership-training/apply"
              className="flex w-full max-w-[515px] items-center justify-center rounded-2xl border border-[#0066cf] bg-[#0066cf] px-6 py-8 text-center font-sans font-semibold text-white text-xl leading-[28.8px] transition-opacity hover:opacity-90 lg:h-[158px] lg:py-0 lg:text-[28px]"
            >

{t("Apply to Attend")}
</Link>
          </div>
        </div>
        </div>
        </section>

        <div className="mt-[178px]">
          <MissionSchoolCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
