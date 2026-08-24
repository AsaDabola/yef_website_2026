import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderV2 from "@/components/home-v2/HeaderV2";
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
            src="/images/get-involved/banner-sharing-the-gospel.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
          <Breadcrumb label="Why Do We Evangelize?" />

          <h1 className="mt-6 font-display font-extrabold text-4xl text-black tracking-[-0.8px] sm:text-5xl">
            Sharing the Gospel
          </h1>
          <p className="mt-6 max-w-[849px] font-medium text-[19.2px] text-[#4b5565] leading-[30px]">
            We join together for the betterment of this world through the Word
            of God, evangelism, and the deep study of the Word and constant
            prayer. It is part of the outworking of the love we see on the
            cross.
          </p>

          <div className="mt-14">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/gospel-outreach-table.png",
                  alt: "YEF students at an outreach table on campus",
                },
                {
                  src: "/images/get-involved/gospel-campus-conversation.png",
                  alt: "Two students talking on a campus path",
                },
                {
                  src: "/images/get-involved/gallery-campus-chat.png",
                  alt: "Team members talking on a university campus",
                },
              ]}
            />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[849fr_477fr] lg:gap-[17px]">
            <p className="font-medium text-[19px] text-[#4b5565] leading-[30px]">
              So if Christ has done everything, what do I need to do once I
              accept His truth? The Apostle John writes, &ldquo;Herein is
              love, not that we love God (we will never understand love if we
              start from the human end), but that he loved us and sent his Son
              to be the propitiation for our sins.&rdquo; Then he goes on,
              &ldquo;Beloved, if God so loved us we ought to love one another,
              too&rdquo; (1 John 4:10&ndash;11). Notice John&rsquo;s verb. We
              ought; we &lsquo;owe it&rsquo; to love one another. Love is not
              just an abstract concept or feeling, but it is a demand made on
              all God&rsquo;s people as their response to His great love, and
              it is love that overflows in activities for others as 1
              Corinthians 13 makes clear for all time. Love is demanding.
              Christ did not die, as someone has put it, &ldquo;for the
              flim-flam of respectable Christianity&rdquo;. Christ died for
              our sins, died to put them away so that we become loving people.
            </p>
            <p className="self-center text-center font-semibold text-[26px] text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:text-[33px] lg:leading-[50px]">
              Having received God&rsquo;s love, we are called to share that
              love with others through His Word, evangelism, prayer, and
              service.
            </p>
          </div>

          <h2 className="mx-auto mt-24 max-w-[695px] text-center font-semibold text-[28px] text-[#4b5565] leading-[40px] tracking-[-0.8px] lg:text-[38px] lg:leading-[50px]">
            Loving means spreading the truth and love of Christ. If
            we&rsquo;ve found the cure to the ills of this world, we want to
            share it, because we want others to be healed, as well.
          </h2>

          <div className="mt-16">
            <TextPhotoBlock
              card
              image="/images/get-involved/gospel-campus-walk.png"
              alt="Students walking together outside a campus building"
              body="We of the human race know a love for attractive people, for beautiful people, for those who love us. Christ's love is for sinners (Rom. 5:8), a love which puts away sin and rebukes all our self-centeredness so that love becomes our mainspring. This means in the first instance that we love other believers. The evangelical sees the church, the beloved community, as an integral part of the purpose of God. And in the second instance it means loving those outside. It means being loving people, for we are the followers of Him who died for sinners."
            />
          </div>

          <h2 className="mx-auto mt-24 max-w-[695px] text-center font-semibold text-[28px] text-[#4b5565] leading-[40px] tracking-[-0.8px] lg:text-[36px] lg:leading-[50px]">
            It means in evangelism, we bring to sinners the best gift we have.
          </h2>

          <div className="mx-auto mt-12 max-w-[849px] space-y-[30px] font-medium text-[19px] text-[#4b5565] leading-[30px]">
            <p>
              So if Christ has done everything, what do I need to do once I
              accept His truth? The Apostle John writes, &ldquo;Herein is
              love, not that we love God (we will never understand love if we
              start from the human end), but that he loved us and sent his Son
              to be the propitiation for our sins.&rdquo; Then he goes on,
              &ldquo;Beloved, if God so loved us we ought to love one another,
              too&rdquo; (1 John 4:10&ndash;11). Notice John&rsquo;s verb. We
              ought; we &lsquo;owe it&rsquo; to love one another.
            </p>
            <p>
              Love is not just an abstract concept or feeling, but it is a
              demand made on all God&rsquo;s people as their response to His
              great love and it is love that overflows in activities for
              others as 1 Corinthians 13 makes clear for all time. Love is
              demanding. Christ did not die, as someone has put it, &ldquo;for
              the flim-flam of respectable Christianity&rdquo;. Christ died
              for our sins, died to put them away so that we become loving
              people.
            </p>
          </div>

          <div className="mt-16">
            <TextPhotoBlock
              card
              imageSide="left"
              image="/images/get-involved/gospel-hq-group.png"
              alt="The YEF fellowship gathered outside the headquarters sign"
              heading="How Can We Do All Of This?"
              body="The standard set before us is one we cannot reach on our own. The indwelling and empowering of the Holy Spirit is an integral part of the Christian life as the evangelical understands it. Words like 'sanctification' and 'holiness' speak of the need for a standard we can never reach for ourselves and speaks also of what the Spirit does in the believer."
            />
          </div>

          <div className="mt-20 flex justify-center">
            <Link
              href="/get-involved/apply"
              className="flex h-[158px] w-full max-w-[515px] items-center justify-center rounded-[16px] bg-[#0066cf] px-8 text-center font-semibold text-[24px] text-white leading-[28.8px] transition-transform duration-200 hover:scale-[1.02] lg:text-[28px]"
            >
              Apply Bible study
            </Link>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
