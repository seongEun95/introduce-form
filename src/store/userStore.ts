import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 교회 자기소개 인터페이스
export interface ChurchProfile {
  name: string;
  birthDate: string;
  occupation: string;
  location: string;
  baptized: "yes" | "no";
  churchHistory: string;
  discipleshipThoughts: string;
  ministryTeam?: string;
  currentInterests: string;
  favoritePraise: string;
  favoriteFood: string;
  dislikedFood?: string;
  prayerRequest: string;
}

interface ChurchState {
  churchProfile: ChurchProfile | null;
  isLoading: boolean;
  setChurchProfile: (profile: ChurchProfile) => void;
  updateChurchProfile: (updates: Partial<ChurchProfile>) => void;
  clearChurchProfile: () => void;
  setLoading: (loading: boolean) => void;
}

// 교회 자기소개 스토어
export const useChurchStore = create<ChurchState>()(
  devtools(
    persist(
      (set, get) => ({
        churchProfile: null,
        isLoading: false,
        setChurchProfile: (profile) => set({ churchProfile: profile }, false, "setChurchProfile"),
        updateChurchProfile: (updates) =>
          set(
            (state) => ({
              churchProfile: state.churchProfile ? { ...state.churchProfile, ...updates } : null,
            }),
            false,
            "updateChurchProfile"
          ),
        clearChurchProfile: () => set({ churchProfile: null }, false, "clearChurchProfile"),
        setLoading: (loading) => set({ isLoading: loading }, false, "setLoading"),
      }),
      {
        name: "church-storage",
        partialize: (state) => ({ churchProfile: state.churchProfile }),
      }
    ),
    {
      name: "church-store",
    }
  )
);
