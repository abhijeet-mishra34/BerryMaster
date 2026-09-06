import { Sprout } from "lucide-react";
import Modal from "../ui/Modal";
import PlantBerrySelector from "../berries/PlantBerrySelector";

interface PlantBerryModalProps {
  isOpen: boolean;
  characterId: string;
  characterName: string;
  onClose: () => void;
}

export default function PlantBerryModal({
  isOpen,
  characterId,
  characterName,
  onClose,
}: PlantBerryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={`Plant Berry — ${characterName}`}
      subtitle="Select a berry to begin a new farming cycle and start growth and watering timers."
      icon={<Sprout className="h-7 w-7" />}
      maxWidth="5xl"
      onClose={onClose}
    >
      <div className="pt-2">
        <PlantBerrySelector
          characterId={characterId}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
