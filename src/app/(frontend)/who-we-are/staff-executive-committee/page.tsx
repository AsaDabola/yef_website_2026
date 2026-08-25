import type { Metadata } from "next";
import Image from "next/image";
import SubPageHero from "@/components/SubPageHero";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Staff/Executive Committee | Youth Evangelical Fellowship",
};

const executiveCommittee = [
  {
    name: "Dr. William Mark Wagner",
    title: "President",
    image: "/images/staff/william_mark_wagner.jpg",
    credentials: [
      "Doctor of Philosophy in Missiology",
      "Professor, Bible Seminary Bonn in Germany",
      "Adjunct Professor, Southwestern Baptist Theological Seminary",
      "Adjunct Professor, Biblische Theologische Akademie",
      "Visiting Professor, Golden Gate Baptist Theological Seminary",
    ],
  },
  {
    name: "Danielle White",
    title: "General Secretary",
    image: "/images/staff/Danielle_white.jpg",
    credentials: [],
  },
];

const representatives = [
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

const staff = [
  {
    name: "Emmanuel Reid",
    title: "YEF HQ Mission Staff",
    image: "/images/staff/Emmanual_Reid-1.jpg",
  },
  {
    name: "Olivia Lin",
    title: "Director of Chinese Mission",
    image: "/images/staff/olivia-1.jpg",
  },
];

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-black/10 border-b pb-4 font-semibold text-[25px] text-black">
      {children}
    </h2>
  );
}

function PersonCard({
  name,
  title,
  image,
}: {
  name: string;
  title: string;
  image: string;
}) {
  return (
    <div>
      <div className="relative aspect-[164/178] w-full overflow-hidden bg-yef-gray-light">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 640px) 200px, 45vw"
          className="object-cover"
        />
      </div>
      <p className="mt-5 font-semibold text-[19px] text-black leading-[19px]">
        {name}
      </p>
      <p className="mt-2 font-light text-[15px] text-[#5c5c5c] italic">
        {title}
      </p>
    </div>
  );
}

export default function StaffExecutiveCommitteePage() {
  return (
    <>
      <main>
        <SubPageHero
          image="/images/who-we-are/banner-staff.png"
          alt="Sunlit mountain ridges receding into morning haze"
        />
        <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="shrink-0 lg:w-[237px]">
              <WhoWeAreSubMenu />
            </div>

            <div className="min-w-0 flex-1 lg:max-w-[855px]">
              <Breadcrumb label="Staff/Executive Committee" />

              <div className="mt-16">
                <GroupHeading>Executive Committee</GroupHeading>
                <div className="mt-8 space-y-10">
                  {executiveCommittee.map((member) => (
                    <div
                      key={member.name}
                      className="flex flex-col gap-6 sm:flex-row sm:gap-8"
                    >
                      <div className="relative aspect-[205/223] w-full max-w-[205px] shrink-0 overflow-hidden bg-yef-gray-light">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="205px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[19px] text-black leading-[19px]">
                          {member.name}
                        </p>
                        <p className="mt-3 font-light text-[15px] text-[#5c5c5c] italic">
                          {member.title}
                        </p>
                        {member.credentials.length > 0 && (
                          <ul className="mt-4 pl-5 text-[11px] text-[#0a0a0a] leading-[17.6px]">
                            {member.credentials.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <GroupHeading>Representative</GroupHeading>
                <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
                  {representatives.map((member) => (
                    <PersonCard key={member.name} {...member} />
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <GroupHeading>Staff</GroupHeading>
                <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
                  {staff.map((member) => (
                    <PersonCard key={member.name} {...member} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
