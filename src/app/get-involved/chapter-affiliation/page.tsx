import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import ChapterAffiliationForm from "@/components/get-involved/ChapterAffiliationForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Chapter Affiliation | Youth Evangelical Fellowship",
};

export default function ChapterAffiliationPage() {
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
              <Breadcrumb label="Chapter Affiliation" />
              <h1 className="mt-6 font-semibold text-4xl text-black sm:text-5xl">
                Chapter Affiliation
              </h1>
              <p className="mt-4 font-medium text-lg text-[#4b5565]">
                Bring YEF to Your Campus
              </p>
              <p className="mt-6 max-w-2xl text-lg text-black">
                Every YEF chapter is a seedbed&mdash;a witnessing community
                planted on one campus, connected to a movement spanning 40+
                countries. Affiliating your chapter is a three-step process:
                chapter information, leadership contact, and agreement.
              </p>

              <h2 className="mt-12 font-semibold text-2xl text-black">
                Chapter application
              </h2>
              <ChapterAffiliationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
