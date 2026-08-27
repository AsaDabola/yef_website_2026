"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { useT } from "@/lib/i18n/client";

type SubmissionSuccessProps = {
  title: string;
  message: ReactNode;
  /** Small line under the divider. Omit to hide the divider with it. */
  footnote?: ReactNode;
  cta?: { label: string; href: string };
  className?: string;
};

/**
 * The confirmation panel every form drops into once it is submitted: a solid
 * blue field with the wordmark, a checkmark and a white button back out.
 */
export default function SubmissionSuccess({
  title,
  message,
  footnote,
  cta = { label: "Back to Home", href: "/" },
  className,
}: SubmissionSuccessProps) {
  const t = useT();
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 rounded-2xl bg-[#0066cf] px-8 py-16 text-center sm:px-12 sm:py-20 ${className ?? ""}`}
    >
      <Image
        src="/images/icons/logo-yef.svg"
        alt={t("Youth Evangelical Fellowship")}
        width={138}
        height={50}
        className="h-[50px] w-[138px] object-contain"
      />

      <svg
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-11 text-white/70"
        aria-hidden="true"
      >
        <path d="M8 23.5 17.5 33 36 11" />
      </svg>

      <p className="font-bold text-2xl text-white">{title}</p>
      <p className="max-w-[464px] text-[14px] text-white">{message}</p>

      {footnote && (
        <>
          <div className="h-px w-[200px] bg-[#dbdee3]" />
          <p className="max-w-[464px] text-[13px] text-white">{footnote}</p>
        </>
      )}

      <Link
        href={cta.href}
        className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 font-bold text-[14px] text-[#0066cf] uppercase transition-transform duration-200 hover:scale-105"
      >
        {t(cta.label)}
      </Link>
    </div>
  );
}
