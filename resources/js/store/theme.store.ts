// stores/useThemeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
        console.log(darkMode);
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
