type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
      : "bg-slate-800 hover:bg-slate-700 text-white";

  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-5 py-3 font-semibold transition ${styles}`}
    >
      {children}
    </button>
  );
}