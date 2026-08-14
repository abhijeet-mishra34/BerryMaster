export default function AnalyticsPage() {
  const bars = [65, 40, 80, 55, 90, 35, 70, 50, 85, 45, 75, 60];
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-slate-900/70 p-6 backdrop-blur-xl">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-3xl">📊</div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-sky-400">Coming Soon</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">Detailed farming statistics, harvest insights, and long-term performance analytics.</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-slate-900/60 p-8 backdrop-blur-xl">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/60 backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-500/20 bg-sky-500/10 text-2xl">📈</div>
          <p className="text-sm font-bold text-white">Analytics coming in a future update</p>
          <p className="text-xs text-slate-400">BerryMaster is still growing. 🌱</p>
        </div>
        <div className="space-y-6 opacity-25 blur-[3px]">
          <div className="grid grid-cols-3 gap-4">
            {['Harvest Rate', 'Water Efficiency', 'Yield Score'].map((label) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-black text-emerald-400">--</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="mb-4 text-xs font-semibold text-slate-500">Monthly Harvest Overview</p>
            <div className="flex items-end gap-2 h-32">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-emerald-500/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}