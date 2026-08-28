import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import LoginForm from "@/components/auth/LoginForm";
import CategoryIcon from "@/components/resources/CategoryIcon";
import Footer from "@/components/Footer";
import SiteName from "@/components/ui/SiteName";
import { getT } from "@/lib/i18n/server";
import type { Resource } from "@/payload-types";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Sign In | Youth Evangelical Fellowship",
};

/** Mirrors the category list on /resources, so a visitor knows what's
 *  behind the sign-in before they ever see the resource library itself. */
const categories: {
  key: Resource["category"];
  label: string;
  blurb: string;
}[] = [
  {
    key: "policy",
    label: "Policy",
    blurb: "Governance, guidelines, and how YEF operates.",
  },
  {
    key: "training",
    label: "Training Resources",
    blurb: "Curricula, toolkits, and study materials for every ministry.",
  },
  {
    key: "forms",
    label: "Forms",
    blurb: "Applications, requests, and other paperwork in one place.",
  },
  {
    key: "worship",
    label: "Worship & Order",
    blurb: "Praise sets and order-of-service materials.",
  },
  {
    key: "media",
    label: "Media",
    blurb: "Recorded messages members can listen to or watch online.",
  },
];

export default async function LoginPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("login");
  return (
    <>
      <main>
        <section className="relative flex min-h-[560px] items-center overflow-hidden bg-v2-navy lg:min-h-[50vw]">
          <Image
            src={header.image || "/images/get-involved/banner-resources.webp"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 from-[10%] to-black/20 to-[70%]" />
          <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />

          <HeaderV2 />

          <div className="relative z-10 mx-auto w-full max-w-[1920px] px-6 pt-40 pb-16 sm:px-10 lg:px-[8.33%] lg:pt-[15%] lg:pb-[10%]">
            <h1 className="max-w-[720px] font-display font-extrabold text-6xl leading-[0.98] tracking-[-2.4px] text-white sm:text-7xl xl:text-[88px]">
              {t(header.heading || "YEF Resources")}
            </h1>
            <p className="mt-8 max-w-[620px] font-medium text-lg text-white leading-[30px] xl:text-[19px]">
              {t(
                header.intro || "Policy, training, forms, worship, and recorded messages in one place — YEF's spiritual library for students, leaders, staff, and ministers.",
              )}
            </p>
            <p className="mt-10 max-w-[640px] font-semibold text-2xl text-[#9fc9ff] italic leading-[38px] xl:mt-[52px] xl:text-[29px] xl:leading-[42px]">
              {t(
                "“All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.”",
              )}
              <span className="mt-3 block font-sans font-medium text-base text-white/70 not-italic">
                {t("— 2 Timothy 3:16-17")}
              </span>
            </p>
          </div>

          <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center text-[11px] tracking-[2.2px] text-white uppercase lg:bottom-[5%]">
            <SiteName />
          </p>
        </section>

        <section className="mx-auto max-w-[1392px] px-6 py-16">
          <Breadcrumb label={t("Sign In")} />

          <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="max-w-[560px] text-[16px] text-[#6b737d] leading-[26px]">
                {t(
                  "Sign in with your approved YEF member account to get access.",
                )}
              </p>

              <ul className="mt-10 space-y-6">
                {categories.map(({ key, label, blurb }) => (
                  <li key={key} className="flex items-start gap-4">
                    <div className="flex size-[44px] shrink-0 items-center justify-center rounded-2xl bg-[#f1f6ff] text-yef-primary">
                      <CategoryIcon category={key} className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[15.5px] text-black">
                        {t(label)}
                      </p>
                      <p className="mt-0.5 text-[14px] text-[#6b737d]">
                        {t(blurb)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-yef-primary p-8 sm:p-10 lg:self-start">
              <h2 className="font-display font-bold text-white text-xl">
                {t("Sign In")}
              </h2>
              <p className="mt-2 text-[14px] text-white/75">
                {t("Sign in with your approved YEF member account.")}
              </p>
              <LoginForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
