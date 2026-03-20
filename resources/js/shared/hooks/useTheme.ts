import { useEffect } from 'react';
import { useThemeStore } from "@/shared/store/theme.store";

const useTheme = () => {
    const { darkMode, toggleDarkMode, setDarkMode } = useThemeStore();
    useEffect(() => {
        const themeStore = localStorage.getItem('theme-store');
        if (themeStore) {
            const themeStoreData = JSON.parse(themeStore);
            setDarkMode(themeStoreData.darkMode);
        }
    }, [setDarkMode]);
    return { darkMode, toggleDarkMode };
};

export default useTheme;
