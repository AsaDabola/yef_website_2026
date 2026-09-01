import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { CountryPicker } from "@/components/i18n/SitePicker";
import { getSiteName } from "@/components/ui/SiteWordmark";
import { getRequestLocale, INTERNATIONAL } from "@/lib/i18n/request";
import { getT } from "@/lib/i18n/server";

const columns: {
  title: string;
  href: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Who we are",
    href: "/who-we-are",
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
    href: "/get-involved",
    links: [
      { label: "Bible Studies", href: "/get-involved/bible-studies" },
      { label: "Summer Training", href: "/get-involved/summer-training" },
      { label: "Campus Evangelism", href: "/get-involved/campus-evangelism" },
      { label: "Short-term Mission", href: "/get-involved/short-term-mission" },
      { label: "Leadership Training", href: "/get-involved/leadership-training" },
      { label: "Volunteer", href: "/get-involved/volunteering" },
      { label: "Internship", href: "/get-involved#internship" },
      { label: "Discipleship", href: "/get-involved/discipleship" },
      { label: "Submit Your Story", href: "/submit-your-story" },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    links: [
      { label: "Sharing the Gospel", href: "/sharing-the-gospel" },
      { label: "Reaching the Campus", href: "/reaching-the-campus" },
      { label: "Raising Disciples", href: "/what-is-evangelical" },
      { label: "YEF Mission School", href: "/yef-mission-school" },
    ],
  },
  {
    title: "Network",
    href: "/network",
    links: [
      { label: "News", href: "/news" },
      { label: "Network", href: "/network" },
      { label: "Donate", href: "/donate" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/youthevangelicalfellowship/",
    Icon: FacebookIcon,
  },
  { label: "X", href: "https://x.com/YEF_Intl", Icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yef_international/",
    Icon: InstagramIcon,
  },
];

export default async function Footer() {
  const t = await getT();
  const { country } = getRequestLocale();
  const isInternational = country === INTERNATIONAL;
  // Headquarters signs off as "International"; a country site signs off with
  // its own name, in the reader's language.
  const siteName = await getSiteName();

  return (
    <footer className="bg-black">
      <div className="bg-yef-navy">
        <div className="mx-auto max-w-[1800px] px-6 pb-16 pt-16 lg:px-16 lg:pt-20">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="relative block h-8 w-[88px] sm:h-[60px] sm:w-42">
                <Image
                  src="/images/icons/logo-yef.svg"
                  alt={t("Youth Evangelical Fellowship")}
                  fill
                  sizes="168px"
                  className="object-contain object-left"
                />
              </Link>

              {isInternational && (
                <p className="mt-6 text-base text-yef-gray">
                  {t("519 S Park Ave. Sanford, FL 32771 USA")}
                </p>
              )}

              <p className="mt-10 font-normal text-sm uppercase tracking-[0.7px] text-yef-gray">
                {t("Subscribe for news, updates, and events")}
              </p>
              <form className="mt-6 flex max-w-xs flex-col items-start gap-3">
                <label className="sr-only" htmlFor="footer-email">
                  {t("Email address")}
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder={t("Email address")}
                  className="w-full rounded-full border border-white/20 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-yef-primary px-8 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-105"
                >
                  {t("Sign Up")}
                </button>
              </form>

              <p className="mt-10 font-normal text-sm uppercase tracking-[0.7px] text-yef-gray">
                {t("Follow us")}
              </p>
              <div className="mt-4 flex items-center gap-4">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(label)}
                    className="flex size-8 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white"
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>

            {columns.map((column) => (
              <div key={column.title}>
                <Link
                  href={column.href}
                  className="font-normal text-sm uppercase tracking-[0.7px] text-yef-gray transition-opacity hover:opacity-80"
                >
                  {t(column.title)}
                </Link>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-normal text-base text-white transition-opacity hover:opacity-80"
                      >
                        {t(link.label)}
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
        {/* The frame centres the copyright across the full strip; the
            pickers are ours, so they sit centred above it. */}
        <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-4 px-6 py-6 lg:px-16">
          <div className="flex items-center gap-2">
            <CountryPicker placement="up" />
          </div>
          <p className="text-center font-body font-medium text-base leading-[1.6] text-yef-gray">
            {t("Copyright ©")} {new Date().getFullYear()}{" "}
            {siteName}. {t("All Rights Reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
