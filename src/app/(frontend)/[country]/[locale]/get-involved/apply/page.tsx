import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ConnectForm from "@/components/get-involved/ConnectForm";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Connect With YEFI | Youth Evangelical Fellowship",
};

export default async function ApplyPage() {
  const t = await getT();
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-crowd.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        {/* The frame insets the sub-menu 80px from the left and opens the form
            column at 482px, then runs the stories trio out to a 42px right
            margin, aligned with the form card's inner edge. */}
        <section className="mx-auto max-w-[1920px] px-6 pt-[115px] lg:pr-[42px] lg:pl-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-[165px]">
            <div className="shrink-0 lg:w-[237px]">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Get Involved")} />
              <div className="mt-[41px] max-w-[922px]">
                <ConnectForm />
              </div>

              <div className="mt-[133px] lg:pl-12">
                <StoriesTrio divider={false} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
