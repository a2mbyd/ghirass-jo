import React from 'react';
import { FALLBACK_CONFIG, YEAR_CONFIGS } from './CourseByYearSection.config';
import { motion } from 'framer-motion';
import { Course } from '@/types/course';
import { slideUp } from '@/motion/animations';
import { BookOpen, Clock } from 'lucide-react';
import CourseCard from './CourseByYearSection.CourseCard';
import { SEMESTER_LABELS } from './CourseByYearSection.config';
import SemesterSection from './CourseByYearSection.semesterSection';

interface CourseByYearSectionYearBlockProps {
    year: number;
    yearIdx: number;
    byYear: Record<number, Record<number, Course[]>>;
}
const CourseByYearSectionYearBlock = ({
    year,
    yearIdx,
    byYear,
}: CourseByYearSectionYearBlockProps) => {
    const config = YEAR_CONFIGS[year] ?? FALLBACK_CONFIG;

    const rawSemesterMap = byYear[year];
    // Keep only required_major and required_college courses
    const semesterMap = Object.fromEntries(
        Object.entries(rawSemesterMap).map(([sem, courses]) => [
            sem,
            courses.filter(
                (c) =>
                    c.type === 'required_major' ||
                    c.type === 'required_college',
            ),
        ]),
    );

    const semesters = Object.keys(semesterMap)
        .map(Number)
        .filter((s) => semesterMap[s].length > 0)
        .sort((a, b) => a - b);

    const totalHours = semesters.reduce(
        (sum, s) =>
            sum +
            semesterMap[s].reduce((sh, c) => sh + (c.creditHours ?? 0), 0),
        0,
    );
    const totalYearCourses = semesters.reduce(
        (sum, s) => sum + semesterMap[s].length,
        0,
    );

    return (
        <motion.div
            key={year}
            initial={slideUp.initial}
            animate={slideUp.animate}
            transition={{
                ...slideUp.transition,
                delay: 0.07 * yearIdx,
            }}
            className="overflow-hidden rounded-xl border border-border bg-surface"
        >
            {/* Year header strip */}
            <div
                className={`flex items-center justify-between px-5 py-3.5 ${config.headerBg}`}
            >
                <div className="flex items-center gap-3">
                    <span
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${config.badgeBg} text-xs font-bold text-white shadow-sm`}
                    >
                        {year}
                    </span>
                    <span className={`text-[15px] font-bold text-white`}>
                        {config.label}
                    </span>
                </div>
                <div
                    className={`flex items-center gap-4 text-[12px] font-medium text-white opacity-90`}
                >
                    <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5" />
                        {totalYearCourses} مقرر
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {totalHours} ساعة
                    </span>
                </div>
            </div>

            {/* Semester panels */}
            <div className="grid grid-cols-2 divide-x-2 divide-border bg-surface-alt">
                {semesters.map((semester, semIdx) => (
                    <SemesterSection
                        key={semester}
                        semester={semester}
                        semIdx={semIdx}
                        semesterMap={semesterMap}
                        config={config}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default CourseByYearSectionYearBlock;
