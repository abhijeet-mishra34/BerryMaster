import { useCharacters } from "../../context/CharacterContext";
import StatCard from "../ui/StatCard";
import Section from "../ui/Section";
import Button from "../ui/Button";

export default function Dashboard() {
  const { characters } = useCharacters();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Manage all your berry farming characters in one place.
        </p>

        <div className="mt-6">
          <Button>
            + Add Character
          </Button>
        </div>
      </div>

      <Section
        title="Overview"
        subtitle="Your farming activity at a glance."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
  {
    title: "Characters",
    value: characters.length,
    color: "emerald",
  },
  {
    title: "Active Farms",
    value: 0,
    color: "amber",
  },
  {
    title: "Need Water",
    value: 0,
    color: "blue",
  },
  {
    title: "Ready to Harvest",
    value: 0,
    color: "green",
  },
].map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}