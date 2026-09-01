import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default async function ContactPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("contact");
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
          <Breadcrumb label={t("Contact Us")} />
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
