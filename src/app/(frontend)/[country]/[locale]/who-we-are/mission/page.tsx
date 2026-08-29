import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import FeatureCard from "@/components/who-we-are/FeatureCard";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Our Mission | Youth Evangelical Fellowship",
};

export default async function OurMissionPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/mission");
  const layout = await getLayout("who-we-are/mission");
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/shared/banner-getinvolved.webp"}
          alt={t("Aerial view of a forested coastline meeting turquoise water")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="min-w-0 flex-1 lg:max-w-[1380px]">
              <Breadcrumb label={t("Our Mission")} />

              <p className="mt-8 max-w-[815px] text-[26px] text-black leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]">
                <span className="text-yef-primary">
                  
{t("Youth Evangelical Fellowship (YEF)")}{" "}
                </span>
                
{t("is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide.")}
</p>

              <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[495fr_344fr] lg:justify-between lg:gap-[17.3%]">
                <div className="[&_section]:mx-0! [&_section]:max-w-none! [&_section]:px-0! [&_section]:py-0!">
                  <RenderBlocks layout={layout.slice(0, 1)} />
                </div>

                <FeatureCard
                  image="/images/who-we-are/card-mission-cross.png"
                  alt={t("A wooden cross resting on an open Bible")}
                  eyebrow={t("To Know Christ and Make Him Known")}
                  title={t("Our Mission")}
                  className="justify-self-center lg:justify-self-end"
                />
              </div>

              <div className="mt-16 [&_section]:mx-0! [&_section]:max-w-none! [&_section]:px-0! [&_section]:py-0!">
                <RenderBlocks layout={layout.slice(1)} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
