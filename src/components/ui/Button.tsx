import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "info";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
>;

const variants = {
  primary:
    "border border-emerald-400/40 bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]",
  secondary:
    "border border-slate-700 light:border-slate-300 bg-slate-800/80 light:bg-slate-100 text-slate-200 light:text-slate-700 hover:border-slate-600 light:hover:border-slate-400 hover:bg-slate-700 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-900 active:scale-[0.98]",
  danger:
    "border border-red-500/30 light:border-red-200 bg-red-500/10 light:bg-red-50 text-red-300 light:text-red-700 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98]",
  info:
    "border border-sky-500/30 light:border-sky-200 bg-sky-500/10 light:bg-sky-50 text-sky-300 light:text-sky-700 hover:bg-sky-500 hover:text-slate-950 light:hover:text-white hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-semibold",
  md: "px-4.5 py-2.5 text-xs font-bold",
  lg: "px-5 py-3 text-sm font-bold",
  xl: "px-7 py-3.5 text-base font-bold",
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
        inline-flex
        items-center
        justify-center
        rounded-xl
        tracking-wide
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500/40
        disabled:cursor-not-allowed
        disabled:opacity-50
        cursor-pointer
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}