import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ConnectForm from "@/components/get-involved/ConnectForm";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Apply YEF Mission School | Youth Evangelical Fellowship",
};

export default async function MissionSchoolApplyPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/subpage-hero-bonfire.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        {/* The frame runs the breadcrumb down the form column rather than the
            page gutter, so both share the 922px card width. */}
        <section className="mx-auto max-w-[922px] pt-[116px] pb-[110px]">
          <div className="px-6 lg:px-[9px]">
            <Breadcrumb label={t("Get Involved")} />
          </div>
          <div className="mt-10">
            <ConnectForm variant="mission-school" />
          </div>
        </section>

        <div className="mx-auto max-w-[1391px] px-6">
          <StoriesTrio divider={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
