/** The small-print data-use disclosure shown near a form's submit button. */
export function PrivacyNote({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] text-black/45 leading-[18px]">{children}</p>;
}
