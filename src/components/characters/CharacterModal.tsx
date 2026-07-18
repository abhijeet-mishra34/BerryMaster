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

if (!trimmedName) {
  return;
}

onSave(trimmedName);

setName("");

onClose();


}

const trimmedName = name.trim();
const isValid = trimmedName.length > 0;

return ( <Modal
   isOpen={isOpen}
   title={title}
   onClose={handleClose}
 > <div className="space-y-6">

    {/* Character Name */}

    <div className="space-y-2">

      <div className="flex items-center justify-between">

        <label
          htmlFor="character-name"
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.16em]
            text-slate-400
          "
        >
          Character Name
        </label>

        <span className="text-xs text-slate-500">
          {name.length}/30
        </span>

      </div>

      <input
        id="character-name"
        type="text"
        autoFocus
        maxLength={30}
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSave();
          }
        }}
        placeholder="Enter character name..."
        className="
          w-full
          rounded-xl
          border
          border-white/[0.08]
          bg-slate-950/60
          px-4
          py-3.5
          text-white
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-600
          focus:border-emerald-500/70
          focus:bg-slate-950/80
          focus:ring-2
          focus:ring-emerald-500/20
        "
      />

      <p className="text-xs text-slate-500">
        Give this character a name so you can easily identify them while managing your farm.
      </p>

    </div>


    {/* Actions */}

    <div className="flex justify-end gap-3 border-t border-white/[0.08] pt-5">

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
        disabled={!isValid}
      >
        {saveButtonText}
      </Button>

    </div>

  </div>
</Modal>


);
}
