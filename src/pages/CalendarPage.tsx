export default function CalendarPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const cells = Array.from({ length: 35 });
  const highlightedCells = [2, 5, 9, 14, 18, 22, 27, 30];
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-slate-900/70 p-6 backdrop-blur-xl">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl">📅</div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Calendar</h1>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-400">Coming Soon</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">Track planting schedules, watering times, and harvest windows for all your characters.</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/60 backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-2xl">🗓️</div>
          <p className="text-sm font-bold text-white">Calendar coming in a future update</p>
          <p className="text-xs text-slate-400">BerryMaster is still growing. 🌱</p>
        </div>
        <div className="opacity-25 blur-[2px]">
          <div className="mb-3 grid grid-cols-7 gap-2">
            {days.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {cells.map((_, i) => (
              <div key={i} className={`aspect-square rounded-xl border text-center text-xs flex items-center justify-center font-medium ${
                highlightedCells.includes(i)
                  ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-600'
              }`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}