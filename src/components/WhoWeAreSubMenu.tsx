"use client";

import Link from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";

const links = [
  { label: "Welcome", href: "/who-we-are/welcome" },
  { label: "Our Mission", href: "/who-we-are/mission" },
  { label: "Statement of Faith", href: "/who-we-are/statement-of-faith" },
  { label: "History", href: "/who-we-are/history" },
  { label: "Membership", href: "/who-we-are/membership" },
  {
    label: "Staff/Executive Committee",
    href: "/who-we-are/staff-executive-committee",
  },
];

export default function WhoWeAreSubMenu() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Who We Are section navigation"
      className="font-body w-full max-w-[237px]"
    >
      <p className="font-bold text-[15px] leading-[16.62px] text-yef-primary">
        Who We Are
      </p>
      <ul className="mt-[47px] space-y-[30px]">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`block border-b border-yef-primary pb-[5px] text-xl leading-[20.8px] transition-colors ${
                  active
                    ? "font-medium text-yef-primary"
                    : "text-black hover:text-yef-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
