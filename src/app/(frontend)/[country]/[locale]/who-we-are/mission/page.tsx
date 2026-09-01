import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import FeatureCard from "@/components/who-we-are/FeatureCard";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Our Mission | Youth Evangelical Fellowship",
};

const beliefs = [
  "The Bible as the ultimate authority. (2 Tim 3:16-17)",
  "The need for a personal relationship with Jesus. (John 3:3)",
  "The belief in Jesus’ death and resurrection as the way to salvation. (Romans 10:9)",
  "A strong commitment to sharing the gospel and spreading Christ’s message. (Romans 1:16)",
];

export default async function OurMissionPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/mission");
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

              <p className="mt-8 max-w-[815px] text-[26px] text-black leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]">
                <span className="text-yef-primary">
                  
{t("Youth Evangelical Fellowship (YEF)")}{" "}
                </span>
                
{t("is dedicated to revealing the Gospel of Jesus Christ in our daily lives, transforming our communities, and bringing the good news to all people. As creative and committed Christians, we work daily to quench the spiritual drought in our cities and restore the hearts of many worldwide.")}
</p>

              <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[495fr_344fr] lg:justify-between lg:gap-[17.3%]">
                <p className="max-w-[495px] text-[19px] text-black leading-[27.2px]">
                  
{t("The word “evangelical” comes from the Greek term εὐαγγέλιον (euangelion), meaning “good news” or “gospel.” At its core, it refers to the message of salvation through Jesus Christ, the central message of Christianity. In the early days of the church, this “good news” was spread through evangelism, the act of sharing Christ’s message with others. From the beginning, believers have been called to share this good news with others, fulfilling Jesus’ command in Matthew 28:19-20: “Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.”")}
</p>

                <FeatureCard
                  image="/images/who-we-are/card-mission-cross.png"
                  alt={t("A wooden cross resting on an open Bible")}
                  eyebrow={t("To Know Christ and Make Him Known")}
                  title={t("Our Mission")}
                  className="justify-self-center lg:justify-self-end"
                />
              </div>

              <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-[6.5%]">
                <div>
                  <h2 className="max-w-[506px] font-bold text-[26px] text-yef-primary leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]">
                    
{t("To Know Christ and Make Him Known")}
</h2>
                  <p className="mt-6 max-w-[482px] text-[20px] text-yef-primary leading-[31px] lg:text-[23.6px] lg:leading-[37.2px]">
                    
{t("Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent. John 17:3 NIV")}
</p>
                  <p className="mt-12 max-w-[551px] font-bold text-[16.6px] text-black leading-[27.2px]">
                    
{t("Over the centuries, “evangelical” came to describe a movement within Christianity that highlights a few key beliefs:")}
</p>
                  <ul className="mt-8 max-w-[551px] space-y-0 text-[16.6px] text-yef-primary leading-[27.2px]">
                    {beliefs.map((belief) => (
                      <li key={belief}>{t(belief)}</li>
                    ))}
                  </ul>
                </div>

                <div className="max-w-[596px] space-y-6 text-[19px] text-black leading-[27.2px]">
                  <p>
                    
{t("At Youth Evangelical Fellowship (YEF), this mission is at the heart of everything we do. YEF exists to raise up young leaders who believe in these core principles and live them out in their everyday lives. We believe that young people have a unique and powerful role in spreading the good news, building vibrant communities of faith, and drawing others closer to God.")}
</p>
                  <p>
                    
{t("Through Bible study, fellowship, and outreach, YEF is dedicated to equipping young believers to grow in their faith and share it with others. Evangelism isn’t just about telling others about Jesus—")}
<span className="font-semibold">
                      
{t("it’s about living out the transformative love of Christ in ways that invite others to experience it for themselves!")}
</span>
                  </p>
                  <p>
                    
{t("Our mission is to ignite a passion for Christ in the hearts of young people and empower them to be the next generation of leaders who will bring revival and transformation to their communities and beyond.")}
</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
