export default function AboutPage() {
  return (
    <div className="flex flex-col gap-4">

      {/* =====================================
          Header
      ===================================== */}

      <div>

        <h1 className="text-4xl font-bold text-sky-300">
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
         🍓 Hey fellow farmers, Abhijeet this side (IGN: MastAbhi), and today I want to introduce a new companion to you!
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          BerryMaster is a farming management tool built for PokeMMO
          players who want a clearer way to organize and monitor their
          berry farming activities.

          With BerryMaster you can:
        </p>
         <ul className="mt-5 space-y-3">
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
        <p className="mt-4 leading-7 text-slate-400">
          Whether you're managing a few characters or farming across multiple accounts, BerryMaster is designed to make the process simpler, clearer, and easier to manage.
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
    BerryMaster is an independent, fan-made project created for the
    PokeMMO community. It is not affiliated with, endorsed by, sponsored
    by, or officially connected to PokeMMO or its developers.
  </p>

  <p className="mt-4 leading-7 text-slate-300">
    BerryMaster operates entirely as an external farming management tool.
    It does not:
  </p>

  <ul className="mt-4 space-y-3">

    <li className="flex items-start gap-3 text-slate-300">

      <span className="mt-1 text-amber-400">
        →
      </span>

      <span>
        Modify the PokeMMO game client.
      </span>

    </li>

    <li className="flex items-start gap-3 text-slate-300">

      <span className="mt-1 text-amber-400">
        →
      </span>

      <span>
        Inject code into or interact with the game client.
      </span>

    </li>

    <li className="flex items-start gap-3 text-slate-300">

      <span className="mt-1 text-amber-400">
        →
      </span>

      <span>
        Access or alter game files.
      </span>

    </li>

    <li className="flex items-start gap-3 text-slate-300">

      <span className="mt-1 text-amber-400">
        →
      </span>

      <span>
        Interfere with gameplay or game processes.
      </span>

    </li>

  </ul>

  <p className="mt-5 leading-7 text-slate-300">
    The application is designed solely to help players organize and manage
    their berry farming information externally.
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
 <ul className="mt-5 space-y-3">

  <li className="flex items-start gap-3 text-slate-400">

    <span className="mt-1 text-emerald-400">•</span>

    <span>⚛️ React</span>

  </li>



  <li className="flex items-start gap-3 text-slate-400">

    <span className="mt-1 text-emerald-400">•</span>

    <span> 📘 TypeScript</span>

  </li>



  <li className="flex items-start gap-3 text-slate-400">

    <span className="mt-1 text-emerald-400">•</span>

    <span>⚡ Vite</span>

  </li>



  <li className="flex items-start gap-3 text-slate-400">

    <span className="mt-1 text-emerald-400">•</span>

    <span> 🎨 Tailwind CSS</span>

  </li>

  </ul>

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

        <p className="mt-3 text-emerald-300">
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