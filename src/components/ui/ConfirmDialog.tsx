import { AlertTriangle, AlertCircle } from "lucide-react";
import Modal from "./Modal";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  itemName,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      maxWidth="md"
      icon={
        <div className="text-rose-400">
          <AlertTriangle className="h-6 w-6" />
        </div>
      }
      onClose={onCancel}
    >
      <div className="space-y-6 pt-1">
        {/* Message */}
        <p className="text-sm sm:text-base text-slate-300 light:text-slate-600 leading-relaxed">
          {message}
        </p>

        {/* Affected Item Name Callout */}
        {itemName && (
          <div className="rounded-2xl border border-rose-500/25 light:border-rose-200 bg-rose-500/[0.08] light:bg-rose-50 p-4 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
              Affected Target
            </span>
            <p className="text-base sm:text-lg font-bold text-white light:text-slate-900 truncate">
              🌿 {itemName}
            </p>
          </div>
        )}

        {/* Caution Notice */}
        <div className="flex items-center gap-3 rounded-xl border border-amber-500/25 light:border-amber-200 bg-amber-500/10 light:bg-amber-50 px-4 py-3 text-xs sm:text-sm font-semibold text-amber-300 light:text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 light:text-amber-600" />
          <span>This action cannot be undone.</span>
        </div>

        {/* Spacious Action Buttons */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              h-12
              rounded-xl
              border
              border-slate-700
              light:border-slate-300
              bg-slate-800/80
              light:bg-slate-100
              hover:bg-slate-700
              light:hover:bg-slate-200
              text-slate-200
              light:text-slate-700
              hover:text-white
              light:hover:text-slate-900
              font-bold
              text-sm
              transition-all
              active:scale-[0.98]
              cursor-pointer
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              h-12
              rounded-xl
              bg-gradient-to-r
              from-rose-500
              to-red-600
              hover:from-rose-600
              hover:to-red-700
              text-white
              font-bold
              text-sm
              shadow-lg
              shadow-rose-500/25
              hover:shadow-rose-500/40
              transition-all
              active:scale-[0.98]
              cursor-pointer
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}