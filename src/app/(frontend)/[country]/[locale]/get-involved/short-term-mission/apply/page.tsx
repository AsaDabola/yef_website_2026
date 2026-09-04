import type { Metadata } from "next";
import Image from "next/image";
import { draftMode } from "next/headers";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import MissionApplyForm from "@/components/get-involved/MissionApplyForm";
import StoriesTrio from "@/components/get-involved/StoriesTrio";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Apply for Short-term Mission",
};

export default async function ShortTermMissionApplyPage({
  params,
}: {
  params: LocaleParams;
}) {
  await applyRequestLocale(params);
  const t = await getT();
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved/short-term-mission/apply", draft);
  return (
    <>
      <main>
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/short-term-mission.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-[176px] bg-gradient-to-b from-black/20 via-black/20 via-50% to-transparent" />
          <HeaderV2 />
        </section>

        {/* Same column rhythm as the Connect page: the sub-menu sits 80px in,
            the breadcrumb opens the right-hand column, and the form body is a
            900px card inset a further 40px. */}
        <section className="mx-auto max-w-[1920px] px-6 pt-[115px] lg:pr-[42px] lg:pl-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-[165px]">
            <div className="shrink-0 lg:w-[237px] lg:sticky lg:top-32 lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Short-term Mission")} />

              <div className="mt-[41px] max-w-[900px] lg:ml-10">
                <h1 className="font-display font-extrabold text-3xl text-black leading-[1.2] tracking-[-0.72px] lg:text-[40px] lg:leading-[52px]">
                  {t("Apply for Short-term Mission")}
                </h1>
                <p className="mt-5 max-w-[772px] text-[17px] text-[#4b5565] leading-[1.7]">
                  {t(
                    "Tell us a little about yourself and where you sense God leading you. Every answer helps our missions team walk with you toward the right trip and opportunity.",
                  )}
                </p>
                <MissionApplyForm />
              </div>

              <div className="mt-[133px] lg:pl-12">
                <StoriesTrio divider={false} />
              </div>
            </div>
          </div>
        </section>

        <RenderBlocks layout={layout} />
      </main>
      <Footer />
    </>
  );
}
