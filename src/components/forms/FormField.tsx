export function TextField({
  label,
  type = "text",
  name,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={label}
        required={required}
        className="w-full rounded-full border border-v2-border bg-white px-5 py-4 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  rows = 4,
}: {
  label: string;
  name: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <textarea
        name={name}
        placeholder={label}
        rows={rows}
        className="w-full rounded-2xl border border-v2-border bg-white px-5 py-4 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
      />
    </label>
  );
}

export function CheckboxField({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <label className="flex items-start gap-3 text-sm text-v2-muted-dark-2">
      <input
        type="checkbox"
        name={name}
        required
        className="mt-1 size-4 shrink-0 rounded border-v2-border text-v2-blue focus:ring-v2-accent"
      />
      <span>{label}</span>
    </label>
  );
}

export function FileField({
  label,
  hint,
  name,
}: {
  label: string;
  hint: string;
  name: string;
}) {
  return (
    <label className="block cursor-pointer rounded-2xl border border-dashed border-v2-border bg-white px-5 py-6 text-center transition-colors hover:border-v2-accent">
      <input type="file" name={name} className="sr-only" />
      <span className="block font-medium text-v2-navy">{label}</span>
      <span className="mt-1 block text-sm text-v2-muted">{hint}</span>
    </label>
  );
}
