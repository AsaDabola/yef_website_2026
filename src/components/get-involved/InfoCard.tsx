export default function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-v2-border bg-white p-8 sm:p-9">
      <p className="font-semibold text-xl text-v2-navy sm:text-2xl">
        {title}
      </p>
      <p className="mt-5 text-v2-muted-dark-2 leading-relaxed">{body}</p>
    </div>
  );
}
