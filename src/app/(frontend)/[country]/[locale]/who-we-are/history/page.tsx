import type { Metadata } from "next";
import SubPageHero from "@/components/SubPageHero";
import HistoryIntro from "@/components/who-we-are/HistoryIntro";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "History | Youth Evangelical Fellowship",
};

export default async function HistoryPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/history");
  const layout = await getLayout("who-we-are/history");
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-history.webp"}
          alt={t("Hands holding an open world map on a forest path")}
        />
        <HistoryIntro heading={header.heading} />
        <RenderBlocks layout={layout} />
      </main>
      <Footer />
    </>
  );
}
