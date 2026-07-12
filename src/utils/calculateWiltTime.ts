/**
 * Calculates when a planted berry will wilt.
 *
 * Harvest window currently lasts 8 hours.
 */
export function calculateWiltTime(
  harvestAt: Date
): string {
  return new Date(
    harvestAt.getTime() +
      8 * 60 * 60 * 1000
  ).toISOString();
}