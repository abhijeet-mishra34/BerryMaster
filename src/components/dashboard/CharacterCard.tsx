import { characters } from "../../data/characters";
import CharacterCard from "../characters/CharacterCard";
import Section from "../ui/Section";

export default function CharacterPreview() {
  return (
    <Section
      title="Characters"
      subtitle="Quick overview of your farming team"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            {...character}
          />
        ))}
      </div>
    </Section>
  );
}