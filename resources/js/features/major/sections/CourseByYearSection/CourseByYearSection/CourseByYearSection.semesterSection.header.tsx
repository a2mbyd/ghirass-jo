import { BookOpen, Clock } from 'lucide-react';
import React from 'react';
import { SEMESTER_LABELS } from './CourseByYearSection.config';
import type { YearConfig } from './CourseByYearSection.types';

interface SemesterSectionHeaderProps {
    semester: number;
    semIdx: number;
    config: YearConfig;
    semCourses: number;
    semHours: number;
}
const SemesterSectionHeader = ({
    semester,
    semIdx,
    config,
    semCourses,
    semHours,
}: SemesterSectionHeaderProps) => {
    return (
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
                    {semCourses} مقرر
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {semHours} ساعة
                </span>
            </div>
        </div>
    );
};

export default SemesterSectionHeader;
