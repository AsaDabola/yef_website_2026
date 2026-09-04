import type { Metadata } from "next";
import { draftMode } from "next/headers";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import ChapterAffiliationForm from "@/components/get-involved/ChapterAffiliationForm";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Chapter Affiliation",
};

export default async function ChapterAffiliationPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("get-involved/chapter-affiliation");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved/chapter-affiliation", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/get-involved/banner-chapter-affiliation.webp"}
          alt={t("Hands raised and joined together against green foliage")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("Chapter Affiliation")} />
              <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">

{t(header.heading || "Chapter Affiliation")}
</h1>

              <RenderBlocks layout={layout} />

              <h2 className="mt-11 font-display font-extrabold text-[30px] text-black tracking-[-0.5px]">

{t("Chapter application")}
</h2>
              <ChapterAffiliationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
