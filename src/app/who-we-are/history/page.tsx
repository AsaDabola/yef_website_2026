import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import HistoryIntro from "@/components/who-we-are/HistoryIntro";
import HistoryTimeline from "@/components/who-we-are/HistoryTimeline";
import ContinuingMission from "@/components/who-we-are/ContinuingMission";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "History | Youth Evangelical Fellowship",
};

export default function HistoryPage() {
  return (
    <>
      <main>
        <SubPageHero />
        <HistoryIntro />
        <HistoryTimeline />
        <ContinuingMission />
      </main>
      <Footer />
    </>
  );
}
