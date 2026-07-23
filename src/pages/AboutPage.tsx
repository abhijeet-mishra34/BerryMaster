export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          rounded-3xl
          border
          border-white/[0.08]
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
          p-8
          shadow-xl
          shadow-black/10
        "
      >

        <div className="flex items-start gap-5">

          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500/10
              text-3xl
              shadow-inner
            "
          >
            🍓
          </div>

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-sky-300">
              About BerryMaster
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              A smarter way to manage your berry farming journey.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          About BerryMaster
      ===================================== */}

      <section
        className="
          rounded-3xl
          border
          border-white/[0.08]
          bg-slate-900/70
          p-8
          shadow-xl
          shadow-black/10
        "
      >

        <h2 className="text-2xl font-bold text-white">
          🍓 Hey fellow farmers!
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          Abhijeet this side (IGN: MastAbhi), and today I want to introduce
          you to a new companion for your berry farming journey.
        </p>

        <p className="mt-4 leading-7 text-slate-400">
          BerryMaster is a farming management tool built for PokeMMO players
          who want a clearer way to organize and monitor their berry farming
          activities.
        </p>

        <p className="mt-5 font-semibold text-slate-300">
          With BerryMaster, you can:
        </p>

        <ul className="mt-4 space-y-3">

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Manage multiple characters and accounts in one place.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Track which berries are planted on each character.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Monitor watering schedules and farming progress.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Keep track of harvest and wilt timers.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Manage your berry collection.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Review recent farming activity.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-400">
            <span className="mt-1 text-emerald-400">•</span>
            <span>Organize your entire farming operation more efficiently.</span>
          </li>

        </ul>

        <p className="mt-6 leading-7 text-slate-400">
          Whether you're managing a few characters or farming across multiple
          accounts, BerryMaster is designed to make the process simpler,
          clearer, and easier to manage.
        </p>

      </section>


      {/* =====================================
          Unofficial App Notice
      ===================================== */}

      <section
        className="
          rounded-3xl
          border
          border-amber-500/30
          bg-amber-500/[0.05]
          p-8
          shadow-lg
          shadow-amber-950/10
        "
      >

        <div className="flex items-center gap-3">

          <span className="text-2xl">
            ⚠️
          </span>

          <h2 className="text-2xl font-bold text-amber-400">
            Important Notice
          </h2>

        </div>

        <p className="mt-5 leading-7 text-slate-300">
          BerryMaster is an independent, fan-made project created for the
          PokeMMO community. It is not affiliated with, endorsed by, sponsored
          by, or officially connected to PokeMMO or its developers.
        </p>

        <p className="mt-5 leading-7 text-slate-300">
          BerryMaster operates entirely as an external farming management tool.
          It does not:
        </p>

        <ul className="mt-4 space-y-3">

          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 text-amber-400">→</span>
            <span>Modify the PokeMMO game client.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 text-amber-400">→</span>
            <span>Inject code into or interact with the game client.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 text-amber-400">→</span>
            <span>Access or alter game files.</span>
          </li>

          <li className="flex items-start gap-3 text-slate-300">
            <span className="mt-1 text-amber-400">→</span>
            <span>Interfere with gameplay or game processes.</span>
          </li>

        </ul>

        <p className="mt-6 leading-7 text-slate-300">
          The application is designed solely to help players organize and
          manage their berry farming information externally.
        </p>

      </section>


      {/* =====================================
          Built With
      ===================================== */}

      <section
        className="
          rounded-3xl
          border
          border-white/[0.08]
          bg-slate-900/70
          p-8
          shadow-xl
          shadow-black/10
        "
      >

        <h2 className="text-2xl font-bold text-white">
          🛠️ Built With
        </h2>

        <ul className="mt-5 space-y-3">

          <li className="flex items-center gap-3 text-slate-400">
            <span className="text-xl">⚛️</span>
            <span>React</span>
          </li>

          <li className="flex items-center gap-3 text-slate-400">
            <span className="text-xl">📘</span>
            <span>TypeScript</span>
          </li>

          <li className="flex items-center gap-3 text-slate-400">
            <span className="text-xl">⚡</span>
            <span>Vite</span>
          </li>

          <li className="flex items-center gap-3 text-slate-400">
            <span className="text-xl">🎨</span>
            <span>Tailwind CSS</span>
          </li>

        </ul>

      </section>
             {/* =====================================
          Feedback & Support
      ===================================== */}

      <section
        className="
          rounded-2xl
          border
          border-sky-500/20
          bg-sky-500/[0.04]
          p-6
        "
      >

        <h2 className="text-xl font-semibold text-sky-300">
          💬 Feedback & Support
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          Found a bug, have a suggestion, or have an idea that could make
          BerryMaster better?
        </p>

        <p className="mt-4 leading-7 text-slate-400">
          Feedback from the community will help shape the future of
          BerryMaster and improve the experience for berry farmers everywhere.
        </p>

        <div
          className="
            mt-5
            rounded-xl
            border
            border-sky-500/20
            bg-sky-500/[0.06]
            p-4
          "
        >

          <p className="text-sm leading-6 text-sky-200">
            🚀 Community feedback and support channels will be available with
            the public release of BerryMaster.
          </p>

        </div>

      </section>
             {/* =====================================
          Created By
      ===================================== */}

      <section
        className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-6
        "
      >

        <h2 className="text-xl font-semibold text-white">
          👨‍💻 Created By
        </h2>

        <div className="mt-5 space-y-3">

          <p className="text-lg font-semibold text-white">
            Abhijeet Mishra
          </p>

          <p className="text-sm text-emerald-300">
            IGN: MastAbhi
          </p>

          <p className="max-w-3xl leading-7 text-slate-400">
            This is a project that I poured my heart and soul into, since I'm a berry farmer myself
            I can feel the pain and difficulty in managing so many accs and also keeping track of cycles!

            I hope you guys love and cherish this, and the project finds some way or another to help everyone!
            Love the community, the devs who supported me and every friend who motivated me to go on, Thanks everyoe!
            
          </p>
          <p className="text-sm text-sky-300">
            Abhi Signing Off ✌️!!!
          </p>
        </div>

      </section>
      
      {/* =====================================
          Version
      ===================================== */}

      <section
        className="
          rounded-3xl
          border
          border-emerald-500/20
          bg-emerald-500/[0.05]
          p-8
          shadow-lg
          shadow-emerald-950/10
        "
      >

        <h2 className="text-2xl font-bold text-white">
          📦 Version
        </h2>

        <p className="mt-3 text-lg font-semibold text-emerald-300">
          BerryMaster v1.0.0
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Release Candidate
        </p>

      </section>


      {/* =====================================
          Footer
      ===================================== */}

      <div className="pb-8 pt-2 text-center">

        <p className="text-sm text-slate-500">
          Made with ❤️ for berry farmers.
        </p>

      </div>

    </div>
  );
}

