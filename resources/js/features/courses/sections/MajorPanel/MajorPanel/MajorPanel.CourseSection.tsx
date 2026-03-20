import type { LucideIcon } from 'lucide-react';

interface CourseSectionProps {
    icon: LucideIcon;
    title: string;
    count: number;
    iconClass: string;
    badgeClass: string;
    children: React.ReactNode;
    hasDividerAbove?: boolean;
}

const CourseSection = ({
    icon: Icon,
    title,
    count,
    iconClass,
    badgeClass,
    children,
    hasDividerAbove = false,
}: CourseSectionProps) => {
    return (
        <section
            className={`pt-6 ${hasDividerAbove ? 'border-t-2 border-border' : ''}`}
        >
            <div className="mb-3 flex items-center gap-2">
                <Icon className={`h-4 w-4 ${iconClass}`} />
                <h4 className="text-[13px] font-bold text-text-muted">
                    {title}
                </h4>
                <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badgeClass}`}
                >
                    {count} مادة
                </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {children}
            </div>
        </section>
    );
};

export default CourseSection;
