import { usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import useTheme from "@/shared/hooks/useTheme";
import SidebarFooter from './Sidebar.Footer';
import SidebarHeader from './Sidebar.Header';
import SidebarMain from './Sidebar.Main';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { toggleDarkMode, darkMode } = useTheme();
    const { props } = usePage();
    return (
        <>
            {/* Mobile toggle button — visible only on small screens */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg md:hidden"
                aria-label="Open sidebar"
                type="button"
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
                className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col overflow-hidden border-r border-border bg-surface shadow-[2px_0_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out md:sticky md:top-0 md:right-0 md:left-auto md:z-auto md:h-screen md:shrink-0 md:border-r-0 md:border-l ${collapsed ? 'w-16' : 'w-56'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                {/* Header */}
                <SidebarHeader
                    collapsed={collapsed}
                    setMobileOpen={setMobileOpen}
                    setCollapsed={setCollapsed}
                />

                {/* Navigation */}
                <SidebarMain
                    collapsed={collapsed}
                    setMobileOpen={setMobileOpen}
                />

                {/* User Footer & Dark Mode Button */}
                <SidebarFooter
                    user={props.auth.user}
                    collapsed={collapsed}
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                />
            </aside>
        </>
    );
};

export default Sidebar;
