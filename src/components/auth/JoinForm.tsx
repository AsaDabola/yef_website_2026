"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import { TextField } from "@/components/forms/FormField";
import { useT } from "@/lib/i18n/client";

/**
 * Creates a `members` account via Payload's REST create endpoint. The
 * account lands unapproved — a `users` admin has to check it off in /admin
 * before LoginForm's sign-in will succeed.
 */
export default function JoinForm() {
  const t = useT();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mx-auto mt-10 max-w-[600px]"
        title={t("Request Sent")}
        message={t(
          "A YEF staff member will review your request. You'll be able to sign in once your account is approved.",
        )}
        cta={{ label: "Back to Home", href: "/" }}
      />
    );
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        const data = new FormData(event.currentTarget);
        try {
          const res = await fetch("/api/members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              name: data.get("name"),
              email: data.get("email"),
              password: data.get("password"),
            }),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(
              body?.errors?.[0]?.message || "Could not create account.",
            );
          }
          setSubmitted(true);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Could not create account.",
          );
        } finally {
          setSubmitting(false);
        }
      }}
      className="mx-auto mt-10 max-w-[420px] space-y-5"
    >
      <TextField label={t("Full Name")} name="name" required />
      <TextField label={t("Email")} type="email" name="email" required />
      <TextField
        label={t("Password")}
        type="password"
        name="password"
        required
      />

      {error && <p className="text-[14px] text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
      >
        {submitting ? t("Sending...") : t("Request Access")}
      </button>

      <p className="text-center text-[14px] text-[#6b737d]">
        {t(
          "For YEF students, leaders, staff, and ministers. Your account is reviewed before you can sign in.",
        )}
      </p>
    </form>
  );
}
