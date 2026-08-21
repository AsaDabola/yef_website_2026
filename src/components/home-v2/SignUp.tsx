import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function SignUp() {
  return (
    <section className="relative overflow-hidden bg-v2-navy">
      <Image
        src="/images/home-v2/signup-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="relative mx-auto max-w-[1920px] px-6 py-24 text-center sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/50 tracking-[2.42px] uppercase">
            Stay Up to Date
          </p>
          <h2 className="mt-4 font-display font-bold text-4xl text-white tracking-[-1px] sm:text-5xl">
            News from the campuses.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Field reports, training dates, and stories from students around
            the world.
          </p>

          <form className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-white placeholder:text-white/60 transition-colors focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/50"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-4 font-semibold text-xs text-v2-navy tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
            >
              Sign Up
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
