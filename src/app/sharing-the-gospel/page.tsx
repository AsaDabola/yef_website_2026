import type { Metadata } from "next";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import TextPhotoBlock from "@/components/get-involved/TextPhotoBlock";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sharing the Gospel | Youth Evangelical Fellowship",
};

export default function SharingTheGospelPage() {
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-crowd.png"
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
          <Breadcrumb label="Why Do We Evangelize?" />

          <h1 className="mt-6 font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
            Sharing the Gospel
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-v2-muted-dark-2 leading-relaxed">
            We join together for the betterment of this world through the
            Word of God, evangelism, and the deep study of the Word and
            constant prayer. It is part of the outworking of the love we see
            on the cross.
          </p>
          <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
            So if Christ has done everything, what do I need to do once I
            accept His truth? The Apostle John writes, &ldquo;Herein is love,
            not that we love God, but that he loved us and sent his Son to
            be the propitiation for our sins.&rdquo; Then he goes on,
            &ldquo;Beloved, if God so loved us we ought to love one another,
            too&rdquo; (1 John 4:10&ndash;11). Notice John&rsquo;s verb. We
            ought; we &lsquo;owe it&rsquo; to love one another. Love is not
            just an abstract concept or feeling, but it is a demand made on
            all God&rsquo;s people as their response to His great love, and
            it is love that overflows in activity for others, as 1
            Corinthians 13 makes clear for all time. Love is demanding.
            Christ did not die for the flim-flam of respectable Christianity.
            Christ died for our sins, died to put them away, so that we
            become loving people.
          </p>

          <div className="mt-12">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/discipleship.png",
                  alt: "YEF students gathered for a discipleship group",
                },
                {
                  src: "/images/get-involved/story-prayer.png",
                  alt: "Team members praying together on outreach",
                },
                {
                  src: "/images/get-involved/volunteering.png",
                  alt: "Volunteers serving together",
                },
              ]}
            />
          </div>

          <div className="mt-16 border-t border-black/10 pt-16">
            <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
              The Love That Compels Us
            </h2>
            <div className="mt-8">
              <TextPhotoBlock
                image="/images/get-involved/story-teacher.png"
                alt="A YEF volunteer teaching students"
                body="We of the human race know a love for attractive people, for beautiful people, for those who love us. Christ's love is for sinners (Romans 5:8), a love which puts away sin and rebukes all our self-centeredness so that love becomes our mainspring. This means, in the first instance, that we love other believers. We see the church, the beloved community, as an integral part of the purpose of God. And in the second instance it means loving those outside. It means being loving people, for we are the followers of Him who died for sinners."
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 rounded-2xl border border-v2-border bg-v2-bg p-8 sm:grid-cols-[1fr_auto] sm:items-center sm:p-12">
            <div>
              <h3 className="font-display font-extrabold text-2xl text-v2-navy sm:text-3xl">
                Walking in the Spirit
              </h3>
              <p className="mt-4 max-w-xl text-v2-muted-dark-2 leading-relaxed">
                The standard set before us is one we cannot reach on our own.
                The indwelling and empowering of the Holy Spirit is an
                integral part of the Christian life. Words like
                &lsquo;sanctification&rsquo; and &lsquo;holiness&rsquo; speak
                of a standard we can never reach for ourselves, and of what
                the Spirit does in the believer &mdash; and in you, as you
                study His Word with us.
              </p>
            </div>
            <a
              href="/get-involved/apply"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
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
