import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";

export default async function Breadcrumb({ label }: { label: string }) {
  const t = await getT();
  return (
    <p className="text-sm text-black/65">
      <Link href="/" className="hover:text-black">
        {t("Home")}
      </Link>{" "}
      <span className="text-yef-primary">/ {label}</span>
    </p>
  );
}
