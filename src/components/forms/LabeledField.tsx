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
      <span className="mb-1.5 block font-medium text-[13px] text-[#1b1d21] leading-[16px]">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-[8px] border border-[#d1d6de] bg-[#fafafb] px-3 py-[9px] text-[13px] leading-[16px] text-[#1b1d21] placeholder:text-[#9ea3ab] focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/20"
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
      <span className="mb-1.5 block font-medium text-[13px] text-[#1b1d21] leading-[16px]">
        {label}
      </span>
      {hint && <span className="mb-1.5 block text-[13px] leading-[16px] text-[#6b737d]">{hint}</span>}
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-[8px] border border-[#d1d6de] bg-[#fafafb] px-3 py-2.5 text-[13px] leading-[16px] text-[#1b1d21] placeholder:text-[#9ea3ab] focus:border-v2-accent focus:outline-none focus:ring-2 focus:ring-v2-accent/20"
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
    <label className="flex items-center gap-2.5 text-[14px] leading-[18px] text-[#1b1d21]">
      <input
        type="checkbox"
        name={name}
        className="size-[18px] shrink-0 rounded-[4px] border-[1.5px] border-[#bfc4cc] text-v2-blue focus:ring-v2-accent"
      />
      <span>{label}</span>
    </label>
  );
}
