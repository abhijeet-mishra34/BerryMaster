import {
  Sparkles,
  ShieldAlert,
  Wrench,
  UserCheck,
  PackageCheck,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Smartphone,
} from "lucide-react";
import berryMasterIcon from "../assets/brand/berrymaster-icon.png";
import { CURRENT_APP_VERSION } from "../services/updateService";
import { openExternalUrl } from "../utils/urlHelper";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
      {/* Page Banner Header */}
      <div
        className="
          theme-hero
          relative
          overflow-hidden
          rounded-xl
          p-8
          sm:p-10
          backdrop-blur-xl
          shadow-xl
        "
      >
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={berryMasterIcon}
            alt="BerryMaster logo"
            className="h-20 w-20 object-contain drop-shadow-[0_4px_24px_rgba(16,185,129,0.4)] shrink-0 transition-transform duration-300 hover:scale-105"
          />

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white light:text-slate-900 flex items-center gap-2.5">
              About <span className="text-emerald-400 light:text-emerald-600">BerryMaster</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300 light:text-slate-600 max-w-2xl">
              A comprehensive, modern companion crafted for your PokeMMO berry farming journeys.
            </p>
          </div>
        </div>
      </div>

      {/* Main Intro Card */}
      <section className="theme-card rounded-xl p-8 sm:p-10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 light:text-emerald-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white light:text-slate-900">
              Empowering PokeMMO Berry Farmers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">
              Designed for streamlined farm management, accurate timers, and optimal harvest yields.
            </p>
          </div>
        </div>

        <p className="leading-relaxed text-sm sm:text-base text-slate-300 light:text-slate-700">
          BerryMaster was created to give farmers a clean, effortless way to organize plots, track multi-character accounts, and stay ahead of watering countdowns. Whether you are running a single plot or managing extensive farming operations, BerryMaster keeps your schedules aligned and yields maximized.
        </p>

        <p className="mt-4 leading-relaxed text-sm sm:text-base font-semibold text-emerald-400 light:text-emerald-700">
          Core capabilities and tools at a glance:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Manage multiple character profiles and alt accounts in one place",
            "Track planted berries per character plot with live stage indicators",
            "Monitor precise watering countdowns and dry soil alerts",
            "Prevent crop loss with harvest window and wilt alarm notifications",
            "Track berry, seed, and tool inventory with smart auto-deductions",
            "Review historical farming logs and profit analytics over time",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3.5 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-950/50 light:bg-slate-50 p-4.5 text-sm text-slate-200 light:text-slate-800 leading-relaxed shadow-xs transition-all hover:border-emerald-500/30 hover:bg-slate-950/70 light:hover:bg-slate-100"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-400 light:text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Unofficial App & Safety Notice */}
      <section className="theme-card rounded-xl border border-amber-500/25 light:border-amber-200 bg-amber-950/15 light:bg-amber-50/50 p-8 sm:p-10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 light:bg-amber-100 text-amber-400 light:text-amber-700 border border-amber-500/30 light:border-amber-200">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-300 light:text-amber-800">
              Important Safety Notice
            </h2>
            <p className="text-xs sm:text-sm text-amber-400/80 light:text-amber-700">
              100% External & Safe Companion Application
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-slate-300 light:text-slate-700">
          BerryMaster is an independent, fan-made external utility built for the PokeMMO community. It is <strong>not</strong> affiliated with, endorsed by, or connected to PokeMMO or its developers.
        </p>

        <div className="mt-6 rounded-xl border border-amber-500/20 light:border-amber-200 bg-slate-950/70 light:bg-white p-6 shadow-xs">
          <p className="text-sm font-bold text-amber-300 light:text-amber-800 mb-3">
            BerryMaster operates 100% externally and strictly DOES NOT:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm text-slate-300 light:text-slate-700">
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
              <span>Modify the PokeMMO game client</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
              <span>Inject code into game memory or processes</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
              <span>Access, read, or alter local game files</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
              <span>Automate, macro, or bot in-game actions</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Built With Tech Stack */}
      <section className="theme-card rounded-xl p-8 sm:p-10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 light:text-emerald-600">
            <Wrench className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white light:text-slate-900">
              Built With Modern Technologies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">
              Engineered for speed, offline reliability, and crisp performance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "React 19", role: "Component Architecture" },
            { name: "TypeScript", role: "End-to-End Type Safety" },
            { name: "Vite", role: "High-Speed Build Pipeline" },
            { name: "Tailwind CSS", role: "Responsive UI System" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="rounded-xl border border-slate-800 light:border-slate-200 bg-slate-950/50 light:bg-slate-50 p-5 text-center transition-all hover:border-emerald-500/30 hover:bg-slate-950/80 light:hover:bg-slate-100 shadow-xs"
            >
              <p className="text-base font-bold text-white light:text-slate-900">{tech.name}</p>
              <p className="text-xs text-slate-400 light:text-slate-500 mt-1">{tech.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Creator Note */}
      <section className="theme-card rounded-xl p-8 sm:p-10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3.5 mb-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 light:bg-emerald-100 text-emerald-400 light:text-emerald-700 border border-emerald-500/30 light:border-emerald-200">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white light:text-slate-900">
              Created By Abhijeet Mishra
            </h2>
            <p className="text-xs sm:text-sm text-emerald-400 light:text-emerald-700 font-semibold">
              IGN: MastAbhi
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-slate-300 light:text-slate-700">
          This project was developed with a genuine passion for the game. As an active berry farmer, I experienced first-hand the challenges of tracking multiple characters, remembering watering intervals, and juggling complex recipe formulas. I hope BerryMaster brings clarity, convenience, and enjoyment to every farmer in the PokeMMO community!
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-800 light:border-slate-200 pt-5">
          <p className="text-sm font-bold text-emerald-400 light:text-emerald-700">
            Happy Farming & Good Luck with Your Harvests! 🌿
          </p>
          <p className="text-xs font-mono text-slate-500 light:text-slate-600">
            Abhi signing off ✌️
          </p>
        </div>
      </section>

      {/* App Version Card */}
      <section className="theme-card rounded-xl border border-emerald-500/30 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50/60 p-7 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 light:text-emerald-600 border border-emerald-500/20">
              <PackageCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white light:text-slate-900">
                BerryMaster Official Release
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">
                Desktop Application & Mobile APK
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-extrabold text-emerald-400 light:text-emerald-700">
            v{CURRENT_APP_VERSION}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/[0.08] light:border-slate-200">
          <button
            type="button"
            onClick={() =>
              openExternalUrl(
                "https://github.com/abhijeet-mishra34/BerryMaster/releases/latest/download/BerryMaster-Windows-Setup.exe"
              )
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-sky-400/40
              bg-sky-500
              px-5
              py-3
              text-xs
              font-bold
              text-slate-950
              shadow-sm
              shadow-sky-500/20
              hover:bg-sky-400
              hover:shadow-md
              hover:shadow-sky-500/30
              transition-all
              cursor-pointer
              active:scale-95
            "
          >
            <Monitor className="h-4 w-4" />
            <span>Download Windows (.exe)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              openExternalUrl(
                "https://github.com/abhijeet-mishra34/BerryMaster/releases/latest/download/BerryMaster-universal.apk"
              )
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-400/40
              bg-emerald-500
              px-5
              py-3
              text-xs
              font-bold
              text-slate-950
              shadow-sm
              shadow-emerald-500/20
              hover:bg-emerald-400
              hover:shadow-md
              hover:shadow-emerald-500/30
              transition-all
              cursor-pointer
              active:scale-95
            "
          >
            <Smartphone className="h-4 w-4" />
            <span>Download Android (.apk)</span>
          </button>

          <button
            type="button"
            onClick={() =>
              openExternalUrl(
                "https://github.com/abhijeet-mishra34/BerryMaster/releases"
              )
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-700
              light:border-slate-300
              bg-slate-800/80
              light:bg-white
              px-5
              py-3
              text-xs
              font-bold
              text-slate-200
              light:text-slate-800
              hover:bg-slate-700
              light:hover:bg-slate-100
              hover:text-white
              light:hover:text-slate-900
              transition-all
              cursor-pointer
              active:scale-95
            "
          >
            <ExternalLink className="h-4 w-4" />
            <span>GitHub Releases</span>
          </button>
        </div>
      </section>
    </div>
  );
}
