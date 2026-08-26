import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import FeatureCard from "@/components/who-we-are/FeatureCard";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Welcome | Youth Evangelical Fellowship",
};

export default async function WelcomePage() {
  const t = await getT();
  return (
    <>
      <main>
        <SubPageHero />
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
                <div className="space-y-6 text-lg text-black">
                  <p>
                    
{t("Youth Evangelical Fellowship is a group of proactive, outreaching Christians, whose youth and passion are spent on bringing glory to God’s name. We want to see the Great Commission of Jesus fulfilled in each and every major city in the world as he promised in his prayer, “thy kingdom come, thy will be done on earth as it is in heaven.” (Matthew 6:10) YEF has been a symbol of revival in urban mission since its establishment, working to redeem college campuses for the greater cause of Jesus Christ.")}
</p>
                  <p>
                    
{t("You are about to dive into the deep Word of God with our members at your local fellowships and university campuses. I sincerely pray that YEF will strengthen you spiritually and that you will be fully equipped in spirit and truth while you walk on this faith journey. We thank you for your continued prayers for YEF as we work to make meaningful changes in the lives of many.")}
</p>
                  <p>
                    
{t("Welcome to the beginning of an amazing journey with God! We are excited to help you on your journey of faith to grow closer to God!")}
</p>
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
