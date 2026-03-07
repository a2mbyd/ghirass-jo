import React from 'react';
import { SEMESTER_LABELS } from './CourseByYearSection.config';
import { BookOpen, Clock } from 'lucide-react';
import CourseCard from './CourseByYearSection.CourseCard';
import { Course } from '@/types/course';
import { YearConfig } from './CourseByYearSection.types';

interface SemesterSectionProps {
    semester: number;
    semIdx: number;
    semesterMap: Record<number, Course[]>;
    config: YearConfig;
}
const SemesterSection = ({
    semester,
    semIdx,
    semesterMap,
    config,
}: SemesterSectionProps) => {
    const semCourses = semesterMap[semester];
    const semHours = semCourses.reduce((s, c) => s + (c.creditHours ?? 0), 0);

    return (
        <div key={semester}>
            {/* Semester sub-header */}
            <div
                className={`flex items-center justify-between border-b px-5 py-2.5 ${config.semesterBg} ${config.semesterBorder}`}
            >
                <div className="flex items-center gap-2">
                    <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${config.badgeBg}`}
                    >
                        {semIdx + 1}
                    </span>
                    <span
                        className={`text-[13px] font-extrabold ${config.semesterText}`}
                    >
                        {SEMESTER_LABELS[semester] ?? `فصل ${semester}`}
                    </span>
                </div>
                <div
                    className={`flex items-center gap-3 text-[11px] font-medium text-text-muted`}
                >
                    <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {semCourses.length} مقرر
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {semHours} ساعة
                    </span>
                </div>
            </div>

            {/* Courses grid */}
            <div className="grid grid-cols-1 gap-2.5 p-4 xl:grid-cols-2">
                {semCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        config={config}
                    />
                ))}
            </div>
        </div>
    );
};

export default SemesterSection;
