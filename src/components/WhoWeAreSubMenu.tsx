"use client";

import Link from "next/link";
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
    <nav aria-label="Who We Are section navigation" className="w-full max-w-[237px]">
      <p className="font-bold text-sm text-yef-primary">Who We Are</p>
      <ul className="mt-4">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`block border-b py-3 text-lg transition-colors ${
                  active
                    ? "border-yef-primary font-medium text-yef-primary"
                    : "border-black/10 text-black hover:border-yef-primary hover:text-yef-primary"
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
