import { slideUp } from '@/motion/animations';
import { Course } from '@/types/course';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface CourseByYearSectionHeaderProps {
    filtered: Course[];
    years: number[];
}
const CourseByYearSectionHeader = ({
    filtered,
    years,
}: CourseByYearSectionHeaderProps) => {
    return (
        <motion.div
            initial={slideUp.initial}
            animate={slideUp.animate}
            transition={slideUp.transition}
            className="mb-8 flex items-center justify-center gap-3 text-center"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <BookOpen className="h-5 w-5 text-primary-500" />
            </div>
            <div>
                <h2 className="text-2xl font-extrabold text-text">
                    المقررات الدراسية
                </h2>
                <p className="text-[14px] text-text-muted">
                    {filtered.length} مقرر · موزّعة على {years.length} سنوات
                </p>
            </div>
        </motion.div>
    );
};

export default CourseByYearSectionHeader;
