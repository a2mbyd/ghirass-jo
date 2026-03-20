import { motion } from 'framer-motion';
import { BookOpen, Clock, Layers } from 'lucide-react';
import type { Section } from "@/features/doctors/types/section";
import { slideUp } from "@/shared/motion/index";
import type { Course } from "@/shared/types/index";

interface StatsCardsProps {
    sections: Section[];
    allCourses: Course[];
}

const HeroStatsCards = ({ sections, allCourses }: StatsCardsProps) => {
    const totalCreditHours = allCourses.reduce(
        (sum, c) => sum + (c.credit_hours ?? 0),
        0,
    );

    return (
        <motion.div
            initial={slideUp.initial}
            animate={slideUp.animate}
            transition={{ ...slideUp.transition, delay: 0.35 }}
            className="md grid w-full grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-alt md:grid-cols-3"
        >
            <div className="flex flex-col items-center gap-2 px-6 py-5 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50">
                    <Layers className="h-4.5 w-4.5 text-primary-500" />
                </div>
                <span className="text-2xl font-bold text-text">
                    {sections.length}
                </span>
                <span className="text-[11px] font-medium text-text-muted">
                    إجمالي الأقسام
                </span>
            </div>
            <div className="flex flex-col items-center gap-2 px-6 py-5 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50">
                    <BookOpen className="h-4.5 w-4.5 text-primary-500" />
                </div>
                <span className="text-2xl font-bold text-text">
                    {allCourses.length}
                </span>
                <span className="text-[11px] font-medium text-text-muted">
                    إجمالي المقررات
                </span>
            </div>
            <div className="flex flex-col items-center gap-2 px-6 py-5 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50">
                    <Clock className="h-4.5 w-4.5 text-primary-500" />
                </div>
                <span className="text-2xl font-bold text-text">
                    {totalCreditHours}
                </span>
                <span className="text-[11px] font-medium text-text-muted">
                    إجمالي الساعات
                </span>
            </div>
        </motion.div>
    );
};

export default HeroStatsCards;
