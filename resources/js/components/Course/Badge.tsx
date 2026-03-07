import React from 'react';

const Badge = ({
    children,
    variant = 'default',
}: {
    children: React.ReactNode;
    variant?: 'default' | 'lab' | 'elective' | 'core';
}) => {
    const styles: Record<string, string> = {
        default: 'bg-surface-alt text-text-muted',
        lab: 'bg-accent-pink/10 text-accent-pink border border-accent-pink/20',
        elective:
            'bg-accent-emerald/10 text-accent-emerald-dark border border-accent-emerald/20',
        core: 'bg-primary-50 text-primary-500 border border-primary-200',
    };
    return (
        <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]}`}
        >
            {children}
        </span>
    );
};

export default Badge;
