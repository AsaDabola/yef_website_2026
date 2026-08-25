import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import MembershipForm from "@/components/who-we-are/MembershipForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Membership | Youth Evangelical Fellowship",
};

export default function MembershipPage() {
  return (
    <>
      <main>
        <SubPageHero
          image="/images/who-we-are/banner-membership.png"
          alt="Friends running together through a sunlit park"
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Membership" />
              <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">
                Membership
              </h1>
              <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px] uppercase">
                A Global Movement of Purpose-Driven Young Leaders
              </p>
              <p className="mt-[38px] max-w-[760px] text-[20px] text-black leading-[27.2px]">
                YEF exists to raise up a generation who follow the
                passionate life of Jesus Christ and carry that fire into the
                lives of others. By joining, you become part of a witnessing
                community on your campus, connected to a movement of
                students and staff across 40+ countries doing
                kingdom-building work together.
              </p>

              <h2 className="mt-11 font-display font-extrabold text-[30px] text-black tracking-[-0.5px]">
                Apply to join
              </h2>
              <MembershipForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
