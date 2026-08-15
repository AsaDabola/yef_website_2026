import Link from "next/link";

const links = [
  { label: "Find a Fellowship", href: "/get-involved" },
  { label: "Become a Volunteer", href: "/get-involved#volunteer" },
  { label: "Become a Missionary", href: "/get-involved#missionary" },
  { label: "Start a Campus Chapter", href: "/get-involved#campus-chapter" },
];

export default function QuickLinks() {
  return (
    <section className="bg-yef-primary">
      <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-x-12 gap-y-4 px-6 py-8 lg:px-16">
        <h2 className="font-medium text-3xl uppercase tracking-[-0.72px] text-white sm:text-4xl">
          Quick Links
        </h2>
        <nav className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-normal text-lg text-white transition-opacity hover:opacity-80 sm:text-xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
