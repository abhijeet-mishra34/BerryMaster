export function formatDate(
  date?: Date | string
): string {
  if (!date) return "—";

  return new Date(date).toLocaleString([], {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDateOnly(
  date?: Date | string
): string {
  if (!date) return "—";

  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTimeOnly(
  date?: Date | string
): string {
  if (!date) return "—";

  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}