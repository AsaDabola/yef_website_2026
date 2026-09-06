import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import HistoryIntro from "@/components/who-we-are/HistoryIntro";
import HistoryTimeline from "@/components/who-we-are/HistoryTimeline";
import ContinuingMission from "@/components/who-we-are/ContinuingMission";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "History | Youth Evangelical Fellowship",
};

export default async function HistoryPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/history");
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-history.webp"}
          alt={t("Hands holding an open world map on a forest path")}
        />
        <HistoryIntro heading={header.heading} />
        <HistoryTimeline />
        <ContinuingMission />
      </main>
      <Footer />
    </>
  );
}
