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

// 기존 UserProfile 인터페이스도 유지 (호환성을 위해)
export interface UserProfile {
  name: string;
  email: string;
  age: number;
  bio: string;
  interests: string[];
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  clearProfile: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        profile: null,
        isLoading: false,
        setProfile: (profile) => set({ profile }, false, "setProfile"),
        updateProfile: (updates) =>
          set(
            (state) => ({
              profile: state.profile ? { ...state.profile, ...updates } : null,
            }),
            false,
            "updateProfile"
          ),
        clearProfile: () => set({ profile: null }, false, "clearProfile"),
        setLoading: (loading) => set({ isLoading: loading }, false, "setLoading"),
      }),
      {
        name: "user-storage",
        partialize: (state) => ({ profile: state.profile }),
      }
    ),
    {
      name: "user-store",
    }
  )
);
