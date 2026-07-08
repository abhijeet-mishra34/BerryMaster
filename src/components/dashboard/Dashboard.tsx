import { useState } from "react";
import { dashboardStats } from "../../data/dashboard";
import StatCard from "../ui/StatCard";
import Section from "../ui/Section";
import CharacterPreview from "./CharacterCard";
import Button from "../ui/Button";
import AddCharacterModal from "../characters/AddCharacterModal";

export default function Dashboard() {
    const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);
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
  <Button onClick={() => setIsAddCharacterOpen(true)}>
    + Add Character
  </Button>
</div>
      </div>

      <Section
        title="Overview"
        subtitle="Your farming activity at a glance."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>
      </Section>

      <CharacterPreview />
      <AddCharacterModal
  isOpen={isAddCharacterOpen}
  onClose={() => setIsAddCharacterOpen(false)}
/>
    </div>
  );
}