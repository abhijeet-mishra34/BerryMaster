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
        className="theme-hero relative overflow-hidden rounded-xl"
        style={{
          padding: "0.875rem 1.25rem",
        }}
      >
        {/* Ambient orb */}
        <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-emerald-500/10 blur-xl" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        <div className="relative z-10 space-y-0.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white light:text-slate-900">
            {greetingTitle}
          </h1>
          <p className="max-w-xl text-xs text-slate-400 light:text-slate-600 leading-normal">
            {greetingSubtitle}
          </p>
        </div>
      </div>

      {characters.length === 0 && (
        <div
          className="flex items-center justify-between gap-4 rounded-xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-500/[0.05] light:bg-emerald-50/70 shadow-xs"
          style={{ padding: "1.75rem 2.25rem" }}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🌱</span>
            <div>
              <p className="text-base font-bold text-white light:text-slate-900">Ready to start farming?</p>
              <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600">Add your first character to begin tracking your berry farm.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/characters')}
            className="shrink-0 rounded-xl border border-emerald-500/30 bg-emerald-500/20 light:bg-emerald-500 light:text-white px-5 py-2.5 text-sm font-bold text-emerald-400 light:text-white transition-all hover:bg-emerald-500 hover:text-slate-950 light:hover:bg-emerald-600 cursor-pointer shadow-xs"
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2 lg:col-start-2">
              <StatCard
                title={bottomStats[0].title}
                value={bottomStats[0].value}
                icon={bottomStats[0].icon}
                color={bottomStats[0].color}
              />
            </div>
            <div className="lg:col-span-2">
              <StatCard
                title={bottomStats[1].title}
                value={bottomStats[1].value}
                icon={bottomStats[1].icon}
                color={bottomStats[1].color}
              />
            </div>
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