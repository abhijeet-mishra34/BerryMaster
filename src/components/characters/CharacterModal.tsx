import { useEffect, useState } from "react";
import { User, UserPlus, Sparkles, Trash2 } from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

type CharacterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  title?: string;
  saveButtonText?: string;
  initialName?: string;
  hasPlantedBerry?: boolean;
  onRemoveBerry?: () => void;
};

export default function CharacterModal({
  isOpen,
  onClose,
  onSave,
  title = "Add Character",
  saveButtonText = "Add Character",
  initialName = "",
  hasPlantedBerry = false,
  onRemoveBerry,
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
  const isEditing = Boolean(initialName);

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      subtitle={
        isEditing
          ? "Update your character profile name and plot configuration."
          : "Create a dedicated profile to manage plots, watering countdowns, and harvest alerts."
      }
      icon={<UserPlus className="h-7 w-7" />}
      maxWidth="2xl"
      onClose={handleClose}
    >
      <div className="space-y-8 pt-3">
        {/* Character Name Input Field */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-0.5">
            <label
              htmlFor="character-name"
              className="text-xs font-bold uppercase tracking-wider text-slate-300 light:text-slate-700 flex items-center gap-2.5"
            >
              <span>Character Name</span>
              <span className="text-[10px] font-bold text-emerald-400 light:text-emerald-700 uppercase tracking-widest bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/30 light:border-emerald-300 px-2.5 py-0.5 rounded-full">
                Required
              </span>
            </label>
            <span className="text-xs font-mono font-bold text-slate-400 light:text-slate-500">
              {name.length} / 30
            </span>
          </div>

          {/* Clean Flex-based Input Group (Zero Overlap Guaranteed) */}
          <div
            className="
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-slate-800
              light:border-slate-300
              bg-slate-950/80
              light:bg-slate-50
              px-5
              py-3.5
              transition-all
              duration-200
              focus-within:border-emerald-400
              focus-within:bg-slate-950
              light:focus-within:bg-white
              focus-within:ring-4
              focus-within:ring-emerald-500/20
            "
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 light:text-emerald-600 border border-emerald-500/20">
              <User className="h-5 w-5" />
            </div>

            <input
              id="character-name"
              type="text"
              autoFocus
              maxLength={30}
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSave();
                }
              }}
              placeholder="e.g. Unova Main, Kanto Farmer 1, Alt Plot..."
              className="
                w-full
                bg-transparent
                py-2
                text-base
                sm:text-lg
                font-semibold
                text-white
                light:text-slate-900
                placeholder:text-slate-500
                light:placeholder:text-slate-400
                outline-none
              "
            />
          </div>

          <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed pl-1 pt-2">
            Give this character a recognizable name to easily distinguish them on your dashboard.
          </p>
        </div>

        {/* Helpful Pro Tip Callout Box with generous margins */}
        <div className="mt-8 flex items-start gap-4 rounded-xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-500/[0.05] light:bg-emerald-50/70 p-5 text-xs sm:text-sm text-slate-300 light:text-slate-700">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 light:text-emerald-600 border border-emerald-500/20 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="leading-relaxed">
            <strong className="font-bold text-emerald-300 light:text-emerald-800">Organization tip:</strong> Name characters by region, farming cycle, or in-game account to keep watering schedules and wilt timers perfectly organized.
          </p>
        </div>

        {/* Remove Planted Berry Section (if editing) */}
        {hasPlantedBerry && onRemoveBerry && (
          <div className="rounded-xl border border-red-500/25 light:border-red-200 bg-red-500/[0.05] light:bg-red-50/60 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/15 text-red-400">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-300 light:text-red-700">
                    Remove Planted Berry
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                    Clear the current planted plot and reset its growth timers.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onRemoveBerry}
                className="
                  shrink-0
                  rounded-xl
                  border
                  border-red-500/30
                  bg-red-500/20
                  px-5
                  py-3
                  text-xs
                  font-bold
                  text-red-300
                  light:text-red-700
                  transition-all
                  duration-200
                  hover:bg-red-500
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-red-500/25
                  active:scale-95
                  cursor-pointer
                "
              >
                Remove Berry
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-800/80 light:border-slate-200">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleSave}
            disabled={!isValid}
            className="w-full sm:w-auto"
          >
            <UserPlus className="mr-2 h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" />
            <span>{saveButtonText}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}