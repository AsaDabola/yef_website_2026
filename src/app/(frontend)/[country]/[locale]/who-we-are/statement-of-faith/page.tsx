import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Statement of Faith | Youth Evangelical Fellowship",
};

export default async function StatementOfFaithPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/statement-of-faith");
  const layout = await getLayout("who-we-are/statement-of-faith");
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-statement-of-faith.webp"}
          alt={t("Sunrise over layered mountain ridges")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("Statement of Faith")} />
              <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">

{t(header.heading || "Statement of Faith")}
</h1>
              <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px]">
                
{t("WE BELIEVE:")}
</p>

              <div className="mt-[96px] [&_section]:mx-0! [&_section]:max-w-[1126px]! [&_section]:px-0! [&_section]:py-0!">
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
