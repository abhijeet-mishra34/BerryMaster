import { useNavigate } from "react-router-dom";
import { useCharacters } from "../../context/CharacterContext";
import { Users, Sprout, Droplets, Wheat, AlertTriangle } from "lucide-react";

import Section from "../ui/Section";
import StatCard from "../ui/StatCard";
import FarmStatusChart from "./FarmStatusChart";
import NeedsAttention from "./NeedsAttention";
import RecentActivity from "./RecentActivity";
import { calculateFarmStats } from "../../utils/farmStats";

export default function Dashboard() {
  const { characters } = useCharacters();
  const navigate = useNavigate();
  const stats = calculateFarmStats(characters);

  // Greeting
  const hour = new Date().getHours();
  let greetingTitle: string;
  let greetingSubtitle: string;

  if (hour < 12) {
    greetingTitle = "Good Morning! 🌞";
    greetingSubtitle = "Your berry farm is ready for another productive day.";
  } else if (hour < 18) {
    greetingTitle = "Good Afternoon! ☀️";
    greetingSubtitle = "Keep your berry farm healthy and thriving.";
  } else {
    greetingTitle = "Good Evening! 🌙";
    greetingSubtitle = "Time to check on your berries before calling it a day.";
  }

  const topStats = [
    {
      title: "Characters",
      value: stats.totalCharacters,
      icon: <Users className="h-5 w-5" />,
      color: "emerald" as const,
    },
    {
      title: "Planted",
      value: `${stats.planted}/${stats.totalCharacters}`,
      icon: <Sprout className="h-5 w-5" />,
      color: "emerald" as const,
    },
    {
      title: "Need Water",
      value: stats.needWater,
      icon: <Droplets className="h-5 w-5" />,
      color: "blue" as const,
    },
  ];

  const bottomStats = [
    {
      title: "Harvest Ready",
      value: stats.readyHarvest,
      icon: <Wheat className="h-5 w-5" />,
      color: "amber" as const,
    },
    {
      title: "Wilted",
      value: stats.wilted,
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "red" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Greeting Hero Banner */}
      <div
        className="relative overflow-hidden rounded-3xl border border-white/[0.07] p-6"
        style={{
          background: `linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(2,6,23,0.95) 60%, rgba(5,46,22,0.4) 100%)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px -20px rgba(16,185,129,0.15)`,
        }}
      >
        {/* Ambient orb */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 left-20 h-32 w-32 rounded-full bg-teal-500/8 blur-2xl" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative z-10 space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {greetingTitle}
          </h1>
          <p className="max-w-xl text-sm text-slate-400">
            {greetingSubtitle}
          </p>
        </div>
      </div>

      {characters.length === 0 && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <p className="text-sm font-bold text-white">Ready to start farming?</p>
              <p className="text-xs text-slate-400">Add your first character to begin tracking your berry farm.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/characters')}
            className="shrink-0 rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-500 hover:text-slate-950"
          >
            Add Character →
          </button>
        </div>
      )}

      {/* Farm Overview */}
      <Section
        title="Farm Overview"
        subtitle="A live summary of your farming progress."
      >
        <div className="flex flex-col gap-8">
          {/* Top Row: 3 cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topStats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          {/* Bottom Row: 2 cards centered */}
          <div className="grid gap-6 sm:grid-cols-2">
            {bottomStats.map((stat) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
            ))}
          </div>
        </div>
      </Section>

      {/* Needs Attention */}
      <Section
        title="Needs Attention"
        subtitle="Important actions that may require your attention."
      >
        <NeedsAttention />
      </Section>

      {/* Recent Activity */}
      <Section
        title="Recent Activity"
        subtitle="Your latest farming actions."
      >
        <RecentActivity />
      </Section>

      {/* Farm Status Chart */}
      <Section
        title="Farm Status"
        subtitle="Overall farm condition."
      >
        <FarmStatusChart stats={stats} />
      </Section>
    </div>
  );
}