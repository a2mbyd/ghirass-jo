import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { Course } from "@/shared/types/index";
import CourseCard from './CourseCard';
import { SECTION_FALLBACK, TYPE_COLORS } from './Courses.config';

interface CollapsibleSectionProps {
    title: string;
    icon: React.ElementType;
    courses: Course[];
    sectionType: string;
    defaultOpen?: boolean;
}

const CollapsibleSection = ({
    title,
    icon: Icon,
    courses,
    sectionType,
    defaultOpen = false,
}: CollapsibleSectionProps) => {
    const colors = TYPE_COLORS[sectionType] ?? {};
    const accentBg = colors.accentBg ?? SECTION_FALLBACK.accentBg;
    const accentText = colors.accentText ?? SECTION_FALLBACK.accentText;
    const accentBorder = colors.accentBorder ?? SECTION_FALLBACK.accentBorder;
    const badgeBg = colors.badgeBg ?? SECTION_FALLBACK.badgeBg;
    const badgeText = colors.badgeText ?? SECTION_FALLBACK.badgeText;
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div
            className={`overflow-hidden rounded-2xl border bg-surface shadow-sm shadow-border/60 ${accentBorder}`}
        >
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-right transition-colors hover:bg-surface-alt/60"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentBg}`}
                    >
                        <Icon className={`h-4 w-4 ${accentText}`} />
                    </div>
                    <span className="text-[15px] font-bold text-text">
                        {title}
                    </span>
                    <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeBg} ${badgeText}`}
                    >
                        {courses.length} مادة
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <ChevronDown className="h-5 w-5 text-text-subtle" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-border-subtle px-6 py-5">
                            <div className="xs:grid-col-2 grid gap-3 sm:grid-cols-3">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CollapsibleSection;
