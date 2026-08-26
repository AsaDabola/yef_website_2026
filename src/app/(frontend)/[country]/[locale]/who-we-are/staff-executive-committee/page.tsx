import type { Metadata } from "next";
import Image from "next/image";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";
import { getT } from "@/lib/i18n/server";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Staff/Executive Committee | Youth Evangelical Fellowship",
};

/** The frame lists everyone in one grid, in this order. */
const people = [
  {
    name: "Dr. William Mark Wagner",
    title: "President",
    image: "/images/staff/william_mark_wagner.jpg",
  },
  {
    name: "Danielle White",
    title: "General Secretary",
    image: "/images/staff/Danielle_white.jpg",
  },
  {
    name: "Selemon Trife",
    title: "YEF Africa Representative",
    image: "/images/staff/Selemon_Trife.jpg",
  },
  {
    name: "Victor Ahn",
    title: "YEF Asia Pacific Representative",
    image: "/images/staff/victer_ahn.jpg",
  },
  {
    name: "Deborah Lan",
    title: "YEF China Representative",
    image: "/images/staff/Deborah_Lan.jpg",
  },
  {
    name: "Bridaija Jones",
    title: "YEF HQ Mission Staff",
    image: "/images/staff/Bridaija_Jones.jpg",
  },
  {
    name: "Emmanual Reid",
    title: "YEF HQ Mission Staff",
    image: "/images/staff/Emmanual_Reid.jpg",
  },
  {
    name: "Olivia Lin",
    title: "Director of Chinese Mission",
    image: "/images/staff/olivia-1.jpg",
  },
  {
    name: "Andrea Li",
    title: "YEF Hong Kong",
    image: "/images/staff/Andrea_Li.jpg",
  },
  {
    name: "Ilinca",
    title: "YEF Romania",
    image: "/images/staff/Ilinca.jpg",
  },
];

export default async function StaffExecutiveCommitteePage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();
  return (
    <>
      <main>
        <SubPageHero
          image="/images/who-we-are/banner-staff.jpg"
          alt={t("Sunlit mountain ridges receding into morning haze")}
        />
        {/* The frame insets the sub-menu 92px from the left and opens the
            people grid at 451px. */}
        <section className="mx-auto max-w-[1920px] px-6 pt-[111px] pb-16 lg:px-[92px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-[122px]">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Staff/Executive Committee")} />

              <h1 className="mt-6 font-display font-extrabold text-4xl text-black tracking-[-0.5px] sm:text-[40px]">
                
{t("Staff/Executive Committee")}
</h1>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
                {people.map((person) => (
                  <div key={person.name}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f7f7f7]">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="(min-width: 1024px) 319px, (min-width: 640px) 30vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-4 font-sans font-extrabold text-[16px] text-black leading-[24px]">
                      {t(person.name)}
                    </p>
                    <p className="font-sans text-[16px] text-black/70 italic leading-[24px]">
                      {t(person.title)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
