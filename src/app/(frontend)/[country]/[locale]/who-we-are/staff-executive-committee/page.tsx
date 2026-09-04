import type { Metadata } from "next";
import { draftMode } from "next/headers";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader, getLayout } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Staff/Executive Committee",
};

export default async function StaffExecutiveCommitteePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("who-we-are/staff-executive-committee");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("who-we-are/staff-executive-committee", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/who-we-are/banner-staff.webp"}
          alt={t("Sunlit mountain ridges receding into morning haze")}
        />
        {/* The frame insets the sub-menu 92px from the left and opens the
            people grid at 451px. */}
        <section className="mx-auto max-w-[1920px] px-6 pt-[111px] pb-16 lg:px-[92px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-[122px]">
            <div className="shrink-0 lg:sticky lg:top-32 lg:w-[237px] lg:self-start">
              <WhoWeAreSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Staff/Executive Committee")} />

              <h1 className="mt-6 font-display font-extrabold text-4xl text-black tracking-[-0.5px] sm:text-[40px]">

{t(header.heading || "Staff/Executive Committee")}
</h1>

              {/* The staff roster is now the genericPhotoGrid block below —
                  fully editable from the admin. */}
              <div className="mt-12">
                <RenderBlocks layout={layout} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
