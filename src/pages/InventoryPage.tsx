export default function InventoryPage() {
  const slots = Array.from({ length: 24 });
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div
        className="theme-hero flex items-center gap-5 rounded-xl backdrop-blur-xl shadow-xl"
        style={{ padding: "2.25rem 2.5rem" }}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-3xl shadow-lg shadow-amber-500/10">
          🎒
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-slate-900">Inventory</h1>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 light:text-amber-700">
              Coming Soon
            </span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
            A complete inventory system for tracking your berries, seeds, and farming resources.
          </p>
        </div>
      </div>

      <div
        className="theme-card relative overflow-hidden rounded-xl backdrop-blur-xl shadow-xl"
        style={{ padding: "2.5rem" }}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/70 light:bg-white/80 backdrop-blur-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-amber-500/20 light:border-amber-300 bg-amber-500/10 light:bg-amber-100 text-3xl shadow-lg">
            🔒
          </div>
          <p className="text-base font-bold text-white light:text-slate-900">Inventory system in development</p>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">BerryMaster is still growing. 🌱</p>
        </div>
        <div className="grid grid-cols-6 gap-3.5 opacity-30 blur-[2px] sm:grid-cols-8">
          {slots.map((_, i) => (
            <div key={i} className="aspect-square rounded-xl border border-slate-700/80 light:border-slate-300 bg-slate-800/60 light:bg-slate-100 flex items-center justify-center text-xl">
              {i % 5 === 0 ? '🍓' : i % 5 === 1 ? '🌱' : i % 5 === 2 ? '🫐' : i % 5 === 3 ? '🍒' : '⚪'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}