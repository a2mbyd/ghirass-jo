import { LogOut, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface SidebarLogoutTooltipProps {
    onLogout: () => void;
}

const SidebarLogoutTooltip = ({ onLogout }: SidebarLogoutTooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={containerRef} className="group relative flex">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 active:opacity-80"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="فتح القائمة"
            >
                <Users className="h-4 w-4" />
            </button>
            <div
                className={`absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-lg border border-border bg-surface p-1 shadow-lg transition-opacity duration-200 dark:bg-slate-800 ${
                    isOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                } md:group-hover:pointer-events-auto md:group-hover:opacity-100`}
                role="menu"
                aria-label="تسجيل الخروج"
            >
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-surface-alt hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
                >
                    <LogOut className="h-4 w-4 shrink-0" />
                    تسجيل الخروج
                </button>
            </div>
        </div>
    );
};

export default SidebarLogoutTooltip;
