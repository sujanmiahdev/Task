import { create } from "zustand";

interface FilterStore {
  search: string;
  office: string;
  weekendDayFilter: string;

  setSearch: (value: string) => void;
  setOffice: (value: string) => void;
  setWeekendDayFilter: (value: string) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: "",
  office: "",
  weekendDayFilter: "",

  setSearch: (value) => set({ search: value }),
  setOffice: (value) => set({ office: value }),
  setWeekendDayFilter: (value) => set({ weekendDayFilter: value }),

  clearFilters: () =>
    set({
      search: "",
      office: "",
      weekendDayFilter: "",
    }),
}));