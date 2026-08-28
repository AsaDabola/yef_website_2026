import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import HeaderV2 from "@/components/home-v2/HeaderV2";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Link from "@/components/ui/LocaleLink";
import ResourceCard from "@/components/resources/ResourceCard";
import ResourcesSubMenu from "@/components/resources/ResourcesSubMenu";
import { getT } from "@/lib/i18n/server";
import { currentViewer } from "@/lib/members";
import { cmsConfigured } from "@/lib/posts";
import type { Resource } from "@/payload-types";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "Resources | Youth Evangelical Fellowship",
};

const categories: {
  key: Resource["category"];
  label: string;
  blurb: string;
}[] = [
  {
    key: "policy",
    label: "Policy",
    blurb: "Governance, guidelines, and how YEF operates.",
  },
  {
    key: "training",
    label: "Training Resources",
    blurb: "Curricula, toolkits, and study materials for every ministry.",
  },
  {
    key: "forms",
    label: "Forms",
    blurb: "Applications, requests, and other paperwork in one place.",
  },
  {
    key: "worship",
    label: "Worship & Order",
    blurb: "Praise sets and order-of-service materials.",
  },
  {
    key: "media",
    label: "Media",
    blurb: "Recorded messages members can listen to or watch online.",
  },
];

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
        <section className="relative h-[220px] overflow-hidden bg-v2-navy sm:h-[320px] lg:h-[378px]">
          <Image
            src="/images/get-involved/banner-crowd.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          <HeaderV2 />
        </section>

        <section className="mx-auto max-w-[1920px] px-6 pt-16 lg:pt-[110px] lg:pr-[92px] lg:pl-[81px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 min-[1728px]:gap-[167px]">
            <div className="shrink-0 lg:w-[237px]">
              <ResourcesSubMenu />
            </div>

            <div className="min-w-0 flex-1">
              <Breadcrumb label={t("Resources")} />

              <h1 className="mt-6 font-display font-extrabold text-4xl text-black tracking-[-0.8px] sm:text-[46px] sm:leading-[60px]">
                {t("YEF Resources")}
              </h1>
              <p className="mt-3 max-w-[640px] text-[16px] text-[#6b737d]">
                {t(
                  "Policy, training, forms, worship, and recorded messages in one place — YEF's spiritual library for students, leaders, staff, and ministers.",
                )}
              </p>

              <div className="mt-14 space-y-16">
                {categories.map(({ key, label, blurb }) => {
                  const items = byCategory.get(key) ?? [];
                  return (
                    <div
                      key={key}
                      id={key}
                      className="scroll-mt-32 border-black/10 border-t pt-10 first:border-t-0 first:pt-0"
                    >
                      <h2 className="font-display font-bold text-2xl text-black">
                        {t(label)}
                      </h2>
                      <p className="mt-1 text-[14.5px] text-[#6b737d]">
                        {t(blurb)}
                      </p>

                      <div className="mt-6 space-y-4">
                        {items.length > 0 ? (
                          items.map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} t={t} />
                          ))
                        ) : (
                          <p className="rounded-2xl border border-dashed border-v2-border px-6 py-8 text-[14px] text-[#6b737d] italic">
                            {t("Nothing here yet — check back soon.")}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-16 text-[13px] text-[#6b737d]">
                {t("Not seeing what you need?")}{" "}
                <Link href="/contact" className="text-[#0066cf] underline">
                  {t("Contact the YEF team")}
                </Link>
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16" />
      </main>
      <Footer />
    </>
  );
}
