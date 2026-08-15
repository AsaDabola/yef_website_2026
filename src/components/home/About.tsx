import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-16 lg:py-28">
        <div className="max-w-xl">
          <p className="font-bold text-xl uppercase tracking-[0.4px] text-yef-navy-deep">
            Youth Evangelical Fellowship
          </p>
          <h2 className="mt-4 font-bold text-4xl capitalize leading-tight tracking-[-0.72px] text-yef-primary sm:text-5xl">
            Time to Change your life in christ.
          </h2>
          <p className="mt-6 font-medium text-xl text-yef-navy-deep sm:text-2xl">
            Do you want to have a deep and loving fellowship with Jesus
            Christ? Are you looking for answers to life&rsquo;s problems?
          </p>
          <div className="mt-6 space-y-1 font-normal text-lg text-yef-navy-deep">
            <p>
              If so, YEF invites you to deeper understanding of life and
              self.
            </p>
            <p>
              We are a group of proactive, outreaching Christians, whose
              youth and passion are spent on bringing glory to God&rsquo;s
              name.
            </p>
            <p>
              YEF has been a symbol of revival in urban mission since its
              establishment, working to redeem college campuses for the
              greater cause of Jesus Christ!
            </p>
          </div>
          <Link
            href="/who-we-are"
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-yef-primary px-8 py-4 font-semibold text-lg text-white transition-colors hover:bg-yef-navy"
          >
            Who We Are
          </Link>
        </div>

        <div className="flex gap-4 lg:gap-5">
          <div className="relative aspect-[418/594] w-[220px] overflow-hidden rounded-2xl sm:w-[280px] lg:w-[300px]">
            <Image
              src="https://www.figma.com/api/mcp/asset/ec3b7cc5-48cf-4f1d-90d5-1d22c6f339c4.png"
              alt="Youth Evangelical Fellowship college students"
              fill
              sizes="(min-width: 1024px) 300px, 220px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-55% to-black/70" />
            <p className="absolute bottom-6 left-5 font-normal text-2xl uppercase leading-tight text-white">
              College
              <br />
              Students
            </p>
          </div>
          <div className="relative aspect-[418/594] w-[220px] overflow-hidden rounded-2xl sm:w-[280px] lg:w-[300px]">
            <Image
              src="https://www.figma.com/api/mcp/asset/78806821-990e-48db-a101-da6047416ff8.png"
              alt="YEF campus fellowship gathering"
              fill
              sizes="(min-width: 1024px) 300px, 220px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-55% to-black/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
