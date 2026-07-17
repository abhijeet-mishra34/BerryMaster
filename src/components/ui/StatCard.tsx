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

const backgroundClasses = {
  emerald: "bg-emerald-500/10",
  blue: "bg-sky-500/10",
  amber: "bg-amber-500/10",
  red: "bg-red-500/10",
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
    flex
    min-h-[220px]
    flex-col
    items-center
    justify-center
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
          rounded-2xl
          ${backgroundClasses[color]}
          text-3xl
          transition-transform
          duration-300
          group-hover:scale-110
          ${colorClasses[color]}
        `}
      >
        {icon}
      </div>

      <h3
        className="
          mt-5
          text-xs
          font-semibold
          uppercase
          tracking-[0.18em]
          text-slate-500
        "
      >
        {title}
      </h3>

      <p
        className={`
          mt-2
          text-4xl
          font-bold
          tracking-tight
          ${colorClasses[color]}
        `}
      >
        {value}
      </p>
    </div>
  );
}