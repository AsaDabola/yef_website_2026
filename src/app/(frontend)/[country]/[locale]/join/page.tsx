import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import JoinForm from "@/components/auth/JoinForm";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Request Access | Youth Evangelical Fellowship",
};

export default async function JoinPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("join");
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src={header.image || "/images/get-involved/banner-crowd.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-0">
          <Breadcrumb label={t("Request Access")} />
          <h1 className="mt-6 text-center font-display font-extrabold text-3xl text-black">
            {t(header.heading || "Request YEF Resources Access")}
          </h1>
          <p className="mt-3 text-center text-[15px] text-[#6b737d]">
            {t(
              header.intro || "For students, leaders, staff, and ministers of YEF. A staff member reviews every request.",
            )}
          </p>
          <JoinForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
