import type { QuickLinkConfig } from './Dashboard.types';

interface QuickLinkCardProps {
    config: QuickLinkConfig;
    index: number;
}
const QuickLinkCard = ({ config, index }: QuickLinkCardProps) => {
    const {
        label,
        description,
        icon: Icon,
        href,
        colorClass,
        bgClass,
    } = config;
    return (
        <a
            key={href}
            href={href}
            className={`animate-fade-in-up card-hover group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-(--shadow-soft) stagger-${index + 6}`}
        >
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bgClass} transition-transform duration-200 group-hover:scale-110`}
            >
                <Icon className={`h-6 w-6 ${colorClass}`} />
            </div>
            <div className="min-w-0">
                <p className="font-semibold text-text">{label}</p>
                <p className="mt-0.5 truncate text-xs text-text-muted">
                    {description}
                </p>
            </div>
        </a>
    );
};

export default QuickLinkCard;
