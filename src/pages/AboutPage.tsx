import { Sparkles, ShieldAlert, Wrench, UserCheck, PackageCheck, CheckCircle2 } from "lucide-react";
import berryMasterIcon from "../assets/brand/berrymaster-icon.png";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* Page Banner Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 p-8 backdrop-blur-xl shadow-xl">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-6">
          <img
            src={berryMasterIcon}
            alt="BerryMaster logo"
            className="h-16 w-16 rounded-2xl object-cover shadow-lg ring-2 ring-emerald-500/30 shrink-0"
          />

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              About <span className="text-emerald-400">BerryMaster</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              A smarter, streamlined companion for your PokeMMO berry farming journey.
            </p>
          </div>
        </div>
      </div>

      {/* Main Intro Card */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          Hey fellow farmers!
        </h2>

        <p className="mt-4 leading-relaxed text-sm text-slate-300">
          Abhijeet this side (IGN: <span className="font-semibold text-emerald-400">MastAbhi</span>), and I created BerryMaster to give PokeMMO berry farmers a clearer, effortless way to organize and monitor farming operations.
        </p>

        <p className="mt-3 leading-relaxed text-sm text-slate-400">
          With BerryMaster, managing multiple farming accounts and tracking harvest cycles becomes straightforward:
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Manage multiple characters & accounts in one place",
            "Track planted berries per character plot",
            "Monitor watering schedules & stage progress",
            "Keep harvest and wilt timer alarms precise",
            "Track seed & berry inventory effortlessly",
            "Review farming logs and profit analytics",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 rounded-xl border border-slate-800/60 bg-slate-950/40 p-3 text-xs text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Unofficial App & Safety Notice */}
      <section className="rounded-3xl border border-amber-500/30 bg-amber-950/20 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-amber-300">Important Safety Notice</h2>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-300">
          BerryMaster is an independent, fan-made external utility created for the PokeMMO community. It is <strong>not</strong> affiliated with, endorsed by, or connected to PokeMMO or its developers.
        </p>

        <div className="mt-4 rounded-2xl border border-amber-500/20 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold text-amber-300 mb-2">BerryMaster operates 100% externally and DOES NOT:</p>
          <ul className="grid gap-2 sm:grid-cols-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Modify the PokeMMO game client
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Inject code into game processes
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Access or alter local game files
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Automate or bot in-game actions
            </li>
          </ul>
        </div>
      </section>

      {/* Built With Tech Stack */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <Wrench className="h-5 w-5 text-emerald-400" />
          Built With
        </h2>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "React 19", role: "UI Framework" },
            { name: "TypeScript", role: "Type Safety" },
            { name: "Vite", role: "Lightning Build" },
            { name: "Tailwind CSS", role: "Modern Styling" },
          ].map((tech) => (
            <div key={tech.name} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-center">
              <p className="text-sm font-bold text-white">{tech.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{tech.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Note */}
      <section className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Created By Abhijeet Mishra</h2>
            <p className="text-xs text-emerald-400 font-semibold">IGN: MastAbhi</p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-300">
          This is a project I poured my heart into. As a berry farmer myself, I felt the struggle of managing multiple characters and tracking watering cycles. I hope this tool brings convenience and joy to everyone in the farming community!
        </p>

        <p className="mt-3 text-xs font-semibold text-emerald-400">
          Abhi Signing Off ✌️!
        </p>
      </section>

      {/* App Version Card */}
      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-md shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PackageCheck className="h-6 w-6 text-emerald-400" />
          <div>
            <h3 className="text-sm font-bold text-white">BerryMaster Release Candidate</h3>
            <p className="text-xs text-slate-400">Desktop & Mobile Web Build</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-extrabold text-emerald-400">
          v1.0.0
        </span>
      </section>
    </div>
  );
}
