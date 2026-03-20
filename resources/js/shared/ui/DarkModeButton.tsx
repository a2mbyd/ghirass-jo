import { Moon, Sun } from 'lucide-react'
import React, { useEffect } from 'react'

interface DarkModeButtonProps {
    toggleDarkMode: () => void
    darkMode: boolean
    variant?: 'button' | 'section'
}
const DarkModeButton = ({ toggleDarkMode, darkMode, variant = 'button' }: DarkModeButtonProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Example shortcut: Ctrl + D
            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault()
                toggleDarkMode()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleDarkMode])

    return variant === 'button' ? (
        <button
            onClick={toggleDarkMode}
            aria-label={
                darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'
            }
            className={`relative flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border p-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                darkMode
                    ? 'border-slate-600 bg-slate-700'
                    : 'border-slate-300 bg-slate-200'
            }`}
        >
            {/* Sliding thumb */}
            <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full shadow-sm transition-all duration-300 ${
                    darkMode
                        ? '-translate-x-7 bg-slate-900'
                        : 'translate-x-0 bg-white'
                }`}
            >
                {darkMode ? (
                    <Moon className="h-4.5 w-4.5 text-slate-300" />
                ) : (
                    <Sun className="h-4.5 w-4.5 text-slate-500" />
                )}
            </span>
        </button>
    ) : (
        <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
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
    )
}

export default DarkModeButton;