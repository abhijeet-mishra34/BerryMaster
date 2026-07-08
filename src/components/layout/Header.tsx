export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-4">
      <div>
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Welcome back! 🌿
        </p>
      </div>

      <div className="flex items-center gap-4 text-2xl">
        <button>🔔</button>
        <button>⚙️</button>
        <button>👤</button>
      </div>
    </header>
  );
}