import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";

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

export default function StatementOfFaithPage() {
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
              <Breadcrumb label="Statement of Faith" />
              <h1 className="mt-6 font-semibold text-4xl text-black sm:text-5xl">
                Statement of Faith
              </h1>
              <p className="mt-4 font-medium text-lg text-[#4b5565]">
                WE BELIEVE:
              </p>

              <div className="mt-10 max-w-3xl space-y-6 text-xl text-black">
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
