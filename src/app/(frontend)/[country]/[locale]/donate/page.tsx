import type { Metadata } from "next";
import { draftMode } from "next/headers";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import DonationForm from "@/components/donate/DonationForm";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getLayout, getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Donate",
};

export default async function DonatePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("donate");
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("donate", draft);
  return (
    <>
      <main>
        <SubPageHero
          image={header.image || "/images/shared/banner-donate.png"}
          alt={t(header.imageAlt || "Turquoise surf breaking on a sunlit beach")}
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <Breadcrumb label={t("Donate")} />
          <h1 className="mt-10 text-center font-display font-extrabold text-4xl text-black leading-[1.15] tracking-[-0.96px] sm:text-5xl lg:text-[46px] lg:leading-[60px]">

{t(header.heading || "Donate")}
</h1>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-v2-muted-dark-2 leading-relaxed">

{t(header.intro || "Throughout Christian history, young people have played an important role in seasons of mission, renewal, and spiritual awakening. Again and again, God has called young men and women who were willing to dedicate the strength, passion, and years of their youth to His Kingdom.")}
</p>

          <div className="mt-16">
            <RenderBlocks layout={layout} />
          </div>

          <div className="mt-16">
            <DonationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
