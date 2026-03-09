import useTheme from '@/hooks/useTheme';
import { Link, usePage } from '@inertiajs/react';
import {
    BookMarked,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    LayoutDashboard,
    Layers,
    Menu,
    Stethoscope,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';
import DarkModeButton from '../ui/DarkModeButton';

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/' },
    { icon: GraduationCap, label: 'Majors', href: '/admin/majors' },
    { icon: Layers, label: 'Sections', href: '/admin/sections' },
    { icon: BookMarked, label: 'Courses', href: '/admin/courses' },
    { icon: Stethoscope, label: 'Doctors', href: '/admin/doctors' },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { toggleDarkMode, darkMode } = useTheme();
    const { url } = usePage();

    const isActive = (href: string) =>
        url === href || url.startsWith(href + '/');

    return (
        <>
            {/* Mobile toggle button — visible only on small screens */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg md:hidden"
                aria-label="Open sidebar"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Backdrop — mobile only */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 right-0 z-50 flex h-screen flex-col overflow-hidden border-l border-border bg-surface shadow-[2px_0_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out md:sticky md:top-0 md:z-auto md:h-screen md:shrink-0 md:border-r md:border-l-0 ${collapsed ? 'w-16' : 'w-56'} ${mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}
            >
                {/* Header */}
                <div
                    className={`flex min-h-[60px] items-center border-b border-border ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}
                >
                    {!collapsed && (
                        <Link href={'/'} className="flex items-center gap-2">
                            <span className="rounded-md bg-primary-500 p-1 text-base font-bold tracking-tight text-white">
                                <GraduationCap className="h-4 w-4" />
                            </span>
                            <span className="text-base font-bold tracking-tight text-primary-500">
                                غراس
                            </span>
                        </Link>
                    )}
                    <button
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                setMobileOpen(false);
                            } else {
                                setCollapsed(!collapsed);
                            }
                        }}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface-alt text-text-muted transition-colors hover:bg-primary-50 hover:text-primary-500"
                        aria-label={
                            collapsed ? 'Expand sidebar' : 'Collapse sidebar'
                        }
                    >
                        {collapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav
                    dir="ltr"
                    className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3"
                >
                    {navItems.map(({ icon: Icon, label, href }) => {
                        const active = isActive(href);

                        return (
                            <Link
                                key={label}
                                href={href}
                                title={collapsed ? label : undefined}
                                onClick={() => setMobileOpen(false)}
                                className={`group flex flex-row items-center justify-start gap-3 rounded-xl px-2 py-2.5 text-sm font-medium transition-all duration-150 ${
                                    active
                                        ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/30'
                                        : 'text-text-muted hover:bg-surface-alt hover:text-text'
                                }`}
                            >
                                <Icon
                                    className={`h-[18px] w-[18px] shrink-0 transition-transform duration-150 ${active ? 'text-white' : 'text-text-subtle group-hover:text-primary-500'} ${!active && !collapsed ? 'group-hover:scale-110' : ''}`}
                                />
                                {!collapsed && (
                                    <span className="truncate">{label}</span>
                                )}
                                {active && !collapsed && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Footer & Dark Mode Button */}
                <div className="flex items-center justify-between gap-2 border-t border-border px-2">
                    <div
                        className={`flex items-center gap-3 py-3 ${collapsed ? 'justify-center px-0' : 'px-4'}`}
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                            <Users className="h-4 w-4" />
                        </div>
                        {!collapsed && (
                            <>
                                <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-text">
                                        Admin
                                    </p>
                                    <p className="truncate text-[10px] text-text-muted">
                                        Administrator
                                    </p>
                                </div>
                                <DarkModeButton
                                    toggleDarkMode={toggleDarkMode}
                                    darkMode={darkMode}
                                />
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
