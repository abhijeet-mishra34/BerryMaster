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
        background: `linear-gradient(160deg, rgba(15,23,42,0.75) 0%, rgba(2,6,23,0.85) 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px -8px rgba(0,0,0,0.5)`,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.07]
        p-6
        sm:p-8
        backdrop-blur-2xl
        transition-all
        duration-200
      "
    >
      {/* Subtle ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Section Header */}
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white">
            <span className="h-[18px] w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 pl-[18px] text-xs text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {action && <div>{action}</div>}
      </div>

      {children}
    </section>
  );
}