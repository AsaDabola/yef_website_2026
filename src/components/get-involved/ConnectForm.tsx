"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  LabeledCheckboxField,
  LabeledTextAreaField,
  LabeledTextField,
} from "@/components/forms/LabeledField";

const growthAreas = [
  "Bible & Faith",
  "Discipleship",
  "Missions",
  "Leadership",
  "Christian Community",
];

export default function ConnectForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        title="You're All Set!"
        message="Thanks for reaching out to YEFI! We've received your information and a member of our team will be in touch with you soon to help you find the right opportunity."
        footnote="In the meantime, feel free to explore more ways to get involved."
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
        <h1 className="font-bold text-[22px] text-[#2b4c7e] sm:text-[26px]">
          Apply YEF Mission School
        </h1>
        <p className="text-[14px] text-[#6b737d]">
          Interested in studying the Bible or getting involved with YEFI? Tell
          us what you&rsquo;re interested in, and we&rsquo;ll help you find the
          right opportunity.
        </p>
      </div>

      <div className="h-px w-full bg-[#dbdee3]" />

      <div className="space-y-3.5">
        <p className="font-semibold text-[16px] text-[#1b1d21]">
          What would you like to learn or grow in?
        </p>
        <div className="space-y-2.5">
          {growthAreas.map((area) => (
            <LabeledCheckboxField key={area} label={area} name="growthAreas" />
          ))}
        </div>
      </div>

      <div className="space-y-3.5">
        <p className="font-semibold text-[16px] text-[#1b1d21]">
          Your Information
        </p>
        <div className="space-y-4">
          <LabeledTextField
            label="Name"
            placeholder="First & Last Name"
            name="name"
            required
          />
          <LabeledTextField
            label="Email"
            placeholder="Email Address"
            type="email"
            name="email"
            required
          />
          <LabeledTextField
            label="Phone"
            placeholder="Phone Number"
            type="tel"
            name="phone"
          />
          <LabeledTextAreaField
            label="Message"
            placeholder="Tell us how we can help you"
            name="message"
            rows={4}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-[8px] bg-[#0066cf] px-7 py-3.5 font-bold text-[14px] text-white uppercase transition-opacity hover:opacity-90"
      >
        Connect With YEFI
      </button>
    </form>
  );
}
