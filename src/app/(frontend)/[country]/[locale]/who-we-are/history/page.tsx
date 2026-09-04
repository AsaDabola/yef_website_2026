import type { Metadata } from "next";
import { draftMode } from "next/headers";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader, getLayout } from "@/lib/pages";

export const metadata: Metadata = {
  title: "History",
};

export default async function HistoryPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/history");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("who-we-are/history", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-history.webp"}
          alt={t("Hands holding an open world map on a forest path")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("History")} />
              <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">
                {t(header.heading || "History")}
              </h1>
              <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px]">
                {t("Our Story So Far")}
              </p>

              <div className="mt-10">
                <RenderBlocks layout={layout} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
