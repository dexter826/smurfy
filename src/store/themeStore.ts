import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode } from '@shared/types';

type StoredTheme = ThemeMode | null;

interface ThemeState {
  mode: StoredTheme;
  toggleTheme: () => void;
  applyTheme: () => void;
  resolvedMode: () => ThemeMode;
}

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: null,
      toggleTheme: () => {
        const next: ThemeMode = get().resolvedMode() === 'light' ? 'dark' : 'light';
        set({ mode: next });
        get().applyTheme();
      },
      applyTheme: () => {
        const root = document.documentElement;
        if (get().resolvedMode() === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },
      resolvedMode: () => get().mode ?? (systemPrefersDark() ? 'dark' : 'light'),
    }),
    {
      name: 'smurf_social_theme',
      onRehydrateStorage: () => (state) => {
        state?.applyTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (useThemeStore.getState().mode === null) {
            useThemeStore.getState().applyTheme();
          }
        });
      },
    },
  ),
);

export const useResolvedTheme = (): ThemeMode => {
  const mode = useThemeStore((s) => s.mode);
  return mode ?? (systemPrefersDark() ? 'dark' : 'light');
};
