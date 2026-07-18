export type PlantIcon =
  | 'monstera'
  | 'succulent'
  | 'fern'
  | 'cactus'
  | 'pothos'
  | 'snake-plant';

export interface Plant {
  id: string;
  name: string; // e.g. "Monty" — pet name, not species
  species: string; // e.g. "Monstera Deliciosa"
  icon: PlantIcon;
  waterIntervalDays: number; // how often it needs water
  lastWateredAt: string; // ISO date string
  notes?: string;
}
