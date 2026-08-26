import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Statement of Faith | Youth Evangelical Fellowship",
};

const beliefs = [
  "We believe in the Holy Scriptures as originally given by God, divinely inspired, infallible, entirely trustworthy; and the supreme authority in all matters of faith and conduct.",
  "We believe in One God, eternally existent in three persons, Father, Son, and Holy Spirit.",
  "We believe in Our Lord Jesus Christ, God manifest in the flesh, His virgin birth, His sinless human life, His divine miracles, His vicarious and atoning death, His bodily resurrection, His ascension, His mediatorial work, and His Personal return in power and glory.",
  "We believe in the Salvation of lost and sinful man through the shed blood of the Lord Jesus Christ by faith apart from works, and regeneration by the Holy Spirit.",
  "We believe in The Holy Spirit, by whose indwelling the believer is enabled to live a holy life, to witness and work for the Lord Jesus Christ.",
  "We believe in the Unity of the Spirit of all true believers, the Church, the Body of Christ.",
  "We believe in the Resurrection of both the saved and the lost; they that are saved unto the resurrection of life, they that are lost unto the resurrection of damnation.",
];

export default async function StatementOfFaithPage() {
  const t = await getT();
  return (
    <>
      <main>
        <SubPageHero
          image="/images/who-we-are/banner-statement-of-faith.png"
          alt={t("A seedling growing from soil on an open Bible")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("Statement of Faith")} />
              <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">
                
{t("Statement of Faith")}
</h1>
              <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px]">
                
{t("WE BELIEVE:")}
</p>

              <div className="mt-[96px] max-w-[1126px] space-y-[27.2px] text-[20px] text-black leading-[27.2px]">
                {beliefs.map((belief) => (
                  <p key={belief}>{belief}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
