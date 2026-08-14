export default function InventoryPage() {
  const slots = Array.from({ length: 24 });
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-slate-900/70 p-6 backdrop-blur-xl">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl">🎒</div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Inventory</h1>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400">Coming Soon</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">A complete inventory system for tracking your berries, seeds, and farming resources.</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/60 backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-2xl">🔒</div>
          <p className="text-sm font-bold text-white">Inventory system in development</p>
          <p className="text-xs text-slate-400">BerryMaster is still growing. 🌱</p>
        </div>
        <div className="grid grid-cols-6 gap-3 opacity-30 blur-[2px] sm:grid-cols-8">
          {slots.map((_, i) => (
            <div key={i} className="aspect-square rounded-xl border border-slate-700 bg-slate-800/60 flex items-center justify-center text-xl">
              {i % 5 === 0 ? '🍓' : i % 5 === 1 ? '🌱' : i % 5 === 2 ? '🫐' : i % 5 === 3 ? '🍒' : '⚪'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}