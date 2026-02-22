import { create } from "zustand";

interface UIState {
  isFilterOpen: boolean;
  isAddModalOpen: boolean;

  toggleFilter: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isFilterOpen: true,
  isAddModalOpen: false,

  toggleFilter: () =>
    set((state) => ({
      isFilterOpen: !state.isFilterOpen,
    })),

  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
}));