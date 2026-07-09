type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">

        <h2 className="text-xl font-bold text-red-400">
          {title}
        </h2>

        <p className="mt-3 text-slate-400">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}