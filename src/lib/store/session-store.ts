import { create } from "zustand";

type SessionState = {
  isSessionExpiredModalOpen: boolean;
  isHandlingSessionExpiry: boolean;
  openSessionExpiredModal: () => void;
  closeSessionExpiredModal: () => void;
  setHandling: (value: boolean) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  isSessionExpiredModalOpen: false,
  isHandlingSessionExpiry: false,
  openSessionExpiredModal: () => set({ isSessionExpiredModalOpen: true }),
  closeSessionExpiredModal: () => set({ isSessionExpiredModalOpen: false }),
  setHandling: (value) => set({ isHandlingSessionExpiry: value }),
}));
