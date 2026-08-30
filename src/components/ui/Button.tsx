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
    "border border-emerald-400/50 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-[0_2px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_22px_rgba(16,185,129,0.5)] hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  secondary:
    "border border-slate-700/80 light:border-slate-300 bg-slate-800/90 light:bg-slate-100 text-slate-200 light:text-slate-800 font-bold hover:border-emerald-500/50 hover:bg-slate-700/90 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-950 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  danger:
    "border border-rose-500/40 light:border-rose-300 bg-rose-500/15 light:bg-rose-50 text-rose-300 light:text-rose-700 font-bold hover:bg-gradient-to-r hover:from-rose-500 hover:to-red-600 hover:text-white hover:border-rose-400 hover:shadow-[0_4px_20px_rgba(244,63,94,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  info:
    "border border-sky-400/40 light:border-sky-300 bg-sky-500/15 light:bg-sky-50 text-sky-300 light:text-sky-700 font-bold hover:bg-gradient-to-r hover:from-sky-500 hover:to-cyan-500 hover:text-slate-950 hover:border-sky-300 hover:shadow-[0_4px_20px_rgba(14,165,233,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
  amber:
    "border border-amber-400/40 light:border-amber-300 bg-amber-500/15 light:bg-amber-50 text-amber-300 light:text-amber-700 font-bold hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-500 hover:text-slate-950 hover:border-amber-300 hover:shadow-[0_4px_20px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-xs font-semibold rounded-lg",
  md: "px-5 py-2.5 text-xs font-bold rounded-xl",
  lg: "px-6 py-3 text-sm font-extrabold rounded-xl",
  xl: "px-8 py-3.5 text-base font-black rounded-2xl",
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