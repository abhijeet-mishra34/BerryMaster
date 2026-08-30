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
    "border border-emerald-400/60 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-black shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.55)] hover:border-emerald-300 hover:brightness-105 hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.96]",
  secondary:
    "border border-slate-700/90 light:border-slate-300 bg-slate-800/95 light:bg-slate-100 text-slate-200 light:text-slate-800 font-extrabold hover:border-emerald-400/60 hover:bg-slate-700 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-950 hover:shadow-[0_6px_22px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.96]",
  danger:
    "border border-rose-500/50 light:border-rose-300 bg-rose-500/20 light:bg-rose-100 text-rose-300 light:text-rose-800 font-extrabold hover:bg-gradient-to-r hover:from-rose-500 hover:to-red-600 hover:text-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,63,94,0.55)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.96]",
  info:
    "border border-sky-400/50 light:border-sky-300 bg-sky-500/20 light:bg-sky-100 text-sky-300 light:text-sky-800 font-extrabold hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 hover:text-slate-950 hover:border-sky-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.55)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.96]",
  amber:
    "border border-amber-400/50 light:border-amber-300 bg-amber-500/20 light:bg-amber-100 text-amber-300 light:text-amber-800 font-extrabold hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-slate-950 hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.55)] hover:-translate-y-1 active:translate-y-0.5 active:scale-[0.96]",
};

const sizes = {
  sm: "px-4 py-2 text-xs sm:text-sm font-bold rounded-xl gap-2",
  md: "px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-extrabold rounded-xl gap-2.5",
  lg: "px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-black rounded-2xl gap-3",
  xl: "px-8 sm:px-10 py-4.5 sm:py-5 text-lg sm:text-xl font-black rounded-2xl gap-3.5",
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