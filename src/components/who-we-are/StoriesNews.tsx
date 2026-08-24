import Image from "next/image";
import Link from "next/link";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const stories = [
  {
    title: "Sharing the Gospel",
    body: "Through evangelism, we hope to help people encounter God's love, discover the truth of His Word, and begin a life of faith and discipleship.",
    image: "/images/who-we-are/story-sharing-the-gospel.png",
    href: "/sharing-the-gospel",
  },
  {
    title: "Reaching the Campus",
    body: "The university years shape a person's future. Through campus mission, YEF shares the Gospel, nurtures students in God's Word, and raises disciples who can impact the world.",
    image: "/images/who-we-are/story-reaching-the-campus.png",
    href: "/reaching-the-campus",
  },
  {
    title: "Raising Disciples",
    body: "Evangelical means being centered on the Gospel of Jesus Christ, the Bible, personal faith, and sharing the Good News with others.",
    image: "/images/who-we-are/story-raising-disciples.png",
    href: "/what-is-evangelical",
  },
];

export default function StoriesNews() {
  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-12 lg:py-[154px]">
        <Reveal>
          <HoverGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-[25px] lg:grid-cols-3">
            {stories.map((story) => (
              <Link key={story.title} href={story.href} className="group">
                <div className="relative aspect-[432/243] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-[22.6px] text-black leading-[30px]">
                    {story.title}
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
                  {story.body}
                </p>
              </Link>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
