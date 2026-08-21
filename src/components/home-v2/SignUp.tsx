import Reveal from "@/components/ui/Reveal";

export default function SignUp() {
  return (
    <section className="bg-gradient-to-br from-v2-navy via-v2-blue to-v2-navy">
      <div className="mx-auto max-w-[1920px] px-6 py-24 text-center sm:px-10 lg:px-19">
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

          <form className="mx-auto mt-10 flex max-w-lg items-center rounded-full border border-white/25 bg-white/10 p-1.5 pl-6">
            <label className="sr-only" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-white px-7 py-3.5 font-semibold text-xs text-v2-navy tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
            >
              Sign Up
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
