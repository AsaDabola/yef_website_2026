"use client";

import { useState } from "react";
import SubmissionSuccess from "@/components/forms/SubmissionSuccess";
import { useT } from "@/lib/i18n/client";

type Frequency = "One-Time" | "Monthly" | "Yearly";

const frequencies: Frequency[] = ["One-Time", "Monthly", "Yearly"];
const amounts = [25, 50, 100, 250, 500, 1000];

export default function DonationForm() {
  const t = useT();
  const [frequency, setFrequency] = useState<Frequency>("One-Time");
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const displayAmount = customAmount ? customAmount : amount;

  if (submitted) {
    return (
      <SubmissionSuccess
        className="mx-auto max-w-[900px]"
        title={t("Thank You!")}
        message={t(
          "Your {frequency} gift of {amount} helps students grow in faith, go on mission, and lead others closer to Christ.",
        )
          .replace("{frequency}", t(frequency))
          .replace("{amount}", `$${displayAmount}`)}
      />
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mx-auto max-w-[900px] rounded-2xl border border-v2-border bg-white p-8 sm:p-12"
    >
      <h2 className="font-display font-extrabold text-2xl text-v2-navy">
        {t("SUPPORT Youth Evangelical Fellowship")}
      </h2>
      <p className="mt-2 text-v2-muted-dark-2">
        {t(
          "Your generosity helps students grow in faith, go on mission, and lead others closer to Christ.",
        )}
      </p>

      <div className="mt-8 border-t border-v2-border pt-8">
        <p className="font-semibold text-black">
          {t("How often would you like to give?")}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-full bg-v2-bg p-1">
          {frequencies.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFrequency(option)}
              className={`rounded-full py-2.5 font-semibold text-sm transition-colors ${
                frequency === option
                  ? "bg-v2-blue text-white"
                  : "text-v2-muted-dark-2 hover:text-v2-navy"
              }`}
            >
              {t(option)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="font-semibold text-black">{t("Choose an amount")}</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {amounts.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
              }}
              className={`rounded-xl border py-3 font-semibold transition-colors ${
                amount === value && !customAmount
                  ? "border-v2-blue bg-v2-blue text-white"
                  : "border-v2-border text-v2-navy hover:border-v2-blue"
              }`}
            >
              ${value.toLocaleString()}
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="font-medium text-[13px] text-[#1b1d21]">
            {t("Or enter a custom amount")}
          </span>
          <div className="mt-1.5 flex items-center rounded-[8px] border border-[#d1d6de] bg-[#fafafb] px-3 py-2.5">
            <span className="text-v2-muted">$</span>
            <input
              type="number"
              min={1}
              placeholder={t("Enter amount")}
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              className="ml-2 w-full bg-transparent text-[13px] text-[#1b1d21] placeholder:text-[#9ea3ab] focus:outline-none"
            />
          </div>
        </label>
      </div>

      <div className="mt-8">
        <p className="font-semibold text-black">{t("Your Information")}</p>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="font-medium text-[13px] text-[#1b1d21]">
              {t("Full Name")}
            </span>
            <input
              type="text"
              required
              placeholder={t("First & Last Name")}
              className="mt-2 w-full rounded-xl border border-v2-border px-4 py-3 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
            />
          </label>
          <label className="block">
            <span className="font-medium text-[13px] text-[#1b1d21]">
              {t("Email")}
            </span>
            <input
              type="email"
              required
              placeholder={t("Email Address")}
              className="mt-2 w-full rounded-xl border border-v2-border px-4 py-3 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
            />
          </label>
        </div>
      </div>

      <div className="mt-8">
        <p className="font-semibold text-black">{t("Payment Information")}</p>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="font-medium text-[13px] text-[#1b1d21]">
              {t("Card Number")}
            </span>
            <input
              type="text"
              required
              placeholder="1234 5678 9012 3456"
              className="mt-2 w-full rounded-xl border border-v2-border px-4 py-3 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="font-medium text-[13px] text-[#1b1d21]">
                {t("Expiry")}
              </span>
              <input
                type="text"
                required
                placeholder={t("MM / YY")}
                className="mt-2 w-full rounded-xl border border-v2-border px-4 py-3 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
              />
            </label>
            <label className="block">
              <span className="font-medium text-[13px] text-[#1b1d21]">
                {t("CVC")}
              </span>
              <input
                type="text"
                required
                placeholder={t("CVC")}
                className="mt-2 w-full rounded-xl border border-v2-border px-4 py-3 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
              />
            </label>
          </div>
        </div>
        <p className="mt-3 text-sm text-v2-muted">
          {t("🔒 Your payment is processed securely.")}
        </p>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-[8px] bg-[#0066cf] py-3.5 font-bold text-[14px] text-white uppercase transition-opacity hover:opacity-90"
      >
        {t("Donate $")}
        {displayAmount}
      </button>
    </form>
  );
}
