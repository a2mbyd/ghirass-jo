import { Code, Cpu, Database, Globe, Layers, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    code: Code,
    database: Database,
    cpu: Cpu,
    globe: Globe,
    layers: Layers,
};

interface SubjectCardProps {
    title: string;
    description: string;
    url: string;
    icon?: string;
    index?: number;
}

export default function SubjectCard({ title, description, url, icon = 'code', index = 0 }: SubjectCardProps) {
    const Icon = iconMap[icon] ?? Code;
    const delay = `stagger-${Math.min(index + 1, 10)}`;
    const gradients = [
        'from-primary-500 to-accent-cyan',
        'from-accent-violet to-accent-rose',
        'from-accent-emerald to-accent-cyan',
        'from-accent-amber to-accent-rose',
        'from-primary-500 to-accent-violet',
        'from-accent-cyan to-primary-500',
    ];
    const gradient = gradients[index % gradients.length];

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`card-hover animate-fade-in-up opacity-0 ${delay} group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-md transition-all hover:border-primary-200 hover:shadow-lg`}
        >
            <div
                className={`mb-4 inline-flex w-fit rounded-xl bg-gradient-to-br ${gradient} p-3`}
            >
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-display mb-2 font-semibold text-text group-hover:text-primary-600">
                {title}
            </h3>
            <p className="flex-1 text-sm text-text-muted">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                فتح الرابط ←
            </span>
        </a>
    );
}
