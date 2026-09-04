import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Bible Studies",
};

export default async function BibleStudiesPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved/bible-studies", draft);
  // StoriesTrio (a dynamic list pulled from the stories collection) sits
  // between the "Where It Leads" panel and the closing CTA in the original
  // design, so the fetched layout is split around it rather than rendered
  // in one call.
  const beforeStories = layout.slice(0, 5);
  const afterStories = layout.slice(5);
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/bible-studies-hero.webp"
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
              <Breadcrumb label={t("Bible Studies")} />

              <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
                {t("Bible Studies")}
              </h1>
              <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
                {t("Open the Word. Ask Anything. Grow for Life.")}
              </p>
            </div>
          </div>
        </section>

        <RenderBlocks layout={beforeStories} />

        <div className="mx-auto max-w-[1391px] px-6">
          <StoriesTrio divider={false} />
        </div>

        <RenderBlocks layout={afterStories} />
      </main>
      <Footer />
    </>
  );
}
