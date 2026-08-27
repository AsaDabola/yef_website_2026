import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import HistoryIntro from "@/components/who-we-are/HistoryIntro";
import HistoryTimeline from "@/components/who-we-are/HistoryTimeline";
import ContinuingMission from "@/components/who-we-are/ContinuingMission";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "History | Youth Evangelical Fellowship",
};

export default async function HistoryPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <SubPageHero
          image="/images/who-we-are/banner-history.png"
          alt={t("Hands holding an open world map on a forest path")}
        />
        <HistoryIntro />
        <HistoryTimeline />
        <ContinuingMission />
      </main>
      <Footer />
    </>
  );
}
