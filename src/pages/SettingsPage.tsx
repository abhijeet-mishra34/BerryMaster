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
    <div className="space-y-12">


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

            <p className="mt-2 max-w-2xl text-slate-400">
              Manage your BerryMaster data and application preferences.
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
            py-6
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

              <p className="mt-1 text-sm text-slate-400">
                Export, restore, and manage your BerryMaster data.
              </p>

            </div>

          </div>

        </div>


        {/* Actions */}

        <div className="grid gap-4 p-8 md:grid-cols-3">


          {/* Export */}

          <button
            onClick={
              exportBerryMasterData
            }
            className="
              group
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              p-5
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-emerald-400/50
              hover:bg-emerald-500/15
              hover:shadow-lg
              hover:shadow-emerald-500/10
            "
          >

            <div className="text-3xl">
              📤
            </div>

            <h3 className="mt-4 font-bold text-white">
              Export Data
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Download a backup of your BerryMaster data.
            </p>

          </button>


          {/* Import */}

          <button
            onClick={
              handleImportClick
            }
            className="
              group
              rounded-2xl
              border
              border-slate-700
              bg-slate-800/50
              p-5
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-slate-500
              hover:bg-slate-800
              hover:shadow-lg
            "
          >

            <div className="text-3xl">
              📥
            </div>

            <h3 className="mt-4 font-bold text-white">
              Import Data
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Restore BerryMaster data from a backup file.
            </p>

          </button>


          {/* Clear Activities */}

          <button
            onClick={() =>
              setIsClearActivitiesOpen(true)
            }
            className="
              group
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              p-5
              text-left
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-red-400/50
              hover:bg-red-500/10
              hover:shadow-lg
              hover:shadow-red-500/10
            "
          >

            <div className="text-3xl">
              🗑
            </div>

            <h3 className="mt-4 font-bold text-red-400">
              Clear Activity History
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Remove all recorded farming activity.
            </p>

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
            py-6
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

              <p className="mt-1 text-sm text-slate-400">
                These actions permanently affect your local BerryMaster data.
              </p>

            </div>

          </div>

        </div>


        <div className="p-8">

          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
            Resetting BerryMaster permanently deletes all characters,
            favorite berries, and activity history stored on this device.
          </p>

          <button
            onClick={() =>
              setIsResetOpen(true)
            }
            className="
              mt-6
              rounded-xl
              border
              border-red-500/40
              bg-red-500/10
              px-5
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

      {isClearActivitiesOpen && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-6
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-slate-700
              bg-slate-900
              p-8
              shadow-2xl
            "
          >

            <div className="text-4xl">
              🗑
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Clear Activity History?
            </h2>

            <p className="mt-3 leading-relaxed text-slate-400">
              This will permanently remove all recent farming activity.
              This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() =>
                  setIsClearActivitiesOpen(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-5
                  py-2.5
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {

                  clearActivities();

                  setIsClearActivitiesOpen(false);

                }}
                className="
                  rounded-xl
                  bg-red-500
                  px-5
                  py-2.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-400
                "
              >
                Clear History
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          Reset Confirmation
      ===================================== */}

      {isResetOpen && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            p-6
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-red-500/40
              bg-slate-900
              p-8
              shadow-2xl
              shadow-red-500/10
            "
          >

            <div className="text-4xl">
              ⚠️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Reset BerryMaster?
            </h2>

            <p className="mt-3 leading-relaxed text-slate-400">
              This will permanently delete all characters,
              favorite berries, and activity history stored
              on this device.
            </p>

            <p className="mt-4 font-semibold text-red-400">
              This action cannot be undone.
            </p>


            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() =>
                  setIsResetOpen(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-5
                  py-2.5
                  font-semibold
                  text-slate-300
                  transition
                  hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleResetApplication
                }
                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-500
                "
              >
                Reset Everything
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}