import type { Metadata } from "next";
import Image from "next/image";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import DonationForm from "@/components/donate/DonationForm";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";
import { getPageHeader } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Donate",
};

export default async function DonatePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  const header = await getPageHeader("donate");
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

          <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-v2-border lg:grid-cols-2">
            <div className="flex flex-col justify-center p-10 lg:px-16">
              <p className="text-lg text-v2-navy leading-relaxed">
                
{t("You will be enriched in every way so that you can be generous on every occasion, and through us your generosity will result in thanksgiving to God. This service that you perform is not only supplying the needs of the Lord’s people but is also overflowing in many expressions of thanks to God.")}
</p>
              <p className="mt-6 font-semibold text-v2-navy">
                
{t("2 Corinthians 9:11-12")}
</p>
            </div>
            {/* The frame's card is 1343x640, so the photo column carries the
                height rather than collapsing to the text. */}
            <div className="relative min-h-[320px] w-full lg:min-h-[560px]">
              <Image
                src="/images/shared/donate-praying.png"
                alt={t("Two students praying together at a YEF fellowship conference")}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
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
