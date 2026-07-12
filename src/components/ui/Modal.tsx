import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="
          w-full
          max-w-6xl
          rounded-xl
          bg-slate-900
          p-6
          shadow-2xl
          transition-all
          duration-200
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition-colors
              hover:bg-slate-800
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}