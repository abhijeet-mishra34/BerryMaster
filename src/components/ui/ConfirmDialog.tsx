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
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
    >
      <div className="space-y-6">
        <p className="text-slate-400 light:text-slate-600">
          {message}
        </p>

        {itemName && (
          <div className="rounded-xl border border-red-500/30 light:border-red-200 bg-red-500/10 light:bg-red-50 p-4">
            <p className="text-center text-lg font-semibold text-white light:text-slate-900">
              🌿 {itemName}
            </p>
          </div>
        )}

        <div className="rounded-lg border border-yellow-500/20 light:border-yellow-200 bg-yellow-500/10 light:bg-yellow-50 p-3">
          <p className="text-sm text-yellow-300 light:text-yellow-800">
            ⚠ This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
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