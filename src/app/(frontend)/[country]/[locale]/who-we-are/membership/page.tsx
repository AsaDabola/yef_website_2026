import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import MembershipForm from "@/components/who-we-are/MembershipForm";
import MembershipJourney from "@/components/who-we-are/MembershipJourney";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Membership",
};

export default async function MembershipPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/membership");
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

              <h2 className="mt-16 font-display font-extrabold text-[30px] text-black tracking-[-0.5px]">

{t("What Membership Means")}
</h2>
              <p className="mt-5 max-w-[760px] text-[19px] text-black leading-[27.2px]">

{t("Becoming a YEF member means committing to grow in your walk with Christ alongside a local chapter, while staying connected to YEF’s wider international fellowship. Members affirm the YEF Statement of Faith and sign the Membership Covenant, which lays out what we believe and how we commit to living and serving together.")}
</p>
              <ul className="mt-6 max-w-[760px] space-y-3 text-[17px] text-black leading-[26px]">
                <li>

{t("Bible studies, discipleship, and mentorship within your local chapter")}
</li>
                <li>

{t("A voice in your chapter’s life and leadership")}
</li>
                <li>

{t("Invitations to YEF trainings, retreats, and mission opportunities")}
</li>
                <li>

{t("Connection to a wider fellowship of YEF chapters and members")}
</li>
              </ul>

              <h2 className="mt-16 font-display font-extrabold text-[30px] text-black tracking-[-0.5px]">

{t("Apply to join")}
</h2>
              <p className="mt-5 max-w-[760px] text-[17px] text-[#4b5565] leading-[26px]">

{t("Fill out the application below. As part of joining, you’ll also be asked to review and sign the YEF Membership Covenant.")}
</p>
              <MembershipForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
