export type PlantIcon =
  | "monstera"
  | "succulent"
  | "fern"
  | "cactus"
  | "pothos"
  | "snake-plant"
  | "flower"
  | "lily"
  | "aglaonema"
  | "aloe-vera"
  | "astrophytum"
  | "barrel cactus"
  | "calathea"
  | "devils-ivy"
  | "haworthia"
  | "herbs"
  | "rose"
  | "moonglow"
  | "plant"
  | "prickly-pear"
  | "rubber-plant"
  | "sensoria"
  | "zamioculcas";

export interface Plant {
  id: string;
  name: string; // e.g. "Monty" — pet name, not species
  species: string; // e.g. "Monstera Deliciosa"
  icon: PlantIcon;
  waterIntervalDays: number; // how often it needs water
  lastWateredAt: string; // ISO date string
  notes?: string;
}
