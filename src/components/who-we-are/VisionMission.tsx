import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Reach the Next Generation",
    body: "Share the Gospel with university students and young people, helping them encounter Jesus Christ and build their lives upon God's Word.",
  },
  {
    title: "Raise Disciples and Leaders",
    body: "Nurture young believers through Bible study, fellowship, and spiritual training, equipping them to become faithful disciples who can lead and serve others.",
  },
  {
    title: "Advance the Gospel to the Nations",
    body: "Establish and strengthen campus fellowships around the world, raising missionaries and sending the next generation to participate in the Great Commission.",
  },
];

export default function VisionMission() {
  return (
    <section className="bg-[#f1f6ff]">
      <div className="mx-auto max-w-[1800px] px-6 py-20 lg:px-16">
        <h2 className="font-semibold text-4xl text-black sm:text-5xl">
          Our Vision &amp; Mission
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#4b5565]">
          Youth Evangelical Fellowship (YEF) is dedicated to revealing the
          Gospel of Jesus Christ in our daily lives, transforming our
          communities, and bringing the good news to all people. As creative
          and committed Christians, we work daily to quench the spiritual
          drought in our cities and restore the hearts of many worldwide.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[656/492] w-full overflow-hidden rounded-2xl">
            <Image
              src="https://www.figma.com/api/mcp/asset/0be33399-c624-43f5-8f43-650330cfdc7a.png"
              alt="An open Bible in front of a cross at sunset"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <div className="space-y-8">
              {pillars.map((pillar) => (
                <div key={pillar.title}>
                  <p className="text-lg text-black">
                    <span className="font-semibold">{pillar.title} :</span>{" "}
                    <span className="text-[#4b5565]">{pillar.body}</span>
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/who-we-are"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-[#1d46d8] transition-opacity hover:opacity-80"
            >
              Learn more about how we&rsquo;re different
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
