import { Plant } from '../types/plant';

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

export const samplePlants: Plant[] = [
  {
    id: '1',
    name: 'Monty',
    species: 'Monstera Deliciosa',
    icon: 'monstera',
    waterIntervalDays: 7,
    lastWateredAt: daysAgo(5),
  },
  {
    id: '2',
    name: 'Spike',
    species: 'Golden Barrel Cactus',
    icon: 'cactus',
    waterIntervalDays: 14,
    lastWateredAt: daysAgo(2),
  },
  {
    id: '3',
    name: 'Fernanda',
    species: 'Boston Fern',
    icon: 'fern',
    waterIntervalDays: 3,
    lastWateredAt: daysAgo(3),
  },
];
