import Image from "next/image";
import Link from "next/link";

export default function MissionSchoolCta() {
  return (
    <section className="bg-gradient-to-b from-yef-primary to-yef-primary-light">
      <div className="mx-auto max-w-[1800px] px-6 py-20 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <h2 className="font-semibold text-4xl text-white sm:text-5xl">
              YEF Mission School
            </h2>
            <Link
              href="/yef-mission-school"
              className="mt-3 inline-flex items-center gap-2 font-semibold text-white transition-opacity hover:opacity-80"
            >
              Learn about the Mission School
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <p className="mt-6 max-w-xl text-lg text-white">
              We strive to equip young believers to know the Gospel, grow as
              disciples, and participate in mission. Through Bible study,
              prayer, evangelism, and practical ministry training,
              participants are prepared to share God&rsquo;s Word, serve
              others, and carry the Gospel to campuses and nations.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative aspect-[332/426] w-[160px] overflow-hidden rounded-2xl bg-[#172254] sm:w-[220px] lg:w-[260px]">
              <Image
                src="https://www.figma.com/api/mcp/asset/0d8bbfac-f92a-495b-9287-27fbe0185bcb.png"
                alt="A student studying the Bible"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[332/426] w-[160px] overflow-hidden rounded-2xl bg-[#172254] sm:w-[220px] lg:w-[260px]">
              <Image
                src="https://www.figma.com/api/mcp/asset/6b37168c-b71b-495e-95ed-208d9dbeef9d.png"
                alt="Graduation caps thrown in the air"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
