import { create } from "zustand";

import type { TryoutInstitution } from "@/templates/Tryout/types";

type TryoutState = {
  search: string;
  institution: TryoutInstitution;
  setSearch: (value: string) => void;
  setInstitution: (value: TryoutInstitution) => void;
};

export const useTryoutStore = create<TryoutState>((set) => ({
  search: "",
  institution: "BUMN",
  setSearch: (value) => set({ search: value }),
  setInstitution: (value) => set({ institution: value }),
}));
