import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "info";
};

const variants = {
  primary:
    "bg-emerald-500 hover:bg-emerald-400 text-slate-950",

  secondary:
    "bg-slate-800 hover:bg-slate-700 text-white",

  danger:
    "bg-red-600 hover:bg-red-500 text-white",

  info:
    "bg-sky-600 hover:bg-sky-500 text-white",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-5 py-3 font-semibold transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}