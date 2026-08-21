import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Who we are", href: "/who-we-are" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Network", href: "/network" },
];

export default function HeaderV2() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-6 sm:px-10 lg:px-19">
        <Link href="/" className="relative h-[45px] w-32 shrink-0 sm:h-[60px] sm:w-42">
          <Image
            src="/images/icons/logo-yef-white-compact.svg"
            alt="Youth Evangelical Fellowship"
            fill
            sizes="168px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 font-medium text-base text-white/90 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/donate"
          className="rounded-full border border-white/50 px-6 py-2.5 font-semibold text-sm text-white tracking-[2.56px] transition-colors hover:bg-white hover:text-v2-navy"
        >
          GIVE
        </Link>
      </div>
    </header>
  );
}
