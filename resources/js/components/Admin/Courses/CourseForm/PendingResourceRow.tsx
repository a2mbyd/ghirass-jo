import { Plus, X } from 'lucide-react';

interface PendingResourceRowProps {
    title: string;
    url: string;
    onRemove: () => void;
    color: 'emerald' | 'rose';
}

export default function PendingResourceRow({
    title,
    url,
    onRemove,
    color,
}: PendingResourceRowProps) {
    const bg = color === 'emerald' ? 'bg-emerald-50/40' : 'bg-rose-50/40';
    const iconBg = color === 'emerald' ? 'bg-emerald-100' : 'bg-rose-100';
    const iconColor = color === 'emerald' ? 'text-emerald-600' : 'text-rose-600';
    const textColor = color === 'emerald' ? 'text-emerald-700' : 'text-rose-700';
    const urlColor = color === 'emerald' ? 'text-emerald-500/80' : 'text-rose-500/80';

    return (
        <div className={`flex items-center gap-3 px-4 py-3 ${bg}`}>
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
            >
                <Plus className={`h-4 w-4 ${iconColor}`} />
            </div>
            <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${textColor}`}>
                    {title}{' '}
                    <span className={`text-xs font-normal ${urlColor}`}>
                        (جديد — لم يُحفظ بعد)
                    </span>
                </p>
                <p className={`truncate text-xs ${urlColor}`} dir="ltr">
                    {url}
                </p>
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
}
