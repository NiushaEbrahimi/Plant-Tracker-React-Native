import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../types/plant';
import { samplePlants } from '../data/samplePlants';
import { scheduleWaterReminder, cancelWaterReminder } from '../utils/notifications';

interface PlantStore {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, 'id' | 'lastWateredAt'>) => void;
  waterPlant: (id: string) => void;
  setLastWateredDaysAgo: (id: string, days: number) => void;
  removePlant: (id: string) => void;
}

export const usePlantStore = create<PlantStore>()(
  persist(
    (set, get) => ({
      plants: samplePlants,

      addPlant: (plant) => {
        const newPlant: Plant = {
          ...plant,
          id: Date.now().toString(),
          lastWateredAt: new Date().toISOString(),
        };
        set((state) => ({
          plants: [...state.plants, newPlant],
        }));
        scheduleWaterReminder(newPlant);
      },

      waterPlant: (id) => {
        const updated = get().plants.map((p) =>
          p.id === id ? { ...p, lastWateredAt: new Date().toISOString() } : p
        );
        set({ plants: updated });
        const plant = updated.find((p) => p.id === id);
        if (plant) scheduleWaterReminder(plant);
      },

      setLastWateredDaysAgo: (id, days) => {
        const updated = get().plants.map((p) =>
          p.id === id
            ? {
                ...p,
                lastWateredAt: new Date(
                  Date.now() - days * 86400000
                ).toISOString(),
              }
            : p
        );
        set({ plants: updated });
        const plant = updated.find((p) => p.id === id);
        if (plant) scheduleWaterReminder(plant);
      },

      removePlant: (id) => {
        cancelWaterReminder(id);
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== id),
        }));
      },
    }),
    {
      name: 'plant-care-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
