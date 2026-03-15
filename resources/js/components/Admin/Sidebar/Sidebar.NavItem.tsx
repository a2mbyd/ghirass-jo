import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import React from 'react';

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    collapsed: boolean;
    setMobileOpen: (open: boolean) => void;
}

const ADMIN_PAGE_PREFIX = import.meta.env.VITE_ADMIN_PAGE_PREFIX || 'admin';

const NavItem = ({
    icon: Icon,
    label,
    href,
    collapsed,
    setMobileOpen,
}: NavItemProps) => {
    const { url } = usePage();
    const isActive = (href: string) => {
        if (href === `/${ADMIN_PAGE_PREFIX}`) {
            return (
                url === `/${ADMIN_PAGE_PREFIX}` ||
                url === `/${ADMIN_PAGE_PREFIX}/`
            );
        }

        return url.startsWith(href);
    };

    return (
        <Link
            key={label}
            href={href}
            title={collapsed ? label : undefined}
            onClick={() => setMobileOpen(false)}
            className={`group flex flex-row items-center justify-start gap-3 rounded-xl px-2 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive(href)
                    ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/30'
                    : 'text-text-muted hover:bg-surface-alt hover:text-text'
            }`}
        >
            <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-transform duration-150 ${isActive(href) ? 'text-white' : 'text-text-subtle group-hover:text-primary-500'} ${!isActive(href) && !collapsed ? 'group-hover:scale-110' : ''}`}
            />
            {!collapsed && <span className="truncate">{label}</span>}
            {isActive(href) && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
            )}
        </Link>
    );
};

export default NavItem;
