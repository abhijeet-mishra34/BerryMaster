import {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  SlidersHorizontal,
  Sun,
  Moon,
  Bell,
  Settings,
  Droplets,
  Sparkles,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  ExternalLink,
  Wrench,
  ShieldAlert,
  Check,
  Activity,
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

import { openExternalUrl } from "../utils/urlHelper";

import {
  sendTestNotification,
  requestNotificationPermission,
  getNotificationPermissionStatus,
  type PermissionState,
} from "../services/nativeNotificationService";

import ConfirmDialog from "../components/ui/ConfirmDialog";

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { clearActivities } = useActivities();

  const {
    showDeveloperBerries,
    setShowDeveloperBerries,
    theme,
    setTheme,
    desktopMinimizeToTray,
    setDesktopMinimizeToTray,
    notifyOnWater,
    setNotifyOnWater,
    notifyOnHarvest,
    setNotifyOnHarvest,
    notifyOnWilt,
    setNotifyOnWilt,
  } = useSettings();

  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState(false);
  const [isClearActivitiesOpen, setIsClearActivitiesOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Notification state
  const [permissionState, setPermissionState] = useState<PermissionState>("default");
  const [testNotificationStatus, setTestNotificationStatus] = useState<string | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);

  useEffect(() => {
    getNotificationPermissionStatus().then(setPermissionState);
  }, []);

  async function handleSendTestNotification() {
    setIsSendingTest(true);
    setTestNotificationStatus(null);
    try {
      const success = await sendTestNotification();
      if (success) {
        setTestNotificationStatus("Test alert dispatched! Check your Windows taskbar / notification center.");
        setPermissionState("granted");
      } else {
        setTestNotificationStatus("Permission denied or not granted by the operating system.");
        setPermissionState("denied");
      }
    } catch {
      setTestNotificationStatus("Failed to dispatch test notification.");
    } finally {
      setIsSendingTest(false);
    }
  }

  async function handleRequestPermission() {
    const granted = await requestNotificationPermission();
    setPermissionState(granted ? "granted" : "denied");
    if (granted) {
      setTestNotificationStatus("Notification permission granted successfully!");
    }
  }

  // Update check state
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateResult, setUpdateResult] = useState<UpdateCheckResult | null>(null);

  async function handleCheckUpdate() {
    setIsCheckingUpdate(true);
    const result = await checkForAppUpdates();
    setUpdateResult(result);
    setIsCheckingUpdate(false);
  }

  // Import handlers
  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importBerryMasterData(file);
      setImportError(false);
      setImportMessage("Data imported successfully. Refreshing application...");
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

  // Reset Application
  function handleResetApplication() {
    resetBerryMaster();
    setIsResetOpen(false);
    window.location.reload();
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
      {/* =====================================
          Header Banner
      ===================================== */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-slate-800/80
          light:border-slate-200
          bg-gradient-to-r
          from-slate-900
          via-slate-900/95
          to-slate-950
          light:from-white
          light:via-slate-50
          light:to-slate-100
          p-6
          sm:p-8
          shadow-xl
          backdrop-blur-xl
        "
      >
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-13
                w-13
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-emerald-500/25
                bg-emerald-500/10
                text-emerald-400
                shadow-inner
              "
            >
              <SlidersHorizontal className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-slate-900">
                Settings & Preferences
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 light:text-slate-600">
                Personalize your BerryMaster theme, alerts, backups, and app updates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-white px-3.5 py-1.5 text-xs font-mono font-medium text-slate-300 light:text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              v{CURRENT_APP_VERSION}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================
          1. Appearance & Theme
      ===================================== */}
      <section
        className="
          rounded-3xl
          border
          border-slate-800/80
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          p-6
          sm:p-8
          shadow-xl
          backdrop-blur-md
          flex
          flex-col
          gap-6
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sun className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white light:text-slate-900">
              Appearance & Theme
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Select the interface style tailored for your setup and lighting.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Dark Mode Card */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`
              group
              relative
              flex
              items-start
              gap-4
              rounded-2xl
              border
              p-5
              text-left
              transition-all
              duration-200
              hover:scale-[1.01]
              active:scale-[0.99]
              ${
                theme === "dark"
                  ? "border-emerald-500/60 bg-emerald-500/10 ring-2 ring-emerald-500/30 text-white shadow-lg shadow-emerald-950/20"
                  : "border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-slate-700 light:hover:border-slate-300"
              }
            `}
          >
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                transition-transform
                duration-200
                group-hover:scale-105
                ${
                  theme === "dark"
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                    : "border-slate-800 bg-slate-900 text-slate-400"
                }
              `}
            >
              <Moon className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white light:text-slate-900">
                  Dark Theme
                </h3>
                {theme === "dark" && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    <Check className="h-3 w-3" />
                    Active
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Obsidian slate palette with luminous emerald jewel accents. Ideal for low-light environments.
              </p>
            </div>
          </button>

          {/* Light Mode Card */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`
              group
              relative
              flex
              items-start
              gap-4
              rounded-2xl
              border
              p-5
              text-left
              transition-all
              duration-200
              hover:scale-[1.01]
              active:scale-[0.99]
              ${
                theme === "light"
                  ? "border-emerald-500/60 bg-emerald-500/10 ring-2 ring-emerald-500/30 text-white light:text-slate-900 shadow-lg shadow-emerald-950/20"
                  : "border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-slate-700 light:hover:border-slate-300"
              }
            `}
          >
            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                transition-transform
                duration-200
                group-hover:scale-105
                ${
                  theme === "light"
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-500"
                    : "border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white text-slate-400"
                }
              `}
            >
              <Sun className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white light:text-slate-900">
                  Light Theme
                </h3>
                {theme === "light" && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500 border border-emerald-500/30">
                    <Check className="h-3 w-3" />
                    Active
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Clean daylight slate palette with high contrast and sharp legibility.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* =====================================
          2. Notifications & Background Alarms
      ===================================== */}
      <section
        className="
          rounded-3xl
          border
          border-slate-800/80
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          p-6
          sm:p-8
          shadow-xl
          backdrop-blur-md
          flex
          flex-col
          gap-6
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white light:text-slate-900">
                Notifications & Background Alarms
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Configure farming alerts and background execution.
              </p>
            </div>
          </div>

          {/* OS Permission Badge */}
          <div className="flex items-center gap-2">
            <div
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                border
                ${
                  permissionState === "granted"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : permissionState === "denied"
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                }
              `}
            >
              {permissionState === "granted" ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Alerts Enabled</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Permission Needed</span>
                </>
              )}
            </div>

            {permissionState !== "granted" && (
              <button
                type="button"
                onClick={handleRequestPermission}
                className="
                  rounded-xl
                  border
                  border-emerald-500/40
                  bg-emerald-500
                  px-3.5
                  py-1
                  text-xs
                  font-bold
                  text-slate-950
                  hover:bg-emerald-400
                  transition-all
                  shadow-sm
                  active:scale-95
                "
              >
                Grant
              </button>
            )}
          </div>
        </div>

        {/* Desktop Tray Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50/80 p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 light:bg-slate-200 text-emerald-400 border border-slate-700/50">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white light:text-slate-900">
                  PC System Tray Mode
                </h3>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  Desktop
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed max-w-xl">
                When closed, BerryMaster minimizes to the Windows taskbar / system tray to fire precise watering and harvest alarms in the background.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={desktopMinimizeToTray}
            onClick={() => setDesktopMinimizeToTray(!desktopMinimizeToTray)}
            className={`
              relative
              h-7
              w-13
              shrink-0
              cursor-pointer
              rounded-full
              p-1
              transition-colors
              duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500/40
              ${desktopMinimizeToTray ? "bg-emerald-500" : "bg-slate-700"}
            `}
          >
            <span
              className={`
                block
                h-5
                w-5
                rounded-full
                bg-white
                shadow-md
                transition-transform
                duration-200
                ${desktopMinimizeToTray ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>

        {/* 3 Event Filter Rows */}
        <div className="grid gap-3.5 sm:grid-cols-3">
          {/* Water Needed */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800/90 light:border-slate-200 bg-slate-950/30 light:bg-slate-50/60 p-4 transition-all hover:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Droplets className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white light:text-slate-900">
                  Water Needed
                </h4>
                <p className="text-[11px] text-slate-400 light:text-slate-500">
                  Dry soil reminders
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifyOnWater}
              onClick={() => setNotifyOnWater(!notifyOnWater)}
              className={`
                relative
                h-6
                w-11
                shrink-0
                cursor-pointer
                rounded-full
                p-0.5
                transition-colors
                duration-200
                ${notifyOnWater ? "bg-emerald-500" : "bg-slate-700"}
              `}
            >
              <span
                className={`
                  block
                  h-5
                  w-5
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-transform
                  duration-200
                  ${notifyOnWater ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          {/* Harvest Ready */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800/90 light:border-slate-200 bg-slate-950/30 light:bg-slate-50/60 p-4 transition-all hover:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white light:text-slate-900">
                  Harvest Ready
                </h4>
                <p className="text-[11px] text-slate-400 light:text-slate-500">
                  Ripe crop alerts
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifyOnHarvest}
              onClick={() => setNotifyOnHarvest(!notifyOnHarvest)}
              className={`
                relative
                h-6
                w-11
                shrink-0
                cursor-pointer
                rounded-full
                p-0.5
                transition-colors
                duration-200
                ${notifyOnHarvest ? "bg-emerald-500" : "bg-slate-700"}
              `}
            >
              <span
                className={`
                  block
                  h-5
                  w-5
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-transform
                  duration-200
                  ${notifyOnHarvest ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          {/* Wilt Warnings */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800/90 light:border-slate-200 bg-slate-950/30 light:bg-slate-50/60 p-4 transition-all hover:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white light:text-slate-900">
                  Wilt Warnings
                </h4>
                <p className="text-[11px] text-slate-400 light:text-slate-500">
                  Expiring plant alarms
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifyOnWilt}
              onClick={() => setNotifyOnWilt(!notifyOnWilt)}
              className={`
                relative
                h-6
                w-11
                shrink-0
                cursor-pointer
                rounded-full
                p-0.5
                transition-colors
                duration-200
                ${notifyOnWilt ? "bg-emerald-500" : "bg-slate-700"}
              `}
            >
              <span
                className={`
                  block
                  h-5
                  w-5
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-transform
                  duration-200
                  ${notifyOnWilt ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>
        </div>

        {/* Test Notification Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
          <div>
            <h3 className="text-sm font-bold text-white light:text-slate-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              Test Device Notification
            </h3>
            <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-lg leading-relaxed">
              Dispatch an instant test notification to check your Windows desktop banner or Android notification drawer.
            </p>
          </div>

          <button
            type="button"
            disabled={isSendingTest}
            onClick={handleSendTestNotification}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-emerald-400/40
              bg-emerald-500
              px-5
              py-2.5
              text-xs
              font-bold
              text-slate-950
              transition-all
              hover:bg-emerald-400
              hover:shadow-lg
              hover:shadow-emerald-500/20
              active:scale-95
              disabled:opacity-60
              disabled:cursor-not-allowed
              shrink-0
            "
          >
            <Bell className={`h-3.5 w-3.5 ${isSendingTest ? "animate-pulse" : ""}`} />
            {isSendingTest ? "Sending Test..." : "Send Test Notification"}
          </button>
        </div>

        {testNotificationStatus && (
          <div
            className={`
              rounded-xl
              border
              px-4
              py-3
              text-xs
              font-medium
              flex
              items-center
              gap-2.5
              ${
                testNotificationStatus.includes("dispatched") || testNotificationStatus.includes("granted")
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              }
            `}
          >
            <span className="text-sm">ℹ️</span>
            <span>{testNotificationStatus}</span>
          </div>
        )}
      </section>

      {/* =====================================
          3. Data Management & Backups
      ===================================== */}
      <section
        className="
          rounded-3xl
          border
          border-slate-800/80
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          p-6
          sm:p-8
          shadow-xl
          backdrop-blur-md
          flex
          flex-col
          gap-6
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Download className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white light:text-slate-900">
              Data Management & Backups
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Export, import, and manage your local characters, favorites, and farming logs.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Export Card */}
          <div
            className="
              flex
              flex-col
              justify-between
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/[0.04]
              p-5
              transition-all
              duration-200
              hover:border-emerald-500/40
              hover:bg-emerald-500/[0.07]
            "
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Download className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-white light:text-slate-900">
                Export Data
              </h3>

              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Save a full JSON backup of all characters, favorites, and activity history to disk.
              </p>
            </div>

            <button
              type="button"
              onClick={exportBerryMasterData}
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-emerald-400/30
                bg-emerald-500/20
                px-4
                py-2.5
                text-xs
                font-bold
                text-emerald-300
                transition-all
                hover:bg-emerald-500
                hover:text-slate-950
                hover:shadow-md
                hover:shadow-emerald-500/20
                active:scale-[0.98]
              "
            >
              <Download className="h-3.5 w-3.5" />
              Download Backup
            </button>
          </div>

          {/* Import Card */}
          <div
            className="
              flex
              flex-col
              justify-between
              rounded-2xl
              border
              border-slate-800
              light:border-slate-200
              bg-slate-950/40
              light:bg-slate-50
              p-5
              transition-all
              duration-200
              hover:border-slate-700
              light:hover:border-slate-300
            "
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700 border border-slate-700/50">
                <Upload className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-white light:text-slate-900">
                Import Data
              </h3>

              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Restore characters and database records from a previously exported backup file.
              </p>
            </div>

            <button
              type="button"
              onClick={handleImportClick}
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-700
                light:border-slate-300
                bg-slate-800/80
                light:bg-slate-200/80
                px-4
                py-2.5
                text-xs
                font-bold
                text-slate-200
                light:text-slate-800
                transition-all
                hover:bg-slate-700
                light:hover:bg-slate-300
                active:scale-[0.98]
              "
            >
              <Upload className="h-3.5 w-3.5" />
              Restore Backup
            </button>
          </div>

          {/* Clear Activity Card */}
          <div
            className="
              flex
              flex-col
              justify-between
              rounded-2xl
              border
              border-rose-500/20
              bg-rose-500/[0.03]
              p-5
              transition-all
              duration-200
              hover:border-rose-500/40
              hover:bg-rose-500/[0.06]
            "
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Trash2 className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-rose-400">
                Clear Activity History
              </h3>

              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Wipe logged farming activity timestamps while leaving all characters intact.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsClearActivitiesOpen(true)}
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-rose-500/30
                bg-rose-500/10
                px-4
                py-2.5
                text-xs
                font-bold
                text-rose-300
                transition-all
                hover:bg-rose-500
                hover:text-white
                hover:shadow-md
                hover:shadow-rose-500/20
                active:scale-[0.98]
              "
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear History
            </button>
          </div>
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
              rounded-xl
              border
              px-4
              py-3
              text-xs
              font-medium
              ${
                importError
                  ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              }
            `}
          >
            {importMessage}
          </div>
        )}
      </section>

      {/* =====================================
          4. App Updates & Release Notes
      ===================================== */}
      <section
        className="
          rounded-3xl
          border
          border-slate-800/80
          light:border-slate-200
          bg-slate-900/60
          light:bg-white
          p-6
          sm:p-8
          shadow-xl
          backdrop-blur-md
          flex
          flex-col
          gap-6
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <RefreshCw className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white light:text-slate-900">
                App Updates & Releases
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Check GitHub for new features, bug fixes, and installer updates.
              </p>
            </div>
          </div>

          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-xs font-bold text-sky-400">
            {CURRENT_APP_VERSION}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-950/40 light:bg-slate-50/80 p-5">
          <div>
            <h3 className="text-sm font-bold text-white light:text-slate-900">
              Official GitHub Releases
            </h3>
            <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-md leading-relaxed">
              Verify if an updated desktop installer (MSI/EXE) or mobile package is available.
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
              border-sky-500/40
              bg-sky-500/20
              px-5
              py-2.5
              text-xs
              font-bold
              text-sky-300
              light:text-sky-700
              transition-all
              hover:bg-sky-500
              hover:text-slate-950
              hover:shadow-md
              hover:shadow-sky-500/20
              active:scale-95
              disabled:opacity-60
              disabled:cursor-not-allowed
              shrink-0
            "
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isCheckingUpdate ? "animate-spin" : ""}`} />
            {isCheckingUpdate ? "Checking Releases..." : "Check for Updates"}
          </button>
        </div>

        {updateResult && (
          <div
            className={`
              rounded-2xl
              border
              p-5
              flex
              flex-col
              gap-4
              ${
                updateResult.hasUpdate
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-slate-100 text-slate-300 light:text-slate-700"
              }
            `}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                      Latest Release: <span className="font-mono font-semibold text-emerald-400">{updateResult.latestVersion}</span>
                    </p>
                  )}
                </div>
              </div>

              {updateResult.release?.htmlUrl && (
                <button
                  type="button"
                  onClick={() => openExternalUrl(updateResult.release?.htmlUrl || "")}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    border
                    border-emerald-400/40
                    bg-emerald-500
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-slate-950
                    hover:bg-emerald-400
                    transition-all
                    shadow-sm
                    active:scale-95
                    shrink-0
                    cursor-pointer
                  "
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Release Notes
                </button>
              )}
            </div>

            {/* Direct 1-Click Asset Downloads if available */}
            {updateResult.release?.assets && updateResult.release.assets.length > 0 && (
              <div className="pt-3 border-t border-emerald-500/20 flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold text-emerald-400">Direct Downloads:</span>
                {updateResult.release.assets.map((asset) => (
                  <button
                    key={asset.downloadUrl}
                    type="button"
                    onClick={() => openExternalUrl(asset.downloadUrl)}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-emerald-500/30
                      bg-slate-950/60
                      px-3
                      py-1.5
                      text-xs
                      font-mono
                      text-emerald-300
                      hover:bg-emerald-500/20
                      hover:border-emerald-400
                      transition-all
                      cursor-pointer
                    "
                  >
                    <Download className="h-3 w-3" />
                    <span>{asset.name}</span>
                    {asset.size > 0 && (
                      <span className="text-[10px] opacity-70">
                        ({(asset.size / (1024 * 1024)).toFixed(1)} MB)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* =====================================
          5. Advanced & Danger Zone
      ===================================== */}
      <div className="flex flex-col gap-6">
        {/* Developer Mode Card */}
        <section
          className="
            rounded-3xl
            border
            border-amber-500/20
            bg-amber-500/[0.03]
            p-6
            sm:p-7
            backdrop-blur-md
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Wrench className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white light:text-slate-900">
                  Developer Mode
                </h2>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-xl leading-relaxed">
                  Reveal developer debug tools and test items (including the Debug Berry) in charts and catalogs.
                </p>
                {showDeveloperBerries && (
                  <p className="mt-2 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Developer features are currently active
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={showDeveloperBerries}
              onClick={() => setShowDeveloperBerries(!showDeveloperBerries)}
              className={`
                relative
                h-7
                w-13
                shrink-0
                cursor-pointer
                rounded-full
                p-1
                transition-colors
                duration-200
                ${showDeveloperBerries ? "bg-emerald-500" : "bg-slate-700"}
              `}
            >
              <span
                className={`
                  block
                  h-5
                  w-5
                  rounded-full
                  bg-white
                  shadow-md
                  transition-transform
                  duration-200
                  ${showDeveloperBerries ? "translate-x-6" : "translate-x-0"}
                `}
              />
            </button>
          </div>
        </section>

        {/* Danger Zone Card */}
        <section
          className="
            rounded-3xl
            border
            border-rose-500/30
            bg-rose-500/[0.03]
            p-6
            sm:p-8
            shadow-xl
            backdrop-blur-md
            flex
            flex-col
            gap-5
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-rose-400">
                Danger Zone
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Irreversible actions that completely reset your application state.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
            <div>
              <h3 className="text-sm font-bold text-white light:text-slate-900">
                Reset BerryMaster Application
              </h3>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-lg leading-relaxed">
                Permanently erase all characters, planted plot timers, favorite berries, inventory, and settings from local storage.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsResetOpen(true)}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-rose-500/40
                bg-rose-500/20
                px-5
                py-2.5
                text-xs
                font-bold
                text-rose-300
                transition-all
                hover:bg-rose-500
                hover:text-white
                hover:shadow-lg
                hover:shadow-rose-500/20
                active:scale-95
                shrink-0
              "
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Reset Everything
            </button>
          </div>
        </section>
      </div>

      {/* Clear Activities Confirmation */}
      <ConfirmDialog
        isOpen={isClearActivitiesOpen}
        title="Clear Activity History?"
        message="This will permanently remove all recorded farming activity history. Your characters, planted berry plots, and favorites will remain intact."
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