import React from 'react';
import { NAV_ITEMS } from './Sidebar.config';
import NavItem from './Sidebar.NavItem';
import { Users } from 'lucide-react';
import { index as usersIndex } from '@/routes/admin/users';
import { usePage } from '@inertiajs/react';

interface SidebarMainProps {
    collapsed: boolean;
    setMobileOpen: (open: boolean) => void;
}
const SidebarMain = ({ collapsed, setMobileOpen }: SidebarMainProps) => {
    const { props } = usePage();
    return (
        <nav
            dir="ltr"
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3"
        >
            {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
                <NavItem
                    key={label}
                    icon={Icon}
                    label={label}
                    href={href}
                    collapsed={collapsed}
                    setMobileOpen={setMobileOpen}
                />
            ))}
            {props.auth.user.role === 'admin' && (
                <NavItem
                    icon={Users}
                    label="Users"
                    href={usersIndex.url()}
                    collapsed={collapsed}
                    setMobileOpen={setMobileOpen}
                />
            )}
        </nav>
    );
};

export default SidebarMain;
