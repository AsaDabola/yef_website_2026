"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  LabeledCheckboxField,
  LabeledRadioField,
  LabeledTextAreaField,
  LabeledTextField,
} from "@/components/forms/LabeledField";
import { useT } from "@/lib/i18n/client";

const interests = [
  "Bible Studies",
  "Discipleship",
  "Campus Evangelism",
  "Summer Training",
  "Internship",
  "Leadership Training",
  "Volunteer",
  "Short-term Mission",
];

const growthAreas = [
  "Bible & Faith",
  "Discipleship",
  "Missions",
  "Leadership",
  "Christian Community",
];

/**
 * Two frames share this form. The Get Involved page leads with the display-face
 * "CONNECT WITH YEFI" and asks the interest and Bible-study questions; the
 * Mission School page drops both and titles the card in the body face.
 */
const variants = {
  connect: {
    title: "Connect With YEFI",
    titleClassName:
      "font-display font-extrabold text-[32px] text-[#2b4c7e] uppercase leading-[38px] sm:text-[46px] sm:leading-[55px]",
    askInterests: true,
  },
  "mission-school": {
    title: "Apply YEF Mission School",
    titleClassName:
      "font-bold text-[22px] text-[#2b4c7e] leading-[27px] sm:text-[26px] sm:leading-[31px]",
    askInterests: false,
  },
} as const;

export default function ConnectForm({
  variant = "connect",
}: {
  variant?: keyof typeof variants;
}) {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const { title, titleClassName, askInterests } = variants[variant];

  if (submitted) {
    return (
      <SubmissionSuccess
        title={t("You're All Set!")}
        message={t(
          "Thanks for reaching out to YEFI! We've received your information and a member of our team will be in touch with you soon to help you find the right opportunity.",
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
      <div className="space-y-2.5">
        <h1 className={titleClassName}>{t(title)}</h1>
        <p className="text-[14px] leading-[17px] text-[#6b737d]">
          {t("Interested in studying the Bible or getting involved with YEFI?")}
          <br />

          {t(
            "Tell us what you’re interested in, and we’ll help you find the right opportunity.",
          )}
        </p>
      </div>

      <div className="h-px w-full bg-[#dbdee3]" />

      {askInterests && (
        <>
          <div className="space-y-3.5">
            <p className="font-semibold text-[16px] leading-[19px] text-[#1b1d21]">
              {t("What are you interested in?")}
            </p>
            <p className="text-[12px] leading-[15px] text-[#6b737d]">
              {t("Select all that apply.")}
            </p>
            <div className="space-y-2.5">
              {interests.map((interest) => (
                <LabeledCheckboxField
                  key={interest}
                  label={t(interest)}
                  name="interests"
                />
              ))}
            </div>
          </div>

          <div className="space-y-3.5">
            <p className="font-semibold text-[16px] leading-[19px] text-[#1b1d21]">
              {t("Have you participated in a Bible study before?")}
            </p>
            <div className="flex gap-7">
              <LabeledRadioField
                label={t("Yes")}
                name="bibleStudy"
                value="yes"
              />
              <LabeledRadioField label={t("No")} name="bibleStudy" value="no" />
            </div>
          </div>
        </>
      )}

      <div className="space-y-3.5">
        <p className="font-semibold text-[16px] leading-[19px] text-[#1b1d21]">
          {t("What would you like to learn or grow in?")}
        </p>
        <div className="space-y-2.5">
          {growthAreas.map((area) => (
            <LabeledCheckboxField key={area} label={t(area)} name="growthAreas" />
          ))}
        </div>
      </div>

      <div className="space-y-3.5">
        <p className="font-semibold text-[16px] leading-[19px] text-[#1b1d21]">
          {t("Your Information")}
        </p>
        <div className="space-y-4">
          <LabeledTextField
            label={t("Name")}
            placeholder={t("First & Last Name")}
            name="name"
            required
          />
          <LabeledTextField
            label={t("Email")}
            placeholder={t("Email Address")}
            type="email"
            name="email"
            required
          />
          <LabeledTextField
            label={t("Phone")}
            placeholder={t("Phone Number")}
            type="tel"
            name="phone"
          />
          <LabeledTextAreaField
            label={t("Message")}
            placeholder={t("Tell us how we can help you")}
            name="message"
            rows={4}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-[8px] bg-[#0066cf] px-7 py-3.5 font-bold text-[14px] leading-[17px] text-white uppercase transition-opacity hover:opacity-90"
      >
        {t("Connect With YEFI")}
      </button>
    </form>
  );
}
