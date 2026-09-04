import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Breadcrumb from "@/components/Breadcrumb";
import GetInvolvedHero from "@/components/get-involved/GetInvolvedHero";
import GetInvolvedSubMenu from "@/components/get-involved/GetInvolvedSubMenu";
import MissionSchoolCta from "@/components/who-we-are/MissionSchoolCta";
import Footer from "@/components/Footer";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Get Involved",
};

export default async function GetInvolvedPage({
  params,
}: {
  params: LocaleParams;
}) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("get-involved");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("get-involved", draft);
  return (
    <>
      <main>
        <GetInvolvedHero image={header.image} heading={header.heading} />

        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px] lg:sticky lg:top-32 lg:self-start">
              <GetInvolvedSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Get Involved")} />

              <div className="mt-10">
                <RenderBlocks layout={layout} />
              </div>
            </div>
          </div>
        </section>

        <MissionSchoolCta />
      </main>
      <Footer />
    </>
  );
}
