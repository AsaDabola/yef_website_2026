"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  CheckboxField,
  FileField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";
import { PrivacyNote } from "@/components/forms/PrivacyNote";
import { useT } from "@/lib/i18n/client";

export default function MembershipForm() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mt-6 max-w-[700px]"
        title={t("You're All Set!")}
        message={t(
          "Thanks for applying to join YEF. A member of our team will reach out to you soon.",
        )}
      />
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mt-6 max-w-[700px] space-y-[22px]"
    >
      <TextField label={t("Full name")} name="fullName" required />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField label={t("Email")} type="email" name="email" required />
        <TextField label={t("Phone")} type="tel" name="phone" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField label={t("Country")} name="country" required />
        <TextField label={t("City")} name="city" required />
      </div>
      <TextField label={t("Campus or church (optional)")} name="campus" />
      <TextField label={t("Age range")} name="ageRange" />
      <TextAreaField label={t("Why do you want to join YEF?")} name="reason" />

      <a
        href="#"
        className="block font-medium text-[14px] text-[#0066cf] underline"
      >
        {t("↓ Download the Membership Covenant (PDF)")}
      </a>
      <FileField
        label={t("Attach your signed Membership Covenant (optional)")}
        hint={t(
          "Signed online or a photo/scan of the signed printed page — PDF, JPG, or PNG, up to 10MB",
        )}
        name="covenantFile"
        accept="application/pdf,image/*"
      />

      <CheckboxField
        label={t(
          "I agree to the YEF statement of faith and consent to being contacted about my membership.",
        )}
        name="agreement"
        required
      />
      <PrivacyNote>
        {t(
          "YEF collects the information in this form only to process your membership application and to stay in contact with you about it. We do not sell, rent, or share your personal information with third parties, and it will not be used for any purpose beyond what is described here without your consent. By submitting this form, you agree to YEF’s Privacy Policy and Terms of Use.",
        )}
      </PrivacyNote>
      <button
        type="submit"
        className="w-[270px] rounded-full bg-[#0066cf] px-10 py-[18px] font-semibold text-[14px] text-white tracking-[2.24px] uppercase transition-transform duration-200 hover:scale-105"
      >
        {t("Submit Application")}
      </button>
    </form>
  );
}
