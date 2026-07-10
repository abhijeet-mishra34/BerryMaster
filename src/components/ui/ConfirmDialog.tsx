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
      onClose={onCancel}
    >
      <h2 className="text-2xl font-bold text-red-400">
        🗑 {title}
      </h2>

      <p className="mt-4 text-slate-400">
        {message}
      </p>

      {itemName && (
        <div className="mt-5 rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">
          <p className="font-semibold text-emerald-400">
            🌿 {itemName}
          </p>
        </div>
      )}

      <p className="mt-4 text-sm text-slate-500">
        This action cannot be undone.
      </p>

      <div className="mt-8 flex justify-end gap-3">
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
    </Modal>
  );
}