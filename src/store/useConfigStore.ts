import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Site {
  api: string;
  name: string;
  detail?: string;
}

export interface Category {
  name: string;
  type: 'movie' | 'tv';
  query: string;
}

export interface Live {
  name: string;
  url?: string;
  group?: string;
  channels?: { name: string; url: string }[];
}

export interface TVBoxConfig {
  prefix?: string;
  adult_filter: boolean;
  ad_skip: boolean;
  parse_api?: string;
}

export interface Profile {
  name: string;
  cache_time: number;
  api_site: Record<string, Site>;
  custom_category: Category[];
  lives: Live[];
  tvbox: TVBoxConfig;
}

export interface Store {
  isAuthenticated: boolean;
  currentProfile: string;
  profiles: Record<string, Profile>;
  login: (password: string) => void;
  logout: () => void;
  setCurrentProfile: (name: string) => void;
  addProfile: (name: string) => void;
  deleteProfile: (name: string) => void;
  updateProfile: (updates: Partial<Profile>) => void;
}

const defaultProfile: Profile = {
  name: '默认',
  cache_time: 7200,
  api_site: {},
  custom_category: [],
  lives: [],
  tvbox: {
    adult_filter: true,
    ad_skip: true,
  },
};

export const useConfigStore = create<Store>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentProfile: '默认',
      profiles: { '默认': defaultProfile },
      login: (password: string) => {
        if (password === 'admin') {
          set({ isAuthenticated: true });
        }
      },
      logout: () => set({ isAuthenticated: false }),
      setCurrentProfile: (name: string) => set({ currentProfile: name }),
      addProfile: (name: string) =>
        set((state: any) => ({
          profiles: {
            ...state.profiles,
            [name]: { ...defaultProfile, name },
          },
          currentProfile: name,
        })),
      deleteProfile: (name: string) =>
        set((state: any) => {
          const { [name]: _, ...rest } = state.profiles;
          const newCurrent = state.currentProfile === name ? Object.keys(rest)[0] || '默认' : state.currentProfile;
          return { profiles: rest, currentProfile: newCurrent } as any;
        }),
      updateProfile: (updates: Partial<Profile>) =>
        set((state: any) => ({
          profiles: {
            ...state.profiles,
            [state.currentProfile]: {
              ...state.profiles[state.currentProfile],
              ...updates,
            },
          },
        })),
    }),
    {
      name: 'tv-config',
    }
  )
);
