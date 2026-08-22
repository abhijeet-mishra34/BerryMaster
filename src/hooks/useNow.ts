import { useEffect, useState } from "react";

// Global singleton ticker to avoid multiple setIntervals across multiple cards
type Listener = (now: Date) => void;
const listeners = new Set<Listener>();
let globalTimer: ReturnType<typeof setInterval> | null = null;
let lastTickDate = new Date();

function startGlobalTicker() {
  if (globalTimer !== null) return;
  globalTimer = setInterval(() => {
    lastTickDate = new Date();
    listeners.forEach((listener) => listener(lastTickDate));
  }, 1000);
}

function stopGlobalTicker() {
  if (listeners.size === 0 && globalTimer !== null) {
    clearInterval(globalTimer);
    globalTimer = null;
  }
}

export function useNow(): Date {
  const [now, setNow] = useState<Date>(() => lastTickDate);

  useEffect(() => {
    listeners.add(setNow);
    startGlobalTicker();

    return () => {
      listeners.delete(setNow);
      stopGlobalTicker();
    };
  }, []);

  return now;
}