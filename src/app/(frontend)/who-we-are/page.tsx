import type { Metadata } from "next";
import WhoWeAreHero from "@/components/who-we-are/WhoWeAreHero";
import IntroCards from "@/components/who-we-are/IntroCards";
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
