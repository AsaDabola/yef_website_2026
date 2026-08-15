import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import WhoWeAreSubMenu from "@/components/WhoWeAreSubMenu";

export default function HistoryIntro() {
  return (
    <section className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="shrink-0 lg:w-[237px]">
          <WhoWeAreSubMenu />
        </div>

        <div className="flex-1">
          <Breadcrumb label="History" />
          <h1 className="mt-6 font-semibold text-4xl text-black sm:text-5xl">
            History
          </h1>
          <p className="mt-4 font-medium text-lg text-[#4b5565]">
            Our Story So Far
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative aspect-[849/637] w-full overflow-hidden rounded-2xl sm:row-span-2">
              <Image
                src="https://www.figma.com/api/mcp/asset/28c9d8fd-3e4b-4555-beee-43b1ea8bb3b7.png"
                alt="Youth Evangelical Fellowship headquarters building"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[477/311] w-full overflow-hidden rounded-2xl">
              <Image
                src="https://www.figma.com/api/mcp/asset/f3112a13-921a-4670-b9d5-d9b91b23e0b0.png"
                alt="YEF international staff gathered together"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[477/311] w-full overflow-hidden rounded-2xl">
              <Image
                src="https://www.figma.com/api/mcp/asset/0d770b70-2756-4a98-b7d0-d6e22f62a712.png"
                alt="Students on a campus mission trip"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="mt-16 max-w-3xl font-semibold text-3xl text-black sm:text-4xl">
            From a Small Campus Mission to a Global Youth Fellowship
          </h2>

          <div className="mt-8 max-w-3xl space-y-6 text-lg text-black">
            <p>
              Youth Evangelical Fellowship (YEF) traces its roots to 2002,
              when Apostolos Campus Ministry (ACM) was founded by Dr. David
              Jang together with students from Olivet Theological College and
              Seminary (OTCS). In 2003, the ministry began developing into
              what would become Youth Evangelical Fellowship, carrying a
              growing vision to reach university students through the Word
              of God, discipleship, and evangelism.
            </p>
            <p>
              A significant new chapter began in New York City in 2009, when
              YEF was inaugurated with students from Columbia University who
              were moved by the Holy Spirit to gather for small-group Bible
              studies and share the gospel of Jesus Christ with their fellow
              students. From these early gatherings, YEF developed with a
              clear focus: to reach university students who are thirsty for
              the Word of God, help them grow as disciples of Jesus Christ,
              and raise a young generation willing to participate in
              God&rsquo;s mission.
            </p>
            <p>
              By the grace of God, the ministry continued expanding
              internationally. By 2015, YEF&rsquo;s mission had reached more
              than 40 countries across North America, South America, Europe,
              Africa, Asia Pacific, Southeast Asia, and South Asia. The
              growth of YEF reflects Jesus&rsquo; description of the Kingdom
              of God:
            </p>
            <blockquote className="border-l-4 border-yef-primary pl-6 text-xl italic text-yef-navy">
              &ldquo;It is like a mustard seed, which, when sown upon the
              soil, though it is smaller than all the seeds that are upon the
              soil, yet when it is sown, it grows up and becomes larger than
              all the garden plants and forms large branches; so that the
              birds of the air can nest under its shade.&rdquo; &mdash; Mark
              4:31&ndash;32
            </blockquote>
            <p>
              YEF&rsquo;s commission is to raise a young generation who love
              the Cross of Jesus Christ, boldly proclaim His sacrifice and
              the power of His salvation, and dream together for the Kingdom
              of God. YEF firmly believes in international growth and in
              equipping young people from diverse backgrounds to devote
              themselves to Jesus Christ and His Great Commission. Through
              biblical teaching, discipleship, evangelism, leadership
              development, retreats, mission conferences, and local
              fellowship life, YEF seeks to help young believers passionately
              embody Kingdom-centered lifestyles. Youth Evangelical
              Fellowship is a member of the World Olivet Assembly and an
              associate member of the World Evangelical Alliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
