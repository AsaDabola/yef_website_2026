import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import { getT } from "@/lib/i18n/server";
import { currentViewer } from "@/lib/members";
import { cmsConfigured } from "@/lib/posts";
import type { Resource } from "@/payload-types";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Resources | Youth Evangelical Fellowship",
};

const categories: { key: Resource["category"]; label: string }[] = [
  { key: "policy", label: "Policy" },
  { key: "training", label: "Training Resources" },
  { key: "forms", label: "Forms" },
  { key: "worship", label: "Worship & Order" },
  { key: "media", label: "Media" },
];

function ResourceRow({ resource, t }: { resource: Resource; t: (s: string) => string }) {
  const href =
    resource.kind === "link" ? resource.externalUrl || "#" : resource.url || "#";

  return (
    <li className="flex flex-col gap-3 border-black/10 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-[15.8px] text-black">
          {resource.title}
          {resource.visibility === "public" && (
            <span className="ml-2 rounded-full bg-[#eff5ff] px-2.5 py-0.5 text-[10px] text-[#0066cf] uppercase tracking-[1px]">
              {t("Public")}
            </span>
          )}
        </p>
        {resource.description && (
          <p className="mt-1 text-[14px] text-[#6b737d]">{resource.description}</p>
        )}
      </div>

      {resource.kind === "audio" && resource.url ? (
        <audio controls src={resource.url} className="w-full sm:w-[280px]" />
      ) : resource.kind === "video" && resource.url ? (
        <video controls src={resource.url} className="w-full sm:w-[280px] rounded-lg" />
      ) : href !== "#" ? (
        <a
          href={href}
          target={resource.kind === "link" ? "_blank" : undefined}
          rel={resource.kind === "link" ? "noopener noreferrer" : undefined}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#00203f] px-6 py-2.5 font-semibold text-[12px] text-[#00203f] tracking-[1.2px] uppercase transition-transform duration-200 hover:scale-105"
        >
          {resource.kind === "link" ? t("Open Link") : t("Download")}
        </a>
      ) : (
        <span className="shrink-0 text-[13px] text-[#6b737d] italic">
          {t("Coming soon")}
        </span>
      )}
    </li>
  );
}

export default async function ResourcesPage({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  const t = await getT();

  const viewer = await currentViewer();
  if (!viewer) redirect("/login");

  const resources: Resource[] = [];
  if (cmsConfigured) {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "resources",
      limit: 500,
      sort: "title",
      overrideAccess: false,
      user: viewer,
    });
    resources.push(...result.docs);
  }

  const byCategory = new Map<Resource["category"], Resource[]>();
  for (const r of resources) {
    byCategory.set(r.category, [...(byCategory.get(r.category) ?? []), r]);
  }

  return (
    <>
      <main>
        <section className="relative h-[176px] bg-v2-navy">
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1000px] px-6 py-16 lg:px-0">
          <Breadcrumb label={t("Resources")} />
          <h1 className="mt-6 font-display font-extrabold text-4xl text-black">
            {t("YEF Resources")}
          </h1>
          <p className="mt-3 max-w-[640px] text-[16px] text-[#6b737d]">
            {t(
              "Policy, training, forms, worship, and recorded messages in one place — YEF's spiritual library for students, leaders, staff, and ministers.",
            )}
          </p>

          <div className="mt-12 space-y-14">
            {categories.map(({ key, label }) => {
              const items = byCategory.get(key) ?? [];
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <h2 className="font-display font-bold text-2xl text-black">
                    {t(label)}
                  </h2>
                  <ul className="mt-4">
                    {items.map((resource) => (
                      <ResourceRow key={resource.id} resource={resource} t={t} />
                    ))}
                  </ul>
                </div>
              );
            })}

            {resources.length === 0 && (
              <p className="text-[15px] text-[#6b737d]">
                {t("Resources will appear here as the team adds them.")}
              </p>
            )}
          </div>

          <p className="mt-16 text-[13px] text-[#6b737d]">
            {t("Not seeing what you need?")}{" "}
            <Link href="/contact" className="text-[#0066cf] underline">
              {t("Contact the YEF team")}
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
