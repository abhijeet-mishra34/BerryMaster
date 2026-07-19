interface ComingSoonProps {
  icon: string;
  title: string;
  description: string;
}

export default function ComingSoon({
  icon,
  title,
  description,
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">

      <div className="w-full max-w-3xl text-center">

        {/* Icon */}

        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-3xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            text-5xl
            shadow-lg
            shadow-emerald-500/5
          "
        >
          {icon}
        </div>


        {/* Title */}

        <h1 className="mt-8 text-4xl font-bold text-white">
          {title}
        </h1>


        {/* Coming Soon */}

        <h2
          className="
            mt-6
            text-6xl
            font-black
            tracking-tight
            text-emerald-400
            sm:text-7xl
            lg:text-8xl
          "
        >
          COMING SOON
        </h2>


        {/* Description */}

        <p
          className="
            mx-auto
            mt-8
            max-w-2xl
            text-lg
            leading-relaxed
            text-slate-400
          "
        >
          {description}
        </p>


        {/* Subtle Footer Message */}

        <p className="mt-10 text-sm text-slate-500">
          BerryMaster is still growing. 🌱
        </p>

      </div>

    </div>
  );
}