import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import ConnectForm from "@/components/get-involved/ConnectForm";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Connect With YEFI | Youth Evangelical Fellowship",
};

export default function ApplyPage() {
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

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <GetInvolvedSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Get Involved" />
              <div className="mt-6 max-w-3xl">
                <ConnectForm />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
          <StoriesTrio />
        </div>
      </main>
      <Footer />
    </>
  );
}
