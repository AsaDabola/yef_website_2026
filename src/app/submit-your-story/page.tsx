import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonySubmission from "@/components/get-involved/TestimonySubmission";
import Testimonials from "@/components/home-v2/Testimonials";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Submit Your Story | Youth Evangelical Fellowship",
};

export default function SubmitYourStoryPage() {
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/submit-story/banner-campfire.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-0">
          <Breadcrumb label="Submit Your Story" />
          <div className="mt-6">
            <TestimonySubmission />
          </div>
        </section>

        <section className="mx-auto max-w-[1800px] px-6 pb-16 lg:px-16">
          <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-2xl border border-v2-border lg:grid-cols-2">
            <div className="flex flex-col justify-center p-10 sm:p-14">
              <p className="text-lg text-v2-navy leading-relaxed">
                <span className="font-semibold">Hudson Taylor</span>, who
                would become one of the most influential missionaries to
                China and the founder of the China Inland Mission, was only
                21 years old when he first sailed for China. His willingness
                to answer God&rsquo;s call as a young man eventually
                contributed to a missionary movement that reached far beyond
                his own lifetime.
              </p>
            </div>
            <div className="relative min-h-[320px] w-full">
              <Image
                src="/images/submit-story/hilltop-sunset.png"
                alt="Three friends standing on a hilltop at sunset"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
