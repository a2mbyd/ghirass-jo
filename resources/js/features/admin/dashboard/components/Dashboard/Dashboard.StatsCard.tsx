import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatsCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    colorClass: string;
    bgClass: string;
    delay?: string;
}

const StatsCard = ({
    label,
    value,
    icon: Icon,
    colorClass,
    bgClass,
    delay = '',
}: StatsCardProps) => {
    return (
        <div
            className={`animate-fade-in-up card-hover flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-(--shadow-soft) ${delay}`}
            dir="rtl"
        >
            <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${bgClass}`}
            >
                <Icon className={`h-7 w-7 ${colorClass}`} />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-text-muted">{label}</p>
                <p className="mt-0.5 text-3xl font-bold tracking-tight text-text">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default StatsCard;
