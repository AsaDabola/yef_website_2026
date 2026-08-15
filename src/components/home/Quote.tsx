export default function Quote() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1800px] px-6 py-16 lg:px-16 lg:py-20">
        <div className="flex flex-col items-start gap-2 text-yef-navy sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <h2 className="max-w-3xl font-extrabold text-4xl leading-tight tracking-[-1px] sm:text-5xl lg:text-6xl">
            <span className="block">Young People Rising</span>
            <span className="block font-serif font-bold italic">
              Like the Morning Dew
            </span>
          </h2>
          <p className="whitespace-nowrap font-bold text-2xl text-yef-navy sm:text-3xl lg:text-4xl">
            Psalm 110:3
          </p>
        </div>
      </div>
    </section>
  );
}
