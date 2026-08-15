import Image from "next/image";
import Link from "next/link";

const stories = [
  {
    date: "Aug 14 2026",
    title: "YEF Africa Strengthens Chapters and Raises New Members Across the Continent",
    excerpt:
      "YEF Africa continues to look forward with hope as the mission grows and strengthens across the continent.",
    image:
      "https://www.figma.com/api/mcp/asset/f94b0515-a427-47a7-9d43-e54874ea4910.png",
    href: "/news",
  },
  {
    date: "Aug 10 2026",
    title: "YEF Tonga Opens a New Door for Campus Evangelism",
    excerpt:
      "YEF Tonga has begun a new Bible study near the main campus of Tonga National University (TNU), opening an encouraging new opportunity to reach students.",
    image:
      "https://www.figma.com/api/mcp/asset/e6410b92-76b7-4024-930c-db76d75e7f73.png",
    href: "/news",
  },
];

export default function News() {
  return (
    <section className="bg-yef-gray-light">
      <div className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16 lg:py-20">
        <div className="mb-8 flex items-center justify-end">
          <Link
            href="/news"
            className="font-black text-sm uppercase tracking-wide text-black transition-opacity hover:opacity-70"
          >
            See more &rsaquo;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <Link
            href="/news"
            className="group relative flex aspect-[666/519] flex-col justify-end overflow-hidden rounded-xl"
          >
            <Image
              src="https://www.figma.com/api/mcp/asset/76f0927a-56a9-450c-9f9e-94d881f5feed.png"
              alt="YEF International Leaders Gather to Strengthen Global Mission and Prepare for 60-Nation Expansion"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="relative border-l-4 border-yef-primary p-8 text-white">
              <p className="font-black text-2xl leading-snug tracking-tight sm:text-3xl">
                YEF International Leaders Gather to Strengthen Global Mission
                and Prepare for 60-Nation Expansion
              </p>
              <p className="mt-4 font-normal text-xs uppercase tracking-[0.64px]">
                Story | Aug 07 2026
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-8">
            {stories.map((story) => (
              <article
                key={story.title}
                className="grid grid-cols-[1fr_auto] gap-6 border-b border-black/10 pb-8 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="font-normal text-sm uppercase tracking-[0.64px] text-black">
                    News | {story.date}
                  </p>
                  <h3 className="mt-3 font-black text-lg leading-snug text-black">
                    {story.title}
                  </h3>
                  <p className="mt-3 font-normal text-sm text-black/70">
                    {story.excerpt}
                  </p>
                  <Link
                    href={story.href}
                    className="mt-4 inline-flex items-center rounded-lg bg-white px-4 py-2 font-bold text-xs text-yef-primary shadow-sm transition-opacity hover:opacity-80"
                  >
                    Continue Reading &rsaquo;
                  </Link>
                </div>
                <div className="relative size-[110px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    sizes="110px"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
