export default function AnalyticsPage() {
  const bars = [65, 40, 80, 55, 90, 35, 70, 50, 85, 45, 75, 60];
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div
        className="theme-hero flex items-center gap-4 sm:gap-5 rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-xl"
      >
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-2xl sm:text-3xl shadow-lg shadow-sky-500/10">
          📊
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white light:text-slate-900 truncate">Analytics</h1>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-sky-400 light:text-sky-700">
              Coming Soon
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
            Detailed farming statistics, harvest insights, and long-term performance analytics.
          </p>
        </div>
      </div>

      <div
        className="theme-card relative overflow-hidden rounded-xl p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-xl"
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/70 light:bg-white/80 backdrop-blur-xs">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-sky-500/20 light:border-sky-300 bg-sky-500/10 light:bg-sky-100 text-3xl shadow-lg">
            📈
          </div>
          <p className="text-base font-bold text-white light:text-slate-900">Analytics coming in a future update</p>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">BerryMaster is still growing. 🌱</p>
        </div>
        <div className="space-y-6 opacity-25 blur-[3px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {['Harvest Rate', 'Water Efficiency', 'Yield Score'].map((label) => (
              <div key={label} className="rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900 light:bg-slate-100 p-5">
                <p className="text-xs font-semibold text-slate-500 light:text-slate-600">{label}</p>
                <p className="mt-2 text-2xl font-black text-emerald-400 light:text-emerald-700">--</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-800 light:border-slate-300 bg-slate-900 light:bg-slate-100 p-6">
            <p className="mb-4 text-xs font-semibold text-slate-500 light:text-slate-600">Monthly Harvest Overview</p>
            <div className="flex items-end gap-2.5 h-32">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg bg-emerald-500/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}