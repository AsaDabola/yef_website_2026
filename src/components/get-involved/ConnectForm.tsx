"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LabeledCheckboxField,
  LabeledTextAreaField,
  LabeledTextField,
} from "@/components/forms/LabeledField";

const interests = [
  "Bible Studies",
  "Discipleship",
  "Mission Trip",
  "Summer Training",
  "Internship",
  "Leadership Training",
  "Volunteer / Short-term Projects",
  "Large Group",
  "Vision Trip",
];

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
      <div className="rounded-2xl border border-v2-border bg-white p-10 text-center sm:p-14">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-v2-bg">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-7 text-yef-primary"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-6 font-display font-extrabold text-3xl text-v2-navy">
          You&rsquo;re All Set!
        </h2>
        <p className="mx-auto mt-4 max-w-md text-v2-muted-dark-2 leading-relaxed">
          Thanks for reaching out to YEFI! We&rsquo;ve received your
          information and a member of our team will be in touch with you soon
          to help you find the right opportunity.
        </p>
        <div className="mx-auto mt-8 h-px w-48 bg-v2-border" />
        <p className="mt-8 text-sm text-v2-muted-dark-2">
          In the meantime, feel free to explore more ways to get involved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-yef-primary px-8 py-3.5 font-semibold text-xs text-white tracking-[1px] uppercase transition-transform duration-200 hover:scale-105 hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <h1 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
        Connect With YEFI
      </h1>
      <p className="mt-3 max-w-xl text-v2-muted-dark-2 leading-relaxed">
        Interested in studying the Bible or getting involved with YEFI? Tell
        us what you&rsquo;re interested in, and we&rsquo;ll help you find the
        right opportunity.
      </p>

      <div className="mt-8 border-t border-v2-border pt-8">
        <p className="font-semibold text-black">
          What are you interested in?
        </p>
        <p className="mt-1 text-sm text-v2-muted">Select all that apply.</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {interests.map((interest) => (
            <LabeledCheckboxField
              key={interest}
              label={interest}
              name="interests"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-v2-border pt-8">
        <p className="font-semibold text-black">
          Have you participated in a Bible study before?
        </p>
        <div className="mt-4 flex gap-8">
          <label className="flex items-center gap-2.5 text-v2-muted-dark-2">
            <input
              type="radio"
              name="bibleStudyExperience"
              value="yes"
              className="size-[18px] text-v2-blue focus:ring-v2-accent"
            />
            Yes
          </label>
          <label className="flex items-center gap-2.5 text-v2-muted-dark-2">
            <input
              type="radio"
              name="bibleStudyExperience"
              value="no"
              className="size-[18px] text-v2-blue focus:ring-v2-accent"
            />
            No
          </label>
        </div>
      </div>

      <div className="mt-8 border-t border-v2-border pt-8">
        <p className="font-semibold text-black">
          What would you like to learn or grow in?
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {growthAreas.map((area) => (
            <LabeledCheckboxField key={area} label={area} name="growthAreas" />
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-v2-border pt-8">
        <p className="font-semibold text-black">Your Information</p>
        <div className="mt-5 space-y-5">
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
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-yef-primary py-4 font-semibold text-xs text-white tracking-[1.5px] uppercase transition-transform duration-200 hover:scale-[1.01] hover:opacity-90"
      >
        Connect With YEFI
      </button>
    </form>
  );
}
