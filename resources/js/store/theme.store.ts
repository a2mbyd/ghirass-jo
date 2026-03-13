// stores/useThemeStore.ts
import { create } from 'zustand';

interface ThemeStoreState {
    darkMode: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStoreState>()((set, get) => ({
    darkMode: false,
    toggleDarkMode: () => {
        const { darkMode } = get();
        set((state) => ({ darkMode: !state.darkMode }));
        localStorage.setItem(
            'theme-store',
            JSON.stringify({ darkMode: !darkMode }),
        );
    },
    setDarkMode: (value) => {
        set({ darkMode: value });
        localStorage.setItem(
            'theme-store',
            JSON.stringify({ darkMode: value }),
        );
    },
}));
