import { useCharacters } from "../../context/CharacterContext";

import Section from "../ui/Section";
import StatCard from "../ui/StatCard";
import FarmStatusChart from "./FarmStatusChart";
import NeedsAttention from "./NeedsAttention";
import RecentActivity from "./RecentActivity";
import { calculateFarmStats } from "../../utils/farmStats";

export default function Dashboard() {
  const { characters } = useCharacters();

  const stats = calculateFarmStats(characters);

  // =====================================
  // Greeting
  // =====================================

  const hour = new Date().getHours();

  let greetingTitle = "";
  let greetingSubtitle = "";

  if (hour < 12) {
    greetingTitle = "🌞 Good Morning!";
    greetingSubtitle =
      "Your berry farm is ready for another productive day.";
  } else if (hour < 18) {
    greetingTitle = "☀️ Good Afternoon!";
    greetingSubtitle =
      "Keep your berry farm healthy and thriving.";
  } else {
    greetingTitle = "🌙 Good Evening!";
    greetingSubtitle =
      "Time to check on your berries before calling it a day.";
  }

  // =====================================
  // Dashboard Cards
  // =====================================

  const topStats = [
    {
      title: "Characters",
      value: stats.totalCharacters,
      icon: "👤",
      color: "emerald" as const,
    },
    {
      title: "Planted",
      value: `${stats.planted}/${stats.totalCharacters}`,
      icon: "🌱",
      color: "green" as const,
    },
    {
      title: "Need Water",
      value: stats.needWater,
      icon: "💧",
      color: "blue" as const,
    },
  ];

  const bottomStats = [
    {
      title: "Harvest Ready",
      value: stats.readyHarvest,
      icon: "🌾",
      color: "amber" as const,
    },
    {
      title: "Wilted",
      value: stats.wilted,
      icon: "🍂",
      color: "red" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-16">

      {/* =====================================
          Greeting
      ===================================== */}

      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          {greetingTitle}
        </h1>

        <p className="max-w-2xl text-lg text-slate-400">
          {greetingSubtitle}
        </p>
      </div>


      {/* =====================================
          Farm Overview
      ===================================== */}
<Section
  title="Farm Overview"
  subtitle="A live summary of your farming progress."
>
  <div className="flex flex-col gap-12">

    {/* Top Row */}

    <div className="grid gap-8 lg:grid-cols-3">
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


    {/* Bottom Row */}

    <div className="flex justify-center gap-8">
      {bottomStats.map((stat) => (
        <div
          key={stat.title}
          className="w-full max-w-md"
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        </div>
      ))}
    </div>

  </div>
</Section>
      {/* =====================================
          Needs Attention
      ===================================== */}

      <Section
        title="Needs Attention"
        subtitle="Important actions that may require your attention."
      >
        <NeedsAttention characters={characters} />
      </Section>


      {/* =====================================
    Recent Activity
===================================== */}

<Section
  title="Recent Activity"
  subtitle="Your latest farming actions."
>
  <RecentActivity />
</Section>


      {/* =====================================
          Farm Status
      ===================================== */}

      <Section
        title="Farm Status"
        subtitle="Overall farm condition."
      >
        <FarmStatusChart stats={stats} />
      </Section>

    </div>
  );
}