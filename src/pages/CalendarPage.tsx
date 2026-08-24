export default function CalendarPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const cells = Array.from({ length: 35 });
  const highlightedCells = [2, 5, 9, 14, 18, 22, 27, 30];
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div
        className="theme-hero flex items-center gap-4 sm:gap-5 rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-xl"
      >
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-2xl sm:text-3xl shadow-lg shadow-violet-500/10">
          📅
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white light:text-slate-900 truncate">Calendar</h1>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-violet-400 light:text-violet-700">
              Coming Soon
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
            Track planting schedules, watering times, and harvest windows for all your characters.
          </p>
        </div>
      </div>

      <div
        className="theme-card relative overflow-hidden rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-xl"
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/70 light:bg-white/80 backdrop-blur-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-violet-500/20 light:border-violet-300 bg-violet-500/10 light:bg-violet-100 text-3xl shadow-lg">
            🗓️
          </div>
          <p className="text-base font-bold text-white light:text-slate-900">Calendar coming in a future update</p>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">BerryMaster is still growing. 🌱</p>
        </div>
        <div className="opacity-25 blur-[2px]">
          <div className="mb-4 grid grid-cols-7 gap-2.5">
            {days.map((d) => (
              <div key={d} className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 light:text-slate-400">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2.5">
            {cells.map((_, i) => (
              <div key={i} className={`aspect-square rounded-xl border text-center text-xs flex items-center justify-center font-medium ${
                highlightedCells.includes(i)
                  ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-400 font-bold'
                  : 'border-slate-800 light:border-slate-300 bg-slate-900/60 light:bg-slate-100 text-slate-600 light:text-slate-700'
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