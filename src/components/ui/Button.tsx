import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;

  variant?: "primary" | "secondary" | "danger" | "info";

  className?: string;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
>;

const variants = {
  primary:
    "bg-emerald-500 text-slate-950 hover:bg-emerald-400",

  secondary:
    "bg-slate-800 text-white hover:bg-slate-700",

  danger:
    "bg-red-600 text-white hover:bg-red-500",

  info:
    "bg-sky-600 text-white hover:bg-sky-500",
};

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg
        px-5
        py-3
        font-semibold
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}