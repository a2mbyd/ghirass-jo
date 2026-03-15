import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export interface PendingItem {
    label: string;
    url: string;
    badge?: { text: string; className: string };
}

interface PendingRowProps {
    item: PendingItem;
    onRemove: () => void;
    color: 'emerald' | 'rose' | 'amber';
    icon?: ReactNode;
    iconBg?: string;
}

const PendingRow = ({
    item,
    onRemove,
    color,
    icon,
    iconBg,
}: PendingRowProps) => {
    const colorMap = {
        emerald: {
            bg: 'bg-emerald-50/30',
            text: 'text-emerald-600',
            sub: 'text-emerald-500',
        },
        rose: {
            bg: 'bg-rose-50/30',
            text: 'text-rose-600',
            sub: 'text-rose-500',
        },
        amber: {
            bg: 'bg-amber-50/30',
            text: 'text-amber-600',
            sub: 'text-amber-500',
        },
    }[color];

    return (
        <div className={`flex items-center gap-3 px-4 py-3 ${colorMap.bg}`}>
            {item.badge ? (
                <span
                    className={`inline-flex shrink-0 items-center rounded-lg border px-2.5 py-1 text-xs font-semibold ${item.badge.className}`}
                >
                    {item.badge.text}
                </span>
            ) : (
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                >
                    {icon}
                </div>
            )}

            <div className="min-w-0 flex-1">
                {!item.badge && (
                    <p className="truncate text-sm font-medium text-text">
                        {item.label}
                    </p>
                )}
                <p className={`truncate text-xs ${colorMap.text}`} dir="ltr">
                    {item.url}
                </p>
                <span className={`text-[10px] ${colorMap.sub}`}>
                    (جديد — لم يُحفظ بعد)
                </span>
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-muted transition hover:border-danger hover:text-danger"
            >
                <X className="h-3 w-3" />
                إلغاء
            </button>
        </div>
    );
};

export default PendingRow;
