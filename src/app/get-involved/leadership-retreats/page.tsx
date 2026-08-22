import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "International Leadership Retreats | Youth Evangelical Fellowship",
};

export default function LeadershipRetreatsPage() {
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
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <GetInvolvedSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Leadership Training" />

              <h1 className="mt-6 font-display font-extrabold text-4xl text-v2-navy tracking-[-0.8px] sm:text-5xl">
                International Leadership Retreats
              </h1>
              <p className="mt-4 max-w-2xl font-medium text-lg text-yef-primary">
                Strengthening Leaders. Building the Mission. Preparing the
                Next Generation.
              </p>

              <p className="mt-6 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
                YEF International Leadership Retreats bring together
                ministers, chapter leaders, missionaries, staff, and
                emerging leaders from around the world for concentrated
                times of spiritual renewal, leadership training, fellowship,
                and mission planning.
              </p>
              <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
                Leadership in YEF begins with faith. Before we can lead
                others, we must continually allow ourselves to be led by
                God through His Word. For this reason, the Leadership
                Retreat is not simply a conference about methods,
                strategies, or organizational development. It is first a
                time for leaders to gather before God, examine their faith
                and mission, strengthen their spiritual foundation, and
                renew their calling to serve the Gospel.
              </p>
              <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
                The retreat also provides an important opportunity for
                leaders serving in different nations and regions to meet
                one another personally. Although each mission field faces
                different circumstances, YEF leaders share one calling: to
                reach the younger generation with the Gospel, raise
                disciples through the Word of God, and establish strong
                mission communities that can continue carrying the Gospel
                forward.
              </p>
              <p className="mt-4 max-w-3xl text-v2-muted-dark-2 leading-relaxed">
                Above all, the retreat seeks to remind every leader that
                Christian leadership is ultimately service. Jesus taught
                His disciples that greatness in the Kingdom of God is not
                found in position or recognition, but in becoming a servant
                of others. Through International Leadership Retreats, YEF
                seeks to strengthen this foundation and build a worldwide
                network of leaders who share the same Gospel, the same
                mission, and the same hope for the next generation.
              </p>

              <div className="mt-12">
                <GalleryMosaic
                  images={[
                    {
                      src: "/images/get-involved/gallery-christmas-retreat.png",
                      alt: "Leaders gathered at a YEF Christmas retreat",
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

              <div className="mt-16 grid grid-cols-1 items-center gap-10 rounded-2xl border border-v2-border bg-v2-bg p-8 sm:grid-cols-[1fr_344px] sm:p-12">
                <div>
                  <h2 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
                    Join an Upcoming Retreat
                  </h2>
                  <p className="mt-4 max-w-lg text-v2-muted-dark-2 leading-relaxed">
                    Join YEF leaders from around the world for a time of
                    spiritual renewal, training, fellowship, and preparation
                    for the mission ahead.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="/get-involved/apply"
                      className="inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
                    >
                      View Upcoming Retreats
                    </a>
                    <a
                      href="/get-involved/apply"
                      className="inline-flex items-center justify-center rounded-full border border-v2-border px-8 py-4 font-semibold text-xs text-v2-navy tracking-[1px] uppercase transition-all duration-200 hover:scale-105 hover:border-v2-navy"
                    >
                      Apply to Attend
                    </a>
                  </div>
                </div>
                <div className="relative aspect-[344/300] w-full overflow-hidden rounded-2xl sm:aspect-[344/400]">
                  <Image
                    src="/images/get-involved/photo-embrace-2.png"
                    alt="A missionary embracing a child on outreach"
                    fill
                    sizes="(min-width: 1024px) 25vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
