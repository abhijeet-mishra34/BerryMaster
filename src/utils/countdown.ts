export function getRemainingMinutes(
  target?: string,
  current = new Date()
): number {
  if (!target) return 0;

  return Math.max(
    0,
    Math.floor(
      (new Date(target).getTime() -
        current.getTime()) /
        60000
    )
  );
}

export function formatRemainingTime(
  target?: string,
  current = new Date()
): string {
  if (!target) return "—";

  const minutes = getRemainingMinutes(
    target,
    current
  );

  if (minutes <= 0) {
    return "Ready";
  }

  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }

  return `${mins}m`;
}

export function isExpired(
  target?: string,
  current = new Date()
) {
  return getRemainingMinutes(
    target,
    current
  ) === 0;
}