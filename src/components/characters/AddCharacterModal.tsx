import Modal from "../ui/Modal";

type AddCharacterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddCharacterModal({
  isOpen,
  onClose,
}: AddCharacterModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Character"
    >
      <p className="mb-6 text-slate-400">
        This is our first modal! 🎉
      </p>

      <input
        type="text"
        placeholder="Character Name"
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-emerald-500"
      />

      <button
        onClick={onClose}
        className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
      >
        Close
      </button>
    </Modal>
  );
}