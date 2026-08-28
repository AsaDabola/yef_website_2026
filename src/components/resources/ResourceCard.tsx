import type { Resource } from "@/payload-types";

function KindBadge({ kind }: { kind: Resource["kind"] }) {
  const paths: Record<Resource["kind"], string> = {
    document:
      "M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v5h5M9 13h6M9 17h6",
    audio: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    video: "M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm13 3 4-2v10l-4-2",
    link: "M9 15 15 9M11 6l1-1a4 4 0 1 1 6 6l-1 1M13 18l-1 1a4 4 0 1 1-6-6l1-1",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

export default function ResourceCard({
  resource,
  t,
}: {
  resource: Resource;
  t: (s: string) => string;
}) {
  const href =
    resource.kind === "link" ? resource.externalUrl || "#" : resource.url || "#";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-v2-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eff5ff] text-[#0066cf]">
          <KindBadge kind={resource.kind} />
        </div>
        <div>
          <p className="font-semibold text-[15.8px] text-black">
            {resource.title}
            {resource.visibility === "public" && (
              <span className="ml-2 rounded-full bg-[#eff5ff] px-2.5 py-0.5 align-middle text-[10px] text-[#0066cf] uppercase tracking-[1px]">
                {t("Public")}
              </span>
            )}
          </p>
          {resource.description && (
            <p className="mt-1 max-w-[440px] text-[14px] text-[#6b737d]">
              {resource.description}
            </p>
          )}
        </div>
      </div>

      {resource.kind === "audio" && resource.url ? (
        <audio controls src={resource.url} className="h-10 w-full sm:w-[260px]" />
      ) : resource.kind === "video" && resource.url ? (
        <video
          controls
          src={resource.url}
          className="w-full rounded-lg sm:w-[260px]"
        />
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
    </div>
  );
}
