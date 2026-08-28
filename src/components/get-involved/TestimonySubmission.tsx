"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import { FileField } from "@/components/forms/FormField";
import { LabeledTextField } from "@/components/forms/LabeledField";
import { PrivacyNote } from "@/components/forms/PrivacyNote";
import { useT } from "@/lib/i18n/client";

export default function TestimonySubmission() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        title={t("Thank You for Sharing")}
        message={t(
          "Your story has been received. We're grateful you took the time to share what God has been doing in your life.",
        )}
        footnote={t("In the meantime, feel free to explore more ways to get involved.")}
      />
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-8 rounded-2xl bg-white p-8 sm:p-12"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <LabeledTextField
            label={t("Name")}
            placeholder={t("First & Last Name")}
            name="name"
            required
            half
          />
          <LabeledTextField
            label={t("Email")}
            placeholder={t("Email Address")}
            type="email"
            name="email"
            required
            half
          />
        </div>
        <LabeledTextField
          label={t("Testimony Title")}
          placeholder={t("Give your story a short title")}
          name="title"
          required
        />
      </div>

      <div className="space-y-3.5">
        <label
          htmlFor="testimony"
          className="block font-semibold text-[16px] leading-[19px] text-[#1b1d21]"
        >
          {t("Your Testimony")}
        </label>
        <p className="text-[13px] leading-[16px] text-[#6b737d]">
          {t(
            "What has God been teaching you? How have you seen His grace at work in your life recently?",
          )}
        </p>
        <textarea
          id="testimony"
          name="testimony"
          placeholder={t("Share your story here...")}
          className="block h-[220px] w-full rounded-[8px] border border-[#d1d6de] bg-[#fafafb] p-[14px] text-[13px] leading-[16px] text-[#1b1d21] placeholder:text-[#9ea3ab] focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/20"
        />
        <p className="text-right text-[11px] leading-[13px] text-[#9ea3ab]">
          {t("Minimum 100 words")}
        </p>
      </div>

      <div className="space-y-3.5">
        <p className="font-semibold text-[16px] leading-[19px] text-[#1b1d21]">
          {t("Photo")}
        </p>
        <FileField
          label={t("Add a photo (optional)")}
          hint={t("JPG or PNG — up to 10MB")}
          name="photo"
          accept="image/*"
        />
      </div>

      <div className="space-y-3.5">
        <p className="font-semibold text-[16px] leading-[19px] text-[#1b1d21]">
          {t("Sharing Permission")}
        </p>
        <label className="flex items-center gap-2.5 text-[13px] leading-[18px] text-[#1b1d21]">
          <input
            type="checkbox"
            name="permission"
            defaultChecked
            className="size-[18px] shrink-0 rounded-[4px] border-[1.5px] border-[#bfc4cc] text-[#2b4c7e] focus:ring-v2-accent"
          />
          <span>
            {t(
              "I give YEFI permission to share my testimony (website, social media, newsletter).",
            )}
          </span>
        </label>
      </div>

      <PrivacyNote>
        {t(
          "YEF collects the information in this form only to review your story and, with your permission above, publish it. We do not sell, rent, or share your personal information with third parties, and it will not be used for any purpose beyond what is described here without your consent. By submitting this form, you agree to YEF’s Privacy Policy and Terms of Use.",
        )}
      </PrivacyNote>

      <button
        type="submit"
        className="w-full rounded-[8px] bg-[#2b4c7e] px-7 py-3.5 font-bold text-[14px] leading-[17px] text-white uppercase transition-opacity hover:opacity-90"
      >
        {t("Submit My Testimony")}
      </button>
    </form>
  );
}
