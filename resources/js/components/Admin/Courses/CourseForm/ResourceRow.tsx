import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface ResourceRowProps {
    title: string;
    url: string;
    isDeleted: boolean;
    onToggleDelete: () => void;
    icon: ReactNode;
    iconBg: string;
}

export default function ResourceRow({
    title,
    url,
    isDeleted,
    onToggleDelete,
    icon,
    iconBg,
}: ResourceRowProps) {
    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 transition ${
                isDeleted ? 'bg-rose-50/20 opacity-60' : 'hover:bg-surface-alt'
            }`}
        >
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
            >
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p
                    className={`text-sm font-medium text-text ${isDeleted ? 'line-through' : ''}`}
                >
                    {title}
                </p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-text-muted hover:text-primary-500"
                    dir="ltr"
                >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{url}</span>
                </a>
            </div>
            <button
                type="button"
                onClick={onToggleDelete}
                className={`flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                    isDeleted
                        ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50'
                        : 'border-border text-text-muted hover:border-danger hover:text-danger'
                }`}
            >
                {isDeleted ? (
                    <>
                        <Plus className="h-3 w-3" />
                        استعادة
                    </>
                ) : (
                    <>
                        <Trash2 className="h-3 w-3" />
                        حذف
                    </>
                )}
            </button>
        </div>
    );
}
