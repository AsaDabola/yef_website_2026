"use client";

import { useState } from "react";
import {
  LabeledCheckboxField,
  LabeledTextAreaField,
  LabeledTextField,
} from "@/components/forms/LabeledField";

export default function TestimonySubmission() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-v2-border bg-white p-10 text-center sm:p-14">
        <h2 className="font-display font-extrabold text-3xl text-v2-navy">
          Thank You for Sharing
        </h2>
        <p className="mx-auto mt-4 max-w-md text-v2-muted-dark-2 leading-relaxed">
          Your story has been received. We&rsquo;re grateful you took the
          time to share what God has been doing in your life.
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
    >
      <h1 className="text-center font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
        Submit Your Story
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-v2-muted-dark-2 leading-relaxed">
        God has been at work in your life &mdash; we&rsquo;d love to hear
        about it. Share the grace you&rsquo;ve received, and how it&rsquo;s
        shaped your walk with Him.
      </p>

      <div className="mt-10 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        </div>
        <LabeledTextField
          label="Testimony Title"
          placeholder="Give your story a short title"
          name="title"
          required
        />
        <LabeledTextAreaField
          label="Your Testimony"
          hint="What has God been teaching you? How have you seen His grace at work in your life recently?"
          placeholder="Share your story here..."
          name="testimony"
          rows={7}
        />
        <p className="text-xs text-v2-muted">Minimum 100 words</p>

        <div className="border-t border-v2-border pt-5">
          <p className="font-semibold text-sm text-black">
            Sharing Permission
          </p>
          <div className="mt-3">
            <LabeledCheckboxField
              label="I give YEFI permission to share my testimony (website, social media, newsletter)."
              name="permission"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-yef-primary py-4 font-semibold text-xs text-white tracking-[1.5px] uppercase transition-transform duration-200 hover:scale-[1.01] hover:opacity-90"
      >
        Submit My Testimony
      </button>
    </form>
  );
}
