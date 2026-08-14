import {
  createPortal,
} from "react-dom";

import {
  useEffect,
  useRef,
} from "react";

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
  const previousFocus =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocus.current =
      document.activeElement as HTMLElement;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        event.preventDefault();

        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        originalOverflow;

      previousFocus.current?.focus();
    };
  }, [
    isOpen,
    onClose,
  ]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="
          w-full
          max-w-6xl
          rounded-2xl
          border
          border-white/[0.08]
          bg-slate-900/95
          p-6
          shadow-2xl
          backdrop-blur-xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div
          className="
            mb-6
            flex
            items-center
            justify-between
          "
        >
          <h2
            id="modal-title"
            className="
              text-2xl
              font-bold
              text-white
            "
          >
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
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
}