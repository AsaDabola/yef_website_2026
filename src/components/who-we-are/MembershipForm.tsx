"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import {
  CheckboxField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";

export default function MembershipForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mt-6 max-w-[700px]"
        title="You're All Set!"
        message="Thanks for applying to join YEF. A member of our team will reach out to you soon."
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
      <TextField label="Full name" name="fullName" required />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField label="Email" type="email" name="email" required />
        <TextField label="Phone" type="tel" name="phone" />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField label="Country" name="country" required />
        <TextField label="City" name="city" required />
      </div>
      <TextField label="Campus or church (optional)" name="campus" />
      <TextField label="Age range" name="ageRange" />
      <TextAreaField label="Why do you want to join YEF?" name="reason" />
      <CheckboxField
        label="I agree to the YEF statement of faith and consent to being contacted about my membership."
        name="agreement"
      />
      <button
        type="submit"
        className="w-[270px] rounded-full bg-[#0066cf] px-10 py-[18px] font-semibold text-[14px] text-white tracking-[2.24px] uppercase transition-transform duration-200 hover:scale-105"
      >
        Submit Application
      </button>
    </form>
  );
}
