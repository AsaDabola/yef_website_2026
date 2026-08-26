import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import {
  InstagramIcon,
  LinkArrowIcon,
  PinIcon,
} from "@/components/ui/SocialIcons";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Who we are",
    links: [
      { label: "Welcome", href: "/who-we-are/welcome" },
      { label: "Our Mission", href: "/who-we-are/mission" },
      { label: "Statement of Faith", href: "/who-we-are/statement-of-faith" },
      { label: "History", href: "/who-we-are/history" },
      { label: "Membership", href: "/who-we-are/membership" },
      {
        label: "Staff/Executive Committee",
        href: "/who-we-are/staff-executive-committee",
      },
    ],
  },
  {
    title: "Get involved",
    links: [
      { label: "Bible Studies", href: "/get-involved#bible-studies" },
      { label: "Summer Training", href: "/get-involved#summer-training" },
      { label: "Mission Trip", href: "/get-involved/mission-trip" },
      { label: "Volunteer", href: "/get-involved#volunteering" },
      { label: "Internship", href: "/get-involved#internship" },
      { label: "Discipleship", href: "/get-involved#discipleship" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sharing the Gospel", href: "/sharing-the-gospel" },
      { label: "Reaching the Campus", href: "/reaching-the-campus" },
      { label: "Raising Disciples", href: "/what-is-evangelical" },
      { label: "YEF Mission School", href: "/yef-mission-school" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "News", href: "/news" },
      { label: "Network", href: "/network" },
      { label: "Donate", href: "/donate" },
    ],
  },
];

const socialLinks = [
  { label: "Pinterest", href: "#", Icon: PinIcon },
  { label: "Link", href: "#", Icon: LinkArrowIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="bg-yef-navy">
        <div className="mx-auto max-w-[1800px] px-6 pb-16 pt-16 lg:px-16 lg:pt-20">
          <Link href="/" className="relative block h-[60px] w-[170px]">
            <Image
              src="/images/icons/logo-yef-white-compact.svg"
              alt="Youth Evangelical Fellowship"
              fill
              sizes="170px"
              className="object-contain object-left"
            />
          </Link>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1fr]">
            <div>
              <p className="font-bold text-sm uppercase tracking-[0.7px] text-yef-gray">
                Subscribe for news, updates, and events
              </p>
              <form className="mt-6 flex max-w-xs flex-col items-start gap-3">
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-full border border-white/20 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
                >
                  Sign Up
                </button>
              </form>

              <p className="mt-10 font-bold text-sm uppercase tracking-[0.7px] text-yef-gray">
                Follow us
              </p>
              <div className="mt-4 flex items-center gap-4">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white"
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-bold text-sm uppercase tracking-[0.7px] text-yef-gray">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-medium text-base text-white transition-opacity hover:opacity-80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-yef-footer-strip">
        <p className="mx-auto max-w-[1800px] px-6 py-6 text-center font-normal text-base leading-[1.6] text-yef-gray lg:px-16">
          Copyright © {new Date().getFullYear()} Youth Evangelical Fellowship
          International. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
