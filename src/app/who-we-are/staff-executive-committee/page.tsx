import type { Metadata } from "next";
import Image from "next/image";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Staff/Executive Committee | Youth Evangelical Fellowship",
};

const staff = [
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
    name: "Emmanual Reid",
    title: "YEF HQ Mission Staff",
    image: "/images/staff/Emmanual_Reid-1.jpg",
  },
  {
    name: "Olivia Lin",
    title: "Director of Chinese Mission",
    image: "/images/staff/olivia-1.jpg",
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
];

export default function StaffExecutiveCommitteePage() {
  return (
    <>
      <main>
        <SubPageHero />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="flex-1">
              <Breadcrumb label="Staff/Executive Committee" />
              <h1 className="mt-6 font-semibold text-4xl text-black sm:text-5xl">
                Staff/Executive Committee
              </h1>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
                {staff.map((member) => (
                  <div key={member.name}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-yef-gray-light">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-4 font-extrabold text-black">
                      {member.name}
                    </p>
                    <p className="text-black/70 italic">{member.title}</p>
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
