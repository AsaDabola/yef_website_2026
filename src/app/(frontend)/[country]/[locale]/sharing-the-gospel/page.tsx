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
  title: "Sharing the Gospel",
};

export default async function SharingTheGospelPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("sharing-the-gospel");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("sharing-the-gospel", draft);
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src={header.image || "/images/get-involved/banner-sharing-the-gospel.png"}
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
          <Breadcrumb label={t("Why Do We Evangelize?")} />

          <h1 className="mt-6 font-display font-extrabold text-4xl text-black tracking-[-0.8px] sm:text-5xl">

{t(header.heading || "Sharing the Gospel")}
</h1>
          <p className="mt-6 max-w-[849px] font-medium text-[19.2px] text-[#4b5565] leading-[30px]">

{t(header.intro || "We join together for the betterment of this world through the Word of God, evangelism, and the deep study of the Word and constant prayer. It is part of the outworking of the love we see on the cross.")}
</p>
        </section>

        <RenderBlocks layout={layout} />
      </main>
      <Footer />
    </>
  );
}
