import { logout } from '@/routes';
import { router } from '@inertiajs/react';
import DarkModeButton from '../../ui/DarkModeButton';
import SidebarLogoutTooltip from './Sidebar.LogoutTooltip';
import { AdminUser } from '@/types';

interface SidebarFooterProps {
    collapsed: boolean;
    toggleDarkMode: () => void;
    darkMode: boolean;
    user: AdminUser;
}

const SidebarFooter = ({
    collapsed,
    toggleDarkMode,
    darkMode,
    user,
}: SidebarFooterProps) => {
    const handleLogout = () => {
        router.post(logout.url());
    };

    return (
        <div className="flex items-center justify-between gap-2 border-t border-border ">
            <div
                className={`flex items-center gap-3 py-3 ${collapsed ? 'justify-center px-0' : 'px-4'}`}
            >
                <SidebarLogoutTooltip onLogout={handleLogout} />
                {!collapsed && (
                    <>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-text">
                                {user.username}
                            </p>
                            <p className="truncate text-[10px] text-text-muted">
                                {user.role}
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
    );
};

export default SidebarFooter;
