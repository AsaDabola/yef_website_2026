"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  CheckboxField,
  FileField,
  RadioField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";
import { PrivacyNote } from "@/components/forms/PrivacyNote";
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

/** Two to a row in the frame, in this order. */
const places = [
  "My Current City",
  "Another City",
  "Another Country",
  "University Campus Mission",
  "Online Mission",
  "Wherever Needed",
  "Not Sure Yet",
];

const interests = [
  "Short-Term Mission",
  "Long-Term Mission",
  "Mission School",
  "Internship",
  "Full-Time Ministry",
  "Still Exploring",
];

export default function MissionApplyForm() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mt-10 max-w-[900px]"
        title={t("Thank You!")}
        message={t(
          "Thank you for stepping toward this calling. A member of the YEF missions team will follow up with you shortly.",
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
      className="mt-10 max-w-[900px] space-y-12"
    >
      <div className="space-y-5">
        <StepHeader number="1" title={t("Personal Information")} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("Full Name")} name="fullName" required />
          <TextField label={t("Email")} type="email" name="email" required />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("Phone / WhatsApp")} name="phone" />
          <TextField label={t("Age / Date of Birth")} name="age" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField label={t("City & Country")} name="location" />
          <TextField label={t("Nationality")} name="nationality" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label={t("University / Occupation")}
            name="occupation"
          />
          <TextField label={t("Church")} name="church" />
        </div>
        <FileField
          label={t("Add a photo (optional)")}
          hint={t("JPG or PNG — up to 10MB")}
          name="photo"
          accept="image/*"
        />
      </div>

      <div className="space-y-5">
        <StepHeader number="2" title={t("Current Involvement with YEF")} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label={t("Current YEF involvement")}
            name="involvement"
          />
          <TextField
            label={t("Current ministry responsibilities")}
            name="responsibilities"
          />
        </div>
        <TextField
          label={t("Who recommended YEF to you? (optional)")}
          name="referredBy"
        />
      </div>

      <div className="space-y-5">
        <StepHeader number="3" title={t("Faith & Calling")} />
        <TextField
          label={t("How long have you been a Christian?")}
          name="christianFor"
        />
        <TextAreaField
          label={t("Briefly share your testimony.")}
          name="testimony"
          rows={3}
        />
        <TextAreaField
          label={t("Why do you feel called to mission?")}
          name="calling"
          rows={3}
        />
        <TextAreaField
          label={t("Why are you interested in serving with YEF?")}
          name="whyYef"
          rows={3}
        />
        <fieldset>
          <legend className="mb-3 font-medium text-[14px] text-[#1b1d21]">
            {t("Have you completed a YEF discipleship program before?")}
          </legend>
          <div className="flex gap-3">
            <RadioField
              label={t("Yes")}
              name="completedDiscipleship"
              value="yes"
            />
            <RadioField
              label={t("No")}
              name="completedDiscipleship"
              value="no"
            />
          </div>
        </fieldset>
      </div>

      <div className="space-y-5">
        <StepHeader number="4" title={t("Ministry Experience")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-3 font-medium text-[14px] text-[#1b1d21]">
              {t("Have you participated in evangelism before?")}
            </legend>
            <div className="flex gap-3">
              <RadioField label={t("Yes")} name="evangelism" value="yes" />
              <RadioField label={t("No")} name="evangelism" value="no" />
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 font-medium text-[14px] text-[#1b1d21]">
              {t("Have you led or participated in Bible studies?")}
            </legend>
            <div className="flex gap-3">
              <RadioField label={t("Yes")} name="bibleStudy" value="yes" />
              <RadioField label={t("No")} name="bibleStudy" value="no" />
            </div>
          </fieldset>
        </div>
        <TextAreaField
          label={t("Previous ministry or mission experience")}
          name="experience"
          rows={3}
        />
        <TextField label={t("Languages spoken")} name="languages" />
      </div>

      <div className="space-y-5">
        <StepHeader
          number="5"
          title={t("Where are you interested in serving?")}
        />
        <p className="text-[14px] text-[#6b737d]">
          {t("Select all that apply.")}
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {places.map((place) => (
            <CheckboxField key={place} label={t(place)} name="places" />
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <StepHeader number="6" title={t("Are You Interested In:")} />
        <p className="text-[14px] text-[#6b737d]">
          {t("Select all that apply.")}
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {interests.map((interest) => (
            <CheckboxField
              key={interest}
              label={t(interest)}
              name="interests"
            />
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <StepHeader number="7" title={t("Availability & Training")} />
        <TextAreaField
          label={t("When would you potentially be available?")}
          name="availability"
          rows={3}
        />
        <TextAreaField
          label={t("What areas would you like to receive training in?")}
          name="training"
          rows={3}
        />
      </div>

      <div className="space-y-5">
        <StepHeader number="8" title={t("Anything Else")} />
        <TextAreaField
          label={t(
            "Is there anything you would like to discuss with a YEF leader?",
          )}
          name="notes"
          rows={3}
        />
      </div>

      <div className="space-y-5 border-t border-black/10 pt-8">
        <PrivacyNote>
          {t(
            "YEF collects the information in this form only to process your mission application and coordinate with our missions team. We do not sell, rent, or share your personal information with third parties, and it will not be used for any purpose beyond what is described here without your consent. By submitting this form, you agree to YEF’s Privacy Policy and Terms of Use.",
          )}
        </PrivacyNote>
        <div>
          <button
            type="submit"
            className="rounded-full bg-[#0066cf] px-10 py-4 font-semibold text-xs text-white tracking-[1.92px] uppercase transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("Submit Application")}
          </button>
          <p className="mt-6 text-[14px] text-[#6b737d]">
            {t(
              "Thank you for stepping toward this calling. A member of the YEF missions team will follow up with you shortly.",
            )}
          </p>
        </div>
      </div>
    </form>
  );
}
