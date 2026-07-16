export default function AboutPage() {
  return (
    <div className="space-y-8">

      {/* =====================================
          Header
      ===================================== */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          About BerryMaster
        </h1>

        <p className="mt-2 text-slate-400">
          A smarter way to manage your berry farming journey.
        </p>

      </div>


      {/* =====================================
          About BerryMaster
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
          🍓 Hey fellow farmers, Abhijeet this side (IGN-MastAbhi), and today I wanna introduce a new companion to you guys!
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          BerryMaster is a farming management tool built for PokeMMO
          players who want a clearer way to organize and monitor their
          berry farming activities.
           
           
          A one stop solution for farming on multiple accounts at the same time.
          Creating, adding and then using the same characters has never been easier,also
          any feedbacks for encouragement, future updates, any bugs or technical issues 
          would be much appreciated!
        </p>

        <p className="mt-4 leading-7 text-slate-400">
          Track your characters, manage planted berries, monitor watering
          schedules, keep an eye on harvest and wilt timers, manage your
          berry collection, and review your recent farming activity — all
          in one place.
        </p>

      </section>


      {/* =====================================
          Unofficial App Notice
      ===================================== */}

      <section
        className="
          rounded-2xl
          border
          border-amber-500/30
          bg-amber-500/5
          p-6
        "
      >

        <h2 className="text-xl font-semibold text-amber-400">
          ⚠️ Important Notice
        </h2>

        <p className="mt-4 leading-7 text-slate-300">
          BerryMaster is a fan-made project and is not affiliated with,
          endorsed by, or officially connected to PokeMMO or its developers.
        </p>

        <p className="mt-4 leading-7 text-slate-400">
          The application operates independently from the game client.
          It does not modify, inject into, interact with, or interfere with
          PokeMMO in any way. BerryMaster is designed solely to help players
          organize and manage their farming information externally.
        </p>

      </section>


      {/* =====================================
          Technology
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
          🛠️ Built With
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">

          <span className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300">
            ⚛️ React
          </span>

          <span className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300">
            📘 TypeScript
          </span>

          <span className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300">
            ⚡ Vite
          </span>

          <span className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300">
            🎨 Tailwind CSS
          </span>

        </div>

      </section>


      {/* =====================================
          Version
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
          📦 Version
        </h2>

        <p className="mt-3 text-slate-400">
          BerryMaster v1.0.0
        </p>

      </section>


      {/* =====================================
          Footer
      ===================================== */}

      <div className="pb-8 text-center">

        <p className="text-sm text-slate-500">
          Made with ❤️ for berry farmers.
        </p>

      </div>

    </div>
  );
}