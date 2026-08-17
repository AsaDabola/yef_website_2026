import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

const navLinks = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "News", href: "/news" },
  { label: "Network", href: "/network" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-6 px-6 py-8 lg:px-16">
        <Link href="/" className="relative h-16 w-44 shrink-0 sm:h-20 sm:w-52">
          <Image
            src="/images/icons/logo-yef-white.svg"
            alt="Youth Evangelical Fellowship"
            fill
            sizes="208px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-8">
          <nav className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-lg text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-white transition-opacity hover:opacity-80"
              >
                <Icon className="size-[18px]" />
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 border-b border-white/0 font-medium text-lg text-white transition-opacity hover:opacity-80 md:flex"
          >
            Search
            <SearchIcon className="size-[15px]" />
          </button>

          <Link
            href="/donate"
            className="rounded-2xl border border-white px-7 py-3.5 font-semibold text-lg text-white transition-colors hover:bg-white hover:text-yef-primary"
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
