import Image from "next/image";
import HoverGroup from "@/components/ui/HoverGroup";

const stories = [
  {
    title: "Why Do We Evangelize?",
    body: "Explore hope-filled stories of how God is working through students on campuses around the world.",
    image: "/images/get-involved/story-prayer.png",
    href: "/sharing-the-gospel",
  },
  {
    title: "Why Campus Mission?",
    body: "Every gift and hour given helps a new fellowship take root. See how we steward what's entrusted to us.",
    image: "/images/get-involved/story-teacher.png",
    href: "/reaching-the-campus",
  },
  {
    title: "What is Evangelical?",
    body: "Grounded in the Gospel, the Bible, and personal faith — see what shapes everything we do.",
    image: "/images/get-involved/story-silhouette.png",
    href: "/who-we-are/mission",
  },
];

export default function StoriesTrio() {
  return (
    <section className="border-t border-black/10 py-16">
      <HoverGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {stories.map((story) => (
          <a key={story.title} href={story.href} className="group block">
            <div className="relative aspect-[431/242] w-full overflow-hidden rounded-2xl">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <h3 className="font-semibold text-2xl text-v2-navy">
                {story.title}
              </h3>
              <span
                aria-hidden="true"
                className="mt-1 text-2xl text-v2-navy transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                &#8599;
              </span>
            </div>
            <p className="mt-4 text-v2-muted-dark-2">{story.body}</p>
          </a>
        ))}
      </HoverGroup>
    </section>
  );
}
