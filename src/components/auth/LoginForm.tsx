"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { TextField } from "@/components/forms/FormField";
import { useI18n, useT } from "@/lib/i18n/client";
import { localePath } from "@/lib/i18n/paths";

/**
 * Signs in against the `members` collection's REST auth endpoint. Payload
 * sets the session cookie on the response, so a hard navigation to
 * /resources (rather than a client-side route push) is what picks it up.
 */
export default function LoginForm() {
  const t = useT();
  const router = useRouter();
  const { country, locale } = useI18n();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        const data = new FormData(event.currentTarget);
        try {
          const res = await fetch("/api/members/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: data.get("email"),
              password: data.get("password"),
            }),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(body?.errors?.[0]?.message || "Sign in failed.");
          }
          router.push(localePath("/resources", country, locale));
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Sign in failed.");
          setSubmitting(false);
        }
      }}
      className="mx-auto mt-10 max-w-[420px] space-y-5"
    >
      <TextField label={t("Email")} type="email" name="email" required />
      <TextField
        label={t("Password")}
        type="password"
        name="password"
        required
      />

      {error && (
        <p className="rounded-lg bg-white/90 px-3 py-2 text-[14px] text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-white px-10 py-4 font-semibold text-[#0066cf] text-xs tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
      >
        {submitting ? t("Signing In...") : t("Sign In")}
      </button>

      <p className="text-center text-[14px] text-white/75">
        {t("Don't have an account?")}{" "}
        <Link href="/join" className="text-white underline">
          {t("Request access")}
        </Link>
      </p>
    </form>
  );
}
