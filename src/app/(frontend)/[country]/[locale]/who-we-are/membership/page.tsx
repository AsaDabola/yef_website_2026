import type { Metadata } from "next";
import { draftMode } from "next/headers";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import MembershipForm from "@/components/who-we-are/MembershipForm";
import MembershipJourney from "@/components/who-we-are/MembershipJourney";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader, getLayout } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Membership",
};

export default async function MembershipPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/membership");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("who-we-are/membership", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-membership.webp"}
          alt={t("Friends running together through a sunlit park")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label={t("Membership")} />
              <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">
                {t(header.heading || "Membership")}
              </h1>
              <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px] uppercase">
                {t("A Global Movement of Purpose-Driven Young Leaders")}
              </p>
              <p className="mt-[38px] max-w-[760px] text-[20px] text-black leading-[27.2px]">
                {t("YEF exists to raise up a generation who follow the passionate life of Jesus Christ and carry that fire into the lives of others. By joining, you become part of a witnessing community on your campus, connected to a movement of students and staff doing kingdom-building work together.")}
              </p>

              <MembershipJourney />

              <RenderBlocks layout={layout} />

              <MembershipForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
