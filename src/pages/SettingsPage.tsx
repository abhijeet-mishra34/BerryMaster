import { useRef, useState, useEffect } from "react";
import {
  SlidersHorizontal,
  Sun,
  Moon,
  Bell,
  Monitor,
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
  Database,
  Smartphone,
} from "lucide-react";

import { exportBerryMasterData } from "../utils/dataExport";
import { importBerryMasterData } from "../utils/dataImport";
import { useActivities } from "../context/ActivityContext";
import { useSettings } from "../context/SettingsContext";
import { useToast } from "../context/ToastContext";
import { resetBerryMaster } from "../utils/resetApp";
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
import Button from "../components/ui/Button";

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

  const { addToast } = useToast();

  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [exportError, setExportError] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState(false);
  const [isClearActivitiesOpen, setIsClearActivitiesOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  async function handleExportData() {
    setIsExporting(true);
    setExportMessage(null);
    try {
      const res = await exportBerryMasterData();
      if (res.cancelled) {
        setIsExporting(false);
        return;
      }
      setExportError(!res.success);
      setExportMessage(res.message);
      if (res.success) {
        addToast("Backup saved successfully!", "success");
      } else {
        addToast(res.message || "Failed to export backup", "error");
      }
    } catch {
      setExportError(true);
      setExportMessage("Failed to export backup.");
      addToast("Failed to export backup.", "error");
    } finally {
      setIsExporting(false);
    }
  }

  // Notification state
  const [permissionState, setPermissionState] =
    useState<PermissionState>("default");
  const [testNotificationStatus, setTestNotificationStatus] = useState<
    string | null
  >(null);
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
        setTestNotificationStatus(
          "Test alert dispatched! Check your Windows taskbar or notification center."
        );
        setPermissionState("granted");
      } else {
        setTestNotificationStatus(
          "Permission denied or not granted by the operating system."
        );
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
      setTestNotificationStatus(
        "Notification permission granted successfully!"
      );
    }
  }

  // Update check state
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateResult, setUpdateResult] = useState<UpdateCheckResult | null>(
    null
  );

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

  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importBerryMasterData(file);
      setImportError(false);
      setImportMessage("Data imported successfully. Refreshing application...");
      addToast("Backup imported successfully! Reloading...", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setImportError(true);
      const errMsg = error instanceof Error ? error.message : "Import failed.";
      setImportMessage(errMsg);
      addToast(errMsg, "error");
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
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
      {/* =====================================
          Header Hero Banner
      ===================================== */}
      <div
        className="
          theme-hero
          relative
          overflow-hidden
          rounded-xl
          p-4
          sm:p-8
          md:p-10
          shadow-xl
          backdrop-blur-xl
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4.5">
            <div
              className="
                flex
                h-13
                w-13
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-500/30
                bg-emerald-500/10
                text-emerald-400
                shadow-lg
                shadow-emerald-500/10
              "
            >
              <SlidersHorizontal className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white light:text-slate-900">
                Settings & Preferences
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 light:text-slate-600">
                Personalize your BerryMaster theme, alerts, data backups, and updates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/[0.10] light:border-slate-300 bg-slate-950/70 light:bg-white px-4 py-2 text-xs font-mono font-bold text-slate-300 light:text-slate-700 shadow-xs">
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
          theme-card
          rounded-xl
          p-4
          sm:p-8
          md:p-10
          shadow-xl
          backdrop-blur-xl
          flex
          flex-col
          gap-7
        "
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
            <Moon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white light:text-slate-900">
              Appearance & Theme
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Select the interface style tailored for your setup.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`
              group
              flex
              items-start
              gap-4
              rounded-xl
              border
              p-6
              text-left
              transition-all
              duration-200
              hover:scale-[1.01]
              active:scale-[0.99]
              cursor-pointer
              ${
                theme === "dark"
                  ? "border-emerald-500/60 bg-emerald-500/10 text-white ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/30"
                  : "border-white/[0.08] light:border-slate-200 bg-slate-950/40 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-white/[0.15] light:hover:border-slate-300"
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
                Obsidian slate palette with luminous emerald accents.
              </p>
            </div>
          </button>

          {/* Light Mode */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`
              group
              flex
              items-start
              gap-4
              rounded-xl
              border
              p-6
              text-left
              transition-all
              duration-200
              hover:scale-[1.01]
              active:scale-[0.99]
              cursor-pointer
              ${
                theme === "light"
                  ? "border-emerald-500/60 bg-emerald-500/10 text-white light:text-slate-900 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/30"
                  : "border-white/[0.08] light:border-slate-200 bg-slate-950/40 light:bg-slate-50 text-slate-400 light:text-slate-600 hover:border-white/[0.15] light:hover:border-slate-300"
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

        {/* Intro Loading Screen Preview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] light:bg-emerald-50/60 p-4 sm:p-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white light:text-slate-900">
                Gaming Companion Intro Screen
              </h4>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Holographic diagnostics and system initialization sequence.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("berrymaster:preview-splash"))
            }
            className="shrink-0"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>Replay Intro Screen</span>
          </Button>
        </div>

        {/* UFO Easter Egg Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-teal-500/20 bg-teal-500/[0.04] light:bg-teal-50/60 p-4 sm:p-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 text-xl">
              🛸
            </div>
            <div>
              <h4 className="text-sm font-bold text-white light:text-slate-900">
                UFO Abduction Easter Egg
              </h4>
              <p className="text-xs text-slate-400 light:text-slate-500">
                A curious UFO hovers by occasionally to borrow a specimen and return it safely.
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("berrymaster:summon-ufo"))
            }
            className="shrink-0 border-teal-500/40 text-teal-300 hover:text-white hover:border-teal-400"
          >
            <span className="mr-2">🛸</span>
            <span>Summon UFO Now</span>
          </Button>
        </div>
      </section>

      {/* =====================================
          2. Notifications & Background Alarms
      ===================================== */}
      <section
        className="
          theme-card
          rounded-xl
          p-4
          sm:p-8
          md:p-10
          shadow-xl
          backdrop-blur-xl
          flex
          flex-col
          gap-7
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white light:text-slate-900">
                Notifications & Alerts
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Configure farming alerts and background execution.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                px-3.5
                py-1.5
                text-xs
                font-bold
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
            </span>

            {permissionState !== "granted" && (
              <button
                type="button"
                onClick={handleRequestPermission}
                className="rounded-xl border border-emerald-400/40 bg-emerald-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Grant
              </button>
            )}
          </div>
        </div>

        {/* PC System Tray Mode Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-xl border border-white/[0.08] bg-slate-950/40 light:bg-slate-50/80 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800 light:bg-slate-200 text-emerald-400 border border-slate-700/50">
              <Monitor className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
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

        {/* 3 Event Filter Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Water Needed */}
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-slate-950/30 light:bg-slate-50/60 p-5 transition-all hover:border-white/[0.15]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
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
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-slate-950/30 light:bg-slate-50/60 p-5 transition-all hover:border-white/[0.15]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
          <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-slate-950/30 light:bg-slate-50/60 p-5 transition-all hover:border-white/[0.15]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
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

        {/* Test Notification Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white light:text-slate-900">
                Test Notification Alert
              </h3>
              <p className="mt-0.5 text-xs text-slate-400 light:text-slate-500 leading-relaxed max-w-lg">
                Dispatch an instant test notification to check your taskbar alerts and background alarms.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            disabled={isSendingTest}
            onClick={handleSendTestNotification}
            className="shrink-0"
          >
            <Bell className={`mr-2 h-4 w-4 ${isSendingTest ? "animate-pulse" : ""}`} />
            <span>{isSendingTest ? "Sending Test..." : "Send Test Notification"}</span>
          </Button>
        </div>

        {testNotificationStatus && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3.5 text-xs font-medium text-emerald-300 flex items-center gap-2.5">
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
          theme-card
          rounded-xl
          p-4
          sm:p-8
          md:p-10
          shadow-xl
          backdrop-blur-xl
          flex
          flex-col
          gap-7
        "
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white light:text-slate-900">
              Data Management & Backups
            </h2>
            <p className="text-xs text-slate-400 light:text-slate-500">
              Export, import, and backup your local characters, favorites, and farming logs.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Export Card */}
          <div className="flex flex-col justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 transition-all hover:border-emerald-500/40">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
              disabled={isExporting}
              onClick={handleExportData}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-5 py-3.5 text-sm font-bold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-slate-950 hover:shadow-md hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              <Download className={`h-4.5 w-4.5 ${isExporting ? "animate-bounce" : ""}`} />
              <span>{isExporting ? "Exporting Backup..." : "Download Backup"}</span>
            </button>
          </div>

          {/* Import Card */}
          <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-slate-950/40 light:bg-slate-50 p-6 transition-all hover:border-white/[0.15]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-700 border border-slate-700/50">
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
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
            >
              <Upload className="h-4.5 w-4.5" />
              Restore Backup
            </button>
          </div>

          {/* Clear Activity Card */}
          <div className="flex flex-col justify-between rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-6 transition-all hover:border-rose-500/40">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Trash2 className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-rose-400">
                Clear Activity
              </h3>

              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 leading-relaxed">
                Wipe logged farming activity timestamps while leaving all characters intact.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsClearActivitiesOpen(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-3.5 text-sm font-bold text-rose-300 transition-all hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-500/20 active:scale-[0.98] cursor-pointer"
            >
              <Trash2 className="h-4.5 w-4.5" />
              Clear Logs
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

        {exportMessage && (
          <div
            className={`rounded-xl border px-5 py-3.5 text-xs font-medium ${
              exportError
                ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {exportMessage}
          </div>
        )}

        {importMessage && (
          <div
            className={`rounded-xl border px-5 py-3.5 text-xs font-medium ${
              importError
                ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {importMessage}
          </div>
        )}
      </section>

      {/* =====================================
          4. App Updates & Downloads
      ===================================== */}
      <section
        className="
          theme-card
          rounded-xl
          p-4
          sm:p-8
          md:p-10
          shadow-xl
          backdrop-blur-xl
          flex
          flex-col
          gap-7
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white light:text-slate-900">
                App Updates & Downloads
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Download the latest desktop installer (EXE), Android APK, or check for online updates.
              </p>
            </div>
          </div>

          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 font-mono text-xs font-bold text-sky-400">
            v{CURRENT_APP_VERSION}
          </span>
        </div>

        {/* Prominent Quick-Download Cards (Windows EXE & Android APK) */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Windows Setup EXE */}
          <div className="flex flex-col justify-between rounded-2xl border border-sky-500/20 light:border-sky-200 bg-sky-950/20 light:bg-sky-50/60 p-6 transition-all hover:border-sky-500/40">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 light:text-sky-700 border border-sky-500/30">
                <Monitor className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white light:text-slate-900">
                  Windows Desktop Setup
                </h3>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  Official Windows installer with automatic system tray support and local notifications.
                </p>
              </div>
            </div>

            <Button
              variant="info"
              size="lg"
              onClick={() =>
                openExternalUrl(
                  "https://github.com/abhijeet-mishra34/BerryMaster/releases/latest/download/BerryMaster-Windows-Setup.exe"
                )
              }
              className="mt-5 w-full font-black tracking-wide"
            >
              <Download className="mr-2 h-4.5 w-4.5" />
              <span>Download Windows Setup (.exe)</span>
            </Button>
          </div>

          {/* Android APK */}
          <div className="flex flex-col justify-between rounded-2xl border border-emerald-500/20 light:border-emerald-200 bg-emerald-950/20 light:bg-emerald-50/60 p-6 transition-all hover:border-emerald-500/40">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 light:text-emerald-700 border border-emerald-500/30">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white light:text-slate-900">
                  Android Mobile APK
                </h3>
                <p className="mt-1 text-xs text-slate-400 light:text-slate-600 leading-relaxed">
                  Universal Android mobile application with offline tracking and background alarms.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                openExternalUrl(
                  "https://github.com/abhijeet-mishra34/BerryMaster/releases/latest/download/BerryMaster-universal.apk"
                )
              }
              className="mt-5 w-full font-black tracking-wide"
            >
              <Download className="mr-2 h-4.5 w-4.5" />
              <span>Download Android APK (.apk)</span>
            </Button>
          </div>
        </div>

        {/* Update Check Control Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-xl border border-white/[0.08] light:border-slate-200 bg-slate-950/40 light:bg-slate-50/80 p-6">
          <div>
            <h3 className="text-sm font-bold text-white light:text-slate-900">
              Check for Online Updates
            </h3>
            <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-md leading-relaxed">
              Verify with GitHub Releases to check if a newer patch or feature version has been published.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                openExternalUrl(
                  "https://github.com/abhijeet-mishra34/BerryMaster/releases"
                )
              }
            >
              <ExternalLink className="mr-2 h-4.5 w-4.5" />
              <span>All Releases</span>
            </Button>
            <Button
              variant="info"
              size="lg"
              disabled={isCheckingUpdate}
              onClick={handleCheckUpdate}
            >
              <RefreshCw className={`mr-2 h-4.5 w-4.5 ${isCheckingUpdate ? "animate-spin" : ""}`} />
              <span>{isCheckingUpdate ? "Checking GitHub..." : "Check for Updates"}</span>
            </Button>
          </div>
        </div>

        {/* Update Check Results */}
        {updateResult && (
          <div
            className={`rounded-2xl border p-6 sm:p-7 ${
              updateResult.hasUpdate
                ? "border-emerald-500/40 bg-emerald-950/20 light:bg-emerald-50/70 shadow-lg shadow-emerald-500/10"
                : updateResult.error
                ? "border-rose-500/30 bg-rose-500/10"
                : "border-sky-500/30 bg-sky-500/10"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p className="text-base font-bold text-white light:text-slate-900">
                  {updateResult.error
                    ? "Update Check Failed"
                    : updateResult.hasUpdate
                    ? `🎉 New Version Available: ${updateResult.latestVersion}`
                    : "✨ You are running the latest version"}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
                  {updateResult.error ||
                    (updateResult.hasUpdate
                      ? `Version ${updateResult.latestVersion} has been released on GitHub with new improvements.`
                      : `BerryMaster v${CURRENT_APP_VERSION} is currently up to date.`)}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap shrink-0">
                {updateResult.release?.htmlUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      openExternalUrl(updateResult.release?.htmlUrl || "")
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
                  >
                    <ExternalLink className="h-4.5 w-4.5" />
                    <span>View Release & Downloads</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================
          5. Advanced & Danger Zone
      ===================================== */}
      <div className="flex flex-col gap-6">
        {/* Developer Mode Card */}
        <section className="theme-card rounded-xl border border-amber-500/20 light:border-amber-200 bg-amber-500/[0.03] light:bg-amber-50/40 p-8 sm:p-9 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Wrench className="h-5 w-5" />
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
        <section className="theme-card rounded-xl border border-rose-500/30 light:border-rose-200 bg-rose-500/[0.03] light:bg-rose-50/40 p-8 sm:p-10 shadow-xl backdrop-blur-xl flex flex-col gap-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-400">
                Danger Zone
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Irreversible actions that completely reset your application state.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-6">
            <div>
              <h3 className="text-sm font-bold text-white light:text-slate-900">
                Reset BerryMaster Application
              </h3>
              <p className="mt-1 text-xs text-slate-400 light:text-slate-500 max-w-lg leading-relaxed">
                Permanently erase all characters, planted plot timers, favorite berries, inventory, and settings from local storage.
              </p>
            </div>

            <Button
              variant="danger"
              size="md"
              onClick={() => setIsResetOpen(true)}
              className="shrink-0"
            >
              <ShieldAlert className="mr-2 h-4 w-4" />
              Reset Everything
            </Button>
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