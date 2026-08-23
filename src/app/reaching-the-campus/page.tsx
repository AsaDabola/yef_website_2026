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

          <h1 className="mt-6 text-center font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
            Reaching the Campus
          </h1>
          <p className="mt-4 text-center font-medium text-lg text-yef-primary italic">
            God Has Often Worked Through the Young
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-v2-muted-dark-2 leading-relaxed">
            Throughout Christian history, young people have played an
            important role in seasons of mission, renewal, and spiritual
            awakening. Again and again, God has called young men and women
            who were willing to dedicate the strength, passion, and years of
            their youth to His Kingdom.
          </p>

          <div className="mt-16 border-t border-black/10 pt-16">
            <TextPhotoBlock
              image="/images/get-involved/hudson-taylor-group.png"
              alt="A group of students gathered together"
              body={
                <>
                  <span className="font-bold">Hudson Taylor</span>, who would
                  become one of the most influential missionaries to China
                  and the founder of the China Inland Mission, was only 21
                  years old when he first sailed for China. His willingness
                  to answer God&rsquo;s call as a young man eventually
                  contributed to a missionary movement that reached far
                  beyond his own lifetime.
                </>
              }
            />
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <TextPhotoBlock
              imageSide="left"
              image="/images/get-involved/calvin-conversation.png"
              alt="Two students in conversation"
              body={
                <>
                  <span className="font-bold">John Calvin</span> was also
                  still a young man when he published the first edition of
                  his influential <em>Institutes of the Christian Religion</em>{" "}
                  at the age of 26. The work would continue to develop
                  throughout his life and profoundly influence generations
                  of Christian theology, ministry, and church leadership.
                </>
              }
            />
          </div>

          <p className="mx-auto mt-16 max-w-3xl text-center font-semibold text-2xl text-v2-navy leading-relaxed">
            Many of those who first followed Jesus were also young people
            who left behind their ordinary lives to become His disciples.
            Jesus taught them, corrected them, walked with them, and
            eventually entrusted them with the responsibility of carrying
            the gospel into the world.
          </p>

          <div className="mt-16 border-t border-black/10 pt-16">
            <p className="max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              This pattern reminds us that youth is not simply a period of
              preparation for serving God someday. Young people can be used
              by God now.
            </p>
            <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              When young believers encounter the gospel deeply, surrender
              their lives to Christ, and receive a vision for God&rsquo;s
              Kingdom, their lives can influence campuses, churches, cities,
              and even nations.
            </p>
            <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              This is one reason campus mission matters so deeply to YEF.
              Universities gather together a generation that still has much
              of its life ahead of it. If students can encounter Christ
              during these formative years and learn to dedicate their
              gifts, education, ambitions, and future to God, their
              influence for the gospel can continue for decades.
            </p>
            <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
              YEF therefore believes that reaching university students is
              also an investment in the future of world mission. We desire
              to see a new generation arise &mdash; not simply as attendees
              of Christian gatherings, but as disciples, evangelists, Bible
              teachers, leaders, and missionaries who are willing to say:
            </p>
          </div>

          <div className="mt-16 border-t border-black/10 pt-16 text-center">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              Interested in Learning More? Here&rsquo;s How:
            </h2>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/get-involved/apply"
              className="inline-flex items-center justify-center rounded-2xl bg-[#0066cf] px-10 py-5 font-semibold text-lg text-white transition-transform duration-200 hover:scale-105 hover:opacity-90"
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
