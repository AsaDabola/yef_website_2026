import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import FeatureCard from "@/components/who-we-are/FeatureCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Mission | Youth Evangelical Fellowship",
};

const beliefs = [
  "The Bible as the ultimate authority. (2 Tim 3:16-17)",
  "The need for a personal relationship with Jesus. (John 3:3)",
  "The belief in Jesus’ death and resurrection as the way to salvation. (Romans 10:9)",
  "A strong commitment to sharing the gospel and spreading Christ’s message. (Romans 1:16)",
];

export default function OurMissionPage() {
  return (
    <>
      <main>
        <SubPageHero
          image="/images/who-we-are/banner-mission.png"
          alt="Aerial view of a forested coastline meeting turquoise water"
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="min-w-0 flex-1 lg:max-w-[1380px]">
              <Breadcrumb label="Our Mission" />

              <p className="mt-8 max-w-[815px] text-[26px] text-black leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]">
                <span className="text-yef-primary">
                  Youth Evangelical Fellowship (YEF){" "}
                </span>
                is dedicated to revealing the Gospel of Jesus Christ in our
                daily lives, transforming our communities, and bringing the
                good news to all people. As creative and committed Christians,
                we work daily to quench the spiritual drought in our cities and
                restore the hearts of many worldwide.
              </p>

              <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[495fr_344fr] lg:justify-between lg:gap-[17.3%]">
                <p className="max-w-[495px] text-[19px] text-black leading-[27.2px]">
                  The word &ldquo;evangelical&rdquo; comes from the Greek term
                  &epsilon;&#8016;&alpha;&gamma;&gamma;&#941;&lambda;&iota;&omicron;&nu;
                  (euangelion), meaning &ldquo;good news&rdquo; or
                  &ldquo;gospel.&rdquo; At its core, it refers to the message
                  of salvation through Jesus Christ, the central message of
                  Christianity. In the early days of the church, this
                  &ldquo;good news&rdquo; was spread through evangelism, the
                  act of sharing Christ&rsquo;s message with others. From the
                  beginning, believers have been called to share this good news
                  with others, fulfilling Jesus&rsquo; command in Matthew
                  28:19-20: &ldquo;Go therefore and make disciples of all
                  nations, baptizing them in the name of the Father and of the
                  Son and of the Holy Spirit, teaching them to observe all that
                  I have commanded you.&rdquo;
                </p>

                <FeatureCard
                  image="/images/who-we-are/card-mission-cross.png"
                  alt="A wooden cross resting on an open Bible"
                  eyebrow="To Know Christ and Make Him Known"
                  title="Our Mission"
                  className="justify-self-center lg:justify-self-end"
                />
              </div>

              <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-[6.5%]">
                <div>
                  <h2 className="max-w-[506px] font-bold text-[26px] text-yef-primary leading-[36px] lg:text-[32.8px] lg:leading-[44.2px]">
                    To Know Christ and Make Him Known
                  </h2>
                  <p className="mt-6 max-w-[482px] text-[20px] text-yef-primary leading-[31px] lg:text-[23.6px] lg:leading-[37.2px]">
                    Now this is eternal life: that they know you, the only true
                    God, and Jesus Christ, whom you have sent. John 17:3 NIV
                  </p>
                  <p className="mt-12 max-w-[551px] font-bold text-[16.6px] text-black leading-[27.2px]">
                    Over the centuries, &ldquo;evangelical&rdquo; came to
                    describe a movement within Christianity that highlights a
                    few key beliefs:
                  </p>
                  <ul className="mt-8 max-w-[551px] space-y-0 text-[16.6px] text-yef-primary leading-[27.2px]">
                    {beliefs.map((belief) => (
                      <li key={belief}>{belief}</li>
                    ))}
                  </ul>
                </div>

                <div className="max-w-[596px] space-y-6 text-[19px] text-black leading-[27.2px]">
                  <p>
                    At Youth Evangelical Fellowship (YEF), this mission is at
                    the heart of everything we do. YEF exists to raise up young
                    leaders who believe in these core principles and live them
                    out in their everyday lives. We believe that young people
                    have a unique and powerful role in spreading the good news,
                    building vibrant communities of faith, and drawing others
                    closer to God.
                  </p>
                  <p>
                    Through Bible study, fellowship, and outreach, YEF is
                    dedicated to equipping young believers to grow in their
                    faith and share it with others. Evangelism isn&rsquo;t just
                    about telling others about Jesus&mdash;
                    <span className="font-semibold">
                      it&rsquo;s about living out the transformative love of
                      Christ in ways that invite others to experience it for
                      themselves!
                    </span>
                  </p>
                  <p>
                    Our mission is to ignite a passion for Christ in the hearts
                    of young people and empower them to be the next generation
                    of leaders who will bring revival and transformation to
                    their communities and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
