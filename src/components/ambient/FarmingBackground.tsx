export default function FarmingBackground() {
  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        overflow-hidden
        bg-slate-950
      "
    >

      {/* =====================================
          Ambient Green Atmosphere
      ===================================== */}

      <div
        className="
          absolute
          -left-32
          -top-32
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-emerald-500/[0.08]
          blur-[120px]
        "
      />


      {/* =====================================
          Center Atmosphere
      ===================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[40rem]
          w-[40rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-green-900/[0.12]
          blur-[140px]
        "
      />


      {/* =====================================
          Bottom Earth Glow
      ===================================== */}

      <div
        className="
          absolute
          -bottom-48
          -right-32
          h-[36rem]
          w-[36rem]
          rounded-full
          bg-emerald-700/[0.08]
          blur-[130px]
        "
      />


      {/* =====================================
          Farming Horizon
      ===================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-48
          bg-gradient-to-t
          from-emerald-950/40
          via-emerald-950/15
          to-transparent
        "
      />


      {/* =====================================
          Distant Field Layer
      ===================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-24
          opacity-30
          blur-[1px]
          bg-[radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.18)_0%,_transparent_70%)]
        "
      />

    </div>
  );
}