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
      onClose={onClose}
      title={`🌱 Plant Berry — ${characterName}`}
    >
      <PlantBerrySelector
        characterId={characterId}
        onClose={onClose}
      />
    </Modal>
  );
}