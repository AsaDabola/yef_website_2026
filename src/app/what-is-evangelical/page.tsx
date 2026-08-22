import type { Metadata } from "next";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import InfoCard from "@/components/get-involved/InfoCard";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What Is Evangelical? | Youth Evangelical Fellowship",
};

export default function WhatIsEvangelicalPage() {
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
          <Breadcrumb label="What Is Evangelical?" />

          <h1 className="mt-6 font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
            What Is Evangelical?
          </h1>

          <div className="mt-10">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/gallery-bible-study-bench.png",
                  alt: "YEF students gathered for a Bible study",
                },
                {
                  src: "/images/get-involved/gallery-street-outreach.png",
                  alt: "Team members sharing the gospel on the street",
                },
                {
                  src: "/images/get-involved/gallery-campus-chat.png",
                  alt: "Team members talking on a university campus",
                },
              ]}
            />
          </div>

          <p className="mt-12 max-w-3xl text-lg text-v2-muted-dark-2 leading-relaxed">
            &ldquo;Evangelical&rdquo; derives from &lsquo;evangel&rsquo;:
            &ldquo;gospel.&rdquo; By definition, an evangelical is someone
            concerned for the Gospel. This means more than just preaching
            the Gospel and reading the Word now and then. Of course, we do
            preach and teach; however, it means much more than just that. It
            means that the Gospel of Christ is central.
          </p>

          <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
            Our highest commandment is to love God, and to love our
            neighbor as we do ourselves. Through life obedience of the Word
            and the power of prayer, we believe that the individual, as well
            as this whole world, will change. We hold to the importance of
            an individual and personal relationship with God that is not
            defined by any political, cultural, or social association, nor
            automatically given by way of nominal membership of any specific
            denomination. We recognize ourselves by our high regard for the
            Bible as the Word of God that guides our daily lives; the
            conviction that salvation is only received by faith through
            Jesus Christ, who died on the cross and was resurrected to life;
            and that God is triune as Father, Son, and Holy Spirit &mdash;
            along with a few other core beliefs found in our Statement of
            Faith.
          </p>
          <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
            Christianity is a historical religion in a way that no other
            religion is. Unless we have access to the facts, we are cut off
            from our roots &mdash; and our access is by way of the
            Scriptures. They are the means God has given us to bring us the
            Gospel, so we have always thankfully received this good gift of
            God and regard it as of the utmost importance that we have a
            Bible on which we can rely. There are other things we hold,
            though we will not give an exhaustive list of our convictions
            here. They all stem from the evangel &mdash; the Good News. The
            whole system of the evangelical is the outworking of the
            Gospel.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-5 border-t border-black/10 pt-16 sm:grid-cols-2">
            <InfoCard
              title="Salvation Is a Gift"
              body="We do not put our trust in human endeavors. Because we are sinners, no matter how good the intent, there is a firm limit on humanity's ability to save itself. But the great, wonderful truth is that Christ died for our sins. What was impossible for us, God in Christ has perfectly accomplished. For that reason we testify to salvation by grace &mdash; it is a gift. Good deeds, religious observance, or anything else cannot save or ultimately change us or this world."
            />
            <InfoCard
              title="A Response Is Required"
              body="Everyone who hears the Gospel must respond and turn to Christ in faith and love, or harden their heart and turn away. To respond to Christ's love is to become a different person &mdash; the whole direction of life is changed. This may happen in one sudden, blinding experience, or it may happen gradually. The time is immaterial; the turning and changing is everything. And this free gift of salvation can be accepted by all people."
            />
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
