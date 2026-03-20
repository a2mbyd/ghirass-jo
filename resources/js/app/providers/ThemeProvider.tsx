// components/ThemeProvider.tsx
import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from "@/shared/store/theme.store";

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const { darkMode } = useThemeStore();

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    return <>{children}</>;
}
