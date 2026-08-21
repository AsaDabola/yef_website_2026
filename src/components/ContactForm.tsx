"use client";

import { useState } from "react";
import {
  LabeledTextAreaField,
  LabeledTextField,
} from "@/components/forms/LabeledField";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-v2-border bg-white p-10 text-center sm:p-14">
        <h2 className="font-display font-extrabold text-3xl text-v2-navy">
          Message Sent
        </h2>
        <p className="mx-auto mt-4 max-w-md text-v2-muted-dark-2 leading-relaxed">
          Thanks for reaching out. Our team will get back to you within 1–2
          business days.
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
      <h1 className="font-display font-extrabold text-3xl text-v2-navy tracking-[-0.5px] sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 max-w-xl text-v2-muted-dark-2 leading-relaxed">
        Have a question about YEFI, a mission trip, or how to get your church
        involved? Send us a message and our team will get back to you within
        1&ndash;2 business days.
      </p>
      <p className="mt-3 text-v2-muted-dark-2">
        <a href="mailto:hello@yefi.org" className="text-yef-primary hover:opacity-80">
          hello@yefi.org
        </a>{" "}
        &middot;{" "}
        <a href="tel:+15550132847" className="text-yef-primary hover:opacity-80">
          +1 (555) 013-2847
        </a>{" "}
        &middot; 123 Faith Ave, Springfield
      </p>

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
          <LabeledTextField
            label="Subject*"
            placeholder="What's this about?"
            name="subject"
            required
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
        Send Message
      </button>
    </form>
  );
}
