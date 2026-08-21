export function LabeledTextField({
  label,
  placeholder,
  type = "text",
  name,
  required,
  half,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  required?: boolean;
  half?: boolean;
}) {
  return (
    <label className={`block ${half ? "flex-1" : ""}`}>
      <span className="mb-2 block font-medium text-sm text-v2-navy">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-v2-border bg-white px-3 py-2.5 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/20"
      />
    </label>
  );
}

export function LabeledTextAreaField({
  label,
  placeholder,
  name,
  rows = 4,
  hint,
}: {
  label: string;
  placeholder: string;
  name: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-medium text-sm text-v2-navy">
        {label}
      </span>
      {hint && <span className="mb-2 block text-sm text-v2-muted">{hint}</span>}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-v2-border bg-white px-3 py-2.5 text-v2-navy placeholder:text-v2-muted focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/20"
      />
    </label>
  );
}

export function LabeledCheckboxField({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <label className="flex items-start gap-2.5 text-sm text-v2-muted-dark-2">
      <input
        type="checkbox"
        name={name}
        className="mt-0.5 size-[18px] shrink-0 rounded border-v2-border text-v2-blue focus:ring-v2-accent"
      />
      <span>{label}</span>
    </label>
  );
}
