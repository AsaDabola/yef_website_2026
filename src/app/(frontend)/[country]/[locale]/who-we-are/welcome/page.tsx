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
  title: "Welcome | Youth Evangelical Fellowship",
};

export default async function WelcomePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/welcome");
  const layout = await getLayout("who-we-are/welcome");
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-welcome.webp"}
          alt={t("A sailing yacht on calm water below green mountains")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("Welcome")} />
              <p className="mt-6 max-w-2xl font-normal text-3xl text-black sm:text-4xl">
                
{t("YEF is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many around the world.")}
</p>

              <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
                <div className="[&_section]:mx-0! [&_section]:max-w-none! [&_section]:px-0! [&_section]:py-0!">
                  <RenderBlocks layout={layout} />
                </div>

                <FeatureCard
                  image="/images/who-we-are/card-welcome-sunset.png"
                  alt={t("The sun setting over the ocean")}
                  eyebrow={
                    <>
                      
{t("Thy kingdom come, thy will be done on earth as it is in heaven.")}
<span className="block font-normal">{t("Matthew 6:10")}</span>
                    </>
                  }
                  title={t("Welcome")}
                  className="justify-self-center lg:justify-self-end"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
