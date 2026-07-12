export function formatDate(date?: string): string {
  if (!date) return "—";

  return new Date(date).toLocaleString([], {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function now(): Date {
  return new Date();
}

export function isPast(date?: string): boolean {
  if (!date) return false;

  return new Date(date).getTime() <= now().getTime();
}

export function minutesBetween(
  from: Date,
  to: Date
): number {
  return Math.floor(
    (to.getTime() - from.getTime()) / 60000
  );
}

export function hoursBetween(
  from: Date,
  to: Date
): number {
  return Math.floor(
    (to.getTime() - from.getTime()) / 3600000
  );
}