import Image from "next/image";
import Link from "next/link";
import HoverGroup from "@/components/ui/HoverGroup";
import Reveal from "@/components/ui/Reveal";

const stories = [
  {
    title: "Sharing the Gospel",
    body: "Through evangelism, we hope to help people encounter God's love, discover the truth of His Word, and begin a life of faith and discipleship.",
    image:
      "https://www.figma.com/api/mcp/asset/871bd08d-5798-4c41-97b1-195076236fc7.png",
    href: "/sharing-the-gospel",
  },
  {
    title: "Reaching the Campus",
    body: "The university years shape a person's future. Through campus mission, YEF shares the Gospel, nurtures students in God's Word, and raises disciples who can impact the world.",
    image:
      "https://www.figma.com/api/mcp/asset/efc3559b-711d-48a8-b628-6921819d790c.png",
    href: "/reaching-the-campus",
  },
  {
    title: "Raising Disciples",
    body: "Evangelical means being centered on the Gospel of Jesus Christ, the Bible, personal faith, and sharing the Good News with others.",
    image:
      "https://www.figma.com/api/mcp/asset/29d88f9d-6030-4578-9aee-ba7af6583dfc.png",
    href: "/raising-disciples",
  },
];

export default function StoriesNews() {
  return (
    <section className="font-body bg-white">
      <div className="mx-auto max-w-[1920px] px-6 py-24 sm:px-10 lg:px-19">
        <Reveal>
          <HoverGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="absolute inset-0 bg-v2-accent/0 transition-colors duration-300 group-hover:bg-v2-accent/15" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-2xl text-black">
                    {story.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-2xl text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    &#8599;
                  </span>
                </div>
                <p className="mt-4 text-[#4b5565]">{story.body}</p>
              </Link>
            ))}
          </HoverGroup>
        </Reveal>
      </div>
    </section>
  );
}
