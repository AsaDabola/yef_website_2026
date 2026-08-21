"use client";

import { useState } from "react";
import {
  CheckboxField,
  FileField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";

function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-v2-blue">{number}</span>
      <h3 className="font-semibold text-xl text-black">{title}</h3>
    </div>
  );
}

export default function ChapterAffiliationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-10 max-w-2xl rounded-2xl bg-v2-bg p-8">
        <p className="font-display font-extrabold text-2xl text-v2-navy">
          You&rsquo;re all set!
        </p>
        <p className="mt-3 text-v2-muted-dark-2">
          Thanks for applying to affiliate your chapter with YEF. A regional
          coordinator will follow up with your leadership team soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mt-10 max-w-2xl space-y-10"
    >
      <div className="space-y-4">
        <StepHeader number="01" title="Chapter information" />
        <TextField label="Chapter name" name="chapterName" required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Country" name="country" required />
          <TextField label="City" name="city" required />
        </div>
        <TextField
          label="University or church affiliated with"
          name="affiliation"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Estimated members interested"
            name="estimatedMembers"
          />
          <TextField label="Meeting frequency" name="meetingFrequency" />
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 font-semibold text-v2-blue hover:underline"
        >
          &darr; Download the Chapter Application info pack (PDF)
        </a>
        <FileField
          label="Attach completed application form (optional)"
          hint="PDF — up to 10MB"
          name="applicationFile"
        />
      </div>

      <div className="border-t border-v2-border" />

      <div className="space-y-4">
        <StepHeader number="02" title="Leadership contact" />
        <TextField label="Leader full name" name="leaderName" required />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Email" type="email" name="leaderEmail" required />
          <TextField label="Phone" type="tel" name="leaderPhone" />
        </div>
        <TextField label="Role or title (optional)" name="leaderRole" />
      </div>

      <div className="border-t border-v2-border" />

      <div className="space-y-4">
        <StepHeader number="03" title="Agreement" />
        <TextAreaField label="Anything else we should know?" name="notes" />
        <a
          href="#"
          className="inline-flex items-center gap-2 font-semibold text-v2-blue hover:underline"
        >
          &darr; Download the Leadership Agreement form (PDF)
        </a>
        <FileField
          label="Attach signed chapter agreement (optional)"
          hint="PDF — up to 10MB"
          name="agreementFile"
        />
        <CheckboxField
          label="Our chapter agrees to affiliate under the YEF statement of faith and chapter guidelines, and to remain in contact with a regional YEF coordinator."
          name="agreement"
        />
        <p className="text-sm text-v2-muted">
          YEF collects the information in this form only to process your
          chapter&rsquo;s affiliation request and to stay in contact with
          your chapter&rsquo;s leadership. We do not sell, rent, or share
          your personal information with third parties, and it will not be
          used for any purpose beyond what is described here without your
          consent. By submitting this form, you agree to YEF&rsquo;s Privacy
          Policy and Terms of Use.
        </p>
        <button
          type="submit"
          className="rounded-full bg-v2-blue px-8 py-4 font-semibold text-sm text-white tracking-[0.5px] uppercase transition-transform duration-200 hover:scale-105"
        >
          Submit Chapter Application
        </button>
      </div>
    </form>
  );
}
