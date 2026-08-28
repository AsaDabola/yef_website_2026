import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GalleryMosaic from "@/components/get-involved/GalleryMosaic";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "International Leadership Retreats | Youth Evangelical Fellowship",
};

export default async function LeadershipRetreatsPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-worship-crowd.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        {/* The frame drops the Get Involved sub-menu here and runs one 1344px
            column down the middle of the page. */}
        <section className="mx-auto max-w-[1392px] px-6 pt-[111px]">
          <Breadcrumb label={t("Leadership Training")} />

          <h1 className="mt-[73px] font-display font-extrabold text-4xl text-black leading-[1.2] tracking-[-0.96px] lg:text-[46px] lg:leading-[60px]">
            
{t("International Leadership Retreats")}
</h1>
          <p className="mt-5 max-w-[849px] font-medium text-xl text-[#4b5565] leading-[30px] lg:text-[27px]">
            
{t("Strengthening Leaders. Building the Mission. Preparing the Next Generation.")}
</p>

          <div className="mt-[84px]">
            <GalleryMosaic
              images={[
                {
                  src: "/images/get-involved/retreat-team-jump.png",
                  alt: "YEF leaders leaping on the lawn outside the retreat house",
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

          {/* The body column stops at 849px and the Mark 10:45 pull-quote sits
              beside it, dropped 81px below the first paragraph. */}
          <div className="mt-[25px] grid grid-cols-1 lg:grid-cols-[849fr_494fr]">
            <div className="space-y-[30px] font-medium text-[#4b5565] text-base leading-[30px] lg:text-[19px]">
              <p>
                
{t("YEF International Leadership Retreats bring together ministers, chapter leaders, missionaries, staff, and emerging leaders from around the world for concentrated times of spiritual renewal, leadership training, fellowship, and mission planning.")}
</p>
              <p>
                
{t("Leadership in YEF begins with faith. Before we can lead others, we must continually allow ourselves to be led by God through His Word. For this reason, the Leadership Retreat is not simply a conference about methods, strategies, or organizational development. It is first a time for leaders to gather before God, examine their faith and mission, strengthen their spiritual foundation, and renew their calling to serve the Gospel.")}
</p>
              <p>
                
{t("The retreat also provides an important opportunity for leaders serving in different nations and regions to meet one another personally. Although each mission field faces different circumstances, YEF leaders share one calling: to reach the younger generation with the Gospel, raise disciples through the Word of God, and establish strong mission communities that can continue carrying the Gospel forward.")}
</p>
              <p>
                
{t("Above all, the retreat seeks to remind every leader that Christian leadership is ultimately service. Jesus taught His disciples that greatness in the Kingdom of God is not found in position or recognition, but in becoming a servant of others.")}
</p>
              <p>
                
{t("Through International Leadership Retreats, YEF seeks to strengthen this foundation and build a worldwide network of leaders who share the same Gospel, the same mission, and the same hope for the next generation.")}
</p>
            </div>

            <p className="mt-12 text-center font-semibold text-2xl text-[#609efa] italic leading-[40px] tracking-[-0.8px] lg:mt-0 lg:pt-[81px] lg:pr-[20px] lg:pl-[56px] lg:text-[33px] lg:leading-[50px]">
              
{t("“For even the Son of Man came not to be served but to serve, and to give his life as a ransom for many.”")}
<br />{t("— Mark 10:45")}
</p>
          </div>

          <div className="mt-[132px] grid grid-cols-1 overflow-hidden rounded-2xl border border-[#dcdfe5] bg-white lg:grid-cols-[672fr_671fr]">
            <div className="relative min-h-[320px] w-full lg:min-h-[640px]">
              <Image
                src="/images/get-involved/leadership-retreat-team.png"
                alt={t("YEF leaders gathered together at an international retreat")}
                fill
                sizes="(min-width: 1024px) 672px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-12 lg:py-0 lg:pr-[108px] lg:pl-12">
              <h2 className="font-display font-semibold text-3xl text-black tracking-[-0.64px] lg:text-[46px] lg:leading-[46px]">
                
{t("Upcoming")}
<br />
                
{t("Leadership Retreats")}
</h2>
              <p className="mt-4 font-medium text-[#4b5565] text-base leading-[30px] lg:text-[18.9px]">
                
{t("Join YEF leaders from around the world for a time of spiritual renewal, training, fellowship, and preparation for the mission ahead.")}
</p>
            </div>
          </div>

          <div className="mt-[122px] flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-[83px]">
            <a
              href="/get-involved/apply"
              className="flex w-full max-w-[515px] items-center justify-center rounded-2xl border border-[#0066cf] bg-[#0066cf] px-6 py-8 text-center font-sans font-semibold text-white text-xl leading-[28.8px] transition-opacity hover:opacity-90 lg:h-[158px] lg:py-0 lg:text-[28px]"
            >
              
{t("View Upcoming")}
<br />
              
{t("Leadership Retreats")}
</a>
            <a
              href="/get-involved/leadership-retreats/apply"
              className="flex w-full max-w-[515px] items-center justify-center rounded-2xl border border-[#b1b1b1] bg-white px-6 py-8 text-center font-sans font-semibold text-[#0066cf] text-xl leading-[28.8px] transition-colors hover:border-[#0066cf] lg:h-[158px] lg:py-0 lg:text-[28px]"
            >

{t("Apply to Attend")}
</a>
          </div>
        </section>

        <div className="mt-[178px]">
          <MissionSchoolCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
