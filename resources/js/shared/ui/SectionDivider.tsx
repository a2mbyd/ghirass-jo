import type { LucideIcon } from 'lucide-react';

const SectionDivider = ({
    icon: Icon,
    label,
    iconClass,
}: {
    icon: LucideIcon;
    label: string;
    iconClass: string;
}) => {
    return (
        <div className="flex items-center gap-4">
           <div className="h-px flex-1 bg-border" />

            <div className="flex items-centr gap-2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-sm">
                <Icon className={`h-3.5 w-3.5 ${iconClass}`} />
                <span className="text-[12px] font-bold text-text-muted">
                    {label}
                </span>
            </div>

            <div className="h-px flex-1 bg-border" />
        </div>
    );
};

export default SectionDivider;