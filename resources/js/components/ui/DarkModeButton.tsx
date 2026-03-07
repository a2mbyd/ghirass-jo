import React, { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

interface DarkModeButtonProps {
    toggleDarkMode: () => void
    darkMode: boolean
}
const DarkModeButton = ({ toggleDarkMode, darkMode }: DarkModeButtonProps) => {
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

    return (
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
  )
}

export default DarkModeButton