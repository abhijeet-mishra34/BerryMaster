import {
  useRef,
  useState,
} from "react";

import {
  exportBerryMasterData,
} from "../utils/dataExport";

import {
  importBerryMasterData,
} from "../utils/dataImport";

import {
  useActivities,
} from "../context/ActivityContext";

import {
  resetBerryMaster,
} from "../utils/resetApp";

import ConfirmDialog from "../components/ui/ConfirmDialog";


export default function SettingsPage() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const {
    clearActivities,
  } = useActivities();

  const [
    importMessage,
    setImportMessage,
  ] = useState<string | null>(null);

  const [
    importError,
    setImportError,
  ] = useState(false);

  const [
    isClearActivitiesOpen,
    setIsClearActivitiesOpen,
  ] = useState(false);

  const [
    isResetOpen,
    setIsResetOpen,
  ] = useState(false);


  // =====================================
  // Import
  // =====================================

  function handleImportClick() {
    fileInputRef.current?.click();
  }


  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      await importBerryMasterData(file);

      setImportError(false);

      setImportMessage(
        "Data imported successfully. Reloading..."
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {

      setImportError(true);

      setImportMessage(
        error instanceof Error
          ? error.message
          : "Import failed."
      );

    }

    event.target.value = "";
  }


  // =====================================
  // Reset Application
  // =====================================

  function handleResetApplication() {
    resetBerryMaster();

    setIsResetOpen(false);

    window.location.reload();
  }


  return (
    <div className="flex flex-col gap-3">


      {/* =====================================
          Header
      ===================================== */}

      <div
        className="
          rounded-3xl
          border
          border-white/[0.08]
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-slate-950
          p-8
          shadow-xl
          shadow-black/10
        "
      >

        <div className="flex items-start gap-5">

          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-800
              text-3xl
              shadow-inner
            "
          >
            ⚙️
          </div>

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Settings
            </h1>

            <p className="mt-3 max-w-3xl leading-relaxed text-slate-400">
              Manage your BerryMaster data, create backups, restore previous
              data, and control actions that affect your locally stored
              application data.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          Data Management
      ===================================== */}

      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          bg-slate-900/60
          shadow-xl
          shadow-black/10
          backdrop-blur-xl
        "
      >

        {/* Section Header */}

        <div
          className="
            border-b
            border-slate-800
            bg-slate-900/70
            px-8
            py-7
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-2xl
              "
            >
              🗃️
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Data Management
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                Back up, restore, and manage the data stored locally by
                BerryMaster.
              </p>

            </div>

          </div>

        </div>


        {/* Actions */}

        <div className="grid gap-5 p-8 md:grid-cols-3">


          {/* =====================================
              Export
          ===================================== */}

          <button
            type="button"
            onClick={
              exportBerryMasterData
            }
            className="
              group
              flex
              min-h-[220px]
              flex-col
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/[0.06]
              p-6
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-emerald-400/50
              hover:bg-emerald-500/10
              hover:shadow-lg
              hover:shadow-emerald-500/10
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-2xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              📤
            </div>

            <h3 className="mt-5 font-bold text-white">
              Export Data
            </h3>

            <p className="mt-2 leading-relaxed text-sm text-slate-400">
              Create a backup of your BerryMaster data so it can be restored
              later or transferred to another device.
            </p>

            <span
              className="
                mt-auto
                pt-6
                text-sm
                font-semibold
                text-emerald-400
              "
            >
              Download Backup →
            </span>

          </button>


          {/* =====================================
              Import
          ===================================== */}

          <button
            type="button"
            onClick={
              handleImportClick
            }
            className="
              group
              flex
              min-h-[220px]
              flex-col
              rounded-2xl
              border
              border-slate-700
              bg-slate-800/40
              p-6
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-slate-500
              hover:bg-slate-800/70
              hover:shadow-lg
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-slate-700/50
                text-2xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              📥
            </div>

            <h3 className="mt-5 font-bold text-white">
              Import Data
            </h3>

            <p className="mt-2 leading-relaxed text-sm text-slate-400">
              Restore characters, favorites, activity history, and other
              supported data from a BerryMaster backup file.
            </p>

            <span
              className="
                mt-auto
                pt-6
                text-sm
                font-semibold
                text-slate-300
              "
            >
              Restore Backup →
            </span>

          </button>


          {/* =====================================
              Clear Activities
          ===================================== */}

          <button
            type="button"
            onClick={() =>
              setIsClearActivitiesOpen(true)
            }
            className="
              group
              flex
              min-h-[220px]
              flex-col
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/[0.04]
              p-6
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-red-400/50
              hover:bg-red-500/[0.08]
              hover:shadow-lg
              hover:shadow-red-500/10
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-2xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              🗑️
            </div>

            <h3 className="mt-5 font-bold text-red-400">
              Clear Activity History
            </h3>

            <p className="mt-2 leading-relaxed text-sm text-slate-400">
              Remove your recorded farming activity while keeping your
              characters, favorites, and other BerryMaster data intact.
            </p>

            <span
              className="
                mt-auto
                pt-6
                text-sm
                font-semibold
                text-red-400
              "
            >
              Clear Activity →
            </span>

          </button>

        </div>


        {/* Hidden File Input */}

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={
            handleFileSelected
          }
          className="hidden"
        />


        {/* Import Message */}

        {importMessage && (

          <div
            className={`
              mx-8
              mb-8
              rounded-xl
              border
              px-4
              py-3
              text-sm
              font-medium

              ${
                importError
                  ? `
                    border-red-500/30
                    bg-red-500/10
                    text-red-400
                  `
                  : `
                    border-emerald-500/30
                    bg-emerald-500/10
                    text-emerald-400
                  `
              }
            `}
          >
            {importMessage}
          </div>

        )}

      </section>


      {/* =====================================
          Danger Zone
      ===================================== */}

      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-red-500/30
          bg-red-500/[0.04]
          shadow-xl
          shadow-red-950/10
        "
      >

        <div
          className="
            border-b
            border-red-500/20
            bg-red-500/[0.06]
            px-8
            py-7
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-2xl
              "
            >
              ⚠️
            </div>

            <div>

              <h2 className="text-xl font-bold text-red-400">
                Danger Zone
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-amber-300">
                These actions permanently affect data stored locally by
                BerryMaster.
              </p>

            </div>

          </div>

        </div>


        <div className="p-8">

          <p className="max-w-3xl leading-relaxed text-amber-300">
            Resetting BerryMaster permanently removes all locally stored
            application data, including characters, favorites, activity
            history, and other saved information.Before you do it, make sure:
          </p>
          <ul className="mt-5 space-y-3">
  <li className="flex items-start gap-3 text-slate-400">
    <span className="mt-1 text-emerald-400">➤</span>
    <span>You have created a backup file!</span>
  </li>
   <li className="flex items-start gap-3 text-slate-400">
    <span className="mt-1 text-emerald-400">➤</span>
    <span>Stored the file in a safe place!</span>
  </li>
   <li className="flex items-start gap-3 text-slate-400">
    <span className="mt-1 text-emerald-400">➤</span>
    <span>Check the backup file for corrupt data!</span>
  </li>
  </ul>
          <p className="mt-3 font-medium text-red-400 gap-3">
            This action cannot be undone.
          </p>

          <button
            type="button"
            onClick={() =>
              setIsResetOpen(true)
            }
            className="
              mt-7
              rounded-xl
              border
              border-red-500/40
              bg-red-500/10
              px-6
              py-3
              font-semibold
              text-red-400
              transition-all
              duration-200
              hover:border-red-400
              hover:bg-red-500/20
              hover:shadow-lg
              hover:shadow-red-500/10
            "
          >
            ⚠️ Reset BerryMaster
          </button>

        </div>

      </section>


      {/* =====================================
          Clear Activities Confirmation
      ===================================== */}

      <ConfirmDialog
        isOpen={
          isClearActivitiesOpen
        }
        title="Clear Activity History?"
        message="
          This will permanently remove all recorded farming activity.
          Your characters, favorites, and other BerryMaster data will remain
          intact. This action cannot be undone.
        "
        confirmLabel="Clear History"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => {

          clearActivities();

          setIsClearActivitiesOpen(false);

        }}
        onCancel={() =>
          setIsClearActivitiesOpen(false)
        }
      />


      {/* =====================================
          Reset Confirmation
      ===================================== */}

      <ConfirmDialog
        isOpen={
          isResetOpen
        }
        title="Reset BerryMaster?"
        message="
          This will permanently delete all characters, favorite berries,
          activity history, and other locally stored BerryMaster data.
          This action cannot be undone.
        "
        confirmLabel="Reset Everything"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={
          handleResetApplication
        }
        onCancel={() =>
          setIsResetOpen(false)
        }
      />

    </div>
  );
}