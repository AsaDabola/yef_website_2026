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
  title: "Welcome",
};

export default async function WelcomePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/welcome");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("who-we-are/welcome", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-welcome.webp"}
          alt={t("A sailing yacht on calm water below green mountains")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("Welcome")} />
              <RenderBlocks layout={layout} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
