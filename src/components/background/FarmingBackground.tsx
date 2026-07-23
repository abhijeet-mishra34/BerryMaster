export default function FarmingBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
      "
    >

      {/* =====================================
          Distant Grassland Atmosphere
      ===================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-emerald-950
          via-green-950
          to-slate-950
        "
      />


      {/* =====================================
          Distant Horizon
      ===================================== */}

      <div
        className="
          absolute
          bottom-[28%]
          left-0
          h-[25%]
          w-full
          bg-gradient-to-t
          from-emerald-950/80
          via-green-900/30
          to-transparent
        "
      />


      {/* =====================================
          Foreground Grassland
      ===================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[32%]
          w-full
          bg-gradient-to-t
          from-emerald-950
          via-green-950/80
          to-transparent
        "
      />


      {/* =====================================
          Small Wheat Field
      ===================================== */}

      <div
        className="
          absolute
          bottom-0
          right-[8%]
          h-48
          w-72
          overflow-hidden
        "
      >

        {Array.from({ length: 18 }).map(
          (_, index) => (
            <span
              key={index}
              className="
                absolute
                bottom-0
                text-4xl
                opacity-60
              "
              style={{
                left: `${(index % 6) * 18}%`,
                bottom: `${Math.floor(index / 6) * 8}px`,
              }}
            >
              🌾
            </span>
          )
        )}

      </div>


      {/* =====================================
          Soft Environmental Glow
      ===================================== */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-64
          w-[70%]
          -translate-x-1/2
          rounded-full
          bg-emerald-500/5
          blur-3xl
        "
      />

    </div>
  );
}