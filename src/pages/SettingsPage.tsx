import {
  useRef,
  useState,
} from "react";
import {
  Download,
  Moon,
  Sun,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

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
  useSettings,
} from "../context/SettingsContext";

import {
  resetBerryMaster,
} from "../utils/resetApp";

import {
  checkForAppUpdates,
  CURRENT_APP_VERSION,
  type UpdateCheckResult,
} from "../services/updateService";

import ConfirmDialog from "../components/ui/ConfirmDialog";

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { clearActivities } = useActivities();

  const {
    showDeveloperBerries,
    setShowDeveloperBerries,
    theme,
    setTheme,
  } = useSettings();

  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState(false);
  const [isClearActivitiesOpen, setIsClearActivitiesOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Update check state
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateResult, setUpdateResult] = useState<UpdateCheckResult | null>(null);

  async function handleCheckUpdate() {
    setIsCheckingUpdate(true);
    const result = await checkForAppUpdates();
    setUpdateResult(result);
    setIsCheckingUpdate(false);
  }

  // =====================================
  // Import
  // =====================================

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importBerryMasterData(file);
      setImportError(false);
      setImportMessage("Data imported successfully. Reloading...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setImportError(true);
      setImportMessage(
        error instanceof Error ? error.message : "Import failed."
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
    <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-12">
      {/* =====================================
          Header
      ===================================== */}
      <div
        className="
          rounded-3xl
          border
          border-white/[0.08]
          light:border-slate-200
          bg-gradient-to-br
          from-slate-900
          via-slate-900/90
          to-slate-950
          light:from-white
          light:via-slate-50
          light:to-slate-100
          p-6
          sm:p-8
          shadow-xl
          shadow-black/10
          light:shadow-slate-200/50
        "
      >
        <div className="flex items-center gap-5">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              text-emerald-400
              text-2xl
              shadow-inner
            "
          >
            ⚙️
          </div>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white light:text-slate-900">
              Settings & Preferences
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400 light:text-slate-600 max-w-2xl">
              Configure your BerryMaster environment, appearance, backups, and app updates.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Appearance / Theme
      ===================================== */}
      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          shadow-xl
          shadow-black/10
          light:shadow-slate-200/40
          backdrop-blur-xl
        "
      >
        <div className="border-b border-slate-800/80 light:border-slate-100 bg-slate-900/40 light:bg-slate-50/50 px-6 sm:px-8 py-5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sun className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white light:text-slate-900">
                Appearance & Theme
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Choose the visual style for your BerryMaster interface.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:p-8 sm:grid-cols-2">
          {/* Dark Mode Option */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`
              group
              relative
              flex
              items-center
              gap-4
              rounded-2xl
              border
              p-5
              text-left
              transition-all
              duration-200
              ${
                theme === "dark"
                  ? "border-emerald-500/60 bg-emerald-500/10 ring-2 ring-emerald-500/30 text-white"
                  : "border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-slate-700"
              }
            `}
          >
            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                text-xl
                ${
                  theme === "dark"
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                    : "border-slate-800 bg-slate-900 text-slate-400"
                }
              `}
            >
              <Moon className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white light:text-slate-900">
                  Dark Theme
                </h3>
                {theme === "dark" && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    Active
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Deep obsidian & emerald forest palette. Ideal for low-light sessions.
              </p>
            </div>
          </button>

          {/* Light Mode Option */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`
              group
              relative
              flex
              items-center
              gap-4
              rounded-2xl
              border
              p-5
              text-left
              transition-all
              duration-200
              ${
                theme === "light"
                  ? "border-emerald-500/60 bg-emerald-500/10 ring-2 ring-emerald-500/30 text-white light:text-slate-900"
                  : "border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-slate-700"
              }
            `}
          >
            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                text-xl
                ${
                  theme === "light"
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-400"
                    : "border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white text-slate-400"
                }
              `}
            >
              <Sun className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white light:text-slate-900">
                  Light Theme
                </h3>
                {theme === "light" && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                    Active
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Crisp daylight slate palette with high contrast and sharp readability.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* =====================================
          App Updates & Version
      ===================================== */}
      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          shadow-xl
          shadow-black/10
          light:shadow-slate-200/40
          backdrop-blur-xl
        "
      >
        <div className="border-b border-slate-800/80 light:border-slate-100 bg-slate-900/40 light:bg-slate-50/50 px-6 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <RefreshCw className="h-4.5 w-4.5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-white light:text-slate-900">
                  App Updates & Distribution
                </h2>
                <p className="text-xs text-slate-400 light:text-slate-500">
                  Check for new releases on GitHub and download the latest build.
                </p>
              </div>
            </div>

            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-xs font-bold text-sky-400">
              {CURRENT_APP_VERSION}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 p-5">
            <div>
              <h3 className="text-sm font-bold text-white light:text-slate-900">
                Check GitHub Releases
              </h3>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-md">
                Directly verify if a new version, installer, or APK has been published to the official repository.
              </p>
            </div>

            <button
              type="button"
              disabled={isCheckingUpdate}
              onClick={handleCheckUpdate}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-sky-500/30
                bg-sky-500/20
                px-5
                py-2.5
                text-xs
                font-bold
                text-sky-300
                light:text-sky-600
                transition-all
                hover:bg-sky-500
                hover:text-slate-950
                disabled:opacity-60
                disabled:cursor-not-allowed
                shrink-0
              "
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isCheckingUpdate ? "animate-spin" : ""}`} />
              {isCheckingUpdate ? "Checking..." : "Check for Updates"}
            </button>
          </div>

          {updateResult && (
            <div
              className={`
                rounded-2xl
                border
                p-5
                ${
                  updateResult.hasUpdate
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-slate-100 text-slate-300 light:text-slate-700"
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {updateResult.hasUpdate ? "🎉" : "✅"}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white light:text-slate-900">
                      {updateResult.message}
                    </h4>
                    {updateResult.release && (
                      <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
                        Latest: <span className="font-mono font-semibold text-emerald-400">{updateResult.latestVersion}</span>
                      </p>
                    )}
                  </div>
                </div>

                {updateResult.release?.htmlUrl && (
                  <a
                    href={updateResult.release.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      border
                      border-emerald-500/30
                      bg-emerald-500/20
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-emerald-300
                      hover:bg-emerald-500
                      hover:text-slate-950
                      transition-all
                    "
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Release
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================
          Data Management
      ===================================== */}
      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          shadow-xl
          shadow-black/10
          light:shadow-slate-200/40
          backdrop-blur-xl
        "
      >
        <div className="border-b border-slate-800/80 light:border-slate-100 bg-slate-900/40 light:bg-slate-50/50 px-6 sm:px-8 py-5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Download className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white light:text-slate-900">
                Data Management & Backups
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Back up, restore, and transfer your locally stored farming records.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-3">
          {/* Export */}
          <button
            type="button"
            onClick={exportBerryMasterData}
            className="
              group
              flex
              flex-col
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/[0.06]
              p-5
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
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-emerald-500/10
                text-emerald-400
                text-xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              📤
            </div>

            <h3 className="mt-4 text-sm font-bold text-white light:text-slate-900">
              Export Data
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 light:text-slate-500">
              Create a JSON backup file to restore later or transfer across devices.
            </p>

            <span className="mt-5 text-xs font-semibold text-emerald-400 flex items-center gap-1">
              Download Backup →
            </span>
          </button>

          {/* Import */}
          <button
            type="button"
            onClick={handleImportClick}
            className="
              group
              flex
              flex-col
              rounded-2xl
              border
              border-slate-700
              light:border-slate-200
              bg-slate-800/40
              light:bg-slate-50
              p-5
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
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-slate-700/50
                light:bg-slate-200
                text-xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              📥
            </div>

            <h3 className="mt-4 text-sm font-bold text-white light:text-slate-900">
              Import Data
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 light:text-slate-500">
              Restore characters, favorites, and activity history from a backup file.
            </p>

            <span className="mt-5 text-xs font-semibold text-slate-300 light:text-slate-600 flex items-center gap-1">
              Restore Backup →
            </span>
          </button>

          {/* Clear Activities */}
          <button
            type="button"
            onClick={() => setIsClearActivitiesOpen(true)}
            className="
              group
              flex
              flex-col
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/[0.04]
              p-5
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
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-red-400
                text-xl
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              🗑️
            </div>

            <h3 className="mt-4 text-sm font-bold text-red-400">
              Clear Activity History
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-400 light:text-slate-500">
              Wipe logged watering and harvest entries while keeping characters intact.
            </p>

            <span className="mt-5 text-xs font-semibold text-red-400 flex items-center gap-1">
              Clear History →
            </span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileSelected}
          className="hidden"
        />

        {importMessage && (
          <div
            className={`
              mx-6
              mb-6
              rounded-xl
              border
              px-4
              py-3
              text-xs
              font-medium
              ${
                importError
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              }
            `}
          >
            {importMessage}
          </div>
        )}
      </section>

      {/* =====================================
          Developer Mode
      ===================================== */}
      <section
        className="
          rounded-3xl
          border
          border-amber-500/20
          bg-amber-500/[0.04]
          p-6
          sm:p-7
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🛠️</span>
              <h2 className="text-base font-semibold text-white light:text-slate-900">
                Developer Mode
              </h2>
            </div>
            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-400 light:text-slate-600">
              Enable developer-only testing tools and test items (including the Debug Berry).
            </p>
            {showDeveloperBerries && (
              <p className="mt-2 text-xs font-semibold text-amber-400">
                ⚠ Developer features are currently enabled.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowDeveloperBerries(!showDeveloperBerries)}
            className={`
              relative
              h-7
              w-12
              shrink-0
              rounded-full
              transition-colors
              duration-200
              ${showDeveloperBerries ? "bg-emerald-500" : "bg-slate-700"}
            `}
            aria-label="Toggle Developer Mode"
          >
            <span
              className={`
                absolute
                top-1
                h-5
                w-5
                rounded-full
                bg-white
                shadow
                transition-all
                duration-200
                ${showDeveloperBerries ? "left-6" : "left-1"}
              `}
            />
          </button>
        </div>
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
        <div className="border-b border-red-500/20 bg-red-500/[0.06] px-6 sm:px-8 py-5">
          <div className="flex items-center gap-3.5">
            <span className="text-xl">⚠️</span>
            <div>
              <h2 className="text-base font-bold text-red-400">
                Danger Zone
              </h2>
              <p className="text-xs text-amber-300">
                Actions here permanently remove your local BerryMaster database.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="max-w-2xl text-xs leading-relaxed text-slate-400 light:text-slate-600">
            Resetting BerryMaster permanently removes all characters, favorite berries, and activity history stored in your browser or desktop container.
          </p>

          <button
            type="button"
            onClick={() => setIsResetOpen(true)}
            className="
              mt-5
              rounded-xl
              border
              border-red-500/40
              bg-red-500/10
              px-5
              py-2.5
              text-xs
              font-bold
              text-red-400
              transition-all
              duration-200
              hover:border-red-400
              hover:bg-red-500/20
              hover:shadow-lg
              hover:shadow-red-500/10
            "
          >
            ⚠️ Reset BerryMaster Application
          </button>
        </div>
      </section>

      {/* Clear Activities Confirmation */}
      <ConfirmDialog
        isOpen={isClearActivitiesOpen}
        title="Clear Activity History?"
        message="This will permanently remove all recorded farming activity. Your characters and favorites will remain intact."
        confirmText="Clear History"
        cancelText="Cancel"
        onConfirm={() => {
          clearActivities();
          setIsClearActivitiesOpen(false);
        }}
        onCancel={() => setIsClearActivitiesOpen(false)}
      />

      {/* Reset Confirmation */}
      <ConfirmDialog
        isOpen={isResetOpen}
        title="Reset BerryMaster?"
        message="This will permanently delete all characters, favorites, and settings from local storage. This action cannot be undone."
        confirmText="Reset Everything"
        cancelText="Cancel"
        onConfirm={handleResetApplication}
        onCancel={() => setIsResetOpen(false)}
      />
    </div>
  );
}