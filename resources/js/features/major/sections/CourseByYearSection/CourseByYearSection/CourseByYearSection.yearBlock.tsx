import React from 'react';
import { getYearConfig } from './CourseByYearSection.config';
import { motion } from 'framer-motion';
import { Course } from '@/types/course';
import { slideUp } from '@/motion/animations';
import { BookOpen, Clock } from 'lucide-react';
import CourseCard from './CourseByYearSection.CourseCard';
import { SEMESTER_LABELS } from './CourseByYearSection.config';
import SemesterSection from './CourseByYearSection.semesterSection';
import CourseByYearSectionYearBlockHeader from './CourseByYearSection.yearBlock.header';

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
    const config = getYearConfig(year);
    const rawSemesterMap = byYear[year];
    // Keep only required_major and required_college courses
    const semesterMap = Object.fromEntries(
        Object.entries(rawSemesterMap).map(([sem, courses]) => [
            sem,
            courses.filter(
                (c) =>
                    c.course_major_type === 'required_major' ||
                    c.course_major_type === 'required_college',
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
            semesterMap[s].reduce((sh, c) => sh + (c.credit_hours ?? 0), 0),
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
            <CourseByYearSectionYearBlockHeader
                year={year}
                config={config}
                totalYearCourses={totalYearCourses}
                totalHours={totalHours}
            />

            {/* Semester panels */}
            <div className="grid grid-cols-1 divide-y-2 divide-border bg-surface-alt md:grid-cols-2 md:divide-x-2 md:divide-y-0">
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
