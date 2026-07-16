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
    <div className="space-y-8">


      {/* =====================================
          Header
      ===================================== */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your BerryMaster data and application preferences.
        </p>

      </div>


      {/* =====================================
          Data Management
      ===================================== */}

      <section
        className="
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-6
        "
      >

        <h2 className="text-xl font-semibold text-white">
          🗃️ Data Management
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Export, restore, and manage your BerryMaster data.
        </p>


        {/* Actions */}

        <div className="mt-6 flex flex-wrap gap-4">


          {/* Export */}

          <button
            onClick={
              exportBerryMasterData
            }
            className="
              rounded-xl
              bg-emerald-500
              px-5
              py-3
              font-semibold
              text-slate-950
              transition
              hover:bg-emerald-400
            "
          >
            📤 Export Data
          </button>


          {/* Import */}

          <button
            onClick={
              handleImportClick
            }
            className="
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:border-slate-500
              hover:bg-slate-700
            "
          >
            📥 Import Data
          </button>


          {/* Clear Activities */}

          <button
            onClick={() =>
              setIsClearActivitiesOpen(true)
            }
            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              px-5
              py-3
              font-semibold
              text-red-400
              transition
              hover:border-red-400/50
              hover:bg-red-500/20
            "
          >
            🗑 Clear Activity History
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

          <p
            className={`
              mt-4
              text-sm
              font-medium
              ${
                importError
                  ? "text-red-400"
                  : "text-emerald-400"
              }
            `}
          >
            {importMessage}
          </p>

        )}

      </section>


      {/* =====================================
          Danger Zone
      ===================================== */}

      <section
        className="
          rounded-2xl
          border
          border-red-500/30
          bg-red-500/5
          p-6
        "
      >

        <h2 className="text-xl font-semibold text-red-400">
          ⚠️ Danger Zone
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Permanently delete all BerryMaster data from this device.
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
            transition
            hover:border-red-400
            hover:bg-red-500/20
          "
        >
          ⚠️ Reset BerryMaster
        </button>

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
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              p-6
              shadow-2xl
            "
          >

            <h2 className="text-xl font-bold text-white">
              Clear Activity History?
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              This will permanently remove all recent farming activity.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setIsClearActivitiesOpen(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-4
                  py-2
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
                  px-4
                  py-2
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
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-red-500/40
              bg-slate-900
              p-6
              shadow-2xl
              shadow-red-500/10
            "
          >

            <div className="text-4xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-bold text-white">
              Reset BerryMaster?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              This will permanently delete all characters,
              favorite berries, and activity history stored
              on this device.
            </p>

            <p className="mt-3 text-sm font-semibold text-red-400">
              This action cannot be undone.
            </p>


            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() =>
                  setIsResetOpen(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-4
                  py-2
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
                  px-4
                  py-2
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