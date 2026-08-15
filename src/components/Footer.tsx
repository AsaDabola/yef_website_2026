import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
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
      { label: "Bible Studies", href: "/get-involved/bible-studies" },
      { label: "Summer Training", href: "/get-involved/summer-training" },
      { label: "Mission Trip", href: "/get-involved/mission-trips" },
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Internship", href: "/get-involved/internship" },
      { label: "Discipleship", href: "/get-involved/discipleship" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sharing the Gospel", href: "/sharing-the-gospel" },
      { label: "Reaching the Campus", href: "/reaching-the-campus" },
      { label: "Raising Disciples", href: "/raising-disciples" },
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
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="bg-yef-navy">
        <div className="mx-auto max-w-[1800px] px-6 pb-16 pt-16 lg:px-16 lg:pt-20">
          <Link href="/" className="relative block h-16 w-44 sm:h-20 sm:w-52">
            <Image
              src="https://www.figma.com/api/mcp/asset/ec406bff-b775-4d3b-80ec-ea9b249f5800.svg"
              alt="Youth Evangelical Fellowship"
              fill
              sizes="208px"
              className="object-contain object-left"
            />
          </Link>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <p className="font-medium text-sm uppercase tracking-[0.7px] text-yef-gray">
                Subscribe for news, updates, and events
              </p>
              <form className="mt-6 flex max-w-xs flex-col gap-3">
                <label className="sr-only" htmlFor="footer-email">
                  Email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email"
                  className="rounded-[3px] border border-[#cbd6e2] bg-[#f5f8fa] px-3 py-2.5 text-sm text-yef-navy-deep placeholder:text-yef-navy-deep/50"
                />
                <button
                  type="submit"
                  className="w-fit rounded-[3px] bg-yef-primary px-5 py-2.5 font-bold text-xs text-white"
                >
                  Submit
                </button>
              </form>

              <p className="mt-10 font-medium text-sm uppercase tracking-[0.7px] text-yef-gray">
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
                <p className="font-medium text-sm uppercase tracking-[0.7px] text-yef-gray">
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
        <p className="mx-auto max-w-[1800px] px-6 py-6 text-center font-medium text-base text-yef-gray lg:px-16">
          Copyright © {new Date().getFullYear()} Youth Evangelical Fellowship
          International. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
