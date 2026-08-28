import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import HoverGroup from "@/components/ui/HoverGroup";
import { getT } from "@/lib/i18n/server";

const stories = [
  {
    title: "Sharing the Gospel",
    body: "Through evangelism, we hope to help people encounter God's love, discover the truth of His Word, and begin a life of faith and discipleship.",
    image: "/images/get-involved/trio-sharing-the-gospel.webp",
    alt: "YEF members handing out tracts on a European street",
    href: "/sharing-the-gospel",
  },
  {
    title: "Reaching the Campus",
    body: "The university years shape a person's future. Through campus mission, YEF shares the Gospel, nurtures students in God's Word, and raises disciples who can impact the world.",
    image: "/images/get-involved/trio-reaching-the-campus.webp",
    alt: "A campus fellowship group gathered in a study lounge",
    href: "/reaching-the-campus",
  },
  {
    title: "Raising Disciples",
    body: "Evangelical means being centered on the Gospel of Jesus Christ, the Bible, personal faith, and sharing the Good News with others.",
    image: "/images/get-involved/trio-raising-disciples.webp",
    alt: "Two students swapping contact details outside a campus building",
    href: "/what-is-evangelical",
  },
];

export default async function StoriesTrio({
  divider = true,
}: {
  divider?: boolean;
}) {
  const t = await getT();
  return (
    <section className={`py-16 ${divider ? "border-t border-black/10" : ""}`}>
      <HoverGroup className="grid grid-cols-1 gap-[25px] sm:grid-cols-3">
        {stories.map((story) => (
          <Link key={story.title} href={story.href} className="group block">
            <div className="relative aspect-[431/242] w-full overflow-hidden rounded-2xl">
              <Image
                src={story.image}
                alt={t(story.alt)}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <h3 className="font-semibold text-[22.6px] text-black leading-[30px]">
                {t(story.title)}
              </h3>
              <Image
                src="/images/icons/icon-arrow-up-right.svg"
                alt=""
                width={23}
                height={24}
                aria-hidden="true"
                className="mt-[7px] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
            <p className="mt-4 font-medium text-[15.2px] text-[#4b5565] leading-[24px]">
              {t(story.body)}
            </p>
          </Link>
        ))}
      </HoverGroup>
    </section>
  );
}
