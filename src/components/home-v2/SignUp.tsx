import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function SignUp() {
  return (
    <section className="font-body relative overflow-hidden bg-gradient-to-br from-v2-navy to-v2-blue">
      <Image
        src="/images/home-v2/signup-bg.png"
        alt=""
        width={1964}
        height={833}
        sizes="100vw"
        className="absolute inset-x-0 top-0 h-[833px] w-full max-w-full object-cover opacity-20"
      />
      <div className="relative mx-auto max-w-[1920px] px-6 py-24 text-center sm:px-10 lg:px-19">
        <Reveal>
          <p className="font-semibold text-[11px] text-white/45 tracking-[2.42px] uppercase">
            Stay Up to Date
          </p>
          <h2 className="mt-4 font-display font-bold text-4xl text-[#f2f6fb] tracking-[-1px] sm:text-5xl">
            News from the campuses.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Field reports, training dates, and stories from students around
            the world.
          </p>

          <form className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <label className="sr-only" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email address"
              className="w-full rounded-full border border-white/20 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none sm:w-[340px]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
            >
              Sign Up
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
