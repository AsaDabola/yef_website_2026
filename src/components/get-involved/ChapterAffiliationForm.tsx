"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  CheckboxField,
  FileField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";
import { useT } from "@/lib/i18n/client";

function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-[14px] text-[#0066cf] tracking-[2.24px]">
        {number}
      </span>
      <h3 className="font-semibold text-[19px] text-black">{title}</h3>
    </div>
  );
}

export default function ChapterAffiliationForm() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mt-6 max-w-[700px]"
        title={t("You're All Set!")}
        message={t(
          "Thanks for applying to affiliate your chapter with YEF. A regional coordinator will follow up with your leadership team soon.",
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
      className="mt-6 max-w-[700px] space-y-10"
    >
      <div className="space-y-5">
        <StepHeader number="01" title={t("Chapter information")} />
        <TextField label={t("Chapter name")} name="chapterName" required />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("Country")} name="country" required />
          <TextField label={t("City")} name="city" required />
        </div>
        <TextField
          label={t("University or church affiliated with")}
          name="affiliation"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label={t("Estimated members interested")}
            name="estimatedMembers"
          />
          <TextField label={t("Meeting frequency")} name="meetingFrequency" />
        </div>
        <a
          href="#"
          className="block font-medium text-[14px] text-[#0066cf] underline"
        >
          {t("↓ Download the Chapter Application info pack (PDF)")}
        </a>
        <FileField
          label={t("Attach completed application form (optional)")}
          hint={t("PDF — up to 10MB")}
          name="applicationFile"
        />
      </div>

      <div className="border-black/10 border-t" />

      <div className="space-y-5">
        <StepHeader number="02" title={t("Leadership contact")} />
        <TextField label={t("Leader full name")} name="leaderName" required />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label={t("Email")}
            type="email"
            name="leaderEmail"
            required
          />
          <TextField label={t("Phone")} type="tel" name="leaderPhone" />
        </div>
        <TextField label={t("Role or title (optional)")} name="leaderRole" />
      </div>

      <div className="border-black/10 border-t" />

      <div className="space-y-5">
        <StepHeader number="03" title={t("Agreement")} />
        <TextAreaField
          label={t("Anything else we should know?")}
          name="notes"
        />
        <a
          href="#"
          className="block font-medium text-[14px] text-[#0066cf] underline"
        >
          {t("↓ Download the Leadership Agreement form (PDF)")}
        </a>
        <FileField
          label={t("Attach signed chapter agreement (optional)")}
          hint={t("PDF — up to 10MB")}
          name="agreementFile"
        />
        <CheckboxField
          label={t(
            "Our chapter agrees to affiliate under the YEF statement of faith and chapter guidelines, and to remain in contact with a regional YEF coordinator.",
          )}
          name="agreement"
          required
        />
        <p className="text-[13px] text-black/45 leading-[18px]">
          {t(
            "YEF collects the information in this form only to process your chapter’s affiliation request and to stay in contact with your chapter’s leadership. We do not sell, rent, or share your personal information with third parties, and it will not be used for any purpose beyond what is described here without your consent. By submitting this form, you agree to YEF’s Privacy Policy and Terms of Use.",
          )}
        </p>
        <button
          type="submit"
          className="w-[358px] max-w-full rounded-full bg-[#0066cf] px-10 py-[18px] font-semibold text-[14px] text-white tracking-[2.24px] uppercase transition-transform duration-200 hover:scale-105"
        >
          {t("Submit Chapter Application")}
        </button>
      </div>
    </form>
  );
}
