import { PlantIcon } from '../types/plant';

export const plantEmoji: Record<PlantIcon, string> = {
  monstera: '🌿',
  succulent: '🪴',
  fern: '🍃',
  cactus: '🌵',
  pothos: '🌱',
  'snake-plant': '🌾',
};

export const plantIconOptions: { value: PlantIcon; label: string }[] = [
  { value: 'monstera', label: '🌿 Monstera' },
  { value: 'succulent', label: '🪴 Succulent' },
  { value: 'fern', label: '🍃 Fern' },
  { value: 'cactus', label: '🌵 Cactus' },
  { value: 'pothos', label: '🌱 Pothos' },
  { value: 'snake-plant', label: '🌾 Snake Plant' },
];
