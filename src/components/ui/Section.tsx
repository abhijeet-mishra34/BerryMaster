type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export default function Section({
  title,
  subtitle,
  children,
  action,
}: SectionProps) {
  return (
    <section
      style={{
        padding: "1.75rem 2rem",
      }}
      className="
        theme-card
        relative
        overflow-hidden
        rounded-xl
        backdrop-blur-2xl
        transition-all
        duration-200
      "
    >
      {/* Subtle ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Section Header */}
      <div className="mb-8 flex flex-col justify-between gap-3 pl-2 sm:pl-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-3 text-base font-bold tracking-tight text-white light:text-slate-900">
            <span className="h-5 w-1 shrink-0 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span>{title}</span>
          </h2>

          {subtitle && (
            <p className="mt-1.5 pl-4 text-xs text-slate-400 light:text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>

      <div className="px-2 sm:px-3">
        {children}
      </div>
    </section>
  );
}