import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "emerald" | "blue" | "amber" | "red";
};

const colorStyles = {
  emerald: {
    text: "text-emerald-400 light:text-emerald-600",
    valueGlow: "drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] light:drop-shadow-none",
    iconBg: "bg-emerald-500/15 light:bg-emerald-50 border-emerald-400/30 light:border-emerald-200",
    iconColor: "text-emerald-400 light:text-emerald-600",
    borderHover: "hover:border-emerald-500/50",
    shadowHover: "hover:shadow-[0_8px_32px_-8px_rgba(16,185,129,0.25)]",
    topLine: "from-emerald-500 to-teal-400",
    dot: "bg-emerald-400",
    glow: "rgba(16,185,129,0.12)",
  },
  blue: {
    text: "text-sky-400 light:text-sky-600",
    valueGlow: "drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] light:drop-shadow-none",
    iconBg: "bg-sky-500/15 light:bg-sky-50 border-sky-400/30 light:border-sky-200",
    iconColor: "text-sky-400 light:text-sky-600",
    borderHover: "hover:border-sky-500/50",
    shadowHover: "hover:shadow-[0_8px_32px_-8px_rgba(14,165,233,0.25)]",
    topLine: "from-sky-500 to-cyan-400",
    dot: "bg-sky-400",
    glow: "rgba(14,165,233,0.12)",
  },
  amber: {
    text: "text-amber-400 light:text-amber-600",
    valueGlow: "drop-shadow-[0_0_12px_rgba(251,191,36,0.35)] light:drop-shadow-none",
    iconBg: "bg-amber-500/15 light:bg-amber-50 border-amber-400/30 light:border-amber-200",
    iconColor: "text-amber-400 light:text-amber-600",
    borderHover: "hover:border-amber-500/50",
    shadowHover: "hover:shadow-[0_8px_32px_-8px_rgba(245,158,11,0.25)]",
    topLine: "from-amber-500 to-yellow-400",
    dot: "bg-amber-400",
    glow: "rgba(245,158,11,0.12)",
  },
  red: {
    text: "text-red-400 light:text-red-600",
    valueGlow: "drop-shadow-[0_0_12px_rgba(248,113,113,0.35)] light:drop-shadow-none",
    iconBg: "bg-red-500/15 light:bg-red-50 border-red-400/30 light:border-red-200",
    iconColor: "text-red-400 light:text-red-600",
    borderHover: "hover:border-red-500/50",
    shadowHover: "hover:shadow-[0_8px_32px_-8px_rgba(239,68,68,0.25)]",
    topLine: "from-red-500 to-rose-400",
    dot: "bg-red-400",
    glow: "rgba(239,68,68,0.12)",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  color = "emerald",
}: StatCardProps) {
  const style = colorStyles[color];

  return (
    <div
      className={`
        theme-card
        card-shine
        group
        relative
        flex
        min-h-[140px]
        sm:min-h-[170px]
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        p-4
        sm:p-6
        text-center
        backdrop-blur-3xl
        transition-all
        duration-300
        hover:-translate-y-1
        ${style.borderHover}
        ${style.shadowHover}
      `}
    >
      {/* Top gradient accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${style.topLine}`}
      />

      {/* Subtle inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top, ${style.glow} 0%, transparent 60%)` }}
      />

      {/* Icon */}
      <div
        className={`
          relative
          z-10
          mb-3
          sm:mb-4
          flex
          h-11
          w-11
          sm:h-13
          sm:w-13
          items-center
          justify-center
          rounded-xl
          sm:rounded-2xl
          border
          ${style.iconBg}
          ${style.iconColor}
          transition-transform
          duration-300
          group-hover:scale-110
          shadow-xs
        `}
      >
        <div className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-slate-400 light:text-slate-600">
        {title}
      </h3>

      {/* Value */}
      <p
        className={`
          relative
          z-10
          mt-1.5
          sm:mt-2
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-black
          tracking-tight
          ${style.text}
          ${style.valueGlow}
        `}
      >
        {value}
      </p>

      {/* Bottom status */}
      <div className="relative z-10 mt-4 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 light:text-slate-500 uppercase tracking-wider pt-3 w-full justify-center">
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot} animate-pulse`} />
        Updated
      </div>
    </div>
  );
}