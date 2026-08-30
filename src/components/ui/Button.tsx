import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "info" | "amber";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
>;

const variants = {
  primary:
    "border border-emerald-400/50 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-black shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/35 hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  secondary:
    "border border-white/[0.1] light:border-slate-300 bg-slate-800/80 light:bg-slate-100/90 backdrop-blur-md text-slate-200 light:text-slate-800 font-bold hover:border-emerald-400/50 hover:bg-slate-700/80 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-950 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  danger:
    "border border-rose-500/40 light:border-rose-300 bg-rose-500/15 light:bg-rose-100/80 backdrop-blur-md text-rose-300 light:text-rose-800 font-bold hover:bg-gradient-to-r hover:from-rose-500 hover:to-red-600 hover:text-white hover:border-rose-400 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  info:
    "border border-sky-400/40 light:border-sky-300 bg-sky-500/15 light:bg-sky-100/80 backdrop-blur-md text-sky-300 light:text-sky-800 font-bold hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 hover:text-slate-950 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  amber:
    "border border-amber-400/40 light:border-amber-300 bg-amber-500/15 light:bg-amber-100/80 backdrop-blur-md text-amber-300 light:text-amber-800 font-bold hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-slate-950 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-xs font-bold rounded-lg gap-1.5",
  md: "px-4.5 py-2 text-xs sm:text-sm font-bold rounded-xl gap-2",
  lg: "px-5.5 py-2.5 text-sm font-extrabold rounded-xl gap-2.5",
  xl: "px-7 py-3.5 text-base font-black rounded-2xl gap-3",
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        tracking-wide
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-400/40
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:transform-none
        cursor-pointer
        select-none
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}