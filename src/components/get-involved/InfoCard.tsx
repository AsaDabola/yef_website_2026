export default function InfoCard({
  title,
  body,
  quote,
  className = "",
}: {
  title: string;
  /** Blank lines in the string are kept, so paragraphs break where the frame breaks them. */
  body: string;
  quote?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-v2-border bg-white px-8 pt-7 pb-9 sm:px-[52px] ${className}`}
    >
      <p className="font-semibold text-[23px] text-black leading-[30px]">
        {title}
      </p>
      <p className="mt-[29px] whitespace-pre-line text-[15px] text-[#4b5565] leading-[24px]">
        {body}
      </p>
      {quote ? (
        <p className="mt-6 whitespace-pre-line font-medium text-[15px] text-yef-primary italic leading-[24px]">
          {quote}
        </p>
      ) : null}
    </div>
  );
}
