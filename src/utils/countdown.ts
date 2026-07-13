export function getRemainingMilliseconds(
  target?: string,
 current = new Date()
): number {
  if (!target) return 0;

  return Math.max(
    0,
    new Date(target).getTime() -
      current.getTime()
  );
}

export function getRemainingMinutes(
  target?: string,
  current = new Date()
): number {
  return Math.ceil(
    getRemainingMilliseconds(
      target,
      current
    ) / 60000
  );
}

export function formatRemainingTime(
  target?: string,
  current = new Date()
): string {
  if (!target) return "—";

  const remainingMs =
    getRemainingMilliseconds(
      target,
      current
    );

  if (remainingMs <= 0) {
    return "Ready";
  }

  const totalSeconds = Math.ceil(
    remainingMs / 1000
  );

  // Final minute → show seconds
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  const totalMinutes = Math.ceil(
    totalSeconds / 60
  );

  const days = Math.floor(
    totalMinutes / 1440
  );

  const hours = Math.floor(
    (totalMinutes % 1440) / 60
  );

  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function isExpired(
  target?: string,
  current = new Date()
) {
  return (
    getRemainingMilliseconds(
      target,
      current
    ) <= 0
  );
}