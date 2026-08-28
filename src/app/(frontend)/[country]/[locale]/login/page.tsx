import type { Metadata } from "next";
import Image from "next/image";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import LoginForm from "@/components/auth/LoginForm";
import CategoryIcon from "@/components/resources/CategoryIcon";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import type { Resource } from "@/payload-types";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

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
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-resources.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1392px] px-6 py-16">
          <Breadcrumb label={t("Sign In")} />

          <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_420px]">
            <div>
              <h1 className="font-display font-extrabold text-4xl text-black tracking-[-0.8px]">
                {t("YEF Resources")}
              </h1>
              <p className="mt-4 max-w-[560px] text-[16px] text-[#6b737d] leading-[26px]">
                {t(
                  "Policy, training, forms, worship, and recorded messages in one place — YEF's spiritual library for students, leaders, staff, and ministers. Sign in with your approved YEF member account to get access.",
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

            <div className="rounded-2xl border border-v2-border bg-white p-8 sm:p-10 lg:self-start">
              <h2 className="font-display font-bold text-xl text-black">
                {t("Sign In")}
              </h2>
              <p className="mt-2 text-[14px] text-[#6b737d]">
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
