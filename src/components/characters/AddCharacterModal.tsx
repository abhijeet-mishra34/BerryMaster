import { useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

type AddCharacterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function AddCharacterModal({
  isOpen,
  onClose,
  onSave,
}: AddCharacterModalProps) {
  const [name, setName] = useState("");

  function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    onSave(trimmedName);

    setName("");

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-6 text-2xl font-bold">
        Add Character
      </h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-emerald-500"
      />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}