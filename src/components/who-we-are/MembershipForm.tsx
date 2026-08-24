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
        className="mt-10 max-w-2xl"
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
      className="mt-10 max-w-2xl space-y-4"
    >
      <TextField label="Full name" name="fullName" required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Email" type="email" name="email" required />
        <TextField label="Phone" type="tel" name="phone" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        className="rounded-full bg-v2-blue px-8 py-4 font-semibold text-sm text-white tracking-[0.5px] uppercase transition-transform duration-200 hover:scale-105"
      >
        Submit Application
      </button>
    </form>
  );
}
