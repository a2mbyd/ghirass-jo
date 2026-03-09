import { useThemeStore } from '@/store/theme.store';
import React, { useEffect } from 'react';

const useTheme = () => {
    const { darkMode, toggleDarkMode, setDarkMode } = useThemeStore();
    useEffect(() => {
        const themeStore = localStorage.getItem('theme-store');
        if (themeStore) {
            const themeStoreData = JSON.parse(themeStore);
            setDarkMode(themeStoreData.darkMode);
        }
    }, []);
    return { darkMode, toggleDarkMode };
};

export default useTheme;
