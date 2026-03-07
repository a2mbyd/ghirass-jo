import { Link, usePage } from '@inertiajs/react';
import { GraduationCap, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems } from './navItems';
import { useThemeStore } from '@/store/theme.store';
import DarkModeButton from '../ui/DarkModeButton';

const Topbar = () => {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { darkMode, toggleDarkMode, setDarkMode } = useThemeStore();

    useEffect(() => {
        const themeStore = localStorage.getItem('theme-store');
        if (themeStore) {
            const themeStoreData = JSON.parse(themeStore);
            setDarkMode(themeStoreData.darkMode);
        }
    }, []);
    return (
        <header className="border-color-border sticky top-0 z-50 w-full border-b border-border bg-glass-bg backdrop-blur-xl supports-backdrop-filter:bg-glass-bg">
            <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-text transition-opacity hover:opacity-80"
                    >
                        <span className="rounded-lg bg-linear-to-br from-primary-500 to-accent-violet p-2">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </span>
                        غراس
                    </Link>
                    <DarkModeButton toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                </div>

                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            url === item.href ||
                            (item.href !== '/' && url.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-primary-500/10 text-primary-600'
                                        : 'text-text-muted hover:bg-surface-alt hover:text-text'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="rounded-lg p-2 text-text hover:bg-surface-alt md:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile nav */}
            {mobileMenuOpen && (
                <nav className="animate-fade-in border-color-border border-t bg-surface px-4 py-3 md:hidden">
                    <ul className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive =
                                url === item.href ||
                                (item.href !== '/' &&
                                    url.startsWith(item.href));
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                                            isActive
                                                ? 'bg-primary-500/10 text-primary-600'
                                                : 'text-text-muted hover:bg-surface-alt'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-1 border-t border-border pt-2">
                        <button
                            onClick={toggleDarkMode}
                            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-text-muted hover:bg-surface-alt"
                        >
                            <span className="flex items-center gap-3">
                                {darkMode ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                                {darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                            </span>

                            <span
                                className={`relative flex h-6 w-11 shrink-0 items-center rounded-full border p-0.5 transition-all duration-300 ${
                                    darkMode
                                        ? 'border-slate-600 bg-slate-700'
                                        : 'border-slate-300 bg-slate-200'
                                }`}
                            >
                                <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
                                        darkMode
                                            ? '-translate-x-5 bg-slate-900'
                                            : 'translate-x-0 bg-white'
                                    }`}
                                >
                                    {darkMode ? (
                                        <Moon className="h-2.5 w-2.5 text-slate-300" />
                                    ) : (
                                        <Sun className="h-2.5 w-2.5 text-slate-500" />
                                    )}
                                </span>
                            </span>
                        </button>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Topbar;
