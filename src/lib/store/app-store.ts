import { create } from "zustand";

type AppState = {
  hasHydrated: boolean;
  sidebarOpen: boolean;
  setHasHydrated: (value: boolean) => void;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  hasHydrated: false,
  sidebarOpen: true,
  setHasHydrated: (value) => set({ hasHydrated: value }),
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
