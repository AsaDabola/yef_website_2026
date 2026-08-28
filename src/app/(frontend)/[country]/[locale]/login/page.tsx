import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Sign In | Youth Evangelical Fellowship",
};

export default async function LoginPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
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

        <section className="mx-auto max-w-3xl px-6 py-16 lg:px-0">
          <Breadcrumb label={t("Sign In")} />
          <h1 className="mt-6 text-center font-display font-extrabold text-3xl text-black">
            {t("YEF Resources")}
          </h1>
          <p className="mt-3 text-center text-[15px] text-[#6b737d]">
            {t("Sign in with your approved YEF member account.")}
          </p>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
