import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import AboutIntro from "@/components/who-we-are/AboutIntro";
import VisionMission from "@/components/who-we-are/VisionMission";
import StoriesNews from "@/components/who-we-are/StoriesNews";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Who We Are | Youth Evangelical Fellowship",
};

export default function WhoWeArePage() {
  return (
    <>
      <main>
        <SubPageHero />
        <AboutIntro />
        <VisionMission />
        <StoriesNews />
        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
