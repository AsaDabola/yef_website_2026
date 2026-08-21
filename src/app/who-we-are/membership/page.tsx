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
        <SubPageHero />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Membership" />
              <h1 className="mt-6 font-semibold text-4xl text-black sm:text-5xl">
                Membership
              </h1>
              <p className="mt-4 font-medium text-lg text-[#4b5565]">
                A Global Movement of Purpose-Driven Young Leaders
              </p>
              <p className="mt-6 max-w-2xl text-lg text-black">
                YEF exists to raise up a generation who follow the
                passionate life of Jesus Christ and carry that fire into the
                lives of others. By joining, you become part of a witnessing
                community on your campus, connected to a movement of
                students and staff across 40+ countries doing
                kingdom-building work together.
              </p>

              <h2 className="mt-12 font-semibold text-2xl text-black">
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
