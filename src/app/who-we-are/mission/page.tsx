import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
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
        <SubPageHero />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Our Mission" />
              <p className="mt-6 max-w-2xl text-lg text-[#4b5565]">
                Youth Evangelical Fellowship (YEF) is dedicated to revealing
                the Gospel of Jesus Christ in our daily lives, transforming
                our communities, and bringing the good news to all people. As
                creative and committed Christians, we work daily to quench
                the spiritual drought in our cities and restore the hearts of
                many worldwide.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
                <div className="space-y-6 text-lg text-black">
                  <p>
                    The word &ldquo;evangelical&rdquo; comes from the Greek
                    term &epsilon;&upsilon;&alpha;&gamma;&gamma;&#941;&lambda;&iota;&omicron;&nu;
                    (euangelion), meaning &ldquo;good news&rdquo; or
                    &ldquo;gospel.&rdquo; At its core, it refers to the
                    message of salvation through Jesus Christ, the central
                    message of Christianity. In the early days of the church,
                    this &ldquo;good news&rdquo; was spread through
                    evangelism, the act of sharing Christ&rsquo;s message
                    with others. From the beginning, believers have been
                    called to share this good news with others, fulfilling
                    Jesus&rsquo; command in Matthew 28:19-20: &ldquo;Go
                    therefore and make disciples of all nations, baptizing
                    them in the name of the Father and of the Son and of the
                    Holy Spirit, teaching them to observe all that I have
                    commanded you.&rdquo;
                  </p>
                  <p>
                    Over the centuries, &ldquo;evangelical&rdquo; came to
                    describe a movement within Christianity that highlights a
                    few key beliefs:
                  </p>
                  <ul className="list-disc space-y-2 pl-6 text-[#4b5565]">
                    {beliefs.map((belief) => (
                      <li key={belief}>{belief}</li>
                    ))}
                  </ul>
                  <p>
                    At Youth Evangelical Fellowship (YEF), this mission is at
                    the heart of everything we do. YEF exists to raise up
                    young leaders who believe in these core principles and
                    live them out in their everyday lives. We believe that
                    young people have a unique and powerful role in spreading
                    the good news, building vibrant communities of faith, and
                    drawing others closer to God. Through Bible study,
                    fellowship, and outreach, YEF is dedicated to equipping
                    young believers to grow in their faith and share it with
                    others. Evangelism isn&rsquo;t just about telling others
                    about Jesus&mdash;it&rsquo;s about living out the
                    transformative love of Christ in ways that invite others
                    to experience it for themselves!
                  </p>
                  <p>
                    Our mission is to ignite a passion for Christ in the
                    hearts of young people and empower them to be the next
                    generation of leaders who will bring revival and
                    transformation to their communities and beyond.
                  </p>
                </div>

                <aside className="h-fit rounded-2xl bg-v2-bg p-8">
                  <p className="font-display font-extrabold text-2xl text-v2-navy leading-tight">
                    To Know Christ and Make Him Known
                  </p>
                  <blockquote className="mt-8 border-l-4 border-v2-blue pl-5 text-lg italic text-v2-navy">
                    &ldquo;Now this is eternal life: that they know you, the
                    only true God, and Jesus Christ, whom you have
                    sent.&rdquo;
                  </blockquote>
                  <p className="mt-3 font-semibold text-sm text-v2-muted">
                    John 17:3 NIV
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
