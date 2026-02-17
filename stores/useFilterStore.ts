import { create } from 'zustand';
import { PropertyFilters } from '@/types/property';
import { PRICE_PRESETS, AREA_PRESETS } from '@/lib/constants';

// 기본 필터값
const DEFAULT_FILTERS: PropertyFilters = {
  priceRange: [PRICE_PRESETS.min, PRICE_PRESETS.max],
  areaRange: [AREA_PRESETS.min, AREA_PRESETS.max],
};

interface FilterStore {
  filters: PropertyFilters;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: DEFAULT_FILTERS,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () =>
    set(() => ({
      filters: DEFAULT_FILTERS,
    })),
}));
