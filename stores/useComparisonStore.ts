import { create } from 'zustand';
import { Property } from '@/types/property';

const MAX_COMPARISON = 4;

interface ComparisonStore {
  properties: Property[];
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  clearAll: () => void;
}

export const useComparisonStore = create<ComparisonStore>((set) => ({
  properties: [],

  addProperty: (property) =>
    set((state) => {
      // 이미 추가된 항목은 중복 추가 안함
      if (state.properties.some((p) => p.id === property.id)) {
        return state;
      }

      // 최대 개수 체크
      if (state.properties.length >= MAX_COMPARISON) {
        return state;
      }

      return {
        properties: [...state.properties, property],
      };
    }),

  removeProperty: (id) =>
    set((state) => ({
      properties: state.properties.filter((p) => p.id !== id),
    })),

  clearAll: () =>
    set(() => ({
      properties: [],
    })),
}));
