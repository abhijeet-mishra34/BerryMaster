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
    maxWidth="5xl"
    onClose={onClose}
  > <div className="space-y-5">


    {/* Context Header */}
    <div className="rounded-xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-500/[0.04] light:bg-emerald-50/70 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 light:text-emerald-700">
        Farming Action
      </p>

      <p className="mt-1 text-sm text-slate-300 light:text-slate-700">
        Choose a berry to begin a new farming cycle for{" "}
        <span className="font-semibold text-white light:text-slate-900">
          {characterName}
        </span>
        .
      </p>
    </div>


    {/* Berry Selection */}

    <PlantBerrySelector
      characterId={characterId}
      onClose={onClose}
    />

  </div>
</Modal>


);
}
