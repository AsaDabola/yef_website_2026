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
  title: "Our Mission",
};

export default async function OurMissionPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/mission");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("who-we-are/mission", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/shared/banner-getinvolved.webp"}
          alt={t("Aerial view of a forested coastline meeting turquoise water")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
              <WhoWeAreSubMenu />
            </div>

            <div className="min-w-0 flex-1 lg:max-w-[1380px]">
              <Breadcrumb label={t("Our Mission")} />
              <RenderBlocks layout={layout} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
