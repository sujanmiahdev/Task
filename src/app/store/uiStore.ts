import { create } from "zustand";
import { Weekend } from "../types/Weekend";

interface UIState {
  isFilterOpen: boolean;
  isAddModalOpen: boolean;

  isEditModalOpen: boolean;
  selectedWeekend: Weekend | null;

  toggleFilter: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;

  openEditModal: (data: Weekend) => void;
  closeEditModal: () => void;

setSelectedWeekend: (data: Weekend) => void
}

export const useUIStore = create<UIState>((set) => ({
  isFilterOpen: true,
  isAddModalOpen: false,

  isEditModalOpen: false,
  selectedWeekend: null,

  toggleFilter: () =>
    set((state) => ({
      isFilterOpen: !state.isFilterOpen,
    })),

  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  openEditModal: (data) =>
    set({
      isEditModalOpen: true,
      selectedWeekend: data,
    }),

  closeEditModal: () =>
    set({
      isEditModalOpen: false,
      selectedWeekend: null,
    }),

      // ✅ Added missing implementation
  setSelectedWeekend: (data) =>
    set({
      selectedWeekend: data,
    }),
}));