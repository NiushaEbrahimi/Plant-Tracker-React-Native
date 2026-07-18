import { Plant } from '../types/plant';

const DAY_MS = 1000 * 60 * 60 * 24;

/** Days remaining until this plant needs water. Negative = overdue. */
export function daysUntilNextWatering(plant: Plant): number {
  const lastWatered = new Date(plant.lastWateredAt).getTime();
  const dueAt = lastWatered + plant.waterIntervalDays * DAY_MS;
  const now = Date.now();
  return Math.ceil((dueAt - now) / DAY_MS);
}

/** 0 (just watered) → 1 (due right now or overdue), for the progress ring. */
export function wateringProgress(plant: Plant): number {
  const lastWatered = new Date(plant.lastWateredAt).getTime();
  const elapsed = Date.now() - lastWatered;
  const total = plant.waterIntervalDays * DAY_MS;
  return Math.min(1, Math.max(0, elapsed / total));
}

export function wateringStatusLabel(plant: Plant): string {
  const days = daysUntilNextWatering(plant);
  if (days < 0) return `Overdue by ${Math.abs(days)}d`;
  if (days === 0) return 'Water today';
  if (days === 1) return 'Water tomorrow';
  return `Water in ${days}d`;
}

export function formatLastWatered(plant: Plant): string {
  const days = Math.floor((Date.now() - new Date(plant.lastWateredAt).getTime()) / DAY_MS);
  if (days === 0) return 'Watered today';
  if (days === 1) return 'Watered yesterday';
  return `Watered ${days}d ago`;
}
