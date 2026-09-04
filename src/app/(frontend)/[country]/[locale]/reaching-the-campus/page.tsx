import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Reaching the Campus",
};

export default async function ReachingTheCampusPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("reaching-the-campus");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("reaching-the-campus", draft);
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src={header.image || "/images/get-involved/banner-reaching-the-campus.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pt-16 lg:px-12">
          <Breadcrumb label={t("Why Campus Mission?")} />

          <h1 className="mt-10 text-center font-display font-extrabold text-4xl text-black leading-[1.15] tracking-[-0.96px] sm:text-5xl lg:text-[46px] lg:leading-[60px]">

{t(header.heading || "Reaching the Campus")}
</h1>
        </section>

        <RenderBlocks layout={layout} />
      </main>
      <Footer />
    </>
  );
}
