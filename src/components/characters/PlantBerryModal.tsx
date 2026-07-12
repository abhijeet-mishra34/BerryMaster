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
  const title = `🌱 Plant Berry — ${characterName}`;

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
    >
      <PlantBerrySelector
        characterId={characterId}
        onClose={onClose}
      />
    </Modal>
  );
}