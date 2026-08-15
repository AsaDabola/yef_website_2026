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
    image:
      "https://www.figma.com/api/mcp/asset/b75cd778-8ff1-4bfb-9144-fbb792dfc3b5.png",
  },
  {
    name: "Danielle White",
    title: "General Secretary",
    image:
      "https://www.figma.com/api/mcp/asset/768eaf6c-269c-4b7b-bfbc-664045cf0ad4.png",
  },
  {
    name: "Emmanual Reid",
    title: "YEF HQ Mission Staff",
    image:
      "https://www.figma.com/api/mcp/asset/3342d1e9-4efa-456c-b507-f1ef11b3baa4.png",
  },
  {
    name: "Olivia Lin",
    title: "Director of Chinese Mission",
    image:
      "https://www.figma.com/api/mcp/asset/1e95be2e-5bec-4c70-a0e6-090a1897f5b3.png",
  },
  {
    name: "Selemon Trife",
    title: "YEF Africa Representative",
    image:
      "https://www.figma.com/api/mcp/asset/6c40b460-d7a1-4271-aef6-3d3f71365fb7.png",
  },
  {
    name: "Victor Ahn",
    title: "YEF Asia Pacific Representative",
    image:
      "https://www.figma.com/api/mcp/asset/b4529512-621e-484d-b73f-0962b6f89b70.png",
  },
  {
    name: "Deborah Lan",
    title: "YEF China Representative",
    image:
      "https://www.figma.com/api/mcp/asset/155aa1d8-4cdb-4eb8-b03f-8eb59be23046.png",
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
