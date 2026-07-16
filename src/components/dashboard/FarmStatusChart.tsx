import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { FarmStats } from "../../utils/farmStats";

type FarmStatusChartProps = {
  stats: FarmStats;
};

const COLORS = {
  growing: "#22c55e",
  needWater: "#38bdf8",
  readyHarvest: "#f59e0b",
  wilted: "#ef4444",
  empty: "#64748b",
};

export default function FarmStatusChart({
  stats,
}: FarmStatusChartProps) {
  const empty =
    stats.totalCharacters -
    stats.planted;

  const data = [
    {
      name: "Growing",
      value: stats.growing,
      color: COLORS.growing,
      icon: "🌱",
    },
    {
      name: "Need Water",
      value: stats.needWater,
      color: COLORS.needWater,
      icon: "💧",
    },
    {
      name: "Ready to Harvest",
      value: stats.readyHarvest,
      color: COLORS.readyHarvest,
      icon: "🌾",
    },
    {
      name: "Wilted",
      value: stats.wilted,
      color: COLORS.wilted,
      icon: "🍂",
    },
    {
      name: "Empty",
      value: empty,
      color: COLORS.empty,
      icon: "⚪",
    },
  ];

  const chartData =
    stats.totalCharacters === 0
      ? [
          {
            name: "No Characters",
            value: 1,
            color: COLORS.empty,
            icon: "👤",
          },
        ]
      : data.filter(
          (item) => item.value > 0
        );

  return (
    <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-16">

      {/* ================================ */}
      {/* DONUT CHART */}
      {/* ================================ */}

      <div className="h-[360px] w-full max-w-[520px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="78%"
              paddingAngle={4}
              cornerRadius={8}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#ffffff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ================================ */}
      {/* STATUS BREAKDOWN */}
      {/* ================================ */}

      <div className="w-full max-w-[320px] space-y-3">

        <h3 className="mb-5 text-sm font-semibold tracking-widest text-slate-400 uppercase">
          Status Breakdown
        </h3>

        {chartData.map((item) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-slate-800
              bg-slate-900/60
              px-4
              py-3
              transition-all
              duration-200
              hover:border-slate-600
              hover:bg-slate-800/70
            "
          >
            <div className="flex items-center gap-3">

              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }}
              />

              <span className="text-xl">
                {item.icon}
              </span>

              <span className="text-sm font-medium text-slate-300">
                {item.name}
              </span>
            </div>

            <span
              className="text-lg font-bold"
              style={{
                color: item.color,
              }}
            >
              {stats.totalCharacters === 0
                ? 0
                : item.value}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}