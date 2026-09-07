import { useEffect, useRef } from "react";

/**
 * Hook to intercept Android hardware back button and swipe-back gestures.
 * When active (e.g. modal is open), it pushes a temporary history state.
 * If the user presses the Android back button, onBack() is invoked instead of exiting the app.
 * If closed programmatically, it cleans up the pushed history entry.
 */
export function useAndroidBackHandler(isOpen: boolean, onBack: () => void) {
  const pushedRef = useRef(false);
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") {
      pushedRef.current = false;
      return;
    }

    // Push a dummy history state to trap the back gesture
    window.history.pushState({ berryMasterModal: true }, "");
    pushedRef.current = true;

    const handlePopState = () => {
      if (pushedRef.current) {
        pushedRef.current = false;
        onBackRef.current();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // If modal closed via UI click rather than back button, clean up the dummy history state
      if (pushedRef.current) {
        pushedRef.current = false;
        try {
          window.history.back();
        } catch {
          // Ignore history pop errors
        }
      }
    };
  }, [isOpen]);
}
