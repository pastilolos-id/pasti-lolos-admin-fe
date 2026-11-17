import { create } from "zustand";

type SessionState = {
  isSessionExpiredModalOpen: boolean;
  isHandlingSessionExpiry: boolean;
  isVoluntaryLogout: boolean;
  openSessionExpiredModal: () => void;
  closeSessionExpiredModal: () => void;
  setHandling: (value: boolean) => void;
  setVoluntaryLogout: (value: boolean) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  isSessionExpiredModalOpen: false,
  isHandlingSessionExpiry: false,
  isVoluntaryLogout: false,
  openSessionExpiredModal: () => set({ isSessionExpiredModalOpen: true }),
  closeSessionExpiredModal: () => set({ isSessionExpiredModalOpen: false }),
  setHandling: (value) => set({ isHandlingSessionExpiry: value }),
  setVoluntaryLogout: (value) => set({ isVoluntaryLogout: value }),
}));
