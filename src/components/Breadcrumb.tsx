import Link from "@/components/ui/LocaleLink";

export default function Breadcrumb({ label }: { label: string }) {
  return (
    <p className="text-sm text-black/65">
      <Link href="/" className="hover:text-black">
        Home
      </Link>{" "}
      <span className="text-yef-primary">/ {label}</span>
    </p>
  );
}
