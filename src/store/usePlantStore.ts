import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../types/plant';
import { samplePlants } from '../data/samplePlants';

interface PlantStore {
  plants: Plant[];
  addPlant: (plant: Omit<Plant, 'id' | 'lastWateredAt'>) => void;
  waterPlant: (id: string) => void;
  setLastWateredDaysAgo: (id: string, days: number) => void;
  removePlant: (id: string) => void;
}

export const usePlantStore = create<PlantStore>()(
  persist(
    (set) => ({
      plants: samplePlants,

      addPlant: (plant) =>
        set((state) => ({
          plants: [
            ...state.plants,
            {
              ...plant,
              id: Date.now().toString(),
              lastWateredAt: new Date().toISOString(),
            },
          ],
        })),

      waterPlant: (id) =>
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id ? { ...p, lastWateredAt: new Date().toISOString() } : p
          ),
        })),

      setLastWateredDaysAgo: (id, days) =>
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id
              ? {
                  ...p,
                  lastWateredAt: new Date(
                    Date.now() - days * 86400000
                  ).toISOString(),
                }
              : p
          ),
        })),

      removePlant: (id) =>
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'plant-care-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
