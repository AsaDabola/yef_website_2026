"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  CheckboxField,
  RadioField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";
import { useT } from "@/lib/i18n/client";

/** The numbered rule the frame puts above each section. */
function StepHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#0066cf] font-semibold text-[13px] text-white">
        {number}
      </span>
      <h3 className="font-semibold text-[19px] text-black">{title}</h3>
    </div>
  );
}

/** The frame lays these two to a row, in this order. */
const areas = [
  "Campus Evangelism",
  "Online Evangelism",
  "Events & Retreats",
  "Media & Communications",
  "Photography / Video",
  "Translation",
  "Worship / Music",
  "Administration",
  "Prayer Ministry",
  "Other",
];

export default function VolunteerForm() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mx-auto mt-10 max-w-[900px]"
        title={t("Thank You!")}
        message="Thank you for your willingness to serve. A member of the YEF team will follow up with you shortly."
      />
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mx-auto mt-10 max-w-[900px] space-y-12"
    >
      <div className="space-y-5">
        <StepHeader number="1" title={t("Personal Information")} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("Full Name")} name="fullName" required />
          <TextField label={t("Email")} type="email" name="email" required />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("Phone / WhatsApp")} name="phone" />
          <TextField label={t("Age")} name="age" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("City & Country")} name="location" />
          <TextField
            label={t("University / Occupation")}
            name="occupation"
          />
        </div>
        <TextField
          label={t("Church or Ministry Affiliation (optional)")}
          name="church"
        />
      </div>

      <div className="space-y-5">
        <StepHeader number="2" title={t("Your Involvement with YEF")} />
        <fieldset>
          <legend className="mb-3 font-medium text-[14px] text-[#1b1d21]">
            {t("Are you currently involved with YEF?")}
          </legend>
          <div className="flex gap-3">
            <RadioField label={t("Yes")} name="involved" value="yes" />
            <RadioField label={t("No")} name="involved" value="no" />
          </div>
        </fieldset>
        <TextField
          label={t("How did you hear about YEF?")}
          name="heardAbout"
        />
      </div>

      <div className="space-y-5">
        <StepHeader
          number="3"
          title={t("What areas would you like to volunteer in?")}
        />
        <p className="text-[14px] text-[#6b737d]">{t("Select all that apply.")}</p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {areas.map((area) => (
            <CheckboxField key={area} label={t(area)} name="areas" />
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <StepHeader number="4" title={t("Availability & Heart for Ministry")} />
        <TextAreaField
          label={t("How often and when are you available?")}
          name="availability"
          rows={3}
        />
        <TextAreaField
          label={t("Why would you like to volunteer with YEF?")}
          name="motivation"
          rows={3}
        />
        <TextAreaField
          label={t("Skills or experience you would like to contribute")}
          name="skills"
          rows={3}
        />
        <TextAreaField
          label={t("Anything else you would like us to know? (optional)")}
          name="notes"
          rows={3}
        />
      </div>

      <div className="border-t border-black/10 pt-8">
        <button
          type="submit"
          className="rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
        >
          {t("Submit Application")}
        </button>
        <p className="mt-6 text-[14px] text-[#6b737d]">
          {t(
            "Thank you for your willingness to serve. A member of the YEF team will follow up with you shortly.",
          )}
        </p>
      </div>
    </form>
  );
}
