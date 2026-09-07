import { useEffect, useState } from "react";
import { User, UserPlus, Sparkles, Trash2 } from "lucide-react";

import Modal from "../ui/Modal";

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
      <div className="space-y-6 pt-1">
        {/* Character Name Input Field */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
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

          {/* Clean Flex-based Input Group */}
          <div
            className="
              flex
              items-center
              gap-3.5
              rounded-2xl
              border
              border-white/15
              light:border-slate-300
              bg-[#121422]
              light:bg-white
              px-4
              py-3
              transition-all
              duration-200
              focus-within:border-emerald-400
              focus-within:ring-4
              focus-within:ring-emerald-500/20
            "
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 light:text-emerald-600 border border-emerald-500/25">
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
                py-1
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

          <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed pl-1 pt-1">
            Give this character a recognizable name to easily distinguish them on your dashboard.
          </p>
        </div>

        {/* Helpful Pro Tip Callout Box */}
        <div className="flex items-start gap-3.5 rounded-2xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-500/[0.06] light:bg-emerald-50/70 p-4 sm:p-5 text-xs sm:text-sm text-slate-300 light:text-slate-700">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 light:text-emerald-600 border border-emerald-500/25 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="leading-relaxed">
            <strong className="font-bold text-emerald-300 light:text-emerald-800">Organization tip:</strong> Name characters by region, farming cycle, or in-game account to keep watering schedules and wilt timers perfectly organized.
          </p>
        </div>

        {/* Remove Planted Berry Section (if editing) */}
        {hasPlantedBerry && onRemoveBerry && (
          <div className="rounded-2xl border border-rose-500/25 light:border-red-200 bg-rose-500/[0.06] light:bg-red-50/60 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-400">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rose-300 light:text-red-700">
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
                  border-rose-500/30
                  bg-rose-500/20
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-rose-300
                  light:text-red-700
                  transition-all
                  duration-200
                  hover:bg-rose-500
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-rose-500/25
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
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="
              w-full
              sm:w-auto
              h-12
              px-7
              rounded-xl
              border
              border-slate-700
              light:border-slate-300
              bg-slate-800/90
              light:bg-slate-100
              text-sm
              font-bold
              text-slate-200
              light:text-slate-700
              transition-all
              duration-200
              hover:border-slate-600
              light:hover:border-slate-400
              hover:bg-slate-700
              light:hover:bg-slate-200
              hover:text-white
              light:hover:text-slate-900
              active:scale-[0.98]
              cursor-pointer
              text-center
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="
              w-full
              sm:w-auto
              h-12
              inline-flex
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-teal-500
              px-8
              text-sm
              font-extrabold
              text-slate-950
              shadow-lg
              shadow-emerald-500/25
              transition-all
              duration-200
              hover:from-emerald-400
              hover:to-teal-400
              hover:shadow-emerald-500/40
              active:scale-[0.98]
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            <UserPlus className="h-4 w-4" />
            <span>{saveButtonText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}