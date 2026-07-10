import Modal from "./Modal";
import Button from "./Button";

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
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-red-400">
            🗑 {title}
          </h2>

          <p className="mt-3 text-slate-400">
            {message}
          </p>
        </div>

        {itemName && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-center text-lg font-semibold text-white">
              🌿 {itemName}
            </p>
          </div>
        )}

        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
          <p className="text-sm text-yellow-300">
            ⚠ This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}