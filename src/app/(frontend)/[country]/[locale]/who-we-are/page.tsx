import type { Metadata } from "next";
import WhoWeAreHero from "@/components/who-we-are/WhoWeAreHero";
import IntroCards from "@/components/who-we-are/IntroCards";
import VisionMission from "@/components/who-we-are/VisionMission";
import StoriesNews from "@/components/who-we-are/StoriesNews";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Who We Are | Youth Evangelical Fellowship",
};

export default async function WhoWeArePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  return (
    <>
      <main>
        <WhoWeAreHero />
        <IntroCards />
        <VisionMission />
        <StoriesNews />
        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
