import type { Metadata } from "next";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import TextPhotoBlock from "@/components/get-involved/TextPhotoBlock";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reaching the Campus | Youth Evangelical Fellowship",
};

export default function ReachingTheCampusPage() {
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/subpage-hero-bonfire.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label="Why Campus Mission?" />

          <h1 className="mt-6 font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
            Reaching the Campus
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:items-center sm:gap-16">
            <div className="relative aspect-[1064/603] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/get-involved/campus-library-group.png"
                alt="Students gathered on a university campus"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <p className="text-lg text-v2-muted-dark-2 leading-relaxed">
              University campuses gather a generation still forming its
              convictions, its callings, and its future. YEF believes this
              season of life is not simply preparation for serving God
              someday &mdash; it is a mission field in its own right, and one
              of the most strategic places in the world to reach.
            </p>
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <TextPhotoBlock
              imageSide="left"
              image="/images/get-involved/photo-embrace-1.png"
              alt="A missionary embracing a child on outreach"
              body="Hudson Taylor, who would become one of the most influential missionaries to China and the founder of the China Inland Mission, was only 21 years old when he first sailed for China. His willingness to answer God's call as a young man eventually contributed to a missionary movement that reached far beyond his own lifetime."
            />
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <TextPhotoBlock
              image="/images/get-involved/photo-embrace-2.png"
              alt="A missionary embracing a child on outreach"
              body="John Calvin was also still a young man when he published the first edition of his influential Institutes of the Christian Religion at the age of 26. The work would continue to develop throughout his life and profoundly influence generations of Christian theology, ministry, and church leadership."
            />
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              An Investment in the Future of World Mission
            </h2>
            <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              This pattern reminds us that youth is not simply a period of
              preparation for serving God someday. Young people can be used
              by God now. When young believers encounter the gospel deeply,
              surrender their lives to Christ, and receive a vision for
              God&rsquo;s Kingdom, their lives can influence campuses,
              churches, cities, and even nations. This is one reason campus
              mission matters so deeply to YEF.
            </p>
            <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              Universities gather together a generation that still has much
              of its life ahead of it. If students can encounter Christ
              during these formative years and learn to dedicate their
              gifts, education, ambitions, and future to God, their
              influence for the gospel can continue for decades. YEF
              therefore believes that reaching university students is also
              an investment in the future of world mission. We desire to see
              a new generation arise &mdash; not simply as attendees of
              Christian gatherings, but as disciples, evangelists, Bible
              teachers, leaders, and missionaries who are willing to say:
              &ldquo;Here am I. Send me.&rdquo;
            </p>
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="/get-involved/apply"
              className="inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
            >
              Apply Bible Study
            </a>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
