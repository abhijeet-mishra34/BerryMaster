import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

type CharacterModalProps = {
  isOpen: boolean;
  onClose: () => void;

  onSave: (name: string) => void;

  title?: string;

  saveButtonText?: string;

  initialName?: string;
};

export default function CharacterModal({
  isOpen,
  onClose,
  onSave,
  title = "Add Character",
  saveButtonText = "Save",
  initialName = "",
}: CharacterModalProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName, isOpen]);

  function handleClose() {
    setName(initialName);
    onClose();
  }

  function handleSave() {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    onSave(trimmedName);

    setName("");

    onClose();
  }

  return (
    <Modal
  isOpen={isOpen}
  title={title}
  onClose={handleClose}
    >
      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <input
        type="text"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSave();
          }
        }}
        placeholder="Character Name"
        className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-emerald-500"
      />

      <div className="flex justify-end gap-3">
        <Button
          variant="secondary"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          type="button"
        >
          {saveButtonText}
        </Button>
      </div>
    </Modal>
  );
}