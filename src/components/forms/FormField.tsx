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
        className="h-[54px] w-full rounded-full border border-black/14 bg-white px-[22px] text-[14.5px] text-black placeholder:text-black/38 focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
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
        className="min-h-[120px] w-full rounded-[24px] border border-black/14 bg-white px-[22px] py-[18px] text-[14.5px] text-black placeholder:text-black/38 focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/30"
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
    <label className="flex items-start gap-3 text-[13.5px] text-[#4b5565] leading-[20px]">
      <input
        type="checkbox"
        name={name}
        required
        className="size-5 shrink-0 rounded-[5px] border-[1.5px] border-black/30 text-v2-blue focus:ring-v2-accent"
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
    <label className="flex h-[90px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[16px] border-[1.5px] border-black/20 border-dashed bg-[#fafaf7] px-5 py-[22px] text-center transition-colors hover:border-v2-accent">
      <input type="file" name={name} className="sr-only" />
      <span className="font-semibold text-[14px] text-black/75">{label}</span>
      <span className="text-[12.5px] text-black/40">{hint}</span>
    </label>
  );
}
