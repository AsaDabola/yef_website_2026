import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import { getT } from "@/lib/i18n/server";

type HistoryIntroProps = {
  /** Main heading. Defaults to "History". */
  heading?: string;
};

/**
 * The History page's top banner text — breadcrumb, heading, and eyebrow —
 * kept static and paired with the sub-menu exactly like the other Who We
 * Are subpages. The photo mosaic and body copy below it are now editable
 * `genericGallery`/`genericText`/`genericQuote`/`genericTimeline` blocks,
 * rendered by the page itself.
 */
export default async function HistoryIntro({ heading }: HistoryIntroProps = {}) {
  const t = await getT();
  return (
    <section className="mx-auto max-w-[1800px] px-6 pt-16 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="shrink-0 lg:w-[237px]">
          <WhoWeAreSubMenu />
        </div>

        <div className="flex-1">
          <Breadcrumb label={t("History")} />
          <h1 className="mt-[46px] font-display font-extrabold text-4xl text-black leading-[1.1] tracking-[-0.96px] sm:text-5xl lg:text-[54px] lg:leading-[60px]">
            {t(heading || "History")}
          </h1>
          <p className="mt-[18px] font-medium text-[18.9px] text-[#4b5565] leading-[30px]">
            {t("Our Story So Far")}
          </p>
        </div>
      </div>
    </section>
  );
}
