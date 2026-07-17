type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        p-8
        shadow-xl
        shadow-black/20
      "
    >
      <div className="mb-8 space-y-3">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      {children}
    </section>
  );
}