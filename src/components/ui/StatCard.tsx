import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "emerald" | "blue" | "amber" | "red";
};

const colorClasses = {
  emerald: "text-emerald-400",
  blue: "text-sky-400",
  amber: "text-amber-400",
  red: "text-red-400",
};

export default function StatCard({
  title,
  value,
  icon,
  color = "emerald",
}: StatCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-800
        bg-gradient-to-b
        from-slate-900
        to-slate-950
        p-8
        text-center
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-emerald-500
        hover:shadow-xl
        hover:shadow-emerald-500/10
      "
    >
      <div
        className={`
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-slate-800
          text-3xl
          transition-transform
          duration-300
          group-hover:scale-110
          ${colorClasses[color]}
        `}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-medium tracking-wide text-slate-400 uppercase">
        {title}
      </h3>

      <p
        className={`mt-3 text-4xl font-bold ${colorClasses[color]}`}
      >
        {value}
      </p>
    </div>
  );
}